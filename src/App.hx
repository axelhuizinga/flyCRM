package ;

import haxe.ds.StringMap;
import haxe.Http;
import haxe.Json;
import haxe.Log;
import haxe.Timer;
import js.Browser;
import jQuery.*;
import jQuery.JHelper.J;
import js.Lib;
import me.cunity.debug.Out;
import view.Campaigns;
import view.Clients;
import view.ContextMenu;
import view.DateTime;
import view.QC;
import view.TabBox;

/**
 * ...
 * @author axel@cunity.me
 */


class App
{
	public static var ist:App;
	public static var basePath:String;
	public static var appName:String;
	public static var company:String;
	public static var storeFormats:Dynamic;
	public static var limit:Int;
	
	public  var hasTabs:Bool;
	public  var rootViewPath:String;
	public var altPressed:Bool;
	public var ctrlPressed:Bool;
	public var shiftPressed:Bool;
	
	var views:StringMap<View>; 
	
	
	static function main() 
	{
		Log.trace = Out._trace;		
	}
	
	public function new()
	{		
		views = new StringMap();
		//dbLoader = new Array();
	}
	
	@:expose("initApp") 
	public static function init(config:Dynamic):App
	{
		ist = new App();
		appName = config.appName;
		storeFormats = config.storeFormats;
		company = config.company;
		limit = config.limit;
		ist.hasTabs = config.hasTabs;
		ist.rootViewPath = appName + '.' + config.rootViewPath;
		var fields:Array<String> = Type.getClassFields(App);
		for (f in fields)
		{
			if(Reflect.field(config, f)!=null)
			Reflect.setField(App, f, Reflect.field(config, f));
			//trace(Reflect.field(App, f));
		}
		basePath = Browser.location.pathname.split(config.appName)[0] + config.appName + '/';
		trace(basePath);
		ist.initUI(config.views);		

		return ist;
	}
	
	function initUI(viewConfigs:Array<Dynamic>):Void
	{
		for (v in viewConfigs)
		{
			var className:String = Reflect.fields(v)[0];
			var iParam:Dynamic = Reflect.field(v, className);
			//trace(className + ':' + iParam);
			var cl:Class<Dynamic> = Type.resolveClass('view.' + className);
			if (cl != null)
			{
				//trace(cl);
				var av:View = Type.createInstance(cl, [iParam]);
				views.set(av.instancePath, av);				
				trace("views.set(" +av.instancePath +")");				
				//views.set(iParam.id, av);				
				//trace("views.set(" +iParam.id +")");
			}
		}
		J(Browser.window).keydown(function(evt) {
			switch (evt.which) { 
				case 16:
					shiftPressed = true;
				case 17:
					ctrlPressed = true;
				case 18:
					altPressed = true;			
			}
		}).keyup(function(evt) {
			switch (evt.which) { 
				case 16:
					shiftPressed = false;
				case 17:
					ctrlPressed = false;
				case 18:
					altPressed = false;
			 }
		});	
		Timer.delay(function() {
			//views.get(rootViewPath).runLoaders();
			views.get(rootViewPath).runLoaders();
		},500);
		
	}
	
	public static function getViews(): StringMap<View>
	{
		return ist.views;
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