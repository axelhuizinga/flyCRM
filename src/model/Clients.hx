package model;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import php.Lib;
import php.NativeArray;

/**
 * ...
 * @author axel@cunity.me
 */
class Clients extends Model
{
		
	public static function get(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		var self:Clients = new Clients();
		var sb:StringBuf = new StringBuf();
		var method:String = 'SELECT';
		
		if (param.exists('method'))
		{
			method = param.get('method');
		}
		
		sb.add(method + ' ');
		sb.add(param.get('fields') + ' FROM ');
		sb.add(param.get('table')+ ' ');
		if (param.exists('join'))
			sb.add(param.get('join') + ' \n');
		sb.add('WHERE ' + param.get('where') + ' \n');
		if(param.exists('group'))
			sb.add(param.get('group') + ' \n');
		if(param.exists('limit'))
			sb.add('LIMIT ' + param.get('limit'));		
		trace(sb.toString());
		self.data =  self.query(sb.toString());
		return self.json_encode();
	}
	
	//public function query(sql:String):StringMap<Dynamic>
	public function query(sql:String):NativeArray
	{
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