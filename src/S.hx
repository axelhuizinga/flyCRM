package;

import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import sys.db.Mysql;

import model.Campaigns;
import model.Clients;
import model.Helper;
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
	static  var headerSent:Bool = false;
	public static var conf:StringMap<Dynamic>;
	
	static function main() 
	{		
		haxe.Log.trace = Debug._trace;	
		conf =  Config.load('appData.js');

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
//trace( Helper.createExpr('last_name'));
		var action:String = params.get('action');
		if (action.length == 0 || params.get('className') == null)
		{
			dump( { error:"required params missing" } );
			return;
		}
		
		sys.db.Manager.cnx = Mysql.connect( {
			user:DBConfig.user,
			pass:DBConfig.pass,
			database:DBConfig.db,
			host:'localhost'
		});
		//dump(sys.db.Manager.cnx);
		sys.db.Manager.initialize();

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
	}

}