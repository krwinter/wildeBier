define(function(require, exports, module) {
	
	var viewController = require('controllers/viewController');
	//	eventBus = require('controllers/eventBus');

	
	describe('View controller', function() {
	
		describe('init', function() {
	
			beforeEach( function() {
				
			});
			
			afterEach( function() {
				viewController.rootElement = 'body';
			});
			
			//var flag = false;
			 it('runs', function() {
				// runs( function() {
					// setTimeout( function(){
						// flag = true;
					// }, 1000 );	
				// });
				// waitsFor( function() {
					// return flag;
				// }, "waiting", 1100);
// 				
				expect(true).toBe(true);
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
		
		describe('after initialization', function() {
			
			beforeEach( function() {
				viewController.init();
			});
		
			describe('on user reconciliation', function() {
				
				beforeEach( function() {
					spyOn( viewController, 'showUserView' ).andCallThrough();
				});
				
				it('will show user view if user is logged in', function() {
					eventBus.dispatch( eventBus.e.userReconciled );
					expect( viewController.showUserView ).toHaveBeenCalled();
				});
				
			});
		
		});
		
	});

});