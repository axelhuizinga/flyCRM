<?php

class model_QC extends model_Clients {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function edit($param) {
		$entry_list_id = $param->get("entry_list_id");
		$cF = $this->getCustomFields($entry_list_id);
		$cFields = $cF->map(array(new _hx_lambda(array(&$cF, &$entry_list_id, &$param), "model_QC_0"), 'execute'));
		haxe_Log::trace($cFields, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 38, "className" => "model.QC", "methodName" => "edit")));
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
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 57, "className" => "model.QC", "methodName" => "edit")));
		$this->data = _hx_anonymous(array("fieldNames" => php_Lib::associativeArrayOfHash($fieldNames), "rows" => $this->doSelectCustom($param, $sb, $phValues), "typeMap" => php_Lib::associativeArrayOfHash($typeMap), "optionsMap" => php_Lib::associativeArrayOfHash($optionsMap), "recordings" => $this->getRecordings(Std::parseInt($param->get("lead_id")))));
		$userMap = new haxe_ds_StringMap();
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$param = new haxe_ds_StringMap();
		$param->set("table", "vicidial_users");
		$param->set("fields", "user,full_name");
		$param->set("where", "active|Y");
		$this->data->userMap = $this->doSelect($param, $sb, $phValues);
		return $this->json_encode();
	}
	public function find($param) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$count = $this->countJoin($param, $sb, $phValues);
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace("count:" . _hx_string_rec($count, "") . ":" . _hx_string_or_null($param->get("page")) . ": " . _hx_string_or_null(((($param->exists("page")) ? "Y" : "N"))), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 84, "className" => "model.QC", "methodName" => "find")));
		$this->data = _hx_anonymous(array("count" => $count, "page" => (($param->exists("page")) ? Std::parseInt($param->get("page")) : 1), "rows" => $this->doJoin($param, $sb, $phValues)));
		return $this->json_encode();
	}
	public function doSelectCustom($q, $sb, $phValues) {
		$fields = $q->get("fields");
		$sb->add("SELECT " . _hx_string_or_null(((($fields !== null) ? $this->fieldFormat($fields->map(array(new _hx_lambda(array(&$fields, &$phValues, &$q, &$sb), "model_QC_1"), 'execute'))->join(",")) : "*"))));
		$entry_list_id = $q->get("entry_list_id");
		$primary_id = S::$my->real_escape_string($q->get("primary_id"));
		$sb->add(" FROM " . _hx_string_or_null(S::$my->real_escape_string($this->table)) . " AS vl INNER JOIN " . _hx_string_or_null(S::$my->real_escape_string("custom_" . _hx_string_or_null($entry_list_id))) . " AS cu ON vl." . _hx_string_or_null($primary_id) . "=cu." . _hx_string_or_null($primary_id));
		$this->buildCond("vl." . _hx_string_or_null($primary_id) . "|" . _hx_string_or_null(S::$my->real_escape_string($q->get($q->get("primary_id")))), $sb, $phValues);
		haxe_Log::trace($phValues, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 101, "className" => "model.QC", "methodName" => "doSelectCustom")));
		haxe_Log::trace($sb->b, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 102, "className" => "model.QC", "methodName" => "doSelectCustom")));
		return $this->execute($sb->b, $q, $phValues);
		return null;
	}
	public function save($q) {
		$lead_id = Std::parseInt($q->get("lead_id"));
		$res = S::$my->query("INSERT INTO vicidial_lead_log SELECT * FROM (SELECT NULL AS log_id," . _hx_string_rec($lead_id, "") . " AS lead_id,NOW() AS entry_date) AS ll JOIN (SELECT modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id FROM `vicidial_list`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS vl", null);
		$log_id = S::$my->insert_id;
		if($log_id > 0) {
			$cTable = "custom_" . Std::string($q->get("entry_list_id"));
			haxe_Log::trace(_hx_string_or_null($cTable) . " log_id:" . _hx_string_rec($log_id, ""), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 118, "className" => "model.QC", "methodName" => "save")));
			if($this->checkOrCreateCustomTable($cTable, null)) {
				$cLogTable = _hx_string_or_null($cTable) . "_log";
				$res = S::$my->query("INSERT INTO " . _hx_string_or_null($cLogTable) . " SELECT * FROM (SELECT " . _hx_string_rec($log_id, "") . " AS log_id) AS ll JOIN (SELECT * FROM `" . _hx_string_or_null($cTable) . "`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS cl", null);
				haxe_Log::trace("INSERT INTO " . _hx_string_or_null($cLogTable) . " ..." . _hx_string_or_null(S::$my->error) . "<", _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 125, "className" => "model.QC", "methodName" => "save")));
				if(S::$my->error === "") {
					$primary_id = S::$my->real_escape_string($q->get("primary_id"));
					$sql = new StringBuf();
					$sql->add("UPDATE " . _hx_string_or_null($cTable) . " SET ");
					$cFields = S::tableFields("" . _hx_string_or_null($cTable), null);
					haxe_Log::trace("" . _hx_string_or_null($cTable) . " fields:" . _hx_string_or_null($cFields->toString()), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 133, "className" => "model.QC", "methodName" => "save")));
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
					haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 155, "className" => "model.QC", "methodName" => "save")));
					$success = $stmt->prepare($sql->b);
					if(!$success) {
						haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 159, "className" => "model.QC", "methodName" => "save")));
						return false;
					}
					$success = myBindParam($stmt, $values2bind, $bindTypes);
					haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 163, "className" => "model.QC", "methodName" => "save")));
					if($success) {
						$success = $stmt->execute();
						if(!$success) {
							haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 169, "className" => "model.QC", "methodName" => "save")));
							return false;
						}
						$sql = new StringBuf();
						$uFields = model_QC::$vicdial_list_fields;
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
						$values2bind[$i++] = S::$user;
						$bindTypes .= "s";
						$sets->push("security_phrase=?");
						if(_hx_equal($q->get("status"), "MITGL")) {
							$list_id = 10000;
							$mID = Std::parseInt($q->get("vendor_lead_code"));
							if($mID === null) {
								$mID = S::newMemberID();
								$values2bind[$i++] = $mID;
								$bindTypes .= "s";
								$sets->push("vendor_lead_code=?");
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
							$values2bind[$i++] = $q->get("user");
							$bindTypes .= "s";
							$sets->push("owner=?");
						}
						$sql->add($sets->join(","));
						$sql->add(" WHERE lead_id=" . _hx_string_rec($lead_id, ""));
						$stmt1 = S::$my->stmt_init();
						haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 224, "className" => "model.QC", "methodName" => "save")));
						$success1 = $stmt1->prepare($sql->b);
						if(!$success1) {
							haxe_Log::trace($stmt1->error, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 228, "className" => "model.QC", "methodName" => "save")));
							return false;
						}
						$success1 = myBindParam($stmt1, $values2bind, $bindTypes);
						haxe_Log::trace("success:" . Std::string($success1), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 232, "className" => "model.QC", "methodName" => "save")));
						if($success1) {
							$success1 = $stmt1->execute();
							if(!$success1) {
								haxe_Log::trace($stmt1->error, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 238, "className" => "model.QC", "methodName" => "save")));
								return false;
							}
							return true;
						}
						return false;
					}
				} else {
					haxe_Log::trace("oops", _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 248, "className" => "model.QC", "methodName" => "save")));
				}
			}
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
			haxe_Log::trace("CREATE TABLE `" . _hx_string_or_null($newTable) . "` like `" . _hx_string_or_null($srcTable) . "`", _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 262, "className" => "model.QC", "methodName" => "checkOrCreateCustomTable")));
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
			haxe_Log::trace("num_rows:" . _hx_string_rec($res->num_rows, ""), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 273, "className" => "model.QC", "methodName" => "checkOrCreateCustomTable")));
		}
		return true;
	}
	static $vicdial_list_fields;
	static function create($param) {
		$self = new model_QC();
		$self->table = "vicidial_list";
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 29, "className" => "model.QC", "methodName" => "create")));
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.QC'; }
}
model_QC::$vicdial_list_fields = _hx_explode(",", "lead_id,entry_date,modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id");
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
