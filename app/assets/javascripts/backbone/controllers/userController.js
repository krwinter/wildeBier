//this is currently the web app version, but we can swap in a native app version
//define( [ 'controllers/services/cookieService', 'controllers/eventBus' ], function( service, eventBus ) {

define(function(require, exports, module) {
	
	var cookieService =  require('controllers/services/cookieService'),
		eventBus = require('controllers/eventBus'),
		User = require('models/user'),
		fbController = require('controllers/fbController'),
		Backbone = require('backbone');
	
	/**
	 * Fired on init, listens and waits for relevant events
	 */
	var setupListeners = function() {
		
		eventBus.listen( eventBus.e.fbStatusRetrievalComplete, onFbStatusRetrievalComplete, controller );	
		eventBus.listen( eventBus.e.initiateSignout, initiateSignout, controller );	
		
	};
	
	/**
	 * We have all data from Facebook, and will also have saved user data (FB not called until we have this)
	 * Now we reconcile
	 */
	var onFbStatusRetrievalComplete = function() {
		
		console.log('fb status retrieval complete');
		
		if ( User.get('id') ) {
			
			// sync any changes we've accumulated
			Backbone.sync( 'update', User, {
				
				success : dbUpdateSuccess,
				error : function( a,b,c ) { 
					console.log( 'ERROR!!!!');
					}
			} );
			
		} else {
			
		}
		
		//TODO - MOVE to else block, restore in db update success, after figuring out how to test correctly
		eventBus.dispatch( eventBus.e.userReconciled );
	};
	
	//TODO - PUT BACK here after we figure out how to test
	/**
	 * Called when we successfully update user db
	 */
	var dbUpdateSuccess = function() {
		console.log('db update success');
		
		//eventBus.dispatch( eventBus.e.userReconciled );

	};
	
	var initiateSignout = function() {
		
		controller.initiateSignout();
		
	}
	
	var controller = {
		
		init : function() {
			
			console.log('user controller INIT');
			
			setupListeners();
			
			this.getSavedUser();
			
		},
		
		/**
		 * Use service to retrieve saved user credentials - e.g. cookie, or local file data
		 */ 
		getSavedUser	: function() {
			
			//saved, so we assume will be synchronous
			var userObj = cookieService.get();
			
			var user = User.set( userObj );
			
			//we have our user - check with other services
			if ( User.known() ) {
				
				this.getExternalUserStatus();
			
			// we're all done
			} else {
				
				eventBus.dispatch( eventBus.e.userReconciled );

			}
			
			// we dispatch this whether user or not
			//eventBus.dispatch( eventBus.e.savedUserRetrieved, User );
		
		},
		
		/**
		 * Make calls to external services to get external info about user
		 * 
		 */
		getExternalUserStatus : function() {
			
			//Facebook
			if ( User.get('fb_user_id') ) {
				
				//we're using Facebook, so initialize it
				fbController.init();
				
			} else {
				
				eventBus.dispatch( eventBus.e.userReconciled );
			
			}
			
		},
		
		/**
		 * Start the signout process
		 */
		initiateSignout : function() {
			
			//service call to cookie manager to reset cookie
			cookieService.signout();
			
		}	
		
		
		
	}
	
	module.exports = controller;
	
});
