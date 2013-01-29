define(function(require, exports, module ){
	
	var fbController = require('controllers/fbController'),
		eventBus = require('controllers/eventBus'),
		User = require('models/user');
	
	describe('Facebook controller',function(){
		
		beforeEach( function(){
			spyOn( fbController, 'loadSdk');
			spyOn( fbController, 'getLoginStatus');
			fbController.init();
		});
		
		//TODO - find better way to do this - this function is only there for the tests
		afterEach( function() {
			fbController.reset();
			User.clear();
		});
		
		// ------- login status ----
		
		
		it('will NOT load SDK if there is no saved user with FB userID', function(){
			
			var user = User.set( { 	id : 3,
									fb_user_id : null });
			
			eventBus.dispatch( eventBus.e.savedUserRetrieved );
			expect( fbController.loadSdk ).not.toHaveBeenCalled();
		});

		it('WILL load SDK if there IS a saved user with FB userID', function(){
			
			var user = User.set( { 	id : 3,
									fb_user_id : 'abc123' });
			
			eventBus.dispatch( eventBus.e.savedUserRetrieved );
			expect( fbController.loadSdk ).toHaveBeenCalled();
		});
		
		it('will get login status after sdk loaded', function(){
			eventBus.dispatch( eventBus.e.fbSdkLoaded );
			expect( fbController.getLoginStatus ).toHaveBeenCalled();
		});
		
		
		
		// ======   response from onLoginStatus  =======
		// TODO - make async?
		
		describe('in response to login status', function() {
			
			beforeEach( function() {
				
				spyOn( fbController, 'getAuthenticatedUserData');
				spyOn( User, 'set').andCallThrough();
				spyOn( eventBus, 'dispatch').andCallThrough();
				
			});
			
			describe('user is not authenticated', function() {
				
		
				it('will set local user as not authorized if not authenticated on fb', function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : 'not_authorized' } );
					expect( User.set ).toHaveBeenCalledWith('fb_status', 'not_authorized');
				});
				
				it('will set local user as not logged in (null || "") if not logged in on fb', function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : '' } );
					expect( User.set ).toHaveBeenCalledWith('fb_status', '');
				});
				
				it('will set local user as not logged in (null || "") if not logged in on fb', function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : '' } );
					expect( User.set ).toHaveBeenCalledWith('fb_status', '');
				});
		
				it('will dispatch fbStatusRetrievalComplete event if FB status !== authenticated', function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : '' } );
					expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.fbStatusRetrievalComplete );
				});
		
			});
			
			describe('user is authenticated', function() {
				
				beforeEach( function() {
					eventBus.dispatch( eventBus.e.fbOnLoginStatus, { status : 'connected' } );
				});
				
				it('will set local user as authenticated if authenticated on fb', function() {
					expect( User.set ).toHaveBeenCalledWith('fb_status', 'connected');
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
					
					it('will update local user object', function() {
						
						expect( User.get('fb_status') ).toBe('connected');
						expect( User.get('fb_access_token') ).toBe('12345');
						expect( User.get('fb_expires') ).toBe('6');
						expect( User.get('fb_signed_request') ).toBe('abcde');
						expect( User.get('fb_user_id') ).toBe('789fgh');
						
					});
				
					it('will dispatch fbStatusRetrievalComplete event', function() {
						expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.fbStatusRetrievalComplete );
						
					});
			
				});
			});
		
		});

		
		
	});
	
	
});
