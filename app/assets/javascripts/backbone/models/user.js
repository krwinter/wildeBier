define( [ 'jquery', 'backbone', 'underscore', 'models/eventBus' ],
 	function( $, Backbone, _, eventBus ) {
	

	    
	var onFbLogin = function( response ) {
	    	
	    	console.log('fb login success!', response, this );
	       //	this.fbAccessToken = response.user.fbAccessToken;
	    	
	  };
	  
	var instance = null;



	var user = Backbone.Model.extend({
	
		defaults: {
	    	first_name: 'Great Beer',
	        last_name: 'Not Specified',
	        email: 'Truly a great beer.',
	        id : 'X',
	        fb_user_id : 'Y',
	        fb_access_token : 'Z',
	        fb_signed_request : '0',
	        fb_expires : '1'
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