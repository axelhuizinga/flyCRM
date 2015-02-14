<?php

class _UInt_UInt_Impl_ {
	public function __construct(){}
	static function add($a, $b) {
		return $a + $b;
	}
	static function div($a, $b) {
		return _UInt_UInt_Impl__0($a, $b) / _UInt_UInt_Impl__1($a, $b);
	}
	static function mul($a, $b) {
		return $a * $b;
	}
	static function sub($a, $b) {
		return $a - $b;
	}
	static function gt($a, $b) {
		$aNeg = $a < 0;
		$bNeg = $b < 0;
		if($aNeg !== $bNeg) {
			return $aNeg;
		} else {
			return $a > $b;
		}
	}
	static function gte($a, $b) {
		$aNeg = $a < 0;
		$bNeg = $b < 0;
		if($aNeg !== $bNeg) {
			return $aNeg;
		} else {
			return $a >= $b;
		}
	}
	static function lt($a, $b) {
		$aNeg = $b < 0;
		$bNeg = $a < 0;
		if($aNeg !== $bNeg) {
			return $aNeg;
		} else {
			return $b > $a;
		}
	}
	static function lte($a, $b) {
		$aNeg = $b < 0;
		$bNeg = $a < 0;
		if($aNeg !== $bNeg) {
			return $aNeg;
		} else {
			return $b >= $a;
		}
	}
	static function hand($a, $b) {
		return $a & $b;
	}
	static function hor($a, $b) {
		return $a | $b;
	}
	static function hxor($a, $b) {
		return $a ^ $b;
	}
	static function shl($a, $b) {
		return $a << $b;
	}
	static function shr($a, $b) {
		return $a >> $b;
	}
	static function ushr($a, $b) {
		return _hx_shift_right($a, $b);
	}
	static function mod($a, $b) {
		return Std::int(_hx_mod(_UInt_UInt_Impl__2($a, $b), _UInt_UInt_Impl__3($a, $b)));
	}
	static function addWithFloat($a, $b) {
		return _UInt_UInt_Impl__4($a, $b) + $b;
	}
	static function mulWithFloat($a, $b) {
		return _UInt_UInt_Impl__5($a, $b) * $b;
	}
	static function divFloat($a, $b) {
		return _UInt_UInt_Impl__6($a, $b) / $b;
	}
	static function floatDiv($a, $b) {
		return $a / _UInt_UInt_Impl__7($a, $b);
	}
	static function subFloat($a, $b) {
		return _UInt_UInt_Impl__8($a, $b) - $b;
	}
	static function floatSub($a, $b) {
		return $a - _UInt_UInt_Impl__9($a, $b);
	}
	static function gtFloat($a, $b) {
		return _UInt_UInt_Impl__10($a, $b) > $b;
	}
	static function equalsFloat($a, $b) {
		return _UInt_UInt_Impl__11($a, $b) === $b;
	}
	static function notEqualsFloat($a, $b) {
		return _UInt_UInt_Impl__12($a, $b) !== $b;
	}
	static function gteFloat($a, $b) {
		return _UInt_UInt_Impl__13($a, $b) >= $b;
	}
	static function floatGt($a, $b) {
		return $a > _UInt_UInt_Impl__14($a, $b);
	}
	static function floatGte($a, $b) {
		return $a >= _UInt_UInt_Impl__15($a, $b);
	}
	static function ltFloat($a, $b) {
		return _UInt_UInt_Impl__16($a, $b) < $b;
	}
	static function lteFloat($a, $b) {
		return _UInt_UInt_Impl__17($a, $b) <= $b;
	}
	static function floatLt($a, $b) {
		return $a < _UInt_UInt_Impl__18($a, $b);
	}
	static function floatLte($a, $b) {
		return $a <= _UInt_UInt_Impl__19($a, $b);
	}
	static function modFloat($a, $b) {
		return _hx_mod(_UInt_UInt_Impl__20($a, $b), $b);
	}
	static function floatMod($a, $b) {
		return _hx_mod($a, _UInt_UInt_Impl__21($a, $b));
	}
	static function negBits($this1) {
		return ~$this1;
	}
	static function prefixIncrement($this1) {
		return ++$this1;
	}
	static function postfixIncrement($this1) {
		return $this1++;
	}
	static function prefixDecrement($this1) {
		return --$this1;
	}
	static function postfixDecrement($this1) {
		return $this1--;
	}
	static function toString($this1, $radix = null) {
		return Std::string(_UInt_UInt_Impl__22($radix, $this1));
	}
	static function toInt($this1) {
		return $this1;
	}
	static function toFloat($this1) {
		$int = $this1;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
	}
	function __toString() { return '_UInt.UInt_Impl_'; }
}
function _UInt_UInt_Impl__0(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__1(&$a, &$b) {
	{
		$int1 = $b;
		if($int1 < 0) {
			return 4294967296.0 + $int1;
		} else {
			return $int1 + 0.0;
		}
		unset($int1);
	}
}
function _UInt_UInt_Impl__2(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__3(&$a, &$b) {
	{
		$int1 = $b;
		if($int1 < 0) {
			return 4294967296.0 + $int1;
		} else {
			return $int1 + 0.0;
		}
		unset($int1);
	}
}
function _UInt_UInt_Impl__4(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__5(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__6(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__7(&$a, &$b) {
	{
		$int = $b;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__8(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__9(&$a, &$b) {
	{
		$int = $b;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__10(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__11(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__12(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__13(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__14(&$a, &$b) {
	{
		$int = $b;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__15(&$a, &$b) {
	{
		$int = $b;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__16(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__17(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__18(&$a, &$b) {
	{
		$int = $b;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__19(&$a, &$b) {
	{
		$int = $b;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__20(&$a, &$b) {
	{
		$int = $a;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__21(&$a, &$b) {
	{
		$int = $b;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
function _UInt_UInt_Impl__22(&$radix, &$this1) {
	{
		$int = $this1;
		if($int < 0) {
			return 4294967296.0 + $int;
		} else {
			return $int + 0.0;
		}
		unset($int);
	}
}
