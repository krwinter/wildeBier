define( [ 'jquery', 'backbone', 'underscore', 'models/eventBus', 'models/user' ],
 	function( $, Backbone, _, eventBus, user ) {
 		

	function onMe( response ) {
		
	}

	var service = {
		
		loadMe : function() {
			
			 FB.api('/me', onMe );
		}
	}
	
	return service;

} );