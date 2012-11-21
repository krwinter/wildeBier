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
	
	}
	
	function onLoginStatus( response ) {
		
		fbStatusResponse = response;
		
		if (response.status === 'connected') {
		    // connected
		    console.log('connected');
		    console.log(response);
		    
			fbController.getUser();
		    
	   		// eventBus.dispatch( 'fbLoginSuccess', response )
		    
		} else if (response.status === 'not_authorized') {
		    // not_authorized
		    console.log('not auth');
			//updateUser( response );
		} else {
		    // not_logged_in
		    console.log('not logged in');
			//updateUser( response );
		}
		
		
	}


	function fetchFbUser( fbStatusResponse ) {
	    console.log('Welcome!  Fetching your information.... ');
	    FB.api('/me', function( fbUserResponse ){ 
	    	onFetchFbUser( fbStatusResponse, fbUserResponse ); 
	    } );
	}

	    
	var onLogin = function(response) {
				
        if (response.authResponse) {
            // connected
            
            console.log(' login success')
            // dispatch logged in event
            //eventBus.dispatch( 'fbLoginSuccess', response )
            
            // get first_name, last_name
            
           fetchFbUser( response );
       
        } else {
        	// means
            // response.authRespone = null
            // response.status="not_authorized"
            console.log(' login fail or cancel')
	    }
		    
	},
   
   
	
	onFetchFbUser = function( fbStatusResponse, fbUserResponse ) {
		console.log( 'wow');
		
		// just add firstname and last name to main auth responseObj now
		fbStatusResponse.first_name = fbUserResponse.first_name;
		fbStatusResponse.last_name = fbUserResponse.last_name;
		
		updateUser( fbStatusResponse )
	},
	
	
	updateUser = function( response ) {
		
		// 'connected', 'not_authorized', 'not_logged_in'
		user.set( { fb_status : response.status });
		
		if ( response.first_name && response.last_name ) {
			user.set( { first_name : response.first_name,
						last_name : response.last_name
					 } );
		}
		
		if ( response.status == 'connected' ) {
			var r = response.authResponse;
		
			$('.fb-login').html('FB YES!');
			
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
		
		
			// UPDATE FACEBOOK INFO VIEW
			var fbLoginElement = $('.fb-login');
			fbLoginElement.html('Login With Facebook');
			
			// click to login
			fbLoginElement.click( fbController.login );
			
		}
		
		updateUserDb();
		
	},
	
	// create needs separate place
	updateUserDb = function() {
		
		if ( user && user.id ) {
		
			Backbone.sync( 'update', user, {
				
				success : dbUpdateSuccess
				
			} );
		}
		
	//user.save( { success : function() { alert('db update success')} } );
		
	},
	
	dbUpdateSuccess = function( model, response ) {
		
		console.log('db update success' );
		if ( document.location !== 'home' ) {
			document.location = "http://localhost:3000";
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
		   
		   console.log('successssssss');
		   
		   fbController.getLoginStatus();
		    
		    
		  }
		
	},
	
	fbStatusResponse,   
	   
	fbController = {
		
		init : function() {
			
			initFb();
			
		},
		
		login : function() {
			
			FB.login( onLogin );
			
		},
		
		getLoginStatus : function() {
		
			// try not doing callback, use dispatch event from service
			//loginService.getLoginStatus( onLoginStatus );
			loginService.getLoginStatus( );
		},
		
		getUser : function() {
			
			apiService.loadMe();
		}
		
	}
	    
	return fbController;	


});