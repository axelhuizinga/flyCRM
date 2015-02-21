package;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import sys.db.Object;


import php.Lib;
import php.NativeArray;
import sys.db.RecordInfos;
import model.Campaigns;
import model.Clients;


using Lambda;
/**
 * ...
 * @author axel@cunity.me
 */
/*typedef MData = 
{
	var rows:NativeArray;
};*/

class Model
{
	
	public static function dispatch(param:StringMap<Dynamic>) :EitherType<String,Bool>
	{
		var cl:Class<Dynamic> = Type.resolveClass('model.' + param.get('className'));
		trace(cl);
		if (cl == null)
		{
			trace('model.'+param.get('className') + ' ???');
			return false;
		}
		var action:String = param.get('action');
		var fl:Dynamic = Reflect.field(cl, action);
		trace(fl);
		if (fl == null)
		{
			trace(cl + '.' + action + ' is null');
			//return false;
		}
		var iFields:Array<String> = Type.getInstanceFields(cl);
		trace(iFields);
		if (iFields.has(action))
		{
			trace(param);
			trace('calling ' + cl + '.' + param.get('action'));
			//Helper.createCond(param.get('where'));
			//Helper.createCond(param2obj(param.get('where')));
			//return false;
			return Reflect.callMethod(cl, fl, [param]);
		}
		else 
		{
			trace('not calling ' + action);
			return false;
		}
		
	}
	
	public static function fieldFormat(fields:String):String
	{
		var fieldsWithFormat:Array<String> = new Array();
		var sF:Array<String> = fields.split(',');
		var dbQueryFormats:StringMap<Array<String>> = Lib.hashOfAssociativeArray(Lib.associativeArrayOfObject((S.conf.get('dbQueryFormats'))));
		trace(dbQueryFormats);
		
		var d:StringMap<Dynamic> = Lib.hashOfAssociativeArray(S.conf.get('dbQueryFormats'));
		trace(d);
		//var qKeys:Array<String> = Reflect.fields(dbQueryFormats);
		var qKeys:Array<String> = new Array();
		var it:Iterator<String> = dbQueryFormats.keys(); 
		while (it.hasNext())
		{
			qKeys.push(it.next());
		}
	
		trace(qKeys);
		for (f in sF)
		{
			if (qKeys.has(f))
			{
				var format:Array<String> = dbQueryFormats.get(f);
				trace(format);
				fieldsWithFormat.push(format[0] + '(`' + f + '`, "' + format[1] + '") AS `' + f + '`');
			}
			else
				fieldsWithFormat.push( f );				
		}
		trace(fieldsWithFormat);
		return fieldsWithFormat.join(',');
	}

	 
	public static function quoteIf(t:RecordType):Bool
	{
		return switch(t)
		{
			case DId, DInt, DUId, DUInt, DBigId, DBigInt, DSingle, DFloat,DTinyInt,DTinyUInt,DSmallInt,DSmallUInt,DMediumInt,DMediumUInt:false;
			default: true;
		}
	}
	
	public static function param2obj(whereParam:String):Dynamic
	{
		var where:Array<String> = whereParam.split(',');
		trace(where);
		if (where.length == 0)
			return null;
		var whereObj:Dynamic = {};
		for (w in where)
		{
			var wData:Array<Dynamic> = w.split('|');
			trace(wData);
			var name:String = wData.shift();
			if (name.toUpperCase() == 'LIMIT')
				wData.unshift('LIMIT');
			Reflect.setField(whereObj, name, wData.join('|'));			
		}
		
		return whereObj;
	}
	
	public static function whereParam2sql(whereParam:String, placeHolder:StringMap<Dynamic>):String
	{
		var where:Array<Dynamic> = whereParam.split(',');
		trace(where);
		if (where.length == 0)
			return '';
		var phString:String = '';
		for (w in where)
		{

			var wData:Array<Dynamic> = w.split('|');
			trace(wData);
			if (phString == '')
				phString += 'WHERE `' + 	wData[0] + '` ';	
			else
				phString += 'AND `' + 	wData[0] + '` ';
			switch(wData[2])
			{
				case 'exact':
					phString += '= ? ';
					placeHolder.set(wData[0], wData[1]);
				case 'any':
					phString += 'LIKE ? ';
					placeHolder.set(wData[0], '%' + wData[1] + '%');							
				case 'end':
					phString += 'LIKE ? ';
					placeHolder.set(wData[0], '%' + wData[1]);		
				case 'start':
					phString += 'LIKE ? ';
					placeHolder.set(wData[0],  wData[1] + '%');							
			}
			
		}
		return phString;
	}
	
	public static function whereString(matchType:String):String 
	{
		var wS:String = '';
		return switch(matchType)
		{
			case 'exact':
				'=';
			default:
				'oops';
		}
	}
	
	
	public function json_encode(data:Dynamic):EitherType<String,Bool>
	{
		return untyped __call__("json_encode", data);
	}
	

}