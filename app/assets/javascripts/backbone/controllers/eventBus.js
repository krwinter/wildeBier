/**
 * Main event bus for app
 */
define(function(require, exports, module ){

	var _ = require('underscore'),
		Backbone = require('backbone');

	var events = {
		
		savedUserRetrieved : 'savedUserRetrieved',
		
		fbSdkLoaded : 'fbSdkLoaded',
		fbOnLoginStatus : 'fbOnLoginStatus',
		fbOnLogin : 'fbOnLogin',
		fbOnMeApi : 'fbOnMeApi',
		fbOnLogout : 'fbOnLogout',
		
		// after we complete all our calls
		fbStatusRetrievalComplete : 'fbStatusRetrievalComplete',
		
		
		initiateSignout : 'initiateSignout',	// intitial trigger top start the process
		appUserSignoutComplete : 'appUserSignoutComplete',		// when user finishes signing out of app
		fbSignoutComplete : 'fbSignoutComplete',// when all signut stages are complete
		
		initiateLogin : 'initiateLogin',
		loginSuccess : 'loginSuccess',
		loginError : 'loginError',
		
		userReconciled : 'userReconciled'	// all user processing is done, tell the rest of the app
		

	};
	

	var eventBus = {
	
	    busObj : {},

	    initialize : function() {
	       	console.log('event bus init');
	    },
	    
	    
	    dispatch : function( event, args ) {
	    	
	    	this.busObj.trigger( event, args );
	    },
	    
	    listen : function( event, callback, context ) {
	    	
	    	this.busObj.on( event, callback, context )
	    
	    },
	    
	    remove : function( event, callback, context ) {
	    	
	    	this.busObj.off( event, callback, context );
	    
	    },
	    
	    // events as properties
	    e : events
		
	
	};
	
	
	_.extend( eventBus.busObj, Backbone.Events );
	
	module.exports = eventBus;

});