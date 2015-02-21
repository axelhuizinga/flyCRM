<?php

class Model {
	public function __construct(){}
	public function json_encode($data) {
		return json_encode($data);
	}
	static function dispatch($param) {
		$cl = Type::resolveClass("model." . Std::string($param->get("className")));
		haxe_Log::trace($cl, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 31, "className" => "Model", "methodName" => "dispatch")));
		if($cl === null) {
			haxe_Log::trace("model." . Std::string($param->get("className")) . " ???", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 34, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
		$action = $param->get("action");
		$fl = Reflect::field($cl, $action);
		haxe_Log::trace($fl, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 39, "className" => "Model", "methodName" => "dispatch")));
		if($fl === null) {
			haxe_Log::trace(Std::string($cl) . "." . _hx_string_or_null($action) . " is null", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 42, "className" => "Model", "methodName" => "dispatch")));
		}
		$iFields = Type::getInstanceFields($cl);
		haxe_Log::trace($iFields, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 46, "className" => "Model", "methodName" => "dispatch")));
		if(Lambda::has($iFields, $action)) {
			haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 49, "className" => "Model", "methodName" => "dispatch")));
			haxe_Log::trace("calling " . Std::string($cl) . "." . Std::string($param->get("action")), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 50, "className" => "Model", "methodName" => "dispatch")));
			return Reflect::callMethod($cl, $fl, (new _hx_array(array($param))));
		} else {
			haxe_Log::trace("not calling " . _hx_string_or_null($action), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 58, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
	}
	static function fieldFormat($fields) {
		$fieldsWithFormat = new _hx_array(array());
		$sF = _hx_explode(",", $fields);
		$dbQueryFormats = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbQueryFormats")));
		haxe_Log::trace($dbQueryFormats, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 69, "className" => "Model", "methodName" => "fieldFormat")));
		$d = php_Lib::hashOfAssociativeArray(S::$conf->get("dbQueryFormats"));
		haxe_Log::trace($d, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 72, "className" => "Model", "methodName" => "fieldFormat")));
		$qKeys = new _hx_array(array());
		$it = $dbQueryFormats->keys();
		while($it->hasNext()) {
			$qKeys->push($it->next());
		}
		haxe_Log::trace($qKeys, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 81, "className" => "Model", "methodName" => "fieldFormat")));
		{
			$_g = 0;
			while($_g < $sF->length) {
				$f = $sF[$_g];
				++$_g;
				if(Lambda::has($qKeys, $f)) {
					$format = $dbQueryFormats->get($f);
					haxe_Log::trace($format, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 87, "className" => "Model", "methodName" => "fieldFormat")));
					$fieldsWithFormat->push(_hx_string_or_null($format[0]) . "(`" . _hx_string_or_null($f) . "`, \"" . _hx_string_or_null($format[1]) . "\") AS `" . _hx_string_or_null($f) . "`");
					unset($format);
				} else {
					$fieldsWithFormat->push($f);
				}
				unset($f);
			}
		}
		haxe_Log::trace($fieldsWithFormat, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 93, "className" => "Model", "methodName" => "fieldFormat")));
		return $fieldsWithFormat->join(",");
	}
	static function quoteIf($t) {
		switch($t->index) {
		case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 24:case 25:case 26:case 27:case 28:case 29:{
			return false;
		}break;
		default:{
			return true;
		}break;
		}
	}
	static function param2obj($whereParam) {
		$where = _hx_explode(",", $whereParam);
		haxe_Log::trace($where, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 110, "className" => "Model", "methodName" => "param2obj")));
		if($where->length === 0) {
			return null;
		}
		$whereObj = _hx_anonymous(array());
		{
			$_g = 0;
			while($_g < $where->length) {
				$w = $where[$_g];
				++$_g;
				$wData = _hx_explode("|", $w);
				haxe_Log::trace($wData, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 117, "className" => "Model", "methodName" => "param2obj")));
				$name = $wData->shift();
				if(strtoupper($name) === "LIMIT") {
					$wData->unshift("LIMIT");
				}
				{
					$value = $wData->join("|");
					$whereObj->{$name} = $value;
					unset($value);
				}
				unset($wData,$w,$name);
			}
		}
		return $whereObj;
	}
	static function whereParam2sql($whereParam, $placeHolder) {
		$where = _hx_explode(",", $whereParam);
		haxe_Log::trace($where, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 130, "className" => "Model", "methodName" => "whereParam2sql")));
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
				haxe_Log::trace($wData, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 138, "className" => "Model", "methodName" => "whereParam2sql")));
				if($phString === "") {
					$phString .= "WHERE `" . Std::string($wData[0]) . "` ";
				} else {
					$phString .= "AND `" . Std::string($wData[0]) . "` ";
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
						$placeHolder->set($wData[0], "%" . Std::string($wData[1]) . "%");
					}break;
					case "end":{
						$phString .= "LIKE ? ";
						$placeHolder->set($wData[0], "%" . Std::string($wData[1]));
					}break;
					case "start":{
						$phString .= "LIKE ? ";
						$placeHolder->set($wData[0], Std::string($wData[1]) . "%");
					}break;
					}
					unset($_g1);
				}
				unset($wData,$w);
			}
		}
		return $phString;
	}
	static function whereString($matchType) {
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
	function __toString() { return 'Model'; }
}
