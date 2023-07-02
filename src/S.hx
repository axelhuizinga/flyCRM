package;

#if php

import haxe.Unserializer;
import php.db.Mysqli_warning;

import haxe.ds.StringMap;
import haxe.extern.EitherType;
import haxe.Json;

import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;

import model.AdminApi;

import php.Lib;
import me.cunity.php.Debug;

import php.Session;
import php.Syntax;
import php.Global;
import php.SuperGlobal;
import php.Web;

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
	public static var host:String;
	public static var request_scheme:String;
	public static var user:String;
	public static  var db:String;
	public static  var dbHost:String;
	public static  var dbUser:String;
	public static  var dbPass:String;	
	public static var vicidialUser:String;
	public static var vicidialPass:String;
	
	static function main() 
	{		
		haxe.Log.trace = Debug._trace;	
		conf =  Config.load('appData.js');
		//trace(conf);
		if(Syntax.code("session_status() != PHP_SESSION_ACTIVE")){
			trace('start session');
			Session.start();
		}
		

		var pd:php.NativeArray = php.SuperGlobal._POST;
		//var pd:Dynamic = SuperGlobal._POST;
		var now:String = DateTools.format(Date.now(), "%d.%m.%y %H:%M:%S");
		trace(pd);
		var params:StringMap<String> = Lib.hashOfAssociativeArray(pd);
		trace( php.SuperGlobal._GET);
		//var params:StringMap<String> = cast(php.NativeArray, php.SuperGlobal._GET);
		if (params.get('debug') == '1')
		{
			php.Global.header("Content-Type: text/html; charset=utf-8");
			headerSent = true;
			Lib.println('<div><pre>');
			Lib.println(params);
		}
		trace(Date.now().toString());		
		trace(params);		

		var action:String = params.get('action');
		if (action.length == 0 || params.get('className') == null)
		{
			dump( {error:"required params missing" } );
			trace(Global.array_keys(pd));
			return;
		}
			
		my = new MySQLi(dbHost, dbUser, dbPass, db);
		my.set_charset("utf8");
		//trace(my);
		var auth:Bool = checkAuth(params);
		
		trace (action + ' $dbUser:' + auth);
		if (!auth)
		{
			exit('AUTH FAILURE');
			return;
		}
		var result:EitherType<String,Bool> = Model.dispatch(params);
		
		trace(result);
		if (!headerSent)
		{
			Global.header('Content-Type: application/json');
			headerSent = true;
		}		
		Lib.println( result);

	}
	
	static function checkAuth(params:StringMap<String>):Bool
	{
		user = Session.get('PHP_AUTH_USER');
		if (user == null)
		{
			var sysLogin:Bool = AdminApi.systemLogin(params);
			if (sysLogin)
				return true;
		}
		trace(user);
		if (user == null)
			return false;
		var pass:String = Session.get('PHP_AUTH_PW');
		if (pass == null)
			return false;
		//trace(pass);
		/*var res:StringMap<String> = Lib.hashOfAssociativeArray(
			new Model().query("SELECT use_non_latin,webroot_writable,pass_hash_enabled,pass_key,pass_cost,hosted_settings FROM system_settings")
			);
		//trace(res + ':' + res.get('pass_hash_enabled'));	
		if (false||Lib.hashOfAssociativeArray(cast res.get('0')).get('pass_hash_enabled') == '1')
		{
			//TODO: IMPLEMENT ENCRYPTED PASSWORDS;
			//exit('ENCRYPTED PASSWORDS NOT IMPLEMENTED');
			//#function user_authorization($user,$pass,$user_option,$user_update,$bcrypt,$return_hash,$api_call)
			var auth:String = '';
			try{
				auth = untyped __call__('user_authorization',user, pass, '', 1, -1, 1, 0);
				trace(auth);
			}
			catch (ex:Dynamic)
			{
				trace(ex);
			}
			return auth.indexOf('GOOD') == 0;
		}*/
		
		//var re
		var res = Lib.hashOfAssociativeArray(
			new Model().query('SELECT count(*) AS cnt FROM vicidial_users WHERE user="$user" and pass="$pass" and user_level > 7 and active="Y"')
			);
		//trace(res);
		//trace(Lib.hashOfAssociativeArray(cast res.get('0')).get('cnt') );
		return res.exists('0') &&  Lib.hashOfAssociativeArray(cast res.get('0')).get('cnt') == '1';
	}
	
	public static function exit(d:Dynamic):Void
	{
		if (!headerSent)
		{
			//Global.header('Content-Type', 'application/json');
			Global.header('Content-Type:application/json');
			headerSent = true;
		}			
		var exitValue =  Syntax.code("json_encode({0})", {'ERROR': d});
		Syntax.code("exit({0})", exitValue);
	}
	
	public static function dump(d:Dynamic):Void
	{
		if (!headerSent)
		{
			Global.header('Content-Type:application/json');
			headerSent = true;
		}
		trace(d);
		Lib.println(Json.stringify(d));
	}
	
	public static function edump(d:Dynamic):Void
	{
		untyped Syntax.code("edump({0})", d);
	}
	
	public static function newMemberID():Int {
		var res:MySQLi_Result = S.my.query(
			'SELECT  MAX(CAST(vendor_lead_code AS UNSIGNED)) FROM vicidial_list WHERE list_id=10000'
			);
		return (res.num_rows==0 ? 1:  Std.parseInt(res.fetch_array(MySQLi.MYSQLI_NUM)[0])+1);
	}
	
	public static function tableFields(table:String, db:String = 'asterisk'): Array<String>
	{		
		var res:MySQLi_Result = S.my.query(
			'SELECT GROUP_CONCAT(COLUMN_NAME ORDER BY ORDINAL_POSITION) FROM information_schema.columns WHERE table_schema = "$db" AND table_name = "$table";');
		if (res.any2bool() && res.num_rows == 1)
		{
			//trace(res.fetch_array(MySQLi.MYSQLI_NUM)[0]);
			//return 'lead_id,anrede,co_field,geburts_datum,iban,blz,bank_name,spenden_hoehe,period,start_monat,buchungs_zeitpunkt,start_date'.split(',');
			return res.fetch_array(MySQLi.MYSQLI_NUM)[0].split(',');
		}
		return null;
	}
	
	static function __init__() {
		Syntax.code("require_once({0})", '../../crm/functions.php');
		Syntax.code("require_once({0})", '../../crm/loadAstguiclientConf.php');
		Syntax.code("require_once({0})", '../../config/flyCRM.db.php');
		//untyped __call__('require_once', '../agc/functions.fix.php');
		Debug.logFile = Syntax.code("$appLog");
		//edump(Debug.logFile);
		//Debug.logFile = untyped __var__("GLOBALS","appLog");
		//db = untyped __php__("$VARDB");
		//dbHost = untyped __php__("$VARDB_server");
		//dbUser = untyped __php__("$VARDB_user");
		//dbPass = untyped __php__("$VARDB_pass");		
		db = Syntax.code("$VARDB");
		dbHost = Syntax.code("$VARDB_server");
		dbUser = Syntax.code("$VARDB_user");
			
		dbPass = Syntax.code("$VARDB_pass");		
		host = php.SuperGlobal._SERVER['SERVER_NAME'];//Syntax.code("gethostname");
		request_scheme = php.SuperGlobal._SERVER['REQUEST_SCHEME'];
		//trace(host);
		//vicidialUser = untyped __php__("$user");
		//vicidialPass = untyped __php__("$pass");
		vicidialUser = Syntax.code("$user");
		vicidialPass = Syntax.code("$pass");
	}

}
#end