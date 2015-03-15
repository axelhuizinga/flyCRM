package view;

/**
 * ...
 * @author axel@cunity.me
 */

import haxe.ds.StringMap;
import jQuery.*;
import jQuery.JHelper.J;
import js.Browser;
import App.Rectangle;


class Editor extends View
{
	var cMenu:ContextMenu;
	var active:Int;
	
	public function new(?data:Dynamic)  
	{
		super(data);
		cMenu =  cast (parentView.views.get(parentView.instancePath + '.' + data.trigger.split('|')[0]), ContextMenu);
		name = parentView.name;	
		//Out.dumpObject(data);
		templ = J('#t-' + id);
		trace(id);
	}
	
	public function  edit(id:JQuery, className:String)
	{
		var p:Dynamic = resetParams();
		p.primary_id = parentView.primary_id;
		Reflect.setField(p, p.primary_id, id.attr('id'));
		trace(p);
		if (parentView.vData.hidden != null)
		{			
			p.hidden = parentView.vData.hidden;
			Reflect.setField(p, p.hidden, id.data(p.hidden));
		}
		p.action = 'edit';
		p.fields = parentView.vData.fields;
		loadData('server.php', p, update);		
		active = cMenu.getIndexOf(vData.trigger.split('|')[1]);
		cMenu.set_active(active);
	}
	
	override public function update(data:Dynamic):Void
	{
		parentView.wait(false);
		//primary_id,hidden,
		//trace(data);
		var dataOptions:Dynamic = {};
		var keys:Array<String> = Reflect.fields(data.optionsMap);
		for (k in keys)
		{
			var opts:Array<Array<String>> = new Array();
			var optRows: Array<String> = Reflect.field(data.optionsMap, k).split('\r\n');
			for (r in optRows)
				opts.push(r.split(','));
			Reflect.setField(dataOptions, k, opts);
		}
		data.optionsMap = dataOptions;
		//trace(parentView.id);
		//trace(templ.tmpl(data));
		var mSpace:Rectangle = App.getMainSpace();
		templ.tmpl(data).appendTo('#' + parentView.id).css( {
		marginTop:Std.string(mSpace.top) + 'px',
		height:Std.string(mSpace.height - Std.parseFloat(J('#overlay').css('padding-top')) -  Std.parseFloat(J('#overlay').css('padding-bottom'))) + 'px'		
		}).animate( { opacity:1 } );
		trace(data.recordings);
		var r:EReg = ~/([a-z0-9_-]+.mp3)$/;
		data = { recordings:data.recordings.map(function(rec) {
				rec.filename = ( r.match(rec.location) ?  r.matched(1) : rec.location);
				return rec;
			})
		};
		cMenu.activePanel.find('form').append(J('#t-' + parentView.id + '-recordings').tmpl(data));
		//J('#wait').animate( { opacity:0.0 }, 300, null, function() { J('#wait').detach();  trace(J('#wait' ).length); } );
	}
	
}