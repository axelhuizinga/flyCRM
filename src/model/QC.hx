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
using Util;

/**
 * ...
 * @author axel@cunity.me
 */
@:keep
 class QC extends Clients
{
		
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var self:QC = new QC();	
		self.table = 'vicidial_list';
		trace(param);
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
		
	public function edit(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		var entry_list_id:String = param.get('entry_list_id');
		var cF:Array<StringMap<String>> = getCustomFields(entry_list_id);
		var cFields:Array<String> = cF.map(function(field:StringMap<String>):String return field.get('field_label'));
		trace(cFields);
		var fieldNames:StringMap<String> = new StringMap();
		var typeMap:StringMap<String> = new StringMap();
		var optionsMap:StringMap<String> = new StringMap();
		for (f in 0...cFields.length)
		{
			fieldNames.set(cFields[f], cF[f].get('field_name'));
			if (cF[f].get('field_options') != null)
				optionsMap.set(cFields[f], cF[f].get('field_options'));
			typeMap.set(cFields[f], cF[f].get('field_type'));
		}
		//var param:StringMap<Dynamic> = new StringMap();
		param.set('fields', cFields);
		//param.set('list_id', list_id);
		//param.set('primary_id', param.get('primary_id'));
		//param.set('table', 'vicidial_list');
		//return false;
		var sb:StringBuf = new StringBuf();
		var phValues:Array<Array<Dynamic>> = new Array();
		trace(param);
		data =  {
			fieldNames:Lib.associativeArrayOfHash(fieldNames),
			rows: doSelectCustom(param, sb, phValues),
			typeMap:Lib.associativeArrayOfHash(typeMap),
			optionsMap:Lib.associativeArrayOfHash(optionsMap),
			recordings:getRecordings(Std.parseInt(param.get('lead_id')))
		};
		return json_encode();		
	}
	
	function getRecordings(lead_id:Int):NativeArray
	{
		return query("SELECT location , DATE_FORMAT(start_time, '%d.%m.%Y %H:%i:%s') AS start_time, length_in_sec FROM recording_log WHERE lead_id = " + Std.string(lead_id));
	}
	
	public function doSelectCustom(q:StringMap<Dynamic>, sb:StringBuf, phValues:Array<Array<Dynamic>>):NativeArray
	{
		var fields:Array<String>= q.get('fields');		
		sb.add('SELECT ' + (fields != null ? fieldFormat( fields.map(function(f:String) return S.my.real_escape_string(f)).join(',') ): '*' ));
		var entry_list_id:String = q.get('entry_list_id');
		var primary_id:String = S.my.real_escape_string(q.get('primary_id'));
		sb.add(' FROM ' + S.my.real_escape_string(table) + ' AS vl INNER JOIN ' + S.my.real_escape_string('custom_' + entry_list_id) + ' AS cu ON vl.' + primary_id + '=cu.' +  primary_id);		
		buildCond('vl.' + primary_id + '|' + S.my.real_escape_string(q.get(q.get('primary_id'))) , sb, phValues);
		trace(phValues);		
		trace(sb.toString());		
		return execute(sb.toString(), q, phValues);
		return null;
	}	
	
	public function save(q:StringMap<Dynamic>):Bool
	{
		trace(q);
		return false;
	}
}