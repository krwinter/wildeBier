define( [ 'jquery', 'backbone', 'underscore', 'models/eventBus', 'models/user' ],
 	function( $, Backbone, _, eventBus, user ) {
 		

	function onLogin( response ) {
		
		eventBus.dispatch( eventBus.e.fbOnLogin, response )

	}

	var service = {
		
		login : function() {
			
			 FB.login( onLogin );
		}
	}
	
	return service;



} );