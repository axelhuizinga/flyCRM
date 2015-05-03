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
		haxe_Log::trace("table:" . _hx_string_or_null($q->get("table")) . ":" . _hx_string_or_null((model_Clients_1($this, $fields, $joinCond, $joinTable, $phValues, $q, $qTable, $sb))) . "" . _hx_string_or_null($joinCond), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 45, "className" => "model.Clients", "methodName" => "doJoin")));
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
		haxe_Log::trace(_hx_string_or_null($param->get("joincond")) . " count:" . _hx_string_rec($count, "") . ":" . _hx_string_or_null($param->get("page")) . ": " . _hx_string_or_null(((($param->exists("page")) ? "Y" : "N"))), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 84, "className" => "model.Clients", "methodName" => "find")));
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
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 107, "className" => "model.Clients", "methodName" => "edit")));
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
		haxe_Log::trace($tableNames, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 126, "className" => "model.Clients", "methodName" => "edit")));
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
						$p->set("where", "client_id|" . Std::string($param->get("client_id")));
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
		$param->set("fields", "field_name,field_label,field_type,field_options,field_required,field_default");
		$param->set("order", "field_rank,field_order");
		$param->set("limit", "100");
		$cFields = null;
		{
			$a = $this->doSelect($param, $sb, $phValues);
			$cFields = new _hx_array($a);
		}
		haxe_Log::trace($cFields->length, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 183, "className" => "model.Clients", "methodName" => "getCustomFields")));
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
		$records = null;
		{
			$a = $this->query("SELECT location ,  start_time, length_in_sec FROM recording_log WHERE lead_id = " . Std::string($lead_id) . " ORDER BY start_time DESC");
			$records = new _hx_array($a);
		}
		$rc = $this->num_rows;
		haxe_Log::trace("" . _hx_string_rec($rc, "") . " == " . _hx_string_rec($records->length, ""), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 239, "className" => "model.Clients", "methodName" => "getRecordings")));
		return php_Lib::toPhpArray($records->filter(array(new _hx_lambda(array(&$lead_id, &$rc, &$records), "model_Clients_7"), 'execute'))->splice(0, 5));
	}
	public function save($q) {
		$lead_id = Std::parseInt($q->get("lead_id"));
		$res = S::$my->query("INSERT INTO vicidial_lead_log SELECT * FROM (SELECT NULL AS log_id," . _hx_string_rec($lead_id, "") . " AS lead_id,NOW() AS entry_date) AS ll JOIN (SELECT modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id FROM `vicidial_list`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS vl", null);
		$log_id = S::$my->insert_id;
		if($log_id > 0) {
			$cTable = "custom_" . Std::string($q->get("entry_list_id"));
			haxe_Log::trace(_hx_string_or_null($cTable) . " log_id:" . _hx_string_rec($log_id, ""), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 256, "className" => "model.Clients", "methodName" => "save")));
			if($this->checkOrCreateCustomTable($cTable, null)) {
				$cLogTable = _hx_string_or_null($cTable) . "_log";
				$res = S::$my->query("INSERT INTO " . _hx_string_or_null($cLogTable) . " SELECT * FROM (SELECT " . _hx_string_rec($log_id, "") . " AS log_id) AS ll JOIN (SELECT * FROM `" . _hx_string_or_null($cTable) . "`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS cl", null);
				haxe_Log::trace("INSERT INTO " . _hx_string_or_null($cLogTable) . " ..." . _hx_string_or_null(S::$my->error) . "<", _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 263, "className" => "model.Clients", "methodName" => "save")));
				if(S::$my->error === "") {
					$primary_id = S::$my->real_escape_string($q->get("primary_id"));
					$sql = new StringBuf();
					$sql->add("UPDATE " . _hx_string_or_null($cTable) . " SET ");
					$cFields = S::tableFields("" . _hx_string_or_null($cTable), null);
					haxe_Log::trace("" . _hx_string_or_null($cTable) . " fields:" . _hx_string_or_null($cFields->toString()), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 271, "className" => "model.Clients", "methodName" => "save")));
					$cFields->remove($primary_id);
					$bindTypes = "";
					$values2bind = null;
					$i = 0;
					$dbFieldTypes = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbFieldTypes")));
					$sets = new _hx_array(array());
					{
						$_g = 0;
						while($_g < $cFields->length) {
							$c = $cFields[$_g];
							++$_g;
							$val = $q->get($c);
							if($val !== null) {
								if(Std::is($val, _hx_qtype("String"))) {
									$values2bind[$i++] = $val;
								} else {
									$values2bind[$i++] = $val[0];
								}
								$type = $dbFieldTypes->get($c);
								if(Util::any2bool($type)) {
									$bindTypes .= _hx_string_or_null($type);
								} else {
									$bindTypes .= "s";
								}
								$sets->push(_hx_string_or_null($c) . "=?");
								unset($type);
							}
							unset($val,$c);
						}
					}
					$sql->add($sets->join(","));
					$sql->add(" WHERE lead_id=" . _hx_string_rec($lead_id, ""));
					$stmt = S::$my->stmt_init();
					haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 293, "className" => "model.Clients", "methodName" => "save")));
					$success = $stmt->prepare($sql->b);
					if(!$success) {
						haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 297, "className" => "model.Clients", "methodName" => "save")));
						return false;
					}
					$success = myBindParam($stmt, $values2bind, $bindTypes);
					haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 301, "className" => "model.Clients", "methodName" => "save")));
					if($success) {
						$success = $stmt->execute();
						if(!$success) {
							haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 307, "className" => "model.Clients", "methodName" => "save")));
							return false;
						}
						$sql = new StringBuf();
						$uFields = model_Clients::$vicdial_list_fields;
						$uFields->remove($primary_id);
						$bindTypes = "";
						$values2bind = null;
						$i = 0;
						$sql->add("UPDATE vicidial_list SET ");
						$sets = new _hx_array(array());
						{
							$_g1 = 0;
							while($_g1 < $uFields->length) {
								$c1 = $uFields[$_g1];
								++$_g1;
								$val1 = $q->get($c1);
								if($val1 !== null) {
									if(Std::is($val1, _hx_qtype("String"))) {
										$values2bind[$i++] = $val1;
									} else {
										$values2bind[$i++] = $val1[0];
									}
									$type1 = $dbFieldTypes->get($c1);
									if(Util::any2bool($type1)) {
										$bindTypes .= _hx_string_or_null($type1);
									} else {
										$bindTypes .= "s";
									}
									$sets->push(_hx_string_or_null($c1) . "=?");
									unset($type1);
								}
								unset($val1,$c1);
							}
						}
						if(_hx_equal($q->get("status"), "QCOK") || _hx_equal($q->get("status"), "QCBAD")) {
							$list_id = 10000;
							if(_hx_equal($q->get("status"), "QCOK")) {
								$mID = Std::parseInt($q->get("vendor_lead_code"));
								if($mID === null) {
									$mID = S::newMemberID();
									$values2bind[$i++] = $mID;
									$bindTypes .= "s";
									$sets->push("vendor_lead_code=?");
								}
							} else {
								$list_id = 1800;
							}
							$entry_list_id = $q->get("entry_list_id");
							$values2bind[$i++] = $q->get("status");
							$bindTypes .= "s";
							$sets->push("`status`=?");
							$values2bind[$i++] = $list_id;
							$bindTypes .= "s";
							$sets->push("list_id=?");
							$values2bind[$i++] = $entry_list_id;
							$bindTypes .= "s";
							$sets->push("entry_list_id=?");
							$values2bind[$i++] = $q->get("owner");
							$bindTypes .= "s";
							$sets->push("owner=?");
						}
						$sql->add($sets->join(","));
						$sql->add(" WHERE lead_id=" . _hx_string_rec($lead_id, ""));
						$stmt1 = S::$my->stmt_init();
						haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 366, "className" => "model.Clients", "methodName" => "save")));
						$success1 = $stmt1->prepare($sql->b);
						if(!$success1) {
							haxe_Log::trace($stmt1->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 370, "className" => "model.Clients", "methodName" => "save")));
							return false;
						}
						$success1 = myBindParam($stmt1, $values2bind, $bindTypes);
						haxe_Log::trace("success:" . Std::string($success1), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 376, "className" => "model.Clients", "methodName" => "save")));
						if($success1) {
							$success1 = $stmt1->execute();
							if(!$success1) {
								haxe_Log::trace($stmt1->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 382, "className" => "model.Clients", "methodName" => "save")));
								return false;
							}
							return $this->saveClientData($q);
						}
						return false;
					}
				} else {
					haxe_Log::trace("oops:" . _hx_string_or_null(S::$my->error), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 392, "className" => "model.Clients", "methodName" => "save")));
				}
			}
		}
		return false;
	}
	public function saveClientData($q) {
		$clientID = $q->get("client_id");
		if($clientID === null) {
			return true;
		}
		$sql = new StringBuf();
		$uFields = model_Clients::$clients_fields;
		$uFields->remove("client_id");
		$bindTypes = "";
		$values2bind = null;
		$i = 0;
		$dbFieldTypes = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbFieldTypes")));
		$sets = new _hx_array(array());
		$sql->add("UPDATE fly_crm.clients SET ");
		{
			$_g = 0;
			while($_g < $uFields->length) {
				$c = $uFields[$_g];
				++$_g;
				$val = $q->get($c);
				if($val !== null) {
					if(Std::is($val, _hx_qtype("String"))) {
						$values2bind[$i++] = $val;
					} else {
						$values2bind[$i++] = $val[0];
					}
					$type = $dbFieldTypes->get($c);
					if(Util::any2bool($type)) {
						$bindTypes .= _hx_string_or_null($type);
					} else {
						$bindTypes .= "s";
					}
					$sets->push(_hx_string_or_null($c) . "=?");
					unset($type);
				}
				unset($val,$c);
			}
		}
		if($sets->length === 0) {
			return true;
		}
		$sql->add($sets->join(","));
		$sql->add(" WHERE client_id=" . Std::string($clientID));
		$stmt = S::$my->stmt_init();
		haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 432, "className" => "model.Clients", "methodName" => "saveClientData")));
		$success = $stmt->prepare($sql->b);
		if(!$success) {
			haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 436, "className" => "model.Clients", "methodName" => "saveClientData")));
			return false;
		}
		haxe_Log::trace($values2bind, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 440, "className" => "model.Clients", "methodName" => "saveClientData")));
		$success = myBindParam($stmt, $values2bind, $bindTypes);
		haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 442, "className" => "model.Clients", "methodName" => "saveClientData")));
		if($success) {
			$success = $stmt->execute();
			if(!$success) {
				haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 448, "className" => "model.Clients", "methodName" => "saveClientData")));
				return false;
			}
			return true;
		}
		return false;
	}
	public function checkOrCreateCustomTable($srcTable, $suffix = null) {
		if($suffix === null) {
			$suffix = "log";
		}
		$newTable = S::$my->real_escape_string(_hx_string_or_null($srcTable) . "_" . _hx_string_or_null($suffix));
		$res = S::$my->query("SHOW TABLES LIKE  \"" . _hx_string_or_null($newTable) . "\"", null);
		if(Util::any2bool($res) && $res->num_rows === 0) {
			haxe_Log::trace("CREATE TABLE `" . _hx_string_or_null($newTable) . "` like `" . _hx_string_or_null($srcTable) . "`", _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 463, "className" => "model.Clients", "methodName" => "checkOrCreateCustomTable")));
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
		} else {
			haxe_Log::trace("num_rows:" . _hx_string_rec($res->num_rows, ""), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 474, "className" => "model.Clients", "methodName" => "checkOrCreateCustomTable")));
		}
		return true;
	}
	static $vicdial_list_fields;
	static $clients_fields;
	static $pay_source_fields;
	static $pay_plan_fields;
	static function create($param) {
		$self = new model_Clients();
		$self->table = "vicidial_list";
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.Clients'; }
}
model_Clients::$vicdial_list_fields = _hx_explode(",", "lead_id,entry_date,modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id");
model_Clients::$clients_fields = _hx_explode(",", "client_id,lead_id,creation_date,state,pay_obligation,use_email,register_on,register_off,register_off_to,teilnahme_beginn,titel,namenszusatz,adresszusatz,storno_grund");
model_Clients::$pay_source_fields = _hx_explode(",", "id,client_id,lead_id,debtor,bank_name,account,blz,iban,sign_date,pay_source_state,creation_date");
model_Clients::$pay_plan_fields = _hx_explode(",", "pay_plan_id,client_id,creation_date,pay_source_id,target_id,start_day,start_date,cycle,amount,product,user,pay_plan_state,pay_method");
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
function model_Clients_7(&$lead_id, &$rc, &$records, $r) {
	{
		return php_Lib::objectOfAssociativeArray($r)->length_in_sec > 20;
	}
}
