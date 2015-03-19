<?php

	require("php/functions.php");
	//edump($_SERVER);
	session_start();
	$user = (isset($_SESSION['PHP_AUTH_USER']) ? $_SESSION['PHP_AUTH_USER'] : 'NONO');
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
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=0">
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
		
		<!--  QC LIST -  {{if $data.hidden  && $data.fields.indexOf($data.hidden) >-1}}-->
		
		<script type="text/x-jquery-tmpl"  id="t-qc-list">
		
			<table id="qc-list">
				<tr class="headrow" >
				{{each(i,v) $data.fields}}
					{{if v!=$data.primary_id && !has($data.hidden,v)}}
					 <th data-order="${v}">${fieldNames[v]}</th>
					{{/if}}
				{{/each}}
				</tr>
				{{each(i,v) $data.rows}}					
					<tr id="${v[$data.primary_id]}" class="${((i+1) % 2 ? 'odd' : 'even')}" ${data($data.hidden,v)} >
					{{each(ri,rv) v}}
						{{if ri!=$data.primary_id && !has($data.hidden,ri)}}
							{{if displayFormats[ri] }}
						<td data-name="${ri}" >${sprintf(displayFormats[ri],rv)}</td>												
							{{else}}
						<td data-name="${ri}" >${rv}</td>	
							{{/if}}
						{{/if}}
					{{/each}}
					</tr>
				{{/each}}
			</table>		
		</script>
		
		<!-- QC EDITOR -->
		
		<script type="text/x-jquery-tmpl"  id="t-qc-editor">
		<div id="overlay" class="overlay-left">
			<form  id="qc-edit-form" action="qc" class="main-left">
			{{each(i,v) $data.rows}}
				<table id="qc-edit-data-${i}">
				{{each(k,val) v}}
				<tr>
					<td>{{html $data.fieldNames[k]}}:</td>
					<td>
					{{if $data.typeMap[k] == 'TEXT' || $data.typeMap[k] == 'READONLY' }}
					<input name="${k}" value="${val}" {{if $data.typeMap[k] == 'READONLY'}}readonly="readonly"{{/if}}>
					{{else $data.typeMap[k] == 'AREA'}}
					<textarea name="${k}">${val}</textarea>
					{{else $data.typeMap[k] == 'SELECT'}}
					<select name="${k}" >
					{{each(oi, ov) $data.optionsMap[k]}}
						<option value="${ov[0]}" {{if ov[0]==val}}selected="selected"{{/if}}>${ov[1]}</option>
					{{/each}}
					</select>
					{{else $data.typeMap[k] == 'RADIO'}}
					{{each(oi, ov) $data.optionsMap[k]}}
						<input type="radio" name="${k}[]"  value="${ov[0]}" {{if ov[0]==val}}checked="checked"{{/if}}><span class="optLabel">${ov[1]}</span>
					{{/each}}
					{{/if}}
					</td>
				</tr>
				{{/each}}
				</table>
			</form>
			{{/each}}
		</div>
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
							<div class="clear"> </div>			
						{{each(bi,bv) v.buttons}}
						<button data-endaction="${bi}">${bv}</button>
						{{/each}}
						<br>
					</form>
				</div>
			{{/each}}	
			</div>	
		</script>
				
		<!-- QC MENU RECORDINGS ${trace($data)} ${trace(v)}-->
		<script type="text/x-jquery-tmpl"  id="t-qc-recordings">
			<div class="recordings"  >			
			{{each(i,v) $data.recordings}}
			${trace(v)}
				<span class="label">${v.start_time} </span><br>
				<audio controls>
					<source src="/RECORDINGS/MP3/${v.filename}" type="audio/mpeg">
				</audio><br>
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
						<button data-endaction="${bi}">${bv}</button>
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
		<!--  {{each(oi,ov) sv.options}}
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
						<button data-endaction="${bi}">${bv}</button>
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
		
		<!-- SELECT  WAIT SCREEN TEMPLATE -->
		<script type="text/x-jquery-tmpl" id="t-wait">		
			<div id="wait" class="overlay">
			${trace($data)}
				<div id="wait-content" class="content">
					<h3>${$data.wait}</h3>
					
				</div>
			</div>
		</script>
		<script src="js/LAB.src.js"></script>
		<!--<script src="js/jquery-2.1.3.min.js"></script>
		<script src="js/stacktrace.js"></script>		
		<script src="js/debugJq.js"></script>		
		
		<script src="js/jquery-ui.js"></script>
		<script src="js/datepicker-de.js"></script>
		<script src="js/jquery.tmpl.js"></script>
		<script src="js/spin.min.js"></script>
		<script src="js/sprintf.min.js"></script>
		<script src="flyCRM.js"></script>
		<script src="appData.js"></script>		-->	
		<script 	>
			$LAB.setGlobalDefaults({Debug:true})
		//var loader;
		//$(document).ready(function()
		//{
			/*if(1)loadScript([*/
			//loader = spin('mtabs');
			//loader = $('<table style="height:100%;width:100%;margin:auto;position:absolute;top:0px;"><tr><td style="text-align:center"><img style="margin:auto;" src="design/loading2.gif"></td><tr></table>').appendTo('body');
			//$LAB
			.script('js/jquery-2.1.3.js.gz').
			script('js/stacktrace.js.gz').
			script('js/debugJq.js.gz').
			script('js/jquery-ui.min.js.gz').
			script('flyCRM.js').
			script('js/jquery.tmpl.js.gz').
			script('js/sprintf.min.js.gz').
			script('js/spin.min.js.gz').
			script('appData.js').
			script('js/run.js').wait();
			/*script('js/datepicker-de.js.gz').
			
			script('flyCRM.js.gz').wait(function()
			{
				console.log('should be done...');
				initApp(uiData);
				$('#loader').remove();
			});
			*/
			//])});
			
		
		
		function loadScript(urls)
		{
			$.getScript(urls.shift(), function(data, textStatus, jqxhr)
			{
				if (urls.length>0) {
					loadScript(urls);					
				}
				else{
					uiData.basePath="<?php echo $basePath;?>";
					uiData.action="<?php echo $action;?>";
					uiData.params="<?php echo $params;?>";
					uiData.user="<?php echo $user;?>";
					initApp(uiData);
					loader.remove();
				}
			});
		}
		
		function trace(m) {
			//console.log(el)
			//dumpObject(el.nodes, 1)
			console.log(m);
			//console.log('rows:' + $(el).siblings().length);
			return '';
		}
		
		function spin(id) {
			trace(id);
			return new Spinner(
			{
				direction:-1,
				zIndex:0
			}).spin(document.getElementById(id));
		}
		
		function data(keyNames,data) {
			var keys = keyNames.split(',');
			var ret = new Array();
			for(k in keys)
			{
				if (data[keys[k]]) {
					ret.push( 'data-' + keys[k] + '=' + data[keys[k]] );
				}
			}
			return ret.join(' ');
		}
		
		function has(keyNames,key) {
		//trace(keyNames + ':' + key);
			var keys = keyNames.split(',');
			for(k in keys)
			{
				/*if (keys[k]==key) {
					trace(k + '==' + key + ' TRUE ');
				}*/
				//trace(k + '==' + key + (keys[k]==key?'Y':'N'));
				if (keys[k]==key) 
					return true;
			}
			return false;
		}
		
		</script>
		<table style="height:100%;width:100%;margin:auto;position:absolute;top:0px;" id="loader">
		<tr><td style="text-align:center"><img style="margin:auto;" src="design/loading2.gif"></td><tr>
		</table>
	</body>
</html>
