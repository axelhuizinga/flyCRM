<?php

class model_Input extends Model {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct(null);
	}}
	function __toString() { return 'model.Input'; }
}
