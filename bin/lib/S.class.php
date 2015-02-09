<?php

class S {
	public function __construct(){}
	static $debug = true;
	static $htmlStart = false;
	static $conf;
	static $my;
	static function main() {
		haxe_Log::$trace = (isset(me_cunity_php_Debug::$_trace) ? me_cunity_php_Debug::$_trace: array("me_cunity_php_Debug", "_trace"));
		S::$conf = Config::load("appData.js");
		$fieldNames = php_Lib::objectOfAssociativeArray(S::$conf->get("fieldNames"));
		$pd = php_Web::getPostData();
		$params = php_Web::getParams();
		if($params->get("debug") === "1") {
			header("Content-Type" . ": " . "text/html; charset=utf-8");
			S::$htmlStart = true;
			php_Lib::println("<div><pre>");
			php_Lib::println($params);
		}
		haxe_Log::trace($params, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 46, "className" => "S", "methodName" => "main")));
		$action = $params->get("action");
		if(strlen($action) > 0) {
			S::$my = new MySQLi("localhost", php_DBConfig::$user, php_DBConfig::$pass, php_DBConfig::$db, null, null);
		}
		$params->remove("action");
		haxe_Log::trace($action, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 51, "className" => "S", "methodName" => "main")));
		$result = null;
		switch($action) {
		case "clients":{
			haxe_Log::trace("clients", _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 55, "className" => "S", "methodName" => "main")));
			$result = model_Clients::get($params);
		}break;
		default:{
			haxe_Log::trace("oops" . _hx_string_or_null($action), _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 58, "className" => "S", "methodName" => "main")));
			$result = null;
		}break;
		}
		haxe_Log::trace($result, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 62, "className" => "S", "methodName" => "main")));
	}
	static function dump($d) {
		if(!S::$htmlStart) {
			header("Content-Type" . ": " . "application/json");
			S::$htmlStart = true;
		}
		php_Lib::println(haxe_Json::phpJsonEncode($d, null, null));
	}
	function __toString() { return 'S'; }
}
require_once("/srv/www/htdocs/flyCRM/php/functions.php");
