define(['../backbone/models/beer'], function( Beer ) {
	
	test('Beer Test', function() {
	
		var beer = new Beer();
		
		ok(beer, 'Beer exists!');
		
		equal( beer.get('name'), "Great Beer", "beer name; Great Beer; not equal");
	});

});
