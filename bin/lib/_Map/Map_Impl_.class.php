<?php

class _Map_Map_Impl_ {
	public function __construct(){}
	static $_new;
	static function set($this1, $key, $value) {
		$this1->set($key, $value);
	}
	static function get($this1, $key) {
		return $this1->get($key);
	}
	static function exists($this1, $key) {
		return $this1->exists($key);
	}
	static function remove($this1, $key) {
		return $this1->remove($key);
	}
	static function keys($this1) {
		return $this1->keys();
	}
	static function iterator($this1) {
		return $this1->iterator();
	}
	static function toString($this1) {
		return $this1->toString();
	}
	static function arrayWrite($this1, $k, $v) {
		$this1->set($k, $v);
		return $v;
	}
	static function toStringMap($t) {
		return new haxe_ds_StringMap();
	}
	static function toIntMap($t) {
		return new haxe_ds_IntMap();
	}
	static function toEnumValueMapMap($t) {
		return new haxe_ds_EnumValueMap();
	}
	static function toObjectMap($t) {
		return new haxe_ds_ObjectMap();
	}
	static function fromStringMap($map) {
		return $map;
	}
	static function fromIntMap($map) {
		return $map;
	}
	static function fromObjectMap($map) {
		return $map;
	}
	function __toString() { return '_Map.Map_Impl_'; }
}