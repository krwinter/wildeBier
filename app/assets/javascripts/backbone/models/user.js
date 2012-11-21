define( [ 'jquery', 'backbone', 'underscore', 'models/eventBus' ],
 	function( $, Backbone, _, eventBus ) {
	

	    
	var onFbLogin = function( response ) {
	    	
	    	console.log('fb login success!', response, this );
	       //	this.fbAccessToken = response.user.fbAccessToken;
	    	
	  };
	  
	var instance = null;



	var user = Backbone.Model.extend({
	
		defaults: {
		  
	    },
	       
	    initialize : function() {
	       	console.log('user init' );
	       	
	       	
	    },
	    
	    url : function() {
	    	
	    	return '/users/' + this.get( 'id' );
	    
	    }
		
	
	});
	
	//eventBus.listen( 'fbLoginSuccess', onFbLogin, user );

	return ( instance ) ? instance : instance = new user();
	
	//return user;

});