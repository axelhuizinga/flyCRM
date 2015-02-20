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
	public $LIKE;
	public function find($param) {
		$result = model_Clients::$manager->unsafeObjects("SELECT * FROM vicidial_list WHERE (last_name LIKE " . _hx_string_or_null(sys_db_Manager::quoteAny("Ad%")) . " AND list_id BETWEEN 999 AND 2000) ORDER BY vendor_lead_code LIMIT 2", true);
		haxe_Log::trace($result, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 56, "className" => "model.Clients", "methodName" => "find")));
		haxe_Log::trace($result->length, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 57, "className" => "model.Clients", "methodName" => "find")));
		$c = null;
		$res = new _hx_array(array());
		if(null == $result) throw new HException('null iterable');
		$__hx__it = $result->iterator();
		while($__hx__it->hasNext()) {
			$c1 = $__hx__it->next();
			$res->push($c1->json());
		}
		return "{[\x0A" . _hx_string_or_null($res->join(",\x0A")) . "\x0A]}\x0A";
		return "dummy";
	}
	public function json() {
		$ret = new _hx_array(array());
		$it = $this->_manager->dbInfos()->hfields->iterator();
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
	static function create($param) {
		$self = new model_Clients();
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Clients.hx", "lineNumber" => 37, "className" => "model.Clients", "methodName" => "create")));
		return Reflect::callMethod($self, $param->get("action"), (new _hx_array(array($param))));
	}
	static $manager;
	function __toString() { return 'model.Clients'; }
}
model_Clients::$__meta__ = _hx_anonymous(array("obj" => _hx_anonymous(array("rtti" => (new _hx_array(array("oy4:namey13:vicidial_listy7:indexesahy9:relationsahy7:hfieldsby7:list_idoR0R5y6:isNullfy1:tjy17:sys.db.RecordType:5:0gy10:first_nameoR0R9R6fR7jR8:9:1i6gy4:cityoR0R10R6fR7jR8:9:1i6gy9:last_nameoR0R11R6fR7jR8:9:1i6gy8:address1oR0R12R6fR7jR8:9:1i6gy11:postal_codeoR0R13R6fR7jR8:9:1i6gy12:phone_numberoR0R14R6fR7jR8:9:1i6gy6:statusoR0R15R6fR7jR8:9:1i6gy4:LIKEoR0R16R6fR7jR8:9:1i4gy7:lead_idoR0R17R6fR7jR8:0:0gy16:vendor_lead_codeoR0R18R6fR7jR8:9:1i20gy20:last_local_call_timeoR0R19R6fR7jR8:11:0ghy3:keyaR17hy6:fieldsar22r4r6r10r12r8r14r16r18r26r24r20hg")))))));
model_Clients::$manager = new sys_db_Manager(_hx_qtype("model.Clients"));
