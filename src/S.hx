package;

import haxe.ds.StringMap;
import haxe.extern.EitherType;
import haxe.Json;
import me.cunity.debug.Out;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import me.cunity.php.db.MySQLi_STMT;
import model.AgcApi;
import model.Campaigns;
import model.Clients;
import model.QC;
import model.Select;
import php.Lib;
import me.cunity.php.Debug;
import php.NativeArray;
import php.Session;
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
	public static var host:String;
	public static var user:String;
	public static  var db:String;
	public static  var dbUser:String;
	public static  var dbPass:String;	
	public static var vicidialUser:String;
	public static var vicidialPass:String;
	
	static function main() 
	{		
		haxe.Log.trace = Debug._trace;	
		conf =  Config.load('appData.js');
		Session.start();

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

		var action:String = params.get('action');
		if (action.length == 0 || params.get('className') == null)
		{
			dump( { error:"required params missing" } );
			return;
		}
			
		my = new MySQLi('localhost',dbUser, dbPass, db);
		//trace(my);
		var auth:Bool = checkAuth();
		
		trace (action + ':' + auth);
		if (!auth)
		{
			exit('AUTH FAILURE');
			return;
		}
		var result:EitherType<String,Bool> = Model.dispatch(params);
		
		trace(result);
		if (!headerSent)
		{
			Web.setHeader('Content-Type', 'application/json');
			headerSent = true;
		}		
		Lib.println( result);

	}
	
	static function checkAuth():Bool
	{
		user = Session.get('PHP_AUTH_USER');
		trace(user);
		if (user == null)
			return false;
		trace(user);
		var pass:String = Session.get('PHP_AUTH_PW');
		if (pass == null)
			return false;
		//trace(pass);
		var res:StringMap<String> = Lib.hashOfAssociativeArray(
			new Model().query("SELECT use_non_latin,webroot_writable,pass_hash_enabled,pass_key,pass_cost,hosted_settings FROM system_settings")
			);
		//trace(res + ':' + res.get('pass_hash_enabled'));	
		if (Lib.hashOfAssociativeArray(cast res.get('0')).get('pass_hash_enabled') == '1')
		{
			//TODO: IMPLEMENT ENCRYPTED PASSWORDS;
			exit('ENCRYPTED PASSWORDS NOT IMPLEMENTED');
		}
		
		//var re
		res = Lib.hashOfAssociativeArray(
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
	
	public static function edump(d:Dynamic):Void
	{
		untyped __call__("edump", d);
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
			'SELECT GROUP_CONCAT(COLUMN_NAME) FROM information_schema.columns WHERE table_schema = "$db" AND table_name = "$table";');
		if (res.any2bool() && res.num_rows == 1)
		{
			//trace(res.fetch_array(MySQLi.MYSQLI_NUM)[0]);
			//return 'lead_id,anrede,co_field,geburts_datum,iban,blz,bank_name,spenden_hoehe,period,start_monat,buchungs_zeitpunkt,start_date'.split(',');
			return res.fetch_array(MySQLi.MYSQLI_NUM)[0].split(',');
		}
		return null;
	}
	
	static function __init__() {
		untyped __call__('require_once', '/srv/www/htdocs/flyCRM/php/functions.php');
		untyped __call__('require_once', '../../config/flyCRM.db.php');
		Debug.logFile = untyped __var__("appLog");
		db = untyped __var__("VARDB");
		dbUser = untyped __var__("VARDB_user");
		dbPass = untyped __var__("VARDB_pass");		
		host = Web.getHostName();
		//trace(host);
		vicidialUser = untyped __var__("user");
		vicidialPass = untyped __var__("pass");
	}

}