<?php

// Generated by Haxe 3.4.0
class model_ClientHistory extends model_Clients {
	public function __construct($param = null) { if(!php_Boot::$skip_constructor) {
		parent::__construct($param);
	}}
	public function addCond($where, $phValues) {
		if($where->length === 0) {
			return "";
		}
		$sb = new StringBuf();
		$first = true;
		{
			$_g = 0;
			while($_g < $where->length) {
				$w = $where[$_g];
				$_g = $_g + 1;
				$wData = _hx_string_call($w, "split", array("|"));
				$values = $wData->slice(2, null);
				$filter_tables = null;
				$tmp = null;
				$tmp1 = null;
				$v = $this->param;
				$tmp2 = null;
				$tmp3 = null;
				if($v !== null) {
					$tmp3 = !_hx_equal($v, 0);
				} else {
					$tmp3 = false;
				}
				if($tmp3) {
					$tmp2 = !_hx_equal($v, "");
				} else {
					$tmp2 = false;
				}
				if($tmp2) {
					$tmp1 = $this->param->exists("filter_tables");
				} else {
					$tmp1 = false;
				}
				if($tmp1) {
					$v1 = $this->param->get("filter_tables");
					$tmp4 = null;
					if($v1 !== null) {
						$tmp4 = !_hx_equal($v1, 0);
					} else {
						$tmp4 = false;
					}
					if($tmp4) {
						$tmp = !_hx_equal($v1, "");
					} else {
						$tmp = false;
					}
					unset($v1,$tmp4);
				} else {
					$tmp = false;
				}
				if($tmp) {
					$jt = $this->param->get("filter_tables");
					$filter_tables = _hx_explode(",", $jt);
					unset($jt);
				}
				$tmp5 = (property_exists("haxe_Log", "trace") ? haxe_Log::$trace: array("haxe_Log", "trace"));
				$tmp6 = Std::string($wData) . ":";
				$tmp7 = _hx_string_or_null($tmp6) . _hx_string_or_null($this->joinTable) . ":";
				$tmp8 = _hx_string_or_null($tmp7) . Std::string($filter_tables);
				call_user_func_array($tmp5, array($tmp8, _hx_anonymous(array("fileName" => "ClientHistory.hx", "lineNumber" => 53, "className" => "model.ClientHistory", "methodName" => "addCond"))));
				$tmp9 = null;
				$tmp10 = new EReg("^pay_[a-zA-Z_]+\\.", "");
				if($tmp10->match($wData[0])) {
					$tmp11 = _hx_array_get(_hx_explode(".", $wData[0]), 0);
					$tmp9 = $tmp11 !== $this->joinTable;
					unset($tmp11);
				} else {
					$tmp9 = false;
				}
				if($tmp9) {
					continue;
				}
				if($first) {
					$sb->add(" WHERE ");
					$first = false;
				} else {
					$sb->add(" AND ");
				}
				{
					$_g1 = strtoupper($wData[1]);
					switch($_g1) {
					case "BETWEEN":{
						$tmp12 = null;
						if($values->length !== 2) {
							$tmp12 = Lambda::hforeach($values, array(new _hx_lambda(array(), "model_ClientHistory_0"), 'execute'));
						} else {
							$tmp12 = false;
						}
						if($tmp12) {
							S::hexit("BETWEEN needs 2 values - got only:" . _hx_string_or_null($values->join(",")));
						}
						$sb->add($this->quoteField($wData[0]));
						$sb->add(" BETWEEN ? AND ?");
						$phValues->push((new _hx_array(array($wData[0], $values[0]))));
						$phValues->push((new _hx_array(array($wData[0], $values[1]))));
					}break;
					case "IN":{
						$sb->add($this->quoteField($wData[0]));
						$sb->add(" IN(");
						$sb->add($values->map(array(new _hx_lambda(array(&$phValues, &$values, &$wData), "model_ClientHistory_1"), 'execute'))->join(","));
						$sb->add(")");
					}break;
					case "LIKE":{
						$sb->add($this->quoteField($wData[0]));
						$sb->add(" LIKE ?");
						$phValues->push((new _hx_array(array($wData[0], $wData[2]))));
					}break;
					default:{
						$sb->add($this->quoteField($wData[0]));
						$tmp15 = new EReg("^(<|>)", "");
						if($tmp15->match($wData[1])) {
							$eR = new EReg("^(<|>)", "");
							$eR->match($wData[1]);
							$val = Std::parseFloat($eR->matchedRight());
							$sb->add(_hx_string_or_null($eR->matched(0)) . "?");
							$phValues->push((new _hx_array(array($wData[0], $val))));
							continue 2;
						}
						if($wData[1] === "NULL") {
							$sb->add(" IS NULL");
						} else {
							$sb->add(" = ?");
							$phValues->push((new _hx_array(array($wData[0], $wData[1]))));
						}
					}break;
					}
					unset($_g1);
				}
				unset($wData,$w,$values,$v,$tmp9,$tmp8,$tmp7,$tmp6,$tmp5,$tmp3,$tmp2,$tmp10,$tmp1,$tmp,$filter_tables);
			}
		}
		return $sb->b;
	}
	public function findClient($param, $dataOnly = null) {
		$sql = new StringBuf();
		$phValues = new _hx_array(array());
		$cond = "";
		$limit = $param->get("limit");
		$tmp = null;
		$tmp1 = null;
		if($limit !== null) {
			$tmp1 = $limit !== 0;
		} else {
			$tmp1 = false;
		}
		if($tmp1) {
			$tmp = !_hx_equal($limit, "");
		} else {
			$tmp = false;
		}
		if(!$tmp) {
			$limit = _hx_array_get(S::$conf->get("sql"), "LIMIT");
			$tmp2 = null;
			$tmp3 = null;
			if($limit !== null) {
				$tmp3 = $limit !== 0;
			} else {
				$tmp3 = false;
			}
			if($tmp3) {
				$tmp2 = !_hx_equal($limit, "");
			} else {
				$tmp2 = false;
			}
			if(!$tmp2) {
				$limit = 15;
			}
		}
		$globalCond = "";
		$reasons = "";
		$where = $param->get("where");
		if(strlen($where) > 0) {
			$where1 = _hx_explode(",", $where);
			$whereElements = $where1->filter(array(new _hx_lambda(array(), "model_ClientHistory_2"), 'execute'));
			{
				$_g = 0;
				while($_g < $where1->length) {
					$w = $where1[$_g];
					$_g = $_g + 1;
					$wData = _hx_string_call($w, "split", array("|"));
					{
						$_g1 = $wData[0];
						if($_g1 === "reason") {
							$reasons = $wData->slice(1, null)->join(" ");
						}
						unset($_g1);
					}
					unset($wData,$w);
				}
			}
			if($whereElements->length > 0) {
				$globalCond = $this->addCond($whereElements, $phValues);
			}
		}
		$sql->add("SELECT SQL_CALC_FOUND_ROWS * FROM(");
		$first = true;
		if(_hx_index_of($reasons, "AC04", null) > -1) {
			if($first) {
				$first = false;
			}
			$sql->add("(SELECT d, e AS amount, SUBSTR(j,17,8) AS m_ID, z AS IBAN, \"AC04\" AS reason FROM `konto_auszug` WHERE i LIKE \"%AC04 KONTO AUFGELOEST%\" " . _hx_string_or_null($cond) . "  LIMIT 0,10000)");
			$sql->add("UNION ");
			$sql->add("(SELECT d, e AS amount, SUBSTR(k, 17, 8) AS m_ID, z AS IBAN, \"AC04\" AS reason FROM `konto_auszug` WHERE j LIKE \"%AC04 KONTO AUFGELOEST%\" " . _hx_string_or_null($cond) . "  LIMIT 0, 10000)");
		}
		if(_hx_index_of($reasons, "AC01", null) > -1) {
			if($first) {
				$first = false;
			} else {
				$sql->add("UNION ");
			}
			$sql->add("(SELECT d, e AS amount, SUBSTR(j,17,8) AS m_ID, z AS IBAN, \"AC01\" AS reason FROM `konto_auszug` WHERE i LIKE \"%AC01 IBAN FEHLERHAFT%\" " . _hx_string_or_null($cond) . "  LIMIT 0,10000)");
			$sql->add("UNION ");
			$sql->add("(SELECT d, e AS amount, SUBSTR(k, 17, 8) AS m_ID, z AS IBAN, \"AC01\" AS reason FROM `konto_auszug` WHERE j LIKE \"%AC01 IBAN FEHLERHAFT%\" " . _hx_string_or_null($cond) . "  LIMIT 0, 10000)");
		}
		if(_hx_index_of($reasons, "MD06", null) > -1) {
			if($first) {
				$first = false;
			} else {
				$sql->add("UNION ");
			}
			$sql->add("(SELECT d, e AS amount, SUBSTR(j,17,8) AS m_ID, z AS IBAN, \"MD06\" AS reason FROM `konto_auszug` WHERE i LIKE \"%MD06 WIDERSPRUCH DURCH ZAHLER%\" " . _hx_string_or_null($cond) . "  LIMIT 0,10000)");
			$sql->add("UNION ");
			$sql->add("(SELECT d, e AS amount, SUBSTR(k, 17, 8) AS m_ID, z AS IBAN, \"MD06\" AS reason FROM `konto_auszug` WHERE j LIKE \"%MD06 WIDERSPRUCH DURCH ZAHLER%\" " . _hx_string_or_null($cond) . "  LIMIT 0, 10000)");
		}
		if(_hx_index_of($reasons, "MS03", null) > -1) {
			if($first) {
				$first = false;
			} else {
				$sql->add("UNION ");
			}
			$sql->add("(SELECT d, e AS amount, SUBSTR(j,17,8) AS m_ID, z AS IBAN, \"MS03\" AS reason FROM `konto_auszug` WHERE i LIKE \"%MS03 SONSTIGE GRUENDE%\" " . _hx_string_or_null($cond) . "  LIMIT 0,10000)");
			$sql->add("UNION ");
			$sql->add("(SELECT d, e AS amount, SUBSTR(k, 17, 8) AS m_ID, z AS IBAN, \"MS03\" AS reason FROM `konto_auszug` WHERE j LIKE \"%MS03 SONSTIGE GRUENDE%\" " . _hx_string_or_null($cond) . "  LIMIT 0, 10000)");
		}
		$sql->add(" )_lim " . _hx_string_or_null($globalCond) . " LIMIT " . _hx_string_rec($limit, ""));
		S::$my->select_db("fly_crm");
		$rows = $this->execute($sql->b, $phValues);
		if($dataOnly) {
			return $rows;
		}
		$tmp4 = _hx_array_get($this->query("SELECT FOUND_ROWS()"), 0)["FOUND_ROWS()"];
		$tmp5 = null;
		if($param->exists("page")) {
			$tmp5 = Std::parseInt($param->get("page"));
		} else {
			$tmp5 = 1;
		}
		$this->data = _hx_anonymous(array("count" => $tmp4, "page" => $tmp5, "rows" => $rows));
		return $this->json_encode();
	}
	public function find($param) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "ClientHistory.hx", "lineNumber" => 228, "className" => "model.ClientHistory", "methodName" => "find")));
		$count = $this->countJoin($param, $sb, $phValues);
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$tmp = (property_exists("haxe_Log", "trace") ? haxe_Log::$trace: array("haxe_Log", "trace"));
		$tmp1 = _hx_string_or_null($param->get("joincond")) . " count:" . _hx_string_rec($count, "") . ":";
		$tmp2 = _hx_string_or_null($tmp1) . _hx_string_or_null($param->get("page")) . ": ";
		$tmp3 = null;
		if($param->exists("page")) {
			$tmp3 = "Y";
		} else {
			$tmp3 = "N";
		}
		call_user_func_array($tmp, array(_hx_string_or_null($tmp2) . _hx_string_or_null($tmp3), _hx_anonymous(array("fileName" => "ClientHistory.hx", "lineNumber" => 233, "className" => "model.ClientHistory", "methodName" => "find"))));
		$tmp4 = null;
		if($param->exists("page")) {
			$tmp4 = Std::parseInt($param->get("page"));
		} else {
			$tmp4 = 1;
		}
		$this->data = _hx_anonymous(array("count" => $count, "page" => $tmp4, "rows" => $this->doJoin($param, $sb, $phValues)));
		return $this->json_encode();
	}
	static $vicdial_list_fields;
	static $clients_fields;
	static $pay_source_fields;
	static $pay_plan_fields;
	static $custom_fields_map;
	static function create($param) {
		$self = new model_ClientHistory($param);
		$self->table = "vicidial_list";
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.ClientHistory'; }
}
model_ClientHistory::$vicdial_list_fields = _hx_explode(",", "lead_id,entry_date,modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id");
model_ClientHistory::$clients_fields = _hx_explode(",", "client_id,lead_id,creation_date,state,use_email,register_on,register_off,register_off_to,teilnahme_beginn,title,namenszusatz,co_field,storno_grund,birth_date");
model_ClientHistory::$pay_source_fields = _hx_explode(",", "pay_source_id,client_id,lead_id,debtor,bank_name,account,blz,iban,sign_date,pay_source_state,creation_date");
model_ClientHistory::$pay_plan_fields = _hx_explode(",", "pay_plan_id,client_id,creation_date,pay_source_id,target_id,start_day,start_date,buchungs_tag,cycle,amount,product,agent,pay_plan_state,pay_method,end_date,end_reason");
model_ClientHistory::$custom_fields_map = model_ClientHistory_3();
function model_ClientHistory_0($s) {
	{
		$tmp13 = null;
		if($s !== null) {
			$tmp13 = $s !== 0;
		} else {
			$tmp13 = false;
		}
		if($tmp13) {
			return $s !== "";
		} else {
			return false;
		}
	}
}
function model_ClientHistory_1(&$phValues, &$values, &$wData, $s1) {
	{
		$wData1 = $wData[0];
		$tmp14 = $values->shift();
		$phValues->push((new _hx_array(array($wData1, $tmp14))));
		return "?";
	}
}
function model_ClientHistory_2($el) {
	{
		return !_hx_equal(_hx_string_call($el, "indexOf", array("reason")), 0);
	}
}
function model_ClientHistory_3() {
	{
		$_g = new haxe_ds_StringMap();
		$_g->set("title", "anrede");
		$_g->set("geburts_datum", "birth_date");
		return $_g;
	}
}