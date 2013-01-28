//this is currently the web app version, but we can swap in a native app version
//define( [ 'controllers/services/cookieService', 'controllers/eventBus' ], function( service, eventBus ) {

define(function(require, exports, module) {
	
	var service =  require('controllers/services/cookieService'),
		eventBus = require('controllers/eventBus');
		User = require('models/user');
		fbController = require('controllers/fbController');
		
	
	var userController = {
		
		init : function() {
			
			console.log('user controller INIT');
			
			//we're using Facebook, so initialize it
			fbController.init();
			
			this.getSavedUser();
			
		},
		
		// saved, so we assume will be synchronous
		getSavedUser	: function() {
			
			var userObj = service.get();
			
			var user = User.set( userObj );
			
			// we dispatch this whether user or not
			eventBus.dispatch( eventBus.e.savedUserRetrieved, user );
		
		}	
		
		
		
	}
	
	return userController;
	
});
