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
	var inputs:StringMap<Input>;
	var views:StringMap<View>;
	var parentView:View;
	var params:Dynamic;
	
	var loading:Int;
	var listening:ObjectMap<JQuery,String>;
	var suspended:StringMap<JQuery>;
	var interactionStates:StringMap<InteractionState>;
	
	public var id:String;	
	public var interactionState(default, set):String;
	
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
		root = J('#' + id);
		trace(name + ':'  + id + ':' + root.length + ':' + attach2); 		
		interactionStates = new StringMap();
		listening = new ObjectMap();
		suspended = new StringMap();
		loading = 0;
	}
	
	public function set_interactionState(iState:String):String
	{
		interactionState = iState;
		var iS:InteractionState = interactionStates.get(iState);
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
	
	public function addListener(jListener:JQuery)
	{
		jListener.each(function(i, n)
		{
			listening.set(J(n), n.attributes.getNamedItem('data-action'	).nodeValue);
		});
	}
	
	public function addView(v:Dynamic):View
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
		if (!loadingComplete())
			Timer.delay(initState, 1000);
		addListener(J('button[data-action]'));
		interactionState = 'init';
		J('td').attr('tabindex', -1);
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
		});
	}
	
	public function find(where:String):Void
	{
		resetParams(where);
		loadData('server.php', params, update);
	}
	
	public function order(field:String):Void
	{
		trace(field);
		if (params.order != field)
		{
			params.order = field;
			loadData('server.php', params, update);
		}
	}	
	
	private function resetParams(where:String = ''):Dynamic
	{
		fields = vData.fields;
		params = {
			action:'find',
			className:name,
			dataType:'json',
			fields:fields.join(','),
			limit:vData.limit,
			table:vData.table,
			where:(vData.where.length>0 ? vData.where + (where == '' ? where : ',' + where) : where )
		}
		return params;
	}
	
	public function update(data:Dynamic):Void
	{
		data.fields = fields;
		if ( J('#' + id + '-list').length > 0)
			J('#' + id + '-list').replaceWith(J('#t-' + id + '-list').tmpl(data));
		else
			J('#t-' + id + '-list').tmpl(data).appendTo(J(data.parentSelector).first());	
		J('#' + id + '-list th').each(function(i, el) { J(el).click(function(_) { order(J(el).data('order')); } ); } );	
		J('#' + id + '-list tr').first().siblings().click(select).find('td').off('click');
		J('td').attr('tabindex', -1);
	}
	
	public function select(evt:Event):Void
	{
		trace('has to be implemented in subclass!');
	}
		
}