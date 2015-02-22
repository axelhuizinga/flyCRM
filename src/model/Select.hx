package model;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
using Lambda;
/**
 * ...
 * @author axel@cunity.me
 */
@:keep
class Select extends Input
{
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var self:Select = new Select();		
		trace(param);
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
	
	public function selectCampaign(param:StringMap<String>):EitherType<String,Bool>
	{
		/*var sb:StringBuf = new StringBuf();		
		var placeHolder:StringMap<Dynamic> = new StringMap();
		trace(param.get('where') + ':' );
		sb.add('SELECT ');
		sb.add(fieldFormat(param.get('fields')) + ' FROM ');
		sb.add(param.get('table') + ' ');
		sb.add(prepare(param.get('where')));
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
		}*/
		return json_encode();
	}
	
	function prepare(where:String) :String
	{
		var wParam:Array<String> = where.split(',');
		where = '';
		if (wParam.has('filter=1'))
		{
			//	TODO: CHECK4DEPS TABLE
			wParam = wParam.filter(function(f:String) return f != 'filter=1');
		}
		if (wParam.length > 0 && where == '')
			where = '';
		for (w in wParam)
		{
			if(where == '')
				where  = "WHERE " + w;
			else
				where = " AND " + w;
		}
		return where;
	}
	
}