package model;
import haxe.ds.StringMap;
import haxe.extern.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import me.cunity.php.db.MySQLi_STMT;
import php.Lib;
import php.NativeArray;
import php.Web;

using Lambda;
using Util;

typedef CustomField = 
{
	var field_label:String;
	var field_name:String;
	var field_type:String;
	//var rank:String;
	//var order:String;
	@:optional var field_options:String;
} 
/**
 * ...
 * @author axel@cunity.me
 */
@:keep
 class Clients extends Model
{
	override public function doJoin(q:StringMap<String>, sb:StringBuf, phValues:Array<Array<Dynamic>>):NativeArray
	{
		var fields:String = q.get('fields');		
		//sb.add('SELECT ' + fieldFormat((fields != null ? fields.split(',').map(function(f:String) return quoteField(f)).join(',') : '*' )));
		sb.add('SELECT ' + (fields != null ? fieldFormat( fields.split(',').map(function(f:String) return S.my.real_escape_string(f)).join(',') ): '*' ));
		var qTable:String = (q.get('table').any2bool() ? q.get('table') : table);
		var joinCond:String = (q.get('joincond').any2bool() ? q.get('joincond') : null);
		var joinTable:String = (q.get('jointable').any2bool() ? q.get('jointable') : null);
		trace ('table:' + q.get('table') + ':' + (q.get('table').any2bool() ? q.get('table') : table) + '' + joinCond );
		
		sb.add(' FROM ' + S.my.real_escape_string(qTable));		
		if (joinTable != null)
			sb.add(' INNER JOIN $joinTable');
		if (joinCond != null)
			sb.add(' ON $joinCond');
		var where:String = q.get('where');
		if (where != null)
			buildCond(where, sb, phValues);
		var groupParam:String = q.get('group');
		if (groupParam != null)
			buildGroup(groupParam, sb);
		//TODO:HAVING
		var order:String = q.get('order');
		if (order != null)
			buildOrder(order, sb);
		var limit:String = q.get('limit');
		buildLimit((limit == null?'15':limit), sb);	//	TODO: CONFIG LIMIT DEFAULT
		return execute(sb.toString(), q, phValues);
	}
	
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var self:Clients = new Clients();	
		self.table = 'vicidial_list';
		//trace(param);
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
	
	override public function find(param:StringMap<String>):EitherType<String,Bool>
	{	
		var sb:StringBuf = new StringBuf();
		var phValues:Array<Array<Dynamic>> = new Array();
		//trace(param);
		var count:Int = countJoin(param, sb, phValues);
		
		sb = new StringBuf();
		phValues = new Array();
		trace( param.get('joincond')  +  ' count:' + count + ':' + param.get('page')  + ': ' + (param.exists('page') ? 'Y':'N'));
		data =  {
			count:count,
			page:(param.exists('page') ? Std.parseInt( param.get('page') ) : 1),
			rows: doJoin(param, sb, phValues)
		};
		return json_encode();
	}	
	
	public function edit(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		//var entry_list_id:String = param.get('entry_list_id');

		var fieldNames:StringMap<String> = new StringMap();
		var typeMap:StringMap<String> = new StringMap();
		var optionsMap:StringMap<String> = new StringMap();		
		
		var eF:StringMap<Array<StringMap<String>>> = getEditorFields();
		//trace(eF);
		var keys:Iterator<String> = eF.keys();		
		var tableNames:Array<String> = new Array();
		var tableFields:StringMap<Array<String>> = new StringMap();
		
		trace(param);
		while (keys.hasNext())
		{
			var k:String = keys.next();
			//trace(k);
			tableNames.push(k);
			var aFields:Array<StringMap<String>> = eF.get(k);
			//trace(aFields);
			var cFields:Array<String> = aFields.map(function(field:StringMap<String>):String return field.get('field_label'));
			//trace(cFields);
			tableFields.set(k, cFields);
			for (f in 0...cFields.length)
			{
				fieldNames.set(cFields[f], aFields[f].get('field_name'));					
				if (aFields[f].get('field_options') != null)
					optionsMap.set(cFields[f], aFields[f].get('field_options'));
				typeMap.set(cFields[f], aFields[f].get('field_type'));
			}			
		}
		trace(tableNames);
		var editTables:StringMap<StringMap<String>> = new StringMap();
		var ti:Int = 0;
		tableNames.remove('vicidial_list');
		for (table in tableNames)
		{
			var p:StringMap<String> = new StringMap();
			var sb:StringBuf = new StringBuf();
			var phValues:Array<Array<Dynamic>> = new Array();
			p.set('primary_id', param.get('primary_id'));
			//FETCH VICIDIAL DATA ALONG WITH MEMBER DATA
			if (table == 'clients')
			{
				p.set('table', 'vicidial_list');
				p.set('jointable', 'fly_crm.' + table);
				//p.set('joincond', 'vicidial_list.lead_id=fly_crm.clients.lead_id');
				p.set('joincond', param.get('joincond'));
				p.set('fields', param.get('fields').split(',').map(function(f:String) return (f.indexOf('vicidial_list.') !=0 ? 'vicidial_list.' + f:f)).join(',')
					+ ',' + tableFields.get(table).map(function(f:String) return table + '.' + f).join(','));
				p.set('where', 'vicidial_list.lead_id|' + param.get('lead_id'));
				editTables.set(table, Lib.hashOfAssociativeArray(doJoin(p, sb, phValues)));
			}
			else
			{
				p.set('table', (table == 'vicidial_list'?table:'fly_crm.'+ table));
				p.set('fields', tableFields.get(table).join(','));
				if (table == 'vicidial_list')
				p.set('where', 'vendor_lead_code|' +  param.get('client_id'));
				else
				p.set('where', 'pay_client_id|' +  param.get('client_id'));
				editTables.set(table, Lib.hashOfAssociativeArray(doSelect(p, sb, phValues)));
			}
			//trace(p);			
		}

		data =  {
			fieldNames:Lib.associativeArrayOfHash(fieldNames),
			editData:Lib.associativeArrayOfHash(editTables),
			typeMap:Lib.associativeArrayOfHash(typeMap),
			optionsMap:Lib.associativeArrayOfHash(optionsMap),
			recordings:getRecordings(Std.parseInt(param.get('lead_id')))
		};
		return json_encode();		
	}
	
	function getCustomFields(list_id:String):Array<StringMap<String>>
	{
		var sb:StringBuf = new StringBuf();
		var phValues:Array<Array<Dynamic>> = new Array();
		var param:StringMap<String> = new StringMap();
		param.set('table', 'vicidial_lists_fields');
		param.set('where', 'list_id|' + S.my.real_escape_string(list_id));
		param.set('fields', 'field_name,field_label,field_type,field_options,field_required,field_default');
		param.set('order', 'field_rank,field_order');
		param.set('limit', '100');
		//trace(param);
		var cFields:Array<Dynamic> = Lib.toHaxeArray( doSelect(param, sb, phValues));
		trace(cFields.length);
		var ret:Array<StringMap<String>> = new Array();
		for (cf in cFields)
		{
			//trace(cf);
			var field:StringMap<String> = Lib.hashOfAssociativeArray(cf);
			//trace(field.get('field_label')+ ':' + field);
			ret.push(field);
		}
		//trace(ret);
		return ret;
	}
	
	function getEditorFields(?table_name:String):StringMap<Array<StringMap<String>>>
	{
		var sb:StringBuf = new StringBuf();
		var phValues:Array<Array<Dynamic>> = new Array();
		var param:StringMap<String> = new StringMap();
		param.set('table', 'fly_crm.editor_fields');
		
		param.set('where', 'field_cost|>-2' + (table_name != null ? 
		',table_name|' + S.my.real_escape_string(table_name): ''));
		param.set('fields', 'field_name,field_label,field_type,field_options,table_name');
		param.set('order', 'table_name,field_rank,field_order');
		param.set('limit', '100');
		//trace(param);
		var eFields:Array<Dynamic> = Lib.toHaxeArray( doSelect(param, sb, phValues));
		//var eFields:NativeArray = doSelect(param, sb, phValues);
		//var eFields:Dynamic = doSelect(param, sb, phValues);
		//trace(eFields);
		//trace(eFields.length);
		var ret:StringMap<Array<StringMap<String>>> = new StringMap();
		//var ret:Array<StringMap<String>> = new Array();
		for (ef in eFields)
		{
			var table:String = untyped ef['table_name'];
			if (!ret.exists(table))
			{
				ret.set(table, []);
			}
			//var field:StringMap<String> = Lib.hashOfAssociativeArray(ef);
			//trace(field.get('field_label')+ ':' + field);
			var a:Array<StringMap<String>> = ret.get(table);
			a.push(Lib.hashOfAssociativeArray(ef));
			ret.set(table, a);
			//return ret;
		}
		//trace(ret);
		return ret;
	}
	
	function getRecordings(lead_id:Int):NativeArray
	{
		return query("SELECT location ,  start_time, length_in_sec FROM recording_log WHERE lead_id = " 
		+ Std.string(lead_id) + ' ORDER BY start_time DESC');
	}
	
	public function save(q:StringMap<Dynamic>):Bool
	{
		var lead_id = Std.parseInt(q.get('lead_id'));
		trace(q);
		return false;
	}
}