package;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import php.Lib;
import php.NativeArray;
import model.*;
import me.cunity.php.db.*;


using Lambda;
using Util;
/**
 * ...
 * @author axel@cunity.me
 */
typedef MData = 
{
	var rows:NativeArray;
};

class Model
{
	private static var KEYWORDS = {
		var h = new haxe.ds.StringMap();
		for( k in "ADD|ALL|ALTER|ANALYZE|AND|AS|ASC|ASENSITIVE|BEFORE|BETWEEN|BIGINT|BINARY|BLOB|BOTH|BY|CALL|CASCADE|CASE|CHANGE|CHAR|CHARACTER|CHECK|COLLATE|COLUMN|CONDITION|CONSTRAINT|CONTINUE|CONVERT|CREATE|CROSS|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DATABASES|DAY_HOUR|DAY_MICROSECOND|DAY_MINUTE|DAY_SECOND|DEC|DECIMAL|DECLARE|DEFAULT|DELAYED|DELETE|DESC|DESCRIBE|DETERMINISTIC|DISTINCT|DISTINCTROW|DIV|DOUBLE|DROP|DUAL|EACH|ELSE|ELSEIF|ENCLOSED|ESCAPED|EXISTS|EXIT|EXPLAIN|FALSE|FETCH|FLOAT|FLOAT4|FLOAT8|FOR|FORCE|FOREIGN|FROM|FULLTEXT|GRANT|GROUP|HAVING|HIGH_PRIORITY|HOUR_MICROSECOND|HOUR_MINUTE|HOUR_SECOND|IF|IGNORE|IN|INDEX|INFILE|INNER|INOUT|INSENSITIVE|INSERT|INT|INT1|INT2|INT3|INT4|INT8|INTEGER|INTERVAL|INTO|IS|ITERATE|JOIN|KEY|KEYS|KILL|LEADING|LEAVE|LEFT|LIKE|LIMIT|LINES|LOAD|LOCALTIME|LOCALTIMESTAMP|LOCK|LONG|LONGBLOB|LONGTEXT|LOOP|LOW_PRIORITY|MATCH|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MIDDLEINT|MINUTE_MICROSECOND|MINUTE_SECOND|MOD|MODIFIES|NATURAL|NOT|NO_WRITE_TO_BINLOG|NULL|NUMERIC|ON|OPTIMIZE|OPTION|OPTIONALLY|OR|ORDER|OUT|OUTER|OUTFILE|PRECISION|PRIMARY|PROCEDURE|PURGE|READ|READS|REAL|REFERENCES|REGEXP|RELEASE|RENAME|REPEAT|REPLACE|REQUIRE|RESTRICT|RETURN|REVOKE|RIGHT|RLIKE|SCHEMA|SCHEMAS|SECOND_MICROSECOND|SELECT|SENSITIVE|SEPARATOR|SET|SHOW|SMALLINT|SONAME|SPATIAL|SPECIFIC|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|SQL_BIG_RESULT|SQL_CALC_FOUND_ROWS|SQL_SMALL_RESULT|SSL|STARTING|STRAIGHT_JOIN|TABLE|TERMINATED|THEN|TINYBLOB|TINYINT|TINYTEXT|TO|TRAILING|TRIGGER|TRUE|UNDO|UNION|UNIQUE|UNLOCK|UNSIGNED|UPDATE|USAGE|USE|USING|UTC_DATE|UTC_TIME|UTC_TIMESTAMP|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|WHEN|WHERE|WHILE|WITH|WRITE|XOR|YEAR_MONTH|ZEROFILL|ASENSITIVE|CALL|CONDITION|CONNECTION|CONTINUE|CURSOR|DECLARE|DETERMINISTIC|EACH|ELSEIF|EXIT|FETCH|GOTO|INOUT|INSENSITIVE|ITERATE|LABEL|LEAVE|LOOP|MODIFIES|OUT|READS|RELEASE|REPEAT|RETURN|SCHEMA|SCHEMAS|SENSITIVE|SPECIFIC|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|TRIGGER|UNDO|UPGRADE|WHILE".split("|") )
			h.set(k.toLowerCase(),true);
		h;
	}
	public var data:MData;
	public var db:String;
	public var table:String;
	public var primary:String;
	
	public static function dispatch(param:StringMap<Dynamic>):EitherType<String,Bool>
	{
		var cl:Class<Dynamic> = Type.resolveClass('model.' + param.get('className'));
		trace(cl);
		if (cl == null)
		{
			trace('model.'+param.get('className') + ' ???');
			return false;
		}
		var fl:Dynamic = Reflect.field(cl, 'create');
		trace(fl);
		if (fl == null)
		{
			trace(cl + 'create is null');
			return false;
		}
		var iFields:Array<String> = Type.getInstanceFields(cl);
		trace(iFields);
		if (iFields.has(param.get('action')))
		{
			trace('calling create ' + cl);
			return Reflect.callMethod(cl, fl, [param]);
		}
		else 
		{
			trace('not calling create ');
			return false;
		}
	}
	
	public function doQuery(q:StringMap<String>):NativeArray
	{
		var sb:StringBuf = new StringBuf();		
		var phValues:Array<Array<Dynamic>> = new Array();		
		var where:String = q.get('where');
		if (where != null)
			buildCond(where, sb, phValues);
		
		return null;
	}
	
	public function fieldFormat(fields:String):String
	{
		var fieldsWithFormat:Array<String> = new Array();
		var sF:Array<String> = fields.split(',');
		var dbQueryFormats:StringMap<Array<String>> = Lib.hashOfAssociativeArray(Lib.associativeArrayOfObject((S.conf.get('dbQueryFormats'))));
		trace(dbQueryFormats);
		
		var d:StringMap<Dynamic> = Lib.hashOfAssociativeArray(S.conf.get('dbQueryFormats'));
		trace(d);
		//var qKeys:Array<String> = Reflect.fields(dbQueryFormats);
		var qKeys:Array<String> = new Array();
		var it:Iterator<String> = dbQueryFormats.keys(); 
		while (it.hasNext())
		{
			qKeys.push(it.next());
		}
	
		trace(qKeys);
		for (f in sF)
		{
			if (qKeys.has(f))
			{
				var format:Array<String> = dbQueryFormats.get(f);
				trace(format);
				fieldsWithFormat.push(format[0] + '(`' + f + '`, "' + format[1] + '") AS `' + f + '`');
			}
			else
				fieldsWithFormat.push( f );				
		}
		trace(fieldsWithFormat);
		return fieldsWithFormat.join(',');
	}
	
	public function execute(sql:String, param:StringMap<Dynamic>, ?phValues:Array<Array<Dynamic>>):NativeArray
	{
		trace(sql);	
		var stmt =  S.my.stmt_init();
		trace(stmt);
		var success:Bool = stmt.prepare(sql);
		trace (success);
		if (!success)
		{
			trace(stmt.error);
			return null;
		}		
		var bindTypes:String = '';
		var values2bind:NativeArray = null;
		var dbFieldTypes:StringMap<String> =  Lib.hashOfAssociativeArray(Lib.associativeArrayOfObject(S.conf.get('dbFieldTypes')));
		
		var qObj:Dynamic = { };
		var qVars:String = 'qVar_';
		var i:Int = 0;
		for (ph in phValues)
		{
			bindTypes += dbFieldTypes.get(ph[0]);
			values2bind[i++] = ph[1];
		}

		trace(Std.string(values2bind));
		success = untyped __call__('myBindParam', stmt, values2bind, bindTypes);
		trace ('success:' + success);
		if (success)
		{
			var fieldNames:Array<String> =  param.get('fields').split(',');
			var data:NativeArray = null;
			success = stmt.execute();
			if (!success)
			{
				trace(stmt.error);
				return null;
			}
			var result:EitherType<MySQLi_Result,Bool> = stmt.get_result();
			if (result)
			{
				data = cast(result, MySQLi_Result).fetch_all(MySQLi.MYSQLI_ASSOC);
			}			
			return(data);		
		}
		else
			trace(stmt.error);
		//return null;
		return untyped __call__("array", 'ERROR', stmt.error);
	}
	
	public function query(sql:String):NativeArray
	{
		//trace(sql);
		//sql = S.my.real_escape_string(sql);
		trace(sql);
		var res:EitherType < MySQLi_Result, Bool > = S.my.query(sql, MySQLi.MYSQLI_ASSOC);
		if (res)
		{
			var data:NativeArray = cast(res, MySQLi_Result).fetch_all(MySQLi.MYSQLI_ASSOC);
			return(data);		
			//return Lib.hashOfAssociativeArray(data);
		}
		else
			trace(res + ':' + S.my.error);
		return null;
	}
	
	public function buildCond(whereParam:String, sb:StringBuf, phValues:Array<Array<Dynamic>>):Bool
	{
		var where:Array<Dynamic> = whereParam.split(',');
		trace(where);
		if (where.length == 0)
			return false;
		var first:Bool = true;
		for (w in where)
		{
			if (first)
				sb.add(' WHERE ' );
			else
				first = false;
				
			var wData:Array<String> = w.split('|');
			var values:Array<String> = wData.slice(2);
			trace(wData);
			
			switch(wData[1].toUpperCase())
			{
				case 'BETWEEN':
					if (!(values.length == 2) && values.foreach(function(s:String) return s.any2bool()))
						S.exit( 'BETWEEN needs 2 values - got only:' + values.join(','));
					sb.add(quoteField(wData[0]));
					sb.add(' BETWEEN ? AND ?');
					phValues.push([wData[0], values[0]]);
					phValues.push([wData[0], values[1]]);
				case 'IN':					
					sb.add(quoteField(wData[0]));					
					sb.add(' IN(');
					sb.add( values.map(function(s:String) return '?').join(','));							
					sb.add(')');
				case 'LIKE':					
					sb.add(quoteField(wData[0]));
					sb.add(' LIKE ?');
					phValues.push([wData[0], wData[2]]);
				case _://PLAIN VALUE
					sb.add(quoteField(wData[0]));
					if( wData[1] == 'NULL' )
						sb.add(" IS NULL");
					else {
						sb.add(" = ?");
						phValues.push([wData[0],wData[1]]);	
					}			
			}			
		}
		return true;
	}

	public function buildGroup(groupParam:String, sb:StringBuf):Bool
	{
		//TODO: HANDLE expr|position
		var fields:Array<String> = groupParam.split(',');
		if (fields.length == 0)
			return false;
		sb.add(' GROUP BY ');
		fields = fields.map(function(f:String)
		{
			var g:Array<String> = f.split('|');
			return  quoteField(g[0]) + ( g.length == 2 && g[1] == 'DESC'  ?  ' DESC' : '');
		});
		sb.add(fields.join(','));
		return true;
	}
	
	public function buildOrder(orderParam:String, sb:StringBuf):Bool
	{
		var fields:Array<String> = orderParam.split(',');
		if (fields.length == 0)
			return false;
		sb.add(' ORDER BY ');
		sb.add(fields.map(function(f:String) return quoteField(f)).join(','));
		return true;
	}
	
	public function buildLimit(limitParam:String, sb:StringBuf):Bool
	{
		sb.add(' LIMIT ' + Std.parseInt(limitParam));
		return true;
	}
	
	/*public function whereParam2sql(whereParam:String, phValues:StringMap<Dynamic>):String
	{
		var where:Array<Dynamic> = whereParam.split(',');
		trace(where);
		if (where.length == 0)
			return '';
		var phString:String = '';
		for (w in where)
		{

			var wData:Array<Dynamic> = w.split('|');
			trace(wData);
			if (phString == '')
				phString += 'WHERE `' + 	wData[0] + '` ';	
			else
				phString += 'AND `' + 	wData[0] + '` ';
			switch(wData[2])
			{
				case 'exact':
					phString += '= ? ';
					phValues.set(wData[0], wData[1]);
				case 'any':
					phString += 'LIKE ? ';
					phValues.set(wData[0], '%' + wData[1] + '%');							
				case 'end':
					phString += 'LIKE ? ';
					phValues.set(wData[0], '%' + wData[1]);		
				case 'start':
					phString += 'LIKE ? ';
					phValues.set(wData[0],  wData[1] + '%');							
			}
			
		}
		return phString;
	}
	
	public function whereString(matchType:String):String 
	{
		var wS:String = '';
		return switch(matchType)
		{
			case 'exact':
				'=';
			default:
				'oops';
		}
	}*/
	
	function quoteField(f : String) {
		return KEYWORDS.exists(f.toLowerCase()) ? "`"+f+"`" : f;
	}	
	
	public function new() {}
	
	public function json_encode():EitherType<String,Bool>
	{
		return untyped __call__("json_encode", data);
	}
	
}