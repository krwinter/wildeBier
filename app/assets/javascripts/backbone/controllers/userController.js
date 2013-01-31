//this is currently the web app version, but we can swap in a native app version
//define( [ 'controllers/services/sessionService', 'controllers/eventBus' ], function( service, eventBus ) {

define(function(require, exports, module) {
	
	var config =  require('config/config'),
		sessionService =  require('controllers/services/sessionService'),
		eventBus = require('controllers/eventBus'),
		User = require('models/user'),
		fbController = require('controllers/fbController'),
		Backbone = require('backbone'),
		q = require('q');
	
	/**
	 * Fired on init, listens and waits for relevant events
	 */
	var setupListeners = function() {
		
		eventBus.listen( eventBus.e.fbStatusRetrievalComplete, onFbStatusRetrievalComplete, controller );	
		
		eventBus.listen( eventBus.e.initiateLogin, onInitiateLogin, controller );	
		eventBus.listen( eventBus.e.loginSuccess, onLoginSuccess, controller );	

		eventBus.listen( eventBus.e.initiateSignout, onInitiateSignout, controller );	
		eventBus.listen( eventBus.e.appUserSignoutComplete, onAppUserSignout, controller );	
		eventBus.listen( eventBus.e.fbSignoutComplete, onFbSignout, controller );	//from fb controller
		
	};
	
	/**
	 * Called after we get status back from fb
	 */
	var onFbStatusRetrievalComplete = function( userObj ) {
		
		console.log('fb status retrieval complete');
		
		User.set( userObj );
		
		if ( !User.loggedIn() ){
			
			//fetch user by fbid
			
			//then use session service to log them in
			
		} else {
		
			synchronizeDatabase();
			reconcileUser();
			
		}
		
	}
	
	/**
	 * We have all data we need, update our db
	 * TODO - currently fire and forget - nonfatal if this fails i guess
	 */
	var synchronizeDatabase = function() {
		
		if ( User.get('id') ) {
			
			// sync any changes we've accumulated
			Backbone.sync( 'update', User, {
				
				success :  function( a,b,c ) { console.log( '--user db update success'); },
				error : function( a,b,c ) { console.log( 'USER DB UPDATE ERROR!!!!'); }
			} );
			
		} else {
			
		}
		
	};
	

	var onInitiateSignout = function() {
		
		controller.initiateSignout();
		
	};
	
	// need method 'reconcileUser' - does db save, then depending on use case, can reset, clear, etc - then send event
	
	/**
	 * All user app signout steps have been completed
	 */
	var onAppUserSignout = function( userObj ) {
		
		//see if all steps completed
		User.set( userObj );
		
		// don't need to sync db - done for us by session handler
		//synchronizeDatabase(); // but we automatically signal that userReconciled - need to update db, then send reconciled
		
		User.clear(); //race condition waiting to happen!  other user services are waiting to return - fine for the time being
		
		reconcileUser();
	};
	
	/**
	 * All FB user signout steps have been completed
	 */
	var onFbSignout = function( userObj ) {
		
		User.set( userObj );
		
		synchronizeDatabase();
		
		reconcileUser();
	};
	
	/**
	 * Last step in any user operation.  After all other processes are done, make sure:
	 * 1. make sure all pending async user operations done
	 * 2. call userReconciled
	 */
	var reconcileUser = function() {
		console.log('==Reconcile User')
		eventBus.dispatch( eventBus.e.userReconciled );
	};
	
	/**
	 * Handles initiateLogin event - passes loginObj to controller public function
	 */
	 // TODO - do we need this extra step, or can we just handle in public function?
	var onInitiateLogin = function( loginObj ) {
		
		controller.initiateLogin( loginObj );
		
	};
	
	var onLoginSuccess = function( userObj ){
		
		User.set( userObj );
		
		fbController.getLoginStatus();
		
	}
	

	var controller = {
		
		init : function() {
			
			console.log('user controller INIT');
			
			setupListeners();
			
			fbController.init();
			
			this.getSavedUser();
			
		},
		
		/**
		 * Use service to retrieve saved user credentials - e.g. session, or local file data
		 */ 
		getSavedUser	: function() {
			
			//saved, so we assume will be synchronous
			var userObj = sessionService.get();
			
			var user = User.set( userObj );

			//TODO - we check for external fb automatically nowe
			eventBus.dispatch( eventBus.e.userReconciled );
			
			
			//TODO - for now we always check fb externally
			//we have our user - check with other services
			// if ( User.loggedIn() ) {
// 				
				// this.getExternalUserStatus();
// 			
			// // we're all done
			// } else {
// 				
				// eventBus.dispatch( eventBus.e.userReconciled );
// 
			// }
// 			
		},
		
		/**
		 * Make calls to external services to get external info about user
		 * 
		 */
		// TODO - this is 
		getExternalUserStatus : function() {
			
			// for now always init fb sdk
			// otherwise it's tricky to respond to 'login w/fb button'
			
			//Facebook
			//if ( config.useFacebook && User.get('fb_user_id') ) {
				
				//we're using Facebook, so initialize it
				//fbController.init();
				
			//} else {
				
			//	eventBus.dispatch( eventBus.e.userReconciled );
			
			//}
			
		},
		
		/**
		 * Start the signout process
		 */
		initiateSignout : function() {
			
			//service call to session manager to reset session
			sessionService.signout();
			
			if ( config.useFacebook && User.get( 'fb_user_id' ) ) {
				
				fbController.signout();
				
			}
			
		},
		
		initiateLogin : function( loginObj ){
			
			sessionService.login( loginObj );
			
		}	
		
		
	}
	
	module.exports = controller;
	
});
