package view;

/**
 * ...
 * @author axel@cunity.me
 */

import haxe.ds.StringMap;
import haxe.Json;
import haxe.Timer;
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
	public var action:String;
	public var agent:String;
	public var leadID:String;
	var savingFlagSet:Bool;
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
	
	public function  editCheck(dataRow:JQuery)
	{
		var p:Dynamic = resetParams();
		p.primary_id = (vData.primary_id == null ? parentView.primary_id : vData.primary_id);
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
		trace(leadID);
		p.action = 'edit';
		p.fields = (vData.fields != null ? vData.fields : parentView.vData.fields);
		loadData('server.php', p, compareEdit);		
	}
	
	function compareEdit(data:Dynamic):Void
	{
		var displayFormats:Dynamic = untyped window.displayFormats;
		trace(data.rows[0]);
		var cData:Dynamic = data.rows[0];
		var cOK:Bool = true;
		var errors:StringBuf = new StringBuf();
		
		for (f in Reflect.fields(cData))
		{
			if (f == 'vendor_lead_code' && overlay.find('[name="vendor_lead_code"]').val()=='')
				continue;
			var val:Dynamic = '';
			if (Reflect.hasField(displayFormats, f))
			{
				if (untyped __typeof__(Reflect.field(Browser.window, Reflect.field(displayFormats, f))) == 'function')
					val = Reflect.field(Browser.window, Reflect.field(displayFormats, f))(f, Reflect.field(cData, f));
				else
					val = untyped window.sprintf(Reflect.field(displayFormats, f), Reflect.field(cData, f));				
			}
			else
				val = Reflect.field(cData, f);
			cOK = switch(Reflect.field(data.typeMap, f))
			{
				case 'RADIO','CHECKBOX':
					val == overlay.find('[name="$f"]:checked').val();
				default:
					val == overlay.find('[name="$f"]').val();
			}
			
			if (!cOK)
			{
				trace('oops - $f: $val not = ' + overlay.find('[name="$f"]').val());
				errors.add('oops - $f: $val not = ' + overlay.find('[name="$f"]').val() + '\r\n');
				//break;
			}			
		}
		if (errors.length > 0)
		{
			trace('edit check failed :(');
			Browser.window.alert(errors.toString());
		}
		else
		{//DATA SAVED IS VALIDATED AGAINST FORM CONTENT - OK TO CLOSE FORM
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
		}
	}
	
	public function  edit(dataRow:JQuery)
	{
		savingFlagSet = false;
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
	
	function close()
	{
		trace('going to close:' + J('#overlay').length);
		cMenu.root.find('.recordings').remove();
		cMenu.root.data('disabled', 0);
		J(cMenu.attach2).find('tr').removeClass('selected');
		if (parentView.interactionState == 'call')
			cMenu.activePanel.find('button[data-contextaction="call"]').html('Anrufen');
		parentView.interactionState = 'init';
		//J('#overlay').animate( { opacity:0.0 }, 300, null, function() { J('#overlay').detach(); } );
		overlay.animate( { opacity:0.0 }, 300, null, function() { overlay.detach(); } );		
	}
	
	public function contextAction(action:String)
	{
		this.action = action;
		switch(action)
		{
			case 'close':
				close();
			case 'save', 'qcok':
				if (!checkIban())
				{
					checkAccountAndBLZ(function(ok:Bool)
					{
						trace (ok);
						if (ok)
						{
							//TODO: TEST THE CHANGE FROM ACTION TO ENDACTION
							if (parentView.interactionState == 'call')
								cMenu.hangup(this, function() save(action));
							else
								save(action);
						}
						else
						{
							App.inputError( J('#' + parentView.id + '-edit-form'), ['account','blz','iban'] );
						}
					});
				}
				else {
					if (parentView.interactionState == 'call')
						cMenu.hangup(this, function() save(action));
					else
						save(action);
				}
			case 'qcbad':
				if (parentView.interactionState == 'call')
					cMenu.hangup(this, function() save(action));
				else				
					save(action);
			case 'call':
				if (parentView.interactionState == 'call')					
					cMenu.call(this, function() save(action));
				else
					cMenu.call(this);
			default:
				trace(action);
		}//DONE END ACTION CASE EDIT
	}
	
	function ready4save():Bool
	{
		var p:Array<FData> = new Array();
		p.push( { name:'className', value:'AgcApi' } );
		p.push( { name:'action', value:'check4Update' });
		p.push( { name:'lead_id', value:leadID } );
		var amReady:Bool = false;
		JQueryStatic.ajax({
			type: 'POST',
			url: 'server.php',
			data: p,
			success: function(result) 
			{
				trace(result);
				try
				{
					if (result.response.security_phrase == 'XXX')
					{
						trace('OK - XXX HAS BEEN RESTORED');
						amReady = true;
					}				
				}
				catch (ex:Dynamic)
				{
					trace(ex);
				}

			},
			dataType: 'json',
			async:false
		});
		trace('returning $amReady');
		return amReady;
	}
	
	public function save(?status:String):Void
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
		//trace(p);
		p.push( { name:'className', value:parentView.name });
		p.push( { name:'action', value:'save' });
		p.push( { name:'primary_id', value: parentView.vData.primary_id} );
		p.push( { name:parentView.vData.primary_id, value: eData.attr('id') } );
		trace (status);
		switch (status)
		{
			case 'qcok','qcbad','call':
			p.push( { name:'status', value: (status=='call' ? 'QCOPEN': status.toUpperCase()) });
		}
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
				editCheck(eData);
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
		data.user = eData.data('owner');
		optionsMap = data.optionsMap = dataOptions;
		typeMap = data.typeMap;
		var dRows:Array<Dynamic> = data.rows;
		var fieldDefault:Dynamic = data.fieldDefault;
		for (row in dRows)
		{
			for (f in Reflect.fields(row))
			{
				if (Reflect.field(row,f)=='' && Reflect.hasField(fieldDefault, f))
					Reflect.setField(row, f, Reflect.field(fieldDefault, f));
			}
			
		}
		//trace(data);
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