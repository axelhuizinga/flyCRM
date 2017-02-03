<?php
/**
 * Generated by Haxe 3.4.0
 */

namespace sys\net;

use \php\Boot;
use \php\_Boot\HxString;

class Host {
	/**
	 * @var string
	 */
	public $_ip;
	/**
	 * @var string
	 */
	public $host;
	/**
	 * @var int
	 */
	public $ip;


	/**
	 * @param string $name
	 * 
	 * @return void
	 */
	public function __construct ($name) {
		$this->host = $name;
		if ((new \EReg("^(\\d{1,3}\\.){3}\\d{1,3}\$", ""))->match($name)) {
			$this->_ip = $name;
		} else {
			$this->_ip = gethostbyname($name);
			if ($this->_ip === $name) {
				$this->ip = 0;
				return;
			}
		}
		$p = HxString::split($this->_ip, ".");
		$this->ip = intval(sprintf("%02X%02X%02X%02X", ($p->arr[3] ?? null), ($p->arr[2] ?? null), ($p->arr[1] ?? null), ($p->arr[0] ?? null)), 16);
	}
}


Boot::registerClass(Host::class, 'sys.net.Host');
