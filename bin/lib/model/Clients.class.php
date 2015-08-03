<?php

class model_Clients extends Model {
	public function __construct($param = null) { if(!php_Boot::$skip_constructor) {
		parent::__construct($param);
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
		$filterTables = "";
		if(Util::any2bool($q->get("filter"))) {
			$filterTables = _hx_explode(",", $q->get("filter_tables"))->map(array(new _hx_lambda(array(&$fields, &$filterTables, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb), "model_Clients_1"), 'execute'))->join(",");
			$sb->add(" FROM " . _hx_string_or_null($filterTables) . "," . _hx_string_or_null(S::$my->real_escape_string($qTable)));
		} else {
			$sb->add(" FROM " . _hx_string_or_null(S::$my->real_escape_string($qTable)));
		}
		if($joinTable !== null) {
			$sb->add(" INNER JOIN " . _hx_string_or_null($joinTable));
		}
		if($joinCond !== null) {
			$sb->add(" ON " . _hx_string_or_null($joinCond));
		}
		$where = $q->get("where");
		if($where !== null) {
			$this->buildCond($where, $sb, $phValues, null);
		}
		if(Util::any2bool($q->get("filter"))) {
			$this->buildCond(_hx_explode(",", $q->get("filter"))->map(array(new _hx_lambda(array(&$fields, &$filterTables, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb, &$where), "model_Clients_2"), 'execute'))->join(","), $sb, $phValues, false);
			if($joinTable === "vicidial_users") {
				$sb->add(" " . _hx_string_or_null(_hx_explode(",", $filterTables)->map(array(new _hx_lambda(array(&$fields, &$filterTables, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb, &$where), "model_Clients_3"), 'execute'))->join(" ")));
			} else {
				$sb->add(" " . _hx_string_or_null(_hx_explode(",", $filterTables)->map(array(new _hx_lambda(array(&$fields, &$filterTables, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb, &$where), "model_Clients_4"), 'execute'))->join(" ")));
			}
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
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 137, "className" => "model.Clients", "methodName" => "find")));
		$count = $this->countJoin($param, $sb, $phValues);
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace(_hx_string_or_null($param->get("joincond")) . " count:" . _hx_string_rec($count, "") . ":" . _hx_string_or_null($param->get("page")) . ": " . _hx_string_or_null(((($param->exists("page")) ? "Y" : "N"))), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 142, "className" => "model.Clients", "methodName" => "find")));
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
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 165, "className" => "model.Clients", "methodName" => "edit")));
		while($keys->hasNext()) {
			$k = $keys->next();
			$tableNames->push($k);
			$aFields = $eF->get($k);
			$cFields = $aFields->map(array(new _hx_lambda(array(&$aFields, &$eF, &$fieldNames, &$k, &$keys, &$optionsMap, &$param, &$tableFields, &$tableNames, &$typeMap), "model_Clients_5"), 'execute'));
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
		haxe_Log::trace($tableNames, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 184, "className" => "model.Clients", "methodName" => "edit")));
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
					$p->set("fields", Std::string(_hx_string_call($param->get("fields"), "split", array(","))->map(array(new _hx_lambda(array(&$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap), "model_Clients_6"), 'execute'))->join(",")) . "," . _hx_string_or_null($tableFields->get($table)->map(array(new _hx_lambda(array(&$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap), "model_Clients_7"), 'execute'))->join(",")));
					$p->set("where", "vicidial_list.lead_id|" . Std::string($param->get("lead_id")));
					$editTables->set($table, php_Lib::hashOfAssociativeArray($this->doJoin($p, $sb, $phValues)));
				} else {
					$p->set("table", model_Clients_8($this, $_g2, $eF, $editTables, $fieldNames, $keys, $optionsMap, $p, $param, $phValues, $sb, $table, $tableFields, $tableNames, $ti, $typeMap));
					$p->set("fields", $tableFields->get($table)->join(","));
					if($table === "vicidial_list") {
						$p->set("where", "vendor_lead_code|" . Std::string($param->get("client_id")));
					} else {
						$p->set("where", "client_id|" . Std::string($param->get("client_id")));
					}
					$editTables->set($table, php_Lib::hashOfAssociativeArray($this->doSelect($p, $sb, $phValues)));
				}
				if($table === "pay_source") {
					haxe_Log::trace($tableFields->get($table), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 219, "className" => "model.Clients", "methodName" => "edit")));
				}
				unset($table,$sb,$phValues,$p);
			}
		}
		$this->data = _hx_anonymous(array("fieldNames" => php_Lib::associativeArrayOfHash($fieldNames), "editData" => php_Lib::associativeArrayOfHash($editTables), "typeMap" => php_Lib::associativeArrayOfHash($typeMap), "optionsMap" => php_Lib::associativeArrayOfHash($optionsMap), "recordings" => $this->getRecordings(Std::parseInt($param->get("lead_id")))));
		$userMap = new haxe_ds_StringMap();
		$sb1 = new StringBuf();
		$phValues1 = new _hx_array(array());
		$p1 = new haxe_ds_StringMap();
		$p1->set("table", "vicidial_users");
		$p1->set("fields", "user,full_name");
		$p1->set("where", "user_group|AGENTS_A");
		$owner = Std::parseInt(model_Clients_9($this, $eF, $editTables, $fieldNames, $keys, $optionsMap, $p1, $param, $phValues1, $sb1, $tableFields, $tableNames, $ti, $typeMap, $userMap));
		haxe_Log::trace($owner, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 237, "className" => "model.Clients", "methodName" => "edit")));
		$this->data->userMap = _hx_deref(new model_Users(null))->get_info(null);
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
		haxe_Log::trace($cFields->length, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 255, "className" => "model.Clients", "methodName" => "getCustomFields")));
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
	public function getRecordings($lead_id) {
		$records = null;
		{
			$a = $this->query("SELECT location ,  start_time, length_in_sec FROM recording_log WHERE lead_id = " . Std::string($lead_id) . " ORDER BY start_time DESC");
			$records = new _hx_array($a);
		}
		$rc = $this->num_rows;
		haxe_Log::trace("" . _hx_string_rec($rc, "") . " == " . _hx_string_rec($records->length, ""), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 311, "className" => "model.Clients", "methodName" => "getRecordings")));
		return php_Lib::toPhpArray($records->filter(array(new _hx_lambda(array(&$lead_id, &$rc, &$records), "model_Clients_10"), 'execute')));
	}
	public function save($q) {
		$lead_id = Std::parseInt($q->get("lead_id"));
		$user = S::$user;
		$newStatus = $q->get("status");
		$res = S::$my->query("INSERT INTO vicidial_lead_log SELECT * FROM (SELECT NULL AS log_id," . _hx_string_rec($lead_id, "") . " AS lead_id,NOW() AS entry_date) AS ll JOIN (SELECT modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,\"" . _hx_string_or_null($newStatus) . "\",comments,called_count,last_local_call_time,rank,owner,entry_list_id," . _hx_string_or_null($user) . " AS log_user FROM `vicidial_list`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS vl", null);
		$log_id = S::$my->insert_id;
		if(Util::any2bool($res) && $log_id > 0) {
			$cTable = "custom_" . Std::string($q->get("entry_list_id"));
			if($this->checkOrCreateCustomTable($cTable, null)) {
				$cLogTable = _hx_string_or_null($cTable) . "_log";
				$res = S::$my->query("INSERT INTO " . _hx_string_or_null($cLogTable) . " SELECT * FROM (SELECT " . _hx_string_rec($log_id, "") . " AS log_id) AS ll JOIN (SELECT * FROM `" . _hx_string_or_null($cTable) . "`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS cl", null);
				haxe_Log::trace("INSERT INTO " . _hx_string_or_null($cLogTable) . " ..." . _hx_string_or_null(S::$my->error) . "<", _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 337, "className" => "model.Clients", "methodName" => "save")));
				if(S::$my->error === "") {
					$primary_id = S::$my->real_escape_string($q->get("primary_id"));
					$sql = new StringBuf();
					$sql->add("UPDATE " . _hx_string_or_null($cTable) . " SET ");
					$cFields = S::tableFields("" . _hx_string_or_null($cTable), null);
					haxe_Log::trace("" . _hx_string_or_null($cTable) . " fields:" . _hx_string_or_null($cFields->toString()), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 345, "className" => "model.Clients", "methodName" => "save")));
					$cFields->remove("lead_id");
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
							$val = $q->get(model_Clients::$custom_fields_map->get($c));
							haxe_Log::trace(_hx_string_or_null($c) . ":" . Std::string($val), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 356, "className" => "model.Clients", "methodName" => "save")));
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
					$customFields2Save = false;
					$success = false;
					$stmt = S::$my->stmt_init();
					if($sets->length > 0) {
						$customFields2Save = true;
						$sql->add($sets->join(","));
						$sql->add(" WHERE lead_id=" . _hx_string_rec($lead_id, ""));
						haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 374, "className" => "model.Clients", "methodName" => "save")));
						$success = $stmt->prepare($sql->b);
					} else {
						$success = true;
					}
					if(!$success) {
						haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 380, "className" => "model.Clients", "methodName" => "save")));
						return false;
					}
					if($customFields2Save) {
						$success = myBindParam($stmt, $values2bind, $bindTypes);
					} else {
						$success = true;
					}
					if($success) {
						if($customFields2Save) {
							$success = $stmt->execute();
							if(!$success) {
								haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 397, "className" => "model.Clients", "methodName" => "save")));
								return false;
							}
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
						haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 457, "className" => "model.Clients", "methodName" => "save")));
						$success1 = $stmt1->prepare($sql->b);
						if(!$success1) {
							haxe_Log::trace($stmt1->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 461, "className" => "model.Clients", "methodName" => "save")));
							return false;
						}
						$success1 = myBindParam($stmt1, $values2bind, $bindTypes);
						haxe_Log::trace("success:" . Std::string($success1), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 467, "className" => "model.Clients", "methodName" => "save")));
						if($success1) {
							$success1 = $stmt1->execute();
							if(!$success1) {
								haxe_Log::trace($stmt1->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 473, "className" => "model.Clients", "methodName" => "save")));
								return false;
							}
							return $this->saveClientData($q);
						}
						return false;
					}
				} else {
					haxe_Log::trace("oops:" . _hx_string_or_null(S::$my->error), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 483, "className" => "model.Clients", "methodName" => "save")));
				}
			}
		}
		return false;
	}
	public function saveClientData($q) {
		$clientID = $q->get("client_id");
		$user = S::$user;
		if($clientID === null) {
			return true;
		}
		$res = S::$my->query("INSERT INTO fly_crm.client_log SELECT client_id,lead_id,creation_date,state,pay_obligation,use_email,register_on,register_off,register_off_to,teilnahme_beginn,title,namenszusatz,co_field,storno_grund,birth_date," . _hx_string_or_null($user) . " AS log_user,NULL AS log_date FROM fly_crm.clients WHERE client_id=" . Std::string($clientID), null);
		if(!Util::any2bool($res)) {
			haxe_Log::trace("failed to: INSERT INTO fly_crm.client_log SELECT client_id,lead_id,creation_date,state,pay_obligation,use_email,register_on,register_off,register_off_to,teilnahme_beginn,title,namenszusatz,co_field,storno_grund,birth_date," . _hx_string_or_null($user) . " AS log_user,NULL AS log_date FROM fly_crm.clients WHERE client_id=" . Std::string($clientID), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 500, "className" => "model.Clients", "methodName" => "saveClientData")));
			return false;
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
		haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 531, "className" => "model.Clients", "methodName" => "saveClientData")));
		$success = $stmt->prepare($sql->b);
		if(!$success) {
			haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 535, "className" => "model.Clients", "methodName" => "saveClientData")));
			return false;
		}
		haxe_Log::trace($values2bind, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 539, "className" => "model.Clients", "methodName" => "saveClientData")));
		$success = myBindParam($stmt, $values2bind, $bindTypes);
		haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 541, "className" => "model.Clients", "methodName" => "saveClientData")));
		if($success) {
			$success = $stmt->execute();
			if(!$success) {
				haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 547, "className" => "model.Clients", "methodName" => "saveClientData")));
				return false;
			}
			return true;
		}
		return false;
	}
	public function save_pay_plan($q) {
		$product = php_Lib::hashOfAssociativeArray($q->get("product"));
		$user = S::$user;
		haxe_Log::trace(Std::string($product) . ":" . Std::string(model_Clients_11($this, $product, $q, $user)), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 561, "className" => "model.Clients", "methodName" => "save_pay_plan")));
		$pIt = $product->keys();
		while($pIt->hasNext()) {
			$pay_plan_id = $pIt->next();
			$res = S::$my->query("INSERT INTO fly_crm.pay_plan_log SELECT pay_plan_id,client_id,creation_date,pay_source_id,target_id,start_day,start_date,buchungs_tag,cycle,amount,product,agent,pay_plan_state,pay_method,end_date,end_reason," . _hx_string_or_null($user) . " AS log_user,NOW() AS log_date FROM fly_crm.pay_plan WHERE pay_plan_id=" . _hx_string_or_null($pay_plan_id), null);
			if(!Util::any2bool($res)) {
				haxe_Log::trace("Failed to:  INSERT INTO fly_crm.pay_plan_log SELECT pay_plan_id,client_id,creation_date,pay_source_id,target_id,start_day,start_date,buchungs_tag,cycle,amount,product,agent,pay_plan_state,pay_method,end_date,end_reason," . _hx_string_or_null($user) . " AS log_user,NOW() AS log_date FROM fly_crm.pay_plan WHERE pay_plan_id=" . _hx_string_or_null($pay_plan_id), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 572, "className" => "model.Clients", "methodName" => "save_pay_plan")));
				return false;
			}
			$sql = new StringBuf();
			$uFields = model_Clients::$pay_plan_fields;
			$uFields->remove("pay_plan_id");
			$bindTypes = "";
			$values2bind = null;
			$i = 0;
			$dbFieldTypes = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbFieldTypes")));
			$sets = new _hx_array(array());
			$sql->add("UPDATE fly_crm.pay_plan SET ");
			{
				$_g = 0;
				while($_g < $uFields->length) {
					$c = $uFields[$_g];
					++$_g;
					haxe_Log::trace(_hx_string_or_null($c) . ":" . Std::string(Type::typeof($q->get($c))), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 586, "className" => "model.Clients", "methodName" => "save_pay_plan")));
					$p = $q->get($c);
					$val = null;
					if($p !== null) {
						if(!Std::is($p, _hx_qtype("String"))) {
							$valMap = php_Lib::hashOfAssociativeArray($q->get($c));
							$val = $valMap->get($pay_plan_id);
							unset($valMap);
						} else {
							$val = $p;
						}
						$values2bind[$i++] = $val;
						$type = $dbFieldTypes->get($c);
						if(Util::any2bool($type)) {
							$bindTypes .= _hx_string_or_null($type);
						} else {
							$bindTypes .= "s";
						}
						$sets->push(_hx_string_or_null($c) . "=?");
						unset($type);
					}
					unset($val,$p,$c);
				}
				unset($_g);
			}
			if($sets->length === 0) {
				continue;
			}
			$sql->add($sets->join(","));
			$sql->add(" WHERE pay_plan_id=" . _hx_string_or_null($pay_plan_id));
			$stmt = S::$my->stmt_init();
			haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 614, "className" => "model.Clients", "methodName" => "save_pay_plan")));
			$success = $stmt->prepare($sql->b);
			if(!$success) {
				haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 618, "className" => "model.Clients", "methodName" => "save_pay_plan")));
				return false;
			}
			haxe_Log::trace($values2bind, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 622, "className" => "model.Clients", "methodName" => "save_pay_plan")));
			$success = myBindParam($stmt, $values2bind, $bindTypes);
			haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 624, "className" => "model.Clients", "methodName" => "save_pay_plan")));
			if($success) {
				$success = $stmt->execute();
				if(!$success) {
					haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 630, "className" => "model.Clients", "methodName" => "save_pay_plan")));
					return false;
				}
				if(!$pIt->hasNext()) {
					return true;
				}
			}
			unset($values2bind,$uFields,$success,$stmt,$sql,$sets,$res,$pay_plan_id,$i,$dbFieldTypes,$bindTypes);
		}
		return false;
	}
	public function save_pay_source($q) {
		$account = php_Lib::hashOfAssociativeArray($q->get("account"));
		haxe_Log::trace(Std::string($account) . ":" . Std::string(model_Clients_12($this, $account, $q)), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 645, "className" => "model.Clients", "methodName" => "save_pay_source")));
		$pIt = $account->keys();
		$user = S::$user;
		while($pIt->hasNext()) {
			$pay_source_id = $pIt->next();
			$res = S::$my->query("INSERT INTO fly_crm.pay_source_log SELECT  pay_source_id,client_id,lead_id,debtor,bank_name,account,blz,iban,sign_date,pay_source_state,creation_date," . _hx_string_or_null($user) . " AS log_user,NOW() AS log_date FROM fly_crm.pay_source WHERE pay_source_id=" . _hx_string_or_null($pay_source_id), null);
			if(!Util::any2bool($res)) {
				haxe_Log::trace("Failed to:  INSERT INTO fly_crm.pay_source_log SELECT pay_source_id,client_id,lead_id,debtor,bank_name,account,blz,iban,sign_date,pay_source_state,creation_date," . _hx_string_or_null($user) . " AS log_user,NOW() AS log_date FROM fly_crm.pay_source WHERE pay_source_id=" . _hx_string_or_null($pay_source_id), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 657, "className" => "model.Clients", "methodName" => "save_pay_source")));
				return false;
			}
			$sql = new StringBuf();
			$uFields = model_Clients::$pay_source_fields;
			$uFields->remove("pay_source_id");
			$bindTypes = "";
			$values2bind = null;
			$i = 0;
			$dbFieldTypes = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbFieldTypes")));
			$sets = new _hx_array(array());
			$sql->add("UPDATE fly_crm.pay_source SET ");
			{
				$_g = 0;
				while($_g < $uFields->length) {
					$c = $uFields[$_g];
					++$_g;
					haxe_Log::trace(_hx_string_or_null($c) . ":" . Std::string(Type::typeof($q->get($c))), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 671, "className" => "model.Clients", "methodName" => "save_pay_source")));
					$p = $q->get($c);
					$val = null;
					if($p !== null) {
						if(!Std::is($p, _hx_qtype("String"))) {
							$valMap = php_Lib::hashOfAssociativeArray($q->get($c));
							$val = $valMap->get($pay_source_id);
							unset($valMap);
						} else {
							$val = $p;
						}
						$values2bind[$i++] = $val;
						$type = $dbFieldTypes->get($c);
						if(Util::any2bool($type)) {
							$bindTypes .= _hx_string_or_null($type);
						} else {
							$bindTypes .= "s";
						}
						$sets->push(_hx_string_or_null($c) . "=?");
						unset($type);
					}
					unset($val,$p,$c);
				}
				unset($_g);
			}
			if($sets->length === 0) {
				continue;
			}
			$sql->add($sets->join(","));
			$sql->add(" WHERE pay_source_id=" . _hx_string_or_null($pay_source_id));
			$stmt = S::$my->stmt_init();
			haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 699, "className" => "model.Clients", "methodName" => "save_pay_source")));
			$success = $stmt->prepare($sql->b);
			if(!$success) {
				haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 703, "className" => "model.Clients", "methodName" => "save_pay_source")));
				return false;
			}
			haxe_Log::trace($values2bind, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 707, "className" => "model.Clients", "methodName" => "save_pay_source")));
			$success = myBindParam($stmt, $values2bind, $bindTypes);
			haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 709, "className" => "model.Clients", "methodName" => "save_pay_source")));
			if($success) {
				$success = $stmt->execute();
				if(!$success) {
					haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 715, "className" => "model.Clients", "methodName" => "save_pay_source")));
					return false;
				}
				if(!$pIt->hasNext()) {
					return true;
				}
			}
			unset($values2bind,$uFields,$success,$stmt,$sql,$sets,$res,$pay_source_id,$i,$dbFieldTypes,$bindTypes);
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
			haxe_Log::trace("CREATE TABLE `" . _hx_string_or_null($newTable) . "` like `" . _hx_string_or_null($srcTable) . "`", _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 732, "className" => "model.Clients", "methodName" => "checkOrCreateCustomTable")));
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
			haxe_Log::trace("num_rows:" . _hx_string_rec($res->num_rows, ""), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 743, "className" => "model.Clients", "methodName" => "checkOrCreateCustomTable")));
		}
		return true;
	}
	static $vicdial_list_fields;
	static $clients_fields;
	static $pay_source_fields;
	static $pay_plan_fields;
	static $custom_fields_map;
	static function create($param) {
		$self = new model_Clients($param);
		$self->table = "vicidial_list";
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.Clients'; }
}
model_Clients::$vicdial_list_fields = _hx_explode(",", "lead_id,entry_date,modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id");
model_Clients::$clients_fields = _hx_explode(",", "client_id,lead_id,creation_date,state,use_email,register_on,register_off,register_off_to,teilnahme_beginn,title,namenszusatz,co_field,storno_grund,birth_date");
model_Clients::$pay_source_fields = _hx_explode(",", "pay_source_id,client_id,lead_id,debtor,bank_name,account,blz,iban,sign_date,pay_source_state,creation_date");
model_Clients::$pay_plan_fields = _hx_explode(",", "pay_plan_id,client_id,creation_date,pay_source_id,target_id,start_day,start_date,buchungs_tag,cycle,amount,product,agent,pay_plan_state,pay_method,end_date,end_reason");
model_Clients::$custom_fields_map = model_Clients_13();
function model_Clients_0(&$fields, &$phValues, &$q, &$sb, $f) {
	{
		return S::$my->real_escape_string($f);
	}
}
function model_Clients_1(&$fields, &$filterTables, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb, $f1) {
	{
		return "fly_crm." . _hx_string_or_null(S::$my->real_escape_string($f1));
	}
}
function model_Clients_2(&$fields, &$filterTables, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb, &$where, $f2) {
	{
		return "fly_crm." . _hx_string_or_null(S::$my->real_escape_string($f2));
	}
}
function model_Clients_3(&$fields, &$filterTables, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb, &$where, $f3) {
	{
		return "AND " . _hx_string_or_null($f3) . ".client_id=vicidial_list.vendor_lead_code";
	}
}
function model_Clients_4(&$fields, &$filterTables, &$joinCond, &$joinTable, &$phValues, &$q, &$qTable, &$sb, &$where, $f4) {
	{
		return "AND " . _hx_string_or_null($f4) . ".client_id=clients.client_id";
	}
}
function model_Clients_5(&$aFields, &$eF, &$fieldNames, &$k, &$keys, &$optionsMap, &$param, &$tableFields, &$tableNames, &$typeMap, $field) {
	{
		return $field->get("field_label");
	}
}
function model_Clients_6(&$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap, $f1) {
	{
		if(_hx_index_of($f1, "vicidial_list.", null) !== 0) {
			return "vicidial_list." . _hx_string_or_null($f1);
		} else {
			return $f1;
		}
	}
}
function model_Clients_7(&$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap, $f2) {
	{
		return _hx_string_or_null($table) . "." . _hx_string_or_null($f2);
	}
}
function model_Clients_8(&$__hx__this, &$_g2, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p, &$param, &$phValues, &$sb, &$table, &$tableFields, &$tableNames, &$ti, &$typeMap) {
	if($table === "vicidial_list") {
		return $table;
	} else {
		return "fly_crm." . _hx_string_or_null($table);
	}
}
function model_Clients_9(&$__hx__this, &$eF, &$editTables, &$fieldNames, &$keys, &$optionsMap, &$p1, &$param, &$phValues1, &$sb1, &$tableFields, &$tableNames, &$ti, &$typeMap, &$userMap) {
	{
		$this1 = php_Lib::hashOfAssociativeArray($editTables->get("clients")->get("0"));
		return $this1->get("owner");
	}
}
function model_Clients_10(&$lead_id, &$rc, &$records, $r) {
	{
		return php_Lib::objectOfAssociativeArray($r)->length_in_sec > 60;
	}
}
function model_Clients_11(&$__hx__this, &$product, &$q, &$user) {
	{
		$_e = $product;
		return array(new _hx_lambda(array(&$_e, &$product, &$q, &$user), "model_Clients_14"), 'execute');
	}
}
function model_Clients_12(&$__hx__this, &$account, &$q) {
	{
		$_e = $account;
		return array(new _hx_lambda(array(&$_e, &$account, &$q), "model_Clients_15"), 'execute');
	}
}
function model_Clients_13() {
	{
		$_g = new haxe_ds_StringMap();
		$_g->set("title", "anrede");
		$_g->set("co_field", "addresszusatz");
		$_g->set("geburts_datum", "birth_date");
		return $_g;
	}
}
function model_Clients_14(&$_e, &$product, &$q, &$user, $pred) {
	{
		return Lambda::count($_e, $pred);
	}
}
function model_Clients_15(&$_e, &$account, &$q, $pred) {
	{
		return Lambda::count($_e, $pred);
	}
}
