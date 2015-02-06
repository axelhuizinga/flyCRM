package view;

import haxe.CallStack;
import haxe.ds.StringMap;
import js.Browser;
import js.html.Element;
import js.html.Node;
import View;
import jQuery.*;
import jQuery.JHelper.J;
import js.JqueryUI;
import pushstate.PushState;
import me.cunity.debug.Out;

using js.JqueryUI;

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
	@:optional var includes:Array<String>;
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
	var tabLabel:Array<String>;
	//static var stateChangeCount = 0;
	
	public function new(?data:Dynamic<TabBoxData>) 
	{
		super(data);

		tabLabel = new Array();
		tabLinks = new Array();
		if (data != null )
		{
			root.addClass('my-tabs');
			tabBoxData = cast data;
			if (tabBoxData.isNav)
			{
				PushState.init();
				PushState.addEventListener(go);
			}			
			//var index:Int = 0;
			active = 0;
			template = Template.include(template, tabBoxData.includes);
			root.append(template);
			var tabsTemplate = templates.get('tabs');
			var tabLinksRoot = J('[data="tabs"]');
			for (tab in tabBoxData.tabs)
			{
				var ctempl:String = ~/{([a-x]*)}/g.map(tabsTemplate, function(r:EReg)
				{
					var m:String = r.matched(1);
					return Reflect.field(tab, m);
				});
				tabLinksRoot.append(ctempl);			
				J('#' + id).append('<div id="ui-id-' + (tabLinks.length*2 + 2) +  '" ><p>' + tab.label + '</p></div>');
				if (tab.link == tabBoxData.action)
					active = tabLinks.length;
				tabLabel.push(tab.label);
				tabLinks.push(tab.link);
			}
						
			tabObj = J( "#" + id ).tabs( 
			{
				active:active,
				activate: function( event:Event, ui ) 
				{
					//trace('activate:' + ui.newPanel.selector + ':' + ui.newTab.context + ':' + tabsInstance.options.active);
					PushState.replace(Std.string(ui.newTab.context).split(Browser.window.location.hostname).pop());
				},				
				create: function( event:Event, ui ) 
				{
					tabsInstance =  J('#' + id).tabs("instance");
										
				},
				beforeLoad: function( event:Event, ui ) 
				{
					trace('beforeLoad ' + ui.ajaxSettings.url);
					//JQuery._static.post(ui.ajaxSettings.url,{},load, 'json');
					return false;
				},
				heightStyle: tabBoxData.heightStyle == null ? 'auto':tabBoxData.heightStyle				
			});	
		}
		
	}
	
	//public function load(res:Dynamic, data:String, xhr:JqXHR):Void
	
	public function go(url:String):Void
	{
		trace(url);
		if (!Std.is(url, String))
		{
			Out.dumpStack(CallStack.callStack());
			return;
		}
		var p:Array<String> = url.split(Application.basePath);
		//trace(p.toString() + ':' + p.length + ' basePath:' + Application.basePath);
		if (p.length == 2 && p[1] == '')
			p[1] = tabLinks[0];
		else if (p.length == 1)
			p[1] = url;
		if (tabsInstance.options.active == tabLinks.indexOf(p[1]))
			return;
		if (tabLinks[tabsInstance.options.active] != p[1])
		{
			//trace('set { selected:' + tabLinks.indexOf(p[1]) + '}');
			tabObj.tabs( "option", "active", tabLinks.indexOf(p[1]) );
		}
		//trace(p.toString() + ':' + tabsInstance.options.active + ':' + tabLinks.indexOf(p[1]));
		Browser.document.title = Application.company + " " + Application.appName + '  ' + tabLabel[tabsInstance.options.active];
	}
	
}