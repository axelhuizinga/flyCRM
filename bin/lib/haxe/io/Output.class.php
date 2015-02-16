<?php

class haxe_io_Output {
	public function __construct(){}
	public $bigEndian;
	public function writeByte($c) {
		throw new HException("Not implemented");
	}
	public function writeBytes($s, $pos, $len) {
		$k = $len;
		$b = $s->b;
		if($pos < 0 || $len < 0 || $pos + $len > $s->length) {
			throw new HException(haxe_io_Error::$OutsideBounds);
		}
		while($k > 0) {
			$this->writeByte(ord($b[$pos]));
			$pos++;
			$k--;
		}
		return $len;
	}
	public function flush() {
	}
	public function close() {
	}
	public function set_bigEndian($b) {
		$this->bigEndian = $b;
		return $b;
	}
	public function write($s) {
		$l = $s->length;
		$p = 0;
		while($l > 0) {
			$k = $this->writeBytes($s, $p, $l);
			if($k === 0) {
				throw new HException(haxe_io_Error::$Blocked);
			}
			$p += $k;
			$l -= $k;
			unset($k);
		}
	}
	public function writeFullBytes($s, $pos, $len) {
		while($len > 0) {
			$k = $this->writeBytes($s, $pos, $len);
			$pos += $k;
			$len -= $k;
			unset($k);
		}
	}
	public function writeFloat($x) {
		$this->write(haxe_io_Bytes::ofString(pack("f", $x)));
	}
	public function writeDouble($x) {
		$this->write(haxe_io_Bytes::ofString(pack("d", $x)));
	}
	public function writeInt8($x) {
		if($x < -128 || $x >= 128) {
			throw new HException(haxe_io_Error::$Overflow);
		}
		$this->writeByte($x & 255);
	}
	public function writeInt16($x) {
		if($x < -32768 || $x >= 32768) {
			throw new HException(haxe_io_Error::$Overflow);
		}
		$this->writeUInt16($x & 65535);
	}
	public function writeUInt16($x) {
		if($x < 0 || $x >= 65536) {
			throw new HException(haxe_io_Error::$Overflow);
		}
		if($this->bigEndian) {
			$this->writeByte($x >> 8);
			$this->writeByte($x & 255);
		} else {
			$this->writeByte($x & 255);
			$this->writeByte($x >> 8);
		}
	}
	public function writeInt24($x) {
		if($x < -8388608 || $x >= 8388608) {
			throw new HException(haxe_io_Error::$Overflow);
		}
		$this->writeUInt24($x & 16777215);
	}
	public function writeUInt24($x) {
		if($x < 0 || $x >= 16777216) {
			throw new HException(haxe_io_Error::$Overflow);
		}
		if($this->bigEndian) {
			$this->writeByte($x >> 16);
			$this->writeByte($x >> 8 & 255);
			$this->writeByte($x & 255);
		} else {
			$this->writeByte($x & 255);
			$this->writeByte($x >> 8 & 255);
			$this->writeByte($x >> 16);
		}
	}
	public function writeInt32($x) {
		if($this->bigEndian) {
			$this->writeByte(_hx_shift_right($x, 24));
			$this->writeByte($x >> 16 & 255);
			$this->writeByte($x >> 8 & 255);
			$this->writeByte($x & 255);
		} else {
			$this->writeByte($x & 255);
			$this->writeByte($x >> 8 & 255);
			$this->writeByte($x >> 16 & 255);
			$this->writeByte(_hx_shift_right($x, 24));
		}
	}
	public function prepare($nbytes) {
	}
	public function writeInput($i, $bufsize = null) {
		if($bufsize === null) {
			$bufsize = 4096;
		}
		$buf = haxe_io_Bytes::alloc($bufsize);
		try {
			while(true) {
				$len = $i->readBytes($buf, 0, $bufsize);
				if($len === 0) {
					throw new HException(haxe_io_Error::$Blocked);
				}
				$p = 0;
				while($len > 0) {
					$k = $this->writeBytes($buf, $p, $len);
					if($k === 0) {
						throw new HException(haxe_io_Error::$Blocked);
					}
					$p += $k;
					$len -= $k;
					unset($k);
				}
				unset($p,$len);
			}
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			if(($e = $_ex_) instanceof haxe_io_Eof){
			} else throw $__hx__e;;
		}
	}
	public function writeString($s) {
		$b = haxe_io_Bytes::ofString($s);
		$this->writeFullBytes($b, 0, $b->length);
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
	static $LN2;
	static $__properties__ = array("set_bigEndian" => "set_bigEndian");
	function __toString() { return 'haxe.io.Output'; }
}
haxe_io_Output::$LN2 = Math::log(2);