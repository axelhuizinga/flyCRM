<?php

class sys_io_FileInput extends haxe_io_Input {
	public function __construct($f) {
		if(!php_Boot::$skip_constructor) {
		$this->__f = $f;
	}}
	public $__f;
	public function readByte() {
		$r = fread($this->__f, 1);
		if(feof($this->__f)) {
			throw new HException(new haxe_io_Eof());
		}
		if(($r === false)) {
			throw new HException(haxe_io_Error::Custom("An error occurred"));
		}
		return ord($r);
	}
	public function readBytes($s, $p, $l) {
		if(feof($this->__f)) {
			throw new HException(new haxe_io_Eof());
		}
		$r = fread($this->__f, $l);
		if(($r === false)) {
			throw new HException(haxe_io_Error::Custom("An error occurred"));
		}
		$b = haxe_io_Bytes::ofString($r);
		$s->blit($p, $b, 0, strlen($r));
		return strlen($r);
	}
	public function close() {
		parent::close();
		if($this->__f !== null) {
			fclose($this->__f);
		}
	}
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->__dynamics[$m]) && is_callable($this->__dynamics[$m]))
			return call_user_func_array($this->__dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call <'.$m.'>');
	}
	function __toString() { return 'sys.io.FileInput'; }
}
