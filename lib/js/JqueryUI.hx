package js;

import jQuery.*;
/**
 * ...
 * @author axel@cunity.me
 */

class JqueryUI
{	
	
	public static function tabs(tb:JQuery, ?options:Dynamic) :JQuery
	{
		return untyped tb.tabs(options);
	};	
	
	@:overload(function(ac:JQuery, op:String, ?field:String, ?val:Dynamic):JQuery{})
	public static function accordion(ac:JQuery, ?options:Dynamic):JQuery
	{
		return untyped ac.accordion(options);
	}
	
	public static function datepicker(dp:JQuery, ?options:Dynamic):JQuery
	{
		return untyped dp.datepicker(options);
	}
	
}