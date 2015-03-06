<?php

class model_QC extends Model {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	static function create($param) {
		$self = new model_Clients();
		$self->table = "vicidial_list";
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 26, "className" => "model.QC", "methodName" => "create")));
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.QC'; }
}
