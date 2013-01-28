//define( ['views/listView', 'models/beer', 'models/eventBus', 'models/user', 'controllers/fbController' ], 
//function( ListView, Beer, eventBus, User, fbController ) {
define( [ 'models/beer', 'controllers/eventBus',
		'controllers/userController', 'controllers/viewController'], 
		function(beer, eventBus,
			userController, viewController ) {	

	function setupListeners() {
		
		// is run;
		
	}

	

	
	var app = {
		
		init : function() {
			console.log('=== INIT ===');
			
			setupListeners();
			
			viewController.init();
			
			userController.init();
			
			// fire up user controller
			// get user from: 
			//			local file storage (native app)
			//			cookie (web app)
			
			
			// then either present login / register
			
			
			
			// or get beer data
			
			/*
			var userJSON = $( "#rails_user_data" ).html();
			
			if ( userJSON ) {
        		var	userObj     = $.parseJSON( userJSON.replace(/\&quot\;/g, '"' ) );
			
				this.user = User.set( userObj );
			}
			
			
			fbController.init();
			
			var list = new ListView( { el : $('#list')} );
			
			//$("#listHolder").html(list.el);
			*/
		}
		
		
	};
	
	return app;
});
