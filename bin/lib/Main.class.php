<?php

class Main {
	public function __construct(){}
	static $debug = true;
	static $htmlStart = false;
	static function main() {
		me_cunity_php_Log::edump("hi", null);
		$pd = php_Web::getPostData();
		$params = php_Web::getParams();
		if($params->get("debug") === "1") {
			header("Content-Type" . ": " . "text/html; charset=utf-8");
			Main::$htmlStart = true;
			php_Lib::println("<div><pre>");
		}
		$conf = Config::load("appData.js");
		$fieldNames = php_Lib::objectOfAssociativeArray($conf->get("fieldNames"));
		$keys = $conf->keys();
		while($keys->hasNext()) {
			haxe_Log::trace("::" . _hx_string_or_null($keys->next()) . "|<br>", _hx_anonymous(array("fileName" => "Main.hx", "lineNumber" => 44, "className" => "Main", "methodName" => "main")));
		}
		haxe_Log::trace($fieldNames, _hx_anonymous(array("fileName" => "Main.hx", "lineNumber" => 45, "className" => "Main", "methodName" => "main")));
	}
	static function dump($d) {
		if(!Main::$htmlStart) {
			header("Content-Type" . ": " . "application/json");
			Main::$htmlStart = true;
		}
		php_Lib::println(haxe_Json::phpJsonEncode($d, null, null));
	}
	function __toString() { return 'Main'; }
}
require_once("/srv/www/htdocs/flyCRM/php/functions.php");
