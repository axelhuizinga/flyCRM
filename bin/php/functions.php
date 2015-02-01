<?php
	
	function array2json($arr)
	{
		$json = '[';
		if($arr)
			foreach($arr as $a)
				$json .= sprintf ('"%s"', $a);
		$json .= ']';
		return $json;
	}
	
	function edump($m, $stackPos=0)
	{
		#return;
		global $syncLog;
		if(!is_string($m))
			$m = print_r($m,1);
		$m = preg_replace("/\r\n|\n/", '', $m);
		$dump = debug_backtrace();
		$file = basename($dump[$stackPos]['file']);
		$dumpBuf = "$file::{$dump[$stackPos]['line']}: $m";
		if(isset($_SERVER['argc']))
			file_put_contents($syncLog,"$dumpBuf\n",FILE_APPEND);
			#echo "$dumpBuf\n";
		else
			error_log($dumpBuf);
	}

?>