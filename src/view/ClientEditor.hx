package view;

/**
 * ...
 * @author ...
 */
import haxe.ds.StringMap;
import jQuery.*;
import jQuery.JHelper.J;
import jQuery.FormData.FData;
import js.Browser;
import App.Rectangle;
import js.html.Audio;

class ClientEditor extends Editor
{	
	override public function save(qcok:Bool):Void
	{
		var p:Array<FData> = FormData.save(J('#' + parentView.id + '-edit-form'));
		p.push( { name:'className', value:parentView.name });
		p.push( { name:'action', value:'save' });
		p.push( { name:'primary_id', value: parentView.vData.primary_id} );
		p.push( { name:parentView.vData.primary_id, value: eData.attr('id') } );
		//if (endAction == 'qcok')
		if (qcok)
			p.push( { name:'status', value:'MITGL' });
		if (parentView.vData.hidden != null)
		{							
			var hKeys:Array<String> = parentView.vData.hidden.split(',');
			for (k in hKeys)
			{
				p.push( { name:k, value:eData.data(k) } );
			}													
		}
		//trace(p);
		parentView.loadData('server.php', p, function(data:Dynamic) { 
			trace(data +': ' + (data == 'true' ? 'Y':'N'));
			if (data == 'true') {
				trace(root.find('.recordings').length);
				root.find('.recordings').remove();
				root.data('disabled', 0);
				J(attach2).find('tr').removeClass('selected');
				J('#overlay').animate( { opacity:0.0 }, 300, null, function() { J('#overlay').detach(); } );			
			}
		});
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
		//trace(parentView.id + ':' + J(Browser.window).width() + ' - ' + cMenu.root.outerWidth());
		//trace(templ.tmpl(data));
		var oMargin:Int = 8;
		var mSpace:Rectangle = App.getMainSpace();
		//FILL TEMPLATE AND SHOW EDITOR FORM OVERLAY
		templ.tmpl(data).appendTo('#' + parentView.id).css( {
			marginTop:Std.string(mSpace.top + oMargin ) + 'px',
			marginLeft:Std.string(oMargin ) + 'px',
			height:Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(J('#overlay').css('padding-top')) -  Std.parseFloat(J('#overlay').css('padding-bottom'))) + 'px'
		}).animate( { opacity:1 } );
		trace(mSpace.height + ':' +  2 * oMargin + ':' + Std.parseFloat(J('#overlay').css('padding-top')) + ':' + Std.parseFloat(J('#overlay').css('padding-bottom')));
		J('#' + parentView.id +' .scrollbox').height(J('#' + parentView.id +' #overlay').height());
		trace(id + ':' + parentView.id + ':' + J('#' + parentView.id +' .scrollbox').length + ':' +   J('#' + parentView.id +' .scrollbox').height());
		//trace(data.recordings);
		var r:EReg = ~/([a-z0-9_-]+.mp3)$/;
		data = { recordings:data.recordings.map(function(rec) {
				rec.filename = ( r.match(rec.location) ?  r.matched(1) : rec.location);
				return rec;
			})
		};
		var recordings:JQuery = J('#t-' + parentView.id + '-recordings').tmpl(data);
		cMenu.activePanel.find('form').append(recordings);
		cMenu.root.accordion("refresh");
	}
	
}