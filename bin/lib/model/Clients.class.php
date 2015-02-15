<?php

class model_Clients extends Model {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function find1($param) {
		$sb = new StringBuf();
		$sb->add("SELECT ");
		$sb->add(Std::string($param->get("fields")) . " FROM ");
		$sb->add(Std::string($param->get("table")) . " ");
		if($param->exists("join")) {
			$sb->add(Std::string($param->get("join")) . " ");
		}
		$sb->add("WHERE " . Std::string($param->get("where")) . " ");
		if($param->exists("group")) {
			$sb->add("GROUP BY " . Std::string($param->get("group")) . " ");
		}
		if($param->exists("order")) {
			$sb->add("ORDER BY " . Std::string($param->get("order")) . " ");
		}
		if($param->exists("limit")) {
			$sb->add("LIMIT " . Std::string($param->get("limit")));
		}
		$this->data = _hx_anonymous(array("rows" => $this->query1($sb->b)));
		return $this->json_encode();
	}
	public function find($param) {
		$sb = new StringBuf();
		$placeHolder = new haxe_ds_StringMap();
		haxe_Log::trace(Std::string($param->get("where")) . ":", _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 56, "className" => "model.Clients", "methodName" => "find")));
		$sb->add("SELECT ");
		$sb->add(_hx_string_or_null($this->fieldFormat($param->get("fields"))) . " FROM ");
		$sb->add(Std::string($param->get("table")) . " ");
		if($param->exists("join")) {
			$sb->add(Std::string($param->get("join")) . " ");
		}
		$sb->add($this->prepare($param->get("where"), $placeHolder));
		haxe_Log::trace($placeHolder->toString(), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 64, "className" => "model.Clients", "methodName" => "find")));
		if($param->exists("group")) {
			$sb->add("GROUP BY " . Std::string($param->get("group")) . " ");
		}
		if($param->exists("order")) {
			$sb->add("ORDER BY " . Std::string($param->get("order")) . " ");
		}
		if($param->exists("limit")) {
			$sb->add("LIMIT " . Std::string($param->get("limit")));
		}
		$this->data = _hx_anonymous(array("rows" => $this->execute($sb->b, $param, $placeHolder)));
		return $this->json_encode();
	}
	public function execute($sql, $param, $placeholders = null) {
		haxe_Log::trace($sql, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 83, "className" => "model.Clients", "methodName" => "execute")));
		$stmt = S::$my->stmt_init();
		haxe_Log::trace($stmt, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 85, "className" => "model.Clients", "methodName" => "execute")));
		$success = $stmt->prepare($sql);
		haxe_Log::trace($success, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 87, "className" => "model.Clients", "methodName" => "execute")));
		if(!$success) {
			haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 90, "className" => "model.Clients", "methodName" => "execute")));
			return null;
		}
		$bindTypes = "";
		$values2bind = null;
		$dbFieldTypes = php_Lib::hashOfAssociativeArray(php_Lib::associativeArrayOfObject(S::$conf->get("dbFieldTypes")));
		$qObj = _hx_anonymous(array());
		$qVars = "qVar_";
		$i = 0;
		if(null == $placeholders) throw new HException('null iterable');
		$__hx__it = $placeholders->keys();
		while($__hx__it->hasNext()) {
			$name = $__hx__it->next();
			$bindTypes .= _hx_string_or_null($dbFieldTypes->get($name));
			$values2bind[$i++] = $placeholders->get($name);
		}
		haxe_Log::trace(Std::string($values2bind), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 110, "className" => "model.Clients", "methodName" => "execute")));
		$success = myBindParam($stmt, $values2bind, $bindTypes);
		haxe_Log::trace("success:" . Std::string($success), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 115, "className" => "model.Clients", "methodName" => "execute")));
		if($success) {
			$fieldNames = _hx_string_call($param->get("fields"), "split", array(","));
			$data = null;
			$success = $stmt->execute();
			if(!$success) {
				haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 123, "className" => "model.Clients", "methodName" => "execute")));
				return null;
			}
			$result = $stmt->get_result();
			if($result !== false) {
				$data = _hx_deref(($result))->fetch_all(1);
			}
			return $data;
		} else {
			haxe_Log::trace($stmt->error, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 134, "className" => "model.Clients", "methodName" => "execute")));
		}
		return null;
	}
	public function query($sql, $placeholders = null) {
		haxe_Log::trace($sql, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 142, "className" => "model.Clients", "methodName" => "query")));
		$res = S::$my->query($sql, 1);
		if($res) {
			$data = _hx_deref(($res))->fetch_all(1);
			return $data;
		} else {
			haxe_Log::trace(Std::string($res) . ":" . _hx_string_or_null(S::$my->error), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 151, "className" => "model.Clients", "methodName" => "query")));
		}
		return null;
	}
	public function query1($sql) {
		haxe_Log::trace($sql, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 159, "className" => "model.Clients", "methodName" => "query1")));
		$res = S::$my->query($sql, 1);
		if($res) {
			$data = _hx_deref(($res))->fetch_all(1);
			return $data;
		} else {
			haxe_Log::trace(Std::string($res) . ":" . _hx_string_or_null(S::$my->error), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 168, "className" => "model.Clients", "methodName" => "query1")));
		}
		return null;
	}
	static function create($param) {
		$self = new model_Clients();
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 25, "className" => "model.Clients", "methodName" => "create")));
		return Reflect::callMethod($self, $param->get("action"), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.Clients'; }
}
