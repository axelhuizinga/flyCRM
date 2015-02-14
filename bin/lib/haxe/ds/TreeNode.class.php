<?php

class haxe_ds_TreeNode {
	public function __construct($l, $k, $v, $r, $h = null) {
		if(!php_Boot::$skip_constructor) {
		if($h === null) {
			$h = -1;
		}
		$this->left = $l;
		$this->key = $k;
		$this->value = $v;
		$this->right = $r;
		if($h === -1) {
			$this->_height = (haxe_ds_TreeNode_0($this, $h, $k, $l, $r, $v)) + 1;
		} else {
			$this->_height = $h;
		}
	}}
	public $left;
	public $right;
	public $key;
	public $value;
	public $_height;
	public function toString() {
		return _hx_string_or_null((haxe_ds_TreeNode_1($this))) . _hx_string_or_null(("" . Std::string($this->key) . "=" . Std::string($this->value))) . _hx_string_or_null((haxe_ds_TreeNode_2($this)));
	}
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->__dynamics[$m]) && is_callable($this->__dynamics[$m]))
			return call_user_func_array($this->__dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call <'.$m.'>');
	}
	function __toString() { return $this->toString(); }
}
function haxe_ds_TreeNode_0(&$__hx__this, &$h, &$k, &$l, &$r, &$v) {
	if(haxe_ds_TreeNode_3($__hx__this, $h, $k, $l, $r, $v) > haxe_ds_TreeNode_4($__hx__this, $h, $k, $l, $r, $v)) {
		$_this2 = $__hx__this->left;
		if($_this2 === null) {
			return 0;
		} else {
			return $_this2->_height;
		}
		unset($_this2);
	} else {
		$_this3 = $__hx__this->right;
		if($_this3 === null) {
			return 0;
		} else {
			return $_this3->_height;
		}
		unset($_this3);
	}
}
function haxe_ds_TreeNode_1(&$__hx__this) {
	if($__hx__this->left === null) {
		return "";
	} else {
		return _hx_string_or_null($__hx__this->left->toString()) . ", ";
	}
}
function haxe_ds_TreeNode_2(&$__hx__this) {
	if($__hx__this->right === null) {
		return "";
	} else {
		return ", " . _hx_string_or_null($__hx__this->right->toString());
	}
}
function haxe_ds_TreeNode_3(&$__hx__this, &$h, &$k, &$l, &$r, &$v) {
	{
		$_this = $__hx__this->left;
		if($_this === null) {
			return 0;
		} else {
			return $_this->_height;
		}
		unset($_this);
	}
}
function haxe_ds_TreeNode_4(&$__hx__this, &$h, &$k, &$l, &$r, &$v) {
	{
		$_this1 = $__hx__this->right;
		if($_this1 === null) {
			return 0;
		} else {
			return $_this1->_height;
		}
		unset($_this1);
	}
}
