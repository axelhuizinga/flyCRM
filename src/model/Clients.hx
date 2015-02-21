package model;

import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import haxe.macro.Expr.Field;
import sys.db.Object;
import sys.db.RecordInfos;
import sys.db.RecordMacros;
import sys.db.Types;

/**
 * ...
 * @author axel@cunity.me
 */
//@:keep
@:table("vicidial_list")
@:id(lead_id)
class Clients extends Object
{
	public var lead_id:SId;
	public var list_id:SBigInt;
	public var first_name:SString<6>;
	public var last_name:SString<6>;
	public var address1:SString<6>;
	public var city:SString<6>;
	public var postal_code:SString<6>;
	public var phone_number:SString<6>;
	public var status:SString<6>;
	public var last_local_call_time:SDateTime;
	public var vendor_lead_code:SString<20>;
	
	public static var manager = new SManager<Clients>(Clients);
	
	public function find(param:StringMap<Dynamic>):EitherType<String,Bool>
	{	
		trace(param);
		var where:String = cast (param.get('where'), String);
		var whereObj:Dynamic = Model.param2obj(where);
		trace(whereObj);
		//var result:List<Clients> = Clients.manager.search(  { last_name:  'LIKE|Ad%', list_id:'BETWEEN|999|2000'}, { orderBy:vendor_lead_code, limit : 2 } );
		var result:List<Clients> = Clients.manager.dynamicSearch(  whereObj );
		//var result:List<Clients> = Clients.manager.search(  $last_name.like("Ad%") && $first_name == "Horst", { orderBy:vendor_lead_code, limit : 2 } );
			//dump(result);
			trace(result);
			trace(result.length);
			var c:Clients = null;
			var res:Array<String> = new Array();
			for (c in result.iterator())
				res.push(c.json());
			return '{[\n' + res.join(',\n') + '\n]}\n';
			return "dummy";
	}
	
	public function json() :String
	{
		var ret:Array<String> = new Array();
		var it:Iterator<RecordField> = _manager.dbInfos().hfields.iterator();
		while (it.hasNext())
		{
			var rf:RecordField = it.next();
			if(Model.quoteIf(rf.t))
				ret.push(rf.name +':"' + (rf.isNull ? '"' : Reflect.field(this, rf.name)) + '"');
			else
				ret.push(rf.name +':' +  Reflect.field(this, rf.name));
		}
		return '{\n' + ret.join(',\n') + '\n}';
	}
}
