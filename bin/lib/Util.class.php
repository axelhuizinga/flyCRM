<?php

class Util {
	public function __construct(){}
	static function any2bool($v) {
		return true ==$v;
	}
	static function copyStringMap($source) {
		$copy = new haxe_ds_StringMap();
		$keys = $source->keys();
		while($keys->hasNext()) {
			$k = $keys->next();
			$copy->set($k, $source->get($k));
			unset($k);
		}
		return $copy;
	}
	function __toString() { return 'Util'; }
}
