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

using Lambda;

class ClientEditor extends Editor
{	
	var screens:StringMap<JQuery>;
	var activeScreen:String;
	var editData:Dynamic;
	
	public function new(?data:Dynamic)
	{
		super(data);
	}
	
	override public function endAction(endAction:String)
	{
		switch(endAction)
		{
			case 'close':
				trace('going to close:' + J('#overlay').length);
				switch(activeScreen)
				{
					case 'pay_plan', 'pay_source', 'pay_history', 'client_history':
						var s:JQuery = screens.get(activeScreen);
						s.animate( { opacity:0.0 }, 300, null, function() { s.detach(); } );
						activeScreen = null;
					default:
						cMenu.root.find('.recordings').remove();
						cMenu.root.data('disabled', 0);
						J(cMenu.attach2).find('tr').removeClass('selected');
						parentView.interactionState = 'init';
						overlay.animate( { opacity:0.0 }, 300, null, function() { overlay.detach(); } );						
				}

			case 'save':
				switch(activeScreen)
				{
					case 'pay_source':
					if (!checkIban())
					{
						checkAccountAndBLZ(function(ok:Bool)
						{
							trace (ok);
							if (ok)
							{
								save_pay_screen();
							}
							else
							{//J('#' + parentView.id + '-edit-form')
								App.inputError( J('#' + parentView.id + '-edit-form'), ['account','blz','iban'] );
							}
						});
					}
					case 'pay_plan', 'pay_history', 'client_history':
						save_pay_screen();
					default:// SAVE CLIENT DATA
						save(false);
				}

				
			case 'call':
				cMenu.call(this);
			case 'pay_plan','pay_source','pay_history','client_history':
				showScreen(endAction);
			default:
				trace(endAction);
		}//DONE END ACTION CASE EDIT
	}
	
	function save_pay_screen()
	{
		var p:Array<FData> = FormData.save(J('#' + activeScreen + '-form'));
		p.push( { name:'className', value:parentView.name });
		p.push( { name:'action', value:'save' });
		p.push( { name:'primary_id', value:vData.primary_id} );
		p.push( { name: vData.primary_id, value: eData.attr('id') } );
		if (parentView.vData.hidden != null)
		{							
			var hKeys:Array<String> = parentView.vData.hidden.split(',');
			for (k in hKeys)
			{
				if(eData.data(k) != null && p.foreach(function(jD:FData) return jD.name!=k))
					p.push( { name:k, value:eData.data(k) } );
			}
			p.push( { name:'table', value:activeScreen } );
		}
		trace(p);
		return;
		parentView.loadData('server.php', p, function(data:Dynamic) { 
			trace(data +': ' + (data == 'true' ? 'Y':'N'));
			if (data == 'true') {
			var s:JQuery = screens.get(activeScreen);
			s.animate( { opacity:0.0 }, 300, null, function() { s.detach(); } );
			activeScreen = null;
			}
		});
	}
	
	function showScreen(name:String):Void
	{
		if (activeScreen != null)
		{
			var s:JQuery = screens.get(activeScreen);
			s.animate( { opacity:0.0 }, 300, null, function() { s.detach(); } );			
		}
		var dRows:Array<Dynamic> = Reflect.field(editData, name).h;
		var sData:Dynamic = Reflect.field(editData, name);// { h:[] };
		//trace(dRows);
		/*for (r in dRows)
		{
			var aRow:Dynamic = { };
			for (f in Reflect.fields(r))
			{
				Reflect.setField(aRow, f+'[]', Reflect.field(f, r));
			}
			sData.h.push(aRow);
		}*/
		sData.table = name;
		sData.optionsMap = optionsMap;
		sData.typeMap = typeMap;
		sData.fieldNames = fieldNames;
		
		//trace(sData);
		var oMargin:Int = 8;
		var mSpace:Rectangle = App.getMainSpace();
		screens.set(name, J('#t-pay-editor').tmpl(sData).appendTo('#' + parentView.id).css( {
			marginTop:Std.string(mSpace.top + oMargin ) + 'px',
			marginLeft:Std.string(oMargin ) + 'px',
			height:Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(J('#overlay').css('padding-top')) -  Std.parseFloat(J('#overlay').css('padding-bottom'))) + 'px',
			width:Std.string( J('#clients-menu').offset().left - 35 ) + 'px'
		}).animate( { opacity:1 } ));
		activeScreen = name;
	}
	
	override public function save(_):Void
	{
		var p:Array<FData> = FormData.save(J('#' + parentView.id + '-edit-form'));
		p.push( { name:'className', value:parentView.name });
		p.push( { name:'action', value:'save' });
		p.push( { name:'primary_id', value: parentView.vData.primary_id} );
		p.push( { name:parentView.vData.primary_id, value: eData.attr('id') } );
		if (parentView.vData.hidden != null)
		{							
			var hKeys:Array<String> = parentView.vData.hidden.split(',');
			for (k in hKeys)
			{
				if(eData.data(k) != null && p.foreach(function(jD:FData) return jD.name!=k))
					p.push( { name:k, value:eData.data(k) } );
			}													
		}
		trace(p);
		//return;
		parentView.loadData('server.php', p, function(data:Dynamic) { 
			trace(data +': ' + (data == 'true' ? 'Y':'N'));
			if (data == 'true') {
				trace(root.find('.recordings').length);
				root.find('.recordings').remove();
				root.data('disabled', 0);
				J(attach2).find('tr').removeClass('selected');
				overlay.animate( { opacity:0.0 }, 300, null, function() { overlay.detach(); } );			
			}
		});
	}
	
	override public function update(data:Dynamic):Void
	{
		parentView.wait(false);
		editData = data.editData;
		agent = data.agent;
		screens = new StringMap();
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
		fieldNames = data.fieldNames;
		optionsMap = data.optionsMap = dataOptions;
		typeMap = data.typeMap;
		var r:EReg = ~/([a-z0-9_-]+.mp3)$/;
		var rData:Dynamic = { recordings:data.recordings.map(function(rec) {
				rec.filename = ( r.match(rec.location) ?  r.matched(1) : rec.location);
				return rec;
			})
		};
		var recordings:JQuery = J('#t-' + parentView.id + '-recordings').tmpl(rData);
		//trace(recordings.html());
		cMenu.activePanel.find('form').append(recordings);
		var oMargin:Int = 8;
		var mSpace:Rectangle = App.getMainSpace();
		//FILL TEMPLATE AND SHOW EDITOR FORM OVERLAY
		overlay = templ.tmpl(data).appendTo('#' + parentView.id).css( {
			marginTop:Std.string(mSpace.top + oMargin ) + 'px',
			marginLeft:Std.string(oMargin ) + 'px',
			height:Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(J('#overlay').css('padding-top')) -  Std.parseFloat(J('#overlay').css('padding-bottom'))) + 'px',
			width:Std.string( J('#clients-menu').offset().left - 35 ) + 'px'
		}).animate( { opacity:1 } );
		//trace(J(Browser.window).width() + '-' +   J('#clients-menu').offset().left);
		//trace(mSpace.height + ':' +  2 * oMargin + ':' + Std.parseFloat(J('#overlay').css('padding-top')) + ':' + Std.parseFloat(J('#overlay').css('padding-bottom')));
		J('#' + parentView.id +' .scrollbox').height(J('#' + parentView.id +' #overlay').height());
		//trace(id + ':' + parentView.id + ':' + J('#' + parentView.id +' .scrollbox').length + ':' +   J('#' + parentView.id +' .scrollbox').height());
		trace(leadID);

		
		//cMenu.root.accordion("refresh");
	}
	
}