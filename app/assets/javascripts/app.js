define( ['views/listView', 'models/beer', 'models/eventBus', 'models/user', 'controllers/fbController' ], 
function( ListView, Beer, eventBus, User, fbController ) {
	

	
	var app = {
		
		init : function() {
			console.log('=== INIT ===');
			
			var userJSON = $( "#rails_user_data" ).html();
			
			if ( userJSON ) {
        		var	userObj     = $.parseJSON( userJSON.replace(/\&quot\;/g, '"' ) );
			
				this.user = User.set( userObj );
			}
			
			
			fbController.init();
			
			var list = new ListView( { el : $('#list')} );
			//var list = new ListView();
			$("#listHolder").html(list.el);
        	//var beer = new Beer( { name: 'Belgian Leggy Blond' } );
			
		},
		
		user : {}
	};
	
	return app;
});
