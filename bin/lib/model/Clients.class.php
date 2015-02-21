<?php

class model_Clients extends sys_db_Object {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $lead_id;
	public $list_id;
	public $first_name;
	public $last_name;
	public $address1;
	public $city;
	public $postal_code;
	public $phone_number;
	public $status;
	public $last_local_call_time;
	public $vendor_lead_code;
	public function find($param) {
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 37, "className" => "model.Clients", "methodName" => "find")));
		$where = null;
		$where = $param->get("where");
		$whereObj = Model::param2obj($where);
		haxe_Log::trace($whereObj, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 40, "className" => "model.Clients", "methodName" => "find")));
		$result = model_Clients::$manager->dynamicSearch($whereObj, null);
		haxe_Log::trace($result, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 45, "className" => "model.Clients", "methodName" => "find")));
		haxe_Log::trace($result->length, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 46, "className" => "model.Clients", "methodName" => "find")));
		$c = null;
		$res = new _hx_array(array());
		if(null == $result) throw new HException('null iterable');
		$__hx__it = $result->iterator();
		while($__hx__it->hasNext()) {
			unset($c1);
			$c1 = $__hx__it->next();
			$res->push($c1->json());
		}
		return "{[\x0A" . _hx_string_or_null($res->join(",\x0A")) . "\x0A]}\x0A";
		return "dummy";
	}
	public function json() {
		$ret = new _hx_array(array());
		$it = null;
		{
			$this1 = $this->_manager->dbInfos()->hfields;
			$it = $this1->iterator();
		}
		while($it->hasNext()) {
			$rf = $it->next();
			if(Model::quoteIf($rf->t)) {
				$ret->push(_hx_string_or_null($rf->name) . ":\"" . _hx_string_or_null(((($rf->isNull) ? "\"" : Reflect::field($this, $rf->name)))) . "\"");
			} else {
				$ret->push(_hx_string_or_null($rf->name) . ":" . Std::string(Reflect::field($this, $rf->name)));
			}
			unset($rf);
		}
		return "{\x0A" . _hx_string_or_null($ret->join(",\x0A")) . "\x0A}";
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
	function __toString() { return 'model.Clients'; }
}
model_Clients::$__meta__ = _hx_anonymous(array("obj" => _hx_anonymous(array("rtti" => (new _hx_array(array("oy4:namey13:vicidial_listy7:indexesahy9:relationsahy7:hfieldsby7:list_idoR0R5y6:isNullfy1:tjy17:sys.db.RecordType:5:0gy10:first_nameoR0R9R6fR7jR8:9:1i6gy4:cityoR0R10R6fR7jR8:9:1i6gy9:last_nameoR0R11R6fR7jR8:9:1i6gy8:address1oR0R12R6fR7jR8:9:1i6gy11:postal_codeoR0R13R6fR7jR8:9:1i6gy12:phone_numberoR0R14R6fR7jR8:9:1i6gy6:statusoR0R15R6fR7jR8:9:1i6gy7:lead_idoR0R16R6fR7jR8:0:0gy16:vendor_lead_codeoR0R17R6fR7jR8:9:1i20gy20:last_local_call_timeoR0R18R6fR7jR8:11:0ghy3:keyaR16hy6:fieldsar20r4r6r10r12r8r14r16r18r24r22hg")))))));
model_Clients::$manager = new model_SManager(_hx_qtype("model.Clients"));
