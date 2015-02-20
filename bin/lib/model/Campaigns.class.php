<?php

class model_Campaigns extends sys_db_Object {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $campaign_id;
	public function json() {
		haxe_Json::phpJsonEncode($this, null, null);
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
	static function __meta__() { $args = func_get_args(); return call_user_func_array(self::$__meta__, $args); }
	static $__meta__;
	static $manager;
	function __toString() { return 'model.Campaigns'; }
}
model_Campaigns::$__meta__ = _hx_anonymous(array("obj" => _hx_anonymous(array("rtti" => (new _hx_array(array("oy4:namey18:vicidial_campaignsy7:indexesahy9:relationsahy7:hfieldsby11:campaign_idoR0R5y6:isNullfy1:tjy17:sys.db.RecordType:9:1i8ghy3:keyaR5hy6:fieldsar4hg")))))));
model_Campaigns::$manager = new sys_db_Manager(_hx_qtype("model.Campaigns"));
