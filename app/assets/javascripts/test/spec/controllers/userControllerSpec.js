//define( [ 'controllers/userController', 'controllers/eventBus', 'models/user'], function( userController, eventBus,user ){
define(function(require, exports, module) {
	
	var userController = require('controllers/userController'),
		fbController = require('controllers/fbController'),
		eventBus = require('controllers/eventBus'),
		user = require('models/user');
		
	
		
	describe('The userController', function() {
		
		beforeEach( function(){
			
			spyOn( eventBus, 'dispatch' );
			spyOn( user, 'set' );
			spyOn( userController, 'getSavedUser' ).andCallThrough();
			spyOn( fbController, 'init' );
			userController.init();
			 
		});
		
		it('will initialize the Facebook controller', function() {
			expect( fbController.init ).toHaveBeenCalled();
		});
		
		it('will get the saved user', function() {
			expect( userController.getSavedUser ).toHaveBeenCalled();
		});
		
		it('will set the app user', function() {
			expect( user.set ).toHaveBeenCalled();
		});
		
		it('will dispatch an event when it gets a saved user', function() {
			expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.savedUserRetrieved, undefined );
		});
		
		
	});
	
});
