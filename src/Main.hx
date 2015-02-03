package;

import haxe.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import me.cunity.php.db.MySQLi_STMT;
import php.DBConfig;
import php.Lib;
import me.cunity.php.Log;
import php.NativeArray;
import php.Web;


/**
 * ...
 * @author axel@cunity.me
 */

class Main 
{
	static inline var debug:Bool = true;
	static  var htmlStart:Bool = false;
	
	static function main() 
	{
		
		Log.edump('hi');
		
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
		
		var pd:Dynamic = Web.getPostData();
		dump(pd);
		var params:Dynamic = Web.getParams();
		//dump(params);
		
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