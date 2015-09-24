<?php

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
				++$_g;
				$wData = _hx_string_call($w, "split", array("|"));
				$values = $wData->slice(2, null);
				$filter_tables = null;
				if(Util::any2bool($this->param) && $this->param->exists("filter_tables") && Util::any2bool($this->param->get("filter_tables"))) {
					$jt = $this->param->get("filter_tables");
					$filter_tables = _hx_explode(",", $jt);
					unset($jt);
				}
				haxe_Log::trace(Std::string($wData) . ":" . _hx_string_or_null($this->joinTable) . ":" . Std::string($filter_tables), _hx_anonymous(array("fileName" => "ClientHistory.hx", "lineNumber" => 53, "className" => "model.ClientHistory", "methodName" => "addCond")));
				if(_hx_deref(new EReg("^pay_[a-zA-Z_]+\\.", ""))->match($wData[0]) && _hx_array_get(_hx_explode(".", $wData[0]), 0) !== $this->joinTable) {
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
						if(!($values->length === 2) && Lambda::hforeach($values, array(new _hx_lambda(array(&$_g, &$_g1, &$filter_tables, &$first, &$phValues, &$sb, &$values, &$w, &$wData, &$where), "model_ClientHistory_0"), 'execute'))) {
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
						$sb->add($values->map(array(new _hx_lambda(array(&$_g, &$_g1, &$filter_tables, &$first, &$phValues, &$sb, &$values, &$w, &$wData, &$where), "model_ClientHistory_1"), 'execute'))->join(","));
						$sb->add(")");
					}break;
					case "LIKE":{
						$sb->add($this->quoteField($wData[0]));
						$sb->add(" LIKE ?");
						$phValues->push((new _hx_array(array($wData[0], $wData[2]))));
					}break;
					default:{
						$sb->add($this->quoteField($wData[0]));
						if(_hx_deref(new EReg("^(<|>)", ""))->match($wData[1])) {
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
				unset($wData,$w,$values,$filter_tables);
			}
		}
		return $sb->b;
	}
	public function findClient($param, $dataOnly = null) {
		$sql = new StringBuf();
		$phValues = new _hx_array(array());
		$cond = "";
		$limit = $param->get("limit");
		if(!Util::any2bool($limit)) {
			$limit = _hx_array_get(S::$conf->get("sql"), "LIMIT");
			if(!Util::any2bool($limit)) {
				$limit = 15;
			}
		}
		$globalCond = "";
		$reasons = "";
		$where = $param->get("where");
		if(strlen($where) > 0) {
			$where1 = _hx_explode(",", $where);
			$whereElements = $where1->filter(array(new _hx_lambda(array(&$cond, &$dataOnly, &$globalCond, &$limit, &$param, &$phValues, &$reasons, &$sql, &$where, &$where1), "model_ClientHistory_2"), 'execute'));
			{
				$_g = 0;
				while($_g < $where1->length) {
					$w = $where1[$_g];
					++$_g;
					$wData = _hx_string_call($w, "split", array("|"));
					{
						$_g1 = $wData[0];
						switch($_g1) {
						case "reason":{
							$reasons = $wData->slice(1, null)->join(" ");
						}break;
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
		$this->data = _hx_anonymous(array("count" => _hx_array_get($this->query("SELECT FOUND_ROWS()"), 0)["FOUND_ROWS()"], "page" => (($param->exists("page")) ? Std::parseInt($param->get("page")) : 1), "rows" => $rows));
		return $this->json_encode();
	}
	public function find($param) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "ClientHistory.hx", "lineNumber" => 227, "className" => "model.ClientHistory", "methodName" => "find")));
		$count = $this->countJoin($param, $sb, $phValues);
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace(_hx_string_or_null($param->get("joincond")) . " count:" . _hx_string_rec($count, "") . ":" . _hx_string_or_null($param->get("page")) . ": " . _hx_string_or_null(((($param->exists("page")) ? "Y" : "N"))), _hx_anonymous(array("fileName" => "ClientHistory.hx", "lineNumber" => 232, "className" => "model.ClientHistory", "methodName" => "find")));
		$this->data = _hx_anonymous(array("count" => $count, "page" => (($param->exists("page")) ? Std::parseInt($param->get("page")) : 1), "rows" => $this->doJoin($param, $sb, $phValues)));
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
function model_ClientHistory_0(&$_g, &$_g1, &$filter_tables, &$first, &$phValues, &$sb, &$values, &$w, &$wData, &$where, $s) {
	{
		return Util::any2bool($s);
	}
}
function model_ClientHistory_1(&$_g, &$_g1, &$filter_tables, &$first, &$phValues, &$sb, &$values, &$w, &$wData, &$where, $s1) {
	{
		$phValues->push((new _hx_array(array($wData[0], $values->shift()))));
		return "?";
	}
}
function model_ClientHistory_2(&$cond, &$dataOnly, &$globalCond, &$limit, &$param, &$phValues, &$reasons, &$sql, &$where, &$where1, $el) {
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
