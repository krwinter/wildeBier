
define(function(require, exports, module) {
	
	var viewController = require('controllers/viewController'),
		userController = require('controllers/userController');

	var viewTarget = '#app-main';
	
	var setupListeners = function() {
		
		// is run;
		
	};

	
	var app = {
		
		init : function() {
			console.log('=== INIT ===');
			
			setupListeners();
			
			viewController.init( {rootElement : viewTarget });
			
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
	
	module.exports = app;
});
