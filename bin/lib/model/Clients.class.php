<?php

class model_Clients extends Model {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function query($sql) {
		$res = S::$my->query($sql, 1);
		if($res) {
			$data = _hx_deref(($res))->fetch_all(1);
			return $data;
		} else {
			haxe_Log::trace(Std::string($res) . ":" . _hx_string_or_null(S::$my->error), _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 54, "className" => "model.Clients", "methodName" => "query")));
		}
		return null;
	}
	static function get($param) {
		$self = new model_Clients();
		$sb = new StringBuf();
		$method = "SELECT";
		if($param->exists("method")) {
			$method = $param->get("method");
		}
		$sb->add(_hx_string_or_null($method) . " ");
		$sb->add(Std::string($param->get("fields")) . " FROM ");
		$sb->add(Std::string($param->get("table")) . " ");
		if($param->exists("join")) {
			$sb->add(Std::string($param->get("join")) . " \x0A");
		}
		$sb->add("WHERE " . Std::string($param->get("where")) . " \x0A");
		if($param->exists("group")) {
			$sb->add(Std::string($param->get("group")) . " \x0A");
		}
		if($param->exists("limit")) {
			$sb->add("LIMIT " . Std::string($param->get("limit")));
		}
		haxe_Log::trace($sb->b, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 38, "className" => "model.Clients", "methodName" => "get")));
		$self->data = $self->query($sb->b);
		return $self->json_encode();
	}
	function __toString() { return 'model.Clients'; }
}
