<?php

class php_DBConfig {
	public function __construct(){}
	static $db;
	static $user;
	static $pass;
	static function checkOrCopyTable($srcTable, $suffix = null) {
		if($suffix === null) {
			$suffix = "log";
		}
		$newTable = _hx_string_or_null($srcTable) . "_" . _hx_string_or_null($suffix);
		$res = _hx_deref(new Model())->query("SHOW TABLES LIKE  " . _hx_string_or_null($newTable));
		if($res[0] === null) {
			haxe_Log::trace("create " . _hx_string_or_null($newTable), _hx_anonymous(array("fileName" => "DBConfig.hx", "lineNumber" => 28, "className" => "php.DBConfig", "methodName" => "checkOrCopyTable")));
			$res1 = _hx_deref(new Model())->query("create TABLE " . _hx_string_or_null($newTable) . " like " . _hx_string_or_null($srcTable));
		}
		return false;
	}
	function __toString() { return 'php.DBConfig'; }
}
{
	require_once("../../config/flyCRM.db.php");
	php_DBConfig::$db = $VARDB;
	php_DBConfig::$user = $VARDB_user;
	php_DBConfig::$pass = $VARDB_pass;
}
