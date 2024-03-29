package;
import haxe.ds.StringMap;
//import haxe.Json;
#if php
import me.cunity.php.Services_JSON;
import php.Syntax;
import StringTools;
using StringTools;
/**
 * ...
 * @author axel@cunity.me
 */
class Config
{
	public static function load(cjs:String) :StringMap<Dynamic>
	{
		var js:String = Syntax.code("file_get_contents({0})", cjs);
		trace('loading:' + cjs);
		trace(js);
		var vars:Array<String> = js.split('var');
		vars.shift();
		var result:StringMap<Dynamic> = new StringMap();
		trace(vars.length);
		var jsonS:Services_JSON = new Services_JSON(Services_JSON.SERVICES_JSON_LOOSE_TYPE|Services_JSON.SERVICES_JSON_SUPPRESS_ERRORS);
		for (v in vars)
		{
			var data:Array<String> = v.split('=');
			var json:Dynamic = jsonS.decode(data[1]);
			result.set(data[0].trim(), json);
		}		
		return result;
	}
	static function __init__():Void {
		#if (haxe_ver >= 4)
		Syntax.code('require_once({0})', 'php/JSON.php');
		#else
		untyped __call__('require_once', 'php/JSON.php');
		#end
	}
}
#end