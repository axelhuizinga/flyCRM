<?php

class model_SManager extends sys_db_Manager {
	public function __construct($classval) { if(!php_Boot::$skip_constructor) {
		parent::__construct($classval);
	}}
	public function dynamicSearch($x, $lock = null) {
		$_g = $this;
		$s = new StringBuf();
		$fields = Reflect::field($x, "fields");
		if($fields !== null) {
			$ff = _hx_explode(",", $fields);
			$ff = $ff->map(array(new _hx_lambda(array(&$_g, &$ff, &$fields, &$lock, &$s, &$x), "model_SManager_0"), 'execute'));
			$s->add("SELECT " . _hx_string_or_null($ff->join(",")) . " FROM ");
		} else {
			$s->add("SELECT * FROM ");
		}
		$s->add($this->table_name);
		$s->add(" WHERE ");
		$opt = Reflect::field($x, "options");
		if($opt !== null) {
			Reflect::deleteField($x, "options");
		}
		$this->addCondition($s, $x);
		if($opt !== null) {
			$this->addOptions($s, $opt);
		}
		haxe_Log::trace($s->b, _hx_anonymous(array("fileName" => "SManager.hx", "lineNumber" => 42, "className" => "model.SManager", "methodName" => "dynamicSearch")));
		return $this->unsafeObjects($s->b, $lock);
	}
	public function addCondition($s, $x) {
		$_g3 = $this;
		$first = true;
		if($x !== null) {
			$_g = 0;
			$_g1 = Reflect::fields($x);
			while($_g < $_g1->length) {
				$f = $_g1[$_g];
				++$_g;
				$d = Reflect::field($x, $f);
				$parts = _hx_explode("|", ($d));
				{
					$_g2 = strtoupper($parts[0]);
					switch($_g2) {
					case "BETWEEN":{
						if(!$first) {
							$s->add(" AND ");
						}
						$s->add($this->quoteField($f));
						$s->add(" BETWEEN ");
						$this->getCnx()->addValue($s, $parts[1]);
						$s->add(" AND ");
						$this->getCnx()->addValue($s, $parts[2]);
					}break;
					case "IN":{
						if(!$first) {
							$s->add(" AND ");
						}
						$s->add($this->quoteField($f));
						$s->add(" IN(");
						$i = 0;
						$parts->slice(1, null)->map(array(new _hx_lambda(array(&$_g, &$_g1, &$_g2, &$_g3, &$d, &$f, &$first, &$i, &$parts, &$s, &$x), "model_SManager_1"), 'execute'));
						$s->add(")");
					}break;
					case "LIKE":{
						if(!$first) {
							$s->add(" AND ");
						}
						$s->add($this->quoteField($f));
						$s->add(" LIKE ");
						$this->getCnx()->addValue($s, $parts[1]);
					}break;
					default:{
						$s->add($this->quoteField($f));
						if($d === null) {
							$s->add(" IS NULL");
						} else {
							$s->add(" = ");
							$this->getCnx()->addValue($s, $d);
						}
					}break;
					}
					unset($_g2);
				}
				if($first) {
					$first = false;
				}
				unset($parts,$f,$d);
			}
		}
		if($first) {
			$s->add("TRUE");
		}
	}
	public function addOptions($s, $v) {
		$_g2 = $this;
		{
			$_g = 0;
			$_g1 = Reflect::fields($v);
			while($_g < $_g1->length) {
				$f = $_g1[$_g];
				++$_g;
				$va = Reflect::field($v, $f);
				$s->add(model_SManager_2($this, $_g, $_g1, $_g2, $f, $s, $v, $va));
				unset($va,$f);
			}
		}
	}
	static $__properties__ = array("set_cnx" => "set_cnx");
	function __toString() { return 'model.SManager'; }
}
function model_SManager_0(&$_g, &$ff, &$fields, &$lock, &$s, &$x, $fn) {
	{
		return $_g->quoteField($fn);
	}
}
function model_SManager_1(&$_g, &$_g1, &$_g2, &$_g3, &$d, &$f, &$first, &$i, &$parts, &$s, &$x, $p) {
	{
		$s->add(_hx_string_or_null(((($i++ > 1) ? "," : ""))) . _hx_string_or_null($_g3->quoteField($p)));
	}
}
function model_SManager_2(&$__hx__this, &$_g, &$_g1, &$_g2, &$f, &$s, &$v, &$va) {
	switch($f) {
	case "LIMIT":{
		$s->add(" LIMIT ");
		return $__hx__this->getCnx()->addValue($s, Std::parseInt($va));
	}break;
	case "ORDER BY":{
		$s->add(" ORDER BY ");
		$s->add($__hx__this->quoteField($f));
		if(_hx_equal($v, "DESC")) {
			return $s->add($va);
		}
	}break;
	case "GROUP BY":{
		$s->add(" GROUP BY ");
		$s->add($__hx__this->quoteField($f));
		if(_hx_len($v) > 0) {
			$v = $v->map(array(new _hx_lambda(array(&$_g, &$_g1, &$_g2, &$f, &$s, &$v, &$va), "model_SManager_3"), 'execute'));
			return $s->add($v->join(","));
		}
	}break;
	default:{
		return haxe_Log::trace("Unknow Option:" . _hx_string_or_null($f), _hx_anonymous(array("fileName" => "SManager.hx", "lineNumber" => 120, "className" => "model.SManager", "methodName" => "addOptions")));
	}break;
	}
}
function model_SManager_3(&$_g, &$_g1, &$_g2, &$f, &$s, &$v, &$va, $p) {
	{
		return $_g2->quoteField($p);
	}
}
