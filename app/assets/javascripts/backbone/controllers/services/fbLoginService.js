/**
 * @author Ken Winter
 * Service to make login calls to Facebook 
 */

define(function(require, exports, module) {

	var eventBus = require('controllers/eventBus');
	

	function onLoginResponse( response ) {
		
		eventBus.dispatch( eventBus.e.fbOnLoginResponse, response )

	}

	var service = {
		
		login : function() {
			
			 FB.login( onLoginResponse );
		}
	}
	
	module.exports = service;

} );
