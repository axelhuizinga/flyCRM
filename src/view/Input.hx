package view;
import jQuery.JQueryStatic;
import js.html.XMLHttpRequest;

/**
 * ...
 * @author axel@cunity.me
 */
class Input
{
	var vData:Dynamic;
	var params:Dynamic;
	public var name:String;
	public var id:String;
	public var loading:Int;
	public var parentView:View;
	
	public function new(data:Dynamic) 
	{
		if (!(data.limit > 0))
			data.limit = 15;
		vData = data;
		parentView = data.parentView;
		name = Type.getClassName(Type.getClass(this)).split('.').pop();
		id = parentView.id + '_' + data.id ;
		loading = 0;
	}
	
	function loadData(data:Dynamic, callBack:Dynamic->Void)
	{
		loading++;
		JQueryStatic.post('server.php', data , function(data:Dynamic, textStatus:String, xhr:XMLHttpRequest)
		{
			//trace(data);
			callBack(data);
			loading--;
		});		
	}
	
}