<?php

class model_QC extends model_Clients {
	public function __construct($param = null) { if(!php_Boot::$skip_constructor) {
		parent::__construct($param);
	}}
	public function edit($param) {
		$entry_list_id = $param->get("entry_list_id");
		$cF = $this->getCustomFields($entry_list_id);
		$cFields = $cF->map(array(new _hx_lambda(array(&$cF, &$entry_list_id, &$param), "model_QC_0"), 'execute'));
		haxe_Log::trace($cFields, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 38, "className" => "model.QC", "methodName" => "edit")));
		$fieldDefault = new haxe_ds_StringMap();
		$fieldNames = new haxe_ds_StringMap();
		$fieldRequired = new haxe_ds_StringMap();
		$typeMap = new haxe_ds_StringMap();
		$optionsMap = new haxe_ds_StringMap();
		$eF = $this->getEditorFields(null)->get("vicidial_list");
		{
			$_g = 0;
			while($_g < $eF->length) {
				$f = $eF[$_g];
				++$_g;
				$fieldNames->set($f->get("field_label"), $f->get("field_name"));
				if($f->get("field_options") !== null) {
					$optionsMap->set($f->get("field_label"), $f->get("field_options"));
				}
				$typeMap->set($f->get("field_label"), $f->get("field_type"));
				unset($f);
			}
		}
		{
			$_g1 = 0;
			$_g2 = $cFields->length;
			while($_g1 < $_g2) {
				$f1 = $_g1++;
				$fieldNames->set($cFields[$f1], _hx_array_get($cF, $f1)->get("field_name"));
				if(_hx_array_get($cF, $f1)->get("field_options") !== null) {
					$optionsMap->set($cFields[$f1], _hx_array_get($cF, $f1)->get("field_options"));
				}
				$def = _hx_array_get($cF, $f1)->get("field_default");
				if($def === null) {} else {
					switch($def) {
					case "NULL":case "":{}break;
					default:{
						$fieldDefault->set($cFields[$f1], _hx_array_get($cF, $f1)->get("field_default"));
					}break;
					}
				}
				if(_hx_array_get($cF, $f1)->get("field_required") === "Y") {
					$fieldRequired->set($cFields[$f1], true);
				}
				$typeMap->set($cFields[$f1], _hx_array_get($cF, $f1)->get("field_type"));
				unset($f1,$def);
			}
		}
		$param->set("fields", $cFields);
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$this->data = _hx_anonymous(array("fieldDefault" => php_Lib::associativeArrayOfHash($fieldDefault), "fieldNames" => php_Lib::associativeArrayOfHash($fieldNames), "fieldRequired" => php_Lib::associativeArrayOfHash($fieldRequired), "rows" => $this->doSelectCustom($param, $sb, $phValues), "typeMap" => php_Lib::associativeArrayOfHash($typeMap), "optionsMap" => php_Lib::associativeArrayOfHash($optionsMap), "recordings" => $this->getRecordings(Std::parseInt($param->get("lead_id")))));
		$userMap = new haxe_ds_StringMap();
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$p = new haxe_ds_StringMap();
		$p->set("table", "vicidial_users");
		$p->set("fields", "user,full_name");
		$p->set("where", "user_group|AGENTS_A");
		haxe_Log::trace(_hx_string_rec($this->num_rows, "") . ":" . Std::string($param->get("owner")), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 106, "className" => "model.QC", "methodName" => "edit")));
		$this->data->userMap = _hx_deref(new model_Users(null))->get_info(null);
		return $this->json_encode();
	}
	public function find($param) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$count = $this->countJoin($param, $sb, $phValues);
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 118, "className" => "model.QC", "methodName" => "find")));
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace("count:" . _hx_string_rec($count, "") . ":" . _hx_string_or_null($param->get("page")) . ": " . _hx_string_or_null(((($param->exists("page")) ? "Y" : "N"))), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 121, "className" => "model.QC", "methodName" => "find")));
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
		return $this->execute($sb->b, $q, $phValues);
		return null;
	}
	public function save($q) {
		$lead_id = Std::parseInt($q->get("lead_id"));
		$user = S::$user;
		$res = S::$my->query("INSERT INTO vicidial_lead_log SELECT * FROM (SELECT NULL AS log_id," . _hx_string_rec($lead_id, "") . " AS lead_id,NOW() AS entry_date) AS ll JOIN (SELECT modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id," . _hx_string_or_null($user) . " AS log_user FROM `vicidial_list`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS vl", null);
		$log_id = S::$my->insert_id;
		if($log_id > 0) {
			$cTable = "custom_" . Std::string($q->get("entry_list_id"));
			haxe_Log::trace(_hx_string_or_null($cTable) . " log_id:" . _hx_string_rec($log_id, ""), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 158, "className" => "model.QC", "methodName" => "save")));
			if($this->checkOrCreateCustomTable($cTable, null)) {
				$cLogTable = _hx_string_or_null($cTable) . "_log";
				$res = S::$my->query("INSERT INTO " . _hx_string_or_null($cLogTable) . " SELECT * FROM (SELECT " . _hx_string_rec($log_id, "") . " AS log_id) AS ll JOIN (SELECT * FROM `" . _hx_string_or_null($cTable) . "`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS cl", null);
				haxe_Log::trace("INSERT INTO " . _hx_string_or_null($cLogTable) . " SELECT * FROM (SELECT " . _hx_string_rec($log_id, "") . " AS log_id) AS ll JOIN (SELECT * FROM `" . _hx_string_or_null($cTable) . "`WHERE `lead_id`=" . _hx_string_rec($lead_id, "") . ")AS cl " . _hx_string_or_null(S::$my->error) . "<", _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 165, "className" => "model.QC", "methodName" => "save")));
				if(S::$my->error === "") {
					$primary_id = S::$my->real_escape_string($q->get("primary_id"));
					$sql = new StringBuf();
					$sql->add("UPDATE " . _hx_string_or_null($cTable) . " SET ");
					$cFields = S::tableFields("" . _hx_string_or_null($cTable), null);
					haxe_Log::trace("" . _hx_string_or_null($cTable) . " fields:" . _hx_string_or_null($cFields->toString()), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 173, "className" => "model.QC", "methodName" => "save")));
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
					haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 195, "className" => "model.QC", "methodName" => "save")));
					$success = $stmt->prepare($sql->b);
					if(!$success) {
						haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 199, "className" => "model.QC", "methodName" => "save")));
						return false;
					}
					$success = myBindParam($stmt, $values2bind, $bindTypes);
					haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 203, "className" => "model.QC", "methodName" => "save")));
					if($success) {
						$success = $stmt->execute();
						if(!$success) {
							haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 209, "className" => "model.QC", "methodName" => "save")));
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
						$sets->push("province=?");
						$values2bind[$i++] = "XXX";
						$bindTypes .= "s";
						$sets->push("security_phrase=?");
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
						haxe_Log::trace($sql->b, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 273, "className" => "model.QC", "methodName" => "save")));
						$success1 = $stmt1->prepare($sql->b);
						if(!$success1) {
							haxe_Log::trace($stmt1->error, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 277, "className" => "model.QC", "methodName" => "save")));
							return false;
						}
						$success1 = myBindParam($stmt1, $values2bind, $bindTypes);
						haxe_Log::trace("success:" . Std::string($success1), _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 283, "className" => "model.QC", "methodName" => "save")));
						if($success1) {
							$success1 = $stmt1->execute();
							if(!$success1) {
								haxe_Log::trace($stmt1->error, _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 289, "className" => "model.QC", "methodName" => "save")));
								return false;
							}
							return true;
						}
						return false;
					}
				} else {
					haxe_Log::trace("oops", _hx_anonymous(array("fileName" => "QC.hx", "lineNumber" => 299, "className" => "model.QC", "methodName" => "save")));
				}
			}
		}
		return false;
	}
	static $vicdial_list_fields;
	static function create($param) {
		$self = new model_QC($param);
		$self->table = "vicidial_list";
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
