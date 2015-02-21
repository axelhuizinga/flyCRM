<?php

class model_SManager extends sys_db_Manager {
	public function __construct($classval) { if(!php_Boot::$skip_constructor) {
		parent::__construct($classval);
	}}
	public function addCondition($s, $x) {
		$_g3 = $this;
		$first = true;
		if($x !== null) {
			$_g = 0;
			$_g1 = Reflect::fields($x);
			while($_g < $_g1->length) {
				$f = $_g1[$_g];
				++$_g;
				if($first) {
					$first = false;
				} else {
					$s->add(" AND ");
				}
				$d = Reflect::field($x, $f);
				if(_hx_index_of(($d), "|", null) > 0) {
					$parts = _hx_explode("|", ($d));
					{
						$_g2 = $parts[0];
						switch($_g2) {
						case "BETWEEN":{
							$s->add(" BETWEEN ");
							$this->getCnx()->addValue($s, $parts[1]);
							$s->add(" AND ");
							$this->getCnx()->addValue($s, $parts[2]);
						}break;
						case "IN":{
							$s->add("IN(");
							$i = 0;
							$parts->slice(1, null)->map(array(new _hx_lambda(array(&$_g, &$_g1, &$_g2, &$_g3, &$d, &$f, &$first, &$i, &$parts, &$s, &$x), "model_SManager_0"), 'execute'));
							$s->add(")");
						}break;
						case "ORDER BY":{
							$s->add(" ORDER BY ");
							$s->add($this->quoteField($f));
							if($parts->length === 2 && $parts[1] === "DESC") {
								$s->add($parts[1]);
							}
						}break;
						case "GROUP BY":{
							$s->add(" GROUP BY ");
							$s->add($this->quoteField($f));
							if($parts->length > 1) {
								$i1 = 0;
								$parts->slice(1, null)->map(array(new _hx_lambda(array(&$_g, &$_g1, &$_g2, &$_g3, &$d, &$f, &$first, &$i1, &$parts, &$s, &$x), "model_SManager_1"), 'execute'));
							}
						}break;
						default:{
							haxe_Log::trace("oops:" . _hx_string_or_null($parts[0]), _hx_anonymous(array("fileName" => "SManager.hx", "lineNumber" => 61, "className" => "model.SManager", "methodName" => "addCondition")));
						}break;
						}
						unset($_g2);
					}
					continue;
					unset($parts);
				}
				$s->add($this->quoteField($f));
				if($d === null) {
					$s->add(" IS NULL");
				} else {
					$s->add(" = ");
					$this->getCnx()->addValue($s, $d);
				}
				unset($f,$d);
			}
		}
		if($first) {
			$s->add("TRUE");
		}
	}
	static $__properties__ = array("set_cnx" => "set_cnx");
	function __toString() { return 'model.SManager'; }
}
function model_SManager_0(&$_g, &$_g1, &$_g2, &$_g3, &$d, &$f, &$first, &$i, &$parts, &$s, &$x, $p) {
	{
		$s->add(_hx_string_or_null(((($i++ > 1) ? "," : ""))) . _hx_string_or_null($_g3->quoteField($p)));
	}
}
function model_SManager_1(&$_g, &$_g1, &$_g2, &$_g3, &$d, &$f, &$first, &$i1, &$parts, &$s, &$x, $p1) {
	{
		$s->add(_hx_string_or_null(((($i1++ > 1) ? "," : ""))) . _hx_string_or_null($_g3->quoteField($p1)));
	}
}
