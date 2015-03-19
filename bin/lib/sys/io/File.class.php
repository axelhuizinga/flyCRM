<?php

class sys_io_File {
	public function __construct(){}
	static function saveContent($path, $content) {
		file_put_contents($path, $content);
	}
	static function write($path, $binary = null) {
		if($binary === null) {
			$binary = true;
		}
		return new sys_io_FileOutput(fopen($path, (($binary) ? "wb" : "w")));
	}
	function __toString() { return 'sys.io.File'; }
}
