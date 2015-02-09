package;

import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import me.cunity.php.db.MySQLi_STMT;
import model.Clients;
import php.DBConfig;
import php.Lib;
import me.cunity.php.Debug;
import php.NativeArray;
import php.Web;
import php.Services_JSON;


/**
 * ...
 * @author axel@cunity.me
 */

class S 
{
	static inline var debug:Bool = true;
	static  var htmlStart:Bool = false;
	public static var conf:StringMap<Dynamic>;
	public static var my:MySQLi;
	
	static function main() 
	{		
		haxe.Log.trace = Debug._trace;	
		conf =  Config.load('appData.js');
		
		var fieldNames:Dynamic = Lib.objectOfAssociativeArray(conf.get('fieldNames'));
		var pd:Dynamic = Web.getPostData();

		var params:StringMap<String> = Web.getParams();
		if (params.get('debug') == '1')
		{
			Web.setHeader('Content-Type', 'text/html; charset=utf-8');
			htmlStart = true;
			Lib.println('<div><pre>');
			Lib.println(params);
		}
		trace(params);		
		var action:String = params.get('action');
		if (action.length > 0)
			my = new MySQLi('localhost', DBConfig.user, DBConfig.pass,DBConfig.db);
		params.remove('action');
		trace (action);
		var result:EitherType<String,Bool> = switch (action)
		{
			case "clients":
				trace( 'clients');
				Clients.get(params);
			default:
				trace( 'oops' + action);
				null;
		}
		
		trace(result);
		
		//dump
/*
		var keys:Iterator<String> = conf.keys();
		while (keys.hasNext())
			trace("::" + keys.next() + '|<br>');
		trace(fieldNames);
*/
		
	}
	
	public static function dump(d:Dynamic):Void
	{
		if (!htmlStart)
		{
			Web.setHeader('Content-Type', 'application/json');
			htmlStart = true;
		}
		
		Lib.println(Json.stringify(d));
	}
	
	static function __init__() {
		untyped __call__('require_once', '/srv/www/htdocs/flyCRM/php/functions.php');
	}

}