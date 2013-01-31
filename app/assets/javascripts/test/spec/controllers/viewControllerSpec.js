define(function(require, exports, module) {
	
	var viewController = require('controllers/viewController'),
		User = require('models/user'),
		eventBus = require('controllers/eventBus');

	
	describe('The view controller', function() {
	
		describe('initializes,', function() {
	
			beforeEach( function() {
				
			});
			
			afterEach( function() {
				viewController.rootElement = 'body';
			});
			
		
			it('sets a root element if passd in', function() {
				var root = '#app-main';
				viewController.init( { rootElement : root } );
				expect( viewController.rootElement ).toBe( root );
			});		
	
			it('does NOT set a root element if NOT passed in, and uses default (body)', function() {
				
				var root,
					defaultRoot = 'body';
					
				viewController.init( { rootElement : root } );
				expect( viewController.rootElement ).toBe( defaultRoot );
			});	
			
		});
		
		describe('after initialization,', function() {
			
			beforeEach( function() {
				viewController.init();
			});
		
			describe('on user reconciliation', function() {
				
				beforeEach( function() {
					spyOn( viewController, 'showUserView' ).andCallThrough();
					spyOn( viewController, 'showLoginView' ).andCallThrough();
				});
				
				it('will show user view if user is logged in', function() {
					User.set( { id : 1, first_name : 'Test', last_name : 'User' });
					eventBus.dispatch( eventBus.e.userReconciled );
					expect( viewController.showUserView ).toHaveBeenCalled();
				});

				it('will show login view if user is NOT logged in', function() {
					User.clear();
					eventBus.dispatch( eventBus.e.userReconciled );
					expect( viewController.showLoginView ).toHaveBeenCalled();
				});
				
			});
			
		
		});
		
		dwescri
		
	});

});