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
						<td data-name="${ri}" >${display(displayFormats[ri],rv)}</td>												
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
		<div  class="scrollbox">
			<form  id="qc-edit-form" action="qc" class="main-left">
			{{each(i,v) $data.rows}}
				<table id="qc-edit-data-${i}">
				{{each(k,val) v}}
				<tr>
					<td>{{html $data.fieldNames[k]}}:</td>
					<td class="nowrap">
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
						<table>
							{{each(fi,fv) v.fields}}					
							{{if rangeFields[fv]}}
							<tr class="lh32">
								<td><div class="lpad" >${rangeLabels.from}</div>
								</td>
								<td colspan="2">
								<input type="text" size="11" name="range_from_${fv}" class="datepicker"  >
								</td>
							</tr>		
							<tr class="lh32">
								<td>
								<div class="lpad" >${rangeLabels.to}</div>
								</td>
								<td colspan="2">
								<input type="text" size="11" name="range_to_${fv}" class="datepicker" >
								</td>				
							</tr>				
							{{else}}
							<tr class="lh32">
								<td>
								<div class="lpad" >${fieldNames[fv]}</div>
								</td>
								<td >																
								<input type="${ fieldTypes[fv] ? fieldTypes[fv] : 'text' }" name="${fv}" class="menu-input-right">
								</td>
								<td >
								<div class="rpad" >{{tmpl(fv) "#t-find-match"}}</div>
								</td>
							</tr>							
							{{/if}}							
							{{/each}}		
						{{each(bi,bv) v.buttons}}
						<tr>
							<td colspan="3">
								<button data-endaction="${bi}">${bv}</button>							
							</td>						
						</tr>
						{{/each}}
						</table>
					</form>
				</div>
			{{/each}}	
			</div>	
		</script>
				
		<!-- QC MENU RECORDINGS ${trace($data)} ${trace(v)}-->
		<script type="text/x-jquery-tmpl"  id="t-qc-recordings">
			<div class="recordings"  >			
			{{each(i,v) $data.recordings}}
				<span class="label">${v.start_time} </span><br>
				<audio controls  >
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
					<table>
						<input type="hidden" name="action" value="${action}">
						{{each(fi,fv) v.fields}}					
							{{if rangeFields[fv]}}
							<tr class="lh32">
								<td><div class="lpad" >${rangeLabels.from}</div>
								</td>
								<td colspan="2">
								<input type="text" size="11" name="range_from_${fv}" class="datepicker"  >
								</td>
							</tr>		
							<tr class="lh32">
								<td>
								<div class="lpad" >${rangeLabels.to}</div>
								</td>
								<td colspan="2">
								<input type="text" size="11" name="range_to_${fv}" class="datepicker" >
								</td>				
							</tr>							
							{{else}}
							<tr class="lh32">
								<td>
								<div class="lpad" >${fieldNames[fv]}</div>
								</td>
								<td >																
								<input type="${ fieldTypes[fv] ? fieldTypes[fv] : 'text' }" name="${fv}" class="menu-input-right">
								</td>
								<td >
								<div class="rpad" >{{tmpl(fv) "#t-find-match"}}</div>
								</td>
							</tr>														
							{{/if}}							
							{{/each}}						
						{{each(bi,bv) v.buttons}}
						<tr>
							<td colspan="3">
								<button data-endaction="${bi}">${bv}</button>							
							</td>						
						</tr>						
						{{/each}}
						</table>
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
		
		<!-- PAGER TEMPLATE -->
		<script type="text/x-jquery-tmpl" id="t-pager">
		  <tr id="${$data.id}-pager" class="pager">
				<td colspan="${$data.colspan}" style="text-align: center">
					 <table >
						  <tr>
								<td><a href="#" data-action="first">&lt;&lt;</a></td>
								<td><a href="#" data-action="previous">&lt;</a></td>
								<td><button data-action="go2page">${appLabel.go2page}</button></td>
								<td><input size="3" name="page" value="${$data.page}"></td>
								<td>${appLabel.of + ' ' +  Math.ceil($data.count/uiData.limit)}</td>
								<td><a href="#" data-action="next">&gt;</a></td>
								<td><a href="#" data-action="last">&gt;&gt;</a></td>
						  </tr>
					 </table>
				</td>
		  </tr>
		</script>
		
		<!-- SELECT  OPTIONS TEMPLATE ${trace($item)}-->
		<script type="text/x-jquery-tmpl" id="t-campaign_id">
			{{each(i,v) $data.rows}}
			<option value="${v.campaign_id}">${v.campaign_name}</option>
			{{/each}}
		</script>		
		
		<!--  WAIT SCREEN TEMPLATE ${trace($data)}-->
		<script type="text/x-jquery-tmpl" id="t-wait">		
			<div id="wait" class="overlay">
			<div  class="scrollbox">			
				<div id="wait-content" class="content">
					<h3>${$data.wait}</h3>					
				</div>
			</div>
			</div>
		</script>
		
		<!-- OVERLAY CHOICE TEMPLATE ${trace($data)} ${trace(i + ':' + v.status)}-->
		<script type="text/x-jquery-tmpl" id="t-choice">		
		  <div id="choice" class="overlay">
		  <div  class="scrollbox">			
				<table id="choice-content" class="ccontent">
					<caption>${$data.header}</caption>
					{{each(i,v) $data.choice}}					
					<tr>
						<td><button data-choice="${v.status}">${v.status + ' - ' + v.status_name}</button></td>
					</tr>						
					{{/each}}
					<tr>
						<td><button onclick="choice()">${appLabel.close}</button></td>
					</tr>	
				</table>
		  </div>
		  </div>
		</script>
		
		  <!-- OVERLAY CONFIRM TEMPLATE ${trace($data)} ${trace(i + ':' + v.status)}-->
		  <script type="text/x-jquery-tmpl" id="t-confirm">		
				<div id="confirm" class="overlay">
				<div  class="scrollbox">			
					 <table id="confirm-content" class="ccontent">
						  <caption>${$data.header}</caption>
						  <tr>
							  <td>${$data.info}</td>
						  </tr>							  
						  {{each(i,v) $data.confirm}}					
						  <tr>
							  <td><button data-confirm="${v.command}">${v.label}</button></td>
						  </tr>						
						  {{/each}}
						  <tr>
							  <td>
							  <button onclick="modal('${$data.mID}')" > ${appLabel.close}</button></td>
						  </tr>	
					 </table>
				</div>
				</div>
		</script>
		
		<script src="js/LAB.src.js"></script>
		<!--
		<table style="height:100%;width:100%;margin:auto;position:absolute;top:0px;" id="loader">
		<tr><td style="text-align:center;vertical-align: middle;"><img style="margin:auto;" src="design/loading2.gif"></td><tr>
		</table>
		<script src="js/jquery-2.1.3.min.js"></script>
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
			script('js/datepicker-de.js.gz').
			script('flyCRM.js').
			script('js/jquery.tmpl.js.gz').
			script('js/sprintf.min.js.gz').
			script('js/spin.min.js.gz').
			script('js/iban-tool.js.gz').
			script('appData.js').
			script('js/run.js').wait();
			/*
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
		  
		  function display(format,value) {
			  if (format=='datetime') {
				  //datetime
				  var t = value.split(/[- :]/);
				  return sprintf('%s.%s.%s %s:%s:%s', t[2], t[1], t[0], t[3], t[4], t[5]);
			  }
			  else
				  return sprintf(format, value);
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
		  
		  /*IBAN GENERATE + CHECK FUNCTIONS*/
		  var gIBAN;
			
		  function repeat(s, n){
				var a = [];
				while(a.length < n){
					 a.push(s);
				}
				return a.join('');
		  }
		  
		  function buildIBAN(konto, blz, onsuccess, onerror)
		  {
				konto = new String(konto);
				blz = new String(blz);
				debug( konto + ' ' + blz);
				if (konto.length<10) {
					konto = repeat('0', 10-konto.length) + konto;
				}
				if (blz.length<8) {
					blz = repeat('0', 8-blz.length) + blz;
				}					
				IBAN.generate('DE',blz, konto).success(onsuccess).error(onerror);
		  }
		  
		  function checkIBAN(iban)
		  {
				return IBANCheck.isValid(iban) 
		  }
		</script>
		<table style="height:100%;width:100%;margin:auto;position:absolute;top:0px;" id="loader">
		<tr><td style="text-align:center;vertical-align: middle;"><img style="margin:auto;" src="design/loading2.gif"></td><tr>
		</table>
	</body>
</html>
