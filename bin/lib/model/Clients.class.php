<?php

class model_Clients extends Model {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function doJoin($q, $sb, $phValues) {
		$fields = $q->get("fields");
		$sb->add("SELECT " . _hx_string_or_null(((($fields !== null) ? $this->fieldFormat(_hx_explode(",", $fields)->map(array(new _hx_lambda(array(&$fields, &$phValues, &$q, &$sb), "model_Clients_0"), 'execute'))->join(",")) : "*"))));
		$qTable = null;
		if(Util::any2bool($q->get("table"))) {
			$qTable = $q->get("table");
		} else {
			$qTable = $this->table;
		}
		$joinCond = null;
		if(Util::any2bool($q->get("joincond"))) {
			$joinCond = $q->get("joincond");
		} else {
			$joinCond = null;
		}
		$joinTable = null;
		if(Util::any2bool($q->get("jointable"))) {
			$joinTable = $q->get("jointable");
		} else {
			$joinTable = null;
		}
		haxe_Log::trace("table:" . _hx_string_or_null($q->get("table")) . ":" . _hx_string_or_null((model_Clients_1($this, $fields, $joinCond, $joinTable, $phValues, $q, $qTable, $sb))) . "" . _hx_string_or_null($joinCond), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 39, "className" => "model.Clients", "methodName" => "doJoin")));
		$sb->add(" FROM " . _hx_string_or_null(S::$my->real_escape_string($qTable)));
		if($joinTable !== null) {
			$sb->add(" INNER JOIN " . _hx_string_or_null($joinTable));
		}
		if($joinCond !== null) {
			$sb->add(" ON " . _hx_string_or_null($joinCond));
		}
		$where = $q->get("where");
		if($where !== null) {
			$this->buildCond($where, $sb, $phValues);
		}
		$groupParam = $q->get("group");
		if($groupParam !== null) {
			$this->buildGroup($groupParam, $sb);
		}
		$order = $q->get("order");
		if($order !== null) {
			$this->buildOrder($order, $sb);
		}
		$limit = $q->get("limit");
		$this->buildLimit((($limit === null) ? "15" : $limit), $sb);
		return $this->execute($sb->b, $q, $phValues);
	}
	public function find($param) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$count = $this->countJoin($param, $sb, $phValues);
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace(_hx_string_or_null($param->get("joincond")) . " count:" . _hx_string_rec($count, "") . ":" . _hx_string_or_null($param->get("page")) . ": " . _hx_string_or_null(((($param->exists("page")) ? "Y" : "N"))), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 78, "className" => "model.Clients", "methodName" => "find")));
		$this->data = _hx_anonymous(array("count" => $count, "page" => (($param->exists("page")) ? Std::parseInt($param->get("page")) : 1), "rows" => $this->doJoin($param, $sb, $phValues)));
		return $this->json_encode();
	}
	public function edit($param) {
		$fieldNames = new haxe_ds_StringMap();
		$typeMap = new haxe_ds_StringMap();
		$optionsMap = new haxe_ds_StringMap();
		$eF = $this->getEditorFields(null);
		$keys = $eF->keys();
		$tableNames = new _hx_array(array());
		$tableFields = new haxe_ds_StringMap();
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 101, "className" => "model.Clients", "methodName" => "edit")));
		while($keys->hasNext()) {
			$k = $keys->next();
			$tableNames->push($k);
			$aFields = $eF->get($k);
			$cFields = $aFields->map(array(new _hx_lambda(array(&$aFields, &$eF, &$fieldNames, &$k, &$keys, &$optionsMap, &$param, &$tableFields, &$tableNames, &$typeMap), "model_Clients_2"), 'execute'));
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
		haxe_Log::trace($tableNames, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 120, "className" => "model.Clients", "methodName" => "edit")));
		$editTables = new haxe_ds_StringMap();
		$ti = 0;
		$tableNames->remove("vicidial_list");
		{
			$_g2 = 0;
			while($_g2 < $tableNames->length) {
				$table = $tableNames[$_g2];
				++$_g2;
				$p = new haxe_ds_StringMap();
				$sb = new StringBuf();
				$phValues = new _hx_array(array());
				$p->set("primary_id", $param->get("primary_id"));
				if($table === "clients") {
					$p->set("table", "vicidial_list");
					$p->set("jointable", "fly_crm." . _hx_string_or_null($table));
					$p->set("joincond", $param->get("joincond"));
					$p->set("fields", Std::string(_hx_string_call($param->get("fields"), "split", array(","))->map(array(new _hx_lambda(array(&$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap), "model_Clients_3"), 'execute'))->join(",")) . "," . _hx_string_or_null($tableFields->get($table)->map(array(new _hx_lambda(array(&$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap), "model_Clients_4"), 'execute'))->join(",")));
					$p->set("where", "vicidial_list.lead_id|" . Std::string($param->get("lead_id")));
					$editTables->set($table, php_Lib::hashOfAssociativeArray($this->doJoin($p, $sb, $phValues)));
				} else {
					$p->set("table", model_Clients_5($this, $_g2, $eF, $editTables, $fieldNames, $keys, $optionsMap, $p, $param, $phValues, $sb, $table, $tableFields, $tableNames, $ti, $typeMap));
					$p->set("fields", $tableFields->get($table)->join(","));
					if($table === "vicidial_list") {
						$p->set("where", "vendor_lead_code|" . Std::string($param->get("client_id")));
					} else {
						$p->set("where", "pay_client_id|" . Std::string($param->get("client_id")));
					}
					$editTables->set($table, php_Lib::hashOfAssociativeArray($this->doSelect($p, $sb, $phValues)));
				}
				unset($table,$sb,$phValues,$p);
			}
		}
		$this->data = _hx_anonymous(array("fieldNames" => php_Lib::associativeArrayOfHash($fieldNames), "editData" => php_Lib::associativeArrayOfHash($editTables), "typeMap" => php_Lib::associativeArrayOfHash($typeMap), "optionsMap" => php_Lib::associativeArrayOfHash($optionsMap), "recordings" => $this->getRecordings(Std::parseInt($param->get("lead_id")))));
		return $this->json_encode();
	}
	public function getCustomFields($list_id) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$param = new haxe_ds_StringMap();
		$param->set("table", "vicidial_lists_fields");
		$param->set("where", "list_id|" . _hx_string_or_null(S::$my->real_escape_string($list_id)));
		$param->set("fields", "field_name,field_label,field_type,field_options");
		$param->set("order", "field_rank,field_order");
		$param->set("limit", "100");
		$cFields = null;
		{
			$a = $this->doSelect($param, $sb, $phValues);
			$cFields = new _hx_array($a);
		}
		haxe_Log::trace($cFields->length, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 177, "className" => "model.Clients", "methodName" => "getCustomFields")));
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
	public function getEditorFields($table_name = null) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$param = new haxe_ds_StringMap();
		$param->set("table", "fly_crm.editor_fields");
		$param->set("where", "field_cost|>-2" . _hx_string_or_null((model_Clients_6($this, $param, $phValues, $sb, $table_name))));
		$param->set("fields", "field_name,field_label,field_type,field_options,table_name");
		$param->set("order", "table_name,field_rank,field_order");
		$param->set("limit", "100");
		$eFields = null;
		{
			$a = $this->doSelect($param, $sb, $phValues);
			$eFields = new _hx_array($a);
		}
		$ret = new haxe_ds_StringMap();
		{
			$_g = 0;
			while($_g < $eFields->length) {
				$ef = $eFields[$_g];
				++$_g;
				$table = $ef["table_name"];
				if(!$ret->exists($table)) {
					$ret->set($table, (new _hx_array(array())));
				}
				$a1 = $ret->get($table);
				$a1->push(php_Lib::hashOfAssociativeArray($ef));
				$ret->set($table, $a1);
				unset($table,$ef,$a1);
			}
		}
		return $ret;
	}
	public function getRecordings($lead_id) {
		return $this->query("SELECT location ,  start_time, length_in_sec FROM recording_log WHERE lead_id = " . Std::string($lead_id) . " ORDER BY start_time DESC");
	}
	public function save($q) {
		$lead_id = Std::parseInt($q->get("lead_id"));
		haxe_Log::trace($q, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 237, "className" => "model.Clients", "methodName" => "save")));
		return false;
	}
	static function create($param) {
		$self = new model_Clients();
		$self->table = "vicidial_list";
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.Clients'; }
}
function model_Clients_0(&$fields, &$phValues, &$q, &$sb, $f) {
	{
		return S::$my->real_escape_string($f);
	}
}
function model_Clients_1(&$__hx__this, &$fields, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb) {
	if(Util::any2bool($q->get("table"))) {
		return $q->get("table");
	} else {
		return $__hx__this->table;
	}
}
function model_Clients_2(&$aFields, &$eF, &$fieldNames, &$k, &$keys, &$optionsMap, &$param, &$tableFields, &$tableNames, &$typeMap, $field) {
	{
		return $field->get("field_label");
	}
}
function model_Clients_3(&$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap, $f1) {
	{
		if(_hx_index_of($f1, "vicidial_list.", null) !== 0) {
			return "vicidial_list." . _hx_string_or_null($f1);
		} else {
			return $f1;
		}
	}
}
function model_Clients_4(&$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap, $f2) {
	{
		return _hx_string_or_null($table) . "." . _hx_string_or_null($f2);
	}
}
function model_Clients_5(&$__hx__this, &$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap) {
	if($table === "vicidial_list") {
		return $table;
	} else {
		return "fly_crm." . _hx_string_or_null($table);
	}
}
function model_Clients_6(&$__hx__this, &$param, &$phValues, &$sb, &$table_name) {
	if($table_name !== null) {
		return ",table_name|" . _hx_string_or_null(S::$my->real_escape_string($table_name));
	} else {
		return "";
	}
}
