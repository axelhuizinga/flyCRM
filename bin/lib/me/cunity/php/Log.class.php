<?php

class me_cunity_php_Log {
	public function __construct(){}
	static function edump($message, $stackPos = null) {
		if($stackPos === null) {
			$stackPos = 0;
		}
		edump($message, $stackPos);
	}
	function __toString() { return 'me.cunity.php.Log'; }
}
