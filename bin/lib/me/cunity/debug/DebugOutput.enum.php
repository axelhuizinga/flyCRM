<?php

class me_cunity_debug_DebugOutput extends Enum {
	public static $CONSOLE;
	public static $HAXE;
	public static $NATIVE;
	public static $__constructors = array(0 => 'CONSOLE', 1 => 'HAXE', 2 => 'NATIVE');
	}
me_cunity_debug_DebugOutput::$CONSOLE = new me_cunity_debug_DebugOutput("CONSOLE", 0);
me_cunity_debug_DebugOutput::$HAXE = new me_cunity_debug_DebugOutput("HAXE", 1);
me_cunity_debug_DebugOutput::$NATIVE = new me_cunity_debug_DebugOutput("NATIVE", 2);
