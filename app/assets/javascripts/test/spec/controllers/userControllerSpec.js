define( [ 'controllers/userController', 'controllers/eventBus', 'models/user'], function( userController, eventBus,user ){
	
	describe('The userController', function() {
		
		beforeEach( function(){
			
			spyOn( eventBus, 'dispatch' );
			spyOn( user, 'set' );
			userController.getSavedUser();
			 
		});
		
		// TODO - user is undefined, not stubbing a real user
		it('will get the saved user and set the app user', function() {
			expect( user.set ).toHaveBeenCalled();
		});
		
		it('will dispatch an event when it gets a saved user', function() {
			expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.savedUserRetrieved, undefined );
		});
		
		
	});
	
});
