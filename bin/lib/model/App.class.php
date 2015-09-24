<?php

class model_App extends Model {
	public function __construct($param = null) { if(!php_Boot::$skip_constructor) {
		parent::__construct($param);
	}}
	public function getGlobals($param) {
		$fieldNames = new haxe_ds_StringMap();
		$typeMap = new haxe_ds_StringMap();
		$optionsMap = new haxe_ds_StringMap();
		$eF = $this->getEditorFields(null);
		$keys = $eF->keys();
		$tableNames = new _hx_array(array());
		$tableFields = new haxe_ds_StringMap();
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "App.hx", "lineNumber" => 32, "className" => "model.App", "methodName" => "getGlobals")));
		while($keys->hasNext()) {
			$k = $keys->next();
			$tableNames->push($k);
			$aFields = $eF->get($k);
			$cFields = $aFields->map(array(new _hx_lambda(array(&$aFields, &$eF, &$fieldNames, &$k, &$keys, &$optionsMap, &$param, &$tableFields, &$tableNames, &$typeMap), "model_App_0"), 'execute'));
			$tableFields->set($k, $cFields);
			{
				$_g1 = 0;
				$_g = $cFields->length;
				while($_g1 < $_g) {
					$f = $_g1++;
					$fieldNames->set($cFields[$f], _hx_array_get($aFields, $f)->get("field_name"));
					if(_hx_array_get($aFields, $f)->get("field_options") !== null) {
						$optionsMap->set($cFields[$f], _hx_array_get($aFields, $f)->get("field_options"));
					}
					$typeMap->set($cFields[$f], _hx_array_get($aFields, $f)->get("field_type"));
					unset($f);
				}
				unset($_g1,$_g);
			}
			unset($k,$cFields,$aFields);
		}
		$me = new model_Users($param);
		$me->get_info(null);
		$data = _hx_anonymous(array("fieldNames" => php_Lib::associativeArrayOfHash($fieldNames), "userMap" => $me->globals, "optionsMap" => $optionsMap, "typeMap" => $typeMap, "limit" => _hx_array_get(S::$conf->get("sql"), "LIMIT")));
		return $data;
	}
	static function create($param) {
		return json_encode(_hx_deref(new model_App($param))->getGlobals($param), 320);
	}
	function __toString() { return 'model.App'; }
}
function model_App_0(&$aFields, &$eF, &$fieldNames, &$k, &$keys, &$optionsMap, &$param, &$tableFields, &$tableNames, &$typeMap, $field) {
	{
		return $field->get("field_label");
	}
}
