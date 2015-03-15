<?php

class php_Session {
	public function __construct(){}
	static function get($name) {
		php_Session::start();
		if(!isset($_SESSION[$name])) {
			return null;
		}
		return $_SESSION[$name];
	}
	static $started;
	static function start() {
		if(php_Session::$started) {
			return;
		}
		php_Session::$started = true;
		session_start();
	}
	function __toString() { return 'php.Session'; }
}
php_Session::$started = isset($_SESSION);
