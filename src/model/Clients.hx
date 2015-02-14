package model;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import php.Lib;
import php.NativeArray;

using Lambda;

/**
 * ...
 * @author axel@cunity.me
 */
@:keep
 class Clients extends Model
{
		
	public static function create(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		var self:Clients = new Clients();		
		return Reflect.callMethod(self, param.get('action'), [param]);
	}
	
	public function find(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		var sb:StringBuf = new StringBuf();		
		sb.add('SELECT ');
		sb.add(param.get('fields') + ' FROM ');
		sb.add(param.get('table')+ ' ');
		if (param.exists('join'))
			sb.add(param.get('join') + ' ');
		sb.add('WHERE ' + param.get('where') + ' ');
		if(param.exists('group'))
			sb.add('GROUP BY ' +param.get('group') + ' ');
		if(param.exists('order'))
			sb.add('ORDER BY ' + param.get('order') + ' ');				
		if(param.exists('limit'))
			sb.add('LIMIT ' + param.get('limit'));			
			
		//trace(sb.toString());
		data =  {
			rows: query(sb.toString())
		}
		return json_encode();
	}
	
	//public function query(sql:String):StringMap<Dynamic>
	public function query(sql:String):NativeArray
	{
		//trace(sql);
		//sql = S.my.real_escape_string(sql);
		trace(sql);
		var res:EitherType < MySQLi_Result, Bool > = S.my.query(sql, MySQLi.MYSQLI_ASSOC);
		if (res)
		{
			var data:NativeArray = cast(res, MySQLi_Result).fetch_all(MySQLi.MYSQLI_ASSOC);
			return(data);		
			//return Lib.hashOfAssociativeArray(data);
		}
		else
			trace(res + ':' + S.my.error);
		return null;
	}
}