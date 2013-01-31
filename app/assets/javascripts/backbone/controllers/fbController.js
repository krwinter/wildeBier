/**
 * fbController.js
 * 
 * Controls all synching with Facebook
 * As we get data from Facebook, we update our local User object with the data
 * Once we get it all the userController will handle the reconciliation
 * 
 */
define(function(require, exports, module) {
	
	var config = require('config/config'),
		eventBus = require('controllers/eventBus'),
		statusService = require('controllers/services/fbStatusService'),
		apiService = require('controllers/services/fbApiService'),
		loginService = require('controllers/services/fbLoginService'),
		logoutService = require('controllers/services/fbLogoutService'),
		User = require('models/user');
	
	
	/**
	 * Fired on init, listens and waits for relevant events
	 */
	var setupListeners = function() {
	
		eventBus.listen( eventBus.e.fbSdkLoaded, onSdkLoaded, controller );

		eventBus.listen( eventBus.e.fbInitiateLogin, onInitiateLogin, controller );
		eventBus.listen( eventBus.e.fbOnLoginResponse, onLoginResponse, controller );
		
		eventBus.listen( eventBus.e.fbOnLoginStatus, onLoginStatus, controller );
		eventBus.listen( eventBus.e.fbOnMeApi, onMeApi, controller );
		eventBus.listen( eventBus.e.fbOnLogout, onFbLogout, controller );	

	
		
	};
	
	/**
	 * Called when someone clicks 'login w/fb button', for example
	 */
	var onInitiateLogin = function() {
		
		controller.initiateLogin();
	};
	
	/**
	 * Handle response from login call
	 */
	var onLoginResponse = function( response ){
		
		if ( response.status === 'connected' ) {
			
			controller.getAuthenticatedUserData();
			
			//log us in if we're not'
			if ( !User.loggedIn() ){

				//login user				
				
			}
			
			// call get external status 
			
		}
		
	};
	
	/**
	 * Handle loginStatus response from Facebook
	 * 
 	 * @param {Object} response response from Facebook - see https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
	 */
	var onLoginStatus = function( response ) {
		
		// this should be done nby else block, or when me api returns
		//User.set( 'fb_status', response.status );
		
		//if we're authenticated, get user
		if ( response.status === 'connected' ) {
			
			controller.getAuthenticatedUserData();
		
		} else { // 'not_authorized' || not logged in
			
			updateLocalUser( response );
			
		} 
	};
	
	/**
	 * Handle ME Api response from Facebook
	 * 
 	 * @param {Object} response response from Facebook - see https://developers.facebook.com/docs/reference/javascript/FB.api/
	 */
	var onMeApi = function( response ){
		
		console.log('onMeApi');
		
		// update local user object
		updateLocalUser( response );
		
	};
	
	/**
	 * Update app user with new data - parse response and
	 * then dispatch for userController to deal with
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
		
		eventBus.dispatch( eventBus.e.fbStatusRetrievalComplete, newUserData );
		
	}
	
	
	var onFbLogout = function( response ) {
		
		//update user, dispatch event
		var userObj = {
			
				fb_status : response.status
			 
			 	// and anything else
			 };
		
		
		eventBus.dispatch( eventBus.e.fbSignoutComplete, userObj );

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
	    //TODO - parameterize FB config
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : config.fbAppId, //'132021983616250'
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
	 * Handler invoked after FB SDK is loaded
	 */
	var onSdkLoaded = function() {

		controller.sdkLoaded = true;
		
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
			
			this.loadSdk();
		},
		
		/**
		 * We break this out separately for tests - make it public so we can disable during tests so we don't do SDK auth 100x each run
		 */
		loadSdk : function() {
			
			initFbSdk();
		},
		
		sdkLoaded : undefined,
		
		/**
		 * Calls fbLoginService
		 */
		initiateLogin : function() {
			
			//if ( User.get('fb_status') !== 'connected' ) {
				
				loginService.login();

			//} else {
				
				//we are already connected, call session service
				
			//}
			//
			
		},
		
		
		/**
		 * We don't know FB status of user, so we want to make API call to see'
		 */
		getLoginStatus : function() {
			
			statusService.getLoginStatus();
		},
		
		/**
		 * User is authenticated, so we trigger call to get extra info from FB 
		 */
		getAuthenticatedUserData : function() {
			
			console.log('get auth user data');
			apiService.loadMe();
			
		},
		
		
		signout : function() {
			
			logoutService.logout();
		}
		
	}
	
	module.exports = controller;


});
