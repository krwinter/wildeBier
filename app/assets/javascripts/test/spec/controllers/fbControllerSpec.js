define(function(require, exports, module ){
	
	var fbController = require('controllers/fbController');
	var eventBus = require('controllers/eventBus');
	
	describe('Facebook controller',function(){
		
		beforeEach( function(){
			spyOn( fbController, 'getLoginStatus');
			fbController.init();
		});
		
		//TODO - find better way to do this - this function is only there for the tests
		afterEach( function() {
			fbController.reset();
		});
		
		// -----------
		
		it('will not get login status if sdk loaded and saved user not retrieved', function(){
			eventBus.dispatch( eventBus.e.fbSdkLoaded );
			//eventBus.dispatch( eventBus.e.savedUserRetrieved );
			expect( fbController.getLoginStatus ).not.toHaveBeenCalled();
		});
		
		it('will not get login status if sdk not loaded and saved user retrieved', function(){
			//eventBus.dispatch( eventBus.e.fbSdkLoaded );
			eventBus.dispatch( eventBus.e.savedUserRetrieved );
			expect( fbController.getLoginStatus ).not.toHaveBeenCalled();
		});
		
		
		it('will get login status after sdk loaded and saved user retrieved', function(){
			eventBus.dispatch( eventBus.e.fbSdkLoaded );
			eventBus.dispatch( eventBus.e.savedUserRetrieved );
			expect( fbController.getLoginStatus ).toHaveBeenCalled();
		});


		
		
		
	});
	
	
	
	
});
