define( ['views/listView', 'models/beer' ], function( ListView, Beer ) {
	
	var app = {
		
		init : function() {
			console.log('=== INIT ===');
			
			var list = new ListView( { el : $('#list')} )
        	//var beer = new Beer( { name: 'Belgian Leggy Blond' } );
			
		}
	};
	
	return app;
});
