//define( [ 'controllers/userController', 'controllers/eventBus', 'models/user'], function( userController, eventBus,user ){
define(function(require, exports, module) {
	
	var userController = require('controllers/userController'),
		fbController = require('controllers/fbController'),
		eventBus = require('controllers/eventBus'),
		User = require('models/user'),
		Backbone = require('backbone'),
		sessionService = require('controllers/services/sessionService');
		
	
		
	describe('In the userController', function() {
		
		beforeEach( function(){
			
			// these all go up fromt since init() below kicks all these off
			spyOn( userController, 'getSavedUser' ).andCallThrough();
			spyOn( userController, 'getExternalUserStatus' ).andCallThrough();
			spyOn( eventBus, 'dispatch' ).andCallThrough();
			spyOn( User, 'set' ).andCallThrough();
			spyOn( fbController, 'init');
			
			userController.init();
			 
		});
		
		
		it('the saved user will be retrieved,', function() {
			expect( userController.getSavedUser ).toHaveBeenCalled();
		});
		
		describe('the saved user is retrieved,', function() {
			
			beforeEach( function() {
				var user = User.set( { id : 1 } );
			});

			afterEach( function() {
				//User.clear();
			});
		
			it('saved user will be set as the app user,', function() {
				expect( User.set ).toHaveBeenCalled();
			});
			
			it('the user is known,', function() {
				expect( userController.getExternalUserStatus ).toHaveBeenCalled();
			});
			
			describe('the saved user has used FB in the past (has a fbID)', function() {
				
				it('will initialize the Facebook controller and load the sdk', function() {
					
					var user = User.set( { id : 3, fb_user_id : 4} );
					userController.getExternalUserStatus();
					expect( fbController.init ).toHaveBeenCalled();
				});
				
			});
			
			describe('the saved user has NOT used FB in the past (has NO fbID),', function() {
				
				it('will dispatch userReconciled event', function() {
					var user = User.set( { id : 1, fb_user_id : null } );
					userController.getExternalUserStatus();
					expect( eventBus.dispatch).toHaveBeenCalledWith( eventBus.e.userReconciled );
				});
				
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
			
			it('the database will be updated,', function() {
				eventBus.dispatch( eventBus.e.fbStatusRetrievalComplete );
				expect( Backbone.sync ).toHaveBeenCalled();
			});
			
			//TODO - figure out correct response to trigger success
			it('the reconciled event will be fired,', function() {
				eventBus.dispatch( eventBus.e.fbStatusRetrievalComplete );
				//this.server.respondWith([200,  {}, "{ id : '1' }" ] );
				//this.server.respond();
				
			});
			
			describe('the user signs out,', function() {
				
				it('the user controller signout function is called when the initiateSignout event is dispatched', function() {
					spyOn( userController, 'initiateSignout' );
					eventBus.dispatch( eventBus.e.initiateSignout );
					expect( userController.initiateSignout ).toHaveBeenCalled();
				});
				
				it('sessionService signout and fb signout are called', function() {
					spyOn( sessionService, 'signout' );
					spyOn( fbController, 'signout' );
					User.set( { id : 9, fb_user_id : 'lkp' } );
					userController.initiateSignout();
					
					expect( sessionService.signout ).toHaveBeenCalled();
					expect( fbController.signout ).toHaveBeenCalled();
				});
				
				it('after session service does its work, it dispatches appUserSignoutComplete, which causes User update, db sync, and reconciled event to be fired', function() {
					
					var userObj = {};
					
					eventBus.dispatch( eventBus.e.appUserSignoutComplete, userObj );
					//user set is called in handler
					expect( User.set ).toHaveBeenCalled();
					//bb sync is called
					expect( Backbone.sync ).toHaveBeenCalled();
					//reconcile is called
					expect( eventBus.dispatch).toHaveBeenCalledWith( eventBus.e.userReconciled );
				});
				
				it('after fb controller does its logout work, it dispatche fbSignoutComplete, which causes User update, db sync, and reconciled event to be fired', function() {
					var userObj = {};
					eventBus.dispatch( eventBus.e.fbSignoutComplete, userObj );
					
					//user set is called in handler
					expect( User.set ).toHaveBeenCalled();
					//bb sync is called
					expect( Backbone.sync ).toHaveBeenCalled();
					//reconcile is called
					expect( eventBus.dispatch).toHaveBeenCalledWith( eventBus.e.userReconciled );
					
				});
				
				

			});
		
		});
		
		
	});
	
});
