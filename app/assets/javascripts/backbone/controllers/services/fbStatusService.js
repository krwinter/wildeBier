/**
 * Service to get user's login/authentication status from Facebook
 */
define(function(require, exports, module) {
	
	var eventBus = require('controllers/eventBus');
	
	function onLoginStatus( response ) {
		
		eventBus.dispatch( eventBus.e.fbOnLoginStatus, response )

	}


	var service = {
		
		getLoginStatus : function() {
		
			FB.getLoginStatus( onLoginStatus );
			
		}
		
	}

	module.exports = service;

} );