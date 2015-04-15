var uiData = {
	appName:'flyCRM',
	appLabel:appLabel,
	company:'X-Press Marketing GmbH',
	storeFormats:storeFormats,
	limit:15,
	hasTabs:true,
	rootViewPath:'mtabs',
	waitTime:8000,
	uiMessage:
	{
		wait:'Bitte warten!',
		retry:'Unbekannter Fehler - Bitte wiederholen oder mit F5 neu laden',
		timeout:'Zeitüberschreitung - Bitte wiederholen oder mit F5 neu laden'
	},
	views:
	[
		{
			DateTime:
			{
				id:'datetime',
				format:'%s, %d.%d.%s %02d:%02d',
				interval:60000
			}
		},
		{
			TabBox:
			{
				id:'mtabs',
				isNav:true,
				append2header:'datetime',
				tabs:
				[{				
					id:'qc',
					label:'QualityControl',
					views:
					[{	
						QC:{
							action:'find',
							campaign_id:'QCKINDER',
							fields:'lead_id,vicidial_list.user,entry_list_id,vendor_lead_code,first_name,last_name,phone_number,address1,city,last_local_call_time,full_name',
							primary_id:'lead_id',
							hidden:'entry_list_id,user,vicidial_list.user,address1,city,vendor_lead_code',
							id:'qc',
							limit:15,
							order:'last_local_call_time|ASC',
							where:'list_id|1900',
							jointable:'vicidial_users',
							joincond:'vicidial_users.user=vicidial_list.user',
							table:'vicidial_list',
							listattach2:'#qc-list-anchor',
							views:[
							{
								ContextMenu:{
									id:'qc-menu',
									heightStyle: 'fill',
									items:[
										{
											action:'find',
											label:'Finden',
											fields:['first_name','last_name','phone_number','address1', 'city','last_local_call_time'],
											ranges:['last_local_call_time'],
											table:'vicidial_list',
											buttons:
											{
												find:'Anzeigen'
											}
										},
										{
											action:'edit',
											label:'Bearbeiten',
											buttons:
											{
												close:'Schließen',
												call:'Anrufen',
												save:'Speichern',
												qcok:'QC OK'
											}
										}										
									],
									attach2:'#qc'
								}
							},
							{
								Editor:{
									action:'edit',
									id:'qc-editor',
									attach2:'#qc',					
									join_table:'custom_*list_id',
									read_only:'vendor_lead_code,last_local_call_time',
									TODO:'PHONE-NUMBER READONLY?'
								}
							}
							]
						}
					}]									
				},
				{				
					id:'clients',
					label:'Mitglieder',
					views:
					[{							
						Clients:{
							action:'find',
							fields:'vicidial_list.lead_id,vendor_lead_code,first_name,last_name,phone_number,address1,city,register_on',
							primary_id:'vendor_lead_code',
							hidden:'lead_id',							
							id:'clients',
							limit:15,
							order:'vendor_lead_code|DESC',
							where:'list_id|10000,clients.state|active',
							jointable:'fly_crm.clients AS clients',
							joincond:'fly_crm.clients.client_id=vendor_lead_code ',
							table:'vicidial_list',
							listattach2:'#clients-list-anchor',
							views:[
							{ 
								ContextMenu:{
									id:'clients-menu',
									heightStyle: 'fill',
									items:[
										{
											action:'mailings',
											label:'Anschreiben',											
											buttons:
											{
												previewOne:'Vorschau',
												printOne:'Drucken',
												printNewMembers:'Alle neuen Anschreiben Drucken'												
											}
										},										
										{
											action:'find',
											label:'Finden',
											fields:['first_name','last_name','phone_number','address1', 'city','last_local_call_time'],
											ranges:['last_local_call_time'],
											table:'vicidial_list',
											buttons:
											{
												find:'Anzeigen'
											}
										},
										{ 
											action:'edit',
											label:'Bearbeiten',
											buttons:
											{
												pay_plan:'Produkte',
												pay_source:'Konten',
												pay_history:'Zahlungen',
												client_history:'Verlauf',
												call:'Anrufen',
												close:'Schließen',
												save:'Speichern'
											}
										}										
									],
									attach2:'#clients'
								}
							},
							{
								ClientEditor:{
									action:'edit',
									id:'clients-editor',
									hidden:'lead_id',	
									attach2:'#clients',
									fields:'first_name,last_name,phone_number,address1,address2,postal_code,city',
									jointable:'fly_crm.clients AS clients',
									joincond:'fly_crm.clients.client_id=vendor_lead_code ',									
									primary_id:'client_id',
									read_only:'client_id,last_local_call_time',
									TODO:'PHONE-NUMBER READONLY?'
								}
							},
							{
								Mailing:{
									action:'mailing',
									id:'clients-mailing',
									attach2:'#clients'										
								}
							}]
						}
					}]									
				},
				{
					id:'campaigns',
					label:'Kampagnen',
					views:[{
						Campaigns:
						{
							fields:'lead_id,vendor_lead_code,first_name,last_name,phone_number,address1,city,last_local_call_time',
							id:'campaigns',
							limit:15,
							order:'vendor_lead_code|ASC',
							where:'',
							table:'vicidial_list',
							listattach2:'#campaigns-list-anchor',
							views:[
							{
								ContextMenu:{
									id:'campaigns-menu',
									heightStyle: 'fill',
									items:[
										{
											action:'findLeads',
											contextLevel:1,
											fields:['campaign_id'],
											label:'Kampagnen Auswahl',											
											Select:[
											{
												action:'find',
												name:'campaign_id',
												table:'vicidial_campaigns',
												default:'all',
												dependsOn:[],
												db:1,
												multi:1,
												value:'campaign_id',
												label:'campaign_name',
												size:1,
												options:[],
												check:[
												{
													name:'active',
													checked:true
												}
												],
												where:{check:['active']}
											}],
											buttons:
											{
												findLeads:'Anzeigen'
											}
										},
										{
											action:'selectList',
											label:'Listen Auswahl',
											Select:[
											{
												name:'vicidial_lists',
												default:'all',
												dependsOn:['campaigns-menu_vicidial_campaigns'],
												db:1,
												multi:1,
												value:'list_id',
												label:'list_name',
												size:1,
												options:[],
												check:[
												{
													name:'active',
													checked:true
												},
												{
													name:'filter',
													checked:true
												}]
												,where:{check:['active','filter']}
											}],
											buttons:
											{
												listLeads:'Anzeigen'
											}
										}										
									],
									attach2:'#campaigns'
								}
							}]
						}
					}]									
				},	
				{
					id:'stats',
					label:'Statistik',
					views:[]									
				},
				{
					id:'settings',
					label:'Einstellungen',
					views:[]									
				}],
				heightStyle: 'fill'
			}
		}
	]}
