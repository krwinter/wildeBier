define( [ 'jquery', 'backbone', 'underscore' ],
 	function( $, Backbone, _ ) {
	

	

//	var eventBus = Backbone.Model.extend({
	var eventBus = {
	
	    busObj : {},

	    initialize : function() {
	       	console.log('event bus init');
	       	//_.extend( this.busObj, Backbone.Events );
	    },
	    
	    
	    dispatch : function( event, args ) {
	    	
	    	this.busObj.trigger( event, args );
	    },
	    
	    listen : function( event, callback, context ) {
	    	
	    	this.busObj.on( event, callback, context )
	    
	    },
	    
	    remove : function( event, callback, context ) {
	    	
	    	this.busObj.off( event, callback, context );
	    
	    }
		
	
	};
	
	
	_.extend( eventBus.busObj, Backbone.Events );
	
	return eventBus;

});