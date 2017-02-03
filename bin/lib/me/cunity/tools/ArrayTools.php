<?php
/**
 * Generated by Haxe 3.4.0
 */

namespace me\cunity\tools;

use \php\Boot;
use \haxe\Log;
use \php\_Boot\HxString;
use \php\_Boot\HxAnon;

class ArrayTools {
	/**
	 * @var int
	 */
	static public $indentLevel;


	/**
	 * @param object $it
	 * 
	 * @return \Array_hx
	 */
	static public function It2Array ($it) {
		$values = new \Array_hx();
		while ($it->hasNext()) {
			$values->push($it->next());
		}
		return $values;
	}


	/**
	 * @param mixed $aAtts
	 * 
	 * @return \Array_hx
	 */
	static public function atts2field ($aAtts) {
		$f = new \Array_hx();
		$_g = 0;
		$_g1 = \Reflect::fields($aAtts);
		while ($_g < $_g1->length) {
			unset($name);
			$name = ($_g1->arr[$_g] ?? null);
			$_g = $_g + 1;
			$f->push(\Reflect::field($aAtts, $name));
		}

		return $f;
	}


	/**
	 * @param \Array_hx $a
	 * @param mixed $el
	 * 
	 * @return bool
	 */
	static public function contains ($a, $el) {
		$_g = 0;
		while ($_g < $a->length) {
			unset($e);
			$e = ($a->arr[$_g] ?? null);
			$_g = $_g + 1;
			if (Boot::equal($e, $el)) {
				return true;
			}
		}

		return false;
	}


	/**
	 * @param \Array_hx $a
	 * @param mixed $el
	 * 
	 * @return int
	 */
	static public function countElements ($a, $el) {
		$count = 0;
		$_g = 0;
		while ($_g < $a->length) {
			unset($e);
			$e = ($a->arr[$_g] ?? null);
			$_g = $_g + 1;
			if (Boot::equal($e, $el)) {
				$count = $count + 1;
			}
		}

		return $count;
	}


	/**
	 * @param \Array_hx $arr
	 * @param string $propName
	 * 
	 * @return string
	 */
	static public function dumpArray ($arr, $propName = null) {
		if ($arr->length === 0) {
			return "";
		}
		if (ArrayTools::$indentLevel === null) {
			ArrayTools::$indentLevel = 0;
		}
		$dump = "\x0A" . (ArrayTools::getIndent()??'null') . "[\x0A";
		$i = 0;
		$_g = 0;
		while ($_g < $arr->length) {
			unset($item, $_g11, $_g1, $dump3, $names, $a, $el);
			$el = ($arr->arr[$_g] ?? null);
			$_g = $_g + 1;
			if (ArrayTools::isArray($el)) {
				ArrayTools::$indentLevel++;
				if ($el === null) {
					(Log::$trace)("el = null", new HxAnon([
						"fileName" => "ArrayTools.hx",
						"lineNumber" => 115,
						"className" => "me.cunity.tools.ArrayTools",
						"methodName" => "dumpArray",
					]));
					$dump = ($dump??'null') . (((ArrayTools::getIndent()??'null') . "[],")??'null');
				} else {
					$a = Boot::typedCast(Boot::getClass(\Array_hx::class), $el);
					$_g1 = 0;
					while ($_g1 < $a->length) {
						unset($dump1, $dump2, $ia);
						$ia = ($a->arr[$_g1] ?? null);
						$_g1 = $_g1 + 1;
						$dump = ($dump??'null') . (((ArrayTools::getIndent()??'null') . "[")??'null');
						ArrayTools::$indentLevel++;
						$dump1 = null;
						if ($ia === null) {
							$dump1 = "\x0A" . (ArrayTools::getIndent()??'null') . "null\x0A";
						} else {
							$dump1 = ArrayTools::dumpArray($ia, $propName);
						}
						$dump = ($dump??'null') . ($dump1??'null');
						ArrayTools::$indentLevel--;
						$dump = ($dump??'null') . (ArrayTools::getIndent()??'null');
						$dump2 = null;
						if (ArrayTools::$indentLevel > 0) {
							$dump2 = "],\x0A";
						} else {
							$dump2 = "]\x0A";
						}
						$dump = ($dump??'null') . ($dump2??'null');
					}

				}
				ArrayTools::$indentLevel--;
				$dump3 = null;
				if (ArrayTools::$indentLevel > 0) {
					$dump3 = (ArrayTools::getIndent()??'null') . "],\x0A";
				} else {
					$dump3 = (ArrayTools::getIndent()??'null') . "]\x0A";
				}
				$dump = ($dump??'null') . ($dump3??'null');
				return $dump;
			} else {
				$i = $i + 1;
				if ($i === 1) {
					ArrayTools::$indentLevel++;
					$dump = ($dump??'null') . (ArrayTools::getIndent()??'null');
				}
				if ($el === null) {
					$dump = ($dump??'null') . "null";
				} else if ($propName !== null) {
					$names = HxString::split($propName, ".");
					$item = $el;
					$_g11 = 0;
					while ($_g11 < $names->length) {
						unset($name);
						$name = ($names->arr[$_g11] ?? null);
						$_g11 = $_g11 + 1;
						$item = \Reflect::field($item, $name);
					}

					$dump = ($dump??'null') . (\Std::string($item)??'null');
				} else {
					$dump = ($dump??'null') . (\Std::string($el)??'null');
				}
				if ($i < $arr->length) {
					$dump = ($dump??'null') . ", ";
				} else {
					ArrayTools::$indentLevel--;
				}
			}
		}

		$dump = ($dump??'null') . (("\x0A" . (ArrayTools::getIndent()??'null'))??'null');
		$dump4 = null;
		if (ArrayTools::$indentLevel > 0) {
			$dump4 = "],\x0A";
		} else {
			$dump4 = "] \x0A";
		}
		$dump = ($dump??'null') . ($dump4??'null');
		return $dump;
	}


	/**
	 * @param \Array_hx $arr
	 * @param string $propName
	 * 
	 * @return string
	 */
	static public function dumpArrayItems ($arr, $propName = null) {
		$dump = "";
		$indent = "";
		$_g1 = 0;
		$_g = ArrayTools::$indentLevel;
		while ($_g1 < $_g) {
			$_g1 = $_g1 + 1;
			$indent = ($indent??'null') . " ";
		}

		(Log::$trace)(($indent??'null') . (ArrayTools::$indentLevel??'null'), new HxAnon([
			"fileName" => "ArrayTools.hx",
			"lineNumber" => 175,
			"className" => "me.cunity.tools.ArrayTools",
			"methodName" => "dumpArrayItems",
		]));
		$_g2 = 0;
		while ($_g2 < $arr->length) {
			unset($item, $_g11, $names, $el);
			$el = ($arr->arr[$_g2] ?? null);
			$_g2 = $_g2 + 1;
			if ($propName !== null) {
				$names = HxString::split($propName, ".");
				$item = $el;
				$_g11 = 0;
				while ($_g11 < $names->length) {
					unset($name);
					$name = ($names->arr[$_g11] ?? null);
					$_g11 = $_g11 + 1;
					$item = \Reflect::field($item, $name);
				}

				$dump = ($dump??'null') . (\Std::string($item)??'null');
			} else {
				$dump = ($dump??'null') . (\Std::string($el)??'null');
			}
			$dump = ($dump??'null') . ", ";
		}

		(Log::$trace)($dump, new HxAnon([
			"fileName" => "ArrayTools.hx",
			"lineNumber" => 189,
			"className" => "me.cunity.tools.ArrayTools",
			"methodName" => "dumpArrayItems",
		]));
		return $dump;
	}


	/**
	 * @param \Array_hx $arr
	 * @param \Closure $cB
	 * @param mixed $thisObj
	 * 
	 * @return \Array_hx
	 */
	static public function filter ($arr, $cB, $thisObj = null) {
		$ret = new \Array_hx();
		$_g1 = 0;
		$_g = $arr->length;
		while ($_g1 < $_g) {
			unset($i);
			$_g1 = $_g1 + 1;
			$i = $_g1 - 1;
			if ($cB(($arr->arr[$i] ?? null), $i, $arr)) {
				$ret->push(($arr->arr[$i] ?? null));
			}
		}

		return $ret;
	}


	/**
	 * @return string
	 */
	static public function getIndent () {
		$indent = "";
		$_g1 = 0;
		$_g = ArrayTools::$indentLevel;
		while ($_g1 < $_g) {
			$_g1 = $_g1 + 1;
			$indent = ($indent??'null') . "\x09";
		}

		return $indent;
	}


	/**
	 * @param \Array_hx $arr
	 * @param mixed $el
	 * 
	 * @return int
	 */
	static public function indexOf ($arr, $el) {
		$_g1 = 0;
		$_g = $arr->length;
		while ($_g1 < $_g) {
			unset($i);
			$_g1 = $_g1 + 1;
			$i = $_g1 - 1;
			if (Boot::equal(($arr->arr[$i] ?? null), $el)) {
				return $i;
			}
		}

		return -1;
	}


	/**
	 * @param mixed $arr
	 * 
	 * @return bool
	 */
	static public function isArray ($arr) {
		if (\Type::getClassName(\Type::getClass($arr)) === "Array") {
			return true;
		} else {
			return false;
		}
	}


	/**
	 * @param \Array_hx $a
	 * @param \Closure $f
	 * 
	 * @return \Array_hx
	 */
	static public function map ($a, $f) {
		$_g1 = 0;
		$_g = $a->length;
		while ($_g1 < $_g) {
			unset($e);
			$_g1 = $_g1 + 1;
			$e = $_g1 - 1;
			$a[$e] = $f(($a->arr[$e] ?? null));
		}

		return $a;
	}


	/**
	 * @param \Array_hx $a
	 * @param \Closure $f
	 * 
	 * @return \Array_hx
	 */
	static public function map2 ($a, $f) {
		$t = new \Array_hx();
		$_g1 = 0;
		$_g = $a->length;
		while ($_g1 < $_g) {
			unset($e);
			$_g1 = $_g1 + 1;
			$e = $_g1 - 1;
			$t[$e] = $f(($a->arr[$e] ?? null));
		}

		return $t;
	}


	/**
	 * @param \Array_hx $arr
	 * 
	 * @return \Array_hx
	 */
	static public function removeDuplicates ($arr) {
		$i = 0;
		while ($i < $arr->length) {
			while (ArrayTools::countElements($arr, ($arr->arr[$i] ?? null)) > 1) {
				$arr->splice($i, 1);
			}
			$i = $i + 1;
		}
		return $arr;
	}


	/**
	 * @param int $a
	 * @param int $b
	 * 
	 * @return int
	 */
	static public function sortNum ($a, $b) {
		if ($a < $b) {
			return -1;
		}
		if ($a > $b) {
			return 1;
		}
		return 0;
	}


	/**
	 * @param \Array_hx $arr
	 * @param int $start
	 * @param int $delCount
	 * @param \Array_hx $ins
	 * 
	 * @return \Array_hx
	 */
	static public function spliceA ($arr, $start, $delCount, $ins = null) {
		if ($ins === null) {
			return $arr->splice($start, $delCount);
		}
		$arr = $arr->slice(0, $start + $delCount)->concat($ins)->concat($arr->slice($start + $delCount));
		return $arr->splice($start, $delCount);
	}


	/**
	 * @param \Array_hx $arr
	 * @param int $start
	 * @param int $delCount
	 * @param mixed $ins
	 * 
	 * @return \Array_hx
	 */
	static public function spliceEl ($arr, $start, $delCount, $ins = null) {
		if ($ins === null) {
			return $arr->splice($start, $delCount);
		}
		$arr = $arr->slice(0, $start + $delCount)->concat(\Array_hx::wrap([$ins]))->concat($arr->slice($start + $delCount));
		return $arr->splice($start, $delCount);
	}


	/**
	 * @param object $it
	 * @param bool $sort
	 * 
	 * @return \Array_hx
	 */
	static public function stringIt2Array ($it, $sort = null) {
		$values = new \Array_hx();
		while ($it->hasNext()) {
			$values->push($it->next());
		}
		if ($sort) {
			$values->sort(function ($a, $b) {
				$ret = 0;
				if (strcmp($a, $b) < 0) {
					$ret = -1;
				}
				if (strcmp($a, $b) > 0) {
					$ret = 1;
				}
				return $ret;
			});
		}
		return $values;
	}


	/**
	 * @param \Array_hx $arr
	 * 
	 * @return mixed
	 */
	static public function sum ($arr) {
		$s = 0;
		$_g = 0;
		while ($_g < $arr->length) {
			unset($e);
			$e = ($arr->arr[$_g] ?? null);
			$_g = $_g + 1;
			$s = Boot::addOrConcat($s, $e);
		}

		return $s;
	}
}


Boot::registerClass(ArrayTools::class, 'me.cunity.tools.ArrayTools');
