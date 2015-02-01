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
		<div  class="bgBox">
			<div  id="mtabs" class="app">
			  <ul class="template">
				  <li><a href="#{link}">{label}</a></li>
			  </ul>			
			</div>
			<div id="ContextMenu" class="app menu-right">
				<ul class="template">
					<li><a href="{link}">{label}</a></li>
				</ul>			
			</div>	
		</div>	

		<script>
		var config = 
		{
			appName:"flyCRM",
			views:
			[
				{
					TabBox:
					{
						id:"mtabs",
						action:"<?php echo $action;?>",
						params:<?php echo $params;?>,
						tabs:
						[
							{
								link:"clients",
								label:"Mitglieder",
								onclick:"go"
							},
							{
								link:"campaigns",
								label:"Kampagnen",
								onclick:"go"
							},	
							{
								link:"stats",
								label:"Statistik",
								onclick:"go"
							},
							{
								link:"settings",
								label:"Einstellungen",
								onclick:"go"
							}		
						],
						heightStyle: "fill"
					}
				}
			]
		}
		</script>
		<script src="js/jquery.min.js"></script>
		<script src="js/jquery-ui.js"></script>
		<script src="js/debugJq.js"></script>
		<script src="js/stacktrace.js"></script>
		<script src="flyCRM.js"></script>

	</body>
</html>
