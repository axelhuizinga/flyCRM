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
		edump($actionParam);
		$action = array_pop($actionParam);
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
		
		<script type="text/x-jquery-tmpl" id="t-mtabs">						
			<li><a href="${link}" rel="pushstate">${label}</a></li>								
		</script>
		
		<!-- DATETIME -->
		
		<script type="text/x-jquery-tmpl"  id="t-datetime" >					
			<li id="datetime" class="tabs-header" >${datetime}</li>			
		</script>
		
		<!-- MEMBERS TAB -->
	
		<script type="text/x-jquery-tmpl"  id="t-clients">
			<div id="clients">
				<form  id="clients-list-anchor" action="clients" class="main-left">
				</form>
			</div>
		</script>
		
		<!--  MEMBERS LIST -->
		
		<script type="text/x-jquery-tmpl"  id="t-clients-list">
		
			<table id="clients-list">
				${($data.oddi=0,'')}
				<tr class="headrow" >
				{{each(i,v) $data.fields}}
					
					<th data-order="${v}">${fieldNames[v]}</th>
					
				{{/each}}
				</tr>
				{{each(i,v) $data.rows}}
					<tr id="${v.vendor_lead_code}" class="${((i+1) % 2 ? 'odd' : 'even')}">
					{{each(ri,rv) v}}
						
							{{if displayFormats[ri]}}
						<td data-name="${ri}" >${sprintf(displayFormats[ri],rv)}</td>	
							{{else}}
						<td data-name="${ri}" >${rv}</td>	
							{{/if}}
					{{/each}}
					</tr>
				{{/each}}
			</table>		
		</script>
		
		<!-- MEMBERS MENU -->
		
		<script type="text/x-jquery-tmpl" id="t-clients-menu">		
			<div id="clients-menu" class="menu-right">
			{{each(i,v) $data.items}}
				<h3>${v.label}</h3>
				<div>
					<form >
						<input type="hidden" name="action" value="${action}">						
						{{html v.fields ? '<ul >':''}}
							{{each(fi,fv) v.fields}}
							<li >
								<span>${fieldNames[fv]}</span>
								{{tmpl(fv) "#t-find-match"}}
								<input type="${ fieldTypes[fv] ? fieldTypes[fv] : 'text' }" name="${fv}" class="app-right">

							</li>
							{{if rangeFields[fv]}}
							<li>
								<span>${rangeLabels.from}</span>
								<input type="${ fieldTypes[fv] ? fieldTypes[fv] : 'button' }" name="range_from_${fv}" class="datepicker" value="${appLabel.select}" >
							</li>
							<li>
								<span>${rangeLabels.to}</span>
								<input type="${ fieldTypes[fv] ? fieldTypes[fv] : 'button' }" name="range_to_${fv}" class="datepicker" value="${appLabel.select}" >								
							</li>
							{{/if}}							
							{{/each}}
						{{html v.fields ? '</ul>':''}}						
						{{each(bi,bv) v.buttons}}
						<button data-action="${bi}">${bv}</button>
						{{/each}}
					</form>
				</div>
			{{/each}}	
			</div>	
		</script>
		
		<script type="text/x-jquery-tmpl" id="t-find-match">
			<select name="${$item.data}_match_option"  class="end-right">
			{{each(i,v) matchOptions}}
				<option value="${i}" title="${v}" >${v.substr(0,1)}</option>
			{{/each}}
			</select>
		</script>
		
		<!-- CAMPAIGNS TAB -->
	
		<script type="text/x-jquery-tmpl"  id="t-campaigns">
			<div id="campaigns">
				<form  id="campaigns-list-anchor" action="campaigns" class="main-left">
				</form>
			</div>
		</script>
		
		<!--  CAMPAIGNS LEAD RESULTS LIST -->
		
		<script type="text/x-jquery-tmpl"  id="t-campaigns-list">
		
			<table id="campaigns-list">
				${($data.oddi=0,'')}
				<tr class="headrow" >
				{{each(i,v) $data.fields}}
					
					<th data-order="${v}">${fieldNames[v]}</th>
					
				{{/each}}
				</tr>
				{{each(i,v) $data.rows}}
					<tr id="${v.vendor_lead_code}" class="${((i+1) % 2 ? 'odd' : 'even')}">
					{{each(ri,rv) v}}
						
							{{if displayFormats[ri]}}
						<td data-name="${ri}" >${sprintf(displayFormats[ri],rv)}</td>	
							{{else}}
						<td data-name="${ri}" >${rv}</td>	
							{{/if}}
					{{/each}}
					</tr>
				{{/each}}
			</table>		
		</script>
		
		<!-- CAMPAIGNS MENU -->
		
		<script type="text/x-jquery-tmpl" id="t-campaigns-menu">		
			<div id="campaigns-menu" class="menu-right">
			{{each(i,v) $data.items}}
				<h3>${v.label}</h3>
				<div>
					<form >
						<input type="hidden" name="action" value="${action||''}">
						{{each(si,sv) v.Select}}
						<select class="menuTable" name="${sv.name}" ${sv.multi ? 'multiple':''} id="campaigns-menu_${sv.name}"
							size="${sv.options.length>0&&sv.options.length<15 ? sv.options.length :1}">
							{{each(oi,ov) sv.options}}
							<option value="${ov.value}">${ov.label}</option>
							{{/each}}
						</select>
						<div class="menuTable" >
							{{each(ci,cv) sv.check}}
							<span class="label">${cv.label?cv.label:appLabel[cv.name]}</span>
							<input type="checkbox" checked="${cv.checked}" name="${cv.name}">
							{{/each}}
						</div>	
						{{/each}}						
						{{each(bi,bv) v.buttons}}
						<button data-action="${bi}">${bv}</button>
						{{/each}}
					</form>
				</div>
			{{/each}}	
			</div>	
		</script>
		
		<!-- SELECT  OPTIONS TEMPLATE -->
		<script type="text/x-jquery-tmpl" id="t-options">
			${trace($item)}
			<option value="${$item.value}">${$item.label}</option>
		</script>
		
		<script src="js/jquery-2.1.3.js"></script>
		<script src="js/jquery-ui.min.js"></script>
		<script src="js/datepicker-de.js"></script>
		<script src="js/jquery.tmpl.js"></script>
		<script src="js/debugJq.js"></script>
		<script src="js/stacktrace.js"></script>
		<script src="js/sprintf.min.js"></script>
		<script src="flyCRM.js"></script>
		<script src="appData.js"></script>			
		<script 	>
		$(document).ready(function()
		{
			uiData.basePath="<?php echo $basePath;?>";
			uiData.action="<?php echo $action;?>";
			uiData.params="<?php echo $params;?>";
			initApp(uiData);
		});
		
		function trace(m) {
			//console.log(el)
			//dumpObject(el.nodes, 1)
			console.log(m);
			//console.log('rows:' + $(el).siblings().length);
			return '';
		}
		
		
		
		</script>
	</body>
</html>
