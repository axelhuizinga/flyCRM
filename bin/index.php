<?php

	require("php/functions.php");
	//edump($_SERVER);
	$basePath = preg_replace("/index.php$/", "", $_SERVER['PHP_SELF']);
	$base = "{$_SERVER['REQUEST_SCHEME']}://{$_SERVER['SERVER_NAME']}$basePath";
	$actionPath = preg_replace("|^{$basePath}|", "", $_SERVER['REQUEST_URI']);
	$action = $actionParam = '';
	if ($actionPath)
	{
		$actionParam = preg_split("/\//", $actionPath);
		#edump($actionParam);
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
			<li><a href="${id}" rel="pushstate">${label}</a></li>								
		</script>
		
		<!-- DATETIME -->
		
		<script type="text/x-jquery-tmpl"  id="t-datetime" >					
			<li id="datetime" class="tabs-header" >${datetime}</li>			
		</script>
		
		<!-- QC TAB -->
	
		<script type="text/x-jquery-tmpl"  id="t-qc">
			<div id="qc"  class="tabContent" >
				<form  id="qc-list-anchor" action="qc" class="main-left">
				</form>
			</div>
		</script>
		
		<!--  QC LIST -->
		
		<script type="text/x-jquery-tmpl"  id="t-qc-list">
		
			<table id="qc-list">
				${($data.oddi=0,'')}
				<tr class="headrow" >
				{{each(i,v) $data.fields}}
					
					<th data-order="${v}" >${fieldNames[v]}</th>
					
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
		
		<!-- QC MENU -->
		
		<script type="text/x-jquery-tmpl" id="t-qc-menu">		
			<div id="qc-menu" class="menu-right">
			{{each(i,v) $data.items}}
				<h3>${v.label}</h3>
				<div>
					<form >
						<input type="hidden" name="action" value="${action}">						
							{{each(fi,fv) v.fields}}					
							{{if rangeFields[fv]}}
							<div class="lh32">
								<div class="lpad" >${rangeLabels.from}</div>
								<input type="text" size="11" name="range_from_${fv}" class="datepicker"  >							
							</div>
							<div class="lh32">
								<div class="lpad" >${rangeLabels.to}</div>
								<input type="text" size="11" name="range_to_${fv}" class="datepicker" >							
							</div>							
							{{else}}
							<div class="lh32">
								<div class="lpad" >${fieldNames[fv]}</div>
								<div class="rpad" >{{tmpl(fv) "#t-find-match"}}</div>
								<input type="${ fieldTypes[fv] ? fieldTypes[fv] : 'text' }" name="${fv}" class="menu-input-right">							
							</div>							
							{{/if}}							
							{{/each}}
							<div class="clear">.</div>			
						{{each(bi,bv) v.buttons}}
						<button data-action="${bi}">${bv}</button>
						{{/each}}
					</form>
				</div>
			{{/each}}	
			</div>	
		</script>		
		
		<!-- MEMBERS TAB -->
	
		<script type="text/x-jquery-tmpl"  id="t-clients">
			<div id="clients" class="tabContent" >
				<form  id="clients-list-anchor" action="clients" class="main-left">
				</form>
			</div>
		</script>
		
		<!--  MEMBERS LIST data-direction="ASC"-->
		
		<script type="text/x-jquery-tmpl"  id="t-clients-list">
		
			<table id="clients-list">
				${($data.oddi=0,'')}
				<tr class="headrow" >
				{{each(i,v) $data.fields}}
					
					<th data-order="${v}" >${fieldNames[v]}</th>
					
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
						{{each(fi,fv) v.fields}}					
							{{if rangeFields[fv]}}
							<div class="lh32">
								<div class="lpad" >${rangeLabels.from}</div>
								<input type="text" size="11" name="range_from_${fv}" class="datepicker"  >							
							</div>
							<div class="lh32">
								<div class="lpad" >${rangeLabels.to}</div>
								<input type="text" size="11" name="range_to_${fv}" class="datepicker" >							
							</div>							
							{{else}}
							<div class="lh32">
								<div class="lpad" >${fieldNames[fv]}</div>
								<div class="rpad" >{{tmpl(fv) "#t-find-match"}}</div>
								<input type="${ fieldTypes[fv] ? fieldTypes[fv] : 'text' }" name="${fv}" class="menu-input-right">							
							</div>							
							{{/if}}							
							{{/each}}
							<div class="clear">.</div>						
						{{each(bi,bv) v.buttons}}
						<button data-action="${bi}">${bv}</button>
						{{/each}}
					</form>
				</div>
			{{/each}}	
			</div>	
		</script>
		
		<script type="text/x-jquery-tmpl" id="t-find-match">
			<select name="${$item.data}_match_option"  class="menu-end-right">
			{{each(i,v) matchOptions}}
				<option value="${i}" title="${v}" >${v.substr(0,1)}</option>
			{{/each}}
			</select>
		</script>
		
		<!-- CAMPAIGNS TAB -->
	
		<script type="text/x-jquery-tmpl"  id="t-campaigns">
			<div id="campaigns"  class="tabContent" >
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
		<!-- CAMPAIGNS MENU {{each(oi,ov) sv.options}}
							<option value="${ov.value}">${ov.label}</option>
							{{/each}}size="${sv.options.length>0&&sv.options.length<15 ? sv.options.length :2}"-->
		
		<script type="text/x-jquery-tmpl" id="t-campaigns-menu">		
			<div id="campaigns-menu" class="menu-right">
			{{each(i,v) $data.items}}
				<h3>${v.label}</h3>
				<div>
					<form >
						<input type="hidden" name="action" value="${action||''}">
						{{each(si,sv) v.Select}}
						<div class="menuTable" >
							<select name="${sv.name}" ${sv.multi ? 'multiple="multiple"':''} id="campaigns-menu_${sv.name}" >							
							</select>						
						</div>	

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
		
		<!-- SELECT  OPTIONS TEMPLATE ${trace($item)}-->
		<script type="text/x-jquery-tmpl" id="t-campaign_id">
			{{each(i,v) $data.rows}}
			<option value="${v.campaign_id}">${v.campaign_name}</option>
			{{/each}}
		</script>
		<script src="js/stacktrace.js"></script>		
		<script src="js/debugJq.js"></script>		
		<script src="js/jquery-2.1.3.js"></script>
		<script src="js/jquery-ui.js"></script>
		<script src="js/datepicker-de.js"></script>
		<!--<script src="js/jquery.jeditable.js"></script>
		<script src="js/jquery.jeditable.datepicker.js"></script>-->
		<script src="js/jquery.tmpl.js"></script>
	

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
