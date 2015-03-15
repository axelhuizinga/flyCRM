<?php

class model_QC extends model_Clients {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function edit($param) {
		$entry_list_id = $param->get("entry_list_id");
		$cF = $this->getCustomFields($entry_list_id);
		$cFields = $cF->map(array(new _hx_lambda(array(&$cF, &$entry_list_id, &$param), "model_QC_0"), 'execute'));
		haxe_Log::trace($cFields, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 36, "className" => "model.QC", "methodName" => "edit")));
		$fieldNames = new haxe_ds_StringMap();
		$typeMap = new haxe_ds_StringMap();
		$optionsMap = new haxe_ds_StringMap();
		{
			$_g1 = 0;
			$_g = $cFields->length;
			while($_g1 < $_g) {
				$f = $_g1++;
				$fieldNames->set($cFields[$f], _hx_array_get($cF, $f)->get("field_name"));
				if(_hx_array_get($cF, $f)->get("field_options") !== null) {
					$optionsMap->set($cFields[$f], _hx_array_get($cF, $f)->get("field_options"));
				}
				$typeMap->set($cFields[$f], _hx_array_get($cF, $f)->get("field_type"));
				unset($f);
			}
		}
		$param->set("fields", $cFields);
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 55, "className" => "model.QC", "methodName" => "edit")));
		$this->data = _hx_anonymous(array("fieldNames" => php_Lib::associativeArrayOfHash($fieldNames), "rows" => $this->doSelectCustom($param, $sb, $phValues), "typeMap" => php_Lib::associativeArrayOfHash($typeMap), "optionsMap" => php_Lib::associativeArrayOfHash($optionsMap), "recordings" => $this->getRecordings(Std::parseInt($param->get("lead_id")))));
		return $this->json_encode();
	}
	public function getRecordings($lead_id) {
		return $this->query("SELECT location , DATE_FORMAT(start_time, '%d.%m.%Y %H:%i:%s') AS start_time, length_in_sec FROM recording_log WHERE lead_id = " . Std::string($lead_id));
	}
	public function doSelectCustom($q, $sb, $phValues) {
		$fields = $q->get("fields");
		$sb->add("SELECT " . _hx_string_or_null(((($fields !== null) ? $this->fieldFormat($fields->map(array(new _hx_lambda(array(&$fields, &$phValues, &$q, &$sb), "model_QC_1"), 'execute'))->join(",")) : "*"))));
		$entry_list_id = $q->get("entry_list_id");
		$primary_id = S::$my->real_escape_string($q->get("primary_id"));
		$sb->add(" FROM " . _hx_string_or_null(S::$my->real_escape_string($this->table)) . " AS vl INNER JOIN " . _hx_string_or_null(S::$my->real_escape_string("custom_" . _hx_string_or_null($entry_list_id))) . " AS cu ON vl." . _hx_string_or_null($primary_id) . "=cu." . _hx_string_or_null($primary_id));
		$this->buildCond("vl." . _hx_string_or_null($primary_id) . "|" . _hx_string_or_null(S::$my->real_escape_string($q->get($q->get("primary_id")))), $sb, $phValues);
		haxe_Log::trace($phValues, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 79, "className" => "model.QC", "methodName" => "doSelectCustom")));
		haxe_Log::trace($sb->b, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 80, "className" => "model.QC", "methodName" => "doSelectCustom")));
		return $this->execute($sb->b, $q, $phValues);
		return null;
	}
	public function save($q) {
		haxe_Log::trace($q, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 87, "className" => "model.QC", "methodName" => "save")));
		$lead_id = Std::parseInt($q->get("lead_id"));
		$res = S::$my->query("INSERT INTO vicidial_lead_log SELECT * FROM (SELECT NULL AS log_id) AS ll JOIN (SELECT * FROM `vicidial_list`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS vl", null);
		$log_id = S::$my->insert_id;
		if($log_id > 0) {
			$cTable = "custom_" . Std::string($q->get("entry_list_id"));
			haxe_Log::trace(_hx_string_or_null($cTable) . " log_id:" . _hx_string_rec($log_id, ""), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 97, "className" => "model.QC", "methodName" => "save")));
			if($this->checkOrCreateCustomTable($cTable, null)) {
				$cLogTable = _hx_string_or_null($cTable) . "_log";
				$res = S::$my->query("INSERT INTO " . _hx_string_or_null($cLogTable) . " SELECT * FROM (SELECT " . _hx_string_rec($log_id, "") . " AS log_id) AS ll JOIN (SELECT * FROM `" . _hx_string_or_null($cTable) . "`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS cl", null);
				if(S::$my->error === null) {
					return true;
				}
			} else {
				haxe_Log::trace("oops", _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 111, "className" => "model.QC", "methodName" => "save")));
			}
		}
		return false;
	}
	public function checkOrCreateCustomTable($srcTable, $suffix = null) {
		if($suffix === null) {
			$suffix = "log";
		}
		$newTable = S::$my->real_escape_string(_hx_string_or_null($srcTable) . "_" . _hx_string_or_null($suffix));
		haxe_Log::trace("SHOW TABLES LIKE  \"" . _hx_string_or_null($newTable) . "\"", _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 120, "className" => "model.QC", "methodName" => "checkOrCreateCustomTable")));
		$res = S::$my->query("SHOW TABLES LIKE  \"" . _hx_string_or_null($newTable) . "\"", null);
		if(Util::any2bool($res) && $res->num_rows === 0) {
			haxe_Log::trace("CREATE TABLE `" . _hx_string_or_null($newTable) . "` like `" . _hx_string_or_null($srcTable) . "`", _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 124, "className" => "model.QC", "methodName" => "checkOrCreateCustomTable")));
			$res1 = S::$my->query("CREATE TABLE `" . _hx_string_or_null($newTable) . "` like `" . _hx_string_or_null($srcTable) . "`", null);
			if(S::$my->error === "") {
				$res1 = S::$my->query("ALTER TABLE " . _hx_string_or_null($newTable) . " DROP PRIMARY KEY, ADD `log_id` INT(9) NOT NULL  FIRST,  ADD  PRIMARY KEY (`log_id`)", null);
				if(S::$my->error !== "") {
					S::hexit(S::$my->error);
				}
				return true;
			} else {
				S::hexit(S::$my->error);
			}
		}
		return true;
	}
	static function create($param) {
		$self = new model_QC();
		$self->table = "vicidial_list";
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 27, "className" => "model.QC", "methodName" => "create")));
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.QC'; }
}
function model_QC_0(&$cF, &$entry_list_id, &$param, $field) {
	{
		return $field->get("field_label");
	}
}
function model_QC_1(&$fields, &$phValues, &$q, &$sb, $f) {
	{
		return S::$my->real_escape_string($f);
	}
}
