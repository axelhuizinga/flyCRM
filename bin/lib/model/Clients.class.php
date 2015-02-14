<?php

class model_Clients extends Model {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function find($param) {
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
		$this->data = _hx_anonymous(array("rows" => $this->query($sb->b)));
		return $this->json_encode();
	}
	public function query($sql) {
		$sql = S::$my->real_escape_string($sql);
		haxe_Log::trace($sql, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 54, "className" => "model.Clients", "methodName" => "query")));
		$res = S::$my->query($sql, 1);
		if($res) {
			$data = _hx_deref(($res))->fetch_all(1);
			return $data;
		} else {
			haxe_Log::trace(Std::string($res) . ":" . _hx_string_or_null(S::$my->error), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 63, "className" => "model.Clients", "methodName" => "query")));
		}
		return null;
	}
	static function create($param) {
		$self = new model_Clients();
		return Reflect::callMethod($self, $param->get("action"), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.Clients'; }
}
