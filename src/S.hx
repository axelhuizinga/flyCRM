package;

import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import me.cunity.php.db.MySQLi_STMT;
import model.Clients;
import model.Select;
import php.DBConfig;
import php.Lib;
import me.cunity.php.Debug;
import php.NativeArray;
import php.Web;
import php.Services_JSON;

using Lambda;
using Util;
/**
 * ...
 * @author axel@cunity.me
 */

class S 
{
	static inline var debug:Bool = true;
	static  var headerSent:Bool = false;
	public static var conf:StringMap<Dynamic>;
	public static var my:MySQLi;
	
	static function main() 
	{		
		haxe.Log.trace = Debug._trace;	
		conf =  Config.load('appData.js');
		trace('FILE_APPEND:' + untyped __php__('FILE_APPEND'));
		
		//trace(conf.get('uiData')); 

		var pd:Dynamic = Web.getPostData();
		
		var params:StringMap<String> = Web.getParams();
		if (params.get('debug') == '1')
		{
			Web.setHeader('Content-Type', 'text/html; charset=utf-8');
			headerSent = true;
			Lib.println('<div><pre>');
			Lib.println(params);
		}
		trace(params);		
		//trace(conf);		

		var action:String = params.get('action');
		if (action.length == 0 || params.get('className') == null)
		{
			dump( { error:"required params missing" } );
			return;
		}
			
		my = new MySQLi('localhost', DBConfig.user, DBConfig.pass,DBConfig.db);

		trace (action);
		var result:EitherType<String,Bool> = Model.dispatch(params);
		
		trace(result);
		if (!headerSent)
		{
			Web.setHeader('Content-Type', 'application/json');
			headerSent = true;
		}		
		Lib.println( result);

	}
	
	public static function exit(d:Dynamic):EitherType<String,Bool>
	{
		if (!headerSent)
		{
			Web.setHeader('Content-Type', 'application/json');
			headerSent = true;
		}			
		var exitValue =  untyped __call__("json_encode", {'ERROR': d});
		return untyped __call__("exit", exitValue);
	}
	
	public static function dump(d:Dynamic):Void
	{
		if (!headerSent)
		{
			Web.setHeader('Content-Type', 'application/json');
			headerSent = true;
		}
		
		Lib.println(Json.stringify(d));
	}
	
	
	static function __init__() {
		untyped __call__('require_once', '/srv/www/htdocs/flyCRM/php/functions.php');
		Debug.logFile = untyped __var__("appLog");
		//trace('...' + untyped __php__("$appLog"));
	}

}