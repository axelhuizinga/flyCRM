package;
import haxe.ds.ObjectMap;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Timer;
import js.Browser;
import js.html.Element;
import jQuery.JHelper.J;
import jQuery.*;
import js.html.Node;
import js.html.XMLHttpRequest;
import view.Input;
import view.TabBox;

import me.cunity.debug.Out;


using Lambda;
using js.JqueryUI;
using Util;
/**
 * ...
 * @author axel@cunity.me
 */

typedef  InteractionState =
{
	var disables:Array<String>;
	var enables:Array<String>;
}

typedef   ViewData = 
{
	var action:String;
	var attach2:String;
	var id:String;
	var dbLoaderIndex:Int;
	@:optional var fields:Array<String>;
	@:optional var parent: String;
	@:optional var parentTab: Int;
	@:optional var parentView: View;
	@:optional var views:Array<ViewData>;
}

typedef DataLoader = 
{
	var callBack:Dynamic->Void;
	var prepare:Void->Dynamic;
	var valid:Bool;
}

class View
{
	var attach2:String; // parentSelector
	var fields:Array<String>;
	var repaint:Bool;
	var name:String;
	var root:JQuery;
	var vData:Dynamic;
	var template:JQuery;
	
	var views:StringMap<View>;
	var parentView:View;	
	var parentTab:Int;
	var params:Dynamic;	
	var loading:Int;
	var listening:ObjectMap<JQuery,String>;
	var suspended:StringMap<JQuery>;
	var interactionStates:StringMap<InteractionState>;
	var dbLoader:Array<StringMap<DataLoader>>;// DATALOADER MAP
	
	public var dbLoaderIndex:Int;
	public var id:String;	
	public var instancePath:String;	
	public var interactionState(default, set):String;
	public var inputs:StringMap<Input>;
	
	
		
	public function new(?data:Dynamic ) 
	{
		views = new StringMap();		
		//views = App.getViews();
		inputs = new StringMap();
		vData = data;
		var data:ViewData = cast data;
		id = data.id;
		//parentTab = data.parentTab;
		parentView = data.parentView;
		if (parentView == null)
		{
			instancePath = App.appName + '.' + id;
		}
		else
		{
			instancePath = parentView.instancePath + '.' + id;
		}
		dbLoader = new Array();
		dbLoaderIndex = (data.dbLoaderIndex == null ? 0:data.dbLoaderIndex);
		if (Std.instance(this, TabBox) == null)
			dbLoader.push(new StringMap());
		attach2 = data.attach2 == null ? '#' + id : data.attach2;
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		root = J('#' + id).css({opacity:0});
		trace(name + ':'  + id + ':' + root.length + ':' + J(attach2).attr('id') + ':' + dbLoaderIndex); 		
		interactionStates = new StringMap();
		listening = new ObjectMap();
		suspended = new StringMap();
		loading = 0;
		if (loadingComplete())
			//Timer.delay(initState, 100);
			initState();
		else
			Timer.delay(initState, 1000);
	}
	
	public function set_interactionState(iState:String):String
	{
		interactionState = iState;
		var iS:InteractionState = interactionStates.get(iState);
		trace(id + ':' + iState);
		if (iS == null)
			return iState;
		var lIt:Iterator<JQuery> = listening.keys();
		while (lIt.hasNext())
		{
			var aListener:JQuery = lIt.next();
			var aAction:String = listening.get(aListener);
			if (iS.disables.has(aAction))
				aListener.prop('disabled', true);
			if (iS.enables.has(aAction))
				aListener.prop('disabled', false);
		}
		trace(iState);
		return iState;
	}
	
	function addInteractionState(name:String, iS:InteractionState):Void
	{
		interactionStates.set(name, iS);
	}
	
	function addInputs(v:Array<Dynamic>, className:String):Void
	{
		trace(v.length);
		for (aI in v)
		{
			aI.parentView = this;
			aI.id = id + '_' + aI.name;
			addInput(aI, className);
		}
	}
	
	function addInput(v:Dynamic, className:String):Input
	{
		var aI:Input = null;
		
		var iParam:Dynamic = v;
		trace(className + ':' + iParam.id);
		var cl:Class<Dynamic> = Type.resolveClass('view.' + className);
		if (cl != null)
		{
			//trace(cl);
			if (Reflect.hasField(v, 'attach2'))
				iParam.attach2 = v.attach2;
			iParam.parentView = this;
			//trace(Std.string(iParam));
			aI = Type.createInstance(cl, [iParam]);
			inputs.set(iParam.id, aI);				
			trace("inputs.set(" +iParam.id +")");
			if (iParam.db == 1)
				aI.init();
		}		
		return aI;
	}
	
	public function addListener(jListener:JQuery)
	{
		jListener.each(function(i, n)
		{
			listening.set(J(n), n.attributes.getNamedItem('data-action'	).nodeValue);
		});
	}
	
	public function addView(v:ViewData):View
	{
		var av:View = null;
		var className:String = Reflect.fields(v)[0];
		var iParam:Dynamic = Reflect.field(v, className);
		trace(name + ':' + className + ':' + dbLoader.length);
		//trace(className + ':' + iParam);
		var cl:Class<Dynamic> = Type.resolveClass('view.' + className);
		if (cl != null)
		{
			//trace(cl);
			if (Reflect.hasField(v, 'attach2'))
				iParam.attach2 = v.attach2;
			if (Reflect.hasField(v, 'dbLoaderIndex'))
				iParam.dbLoaderIndex = v.dbLoaderIndex;				
			iParam.parentView = this;
			//trace(Std.string(iParam));
			av = Type.createInstance(cl, [iParam]);
			views.set(av.instancePath, av);				
			trace("views.set(" +av.instancePath +")");
			//views.set(iParam.id, av);				
			//trace("views.set(" +iParam.id +")");
		}		
		return av;
	}
	
	public function addViews(v2add:Array<ViewData>):Void
	{
		for (vD in v2add)
		{
			vD.parentView = this;
			addView(vD);
		}
		
	}
	
	function initState():Void
	{
		trace (loadingComplete() ? 'Y':'N');	
		if (!loadingComplete())
		{			
			Timer.delay(initState, 1000);
			return;
		}
		addListener(J('button[data-action]'));
		interactionState = 'init';
		J('td').attr('tabindex', -1);
		var el:Element = cast J('#' + id).get()[0];
		trace(id + ' initState complete - we can show up :)' + ':' + el);
		//trace(J('#' + id).find('.datepicker').length);
		J('#' + id).animate( { opacity:1 }, 300, 'linear', 
			function() { 
			//trace(untyped __js__("this"));
			//trace(J(untyped __js__("this")).attr('id')); 			
			});
	}
	
	function loadingComplete():Bool
	{
		if (loading > 0)
			return false;
		if (!inputs.empty() && !inputs.foreach(function(i:Input) return i.loading == 0))
			return false;
		else
			return views.foreach(function(v:View) return v.loading == 0);
		return true;
	}
	
	function suspendAll()
	{
		
	}
	
	public function addDataLoader(loaderId:String, dL:DataLoader, loaderIndex:Int=0)
	{
		dbLoader[loaderIndex].set(loaderId, dL);
		trace(id + ':' + loaderIndex + ':' + loaderId);
	}
	
	public function loadAllData(?loaderIndex:Int = 0):Void
	{// 	INITIAL LOAD DB DATA

		var dLoader:StringMap<DataLoader> = dbLoader[loaderIndex];
		var keys:Iterator<String> = dLoader.keys();
		trace(dLoader.count() + ':' + loaderIndex);
		for (k in keys)
		{
			trace(k);
			load(k, loaderIndex);
		}
	}
	
	public function load(loaderId:String, loaderIndex:Int = 0):Void
	{
		//INITIAL LOAD DB DATA
		var loader:DataLoader = dbLoader[loaderIndex].get(loaderId);
		if(!loader.valid)
			loadData('server.php', loader.prepare(), 
				function(data:Dynamic)
				{ 
					data.loaderId = loaderId; 
					trace(id + ':' + data.fields + ':' + data.loaderId);
					loader.callBack(data); 
					loader.valid = true;
				});		
	}
	
	public function loadData(url:String, p:Dynamic, callBack:Dynamic->Void):Void
	{
		//Out.dumpObject(params);
		trace(Std.string(p));
		loading++;
		JQueryStatic.post(url, p , function(data:Dynamic, textStatus:String, xhr:XMLHttpRequest)
		{
			//trace(data);
			callBack(data);
			loading--;
		}, 'json');
	}
	
	public function find(where:String):Void
	{
		trace('|'+where+'|' + (where.any2bool() ? 'Y':'N'));
		trace(vData.where);
		var fData:Dynamic = { };
		var pkeys:Array<String> = 'action,className,fields,limit,order,table,where'.split(',');
		for (f in pkeys)
		{
			if (Reflect.field(vData, f) != null)		
			{
				if (f == 'where' && (where.any2bool() || 	vData.where.any2bool()))			
				{
					fData.where = (vData.where.any2bool() ? vData.where + (where.any2bool() ? ',' + where  : '') : where);
				}
				else
					Reflect.setField(fData, f, Reflect.field(vData, f));
			}
		}
		
		//trace(vData);
		resetParams(fData);
		loadData('server.php', params, update);
	}
	
	public function order(j:JQuery):Void
	{
		if (params.order.indexOf(j.data('order')) == 0)//	CHANGE DIRECTION OF CURRENT ORDER BY FIELD
			params.order = j.data('order') + (params.order.indexOf( 'ASC') >0  ?  '|DESC' : '|ASC');
		else
			params.order = j.data('order') + '|ASC';		
		//trace( params.order);
		loadData('server.php', params, update);
	}	
	
	private function resetParams(?pData:Dynamic):Dynamic
	{		
		var pkeys:Array<String> = 'action,className,fields,limit,order,table,where'.split(',');
		var aData:Dynamic = pData.any2bool() ? pData : vData;
		fields = aData.fields.any2bool()?aData.fields.split(','):null;
		params = {
			action:'find',
			className:name,
			instancePath:instancePath
		};

		for (f in pkeys)
		{
			if (Reflect.field(aData, f) != null)
			{//trace(Reflect.field(aData, f));
				switch(f)
				{
					//case 'fields':
						//Reflect.setField(params, f, Reflect.field(aData, f).split(','));
					default:
						Reflect.setField(params, f, Reflect.field(aData, f));
				}
				
			}
		}
		return params;
	}
	
	public function update(data:Dynamic):Void
	{
		// UPDATE MAIN DATA TABLE
		data.fields = fields;
		trace(id + ':' + data.fields + ':' + data.loaderId);
		if ( J('#' + id + '-list').length > 0)
			J('#' + id + '-list').replaceWith(J('#t-' + id + '-list').tmpl(data));
		else
			J('#t-' + id + '-list').tmpl(data).appendTo(J(data.loaderId).first());	
			
		J('#' + id + '-list th').each(function(i, el) { J(el).click(function(_) { order(J(el)); } ); } );	
		J('#' + id + '-list tr').first().siblings().click(select).find('td').off('click');
		J('td').attr('tabindex', -1);
	}
	

	public function runLoaders():Void
	{
		trace(dbLoaderIndex);
		loadAllData(dbLoaderIndex);
	}
	
	public function select(evt:Event):Void
	{
		trace('has to be implemented in subclass!');
	}
	
	/*public function parentInstanceAtLevel(level:Int):View
	{
		var l:Int = instancePath.split('.').length;
		if level > l return null ;
		 if level == l return this;
		return instancePath.split('.').splice(l - level, l - level);
	}*/
		
}