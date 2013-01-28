define(['models/beer'], function( Beer ) {
	

	
	//var doRun = function() {
	
		describe ('A new beer', function() {
			var beer = new Beer();
			it("should be called Great Beer", function() {
				
				expect( beer.get('name') ).toBe("Great Beer");
				
			});
			
			
		});
		
	//}
	
	
	//return { run : doRun };
	
});
