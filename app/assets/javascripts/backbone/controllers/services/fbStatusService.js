define( [ 'jquery', 'backbone', 'underscore', 'models/eventBus', 'models/user' ],
 	function( $, Backbone, _, eventBus, user ) {
 		
	
	function onLoginStatus( response ) {
		
		eventBus.dispatch( eventBus.e.fbOnLoginStatus, response )

	}


	var service = {
		
		getLoginStatus : function() {
		
			FB.getLoginStatus( onLoginStatus );
			
		}
		
	}

	return service;

} );