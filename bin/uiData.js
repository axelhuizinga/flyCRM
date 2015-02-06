/*	FORMAT FUNCTIONS*/

var run = function(args)
{
	var f = args.unshift();
	return f.apply(null, n);
}

var fieldNames =
{
	first_name:'Vorname',
	last_name:'Name',
	phone_number:'Telefon',
	address1:'Straße',
	postal_code:'PLZ',
	city:'Ort',
	last_local_call_time:'Anrufdatum',
	vendor_lead_code:'Mitgliedsnummer'
};

var fieldFormats =
{
	phone_number:'0%d'
};

var fieldTypes =
{
	title:'select'
}


var uiData = {
	appName:"flyCRM",
	company:"X-Press Marketing GmbH",
	views:
	[
		{
			TabBox:
			{
				id:"mtabs",
				isNav:true,
				includes:['datetime'],
				tabs:
				[
					{
						link:"clients",
						label:"Mitglieder",
						views:
						{
							ContextMenu:
							{
								id:"clients.menu",
								heightStyle: "auto",
								items:[
									{
										action:'find',
										label:'Finden',
										fields:['first_name','last_name','phone_number','address1', 'city','last_local_call_time']
									}
								]
							},
							Clients:
							{
								id:"clients",
								limit:15,
								fields:['first_name','last_name','phone_number','address1', 'city','last_local_call_time']
							}
						},
													
					},
					{
						link:"campaigns",
						label:"Kampagnen",
						views:[]									
					},	
					{
						link:"stats",
						label:"Statistik",
						views:[]									
					},
					{
						link:"settings",
						label:"Einstellungen",
						views:[]									
					}		
				],
				heightStyle: "fill"
			}
		},
		{
			DateTime:
			{
				id:"datetime",
				format:"%d. %m. %Y %H:%M",
				interval:10000
			}
		}
	]};
