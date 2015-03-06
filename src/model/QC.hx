package model;
import haxe.ds.StringMap;
import haxe.EitherType;
import haxe.Json;
import me.cunity.php.db.MySQLi;
import me.cunity.php.db.MySQLi_Result;
import me.cunity.php.db.MySQLi_STMT;
import php.Lib;
import php.NativeArray;
import php.Web;

using Lambda;

/**
 * ...
 * @author axel@cunity.me
 */
@:keep
 class QC extends Model
{
		
	public static function create(param:StringMap<String>):EitherType<String,Bool>
	{
		var self:Clients = new Clients();	
		self.table = 'vicidial_list';
		trace(param);
		return Reflect.callMethod(self, Reflect.field(self,param.get('action')), [param]);
	}
		
}