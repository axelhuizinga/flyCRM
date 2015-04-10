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
		
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var self:Clients = new Clients();	
		self.table = 'vicidial_list';
		//trace(param);
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
	
	public function edit(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		//var entry_list_id:String = param.get('entry_list_id');
		//TODO PRODUCTS,PAY_SOURCES,PAY_HISTORY
		var fieldNames:StringMap<String> = new StringMap();
		var typeMap:StringMap<String> = new StringMap();
		var optionsMap:StringMap<String> = new StringMap();		
		
		var eF:StringMap<Array<StringMap<String>>> = getEditorFields();
		var keys:Iterator<String> = eF.keys();		
		var tableNames:Array<String> = new Array();
		var tableFields:StringMap<Array<String>> = new StringMap();
		
		while (keys.hasNext())
		{
			var k:String = keys.next();
			trace(k);
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

		//var param:StringMap<Dynamic> = new StringMap();
		//param.set('fields', cFields);
		//param.set('list_id', list_id);
		//param.set('primary_id', param.get('primary_id'));
		//param.set('table', 'vicidial_list');
		//return false;
		//var editData = cast(untyped __call__('array'), NativeArray);
		var editTables:StringMap<StringMap<String>> = new StringMap();
		var ti:Int = 0;
		for (table in tableNames)
		{
			var p:StringMap<String> = new StringMap();
			var sb:StringBuf = new StringBuf();
			var phValues:Array<Array<Dynamic>> = new Array();
			p.set('primary_id', param.get('primary_id'));
			
			if (table == 'clients')
			{
				p.set('table', 'vicidial_list');
				p.set('jointable', 'fly_crm.' + table);
				p.set('joincond', 'ON vicidial_list.lead_id=fly_crm.clients.lead_id');
				p.set('fields', param.get('fields').split(',').map(function(f:String) return 'vicidial_list.' + f).join(',')
					+ ',' + tableFields.get(table).map(function(f:String) return table + '.' + f).join(','));
				p.set('where', 'vicidial_list.lead_id|' + param.get('lead_id'));
				editTables.set(table, Lib.hashOfAssociativeArray(doJoin(p, sb, phValues)));
				//rows[ti++] = doJoin(p, sb, phValues);
			}
			else
			{
				p.set('table', 'fly_crm.'+ table);
				p.set('fields', tableFields.get(table).join(','));
				p.set('where', 'client_id|' +  param.get('client_id'));
				editTables.set(table, Lib.hashOfAssociativeArray(doSelect(p, sb, phValues)));
			}
			trace(p);			
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
		param.set('fields', 'field_name,field_label,field_type,field_options');
		param.set('order', 'field_rank,field_order');
		param.set('limit', '100');
		trace(param);
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
		trace(param);
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
}