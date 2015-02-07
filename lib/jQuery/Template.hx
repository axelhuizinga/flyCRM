package jQuery;

import jQuery.haxe.Plugin;

/**
 * ...
 * @author axel@cunity.me
 */
extern class Template implements Plugin
{

	//inline public function tmpl(data:Dynamic):jQuery.JQuery return this;
	public function tmpl(data:Dynamic):jQuery.JQuery 
	{
		trace(data);
		return untyped this.tmpl(data);
	}
	
}