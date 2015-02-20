<?php

class S {
	public function __construct(){}
	static $debug = true;
	static $headerSent = false;
	static $conf;
	static function main() {
		haxe_Log::$trace = (isset(me_cunity_php_Debug::$_trace) ? me_cunity_php_Debug::$_trace: array("me_cunity_php_Debug", "_trace"));
		S::$conf = Config::load("appData.js");
		$pd = php_Web::getPostData();
		$params = php_Web::getParams();
		if($params->get("debug") === "1") {
			header("Content-Type" . ": " . "text/html; charset=utf-8");
			S::$headerSent = true;
			php_Lib::println("<div><pre>");
			php_Lib::println($params);
		}
		haxe_Log::trace($params, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 45, "className" => "S", "methodName" => "main")));
		$action = $params->get("action");
		if(strlen($action) === 0 || $params->get("className") === null) {
			S::dump(_hx_anonymous(array("error" => "required params missing")));
			return;
		}
		sys_db_Manager::set_cnx(sys_db_Mysql::connect(_hx_anonymous(array("user" => php_DBConfig::$user, "pass" => php_DBConfig::$pass, "database" => php_DBConfig::$db, "host" => "localhost"))));
		sys_db_Manager::initialize();
		haxe_Log::trace($action, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 63, "className" => "S", "methodName" => "main")));
		$result = Model::dispatch($params);
		haxe_Log::trace($result, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 66, "className" => "S", "methodName" => "main")));
		if(!S::$headerSent) {
			header("Content-Type" . ": " . "application/json");
			S::$headerSent = true;
		}
		php_Lib::println($result);
	}
	static function dump($d) {
		if(!S::$headerSent) {
			header("Content-Type" . ": " . "application/json");
			S::$headerSent = true;
		}
		php_Lib::println(haxe_Json::phpJsonEncode($d, null, null));
	}
	function __toString() { return 'S'; }
}
require_once("/srv/www/htdocs/flyCRM/php/functions.php");
