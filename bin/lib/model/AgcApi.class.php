<?php

class model_AgcApi extends Model {
	public function __construct($param = null) {
		if(!php_Boot::$skip_constructor) {
		parent::__construct($param);
	}}
	public $vicidialUser;
	public $vicidialPass;
	public $statuses;
	public function check4Update($param) {
		$lead_id = Std::parseInt($param->get("lead_id"));
		haxe_Log::trace(_hx_string_or_null(S::$host) . ":" . Std::string($lead_id), _hx_anonymous(array("fileName" => "AgcApi.hx", "lineNumber" => 30, "className" => "model.AgcApi", "methodName" => "check4Update")));
		return $this->json_response(_hx_array_get($this->query("SELECT state FROM vicidial_list WHERE lead_id=" . Std::string($lead_id)), 0));
	}
	public function external_dial($param) {
		$url = "http://xpress.mein-dialer.com/agc/api.php?source=flyCRM&user=" . _hx_string_or_null($this->vicidialUser) . "&pass=" . _hx_string_or_null($this->vicidialPass) . "&function=external_dial&search=NO&preview=NO&focus=NO&lead_id=" . _hx_string_or_null($param->get("lead_id")) . "&agent_user=" . _hx_string_or_null($param->get("agent_user"));
		haxe_Log::trace($url, _hx_anonymous(array("fileName" => "AgcApi.hx", "lineNumber" => 39, "className" => "model.AgcApi", "methodName" => "external_dial")));
		$agcResponse = haxe_Http::requestUrl($url);
		haxe_Log::trace($agcResponse, _hx_anonymous(array("fileName" => "AgcApi.hx", "lineNumber" => 41, "className" => "model.AgcApi", "methodName" => "external_dial")));
		return $this->json_response(((_hx_index_of($agcResponse, "SUCCESS", null) === 0) ? "OK" : $agcResponse));
	}
	public function external_hangup($param) {
		if($param->get("pause") === "Y") {
			haxe_Http::requestUrl("http://xpress.mein-dialer.com/agc/api.php?source=flyCRM&user=" . _hx_string_or_null($this->vicidialUser) . "&pass=" . _hx_string_or_null($this->vicidialPass) . "&function=external_pause&value=PAUSE&agent_user=" . _hx_string_or_null($param->get("agent_user")));
		}
		$url = "http://xpress.mein-dialer.com/agc/api.php?source=flyCRM&user=" . _hx_string_or_null($this->vicidialUser) . "&pass=" . _hx_string_or_null($this->vicidialPass) . "&function=external_hangup&value=1&agent_user=" . _hx_string_or_null($param->get("agent_user"));
		haxe_Log::trace($url, _hx_anonymous(array("fileName" => "AgcApi.hx", "lineNumber" => 50, "className" => "model.AgcApi", "methodName" => "external_hangup")));
		$agcResponse = haxe_Http::requestUrl($url);
		haxe_Log::trace($agcResponse, _hx_anonymous(array("fileName" => "AgcApi.hx", "lineNumber" => 52, "className" => "model.AgcApi", "methodName" => "external_hangup")));
		if(_hx_index_of($agcResponse, "SUCCESS", null) === 0) {
			if(Util::any2bool($param->get("dispo"))) {
				return $this->external_status($param);
			} else {
				$campaign_id = S::$my->real_escape_string($param->get("campaign_id"));
				$sql = "(SELECT `status`,`status_name` FROM `vicidial_statuses` WHERE `selectable`=\"Y\") UNION (SELECT `status`,`status_name` FROM `vicidial_campaign_statuses` WHERE `selectable`=\"Y\" AND campaign_id=\"" . _hx_string_or_null($campaign_id) . "\") ORDER BY `status`";
				$this->data = _hx_anonymous(array("response" => "OK", "choice" => $this->query($sql)));
				return $this->json_encode();
			}
		}
		return $this->json_response($agcResponse);
	}
	public function external_status($param) {
		$status = $param->get("dispo");
		$url = "http://xpress.mein-dialer.com/agc/api.php?source=flyCRM&user=" . _hx_string_or_null($this->vicidialUser) . "&pass=" . _hx_string_or_null($this->vicidialPass) . "&function=external_status&value=" . _hx_string_or_null($status) . "&agent_user=" . _hx_string_or_null($param->get("agent_user"));
		haxe_Log::trace($url, _hx_anonymous(array("fileName" => "AgcApi.hx", "lineNumber" => 78, "className" => "model.AgcApi", "methodName" => "external_status")));
		$agcResponse = haxe_Http::requestUrl($url);
		return $this->json_response(((_hx_index_of($agcResponse, "SUCCESS", null) === 0) ? "OK" : $agcResponse));
	}
	public function update_fields_x($param) {
		$state = $param->get("state");
		$lead_id = Std::parseInt($param->get("lead_id"));
		$agcResponse = S::$my->query("UPDATE vicidial_list SET state=\"" . _hx_string_or_null($state) . "\" WHERE lead_id=" . Std::string($lead_id), null);
		return $this->json_response(model_AgcApi_0($this, $agcResponse, $lead_id, $param, $state));
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
		$self = new model_AgcApi(null);
		$self->vicidialUser = S::$vicidialUser;
		$self->vicidialPass = S::$vicidialPass;
		return Reflect::callMethod($self, Reflect::field($self, $param->get("action")), (new _hx_array(array($param))));
	}
	function __toString() { return 'model.AgcApi'; }
}
function model_AgcApi_0(&$__hx__this, &$agcResponse, &$lead_id, &$param, &$state) {
	if($agcResponse) {
		return "OK";
	} else {
		return S::$my->error;
	}
}
