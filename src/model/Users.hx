package model;
import haxe.ds.StringMap;
import php.NativeArray;
import haxe.extern.EitherType;
/**
 * ...
 * @author ...
 */
typedef UserInfo =
{
	var user:String;
	var full_name:String;
	@:optional var user_level:Int;
	@:optional var pass:String;
}
 
class Users extends Model
{
	
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var me:Users = new Users(param);
		return php.Syntax.code("json_encode({0},{1})",  me.globals, 64|256);//JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE
	}
	
	public function get_info(?user:String):Array<UserInfo>
	{
		var sb:StringBuf = new StringBuf();
		var phValues:Array<Array<Dynamic>> = new Array();
		var result:Array<UserInfo> = new Array();
		var param:StringMap<String> = new StringMap();
		param.set('table', 'asterisk.vicidial_users');
		param.set('fields', 'user,user_level, pass,full_name');
		param.set('where', (user == null?'user_group|LIKE|AGENT%,active|Y':'user|$user'));
		//param.set('where', (user == null?'user_group|AGENTS_A':'user|$user'));
		param.set('limit', '50');
		var userMap:NativeArray = doSelect(param, sb, phValues);		
		trace(param);
		//trace(userMap);
		//trace(num_rows);
		for (n in 0...num_rows)
		{
			result.push(
			{
				user:untyped userMap[n]['user'],
				full_name:untyped userMap[n]['full_name']
			});
		}
		return result;
	}
	
	public function ex_user(?user:String):String
	{
		user = S.my.real_escape_string(user);
		var ex_user_data:NativeArray = query('SELECT * FROM fly_crm.agent_ids WHERE ANr=$user');
		return '';
	}
}