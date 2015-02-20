package model;


import haxe.macro.Context;
import haxe.macro.Expr;


import haxe.PosInfos;

/**
 * ...
 * @author axel@cunity.me
 */
class Helper
{

	macro static public function createExpr( field:String, ?p : Position):Expr
	{
		 //return  Context.makeExpr('$' + field, p);
		return { expr : EConst(CIdent('$' + field)), pos:Context.currentPos() };
	}
	
}