package view;
import jQuery.*;
import jQuery.JHelper.J;
import jQuery.JQueryStatic;
import js.Browser;

using StringTools;
/**
 * ...
 * @author axel@cunity.me
 */
class Mailing extends View
{
	var cMenu:ContextMenu;
	var host:String;
	var proto:String;
	
	public var mailingID:String;
	
	public function new(?data:Dynamic) 
	{
		super(data);
		host = Browser.window.location.host;
		proto = Browser.window.location.protocol;
		init();
	}
	
	public function printNewMembers(mID:String):Void
	{
		var url:String = '$proto//$host/cgi-bin/mailing.pl?action=PRINTNEW';		
		trace(url);
		
		var res:String = JQueryStatic.ajax({
			async: false,
			url:url,
			dataType:'json'
		}).responseText;			
		var json:Dynamic = JQueryStatic.parseJSON(res);
		json.id = 'clients';
		trace(Reflect.fields(json));	
		trace(json);	
		App.info(json);
	}
	
	public function printList(mID:String):Void
	{
		var list:String = J('#$mID #printListe').val();
		var url:String = '$proto//$host/cgi-bin/mailing.pl?action=PRINTLIST&list=' + list.urlEncode();		
		trace(url);
		J('#preparing-file-download').show();
		JQueryStatic.fileDownload(url, {
			successCallback: function(url)
			{										
				trace('OK: $url');
				//J('#$mID #preparing-file-download').hide();
			},
			failCallback: function(responseHtml, url)
			{										
				trace('oops $url $responseHtml');
				//J('#$mID #preparing-file-download').hide();
				J("#error-download").show();
			}
		} );
		return;
		var res:String = JQueryStatic.ajax({
			async: false,
			url:url,
			dataType:'json'
		}).responseText;			
		var json:Dynamic = JQueryStatic.parseJSON(res);
		json.id = 'clients';
		trace(Reflect.fields(json));	
		trace(json);	
		App.info(json);
	}

	public function printNewInfos(mID:String):Void
	{
		var url:String = '$proto//$host/cgi-bin/mailing.pl?action=S_POST';		
		trace(url);
		wait(1);
		var result:String = JQueryStatic.ajax({
			async: false,
			url:url
		}).responseText;			
		trace(result);
		wait();
	}
	
	public function previewOne(mID:String):Void
	{
		
	}
}