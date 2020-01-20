package model;
import haxe.ds.StringMap;
import haxe.extern.EitherType;
import haxe.Http;
import php.Lib;
import php.Web;
import sys.io.File;
using Util;
/**
 * ...
 * @author axel@cunity.me
 */
class AdminApi extends Model
{
	var vicidialUser:String;
	var vicidialPass:String;
	var statuses:StringMap<String>;
	
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var self:AdminApi = new AdminApi();	
		self.vicidialUser = S.vicidialUser;
		self.vicidialPass = S.vicidialPass;
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
	
	public static function systemLogin(params:StringMap<String>):Bool
	{
		var res:StringMap<String> = Lib.hashOfAssociativeArray(
			new Model().query("SELECT use_non_latin,webroot_writable,pass_hash_enabled,pass_key,pass_cost,hosted_settings FROM system_settings")
			);
			
		if (true||Lib.hashOfAssociativeArray(cast res.get('0')).get('pass_hash_enabled') == '1')
		{
			//#function user_authorization($user,$pass,$user_option,$user_update,$bcrypt,$return_hash,$api_call)
			trace(params.get('user'));
			//return Web.getClientIP() == '85.214.120.132';
			var auth:String = '';
			try{
				auth = php.Syntax.code("user_authorization({0},{1},{2},{3},{4},{5},{6})",
					params.get('user'), params.get('pass'), '', 1, -1, 1, 0);
				trace(auth);
			}
			catch (ex:Dynamic)
			{
				trace(ex);
			}
			return auth.indexOf('GOOD') == 0;
		}	
		return false;
	}
	
	/*
	 * GET a List of Vicidial users 
	 */
	
	public function vicidial_users(param:StringMap<String>):EitherType<String,Bool>
	{
		param.set('table', 'vicidial_users');
		param.set('limit', '1000');
		return find(param);
	}
	
	/*
	 * GET a List of Vicidial user_groups 
	 */
	public function vicidial_user_groups(param:StringMap<String>):EitherType<String,Bool>
	{
		param.set('table', 'vicidial_user_groups');
		param.set('limit', '1000');
		return find(param);
	}	

		/*
	 * GET a List of fly_crm storno_grund 
	 */
	public function storno_grund(param:StringMap<String>):EitherType<String,Bool>
	{
		param.set('table', 'fly_crm.storno_grund');
		param.set('limit', '1000');
		return find(param);
	}	
}