package;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import php.NativeArray;
import model.*;


using Lambda;
/**
 * ...
 * @author axel@cunity.me
 */
typedef MData = 
{
	var rows:NativeArray;
};

class Model
{

	public var data:MData;
	
	public static function dispatch(param:StringMap<Dynamic>) :EitherType<String,Bool>
	{
		var cl:Class<Dynamic> = Type.resolveClass('model.' + param.get('className'));
		trace(cl);
		if (cl == null)
		{
			trace('model.'+param.get('className') + ' ???');
			return false;
		}
		var fl:Dynamic = Reflect.field(cl, 'create');
		trace(fl);
		if (fl == null)
		{
			trace(cl + 'create is null');
			return false;
		}
		var iFields:Array<String> = Type.getInstanceFields(cl);
		trace(iFields);
		if (iFields.has(param.get('action')))
		{
			trace('calling create ' + cl);
			return Reflect.callMethod(cl, fl, [param]);
		}
		else 
		{
			trace('not calling create ');
			return false;
		}
	}
	
	public function new() {}
	
	public function json_encode():EitherType<String,Bool>
	{
		return untyped __call__("json_encode", data);
	}
	
}