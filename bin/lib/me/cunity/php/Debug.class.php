<?php

class me_cunity_php_Debug {
	public function __construct(){}
	static $logFile;
	static function dump($message, $stackPos = null) {
		if($stackPos === null) {
			$stackPos = 0;
		}
		edump($message, $stackPos);
	}
	static function _trace($v, $i = null) {
		$info = null;
		if($i !== null) {
			$info = _hx_string_or_null($i->fileName) . ":" . _hx_string_or_null($i->methodName) . ":" . _hx_string_rec($i->lineNumber, "") . ":";
		} else {
			$info = "";
		}
		file_put_contents(me_cunity_php_Debug::$logFile, _hx_string_or_null($info) . ":" . Std::string($v) . "\x0A", FILE_APPEND);
	}
	function __toString() { return 'me.cunity.php.Debug'; }
}
