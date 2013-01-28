//this is currently the web app version, but we can swap in a native app version
//define( [ 'controllers/services/cookieService', 'controllers/eventBus' ], function( service, eventBus ) {

define(function(require, exports, module) {
	
	var service =  require('controllers/services/cookieService'),
		eventBus = require('controllers/eventBus'),
		User = require('models/user'),
		fbController = require('controllers/fbController');
	
	/**
	 * Fired on init, listens and waits for relevant events
	 */
	var setupListeners = function() {
	
		eventBus.listen( eventBus.e.fbStatusRetrievalComplete, onFbStatusRetrievalComplete, userController );	
		
	};
	
	/**
	 * We have all data from Facebook, and will also have saved user data (FB not called until we have this)
	 * Now we reconcile
	 */
	var onFbStatusRetrievalComplete = function() {
		
		// locally we have saved User data (if any) from cookie / file
		
		// we have this augmented with FB status + details (if any)
		
		// 1. get user data from db
		
		// 2. update db with updated data
		
		// 3. update saved user appropriately - i.e. rails login, or write to local file
		
	};
	
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
