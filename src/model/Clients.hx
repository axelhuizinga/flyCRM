package model;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import me.cunity.php.db.MySQLi_STMT;
import php.Lib;
import php.NativeArray;
import php.Web;

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
		trace(param);
		return Reflect.callMethod(self, param.get('action'), [param]);
	}
	
	public function find1(param:StringMap<Dynamic>):EitherType<String,Bool>
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
			rows: query1(sb.toString())
		}
		return json_encode();
	}
	
	public function find(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		var sb:StringBuf = new StringBuf();		
		var placeHolder:StringMap<Dynamic> = new StringMap();
		trace(param.get('where') + ':' );
		sb.add('SELECT ');
		sb.add(fieldFormat(param.get('fields')) + ' FROM ');
		sb.add(param.get('table')+ ' ');
		if (param.exists('join'))
			sb.add(param.get('join') + ' ');
		//sb.add('WHERE ' + param.get('where') + ' ');
		sb.add(prepare(param.get('where'), placeHolder));
		trace(placeHolder.toString());
		if(param.exists('group'))
			sb.add('GROUP BY ' +param.get('group') + ' ');
		if(param.exists('order'))
			sb.add('ORDER BY ' + param.get('order') + ' ');				
		if(param.exists('limit'))
			sb.add('LIMIT ' + param.get('limit'));			
			
		//trace(sb.toString());
		data =  {
			rows: execute(sb.toString(), param, placeHolder)
		}
		return json_encode();
	}

	public function execute(sql:String, param:StringMap<Dynamic>, ?placeholders:StringMap<Dynamic>):NativeArray
	{
		//trace(sql);
		//sql = S.my.real_escape_string(sql);
		trace(sql);	
		var stmt =  S.my.stmt_init();
		trace(stmt);
		var success:Bool = stmt.prepare(sql);
		trace (success);
		if (!success)
		{
			trace(stmt.error);
			return null;
		}		
		var bindTypes:String = '';
		var values2bind:NativeArray = null;
		var dbFieldTypes:StringMap<String> =  Lib.hashOfAssociativeArray(Lib.associativeArrayOfObject(S.conf.get('dbFieldTypes')));
		
		var qObj:Dynamic = { };
		var qVars:String = 'qVar_';
		var i:Int = 0;
		for (name in placeholders.keys())
		{
			bindTypes += dbFieldTypes.get(name);
			
			//untyped __php__("$$qName = $qVal");
			//trace(name + ':' + placeholders.get(name) + ':' + Reflect.field(qObj, name));
			values2bind[i++] = placeholders.get(name);
		}


		trace(Std.string(values2bind));
		//success = Reflect.callMethod(stmt, Reflect.field(stmt, 'bind_param') ,values2bind);

		success = untyped __call__('myBindParam', stmt, values2bind, bindTypes);
		//success = stmt.bind_param(bindTypes, qObj.list_id, qObj.phone_number);
		trace ('success:' + success);
		if (success)
		{
			var fieldNames:Array<String> =  param.get('fields').split(',');
			var data:NativeArray = null;
			success = stmt.execute();
			if (!success)
			{
				trace(stmt.error);
				return null;
			}
			var result:EitherType<MySQLi_Result,Bool> = stmt.get_result();
			if (result != false)
			{
				data = cast(result, MySQLi_Result).fetch_all(MySQLi.MYSQLI_ASSOC);
			}			
			return(data);		
		}
		else
			trace(stmt.error);
		return null;
	}
	
	public function query(sql:String, ?placeholders:StringMap<Dynamic>):NativeArray
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
	
	public function query1(sql:String):NativeArray
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