package jQuery;
import js.html.DOMWindow;
import js.html.Element;
import js.html.Node;
import jQuery.JQuery;

/**
 * @author axel@cunity.me
 */

extern class JHelper {
	@:overload(function(j:JQuery):JQuery{})
	@:overload(function(j:DOMWindow):JQuery{})
	@:overload(function(j:Element):JQuery{})
	@:overload(function(j:Node):JQuery{})
	@:overload(function(html:String, context:JQuery):JQuery{})
	public static inline function J( html : String ) : JQuery {
		return new JQuery(html);
	}
	
	@:overload(function(j:JQuery,template:String, data:Dynamic):JQuery{})
	public static function loadTemplate(j:JQuery, template:JQuery, data:Dynamic): JQuery;

	/*public static var JTHIS(get, null) : JQuery;

	static inline function get_JTHIS() : JQuery {
		return untyped __js__("$(this)");
	}*/

}