//define( [ 'controllers/userController', 'controllers/eventBus', 'models/user'], function( userController, eventBus,user ){
define(function(require, exports, module) {
	
	var userController = require('controllers/userController'),
		fbController = require('controllers/fbController'),
		eventBus = require('controllers/eventBus'),
		User = require('models/user'),
		Backbone = require('backbone');
		
	
		
	describe('The userController', function() {
		
		beforeEach( function(){
			
			spyOn( eventBus, 'dispatch' ).andCallThrough();;
			spyOn( User, 'set' );
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
		
		describe('the saved user is retrieved', function() {
			
		
			it('saved user will be set as the app user', function() {
				expect( User.set ).toHaveBeenCalled();
			});
			
			it('event dispatched after saved user retrieved', function() {
				expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.savedUserRetrieved, undefined );
			});
		
		});
		
		describe('after the Facebook status is retrieved', function() {
			
			beforeEach( function() {
				spyOn( Backbone, 'sync');
				
				User.set( { id : 1 });
				
				//this.server = sinon.fakeServer.create();
				
			     // [200, {"Content-Type": "application/json"},
			     // '{"id":1,"title" }']);
			      // [200, {"Content-Type": "application/json"},
			      // '{"id":123,"title":"Hollywood - Part 2"}']);
				
			});
			
			afterEach( function() {
				//this.server.restore();
			});
			
			it('the database will be updated', function() {
				eventBus.dispatch( eventBus.e.fbStatusRetrievalComplete );
				expect( Backbone.sync ).toHaveBeenCalled();
			});
			
			//TODO - figure out correct response to trigger success
			it('the reconciled event will be fired', function() {
				eventBus.dispatch( eventBus.e.fbStatusRetrievalComplete );
				//this.server.respondWith([200,  {}, "{ id : '1' }" ] );
				//this.server.respond();
				expect( eventBus.dispatch ).toHaveBeenCalledWith( eventBus.e.userReconciled );
				
			});
			
		});
		
	});
	
});
