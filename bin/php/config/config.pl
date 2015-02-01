#!C=>/perl64/bin/perl -w
use strict;

sub getData
{
	return 
	{
		views=>[
			ContextMenu=>{
				"items"=>
				[
					{
						link=>"clients",
						label=>"Mitglieder",
						onclick=>"go()"
					},
					{
						link=>"campaigns",
						label=>"Kampagnen",
						onclick=>"go()"
					},	
					{
						link=>"stats",
						label=>"Statistik",
						onclick=>"go()"
					},
					{
						link=>"settings",
						label=>"Einstellungen",
						onclick=>"go()"
					},			
				]
			}
		]
	};
};
return 1;