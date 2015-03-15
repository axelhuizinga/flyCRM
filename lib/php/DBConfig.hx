package php;

/**
 * ...
 * @author axel@cunity.me
 */
class DBConfig
{

	public static  var db:String;
	public static  var user:String;
	public static  var pass:String;
	
	static function __init__() 
	{
		untyped __call__('require_once', '../../config/flyCRM.db.php');
		db = untyped __var__("VARDB");
		user = untyped __var__("VARDB_user");
		pass = untyped __var__("VARDB_pass");		
	}
	
	public static function checkOrCopyTable(srcTable:String, ?suffix:String='log'):Bool
	{
		var newTable:String = srcTable + '_' + suffix;
		var res:NativeArray = new Model().query('SHOW TABLES LIKE  $newTable');
		if (res[0] == null)
		{
			trace('create $newTable');
			var res:NativeArray = new Model().query('create TABLE $newTable like $srcTable');
			
		}
		//create TABLE tablename like SRCTABLE
		return false;
	}
}