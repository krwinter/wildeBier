/**
 * fbController.js
 * 
 * Controls all synching with Facebook
 * 
 */
define(function(require, exports, module) {
	
	var eventBus = require('controllers/eventBus'),
		statusService = require('controllers/services/fbStatusService');
	
	//flags to check if we proceed
	var sdkLoaded = false,
		savedUserRetrieved = false;
	
	
	var setupListeners = function() {
	
		eventBus.listen( eventBus.e.savedUserRetrieved, onSavedUserRetrieved, fbController );	
		eventBus.listen( eventBus.e.fbSdkLoaded, onSdkLoaded, fbController );
		
		eventBus.listen( eventBus.e.fbOnLoginStatus, onLoginStatus, fbController );
	
		
	};
	
	var onLoginStatus = function( response ) {
		
		// fbStatusResponse = response;
// 		
		// if (response.status === 'connected') {
		    // console.log('connected', response);
// 		    
			// fbController.getUser();
// 		    
	   		// // eventBus.dispatch( 'fbLoginSuccess', response )
		// } else {
						// // UPDATE FACEBOOK INFO VIEW
			// var fbLoginElement = $('.fb-login');
			// fbLoginElement.html('Login With Facebook');
// 			
			// // click to login
			// fbLoginElement.click( fbController.login );
// 			
			// if (response.status === 'not_authorized') {
			    // console.log('not auth');
				// updateUser();
// 				
			// } else {
			    // console.log('not logged in');
				// updateUser( );
			// }
		// }
		
	}
	

	var initFbSdk = function() {
		
		 (function(d){
		     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement('script'); js.id = id; js.async = true;
		     js.src = "//connect.facebook.net/en_US/all.js";
		     ref.parentNode.insertBefore(js, ref);
	   	}(document));
	   
	   // ======================
	   
	   
	    // Additional JS functions here
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '132021983616250', // App ID
		      //channelUrl : '//quiet-thicket-1665.herokuapp.com/', // Channel File
		      status     : true, // check login status
		      cookie     : true, // enable cookies to allow the server to access the session
		      xfbml      : true  // parse XFBML
		    });
		   
		   console.log('FB SDK LOADED');
		   
		   eventBus.dispatch( eventBus.e.fbSdkLoaded );
		    
		  }
		
	};
	
	var onSavedUserRetrieved = function() {
		
		savedUserRetrieved = true;
		
		//TODO - more elegant way of making sure all conditions are met
		if ( sdkLoaded ) {
			controller.getLoginStatus();
		}
	}

	var onSdkLoaded = function() {
		
		sdkLoaded = true;

		//TODO - more elegant way of making sure all conditions are met
		if ( savedUserRetrieved ) {
			controller.getLoginStatus();
		}
	}
	
	
	
	
	var controller = {
		
		init : function() {
			
			console.log('fbController INIT');

			setupListeners();
			
			initFbSdk();
			
			
		},
		
		//TODO- temp, test - make tests work beter - remove
		reset : function() {
			
			sdkLoaded = false;
			savedUserRetrieved = false;
			
		},
		
		getLoginStatus : function() {
			
			if ( savedUserRetrieved && sdkLoaded ) {
				
				statusService.getLoginStatus();
			
			}
		}
		
	}
	
	module.exports = controller;


});
