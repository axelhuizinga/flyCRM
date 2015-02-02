<?php

class Main {
	public function __construct(){}
	static function main() {
		me_cunity_php_Log::edump("hi", null);
	}
	function __toString() { return 'Main'; }
}
