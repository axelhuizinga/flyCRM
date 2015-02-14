<?php

class haxe_io_Bytes {
	public function __construct($length, $b) {
		if(!php_Boot::$skip_constructor) {
		$this->length = $length;
		$this->b = $b;
	}}
	public $length;
	public $b;
	public function get($pos) {
		return ord($this->b[$pos]);
	}
	public function set($pos, $v) {
		$this->b[$pos] = chr($v);
	}
	public function blit($pos, $src, $srcpos, $len) {
		if($pos < 0 || $srcpos < 0 || $len < 0 || $pos + $len > $this->length || $srcpos + $len > $src->length) {
			throw new HException(haxe_io_Error::$OutsideBounds);
		}
		$this->b = substr($this->b, 0, $pos) . substr($src->b, $srcpos, $len) . substr($this->b, $pos+$len);
	}
	public function fill($pos, $len, $value) {
		$_g = 0;
		while($_g < $len) {
			$i = $_g++;
			$pos1 = $pos++;
			$this->b[$pos1] = chr($value);
			unset($pos1,$i);
		}
	}
	public function sub($pos, $len) {
		if($pos < 0 || $len < 0 || $pos + $len > $this->length) {
			throw new HException(haxe_io_Error::$OutsideBounds);
		}
		return new haxe_io_Bytes($len, substr($this->b, $pos, $len));
	}
	public function compare($other) {
		return $this->b < $other->b ? -1 : ($this->b == $other->b ? 0 : 1);
	}
	public function getDouble($pos) {
		$b = new haxe_io_BytesInput($this, $pos, 8);
		return $b->readDouble();
	}
	public function getFloat($pos) {
		$b = new haxe_io_BytesInput($this, $pos, 4);
		return $b->readFloat();
	}
	public function setDouble($pos, $v) {
		throw new HException("Not supported");
	}
	public function setFloat($pos, $v) {
		throw new HException("Not supported");
	}
	public function getString($pos, $len) {
		if($pos < 0 || $len < 0 || $pos + $len > $this->length) {
			throw new HException(haxe_io_Error::$OutsideBounds);
		}
		return substr($this->b, $pos, $len);
	}
	public function readString($pos, $len) {
		return $this->getString($pos, $len);
	}
	public function toString() {
		return $this->b;
	}
	public function toHex() {
		$s = new StringBuf();
		$chars = (new _hx_array(array()));
		$str = "0123456789abcdef";
		{
			$_g1 = 0;
			$_g = strlen($str);
			while($_g1 < $_g) {
				$i = $_g1++;
				$chars->push(_hx_char_code_at($str, $i));
				unset($i);
			}
		}
		{
			$_g11 = 0;
			$_g2 = $this->length;
			while($_g11 < $_g2) {
				$i1 = $_g11++;
				$c = ord($this->b[$i1]);
				$s->b .= _hx_string_or_null(chr($chars[$c >> 4]));
				$s->b .= _hx_string_or_null(chr($chars[$c & 15]));
				unset($i1,$c);
			}
		}
		return $s->b;
	}
	public function getData() {
		return $this->b;
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
	static function alloc($length) {
		return new haxe_io_Bytes($length, str_repeat(chr(0), $length));
	}
	static function ofString($s) {
		return new haxe_io_Bytes(strlen($s), $s);
	}
	static function ofData($b) {
		return new haxe_io_Bytes(strlen($b), $b);
	}
	static function fastGet($b, $pos) {
		return ord($b[$pos]);
	}
	function __toString() { return $this->toString(); }
}
