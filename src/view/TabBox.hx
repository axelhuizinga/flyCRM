package view;

import haxe.ds.StringMap;
import js.Browser;
import js.html.Element;
import js.html.Node;
import View;
import jQuery.*;
import jQuery.JHelper.J;
import js.Tabs;
import pushstate.PushState;
import me.cunity.debug.Out;

using js.Tabs;

/**
 * ...
 * @author axel@cunity.me
 */

typedef Tabs = Dynamic;

typedef TabData = 
{
	var link:String;
	var label:String;
	@:optional var action:String;
}

typedef TabBoxData = 
{>ViewData,
	var tabs:Array<TabData>;
	@:optional var action:String;
	@:optional var basePath:String;
	@:optional var isNav:Bool;
	@:optional var onLoad:String;
	@:optional var heightStyle:String;
}

@:keep class TabBox extends View
{
	var active:Int;
	var tabBoxData:TabBoxData;
	var tabsInstance:Tabs;
	var tabObj:Dynamic;
	var tabLinks:Array<String>;
	static var stateChangeCount = 0;
	
	public function new(?data:Dynamic<TabBoxData>) 
	{
		super(data);

		tabLinks = new Array();
		if (data != null )
		{
			root.addClass('my-tabs');
			tabBoxData = cast data;
			if (tabBoxData.isNav)
			{
				PushState.init();
				//PushState.init(J('base').attr('href'));
				PushState.addEventListener(function(url:String)
				{
					stateChangeCount++;
					trace(url + ':' + stateChangeCount);
					var p:Array<String> = url.split(Application.basePath);
					trace(p.toString() + ':' + p.length + ' basePath:' + Application.basePath);
					if (p.length == 2 && p[1] == '')
						p[1] = tabLinks[0];
					else if (p.length == 1)
						p[1] = url;
					if (tabLinks[tabsInstance.options.active] != p[1])
					{
						trace('set { selected:' + tabLinks.indexOf(p[1]) + '}');
						tabObj.tabs( "option", "active", tabLinks.indexOf(p[1]) );
						//tabObj.tabs( { selected:tabsInstance.options.active } );
					}
					trace(p.toString() + ':' + tabsInstance.options.active + ':' + tabLinks.indexOf(p[1]));
				tabObj.tabs( "load", tabLinks[tabsInstance.options.active]);
					//Browser.document.title = app.company + " " + app.appName + '/' + tabLinks[tabsInstance.options.active];
					Browser.document.title = Application.company + " " + Application.appName + '/' + tabLinks[tabsInstance.options.active];
				});
			}			
			//var index:Int = 0;
			active = 0;
			for (tab in tabBoxData.tabs)
			{
				var ctempl:String = ~/{([a-x]*)}/g.map(template, function(r:EReg)
				{
					var m:String = r.matched(1);
					return Reflect.field(tab, m);
				});
				root.append(ctempl);				
				J('#' + id).append('<div id="ui-id-' + (tabLinks.length*2 + 2) +  '" ><p>' + tab.label + '</p></div>');
				if (tab.link == tabBoxData.action)
					active = tabLinks.length;
				tabLinks.push(tab.link);
			}
			
			
			tabObj = J( "#" + id ).tabs( 
			{
				active:active,
				activate: function( event:Event, ui ) 
				{
					//trace(ui.newPanel);
					trace('activate:' + ui.newPanel.selector + ':' + ui.newTab.context + ':' + tabsInstance.options.active);
				},				
				create: function( event:Event, ui ) 
				{
					//trace(ui);
					tabsInstance =  J('#' + id).tabs("instance");
					//Out.dumpObject(tabsInstance);
					trace(J(tabsInstance.tablist[0]).find('a').length + ':' + tabsInstance.options.active + ':'  + tabLinks[tabsInstance.options.active] + 
						(tabsInstance == tabObj?' Y':' N') );
					//JQuery._static.post(ui.ajaxSettings.url,{},go, 'json');					
				},
				beforeLoad: function( event:Event, ui ) 
				{
					trace('OK ' + ui.ajaxSettings.url);
					return false;
				},
				heightStyle: tabBoxData.heightStyle == null ? 'auto':tabBoxData.heightStyle				
			});	
		}
		
	}
	
	public function go(res:Dynamic, data:String, xhr:JqXHR):Void
	{
		Out.dumpObject(res);
		trace(data);
	}
	
}