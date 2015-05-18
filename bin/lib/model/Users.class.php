<?php

class model_Users extends Model {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function get_info($user = null) {
		$sb = new StringBuf();
		$phValues = new _hx_array(array());
		$result = new _hx_array(array());
		$param = new haxe_ds_StringMap();
		$param->set("table", "vicidial_users");
		$param->set("fields", "user,user_level, pass,full_name");
		$param->set("where", model_Users_0($this, $param, $phValues, $result, $sb, $user));
		$param->set("limit", "50");
		$userMap = $this->doSelect($param, $sb, $phValues);
		{
			$_g1 = 0;
			$_g = $this->num_rows;
			while($_g1 < $_g) {
				$n = $_g1++;
				$result->push(_hx_anonymous(array("user" => $userMap[$n]["user"], "full_name" => $userMap[$n]["full_name"])));
				unset($n);
			}
		}
		return $result;
	}
	function __toString() { return 'model.Users'; }
}
function model_Users_0(&$__hx__this, &$param, &$phValues, &$result, &$sb, &$user) {
	if($user === null) {
		return "user_group|AGENTS_A";
	} else {
		return "user|" . _hx_string_or_null($user);
	}
}
