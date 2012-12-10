require.config({
	
	
	paths : {
		
		jquery : '../../../../vendor/assets/javascripts/jquery',
		underscore : '../../../../vendor/assets/javascripts/underscore',
		backbone : '../../../../vendor/assets/javascripts/backbone',
		
		chai : 'scripts/chai',
		
		text : 'require-text',
		
		collections : 'backbone/collections',
		models : 'backbone/models',
		views : 'backbone/views',
		templates : 'backbone/templates',
		controllers : 'backbone/controllers',
		
	},
	
	shim : {
		'bootstrap' : {
			deps : [ 'jquery' ],
			exports : 'Bootstrap'
		}
	}
	
});


require( ['jquery', 'test.beer.mocha' ], 
		function($, test) {

   console.log( 'OUT', test );
    
    mocha.run();
} );