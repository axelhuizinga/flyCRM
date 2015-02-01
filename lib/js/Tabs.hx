package js;

import jQuery.*;
/**
 * ...
 * @author axel@cunity.me
 */

class Tabs
{
	//@:overload(function(tb:Tabs,?options:Dynamic):JQuery{})
	public static function tabs(tb:JQuery, ?options:Dynamic) :JQuery
	{
		return untyped tb.tabs(options);
	};	
	
	
}