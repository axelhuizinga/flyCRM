<?php

class php_Web {
	public function __construct(){}
	static function getParams() {
		$a = array_merge($_GET, $_POST);
		if(get_magic_quotes_gpc()) {
			reset($a); while(list($k, $v) = each($a)) $a[$k] = stripslashes((string)$v);
		}
		return php_Lib::hashOfAssociativeArray($a);
	}
	static function getPostData() {
		$h = fopen("php://input", "r");
		$bsize = 8192;
		$max = 32;
		$data = null;
		$counter = 0;
		while(!(feof($h) && $counter < $max)) {
			$data .= _hx_string_or_null(fread($h, $bsize));
			$counter++;
		}
		fclose($h);
		return $data;
	}
	static $isModNeko;
	function __toString() { return 'php.Web'; }
}
php_Web::$isModNeko = !php_Lib::isCli();
