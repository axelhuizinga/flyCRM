<?php
/**
 * Generated by Haxe 3.4.0
 */

namespace php\_Boot;

use \haxe\ds\StringMap;
use \php\Boot;

class HxEnum {
	/**
	 * @var StringMap
	 */
	static public $singletons;


	/**
	 * @var int
	 */
	public $index;
	/**
	 * @var mixed
	 */
	public $params;
	/**
	 * @var string
	 */
	public $tag;


	/**
	 * @param string $enumClass
	 * @param string $tag
	 * @param int $index
	 * 
	 * @return HxEnum
	 */
	static public function singleton ($enumClass, $tag, $index) {
		$key = "" . ($enumClass??'null') . "::" . ($tag??'null');
		$instance = (HxEnum::$singletons->data[$key] ?? null);
		if ($instance === null) {
			$tmp = $enumClass;
			$instance = new $tmp($tag, $index);
			HxEnum::$singletons->data[$key] = $instance;
		}
		return $instance;
	}


	/**
	 * @param string $tag
	 * @param int $index
	 * @param mixed $arguments
	 * 
	 * @return void
	 */
	public function __construct ($tag, $index, $arguments = null) {
		$this->tag = $tag;
		$this->index = $index;
		$tmp = null;
		if ($arguments === null) {
			$tmp = [];
		} else {
			$tmp = $arguments;
		}
		$this->params = $tmp;
	}


	/**
	 * @return string
	 */
	public function __toString () {
		$result = $this->tag;
		if (count($this->params) > 0) {
			$result = ($result??'null') . (("(" . (implode(",", array_map(function ($item) {
				return Boot::stringify($item);
			}, $this->params))??'null') . ")")??'null');
		}
		return $result;
	}


	/**
	 * @return string
	 */
	public function toString () {
		return $this->__toString();
	}


	/**
	 * @internal
	 * @access private
	 */
	static public function __hx__init ()
	{
		static $called = false;
		if ($called) return;
		$called = true;


		self::$singletons = new StringMap();
	}
}


Boot::registerClass(HxEnum::class, 'php._Boot.HxEnum');
HxEnum::__hx__init();
