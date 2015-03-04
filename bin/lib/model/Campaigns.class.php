<?php

class model_Campaigns extends Model {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $campaign_id;
	public function findLeads($q) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$fields = $q->get("fields");
		$sb->add("SELECT " . _hx_string_or_null(((($fields !== null) ? $this->fieldFormat(_hx_explode(",", $fields)->map(array(new _hx_lambda(array(&$fields, &$phValues, &$q, &$sb), "model_Campaigns_0"), 'execute'))->join(",")) : "*"))));
		$sb->add(" FROM  `vicidial_list` WHERE `list_id` IN( SELECT `list_id` FROM vicidial_lists ");
		$where = $q->get("where");
		if($where !== null) {
			$this->buildCond($where, $sb, $phValues);
		}
		$sb->add(")");
		$order = $q->get("order");
		if($order !== null) {
			$this->buildOrder($order, $sb);
		}
		$limit = $q->get("limit");
		$this->buildLimit((($limit === null) ? "15" : $limit), $sb);
		$this->data = _hx_anonymous(array("rows" => $this->execute($sb->b, $q, $phValues)));
		return $this->json_encode();
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
	static function create($param) {
		$self = new model_Campaigns();
		$self->table = "vicidial_campaigns";
		haxe_Log::trace($param, _hx_anonymous(array("fileName" => "Campaigns.hx", "lineNumber" => 21, "className" => "model.Campaigns", "methodName" => "create")));
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.Campaigns'; }
}
function model_Campaigns_0(&$fields, &$phValues, &$q, &$sb, $f) {
	{
		return S::$my->real_escape_string($f);
	}
}
