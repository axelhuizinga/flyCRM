package jQuery;

/**
 * ...
 * @author axel@cunity.me
 */

using Lambda;
 
typedef FData = 
{
	var name:String;
	var value:Dynamic;
}

@:expose("FD")
class FormData
{

	public static function query(jForm:JQuery, ?eData:Dynamic) :String
	{
		var fD:Array<FData> = cast jForm.serializeArray();
		var ret:String = '';
		var d:FData = null;
		for (f in Reflect.fields(eData))
		{
			d = Reflect.field(eData, f);
			if ( d != null && Std.string(d) != '')
			{
				if (ret != '')
					ret += '&';		
				ret += f + '=' + d;
			}

		}
		for (item in fD)
		{
			if (item.value != null && item.value != '')
			{
				if(ret != '')
					ret += '&';
				ret +=  item.name + '=' + item.value;
			}
		}
		return ret;
	}
	
	//public static function replace(eR:EReg, modifier:String, source:String, by:String):String
	public static function replace(e:String, by:String, source:String):String
	{		
		var eR:EReg =  new EReg(e, '');
		trace(eR + ' replace:' + source + ' by:' + by);
		return eR.replace(source, by);
	}
	
	public static function where(jForm:JQuery, fields:Array<String>):String
	{
		var ret:Array<String> = new Array();
		//var exact:Bool = cast jForm.find('[name="exact"]').val();
		var fD:Array<FData> = cast jForm.serializeArray();
		trace(fD);
		for (item in fD)
		{
			if (!fields.has(item.name))
				continue;
			if (item.value != null && item.value != '')
			{
				if (Reflect.hasField(Application.storeFormats, item.name))
				{
					var sForm:Array<Dynamic> = Reflect.field(Application.storeFormats, item.name);
					var callParam:Array<Dynamic> = sForm.slice(1);
					var method:String = sForm[0];
					trace('call FormData' + method);
					callParam.push(item.value);
					item.value = Reflect.callMethod(FormData, Reflect.field(FormData, method), callParam);
				}
				var matchType = cast jForm.find('[name="' + item.name + '_match_option"]').val();
				ret.push (item.name + '|' + item.value + '|' + matchType);				
			}
		}
		trace(ret.join(','));		
		return ret.join(',');		
	}
	
	public static function where1(jForm:JQuery, fields:Array<String>):String
	{
		var ret:String = ' ';
		var exact:Bool = cast jForm.find('[name="exact"]').val();
		var fD:Array<FData> = cast jForm.serializeArray();
		for (item in fD)
		{
			if (!fields.has(item.name))
				continue;
			if (item.value != null && item.value != '')
			{
				if (Reflect.hasField(Application.storeFormats, item.name))
				{
					var sForm:Array<Dynamic> = Reflect.field(Application.storeFormats, item.name);
					var method:String = sForm.shift();
					sForm.push(item.value);
					item.value = Reflect.callMethod(FormData, Reflect.field(FormData, method), sForm);
				}
				if (!exact)
					ret +=  'AND ' + item.name + ' LIKE "' + item.value + '%" ';
				else
					ret +=  'AND ' + item.name + '="' + item.value + '" ';
			}
		}
		return ret;		
	}
}