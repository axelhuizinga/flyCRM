package view;

/**
 * ...
 * @author axel@cunity.me
 */

import haxe.ds.StringMap;
import jQuery.*;
import jQuery.JHelper.J;
import jQuery.FormData.FData;
import js.Browser;
import App.Rectangle;
import js.html.Audio;
import js.html.Node;
import me.cunity.debug.Out;
import me.cunity.js.data.IBAN;

using Lambda;

class Editor extends View
{
	var cMenu:ContextMenu;
	var fieldNames:Dynamic;
	var overlay:JQuery;
	var optionsMap:Dynamic;
	var typeMap:Dynamic;
	public var eData(default, null):JQuery;
	public var agent:String;
	public var leadID:String;
	public function new(?data:Dynamic)  
	{
		super(data);
		cMenu =  cast (parentView.views.get(parentView.instancePath + '.' + parentView.id + '-menu'), ContextMenu);
		name = parentView.name;	//ACCESS PARENT VIEW CLASS ON SERVER
		//Out.dumpObject(data);
		templ = J('#t-' + id);
		trace(id);
		init();
	}
	
	public function checkIban():Bool
	{
		var iban:String = J('#' + parentView.id + '-edit-form  input[name="iban"]').val();
		trace(iban);
		return IBAN.checkIBAN(iban);
	}
	
	public function checkAccountAndBLZ(ok2submit:Bool->Void):Void
	{
		var account:String = J('#' + parentView.id + '-edit-form input[name="account"]').val();
		var blz:String = J('#' + parentView.id + '-edit-form input[name="blz"]').val();
		trace(account + ':' + blz);
		if (!(account.length > 0 && blz.length > 0))
		{
			ok2submit(false);
			return;
		}
		IBAN.buildIBAN(account, blz, function(success:IbanSuccess) {
			if (IBAN.checkIBAN(success.iban))
			{
				J('#' + parentView.id + '-edit-form input[name="iban"]').val(success.iban);
				ok2submit(true);
			}
		},
		function(error:IbanError)
		{
			trace(error.message);
			ok2submit(false);
		});
	}
	
	//public function  edit(dataRow:JQuery, className:String)
	public function  edit(dataRow:JQuery)
	{
		var p:Dynamic = resetParams();
		p.primary_id = (vData.primary_id == null ? parentView.primary_id : vData.primary_id);
		eData = dataRow;
		Reflect.setField(p, p.primary_id, eData.attr('id'));
	
		if (parentView.vData.hidden != null)
		{			
			//copy all data fields from this dataRow to the load parameter
			var hKeys:Array<String> = parentView.vData.hidden.split(',');
			for (k in hKeys)
			{
				Reflect.setField(p, k, eData.data(k));
			}
		}
		trace(p);	
		leadID = p.lead_id;
		trace(leadID);
		p.action = 'edit';
		//var eFields:Array<String> = vData.fields;
		//p.fields = parentView.vData.fields.split(',').filter(function(f:String) return (eFields.has(f) ? ;
		p.fields = (vData.fields != null ? vData.fields : parentView.vData.fields);
		cMenu.set_active(cMenu.getIndexOf(vData.action));
		loadData('server.php', p, update);		
		//active = cMenu.getIndexOf(vData.trigger.split('|')[1]);
		//cMenu.set_active(cMenu.getIndexOf(vData.trigger.split('|')[1]));
	}
	
	public function endAction(action:String)
	{
		switch(action)
		{
			case 'close':
				trace('going to close:' + J('#overlay').length);
				cMenu.root.find('.recordings').remove();
				cMenu.root.data('disabled', 0);
				J(cMenu.attach2).find('tr').removeClass('selected');
				parentView.interactionState = 'init';
				//J('#overlay').animate( { opacity:0.0 }, 300, null, function() { J('#overlay').detach(); } );
				overlay.animate( { opacity:0.0 }, 300, null, function() { overlay.detach(); } );
			case 'save', 'qcok':
				if (!checkIban())
				{
					checkAccountAndBLZ(function(ok:Bool)
					{
						trace (ok);
						if (ok)
						{
							//TODO: TEST THE CHANGE FROM ACTION TO ENDACTION
							save(action == 'qcok');
						}
						else
						{//J('#' + parentView.id + '-edit-form')
							App.inputError( J('#' + parentView.id + '-edit-form'), ['account','blz','iban'] );
							/*App.modal('confirm', { 
								header:'Bitte folgende Werte prüfen:',
								id:parentView.id,
								info:'IBAN, Kontonummer oder  BLZ sind nicht korrekt!',
								mID:'confirm',
								confirm:[]
							} );*/
						}
					});
				}
				else
					save(action == 'qcok');
				
			case 'call':
				cMenu.call(this);
			default:
				trace(action);
		}//DONE END ACTION CASE EDIT
	}
	
	public function save(qcok:Bool):Void
	{
		var p:Array<FData> = FormData.save(J('#' + parentView.id + '-edit-form'));
		p.push( { name:'className', value:parentView.name });
		p.push( { name:'action', value:'save' });
		p.push( { name:'primary_id', value: parentView.vData.primary_id} );
		p.push( { name:parentView.vData.primary_id, value: eData.attr('id') } );
		if (qcok)
			p.push( { name:'status', value:'QCOK' });
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
		parentView.loadData('server.php', p, function(data:Dynamic) { 
			trace(data +': ' + (data ? 'Y':'N'));
			if (data) {
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
		agent = data.agent;
		trace(data.agent);
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
		data.user = eData.data('user');
		optionsMap = data.optionsMap = dataOptions;
		typeMap = data.typeMap;
		var r:EReg = ~/([a-z0-9_-]+.mp3)$/;
		var rData = { recordings:data.recordings.map(function(rec) {
				rec.filename = ( r.match(rec.location) ?  r.matched(1) : rec.location);
				return rec;
			})
		};
		var recordings:JQuery = J('#t-' + parentView.id + '-recordings').tmpl(rData);
		cMenu.activePanel.find('form').append(recordings);		

		var oMargin:Int = 8;
		var mSpace:Rectangle = App.getMainSpace();
		//FILL TEMPLATE AND SHOW EDITOR FORM OVERLAY
		overlay = templ.tmpl(data).appendTo('#' + parentView.id).css( {
			marginTop:Std.string(mSpace.top + oMargin ) + 'px',
			marginLeft:Std.string(oMargin ) + 'px',
			height:Std.string(mSpace.height - 2 * oMargin - Std.parseFloat(J('#overlay').css('padding-top')) -  Std.parseFloat(J('#overlay').css('padding-bottom'))) + 'px',
			width:Std.string( J('#'+parentView.vData.id+'-menu').offset().left - 35 ) + 'px'
		}).animate( { opacity:1 } );
		trace(mSpace.height + ':' +  2 * oMargin + ':' + Std.parseFloat(J('#overlay').css('padding-top')) + ':' + Std.parseFloat(J('#overlay').css('padding-bottom')));
		J('#' + parentView.id +' .scrollbox').height(J('#' + parentView.id +' #overlay').height());
		trace(id + ':' + parentView.id + ':' + J('#' + parentView.id +' .scrollbox').length + ':' +   J('#' + parentView.id +' .scrollbox').height());
		//trace(data.recordings);

		//cMenu.root.accordion("refresh");
	}
	
}