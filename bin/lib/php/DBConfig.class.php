<?php

class php_DBConfig {
	public function __construct(){}
	static $db;
	static $user;
	static $pass;
	function __toString() { return 'php.DBConfig'; }
}
{
	error_log("hi from DBConfig.__init__ :)");
	require_once("../../config/flyCRM.db.php");
	php_DBConfig::$db = $VARDB;
	php_DBConfig::$user = $VARDB_user;
	php_DBConfig::$pass = $VARDB_pass;
}
