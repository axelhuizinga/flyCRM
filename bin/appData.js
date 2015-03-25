var fieldNames =
{
	first_name:'Vorname',
	last_name:'Name',
	phone_number:'Telefon',
	address1:'Straße',
	postal_code:'PLZ',
	city:'Ort',
	last_local_call_time:'Anrufzeit',
	lead_id:'LeadID',
	vendor_lead_code:'Mitgliedsnr.',
	vicidial_campaigns:'Kampagnen',
	vicidial_lists:'Listen',
	order_date:'Auftragsdatum',
	join_date:'Auftragsdatum',
	full_name:'Agent'
}

var appLabel =
{
	active:'Nur Aktive',
	edit:'Bearbeiten',
	filter:'Kontextfilter',
	go2page:'Gehe zu Seite',
	select:'Auswählen',
	selectStatus:'Status Auswählen',
	close:'Schließen',
	of:'von'
}

var matchOptions =
{
	any:'Bestandteil',
	exact:'Genauso',
	start:'Anfang',
	end:'Ende'	
}

var rangeLabels =
{
	from:'Von:',
	to:'Bis:'
}

var rangeFields =
{
	last_local_call_time:1,
	order_date:1,
	join_date:1
}

var matchKeywords =
{
	LIKE:1,
	BETWEEN:2
}

var dbFieldTypes =
{
	active:'s',
	first_name:'s',
	last_name:'s',
	list_id:'s',
	phone_number:'s',
	address1:'s',
	postal_code:'s',
	city:'s',
	last_local_call_time:'s',
	vendor_lead_code:'s'
}

var dbQueryFormats =
{
	hlast_local_call_time:['DATE_FORMAT','%d.%m.%Y %H:%i:%s'],
	hentry_date:['DATE_FORMAT','%d.%m.%Y %H:%i:%s'],
	hmodify_date:['DATE_FORMAT','%d.%m.%Y %H:%i:%s'],
	hstart_time:['DATE_FORMAT','%d.%m.%Y %H:%i:%s']
}

var displayFormats =
{
	phone_number:'0%d',
	last_local_call_time:'datetime',
	start_time:'datetime'
}

var storeFormats =
{
	phone_number:['replace', '^0+',''],
	last_local_call_time:['gDate2mysql'],
	start_time:['gDate2mysql']
}

var fieldTypes =
{
	title:'select'
}

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
							order:'last_local_call_time|DESC',
							where:'list_id|1900',
							jointable:'vicidial_users',
							joincond:'ON vicidial_users.user=vicidial_list.user',
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
												close:'Abbrechen',
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
							//fields:['vendor_lead_code','first_name','last_name','phone_number','address1', 'city','last_local_call_time'],
							fields:'vendor_lead_code,first_name,last_name,phone_number,address1,city,last_local_call_time',
							id:'clients',
							limit:15,
							order:'vendor_lead_code|ASC',
							where:'list_id|10000',
							table:'vicidial_list',
							listattach2:'#clients-list-anchor',
							views:[
							{
								ContextMenu:{
									id:'clients-menu',
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
												edit:'Bearbeiten',
												save:'Speichern',
												add:'Hinzufügen',
												delete:'Löschen'
											}
										}										
									],
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
