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
	
	public static function accordion(ac:JQuery, ?options:Dynamic):JQuery
	{
		return untyped tb.accordion(options);
	}
	
	
}