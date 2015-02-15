<?php

class Model {
	public function __construct() {
		;
	}
	public $data;
	public function fieldFormat($fields) {
		$fieldsWithFormat = new _hx_array(array());
		$sF = _hx_explode(",", $fields);
		$dbQueryFormats = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbQueryFormats")));
		haxe_Log::trace($dbQueryFormats, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 60, "className" => "Model", "methodName" => "fieldFormat")));
		$d = php_Lib::hashOfAssociativeArray(S::$conf->get("dbQueryFormats"));
		haxe_Log::trace($d, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 63, "className" => "Model", "methodName" => "fieldFormat")));
		$qKeys = new _hx_array(array());
		$it = $dbQueryFormats->keys();
		while($it->hasNext()) {
			$qKeys->push($it->next());
		}
		haxe_Log::trace($qKeys, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 72, "className" => "Model", "methodName" => "fieldFormat")));
		{
			$_g = 0;
			while($_g < $sF->length) {
				$f = $sF[$_g];
				++$_g;
				if(Lambda::has($qKeys, $f)) {
					$format = $dbQueryFormats->get($f);
					haxe_Log::trace($format, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 78, "className" => "Model", "methodName" => "fieldFormat")));
					$fieldsWithFormat->push(_hx_string_or_null($format[0]) . "(`" . _hx_string_or_null($f) . "`, \"" . _hx_string_or_null($format[1]) . "\") AS `" . _hx_string_or_null($f) . "`");
					unset($format);
				} else {
					$fieldsWithFormat->push($f);
				}
				unset($f);
			}
		}
		haxe_Log::trace($fieldsWithFormat, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 84, "className" => "Model", "methodName" => "fieldFormat")));
		return $fieldsWithFormat->join(",");
	}
	public function prepare($whereParam, $placeHolder) {
		$where = _hx_explode(",", $whereParam);
		haxe_Log::trace($where, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 91, "className" => "Model", "methodName" => "prepare")));
		if($where->length === 0) {
			return "";
		}
		$phString = "";
		{
			$_g = 0;
			while($_g < $where->length) {
				$w = $where[$_g];
				++$_g;
				$wData = _hx_string_call($w, "split", array("|"));
				haxe_Log::trace($wData, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 99, "className" => "Model", "methodName" => "prepare")));
				if($phString === "") {
					$phString .= "WHERE `" . _hx_string_or_null($wData[0]) . "` ";
				} else {
					$phString .= "AND `" . _hx_string_or_null($wData[0]) . "` ";
				}
				{
					$_g1 = $wData[2];
					switch($_g1) {
					case "exact":{
						$phString .= "= ? ";
						$placeHolder->set($wData[0], $wData[1]);
					}break;
					case "any":{
						$phString .= "LIKE ? ";
						$placeHolder->set($wData[0], "%" . _hx_string_or_null($wData[1]) . "%");
					}break;
					case "end":{
						$phString .= "LIKE ? ";
						$placeHolder->set($wData[0], "%" . _hx_string_or_null($wData[1]));
					}break;
					case "start":{
						$phString .= "LIKE ? ";
						$placeHolder->set($wData[0], _hx_string_or_null($wData[1]) . "%");
					}break;
					}
					unset($_g1);
				}
				unset($wData,$w);
			}
		}
		return $phString;
	}
	public function whereString($matchType) {
		$wS = "";
		switch($matchType) {
		case "exact":{
			return "=";
		}break;
		default:{
			return "oops";
		}break;
		}
	}
	public function json_encode() {
		return json_encode($this->data);
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
	static function dispatch($param) {
		$cl = Type::resolveClass("model." . Std::string($param->get("className")));
		haxe_Log::trace($cl, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 28, "className" => "Model", "methodName" => "dispatch")));
		if($cl === null) {
			haxe_Log::trace("model." . Std::string($param->get("className")) . " ???", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 31, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
		$fl = Reflect::field($cl, "create");
		haxe_Log::trace($fl, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 35, "className" => "Model", "methodName" => "dispatch")));
		if($fl === null) {
			haxe_Log::trace(Std::string($cl) . "create is null", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 38, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
		$iFields = Type::getInstanceFields($cl);
		haxe_Log::trace($iFields, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 42, "className" => "Model", "methodName" => "dispatch")));
		if(Lambda::has($iFields, $param->get("action"))) {
			haxe_Log::trace("calling create " . Std::string($cl), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 45, "className" => "Model", "methodName" => "dispatch")));
			return Reflect::callMethod($cl, $fl, (new _hx_array(array($param))));
		} else {
			haxe_Log::trace("not calling create ", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 50, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
	}
	function __toString() { return 'Model'; }
}
