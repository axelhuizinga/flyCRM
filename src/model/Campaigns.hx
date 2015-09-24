package model;

import haxe.ds.StringMap;
import haxe.extern.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi_Result;

/**
 * ...
 * @author axel@cunity.me
 */

@:keep
class Campaigns extends Model
{
	var campaign_id:String;

	public static function create(param: StringMap<String>):EitherType<String,Bool>
	{
		var self:Campaigns = new Campaigns();	
		self.table = 'vicidial_campaigns';
		trace(param);
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
	
	public function findLeads(q:StringMap<String>):EitherType<String,Bool>
	{
		//FROM `vicidial_list` WHERE `list_id` IN( SELECT `list_id` FROM vicidial_lists WHERE campaign_id IN('KINDER') AND active='Y' ) 
		//vicidial_campaigns|KINDER,vicidial_campaigns|QCKINDER
		//var where:Array<Dynamic> = q.get('where').split(',');
		var sb:StringBuf = new StringBuf();
		var phValues:Array<Array<Dynamic>> = new Array();		
		var fields:String = q.get('fields');		
		//sb.add('SELECT ' + fieldFormat((fields != null ? fields.split(',').map(function(f:String) return quoteField(f)).join(',') : '*' )));
		sb.add('SELECT ' + (fields != null ? fieldFormat( fields.split(',').map(function(f:String) return S.my.real_escape_string(f)).join(',') ): '*' ));
		//TODO: JOINS
		sb.add(' FROM  `vicidial_list` WHERE `list_id` IN( SELECT `list_id` FROM vicidial_lists ');		
		var where:String = q.get('where');
		if (where != null)
			buildCond(where, sb, phValues);
		sb.add(')');
		var order:String = q.get('order');
		if (order != null)
			buildOrder(order, sb);
		var limit:String = q.get('limit');
		buildLimit((limit == null?'15':limit), sb);	//	TODO: CONFIG LIMIT DEFAULT
		data =  {
			rows: execute(sb.toString(), phValues)
		};
		return json_encode();
	}
}