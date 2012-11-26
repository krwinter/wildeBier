define( [ 'jquery', 'backbone', 'underscore', 'models/eventBus', 'models/user',
			'controllers/services/fbLoginService', 'controllers/services/fbStatusService',
			'controllers/services/fbApiService' ],
 	function( $, Backbone, _, eventBus, user,
 			loginService, statusService,
 			apiService ) {
	
/*
 * APP
 * 
 * login -> UPDATE + session
 * register -> UPDATE + session
 * 
 * session = :) - then FB getStatus
 * 
 * 
 * FB
 * 
 * FB login - no session, no FB ID 	-> INSERT + session
 * 			- no session, FB ID 	-> UPDATE + session
 * 			+ session +/- FB ID		-> UPDATE
 * 
 * 	FB connected = :)
 * 
 * 
 */
	
	function addEventListeners() {
		
		eventBus.listen( eventBus.e.fbOnLoginStatus, onLoginStatus, fbController );
		eventBus.listen( eventBus.e.fbOnMeApi, onMeApi, fbController );
		eventBus.listen( eventBus.e.fbOnLogin, onLogin, fbController );
	
	}
	
	function onLoginStatus( response ) {
		
		fbStatusResponse = response;
		
		if (response.status === 'connected') {
		    console.log('connected', response);
		    
			fbController.getUser();
		    
	   		// eventBus.dispatch( 'fbLoginSuccess', response )
		} else {
						// UPDATE FACEBOOK INFO VIEW
			var fbLoginElement = $('.fb-login');
			fbLoginElement.html('Login With Facebook');
			
			// click to login
			fbLoginElement.click( fbController.login );
			
			if (response.status === 'not_authorized') {
			    console.log('not auth');
				updateUser( response );
				
			} else {
			    console.log('not logged in');
				updateUser( response );
			}
		}
		
	}
	
	function onMeApi( response ) {
		console.log( 'onMeApi');
		
		// just add firstname and last name to main auth responseObj now
		fbStatusResponse.first_name = response.first_name;
		fbStatusResponse.last_name = response.last_name;
		fbStatusResponse.fb_username = response.username;
		$('.fb-login').html('FB YES! ' + response.first_name);
		$('.fb-login').append('<img id="profilePic" src="https://graph.facebook.com/' + response.username +'/picture" />')
		
		// we are logged in via facebook, either already from earlier, or just now
		updateUser( fbStatusResponse )
		
	}
	
	    
	function onLogin(response) {
				
        if (response.authResponse) {
            // connected
			$('.fb-login').html('FB YES-LOGIN!');
            
            console.log(' login success')
            // dispatch logged in event
            //eventBus.dispatch( 'fbLoginSuccess', response )
            
            // get first_name, last_name
            fbController.getUser();

       
        } else {
        	// means
            // response.authRespone = null
            // OR error OR cancel
            console.log(' login fail or cancel')
	    }
		    
	}
   
	function updateUserModelWithFbResponse() {
		
		response = fbStatusResponse;
			// 'connected', 'not_authorized', 'not_logged_in'
		user.set( { fb_status : response.status });
		
		if ( response.first_name && response.last_name ) {
			user.set( { first_name : response.first_name,
						last_name : response.last_name
					 } );
		}
		
		if ( response.status == 'connected' ) {
			var r = response.authResponse;
		
			
			user.set( { "fb_user_id" : r.userID,
						"fb_access_token" : r.accessToken,
						"fb_signed_request" : r.signedRequest,
						"fb_expires" : r.expiresIn
					 } );
		} else {
			// clear data from db?
			user.set( {	"fb_access_token" : null,
						"fb_signed_request" : null,
						"fb_expires" : null
			} );
		

		}
	}
	
	var updateUser = function( response ) {
		
		// how to sync users?
		// update local user with fb response date
		// then check to see if it's a logged in local user
		//		if logged in local user, just add latest fb stuff
		//		if not logged in local user, fetch db record by fbid 
		//			if fb record, update local user with non-fb user db data, sync to db, login
		//			if no fb record, just an insert
		
		if ( user && user.id ) {
		
			updateUserModelWithFbResponse();
			updateUserDb();
		
		} else {
			
			// if we have a fb user but don't know app user,
			// query for fbid
			// if fbid, update and create app session
			user.fetch( { 	queryParams : 	{ 
											fbid : fbStatusResponse.authResponse.userID
										 	}, 
							success : onQueryForAppUser	
						} );
			// else insert and create app session
			
		}
		
	
		
		
		
	},
	
	// should be called right after a user.fetch
	onQueryForAppUser = function( model, response, options ) {
		
		if ( response.id ) {
			updateUserModelWithFbResponse();
			updateUserDb();
		} else {
			createNewUser();
		}
	},
	
	createNewUser = function() {
		
		Backbone.sync( 'create', user, {
				
				success : startAppSession
				
			} );
	},
	
	startAppSession = function() {
		
		// call rails create session page
		console.log(' now login for rails!');
		
	},
	
	// create needs separate place
	updateUserDb = function() {
		
		if ( user && user.id ) {
		
			Backbone.sync( 'update', user, {
				
				success : dbUpdateSuccess
				
			} );
		}
		
	},
	
	dbUpdateSuccess = function( model, response ) {
		
		console.log('db update success' );
		// make sure rules followed - app logged in users on home view, else sign in
		if ( document.location.pathname !== '/' ) {
			//document.location = "http://ken.local:3000";
		}
		
		
		
	},
	
	initFb = function() {
		
		addEventListeners();
		
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
		   
		   fbController.getLoginStatus();
		    
		    
		  }
		
	},
	
	fbStatusResponse,   
	   
	fbController = {
		
		init : function() {
			
			initFb();
			
		},
		
		login : function() {
			
			loginService.login();
			
		},
		
		getLoginStatus : function() {
		
			// try not doing callback, use dispatch event from service
			//loginService.getLoginStatus( onLoginStatus );
			statusService.getLoginStatus();
		},
		
		getUser : function() {
			
			apiService.loadMe();
		}
		
	}
	    
	return fbController;	


});