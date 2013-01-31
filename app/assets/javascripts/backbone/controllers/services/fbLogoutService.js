/**
 * @author Ken Winter
 * Service to make logout calls to Facebook 
 */

define(function(require, exports, module) {

	var eventBus = require('controllers/eventBus');
	

	function onLogout( response ) {
		
		eventBus.dispatch( eventBus.e.fbOnLogout, response )

	}

	var service = {
		
		logout : function() {
			
			 FB.logout( onLogout );
		}
	}
	
	module.exports = service;

} );
