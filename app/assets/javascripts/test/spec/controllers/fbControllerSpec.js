define(function(require, exports, module ){
	
	var fbController = require('controllers/fbController'),
		eventBus = require('controllers/eventBus'),
		User = require('models/user');
	
	describe('Facebook controller',function(){
		
		beforeEach( function(){
			spyOn( fbController, 'getLoginStatus');
			spyOn( eventBus, 'dispatch').andCallThrough();
			
			// we're not really spying on this, just disabling loading the sdk for our tests
			spyOn( fbController, 'loadSdk' );
			
			fbController.init();
		});
		
		
		// ------- login status ----
		
		it('will get login status after sdk loaded', function(){
			eventBus.dispatch( eventBus.e.fbSdkLoaded );
			expect( fbController.getLoginStatus ).toHaveBeenCalled();
		});
		
		
		
		// ======   response from onLoginStatus  =======
		// TODO - make async?
		
		describe('in response to login status,', function() {
			
			beforeEach( function() {
				
				spyOn( fbController, 'getAuthenticatedUserData');
				spyOn( User, 'set').andCallThrough();
				
			});
			
			describe('user is not authenticated,', function() {
				
		
				it('will send fb user retrieval complete event if not authenticated on fb', function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : 'not_authorized' } );
					expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.fbStatusRetrievalComplete, { fb_status : 'not_authorized' } );
				});
				
				it('will send fb user retrieval complete event if not logged in on fb', function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : '' } );
					expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.fbStatusRetrievalComplete, { fb_status : '' } );
				});
				

				it('will dispatch fbStatusRetrievalComplete event if FB status !== authenticated', function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : '' } );
					expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.fbStatusRetrievalComplete, { fb_status : '' } );
				});
		
			});
			
			describe('user is authenticated,', function() {
				
				beforeEach( function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : 'connected' } );
				});
				
				
				it('will call fb me api', function() {
					expect(fbController.getAuthenticatedUserData ).toHaveBeenCalled();
				});

				it('will NOT dispatch fbStatusRetrievalComplete event yet', function() {
					expect( eventBus.dispatch ).not.toHaveBeenCalledWith( eventBus.e.fbStatusRetrievalComplete );
				});
				
				//TODO - test that local user object is NOT updated with anything else?
				
				describe('on response from ME api', function() {
					
					beforeEach( function() {
						
						var meResponse = {
							status : 'connected',
							authResponse : {
								accessToken : '12345',
								expiresIn : '6',
								signedRequest : 'abcde',
								userID : '789fgh'
							}
						};
						
						eventBus.dispatch( eventBus.e.fbOnMeApi, meResponse );
					});
					
				
					it('will dispatch fbStatusRetrievalComplete event with updated userObj', function() {
						var userObj = {
							fb_access_token : '12345',
							fb_expires : '6',
							fb_signed_request : 'abcde',
							fb_user_id : '789fgh',
							fb_status : 'connected'
						};
						expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.fbStatusRetrievalComplete, userObj );
						
					});
			
				});
			});
		
		});
		
		describe('Logging in with Facebook', function() {
		
			it('in response to clicking "login w/Facebook" button', function() {
				
				spyOn( fbController, 'initiateLogin' );
				eventBus.dispatch( eventBus.e.fbInitiateLogin );
				expect( fbController.initateLogin ).toHaveBeenCalled();
			});

		
		
	});
	
	
});
