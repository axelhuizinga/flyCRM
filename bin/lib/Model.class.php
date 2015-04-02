<?php

class Model {
	public function __construct() {}
	public $data;
	public $db;
	public $table;
	public $primary;
	public function count($q, $sb, $phValues) {
		if(!php_Boot::$skip_constructor) {
		$fields = $q->get("fields");
		haxe_Log::trace("table:" . _hx_string_or_null($q->get("table")) . _hx_string_or_null((Model_0($this, $fields, $phValues, $q, $sb))), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 83, "className" => "Model", "methodName" => "count")));
		$sb->add("SELECT COUNT(*) AS count");
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
		$sb->add(" FROM " . _hx_string_or_null(S::$my->real_escape_string($qTable)));
		$where = $q->get("where");
		if($where !== null) {
			$this->buildCond($where, $sb, $phValues);
		}
		{
			$this1 = php_Lib::hashOfAssociativeArray(_hx_array_get($this->execute($sb->b, $q, $phValues), 0));
			return $this1->get("count");
		}
	}}
	public function countJoin($q, $sb, $phValues) {
		$fields = $q->get("fields");
		haxe_Log::trace("table:" . _hx_string_or_null($q->get("table")) . _hx_string_or_null((Model_1($this, $fields, $phValues, $q, $sb))), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 100, "className" => "Model", "methodName" => "countJoin")));
		$sb->add("SELECT COUNT(*) AS count");
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
		$sb->add(" FROM " . _hx_string_or_null(S::$my->real_escape_string($qTable)));
		if($joinTable !== null) {
			$sb->add(" INNER JOIN " . _hx_string_or_null($joinTable) . " ");
		}
		if($joinCond !== null) {
			$sb->add($joinCond);
		}
		$where = $q->get("where");
		if($where !== null) {
			$this->buildCond($where, $sb, $phValues);
		}
		{
			$this1 = php_Lib::hashOfAssociativeArray(_hx_array_get($this->execute($sb->b, $q, $phValues), 0));
			return $this1->get("count");
		}
	}
	public function doJoin($q, $sb, $phValues) {
		$fields = $q->get("fields");
		haxe_Log::trace("table:" . _hx_string_or_null($q->get("table")) . _hx_string_or_null((Model_2($this, $fields, $phValues, $q, $sb))), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 123, "className" => "Model", "methodName" => "doJoin")));
		$sb->add("SELECT " . _hx_string_or_null(((($fields !== null) ? $this->fieldFormat(_hx_explode(",", $fields)->map(array(new _hx_lambda(array(&$fields, &$phValues, &$q, &$sb), "Model_3"), 'execute'))->join(",")) : "*"))));
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
		$sb->add(" FROM " . _hx_string_or_null(S::$my->real_escape_string($qTable)));
		if($joinTable !== null) {
			$sb->add(" INNER JOIN " . _hx_string_or_null($joinTable) . " ");
		}
		if($joinCond !== null) {
			$sb->add($joinCond);
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
	public function doSelect($q, $sb, $phValues) {
		$fields = $q->get("fields");
		haxe_Log::trace("table:" . _hx_string_or_null($q->get("table")) . _hx_string_or_null((Model_4($this, $fields, $phValues, $q, $sb))), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 153, "className" => "Model", "methodName" => "doSelect")));
		$sb->add("SELECT " . _hx_string_or_null(((($fields !== null) ? $this->fieldFormat($fields) : "*"))));
		$qTable = null;
		if(Util::any2bool($q->get("table"))) {
			$qTable = $q->get("table");
		} else {
			$qTable = $this->table;
		}
		$sb->add(" FROM " . _hx_string_or_null(S::$my->real_escape_string($qTable)));
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
	public function fieldFormat($fields) {
		$fieldsWithFormat = new _hx_array(array());
		$sF = _hx_explode(",", $fields);
		$dbQueryFormats = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbQueryFormats")));
		$d = php_Lib::hashOfAssociativeArray(S::$conf->get("dbQueryFormats"));
		$qKeys = new _hx_array(array());
		$it = $dbQueryFormats->keys();
		while($it->hasNext()) {
			$qKeys->push($it->next());
		}
		{
			$_g = 0;
			while($_g < $sF->length) {
				$f = $sF[$_g];
				++$_g;
				if(Lambda::has($qKeys, $f)) {
					$format = $dbQueryFormats->get($f);
					$fieldsWithFormat->push(_hx_string_or_null($format[0]) . "(" . _hx_string_or_null(S::$my->real_escape_string($f)) . ", \"" . _hx_string_or_null($format[1]) . "\") AS `" . _hx_string_or_null($f) . "`");
					unset($format);
				} else {
					$fieldsWithFormat->push(S::$my->real_escape_string($f));
				}
				unset($f);
			}
		}
		return $fieldsWithFormat->join(",");
	}
	public function find($param) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$count = $this->countJoin($param, $sb, $phValues);
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		haxe_Log::trace("count:" . _hx_string_rec($count, "") . " page:" . _hx_string_or_null($param->get("page")) . ":" . _hx_string_or_null($param->get("page")) . ": " . _hx_string_or_null(((($param->exists("page")) ? "Y" : "N"))), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 217, "className" => "Model", "methodName" => "find")));
		$this->data = _hx_anonymous(array("count" => $count, "page" => (($param->exists("page")) ? Std::parseInt($param->get("page")) : 1), "rows" => $this->doSelect($param, $sb, $phValues)));
		return $this->json_encode();
	}
	public function execute($sql, $param, $phValues = null) {
		haxe_Log::trace($sql, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 228, "className" => "Model", "methodName" => "execute")));
		$stmt = S::$my->stmt_init();
		$success = $stmt->prepare($sql);
		haxe_Log::trace($success, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 231, "className" => "Model", "methodName" => "execute")));
		if(!$success) {
			haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 234, "className" => "Model", "methodName" => "execute")));
			return null;
		}
		$bindTypes = "";
		$values2bind = null;
		$dbFieldTypes = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbFieldTypes")));
		$qObj = _hx_anonymous(array());
		$i = 0;
		{
			$_g = 0;
			while($_g < $phValues->length) {
				$ph = $phValues[$_g];
				++$_g;
				$type = $dbFieldTypes->get($ph[0]);
				if(Util::any2bool($type)) {
					$bindTypes .= _hx_string_or_null($type);
				} else {
					$bindTypes .= "s";
				}
				$values2bind[$i++] = $ph[1];
				unset($type,$ph);
			}
		}
		haxe_Log::trace(Std::string($values2bind), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 251, "className" => "Model", "methodName" => "execute")));
		if($phValues->length > 0) {
			$success = myBindParam($stmt, $values2bind, $bindTypes);
			haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 255, "className" => "Model", "methodName" => "execute")));
			if($success) {
				$data = null;
				$success = $stmt->execute();
				if(!$success) {
					haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 263, "className" => "Model", "methodName" => "execute")));
					return null;
				}
				$result = $stmt->get_result();
				if($result) {
					$data = _hx_deref(($result))->fetch_all(1);
				}
				return $data;
			}
		} else {
			$data1 = null;
			$success = $stmt->execute();
			if(!$success) {
				haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 279, "className" => "Model", "methodName" => "execute")));
				return array("ERROR", $stmt->error);
			}
			$result1 = $stmt->get_result();
			if($result1) {
				$data1 = _hx_deref(($result1))->fetch_all(1);
			}
			return $data1;
		}
		return array("ERROR", $stmt->error);
	}
	public function query($sql) {
		haxe_Log::trace($sql, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 295, "className" => "Model", "methodName" => "query")));
		$res = S::$my->query($sql, 1);
		if($res) {
			$data = _hx_deref(($res))->fetch_all(1);
			return $data;
		} else {
			haxe_Log::trace(Std::string($res) . ":" . _hx_string_or_null(S::$my->error), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 304, "className" => "Model", "methodName" => "query")));
		}
		return null;
	}
	public function buildCond($whereParam, $sb, $phValues) {
		$where = _hx_explode(",", $whereParam);
		if($where->length === 0) {
			return false;
		}
		$first = true;
		{
			$_g = 0;
			while($_g < $where->length) {
				$w = $where[$_g];
				++$_g;
				if($first) {
					$sb->add(" WHERE ");
				} else {
					$sb->add(" AND ");
				}
				$first = false;
				$wData = _hx_string_call($w, "split", array("|"));
				$values = $wData->slice(2, null);
				{
					$_g1 = strtoupper($wData[1]);
					switch($_g1) {
					case "BETWEEN":{
						if(!($values->length === 2) && Lambda::hforeach($values, array(new _hx_lambda(array(&$_g, &$_g1, &$first, &$phValues, &$sb, &$values, &$w, &$wData, &$where, &$whereParam), "Model_5"), 'execute'))) {
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
						$sb->add($values->map(array(new _hx_lambda(array(&$_g, &$_g1, &$first, &$phValues, &$sb, &$values, &$w, &$wData, &$where, &$whereParam), "Model_6"), 'execute'))->join(","));
						$sb->add(")");
					}break;
					case "LIKE":{
						$sb->add($this->quoteField($wData[0]));
						$sb->add(" LIKE ?");
						$phValues->push((new _hx_array(array($wData[0], $wData[2]))));
					}break;
					default:{
						$sb->add($this->quoteField($wData[0]));
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
				unset($wData,$w,$values);
			}
		}
		return true;
	}
	public function buildGroup($groupParam, $sb) {
		$_g = $this;
		$fields = _hx_explode(",", $groupParam);
		if($fields->length === 0) {
			return false;
		}
		$sb->add(" GROUP BY ");
		$sb->add($fields->map(array(new _hx_lambda(array(&$_g, &$fields, &$groupParam, &$sb), "Model_7"), 'execute'))->join(","));
		return true;
	}
	public function buildOrder($orderParam, $sb) {
		$_g = $this;
		$fields = _hx_explode(",", $orderParam);
		if($fields->length === 0) {
			return false;
		}
		$sb->add(" ORDER BY ");
		$sb->add($fields->map(array(new _hx_lambda(array(&$_g, &$fields, &$orderParam, &$sb), "Model_8"), 'execute'))->join(","));
		return true;
	}
	public function buildLimit($limitParam, $sb) {
		$sb->add(" LIMIT " . _hx_string_or_null((((_hx_index_of($limitParam, ",", null) > -1) ? _hx_explode(",", $limitParam)->map(array(new _hx_lambda(array(&$limitParam, &$sb), "Model_9"), 'execute'))->join(",") : Std::string(Std::parseInt($limitParam))))));
		return true;
	}
	public function quoteField($f) {
		if(Model::$KEYWORDS->exists(strtolower($f))) {
			return "`" . _hx_string_or_null($f) . "`";
		} else {
			return $f;
		}
	}
	public function json_encode() {
		return json_encode($this->data, 64);
	}
	public function json_response($res) {
		return json_encode(_hx_anonymous(array("response" => $res)), 64);
	}
	public function getConfig($param) {
		if(S::$conf->exists("hasTabs") && S::$conf->get("hasTabs")) {
			haxe_Log::trace($param->get("instancePath"), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 414, "className" => "Model", "methodName" => "getConfig")));
			$tabBox = _hx_array_get(S::$conf->get("views"), 0)->TabBox;
			$iPath = Std::string(S::$conf->get("appName")) . "." . Std::string($tabBox->id);
			$tabs = $tabBox->tabs;
		}
		return null;
	}
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->__dynamics[$m]) && is_callable($this->__dynamics[$m]))
			return call_user_func_array($this->__dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call <'.$m.'>');
	}
	static $KEYWORDS;
	static function dispatch($param) {
		$cl = Type::resolveClass("model." . Std::string($param->get("className")));
		haxe_Log::trace($cl, _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 53, "className" => "Model", "methodName" => "dispatch")));
		if($cl === null) {
			haxe_Log::trace("model." . Std::string($param->get("className")) . " ???", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 56, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
		$fl = Reflect::field($cl, "create");
		if($fl === null) {
			haxe_Log::trace(Std::string($cl) . "create is null", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 63, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
		$iFields = Type::getInstanceFields($cl);
		if(Lambda::has($iFields, $param->get("action"))) {
			haxe_Log::trace("calling create " . Std::string($cl), _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 70, "className" => "Model", "methodName" => "dispatch")));
			return Reflect::callMethod($cl, $fl, (new _hx_array(array($param))));
		} else {
			haxe_Log::trace("not calling create ", _hx_anonymous(array("fileName" => "Model.hx", "lineNumber" => 75, "className" => "Model", "methodName" => "dispatch")));
			return false;
		}
	}
	function __toString() { return 'Model'; }
}
Model::$KEYWORDS = Model_10();
function Model_0(&$__hx__this, &$fields, &$phValues, &$q, &$sb) {
	if(Util::any2bool($q->get("table"))) {
		return $q->get("table");
	} else {
		return $__hx__this->table;
	}
}
function Model_1(&$__hx__this, &$fields, &$phValues, &$q, &$sb) {
	if(Util::any2bool($q->get("table"))) {
		return $q->get("table");
	} else {
		return $__hx__this->table;
	}
}
function Model_2(&$__hx__this, &$fields, &$phValues, &$q, &$sb) {
	if(Util::any2bool($q->get("table"))) {
		return $q->get("table");
	} else {
		return $__hx__this->table;
	}
}
function Model_3(&$fields, &$phValues, &$q, &$sb, $f) {
	{
		return S::$my->real_escape_string($f);
	}
}
function Model_4(&$__hx__this, &$fields, &$phValues, &$q, &$sb) {
	if(Util::any2bool($q->get("table"))) {
		return $q->get("table");
	} else {
		return $__hx__this->table;
	}
}
function Model_5(&$_g, &$_g1, &$first, &$phValues, &$sb, &$values, &$w, &$wData, &$where, &$whereParam, $s) {
	{
		return Util::any2bool($s);
	}
}
function Model_6(&$_g, &$_g1, &$first, &$phValues, &$sb, &$values, &$w, &$wData, &$where, &$whereParam, $s1) {
	{
		$phValues->push((new _hx_array(array($wData[0], $values->shift()))));
		return "?";
	}
}
function Model_7(&$_g, &$fields, &$groupParam, &$sb, $g) {
	{
		return $_g->quoteField($g);
	}
}
function Model_8(&$_g, &$fields, &$orderParam, &$sb, $f) {
	{
		$g = _hx_explode("|", $f);
		return _hx_string_or_null($_g->quoteField($g[0])) . _hx_string_or_null(((($g->length === 2 && $g[1] === "DESC") ? " DESC" : "")));
	}
}
function Model_9(&$limitParam, &$sb, $s) {
	{
		return Std::parseInt($s);
	}
}
function Model_10() {
	{
		$h = new haxe_ds_StringMap();
		{
			$_g = 0;
			$_g1 = _hx_explode("|", "ADD|ALL|ALTER|ANALYZE|AND|AS|ASC|ASENSITIVE|BEFORE|BETWEEN|BIGINT|BINARY|BLOB|BOTH|BY|CALL|CASCADE|CASE|CHANGE|CHAR|CHARACTER|CHECK|COLLATE|COLUMN|CONDITION|CONSTRAINT|CONTINUE|CONVERT|CREATE|CROSS|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DATABASES|DAY_HOUR|DAY_MICROSECOND|DAY_MINUTE|DAY_SECOND|DEC|DECIMAL|DECLARE|DEFAULT|DELAYED|DELETE|DESC|DESCRIBE|DETERMINISTIC|DISTINCT|DISTINCTROW|DIV|DOUBLE|DROP|DUAL|EACH|ELSE|ELSEIF|ENCLOSED|ESCAPED|EXISTS|EXIT|EXPLAIN|FALSE|FETCH|FLOAT|FLOAT4|FLOAT8|FOR|FORCE|FOREIGN|FROM|FULLTEXT|GRANT|GROUP|HAVING|HIGH_PRIORITY|HOUR_MICROSECOND|HOUR_MINUTE|HOUR_SECOND|IF|IGNORE|IN|INDEX|INFILE|INNER|INOUT|INSENSITIVE|INSERT|INT|INT1|INT2|INT3|INT4|INT8|INTEGER|INTERVAL|INTO|IS|ITERATE|JOIN|KEY|KEYS|KILL|LEADING|LEAVE|LEFT|LIKE|LIMIT|LINES|LOAD|LOCALTIME|LOCALTIMESTAMP|LOCK|LONG|LONGBLOB|LONGTEXT|LOOP|LOW_PRIORITY|MATCH|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MIDDLEINT|MINUTE_MICROSECOND|MINUTE_SECOND|MOD|MODIFIES|NATURAL|NOT|NO_WRITE_TO_BINLOG|NULL|NUMERIC|ON|OPTIMIZE|OPTION|OPTIONALLY|OR|ORDER|OUT|OUTER|OUTFILE|PRECISION|PRIMARY|PROCEDURE|PURGE|READ|READS|REAL|REFERENCES|REGEXP|RELEASE|RENAME|REPEAT|REPLACE|REQUIRE|RESTRICT|RETURN|REVOKE|RIGHT|RLIKE|SCHEMA|SCHEMAS|SECOND_MICROSECOND|SELECT|SENSITIVE|SEPARATOR|SET|SHOW|SMALLINT|SONAME|SPATIAL|SPECIFIC|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|SQL_BIG_RESULT|SQL_CALC_FOUND_ROWS|SQL_SMALL_RESULT|SSL|STARTING|STRAIGHT_JOIN|TABLE|TERMINATED|THEN|TINYBLOB|TINYINT|TINYTEXT|TO|TRAILING|TRIGGER|TRUE|UNDO|UNION|UNIQUE|UNLOCK|UNSIGNED|UPDATE|USAGE|USE|USING|UTC_DATE|UTC_TIME|UTC_TIMESTAMP|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|WHEN|WHERE|WHILE|WITH|WRITE|XOR|YEAR_MONTH|ZEROFILL|ASENSITIVE|CALL|CONDITION|CONNECTION|CONTINUE|CURSOR|DECLARE|DETERMINISTIC|EACH|ELSEIF|EXIT|FETCH|GOTO|INOUT|INSENSITIVE|ITERATE|LABEL|LEAVE|LOOP|MODIFIES|OUT|READS|RELEASE|REPEAT|RETURN|SCHEMA|SCHEMAS|SENSITIVE|SPECIFIC|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|TRIGGER|UNDO|UPGRADE|WHILE");
			while($_g < $_g1->length) {
				$k = $_g1[$_g];
				++$_g;
				$h->set(strtolower($k), true);
				unset($k);
			}
		}
		return $h;
	}
}
