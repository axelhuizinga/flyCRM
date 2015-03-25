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
		//var cFields:NativeArray =   doSelect(param, sb, phValues);
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
		
}