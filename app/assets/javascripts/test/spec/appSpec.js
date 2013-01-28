
define( ['app', 'controllers/userController', 'controllers/viewController' ], function( app, userController, viewController ) {
	
	describe('When app starts up', function() {
		
		beforeEach( function() {
		
			spyOn( userController, 'init' );
			spyOn( viewController, 'init' );
	
			app.init();
		
		} );
		
		
		it('it initializes viewController', function() {
			
			expect( viewController.init ).toHaveBeenCalled();
			
		});
		

		it('it initializes userController', function() {
			
			expect( userController.init ).toHaveBeenCalled();
			
		});
		
	
		
		
	});
	
	
});

