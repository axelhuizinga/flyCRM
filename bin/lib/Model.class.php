<?php

class Model {
	public function __construct() {
		;
	}
	public $data;
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
		haxe_Log::trace($cl, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 27, "className" => "Model", "methodName" => "dispatch")));
		if($cl === null) {
			haxe_Log::trace("model." . Std::string($param->get("className")) . " ???", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 30, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
		$fl = Reflect::field($cl, "create");
		haxe_Log::trace($fl, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 34, "className" => "Model", "methodName" => "dispatch")));
		if($fl === null) {
			haxe_Log::trace(Std::string($cl) . "create is null", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 37, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
		$iFields = Type::getInstanceFields($cl);
		haxe_Log::trace($iFields, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 41, "className" => "Model", "methodName" => "dispatch")));
		if(Lambda::has($iFields, $param->get("action"))) {
			haxe_Log::trace("calling create " . Std::string($cl), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 44, "className" => "Model", "methodName" => "dispatch")));
			return Reflect::callMethod($cl, $fl, (new _hx_array(array($param))));
		} else {
			haxe_Log::trace("not calling create ", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 49, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
	}
	function __toString() { return 'Model'; }
}
