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
	@:optional var fields:Array<String>;
	@:optional var parent: String;
	@:optional var parentView: View;
	@:optional var views:Array<ViewData>;
}

class View
{
	var attach2:EitherType<String, Element>; // parentSelector
	var fields:Array<String>;
	var repaint:Bool;
	var name:String;
	var root:JQuery;
	var vData:Dynamic;
	var template:JQuery;
	
	var views:StringMap<View>;
	var parentView:View;
	var params:Dynamic;
	
	var loading:Int;
	var listening:ObjectMap<JQuery,String>;
	var suspended:StringMap<JQuery>;
	var interactionStates:StringMap<InteractionState>;
	
	public var id:String;	
	public var interactionState(default, set):String;
	public var inputs:StringMap<Input>;
	
	public function new(?data:Dynamic ) 
	{
		views = new StringMap();
		inputs = new StringMap();
		vData = data;
		var data:ViewData = cast data;
		id = data.id;
		parentView = data.parentView;
		attach2 = data.attach2 == null ? '#' + id : data.attach2;
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		root = J('#' + id).css({opacity:0});
		trace(name + ':'  + id + ':' + root.length + ':' + attach2); 		
		interactionStates = new StringMap();
		listening = new ObjectMap();
		suspended = new StringMap();
		loading = 0;
		if (loadingComplete())
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
		//trace(v);
		for (aI in v)
		{
			aI.parentView = this;
			addInput(aI, className);
		}
	}
	
	function addInput(v:Dynamic, className:String):Input
	{
		var aI:Input = null;
		
		var iParam:Dynamic = v;
		//trace(className + ':' + iParam);
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
		//trace(className + ':' + iParam);
		var cl:Class<Dynamic> = Type.resolveClass('view.' + className);
		if (cl != null)
		{
			//trace(cl);
			if (Reflect.hasField(v, 'attach2'))
				iParam.attach2 = v.attach2;
			iParam.parentView = this;
			//trace(Std.string(iParam));
			av = Type.createInstance(cl, [iParam]);
			views.set(iParam.id, av);				
			trace("views.set(" +iParam.id +")");
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
		trace('initState complete :)');
		//trace(J('#' + id).find('.datepicker').length);
		J('#' + id).animate( { opacity:1 }, 300, 'linear', function() { 
			//trace(untyped __js__("this"));
			//trace(J(untyped __js__("this")).attr('id')); 			
			} );
	}
	
	function loadingComplete():Bool
	{
		if (loading > 0)
			return false;
		if (! inputs.foreach(function(i:Input) return i.loading == 0))
			return false;
		else
			return views.foreach(function(v:View) return v.loading==0);
	}
	
	function suspendAll()
	{
		
	}
	
	public function loadData(url:String,params:Dynamic, callBack:Dynamic->Void):Void
	{
		//Out.dumpObject(params);
		trace(Std.string(params));
		loading++;
		JQueryStatic.post(url, params , function(data:Dynamic, textStatus:String, xhr:XMLHttpRequest)
		{
			//trace(data);
			callBack(data);
			loading--;
		}, 'json');
	}
	
	public function find(where:String):Void
	{
		trace(where);
		trace(vData);
		var fData:Dynamic = { };
		var pkeys:Array<String> = 'action,className,fields,limit,order,table,where'.split(',');
		for (f in pkeys)
		{
			if (Reflect.field(vData, f) != null)		
			{
				if (f == 'where')					
				{
					fData.where = (vData.where.any2bool() ? vData.where + ',' + where : where);
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
		params.order = (params.order == j.data('order') + '|DESC' ? j.data('order') + '|ASC' : j.data('order') + '|DESC');		
		trace( params.order);
		loadData('server.php', params, update);
	}	
	
	private function resetParams(?pData:Dynamic):Dynamic
	{
		
		var pkeys:Array<String> = 'action,className,fields,limit,order,table,where'.split(',');
		var aData:Dynamic = pData.any2bool() ? pData : vData;
		fields = aData.fields.any2bool()?aData.fields.split(','):null;
		params = {
			action:'find',
			className:name
		};

		for (f in pkeys)
		{
			if (Reflect.field(aData, f) != null)
			{trace(Reflect.field(aData, f));
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
		data.fields = fields;
		trace(data.fields + ':' + Type.typeof(data.fields));
		//data.fields = 
		if ( J('#' + id + '-list').length > 0)
			J('#' + id + '-list').replaceWith(J('#t-' + id + '-list').tmpl(data));
		else
			J('#t-' + id + '-list').tmpl(data).appendTo(J(data.parentSelector).first());	
		J('#' + id + '-list th').each(function(i, el) { J(el).click(function(_) { order(J(el)); } ); } );	
		J('#' + id + '-list tr').first().siblings().click(select).find('td').off('click');
		J('td').attr('tabindex', -1);
	}
	
	public function select(evt:Event):Void
	{
		trace('has to be implemented in subclass!');
	}
		
}