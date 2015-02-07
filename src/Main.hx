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
import me.cunity.php.Log;
import php.NativeArray;
import php.Web;
import php.Services_JSON;


/**
 * ...
 * @author axel@cunity.me
 */

class Main 
{
	static inline var debug:Bool = true;
	static  var htmlStart:Bool = false;
	public static var my:MySQLi;
	
	static function main() 
	{		
		haxe.Log.trace = Log.edump;
		trace('hi');
		var pd:Dynamic = Web.getPostData();
		//dump(pd);
		var params:StringMap<String> = Web.getParams();
		if (params.get('debug') == '1')
		{
			Web.setHeader('Content-Type', 'text/html; charset=utf-8');
			htmlStart = true;
			Lib.println('<div><pre>');
			Lib.println(params);
		}
		var action:String = params.get('action');
		params.remove('action');
		trace (action);
		switch (action)
		{
			case 'clients':
				Clients.get(params);
		}
		//dump(params);		
		var conf:StringMap<Dynamic> =  Config.load('appData.js');
		var fieldNames:Dynamic = Lib.objectOfAssociativeArray(conf.get('fieldNames'));
		var keys:Iterator<String> = conf.keys();
		while (keys.hasNext())
			trace("::" + keys.next() + '|<br>');
		trace(fieldNames);
		
		if (false)
		{
			var my:MySQLi = new MySQLi('localhost', DBConfig.user, DBConfig.pass,DBConfig.db);
			
			var res:EitherType < MySQLi_Result, Bool > = my.query("SELECT * FROM vicidial_list LIMIT 5", MySQLi.MYSQLI_ASSOC);
			if (res)
			{
				var data:NativeArray = cast(res, MySQLi_Result).fetch_all(MySQLi.MYSQLI_ASSOC);
				Log.edump(data);		
				Lib.print(data);
			}
		}
		

		
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