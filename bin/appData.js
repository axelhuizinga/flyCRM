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
	m_ID:'MitglNr.',
	client_id:'MitglNr.',
	vendor_lead_code:'MitglNr.',
	vicidial_campaigns:'Kampagnen',
	vicidial_lists:'Listen',
	birth_date:'Geburtsdatum',
	entry_date:'Verkauf',
	order_date:'Verkauf',
	join_date:'Auftragsdatum',
	full_name:'Agent',
	owner:'Agent',
	register_on:'Verkauf',
	IBAN:'IBAN',
	iban:'IBAN',
	d:'Datum',
	amount:'Betrag',
	reason:'Grund'
};

var appLabel =
{
	active:'Nur Aktive',
	edit:'Bearbeiten',
	filter:'Kontextfilter',
	go2page:'Gehe zu Seite',
	select:'Auswählen',
	selectStatus:'Status Auswählen',
	close:'Schließen',
	of:'von',
	pay_source:'Konto',
	pay_plan:'Produkt'
};

var matchOptions =
{
	any:'Bestandteil',
	exact:'Genauso',
	start:'Anfang',
	end:'Ende'	
};

var rangeLabels =
{
	from:'Von:',
	to:'Bis:'
};

var rangeFields =
{
	last_local_call_time:1,
	register_on:1,
	order_date:1,
	join_date:1
};

var matchKeywords =
{
	LIKE:1,
	BETWEEN:2
};

var dbFieldTypes =
{
	active:'s',
	birth_date:'s',
	first_name:'s',
	last_name:'s',
	list_id:'s',
	phone_number:'s',
	address1:'s',
	postal_code:'s',
	city:'s',
	comments:'s',
	last_local_call_time:'s',
	vendor_lead_code:'s'
};

var dbQueryFormats =
{
	hlast_local_call_time:['DATE_FORMAT','%d.%m.%Y %H:%i:%s'],
	hentry_date:['DATE_FORMAT','%d.%m.%Y %H:%i:%s'],
	hmodify_date:['DATE_FORMAT','%d.%m.%Y %H:%i:%s'],
	hstart_time:['DATE_FORMAT','%d.%m.%Y %H:%i:%s']
};

var displayClass =
{
	amount:'tRight'
};

var displayFormats =
{
	amount:'gFloat',
	phone_number:'0%d',
	d:'date',
	co_field:'co_feld',
	co_feld:'co_field',
	reason:'grund',
	register_on:'date',
	register_off:'date',
	register_off_to:'date',
	sign_date:'date',
	start_date:'date',
	event_date:'date',
	entry_date:'_datetime',
	birth_date:'date',
	teilnahme_beginn:'date',
	creation_date:'datetime',
	last_local_call_time:'datetime',
	start_time:'datetime'
};

var storeFormats =
{
	amount:['replace', '/,/','.'],
	phone_number:['replace', '/^0+/',''],
	creation_date:['gDateTime2mysql'],
	last_local_call_time:['gDateTime2mysql'],
	start_time:['gDateTime2mysql'],
	register_on:['gDate2mysql'],
	register_off:['gDate2mysql'],
	register_off_to:['gDate2mysql'],
	sign_date:['gDate2mysql'],
	birth_date:['gDate2mysql'],
	//entry_date:['gDateTime2mysql'],
	_entry_date:['_gDateTime2mysql'],
	start_date:['gDate2mysql'],
	teilnahme_beginn:['gDate2mysql'],
	pay_obligation:['check2tinyint'],
	//use_email:['check2tinyint']
};

var fieldTypes =
{
	title:'select'
}

var templates =
{
	qc:true,
	clients:true,
	stats:false,
	settings:false
};

var sql =
{
	LIMIT:15
};
