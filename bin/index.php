<?php
	//echo(getcwd());
	require("php/config/config.inc.php");
	require("php/functions.php");
	//edump($_SERVER);
	$basePath = preg_replace("/index.php$/", "", $_SERVER['PHP_SELF']);
	$base = "{$_SERVER['REQUEST_SCHEME']}://{$_SERVER['SERVER_NAME']}$basePath";
	$actionPath = preg_replace("|^{$basePath}|", "", $_SERVER['REQUEST_URI']);
	$action = $actionParam = '';
	if ($actionPath)
	{
		$actionParam = preg_split("/\//", $actionPath);
		$action = array_pop($actionParam);
		edump($actionParam);
		#exit(printf("<div><pre>%s</pre></div>",print_r($actionParam,1)));
	}
	$params = array2json($actionParam);

?>
<!DOCTYPE html>
<html lang="de">
  	<head>
    	<meta charset="utf-8">
		<link rel="stylesheet" href="css/jquery-ui.css">
		<link rel="stylesheet" href="css/app.css">
		<base href="<?php echo $base;?>">
	</head>
	<body>
	<!-- MAIN APP SCREEN -->
		<div  class="bgBox" id="bgBox">
			<div  id="mtabs" >
				<ul ></ul>
			</div>
		</div>
		
		<!-- MAIN TABS -->
		<script type="text/html" id="t-mtabs">						
			<li><a href="${link}" rel="pushstate">${label}</a></li>								
		</script>
		
		<!-- DATETIME -->		
		<script type="text/html"  id="t-datetime" >					
			<li id="datetime" class="tabs-header" >${datetime}</li>			
		</script>
		
		<!-- MEMBERS TAB -->
		<script type="text/html"  id="t-clients">
			<div id="clients">
				<form action="clients">										
					<table >
					{{each(i,v) clients}}
						<tr id="${vendor_lead_code}" class="${i % 2 ? 'odd' : 'even'}">
						{{each(i,v) fields}}
								{{if fieldFormats[v]}}
							<td><input type="${type}" name="${field}" class="app-right" </li>	
								{{else}}
							<li><span>${fieldNames[v]}</span><input type="{{= ${type}|'text'}}" name="${field}" ></li>
								{{/if}}
							{{/each}}
						</tr>
					{{/each}}
					</table>
				</form>
			</div>
		</script>
		
			<!-- MEMBERS MENU -->
			
		<script type="text/html" id="t-clients.menu">
			<div id="clients.menu">
				<h3>${label}</h3>
				<div>
					<form action="clients" >
						<input type="hidden" name="action" value="${action}">
						<ul >
							{{each(i,v) fields}}
							<li><span>${fieldNames[v]}</span><input type="${ fieldTypes[v] ? fieldTypes[v] : 'text' }" name="${v}" class="app-right"> </li>
							{{/each}}
						</ul>
					</form>
				</div>
			</div>	
		</script>
		

		
		<script src="js/jquery-2.1.3.min.js"></script>
		<script src="js/jquery-ui.js"></script>
		<script src="js/jquery.tmpl.js"></script>
		<script src="js/debugJq.js"></script>
		<script src="js/stacktrace.js"></script>
		<script src="js/sprintf.min.js"></script>
		<script src="flyCRM.js"></script>
		<script src="uiData.js"></script>			
		<script 	>
		$(document).ready(function()
		{
			uiData.basePath="<?php echo $basePath;?>";
			uiData.action="<?php echo $action;?>";
			uiData.params="<?php echo $params;?>";
			initApp(uiData);
		});
		</script>
	</body>
</html>
