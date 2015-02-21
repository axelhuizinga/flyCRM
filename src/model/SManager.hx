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
	
	override public function dynamicSearch( x : {}, ?lock : Bool ) : List<T> {
		var s = new StringBuf();
		var fields:String = Reflect.field(x, 'fields');
		if (fields != null)
		{
			var ff:Array<String> = fields.split(',');
			ff = ff.map(function(fn:String) return quoteField(fn));
			s.add("SELECT " + ff.join(',') + " FROM ");
		}
		else
			s.add("SELECT * FROM ");
		s.add(table_name);
		s.add(" WHERE ");
		var opt = Reflect.field(x, 'options');
		if (opt != null)
			Reflect.deleteField(x, 'options');
		addCondition(s, x);
		if (opt != null)
		{
			addOptions(s, opt);
		}
		trace(s.toString());
		return unsafeObjects(s.toString(),lock);
	}
	
	override function addCondition(s : StringBuf,x) {
		var first = true; 
		if( x != null )
			for ( f in Reflect.fields(x) ) 
			{				
				var d = Reflect.field(x, f);
				var parts:Array<String> = cast(d, String).split('|');
				switch(parts[0].toUpperCase())
				{
					case 'BETWEEN':
						if(!first)
							s.add(" AND ");
						s.add(quoteField(f));
						s.add(' BETWEEN ');
						getCnx().addValue(s, parts[1]);
						s.add(' AND ');
						getCnx().addValue(s, parts[2]);
					case 'IN':
						if(!first)
							s.add(" AND ");						
						s.add(quoteField(f));
						s.add(' IN(');
						var i:Int = 0;
						parts.slice(1).map(function(p:String) s.add( (i++ > 1?',':'') + quoteField(p) ));							
						s.add(')');
					case 'LIKE':
						if(!first)
							s.add(" AND ");						
						s.add(quoteField(f));
						s.add(' LIKE ');
						getCnx().addValue(s, parts[1]);
					
														
					case _:
					s.add(quoteField(f));
					if( d == null )
						s.add(" IS NULL");
					else {
						s.add(" = ");
						getCnx().addValue(s,d);
					}			
				}
				if( first )
					first = false;
			}
		if( first )
			s.add("TRUE");
	}
	
	function addOptions(s:StringBuf,  v:Dynamic)
	{
		for (f in Reflect.fields(v))
		{
			var va = Reflect.field(v, f);
			s.add(
				switch(f)
				{
					case 'LIMIT':
						s.add(' LIMIT ');							
						getCnx().addValue(s, Std.parseInt(va));
					case 'ORDER BY':
						s.add(' ORDER BY ');
						s.add(quoteField(f));
						if (v == 'DESC')						
							s.add(va);
					case 'GROUP BY':
						s.add(' GROUP BY ');
						s.add(quoteField(f));
						if (v.length>0)
						{
							v = v.map(function(p:String) return quoteField(p));
							s.add(v.join(','));
						}	
					case _:
						trace('Unknow Option:' + f);	
				}
			);	
		}
		
	}
	
}