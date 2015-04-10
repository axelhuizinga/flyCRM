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
{>ViewData,
	var id:String;
	var label:String;
	//@:optional var action:String;
	
}

typedef TabBoxData = 
{>ViewData,
	var tabs:Array<TabData>;
	//@:optional var action:String;
	@:optional var includes:Array<String>;
	@:optional var isNav:Bool;
	@:optional var onLoad:String;
	@:optional var append2header:String;
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
		
	public function new(?data:TabBoxData) 
	{
		super(data);

		tabLabel = new Array();
		tabLinks = new Array();

		if (data != null )
		{
			tabBoxData = cast data;
			//trace(tabBoxData);
			if (tabBoxData.isNav)
			{
				PushState.init();
				PushState.addEventListener(go);
			}						
			active = 0;
			for (tab in tabBoxData.tabs)
			{
				if (tab.id == tabBoxData.action)
					active = tabLinks.length;
				tabLabel.push(tab.label);
				tabLinks.push(tab.id);
				dbLoader.push(new StringMap<DataLoader>());
			}
			
			trace(id + ':' + dbLoader.length);
			
			J('#t-' + id).tmpl(tabBoxData.tabs).appendTo(root.find('ul:first'));	
			
			tabObj = root.tabs( 
			{
				active:active,
				activate: function( event:Event, ui ) 
				{
					trace('activate:' + ui.newPanel.selector + ':' + ui.newTab.context + ':' + tabsInstance.options.active + ':' + active);
					dbLoaderIndex = active = tabsInstance.options.active;
					PushState.replace(Std.string(ui.newTab.context).split(Browser.window.location.hostname).pop());
					//trace(tabObj.tabs);
					runLoaders();
				},				
				create: function( event:Event, ui ) 
				{
					tabsInstance =  J('#' + id).tabs("instance");		
					trace('ready2load content4tabs:' + tabBoxData.tabs.length);
					//trace(tabObj.tabs);
					//Out.dumpObject(tabsInstance.panels);
					if (tabBoxData.append2header != null)
					{
						var views:StringMap<View> = App.getViews();
						//trace(views.toString());
						//trace(views.get(tabBoxData.append2header));
						views.get(App.appName + '.' + tabBoxData.append2header).template.appendTo(J('#' + id + ' ul'));
					}
						var tabIndex:Int = 0;
						for (t in tabBoxData.tabs)
						{
							//trace(t);
							for (v in t.views)
							{
								//trace(v);
								v.dbLoaderIndex = tabIndex;
								v.attach2 =  tabsInstance.panels[tabIndex];
								var jP:JQuery = J(tabsInstance.panels[tabIndex]);
								//Out.dumpObjectTree(tabsInstance.panels[tabIndex]);
								if (tabIndex != active)
									jP.css('visibility','hidden').show();
								trace('adding:' +t.id + ' to:' + id + ' @:'  + tabIndex );
								addView(v);
								if (tabIndex != active)
									jP.hide(0).css('visibility','visible');								
							}
							tabIndex++;
						}
					//APP UI CREATION DONE - LOAD DATA 4 ACTIVE TAB
				},
				beforeLoad: function( event:Event, ui ) 
				{
					trace('beforeLoad ' + ui.ajaxSettings.url);
					//JQuery._static.post(ui.ajaxSettings.url,{},load, 'json');
					return false;
				},
				heightStyle: tabBoxData.heightStyle == null ? 'auto':tabBoxData.heightStyle				
			});	
			//trace(tabObj);
			trace(tabsInstance.option('active'));
			trace(dbLoader.length + ':'  + active );
		}
		init();
	}
	
	//public function load(res:Dynamic, data:String, xhr:JqXHR):Void
	
	public function go(url:String, p:Dynamic):Void
	{
		trace(url);
		//Out.dumpObject(p);
		if (!Std.is(url, String))
		{
			Out.dumpStack(CallStack.callStack());
			return;
		}
		var p:Array<String> = url.split(App.basePath);
		//trace(p.toString() + ':' + p.length + ' basePath:' + Application.basePath);
		if (p.length == 2 && p[1] == '')
			p[1] = tabLinks[0];
		else if (p.length == 1)
			p[1] = url;
		if (tabsInstance.options.active == tabLinks.indexOf(p[1]))
			return;
		if (tabLinks[tabsInstance.options.active] != p[1])
		{
			trace(id + ' root:' +  root.attr('id'));
			if(tabObj!=null)
			//trace('set { selected:' + tabLinks.indexOf(p[1]) + '}');
			tabObj.tabs( "option", "active", tabLinks.indexOf(p[1]) );
		}
		//trace(p.toString() + ':' + tabsInstance.options.active + ':' + tabLinks.indexOf(p[1]));
		Browser.document.title = App.company + " " + App.appName + '  ' + tabLabel[tabsInstance.options.active];
	}
	
}