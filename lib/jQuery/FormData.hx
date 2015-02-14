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
	
	public static function replace(eR:EReg, source:String, by:String):String
	{
		
		return untyped __js__(
	}
	
	public static function where(jForm:JQuery, fields:Array<String>):String
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
				if (!exact)
				ret +=  'AND ' + item.name + ' LIKE "' + item.value + '%" ';
				//ret +=  'AND ' + item.name + ' LIKE "' + item.value + '%" ';
				else
				ret +=  'AND ' + item.name + '="' + item.value + '" ';
			}
		}
		return ret;		
	}
}