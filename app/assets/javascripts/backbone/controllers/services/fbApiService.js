define( [ 'jquery', 'backbone', 'underscore', 'models/eventBus', 'models/user' ],
 	function( $, Backbone, _, eventBus, user ) {
 		

	function onMe( response ) {
		
		eventBus.dispatch( eventBus.e.fbOnMeApi, response )

	}

	var service = {
		
		loadMe : function() {
			
			 FB.api('/me', onMe );
		}
	}
	
	return service;

} );