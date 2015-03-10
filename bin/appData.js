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
	join_date:'Auftragsdatum'
}

var appLabel =
{
	active:'Nur Aktive',
	edit:'Bearbeiten',
	filter:'Kontextfilter',
	select:'Auswählen'
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
	last_local_call_time:['DATE_FORMAT','%d.%m.%Y %H:%i:%s'],
	entry_date:['DATE_FORMAT','%d.%m.%Y %H:%i:%s'],
	modify_date:['DATE_FORMAT','%d.%m.%Y %H:%i:%s']
}

var displayFormats =
{
	phone_number:'0%d'
}

var storeFormats =
{
	phone_number:['replace', '^0+',''],
	last_local_call_time:['gDate2mysql']
}

var fieldTypes =
{
	title:'select'
}

var uiData = {
	appName:'flyCRM',
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
							fields:'lead_id,vendor_lead_code,first_name,last_name,phone_number,address1,city,last_local_call_time',
							primary_id:'lead_id',
							id:'qc',
							limit:15,
							order:'last_local_call_time|DESC',
							where:'list_id|1900',
							table:'vicidial_list',
							listattach2:'#qc-list-anchor',
							views:[
							{
								ContextMenu:{
									id:'qc-menu',
									heightStyle: 'auto',
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
												save:'Speichern',
												add:'Hinzufügen'
											}
										}										
									],
									attach2:'#qc'
								}
							},
							{
								Editor:{
									id:'qc-editor',
									attach2:'#qc',
									trigger:'qc-menu|edit',									
									join_table:'custom_*list_id',
									fields:'vendor_lead_code|r,first_name,last_name,phone_number,address1,city,last_local_call_time|r',
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
									heightStyle: 'auto',
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
									heightStyle: 'content',
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
