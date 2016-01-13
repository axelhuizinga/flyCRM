package view;

/**
 * ...
 * @author ...
 */
import haxe.ds.StringMap;
import haxe.Timer;
import jQuery.*;
import jQuery.JHelper.J;
import view.FormData.FData;
import js.Browser;
import App.Rectangle;
import js.html.Audio;
import js.html.Node;
import me.cunity.debug.Out;

using js.JqueryUI;
using Lambda;

class ClientEditor extends Editor
{	
	var screens:StringMap<JQuery>;
	var activeScreen:String;
	var editData:Dynamic;	
	
	public function new(?data:Dynamic)
	{
		super(data);
		accountSelector = "pay_source-form input[name^='account']";
		blzSelector = "pay_source-form input[name^='blz']";
		ibanSelector = "pay_source-form input[name^='iban']";		
	}
	
	override public function contextAction(action:String)
	{
		this.action = action;
		switch(action)
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
						overlay.animate( { opacity:0.0 }, 300, null, function() { overlay.detach(); cMenu.active = cMenu.getIndexOf('find'); } );						
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
								
							}
							else
							{//J('#' + parentView.id + '-edit-form')	TODO: App.inputError implement startsWith
								App.inputError( J('#' + parentView.id + '-edit-form'), ['account[','blz[','iban['] );
							}
						});
					}
					else
					{
						save_sub_screen();
					}
					
					case 'pay_plan', 'pay_history', 'client_history':
						save_sub_screen();
					default:// SAVE CLIENT DATA
						if (parentView.interactionState == 'call')
							cMenu.hangup(this, function() save(action));
						else
							save(action);						
				}

				
			case 'call':
				if (parentView.interactionState == 'call')					
					cMenu.call(this, function() save(action));
				else
				cMenu.call(this);
			case 'pay_plan','pay_source','pay_history','client_history':
				showScreen(action);
			case 'reload':
				reload();
			default:
				trace(action);
		}//DONE END ACTION CASE EDIT
	}
	
	function reload()
	{
		close();
		cMenu.parentView.reloadID = cMenu.parentView.selectedID;
		trace(cMenu.parentView.reloadID);
		cMenu.parentView.find(parentView.lastFindParam);
		
		//trace(cMenu.parentView.id +':' + J('#' + cMenu.parentView.id + 'tr[class~="selected"]').length);
		//edit(J('#' + cMenu.parentView.id + 'tr[class~="selected"]'));
	}
	
	function save_sub_screen()
	{
		var p:Array<FData> = FormData.save(J('#' + activeScreen + '-form'));
		p.push( { name:'className', value:parentView.name });
		p.push( { name:'action', value:'save_' + activeScreen});
		p.push( { name:'user', value:App.user});
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
		//return;
		wait();
		parentView.loadData('server.php', p, function(data:Dynamic) { 
			trace(data +': ' + (data  ? 'Y':'N'));
			if (data) {
				wait(false);
				parentView.interactionState = 'subScreenSaved';
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

		trace(name);
		trace(dRows);
		sData.table = name;
		optionsMap.agent = App.ist.prepareAgentMap();
		sData.optionsMap = optionsMap;
		sData.typeMap = typeMap;
		sData.fieldNames = fieldNames;
		
		//trace(sData.optionsMap);
		var oMargin:Int = 8;
		var mSpace:Rectangle = App.getMainSpace();
		if (name == 'pay_history')
		{
			sData = {rows:[],m_ID:editData.clients.h[0].client_id};
			var kontoRows:Array<Dynamic> = Reflect.field(editData, 'konto_auszug').h;
			for (r in kontoRows)
			{
				sData.rows.push( 
				{ 
					Termin:r.d,
					info:switch(r.reason)
					{
						case "AC01":'IBAN FEHLER';
						case "AC04":'KONTO AUFGELOEST';
						case "MD06":'WIDERSPRUCH DURCH ZAHLER';
						case "MS03":'SONSTIGE GRUENDE';
						default: "''";
					},
					Betrag:r.amount,
					extra:r.IBAN
				});
			}
			
			for (r in dRows)
			{
				sData.rows.push( 
				{ 
					Termin:r.Termin,
					info:'baID ' + r.buchungsanforderungID,
					Betrag:r.Betrag,
					extra:null
				});
			}
			//sData.rows = dateSort('Termin', sData.rows);
			dateSort('Termin', sData.rows);
			//trace(sData);
			screens.set(name, J('#t-pay-history-editor').tmpl(sData).appendTo('#' + parentView.id).css( {
				marginTop:Std.string(mSpace.top + oMargin ) + 'px',
				marginLeft:Std.string(oMargin ) + 'px',
				height:Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(J('#overlay').css('padding-top')) -  Std.parseFloat(J('#overlay').css('padding-bottom'))) + 'px',
				width:Std.string( J('#clients-menu').offset().left - 35 ) + 'px'
			}).animate( { opacity:1 } ));
			
		}
		else
		screens.set(name, J('#t-pay-editor').tmpl(sData).appendTo('#' + parentView.id).css( {
			marginTop:Std.string(mSpace.top + oMargin ) + 'px',
			marginLeft:Std.string(oMargin ) + 'px',
			height:Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(J('#overlay').css('padding-top')) -  Std.parseFloat(J('#overlay').css('padding-bottom'))) + 'px',
			width:Std.string( J('#clients-menu').offset().left - 35 ) + 'px'
		}).animate( { opacity:1 } ));
		activeScreen = name;
		J('#' + parentView.id +' .scrollbox').height(J('#' + parentView.id +' #overlay').height());
	}
	
	override public function save(?status:String):Void
	{
		trace(parentView.interactionState);
		if (parentView.interactionState == 'call')
		{
			if (!ready4save())
			{//	SET WAIT TIMEOUT
				trace ("have to wait...");
					Timer.delay(function() save(status), 500);
				return;				
			}
		}		
		var p:Array<FData> = FormData.save(J('#' + parentView.id + '-edit-form'));
		p.push( { name:'className', value:parentView.name });
		p.push( { name:'action', value:'save' } );
		p.push( { name:'user', value:App.user});
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
		//trace(p);
		//return;
		parentView.loadData('server.php', p, function(data:Dynamic) { 
			trace('>' + data + ':' + Type.typeof(data) + ': ' + (data ? 'Y':'N'));
			if (data) 
			{
				//editCheck(eData); return;
				close();
				if(lastFindParam != null)
					parentView.find(parentView.lastFindParam);
				else
				{
					trace({
						var p:Dynamic = parentView.resetParams();
						if(parentView.vData.order != null)
							p.order = parentView.vData.order;							
						p;
					});
					parentView.find( (parentView.lastFindParam == null ? new StringMap<String>(): parentView.lastFindParam));
				}
				/*
				trace(cMenu.root.attr('id') +':'+ cMenu.root.find('.recordings').length);
				cMenu.root.find('.recordings').remove();
				cMenu.root.data('disabled', 0);
				J(attach2).find('tr').removeClass('selected');
				overlay.animate( { opacity:0.0 }, 300, null, function() { overlay.detach(); } );		*/	
			}
		});
	}
	
	override public function update(data:Dynamic):Void
	{
		parentView.wait(false);
		editData = data.editData;
		//trace('birth_date:' + editData.clients.h[0].birth_date);
		//Reflect.deleteField(editData.clients.h[0], 'owner');
		//trace(editData.pay_plan.h);
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
		fieldNames = App.ist.globals.fieldNames;
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
		//data.editData.pay_plan.h.agent = data.userMap.a
		trace(data.editData.pay_plan.h[0].agent);
		//trace(data.userMap);
		trace(data.userMap.a.find(function(uM) return uM.user == data.editData.pay_plan.h[0].agent) );
		//data.editData.pay_plan.h[0].agent = data.userMap.a.find(function(uM) return uM.user == data.editData.pay_plan.h[0].agent).full_name;
		//trace(data.editData.pay_plan.h);
		overlay = templ.tmpl(data).appendTo('#' + parentView.id).css( {
			marginTop:Std.string(mSpace.top + oMargin ) + 'px',
			marginLeft:Std.string(oMargin ) + 'px',
			height:Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(J('#overlay').css('padding-top')) -  Std.parseFloat(J('#overlay').css('padding-bottom'))) + 'px',
			width:Std.string( J('#clients-menu').offset().left - 35 ) + 'px'
		}).animate( { opacity:1 } );
		trace(parentView.id + ':' + J('#' + parentView.id +'-edit-form .datepicker').length);
		J('#' + parentView.id +'-edit-form .datepicker').each(function(i, n:Node)
		{
			trace(J(n).attr('name'));
			//Out.dumpObjectTree(J(n).datepicker( { dateFormat: "dd.mm.yy" } ));
			var dateString:String = untyped editData.clients.h[0][J(n).attr('name')];
			if (dateString != '' && dateString != '0000-00-00')
			{				
				//dateString = DateTools.delta(Date.now(), -1000 * 3600 * 24 * 365 * 80).toString();
				J(n).datepicker( { dateFormat: "dd.mm.yy" } ).val(DateTools.format(Date.fromString(dateString), '%d.%m.%Y'));
			}
			else
				J(n).datepicker( { dateFormat: "dd.mm.yy" } ).attr("placeholder",DateTools.format(DateTools.delta(Date.now(), -1000 * 3600 * 24 * 365 * 80), '%d.%m.%Y'));
			
			//untyped J(n).setDate(editData.clients[0]);
			//dp.datepicker(options).attr("placeholder", DateTools.format(Date.now(), '%d.%m.%Y'));
		});
		//trace(J(Browser.window).width() + '-' +   J('#clients-menu').offset().left);
		//trace(mSpace.height + ':' +  2 * oMargin + ':' + Std.parseFloat(J('#overlay').css('padding-top')) + ':' + Std.parseFloat(J('#overlay').css('padding-bottom')));
		J('#' + parentView.id +' .scrollbox').height(J('#' + parentView.id +' #overlay').height());
		//trace(id + ':' + parentView.id + ':' + J('#' + parentView.id +' .scrollbox').length + ':' +   J('#' + parentView.id +' .scrollbox').height());
		trace(leadID);
		
		//cMenu.root.accordion("refresh");
	}
	
	static function dateSort(field:String, a:Array<Dynamic>):Array<Dynamic>
	{
		//return untyped Browser.window.dateSort(Reflect.field(a, field), Reflect.field(b, field));
		return untyped Browser.window.dateSort(field, a);
	}
	
}