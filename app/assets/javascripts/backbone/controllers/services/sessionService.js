/**
 * Session management / session service
 * Service interface between the app and session management
 * 
 * currently the web app version, uses sessions and rails sessions, but we can swap in a native app version
 */

define(function(require, exports, module) {

	var eventBus = require('controllers/eventBus'),
		$ = require('jquery');
	
	var onLoginSuccess = function( userObj) {
		
		eventBus.dispatch( eventBus.e.loginSuccess, userObj );
	
	};
	
	var onLoginError = function( response ) {
		
		var errorObj = $.parseJSON( response.responseText );
		
		eventBus.dispatch( eventBus.e.loginError, errorObj );
	
	};
	
	var service = {
		
		// in this service, we we are in a rails app
		get	: function() {
			
			// our rails page will write session data into a script tag, if the user exists
			var userObj,
				userJSON = $( "#rails_user_data" ).html();
			
			// if we are a logged in with a session, we can populate the userObj
			if ( userJSON ) {
        		userObj     = $.parseJSON( userJSON.replace(/\&quot\;/g, '"' ) );
			}
			
			return userObj;
			
		},
		
		create : function() {
			
		},
		
		signout : function() {
			
			// delete session / session - should also update db
			console.log('session service signout');
			
			$.ajax({
				
				url : '/signout',
				type : 'DELETE',
				success : function() { console.log('signout success') },
				error : function() { console.log('signout ERROR') }
				
			});
			
			var userObj = {};
			
			// when done dispatch onUserSignout
			eventBus.dispatch( eventBus.e.appUserSignoutComplete, userObj );
			
		},
		
		login : function( loginObj ) {
			
			var userData = {
				
				'session[email]' : loginObj.un,
				'session[password]' : loginObj.pw
			};
			
			$.ajax({
				
				url : '/sessions',
				type : 'POST',
				data : userData,
				dataType : 'json',
				success : onLoginSuccess,
				error : onLoginError
				
				
			});
			
		}	
		
		
		
	}
	
	module.exports = service;
	
});
