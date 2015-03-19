<?php

class me_cunity_tools_ArrayTools {
	public function __construct(){}
	static $indentLevel;
	static function atts2field($aAtts) {
		$f = new _hx_array(array());
		{
			$_g = 0;
			$_g1 = Reflect::fields($aAtts);
			while($_g < $_g1->length) {
				$name = $_g1[$_g];
				++$_g;
				$f->push(Reflect::field($aAtts, $name));
				unset($name);
			}
		}
		return $f;
	}
	static function countElements($a, $el) {
		$count = 0;
		{
			$_g = 0;
			while($_g < $a->length) {
				$e = $a[$_g];
				++$_g;
				if((is_object($_t = $e) && !($_t instanceof Enum) ? $_t === $el : $_t == $el)) {
					$count++;
				}
				unset($e,$_t);
			}
		}
		return $count;
	}
	static function map($a, $f) {
		{
			$_g1 = 0;
			$_g = $a->length;
			while($_g1 < $_g) {
				$e = $_g1++;
				$a[$e] = call_user_func_array($f, array($a[$e]));
				unset($e);
			}
		}
		return $a;
	}
	static function map2($a, $f) {
		$t = new _hx_array(array());
		{
			$_g1 = 0;
			$_g = $a->length;
			while($_g1 < $_g) {
				$e = $_g1++;
				$t[$e] = call_user_func_array($f, array($a[$e]));
				unset($e);
			}
		}
		return $t;
	}
	static function contains($a, $el) {
		{
			$_g = 0;
			while($_g < $a->length) {
				$e = $a[$_g];
				++$_g;
				if((is_object($_t = $e) && !($_t instanceof Enum) ? $_t === $el : $_t == $el)) {
					return true;
				}
				unset($e,$_t);
			}
		}
		return false;
	}
	static function sortNum($a, $b) {
		if($a < $b) {
			return -1;
		}
		if($a > $b) {
			return 1;
		}
		return 0;
	}
	static function stringIt2Array($it, $sort = null) {
		$values = new _hx_array(array());
		$__hx__it = $it;
		while($__hx__it->hasNext()) {
			unset($val);
			$val = $__hx__it->next();
			$values->push($val);
		}
		if($sort) {
			$values->sort(array(new _hx_lambda(array(&$it, &$sort, &$values), "me_cunity_tools_ArrayTools_0"), 'execute'));
		}
		return $values;
	}
	static function It2Array($it) {
		$values = new _hx_array(array());
		$__hx__it = $it;
		while($__hx__it->hasNext()) {
			unset($val);
			$val = $__hx__it->next();
			$values->push($val);
		}
		return $values;
	}
	static function getIndent() {
		$indent = "";
		{
			$_g1 = 0;
			$_g = me_cunity_tools_ArrayTools::$indentLevel;
			while($_g1 < $_g) {
				$i = $_g1++;
				$indent .= "\x09";
				unset($i);
			}
		}
		return $indent;
	}
	static function dumpArray($arr, $propName = null) {
		if($arr->length === 0) {
			return "";
		}
		if(me_cunity_tools_ArrayTools::$indentLevel === null) {
			me_cunity_tools_ArrayTools::$indentLevel = 0;
		}
		$dump = "\x0A" . _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent()) . "[\x0A";
		$i = 0;
		{
			$_g = 0;
			while($_g < $arr->length) {
				$el = $arr[$_g];
				++$_g;
				if(me_cunity_tools_ArrayTools::isArray($el)) {
					me_cunity_tools_ArrayTools::$indentLevel++;
					if($el === null) {
						haxe_Log::trace("el = null", _hx_anonymous(array("fileName" => "ArrayTools.hx", "lineNumber" => 115, "className" => "me.cunity.tools.ArrayTools", "methodName" => "dumpArray")));
						$dump .= _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent()) . "[],";
					} else {
						$a = null;
						$a = $el;
						{
							$_g1 = 0;
							while($_g1 < $a->length) {
								$ia = $a[$_g1];
								++$_g1;
								$dump .= _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent()) . "[";
								me_cunity_tools_ArrayTools::$indentLevel++;
								if($ia === null) {
									$dump .= "\x0A" . _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent()) . "null\x0A";
								} else {
									$dump .= _hx_string_or_null(me_cunity_tools_ArrayTools::dumpArray($ia, $propName));
								}
								me_cunity_tools_ArrayTools::$indentLevel--;
								$dump .= _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent());
								if(me_cunity_tools_ArrayTools::$indentLevel > 0) {
									$dump .= "],\x0A";
								} else {
									$dump .= "]\x0A";
								}
								unset($ia);
							}
							unset($_g1);
						}
						unset($a);
					}
					me_cunity_tools_ArrayTools::$indentLevel--;
					if(me_cunity_tools_ArrayTools::$indentLevel > 0) {
						$dump .= _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent()) . "],\x0A";
					} else {
						$dump .= _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent()) . "]\x0A";
					}
					return $dump;
				} else {
					if(++$i === 1) {
						me_cunity_tools_ArrayTools::$indentLevel++;
						$dump .= _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent());
					}
					if($el === null) {
						$dump .= "null";
					} else {
						if($propName !== null) {
							$names = _hx_explode(".", $propName);
							$item = $el;
							{
								$_g11 = 0;
								while($_g11 < $names->length) {
									$name = $names[$_g11];
									++$_g11;
									$item = Reflect::field($item, $name);
									unset($name);
								}
								unset($_g11);
							}
							$dump .= Std::string($item);
							unset($names,$item);
						} else {
							$dump .= Std::string($el);
						}
					}
					if($i < $arr->length) {
						$dump .= ", ";
					} else {
						me_cunity_tools_ArrayTools::$indentLevel--;
					}
				}
				unset($el);
			}
		}
		$dump .= "\x0A" . _hx_string_or_null(me_cunity_tools_ArrayTools::getIndent());
		if(me_cunity_tools_ArrayTools::$indentLevel > 0) {
			$dump .= "],\x0A";
		} else {
			$dump .= "] \x0A";
		}
		return $dump;
	}
	static function dumpArrayItems($arr, $propName = null) {
		$dump = "";
		$indent = "";
		{
			$_g1 = 0;
			$_g = me_cunity_tools_ArrayTools::$indentLevel;
			while($_g1 < $_g) {
				$i = $_g1++;
				$indent .= " ";
				unset($i);
			}
		}
		haxe_Log::trace(_hx_string_or_null($indent) . _hx_string_rec(me_cunity_tools_ArrayTools::$indentLevel, ""), _hx_anonymous(array("fileName" => "ArrayTools.hx", "lineNumber" => 175, "className" => "me.cunity.tools.ArrayTools", "methodName" => "dumpArrayItems")));
		{
			$_g2 = 0;
			while($_g2 < $arr->length) {
				$el = $arr[$_g2];
				++$_g2;
				if($propName !== null) {
					$names = _hx_explode(".", $propName);
					$item = $el;
					{
						$_g11 = 0;
						while($_g11 < $names->length) {
							$name = $names[$_g11];
							++$_g11;
							$item = Reflect::field($item, $name);
							unset($name);
						}
						unset($_g11);
					}
					$dump .= Std::string($item);
					unset($names,$item);
				} else {
					$dump .= Std::string($el);
				}
				$dump .= ", ";
				unset($el);
			}
		}
		haxe_Log::trace($dump, _hx_anonymous(array("fileName" => "ArrayTools.hx", "lineNumber" => 189, "className" => "me.cunity.tools.ArrayTools", "methodName" => "dumpArrayItems")));
		return $dump;
	}
	static function isArray($arr) {
		if(Type::getClassName(Type::getClass($arr)) === "Array") {
			return true;
		} else {
			return false;
		}
	}
	static function indexOf($arr, $el) {
		{
			$_g1 = 0;
			$_g = $arr->length;
			while($_g1 < $_g) {
				$i = $_g1++;
				if((is_object($_t = $arr[$i]) && !($_t instanceof Enum) ? $_t === $el : $_t == $el)) {
					return $i;
				}
				unset($i,$_t);
			}
		}
		return -1;
	}
	static function removeDuplicates($arr) {
		$i = 0;
		while($i < $arr->length) {
			while(me_cunity_tools_ArrayTools::countElements($arr, $arr[$i]) > 1) {
				$arr->splice($i, 1);
			}
			$i++;
		}
		return $arr;
	}
	static function spliceA($arr, $start, $delCount, $ins = null) {
		if($ins === null) {
			return $arr->splice($start, $delCount);
		}
		$arr = $arr->slice(0, $start + $delCount)->concat($ins)->concat($arr->slice($start + $delCount, null));
		$ret = $arr->splice($start, $delCount);
		return $ret;
	}
	static function spliceEl($arr, $start, $delCount, $ins = null) {
		if($ins === null) {
			return $arr->splice($start, $delCount);
		}
		$arr = $arr->slice(0, $start + $delCount)->concat((new _hx_array(array($ins))))->concat($arr->slice($start + $delCount, null));
		$ret = $arr->splice($start, $delCount);
		return $ret;
	}
	static function filter($arr, $cB, $thisObj = null) {
		$ret = new _hx_array(array());
		{
			$_g1 = 0;
			$_g = $arr->length;
			while($_g1 < $_g) {
				$i = $_g1++;
				if(call_user_func_array($cB, array($arr[$i], $i, $arr))) {
					$ret->push($arr[$i]);
				}
				unset($i);
			}
		}
		return $ret;
	}
	static function sum($arr) {
		$s = 0;
		{
			$_g = 0;
			while($_g < $arr->length) {
				$e = $arr[$_g];
				++$_g;
				$s += $e;
				unset($e);
			}
		}
		return $s;
	}
	function __toString() { return 'me.cunity.tools.ArrayTools'; }
}
function me_cunity_tools_ArrayTools_0(&$it, &$sort, &$values, $a, $b) {
	{
		$ret = 0;
		if((strcmp($a, $b)< 0)) {
			$ret = -1;
		}
		if((strcmp($a, $b)> 0)) {
			$ret = 1;
		}
		return $ret;
	}
}
