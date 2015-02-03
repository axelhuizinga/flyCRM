<?php

class Main {
	public function __construct(){}
	static $debug = true;
	static $htmlStart = false;
	static function main() {
		me_cunity_php_Log::edump("hi", null);
		$pd = php_Web::getPostData();
		Main::dump($pd);
		$params = php_Web::getParams();
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
