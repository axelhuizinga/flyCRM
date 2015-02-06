package view;
import haxe.Timer;
import jQuery.JHelper;
import jQuery.*;
import jQuery.JHelper.J;
/**
 * ...
 * @author axel@cunity.me
 */
@:keep class DateTime extends View
{
	var format:String;
	
	var interval:Int;
	
	public function new(?data:Dynamic) 
	{
		super(data);
		trace(template);
		interval = data.interval;
		format = data.format;
		draw();
		var t:Timer = new Timer(interval);
		t.run = draw;		
	}
	
	public function draw():Void
	{
		J('#' + id).html(~/{([a-x]*)}/g.replace(template, DateTools.format(Date.now(), format)));
	}
	
}