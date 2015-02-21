package model;

import sys.db.Manager;
import sys.db.Object;

using Lambda;

/**
 * ...
 * @author axel@cunity.me
 */
class SManager<T : Object> extends Manager<T>
{

	public function new(classval:Class<T>) 
	{
		super(classval);
		
	}
	
	override 	function addCondition(s : StringBuf,x) {
		var first = true;
		if( x != null )
			for( f in Reflect.fields(x) ) {
				if( first )
					first = false;
				else
					s.add(" AND ");
				
				var d = Reflect.field(x, f);
				if (cast(d, String).indexOf('|')>0)
				{
					var parts:Array<String> = cast(d, String).split('|');
					switch(parts[0])
					{
						case 'BETWEEN':
							s.add(" BETWEEN ");
							getCnx().addValue(s, parts[1]);
							s.add(" AND ");
							getCnx().addValue(s, parts[2]);
						case 'IN':
							s.add('IN(');
							var i:Int = 0;
							parts.slice(1).map(function(p:String) s.add( (i++ > 1?',':'') + quoteField(p) ));							
							s.add(')');
						case 'ORDER BY':
							s.add(" ORDER BY ");
							s.add(quoteField(f));
							if (parts.length == 2 && parts[1] == 'DESC')						
								s.add(parts[1]);
						case 'GROUP BY':
							s.add(" GROUP BY ");
							s.add(quoteField(f));
							if (parts.length > 1)	
							{
								var i:Int = 0;
								parts.slice(1).map(function(p:String) s.add( (i++ > 1?',':'') + quoteField(p)));
							}
															
						case _:
							trace('oops:' + parts[0]);
					}
					continue;
				}
				s.add(quoteField(f));
				if( d == null )
					s.add(" IS NULL");
				else {
					s.add(" = ");
					getCnx().addValue(s,d);
				}		
			}
		if( first )
			s.add("TRUE");
	}
	
}