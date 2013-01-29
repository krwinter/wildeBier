/**
 * fbController.js
 * 
 * Controls all synching with Facebook
 * As we get data from Facebook, we update our local User object with the data
 * Once we get it all the userController will handle the reconciliation
 * 
 */
define(function(require, exports, module) {
	
	var eventBus = require('controllers/eventBus'),
		statusService = require('controllers/services/fbStatusService'),
		apiService = require('controllers/services/fbApiService'),
		User = require('models/user');
	
	
	/**
	 * Fired on init, listens and waits for relevant events
	 */
	var setupListeners = function() {
	
		eventBus.listen( eventBus.e.savedUserRetrieved, onSavedUserRetrieved, controller );	
		eventBus.listen( eventBus.e.fbSdkLoaded, onSdkLoaded, controller );
		
		eventBus.listen( eventBus.e.fbOnLoginStatus, onLoginStatus, controller );
		eventBus.listen( eventBus.e.fbOnMeApi, onMeApi, controller );
	
		
	};
	
	/**
	 * Handle loginStatus response from Facebook
	 * 
 	 * @param {Object} response response from Facebook - see https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
	 */
	var onLoginStatus = function( response ) {
		
		// set our status
		// TODO - do we need to do this, since we do it already in both cases?
		//TODO - do we want to mess with User here?  breaking encapsulation?
		//	may be ok if we only do FB-specific user attributes  
		User.set( 'fb_status', response.status );
		
		//if we're authenticated, get user
		if ( response.status === 'connected' ) {
			
			controller.getAuthenticatedUserData();
		
		} else { // 'not_authorized' || not logged in
			
			updateLocalUser( response );
			
			// dispatch event saying we have everything
			eventBus.dispatch( eventBus.e.fbStatusRetrievalComplete );
		} 
	};
	
	/**
	 * Update local User model with data from Me Api call
	 */
	var updateLocalUser = function( response ) {
		
		var newUserData = {};
		
		newUserData.fb_status = response.status;
		
		if ( response.authResponse ) {
			
			newUserData.fb_user_id = response.authResponse.userID;
			newUserData.fb_access_token = response.authResponse.accessToken;
			newUserData.fb_signed_request = response.authResponse.signedRequest;
			newUserData.fb_expires = response.authResponse.expiresIn;
			
		}
		
		//TODO - OK to break encapsulation here?  may be OK if we stick to FB-specific user stuff
		User.set( newUserData );
		
	}
	
	/**
	 * Handle ME Api response from Facebook
	 * 
 	 * @param {Object} response response from Facebook - see https://developers.facebook.com/docs/reference/javascript/FB.api/
	 */
	var onMeApi = function( response ){
		
		// update local user object
		updateLocalUser( response );
		
		// dispatch event saying we have everything
		eventBus.dispatch( eventBus.e.fbStatusRetrievalComplete );
		
	};
	
	/**
	 * Load FB SDK and fire event when loaded
	 */
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
	
	/**
	 * Handler for when saved user is retrieved by other component in app
	 */
	var onSavedUserRetrieved = function() {
		
		if ( User.get('fb_user_id') ) {
			
			controller.loadSdk();
		
		}
		
	}

	/**
	 * Handler invoked after FB SDK is loaded
	 */
	var onSdkLoaded = function() {

			controller.getLoginStatus();
	}
	
	
	
	/**
	 * Public object that is exported
	 */
	var controller = {
		
		/**
		 * Called on controller instantiation
		 */
		init : function() {
			console.log('controller INIT');

			setupListeners();
			
		},
		
		loadSdk : function() {
			
			initFbSdk();
		},
		
		/**
		 * For tests only - resets
		 * TODO- temp, test - make tests work beter - remove
		 */
		reset : function() {
			
			sdkLoaded = false;
			savedUserRetrieved = false;
			
		},
		
		/**
		 * We don't know FB status of user, so we want to make API call to see'
		 */
		getLoginStatus : function() {
			
			if ( savedUserRetrieved && sdkLoaded ) {
				
				statusService.getLoginStatus();
			
			}
		},
		
		/**
		 * User is authenticated, so we trigger call to get extra info from FB 
		 */
		getAuthenticatedUserData : function() {
			
			apiService.loadMe();
			
		}
		
	}
	
	module.exports = controller;


});
