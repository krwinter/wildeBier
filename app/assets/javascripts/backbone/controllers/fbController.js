define( [ 'jquery', 'backbone', 'underscore', 'models/eventBus', 'models/user' ],
 	function( $, Backbone, _, eventBus, user ) {
	
// 
				// function fbExamples() {
// 				  
// 						  
// 						  
					// function login() {
					    // FB.login(function(response) {
					        // if (response.authResponse) {
					            // // connected
// 					            
					            // // dispatch logged in event
					            // eventBus.dispatch( 'fbLoginSuccess', response )
					            // testAPI();
					        // } else {
					            // // cancelled
					            // // dispatch not logged in event
						        // }
						    // });
						// }
// 						
						// function testAPI() {
						    // console.log('Welcome!  Fetching your information.... ');
						    // FB.api('/me', function(response) {
						        // console.log('Good to see you, ' + response.name + '.');
						    // });
						// }
// 				
// 			
// 		
		  			// };
	

	    
	var onFbLogin = function( response ) {
	    	
	    	console.log('fb login success!', response, this );
	       //	this.fbAccessToken = response.user.fbAccessToken;
	    	
	   },
	   
	   
		onLoginStatus = function( response ) {
			
			
			if (response.status === 'connected') {
			    // connected
			    console.log('connected');
			    console.log(response);
			    
			    
			    
		   // eventBus.dispatch( 'fbLoginSuccess', response )
			    
			    
			} else if (response.status === 'not_authorized') {
			    // not_authorized
			    console.log('not auth');
			} else {
			    // not_logged_in
			    console.log('not logged in');
			}
			
			updateUser( response );
			
		},
		
		updateUser = function( response ) {
			
			// 'connected', 'not_authorized', 'not_logged_in'
			user.set( { fb_status : response.status });
			
			if ( response.status == 'connected' ) {
				var r = response.authResponse;
			
				$('#fb-info').html('FB YES!');
				
				user.set( { "fb_user_id" : r.userID,
							"fb_access_token" : r.accessToken,
							"fb_signed_request" : r.signedRequest,
							"fb_expires" : r.expiresIn
						 } );
		} else {
			// clear data from db
			$('#fb-info').html('FB NO');
		}
			
			updateUserDb();
			
		},
		
		updateUserDb = function() {
			
			Backbone.sync( 'update', user, {
				
				success : dbUpdateSuccess
				
			} );
			
		//user.save( { success : function() { alert('db update success')} } );
			
		},
		
		dbUpdateSuccess = function( model, response ) {
			
			console.log('db update success' );
			
			
			
		},
		
		initFb = function() {
			
			
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
	   
	fbController = {
		
		init : function() {
			
			initFb();
			
		},
		
		login : function() {
			
			
		},
		
		getLoginStatus : function() {
		
			FB.getLoginStatus( onLoginStatus );
		}
		
	}
	    
	return fbController;	


});