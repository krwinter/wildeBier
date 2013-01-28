/**
 * Service to make API calls to Facebook 
 */
define(function(require, exports, module) {

	var eventBus = require('controllers/eventBus');
	

	function onMe( response ) {
		
		eventBus.dispatch( eventBus.e.fbOnMeApi, response )

	}

	var service = {
		
		loadMe : function() {
			
			 FB.api('/me', onMe );
		}
	}
	
	module.exports = service;

} );