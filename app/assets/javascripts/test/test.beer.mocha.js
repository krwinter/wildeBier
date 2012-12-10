define(['../backbone/models/beer','chai'], function( Beer,chai ) {
	
	var expect = chai.expect;
	var should = chai.should();
	
	//var doRun = function() {
	
		describe ('A new beer', function() {
			var beer = new Beer();
			it("should be called Great Beer", function() {
				
				beer.get('name').should.equal("Great Beer");
				
			});
			
			
		});
		
	//}
	
	
	//return { run : doRun };
	
});
