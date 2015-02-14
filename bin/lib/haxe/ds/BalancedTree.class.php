<?php

class haxe_ds_BalancedTree {
	public function __construct() {
		;
	}
	public $root;
	public function set($key, $value) {
		$this->root = $this->setLoop($key, $value, $this->root);
	}
	public function get($key) {
		$node = $this->root;
		while($node !== null) {
			$c = $this->compare($key, $node->key);
			if($c === 0) {
				return $node->value;
			}
			if($c < 0) {
				$node = $node->left;
			} else {
				$node = $node->right;
			}
			unset($c);
		}
		return null;
	}
	public function remove($key) {
		try {
			$this->root = $this->removeLoop($key, $this->root);
			return true;
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			if(is_string($e = $_ex_)){
				return false;
			} else throw $__hx__e;;
		}
	}
	public function exists($key) {
		$node = $this->root;
		while($node !== null) {
			$c = $this->compare($key, $node->key);
			if($c === 0) {
				return true;
			} else {
				if($c < 0) {
					$node = $node->left;
				} else {
					$node = $node->right;
				}
			}
			unset($c);
		}
		return false;
	}
	public function iterator() {
		$ret = (new _hx_array(array()));
		$this->iteratorLoop($this->root, $ret);
		return $ret->iterator();
	}
	public function keys() {
		$ret = (new _hx_array(array()));
		$this->keysLoop($this->root, $ret);
		return $ret->iterator();
	}
	public function setLoop($k, $v, $node) {
		if($node === null) {
			return new haxe_ds_TreeNode(null, $k, $v, null, null);
		}
		$c = $this->compare($k, $node->key);
		if($c === 0) {
			return new haxe_ds_TreeNode($node->left, $k, $v, $node->right, haxe_ds_BalancedTree_0($this, $c, $k, $node, $v));
		} else {
			if($c < 0) {
				$nl = $this->setLoop($k, $v, $node->left);
				return $this->balance($nl, $node->key, $node->value, $node->right);
			} else {
				$nr = $this->setLoop($k, $v, $node->right);
				return $this->balance($node->left, $node->key, $node->value, $nr);
			}
		}
	}
	public function removeLoop($k, $node) {
		if($node === null) {
			throw new HException("Not_found");
		}
		$c = $this->compare($k, $node->key);
		if($c === 0) {
			return $this->merge($node->left, $node->right);
		} else {
			if($c < 0) {
				return $this->balance($this->removeLoop($k, $node->left), $node->key, $node->value, $node->right);
			} else {
				return $this->balance($node->left, $node->key, $node->value, $this->removeLoop($k, $node->right));
			}
		}
	}
	public function iteratorLoop($node, $acc) {
		if($node !== null) {
			$this->iteratorLoop($node->left, $acc);
			$acc->push($node->value);
			$this->iteratorLoop($node->right, $acc);
		}
	}
	public function keysLoop($node, $acc) {
		if($node !== null) {
			$this->keysLoop($node->left, $acc);
			$acc->push($node->key);
			$this->keysLoop($node->right, $acc);
		}
	}
	public function merge($t1, $t2) {
		if($t1 === null) {
			return $t2;
		}
		if($t2 === null) {
			return $t1;
		}
		$t = $this->minBinding($t2);
		return $this->balance($t1, $t->key, $t->value, $this->removeMinBinding($t2));
	}
	public function minBinding($t) {
		if($t === null) {
			throw new HException("Not_found");
		} else {
			if($t->left === null) {
				return $t;
			} else {
				return $this->minBinding($t->left);
			}
		}
	}
	public function removeMinBinding($t) {
		if($t->left === null) {
			return $t->right;
		} else {
			return $this->balance($this->removeMinBinding($t->left), $t->key, $t->value, $t->right);
		}
	}
	public function balance($l, $k, $v, $r) {
		$hl = null;
		if($l === null) {
			$hl = 0;
		} else {
			$hl = $l->_height;
		}
		$hr = null;
		if($r === null) {
			$hr = 0;
		} else {
			$hr = $r->_height;
		}
		if($hl > $hr + 2) {
			if(haxe_ds_BalancedTree_1($this, $hl, $hr, $k, $l, $r, $v) >= haxe_ds_BalancedTree_2($this, $hl, $hr, $k, $l, $r, $v)) {
				return new haxe_ds_TreeNode($l->left, $l->key, $l->value, new haxe_ds_TreeNode($l->right, $k, $v, $r, null), null);
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode($l->left, $l->key, $l->value, $l->right->left, null), $l->right->key, $l->right->value, new haxe_ds_TreeNode($l->right->right, $k, $v, $r, null), null);
			}
		} else {
			if($hr > $hl + 2) {
				if(haxe_ds_BalancedTree_3($this, $hl, $hr, $k, $l, $r, $v) > haxe_ds_BalancedTree_4($this, $hl, $hr, $k, $l, $r, $v)) {
					return new haxe_ds_TreeNode(new haxe_ds_TreeNode($l, $k, $v, $r->left, null), $r->key, $r->value, $r->right, null);
				} else {
					return new haxe_ds_TreeNode(new haxe_ds_TreeNode($l, $k, $v, $r->left->left, null), $r->left->key, $r->left->value, new haxe_ds_TreeNode($r->left->right, $r->key, $r->value, $r->right, null), null);
				}
			} else {
				return new haxe_ds_TreeNode($l, $k, $v, $r, ((($hl > $hr) ? $hl : $hr)) + 1);
			}
		}
	}
	public function compare($k1, $k2) {
		return Reflect::compare($k1, $k2);
	}
	public function toString() {
		return "{" . _hx_string_or_null($this->root->toString()) . "}";
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
function haxe_ds_BalancedTree_0(&$__hx__this, &$c, &$k, &$node, &$v) {
	if($node === null) {
		return 0;
	} else {
		return $node->_height;
	}
}
function haxe_ds_BalancedTree_1(&$__hx__this, &$hl, &$hr, &$k, &$l, &$r, &$v) {
	{
		$_this = $l->left;
		if($_this === null) {
			return 0;
		} else {
			return $_this->_height;
		}
		unset($_this);
	}
}
function haxe_ds_BalancedTree_2(&$__hx__this, &$hl, &$hr, &$k, &$l, &$r, &$v) {
	{
		$_this1 = $l->right;
		if($_this1 === null) {
			return 0;
		} else {
			return $_this1->_height;
		}
		unset($_this1);
	}
}
function haxe_ds_BalancedTree_3(&$__hx__this, &$hl, &$hr, &$k, &$l, &$r, &$v) {
	{
		$_this2 = $r->right;
		if($_this2 === null) {
			return 0;
		} else {
			return $_this2->_height;
		}
		unset($_this2);
	}
}
function haxe_ds_BalancedTree_4(&$__hx__this, &$hl, &$hr, &$k, &$l, &$r, &$v) {
	{
		$_this3 = $r->left;
		if($_this3 === null) {
			return 0;
		} else {
			return $_this3->_height;
		}
		unset($_this3);
	}
}
