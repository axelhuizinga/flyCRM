package ;

import haxe.ds.StringMap;
import haxe.Http;
import haxe.Json;
import haxe.Log;
import js.Browser;
import jQuery.*;
import js.Lib;
import me.cunity.debug.Out;
import view.Clients;
import view.ContextMenu;
import view.DateTime;
import view.TabBox;

/**
 * ...
 * @author axel@cunity.me
 */


class Application
{
	//public static var instance:Application;
	public static var basePath:String;
	public static var appName:String;
	public static var company:String;
	var views(default,default):StringMap<View>; 
	
	static function main() 
	{
		Log.trace = Out._trace;
		
	}
	
	public function new()
	{		
		views = new StringMap();
	}
	
	@:expose("initApp") 
	public static function init(config:Dynamic)
	{
		var ist:Application = 	new Application();
		//ist.test(); return;
		var fields:Array<String> = Type.getClassFields(Application);
		for (f in fields)
		{
			Reflect.setField(Application, f, Reflect.field(config, f));
			trace(Reflect.field(Application, f));
		}
		basePath = Browser.location.pathname.split(config.appName)[0] + config.appName + '/';
		trace(basePath);
		ist.initUI(config.views);		
	}
	
	function initUI(viewConfigs:Array<Dynamic>):Void
	{
		for (v in viewConfigs)
		{
			var className:String = Reflect.fields(v)[0];
			trace(className);
			var cl:Class<Dynamic> = Type.resolveClass('view.' + className);
			if (cl != null)
			{
				//trace(cl);
				var av:View = Type.createInstance(cl, [Reflect.field(v, className)]);
				views.set(v.id, av);				
			}
		}
	}
	
	function test()
	{
		var template = "{a} Hello {c} World!";
		var data = { a:123, b:333, c:"{nested}" };
		var t:String = "hello";
		trace(t + ':' + t.indexOf('lo'));
		var ctempl:String = ~/{([a-x]*)}/g.map(template, function(r:EReg)
		{
			//Out.dumpObject(r);
			var m:String = r.matched(1);
			var d:String = Std.string(Reflect.field(data, m));
			if (d.indexOf('{')==0)
			trace("nested template :) " + d.indexOf('{'));
			return d;
		});
		trace(ctempl);
	}
	
}