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
		
	};
	
	/**
	 * We have all data from Facebook, and will also have saved user data (FB not called until we have this)
	 * Now we reconcile
	 */
	var onFbStatusRetrievalComplete = function() {
		
		console.log('fb status retrieval complete');
		
		
		// sync any changes we've accumulated
		Backbone.sync( 'update', User, {
			
			success : dbUpdateSuccess,
			error : function( a,b,c ) { 
				console.log( 'ERROR!!!!');
				}
			
		} );
		
		//TODO - REMOVE after figuring out how to test correctly
		eventBus.dispatch( eventBus.e.userReconciled );
	};
	
	/**
	 * Called when we successfully update user db
	 */
	var dbUpdateSuccess = function() {
		console.log('db update success');
		eventBus.dispatch( eventBus.e.userReconciled );

	}
	
	var controller = {
		
		init : function() {
			
			console.log('user controller INIT');
			
			setupListeners();
			
			//we're using Facebook, so initialize it
			fbController.init();
			
			this.getSavedUser();
			
		},
		
		// saved, so we assume will be synchronous
		getSavedUser	: function() {
			
			var userObj = cookieService.get();
			
			var user = User.set( userObj );
			
			// we dispatch this whether user or not
			eventBus.dispatch( eventBus.e.savedUserRetrieved, user );
		
		}	
		
		
		
	}
	
	module.exports = controller;
	
});
