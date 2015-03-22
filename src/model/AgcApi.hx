package model;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Http;
import php.Lib;
import php.Web;
import sys.io.File;
using Util;
/**
 * ...
 * @author axel@cunity.me
 */
class AgcApi extends Model
{
	var vicidialUser:String;
	var vicidialPass:String;
	var statuses:StringMap<String>;
	
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var self:AgcApi = new AgcApi();	
		self.vicidialUser = S.vicidialUser;
		self.vicidialPass = S.vicidialPass;
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
	
	public function external_dial(param:StringMap<String>):EitherType<String,Bool>
	{
		//var url:String = 'http://localhost/agc/api.php?source=flyCRM&user=6666&pass=dial4XPRESS&function=external_dial&search=NO&preview=NO&focus=NO&lead_id='
		var url:String = 'http://xpress.mein-dialer.com/agc/api.php?source=flyCRM&user=$vicidialUser&pass=$vicidialPass&function=external_dial&search=NO&preview=NO&focus=NO&lead_id='
		+ param.get('lead_id') + '&agent_user=' + param.get('agent_user');
		trace(url);
		var agcResponse:String = Http.requestUrl(url);
		trace(agcResponse);
		return json_response(agcResponse.indexOf('SUCCESS') == 0 ? 'OK' : agcResponse);
	}
	
	public function external_hangup(param:StringMap<String>):EitherType<String,Bool>
	{
		if(param.get('pause')=='Y')
			Http.requestUrl('http://xpress.mein-dialer.com/agc/api.php?source=flyCRM&user=$vicidialUser&pass=$vicidialPass&function=external_pause&value=PAUSE&agent_user=' + param.get('agent_user'));
		var url:String = 'http://xpress.mein-dialer.com/agc/api.php?source=flyCRM&user=$vicidialUser&pass=$vicidialPass&function=external_hangup&value=1&agent_user=' + param.get('agent_user');
		trace(url);
		var agcResponse:String = Http.requestUrl(url);
		trace(agcResponse);
		if (agcResponse.indexOf('SUCCESS') == 0)
		{
			if (param.get('dispo').any2bool())
			{
				return external_status(param);
			}
			else
			{//	QUERY VALID STATI CHOICES
				var campaign_id:String = S.my.real_escape_string(param.get('campaign_id'));
				var sql = '(SELECT `status`,`status_name` FROM `vicidial_statuses` WHERE `selectable`="Y") UNION (SELECT `status`,`status_name` FROM `vicidial_campaign_statuses` WHERE `selectable`="Y" AND campaign_id="$campaign_id") ORDER BY `status`' ;				
				data =  {
					response:'OK',
					choice: query(sql)
				};
				return json_encode();
			}			
		}

		return json_response(agcResponse);		
	}
	
	public function external_status(param:StringMap<String>):EitherType<String,Bool>
	{
		var status:String = param.get('dispo');
		var url = 'http://xpress.mein-dialer.com/agc/api.php?source=flyCRM&user=$vicidialUser&pass=$vicidialPass&function=external_status&value=$status&agent_user=' + param.get('agent_user');
		trace(url);
		var agcResponse:String = Http.requestUrl(url);
		return json_response(agcResponse.indexOf('SUCCESS') == 0 ? 'OK' : agcResponse);
	}
	
}