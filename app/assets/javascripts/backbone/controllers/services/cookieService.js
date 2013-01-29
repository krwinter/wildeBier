//this is currently the web app version, but we can swap in a native app version

define(function(require, exports, module) {

	
	var service = {
		
		// in this service, we we are in a rails app
		get	: function() {
			
			// our rails page will write cookie data into a script tag, if the user exists
			var userObj,
				userJSON = $( "#rails_user_data" ).html();
			
			// if we are a logged in with a cookie, we can populate the userObj
			if ( userJSON ) {
        		userObj     = $.parseJSON( userJSON.replace(/\&quot\;/g, '"' ) );
			}
			
			return userObj;
			
		}	
		
		
		
	}
	
	module.exports = service;
	
});
