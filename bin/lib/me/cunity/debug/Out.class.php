<?php

class me_cunity_debug_Out {
	public function __construct(){}
	static $suspended = false;
	static $skipFunctions = true;
	static $traceToConsole = false;
	static $traceTarget;
	static function aStack() { $args = func_get_args(); return call_user_func_array(self::$aStack, $args); }
	static $aStack;
	static $logg;
	static $dumpedObjects;
	static $log;
	static $once = false;
	static function init() {
		sys_io_File::saveContent("log.txt", "");
		me_cunity_debug_Out::$log = sys_io_File::write("log.txt", true);
		me_cunity_debug_Out::$log->flush();
		haxe_Log::$trace = (isset(me_cunity_debug_Out::$_trace) ? me_cunity_debug_Out::$_trace: array("me_cunity_debug_Out", "_trace"));
	}
	static function _trace($v, $i = null) {
		if(me_cunity_debug_Out::$suspended) {
			return;
		}
		$warned = false;
		if($i !== null && _hx_has_field($i, "customParams")) {
			$i = $i->customParams[0];
		}
		$msg = null;
		if($i !== null) {
			$msg = _hx_string_or_null($i->fileName) . ":" . _hx_string_or_null($i->methodName) . ":" . _hx_string_rec($i->lineNumber, "") . ":";
		} else {
			$msg = "";
		}
		$msg .= Std::string($v);
		if(me_cunity_debug_Out::$log !== null) {
			me_cunity_debug_Out::$log->writeString(_hx_string_or_null($msg) . "\x0A");
			me_cunity_debug_Out::$log->flush();
		} else {
			$_g = me_cunity_debug_Out::$traceTarget;
			switch($_g->index) {
			case 2:{
				error_log($msg);
			}break;
			case 0:{
				php_Lib::hprint(_hx_string_or_null($msg) . "\x0D\x0A");
			}break;
			case 1:{
				php_Lib::hprint(_hx_string_or_null(StringTools::htmlEscape($msg, null)) . "<br/>");
			}break;
			}
		}
		if(me_cunity_debug_Out::$once) {
			me_cunity_debug_Out::$once = false;
			me_cunity_debug_Out::_trace("i:" . Std::string(Type::typeof($i)), _hx_anonymous(array("fileName" => "Out.hx", "lineNumber" => 127, "className" => "me.cunity.debug.Out", "methodName" => "_trace")));
			me_cunity_debug_Out::dumpObject($i, _hx_anonymous(array("fileName" => "Out.hx", "lineNumber" => 128, "className" => "me.cunity.debug.Out", "methodName" => "_trace")));
		}
	}
	static function log2($v, $i = null) {
		$msg = null;
		if($i !== null) {
			$msg = _hx_string_or_null($i->fileName) . ":" . _hx_string_rec($i->lineNumber, "") . ":" . _hx_string_or_null($i->methodName) . ":";
		} else {
			$msg = "";
		}
		$msg .= Std::string($v);
		$http = new haxe_Http("http://localhost/devel/php/jsLog.php");
		$http->setParameter("log", $msg);
		$http->onData = array(new _hx_lambda(array(&$http, &$i, &$msg, &$v), "me_cunity_debug_Out_0"), 'execute');
		$http->request(true);
	}
	static function printCDATA($data, $i = null) {
		me_cunity_debug_Out::_trace("<pre>" . _hx_string_or_null((_hx_string_or_null(htmlspecialchars ($data)) . "</pre>")), $i);
	}
	static function dumpVar($v, $i = null) {
		
			ob_start();
			print_r($v);
			$ret =  ob_get_clean();
		;
		me_cunity_debug_Out::_trace($ret, _hx_anonymous(array("fileName" => "Out.hx", "lineNumber" => 304, "className" => "me.cunity.debug.Out", "methodName" => "dumpVar")));
	}
	static function dumpObject($ob, $i = null) {
		$tClass = Type::getClass($ob);
		$m = "dumpObject:" . Std::string((($ob !== null) ? Type::getClass($ob) : $ob)) . "\x0A";
		$names = new _hx_array(array());
		if(Type::getClass($ob) !== null) {
			$names = Type::getInstanceFields(Type::getClass($ob));
		} else {
			$names = Reflect::fields($ob);
		}
		if(Type::getClass($ob) !== null) {
			$m = _hx_string_or_null(Type::getClassName(Type::getClass($ob))) . ":\x0A";
		}
		{
			$_g = 0;
			while($_g < $names->length) {
				$name = $names[$_g];
				++$_g;
				try {
					$t = Std::string(Type::typeof(Reflect::field($ob, $name)));
					if(me_cunity_debug_Out::$skipFunctions && $t === "TFunction") {
						null;
					}
					$m .= _hx_string_or_null($name) . ":" . Std::string(Reflect::field($ob, $name)) . ":" . _hx_string_or_null($t) . "\x0A";
					unset($t);
				}catch(Exception $__hx__e) {
					$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
					$ex = $_ex_;
					{
						$m .= _hx_string_or_null($name) . ":" . Std::string($ex);
					}
				}
				unset($name,$ex);
			}
		}
		me_cunity_debug_Out::_trace($m, $i);
	}
	static function dumpStack($sA, $i = null) {
		$b = new StringBuf();
		$b->add("StackDump:" . "<br/>");
		{
			$_g = 0;
			while($_g < $sA->length) {
				$item = $sA[$_g];
				++$_g;
				me_cunity_debug_Out::itemToString($item, $b);
				$b->add("<br/>");
				unset($item);
			}
		}
		me_cunity_debug_Out::_trace($b->b, $i);
	}
	static function itemToString($s, $b) {
		switch($s->index) {
		case 0:{
			$b->add("a C function");
		}break;
		case 4:{
			$v = _hx_deref($s)->params[0];
			$b->add("LocalFunction:" . _hx_string_rec($v, ""));
		}break;
		case 1:{
			$m = _hx_deref($s)->params[0];
			{
				$b->add("module ");
				$b->add($m);
			}
		}break;
		case 2:{
			$line = _hx_deref($s)->params[2];
			$file = _hx_deref($s)->params[1];
			$s1 = _hx_deref($s)->params[0];
			{
				if($s1 !== null) {
					me_cunity_debug_Out::itemToString($s1, $b);
					$b->add(" (");
				}
				$b->add($file);
				$b->add(" line ");
				$b->add($line);
				if($s1 !== null) {
					$b->add(")<br/>");
				}
			}
		}break;
		case 3:{
			$meth = _hx_deref($s)->params[1];
			$cname = _hx_deref($s)->params[0];
			{
				$b->add($cname);
				$b->add(".");
				$b->add($meth);
				$b->add("<br/>");
			}
		}break;
		}
	}
	static function fTrace($str, $arr, $i = null) {
		$str_arr = _hx_explode(" @", $str);
		$str_buf = new StringBuf();
		{
			$_g1 = 0;
			$_g = $str_arr->length;
			while($_g1 < $_g) {
				$i1 = $_g1++;
				$str_buf->add($str_arr[$i1]);
				if($arr[$i1] !== null) {
					$str_buf->add($arr[$i1]);
				}
				unset($i1);
			}
		}
		me_cunity_debug_Out::_trace($str_buf->b, $i);
	}
	function __toString() { return 'me.cunity.debug.Out'; }
}
me_cunity_debug_Out::$traceTarget = me_cunity_debug_DebugOutput::$NATIVE;
me_cunity_debug_Out::$aStack = (isset(haxe_CallStack::$callStack) ? haxe_CallStack::$callStack: array("haxe_CallStack", "callStack"));
function me_cunity_debug_Out_0(&$http, &$i, &$msg, &$v, $data) {
	{
		if($data !== "OK") {
			haxe_Log::trace($data, _hx_anonymous(array("fileName" => "Out.hx", "lineNumber" => 189, "className" => "me.cunity.debug.Out", "methodName" => "log2")));
		}
	}
}
