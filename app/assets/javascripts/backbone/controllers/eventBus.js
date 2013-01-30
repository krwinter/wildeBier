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
		
		// after we complete all our calls
		fbStatusRetrievalComplete : 'fbStatusRetrievalComplete',
		
		// called after we've gotten all info we can about user
		userReconciled : 'userReconciled',
		
		initiateSignout : 'initiateSignout'

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