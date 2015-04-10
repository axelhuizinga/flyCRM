package model;
import haxe.ds.StringMap;
import haxe.extern.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import me.cunity.php.db.MySQLi_STMT;
import php.Lib;
import php.NativeArray;
import php.Web;

using Lambda;
using Util;

/**
 * ...
 * @author axel@cunity.me
 */
@:keep
 class QC extends Clients
{
	 private static var vicdial_list_fields = 'lead_id,entry_date,modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id'.split(',');
	 
	 
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var self:QC = new QC();	
		self.table = 'vicidial_list';
		trace(param);
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
		
	override public function edit(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		var entry_list_id:String = param.get('entry_list_id');
		var cF:Array<StringMap<String>> = getCustomFields(entry_list_id);
		var cFields:Array<String> = cF.map(function(field:StringMap<String>):String return field.get('field_label'));
		trace(cFields);
		var fieldNames:StringMap<String> = new StringMap();
		var typeMap:StringMap<String> = new StringMap();
		var optionsMap:StringMap<String> = new StringMap();
		for (f in 0...cFields.length)
		{
			fieldNames.set(cFields[f], cF[f].get('field_name'));
			if (cF[f].get('field_options') != null)
				optionsMap.set(cFields[f], cF[f].get('field_options'));
			typeMap.set(cFields[f], cF[f].get('field_type'));
		}
		//var param:StringMap<Dynamic> = new StringMap();
		param.set('fields', cFields);
		//param.set('list_id', list_id);
		//param.set('primary_id', param.get('primary_id'));
		//param.set('table', 'vicidial_list');
		//return false;
		var sb:StringBuf = new StringBuf();
		var phValues:Array<Array<Dynamic>> = new Array();
		trace(param);
		data =  {
			fieldNames:Lib.associativeArrayOfHash(fieldNames),
			rows: doSelectCustom(param, sb, phValues),
			typeMap:Lib.associativeArrayOfHash(typeMap),
			optionsMap:Lib.associativeArrayOfHash(optionsMap),
			recordings:getRecordings(Std.parseInt(param.get('lead_id')))
		};
		return json_encode();		
	}
	
	override public function find(param:StringMap<String>):EitherType<String,Bool>
	{	
		var sb:StringBuf = new StringBuf();
		var phValues:Array<Array<Dynamic>> = new Array();
		var count:Int = countJoin(param, sb, phValues);
		
		sb = new StringBuf();
		phValues = new Array();
		trace( 'count:' + count + ':' + param.get('page')  + ': ' + (param.exists('page') ? 'Y':'N'));
		data =  {
			count:count,
			page:(param.exists('page') ? Std.parseInt( param.get('page') ) : 1),
			rows: doJoin(param, sb, phValues)
		};
		return json_encode();
	}	
	
	public function doSelectCustom(q:StringMap<Dynamic>, sb:StringBuf, phValues:Array<Array<Dynamic>>):NativeArray
	{
		var fields:Array<String>= q.get('fields');		
		sb.add('SELECT ' + (fields != null ? fieldFormat( fields.map(function(f:String) return S.my.real_escape_string(f)).join(',') ): '*' ));
		var entry_list_id:String = q.get('entry_list_id');
		var primary_id:String = S.my.real_escape_string(q.get('primary_id'));
		sb.add(' FROM ' + S.my.real_escape_string(table) + ' AS vl INNER JOIN ' + S.my.real_escape_string('custom_' + entry_list_id) + ' AS cu ON vl.' + primary_id + '=cu.' +  primary_id);		
		buildCond('vl.' + primary_id + '|' + S.my.real_escape_string(q.get(q.get('primary_id'))) , sb, phValues);
		trace(phValues);		
		trace(sb.toString());		
		return execute(sb.toString(), q, phValues);
		return null;
	}	
	
	public function save(q:StringMap<Dynamic>):Bool
	{
		var lead_id = Std.parseInt(q.get('lead_id'));
		//COPY LEAD TO VICIDIAL_LEAD_LOG + CUSTOM_LOG
		var res:EitherType < MySQLi_Result, Bool > = S.my.query(
			'INSERT INTO vicidial_lead_log SELECT * FROM (SELECT NULL AS log_id,$lead_id AS lead_id,NOW() AS entry_date) AS ll JOIN (SELECT modify_date,status,user,vendor_lead_code,source_id,list_id,gmt_offset_now,called_since_last_reset,phone_code,phone_number,title,first_name,middle_initial,last_name,address1,address2,address3,city,state,province,postal_code,country_code,gender,date_of_birth,alt_phone,email,security_phrase,comments,called_count,last_local_call_time,rank,owner,entry_list_id FROM `vicidial_list`WHERE `lead_id`=$lead_id)AS vl'
			);
		var log_id:Int = S.my.insert_id;
		if (log_id > 0)
		{
			var cTable:String = 'custom_' + q.get('entry_list_id');
			trace(cTable + ' log_id:' + log_id);
			if (checkOrCreateCustomTable(cTable))
			{
				var cLogTable =  cTable + '_log';
				res = S.my.query(
					'INSERT INTO $cLogTable SELECT * FROM (SELECT $log_id AS log_id) AS ll JOIN (SELECT * FROM `$cTable`WHERE `lead_id`=$lead_id)AS cl'
				);
				trace ('INSERT INTO $cLogTable ...' + S.my.error + '<');
				if (S.my.error == '')
				{
					//SAVE QC DATA
					var primary_id:String =  S.my.real_escape_string(q.get('primary_id'));
					var sql:StringBuf  = new StringBuf();
					sql.add('UPDATE $cTable SET ');
					var cFields = S.tableFields('$cTable');
					trace('$cTable fields:' + cFields.toString());
					cFields.remove(primary_id);
					var bindTypes:String = '';
					var values2bind:NativeArray = null;
					var i:Int = 0;
					var dbFieldTypes:StringMap<String> =  Lib.hashOfAssociativeArray(Lib.associativeArrayOfObject(S.conf.get('dbFieldTypes')));
					var sets:Array<String> = new Array();
					for (c in cFields)
					{
						var val:Dynamic = q.get(c);
						if (val != null)
						{
							//TODO: MULTIVAL SELECT OR CHECKBOX
							values2bind[i++] = (Std.is(val,String) ? val: val[0] );
							var type:String = dbFieldTypes.get(c);
							bindTypes += (type.any2bool() ?  type : 's');	
							sets.push(c + '=?');
						}
					}
					sql.add(sets.join(','));
					sql.add(' WHERE lead_id=$lead_id');
					var stmt =  S.my.stmt_init();
					trace(sql.toString());
					var success:Bool = stmt.prepare(sql.toString());
					if (!success)
					{
						trace(stmt.error);
						return false;
					}
					success = untyped __call__('myBindParam', stmt, values2bind, bindTypes);
					trace ('success:' + success);
					if (success)
					{
						success = stmt.execute();
						if (!success)
						{
							trace(stmt.error);
							return false;
						}			
						//CUSTOM SAVED 
						sql = new StringBuf();
						var uFields = vicdial_list_fields;
						uFields.remove(primary_id);
						bindTypes = '';
						values2bind = null;
						i = 0;						
						sql.add('UPDATE vicidial_list SET ');
						sets  = new Array();
						for (c in uFields)
						{
							var val:Dynamic = q.get(c);
							if (val != null)
							{
								//TODO: MULTIVAL
								values2bind[i++] = (Std.is(val,String) ? val: val[0] );
								var type:String = dbFieldTypes.get(c);
								bindTypes += (type.any2bool() ?  type : 's');	
								sets.push(c + '=?');
							}
						}
						values2bind[i++] = S.user;
						bindTypes += 's';
						sets.push('security_phrase=?');//STORE QC AGENT
						if (q.get('status') == 'MITGL')
						{
							var list_id:Int = 10000;
							var mID:Int = Std.parseInt(q.get('vendor_lead_code'));
							if (mID == null)//	NEW MEMBER - CREATE ID
							{								
								mID = S.newMemberID();
								values2bind[i++] = mID;
								bindTypes += 's';
								sets.push('vendor_lead_code=?');								
							}
							var entry_list_id:String = q.get('entry_list_id');
							values2bind[i++] = q.get('status');
							bindTypes += 's';
							sets.push('`status`=?');
							values2bind[i++] = list_id;
							bindTypes += 's';
							sets.push('list_id=?');	
							values2bind[i++] = entry_list_id;
							bindTypes += 's';
							sets.push('entry_list_id=?');	
							values2bind[i++] = q.get('user');
							bindTypes += 's';
							sets.push('owner=?');							
						}
						sql.add(sets.join(','));
						sql.add(' WHERE lead_id=$lead_id');
						var stmt =  S.my.stmt_init();
						trace(sql.toString());
						var success:Bool = stmt.prepare(sql.toString());
						if (!success)
						{
							trace(stmt.error);
							return false;
						}
						success = untyped __call__('myBindParam', stmt, values2bind, bindTypes);
						trace ('success:' + success);
						if (success)
						{
							success = stmt.execute();
							if (!success)
							{
								trace(stmt.error);
								return false;
							}		
							return true;
						}			
						return false;
					}
				
				}
				else
					trace('oops');
			}
			
		}
		return false;
	}
	
	function checkOrCreateCustomTable(srcTable:String, ?suffix:String='log'):Bool
	{
		var newTable:String = S.my.real_escape_string(srcTable + '_' + suffix);
		//trace('SHOW TABLES LIKE  "$newTable"');
		var res:MySQLi_Result = S.my.query('SHOW TABLES LIKE  "$newTable"');
		if (res.any2bool() && res.num_rows == 0)
		{
			trace('CREATE TABLE `$newTable` like `$srcTable`');
			var res:EitherType < MySQLi_Result, Bool > = S.my.query('CREATE TABLE `$newTable` like `$srcTable`');
			if (S.my.error == '')
			{
				res = S.my.query('ALTER TABLE $newTable DROP PRIMARY KEY, ADD `log_id` INT(9) NOT NULL  FIRST,  ADD  PRIMARY KEY (`log_id`)');
				if (S.my.error != '')
					S.exit(S.my.error);
				return true;
			}
			else S.exit(S.my.error);
		}
		else trace('num_rows:' + res.num_rows);
		return true;
	}
}