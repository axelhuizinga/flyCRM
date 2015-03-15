<?php

class model_Clients extends Model {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function getCustomFields($list_id) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$param = new haxe_ds_StringMap();
		$param->set("table", "vicidial_lists_fields");
		$param->set("where", "list_id|" . _hx_string_or_null(S::$my->real_escape_string($list_id)));
		$param->set("fields", "field_name,field_label,field_type,field_options");
		$param->set("order", "field_rank,field_order");
		$param->set("limit", "100");
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 49, "className" => "model.Clients", "methodName" => "getCustomFields")));
		$cFields = null;
		{
			$a = $this->doSelect($param, $sb, $phValues);
			$cFields = new _hx_array($a);
		}
		haxe_Log::trace($cFields->length, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 52, "className" => "model.Clients", "methodName" => "getCustomFields")));
		$ret = new _hx_array(array());
		{
			$_g = 0;
			while($_g < $cFields->length) {
				$cf = $cFields[$_g];
				++$_g;
				$field = php_Lib::hashOfAssociativeArray($cf);
				$ret->push($field);
				unset($field,$cf);
			}
		}
		return $ret;
	}
	static function create($param) {
		$self = new model_Clients();
		$self->table = "vicidial_list";
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.Clients'; }
}
