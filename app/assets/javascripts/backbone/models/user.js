define(function(require, exports, module) {

	
	var Backbone = require('backbone'),
		eventBus = require('controllers/eventBus');

	function getQueryUrl( queryObj ) {
		
		if ( queryObj ) {
	    		
    		var queryString = '?';
    		for ( var key in queryObj ) {
    			queryString += key + '=' + queryObj[key] + '&';
    		}
    		
    		// remove last '&'
    		queryString = queryString.substr(0, queryString.length - 1 );
    		
    		return '/users' + queryString;
	   }
	}

	var instance = null;



	var user = Backbone.Model.extend({
	
		defaults: {
		  
	    },
	       
	    initialize : function() {
	       	console.log('user init' );
	       	
	       	
	    },
	    
	    sync : function( method, model, options ) {
	    	
	    	if ( method === 'read' && options[ 'queryParams' ] ) {
	    		
	    		options['url'] = getQueryUrl( options[ 'queryParams' ] );
	    	}
	    	
	    	Backbone.sync( method, model, options )
	    },
	    
	    url : function() {

   	    	return '/users/' + this.get( 'id' );
    	
	    }
		
	
	});
	
	// TODO - do we really want this as an enforced singleton?
	module.exports =  ( instance ) ? instance : instance = new user();
	

}); 