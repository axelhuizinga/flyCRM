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
	client_id:'Mitgliedsnr.',
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

