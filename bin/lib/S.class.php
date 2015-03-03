<?php

class S {
	public function __construct(){}
	static $debug = true;
	static $headerSent = false;
	static $conf;
	static $my;
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
		haxe_Log::trace($params, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 47, "className" => "S", "methodName" => "main")));
		haxe_Log::trace(S::$conf, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 48, "className" => "S", "methodName" => "main")));
		$action = $params->get("action");
		if(strlen($action) === 0 || $params->get("className") === null) {
			S::dump(_hx_anonymous(array("error" => "required params missing")));
			return;
		}
		S::$my = new MySQLi("localhost", php_DBConfig::$user, php_DBConfig::$pass, php_DBConfig::$db, null, null);
		haxe_Log::trace($action, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 62, "className" => "S", "methodName" => "main")));
		$result = Model::dispatch($params);
		haxe_Log::trace($result, _hx_anonymous(array("fileName" => "S.hx", "lineNumber" => 65, "className" => "S", "methodName" => "main")));
		if(!S::$headerSent) {
			header("Content-Type" . ": " . "application/json");
			S::$headerSent = true;
		}
		php_Lib::println($result);
	}
	static function hexit($d) {
		if(!S::$headerSent) {
			header("Content-Type" . ": " . "application/json");
			S::$headerSent = true;
		}
		$exitValue = json_encode(_hx_anonymous(array("ERROR" => $d)));
		return exit($exitValue);
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
