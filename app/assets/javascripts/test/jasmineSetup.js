// was helped by http://kilon.org/blog/2012/08/testing-backbone-requirejs-applications-with-jasmine/


require.config({
	
	// MAY need to change this is we run as a web app
	// under rails this folder is never seen, asset pipeline resolves assets/ to this folder
	baseUrl : '../../javascripts/',
	
	paths : {
		
		jquery : '../../../vendor/assets/javascripts/jquery',
		underscore : '../../../vendor/assets/javascripts/underscore',
		backbone : '../../../vendor/assets/javascripts/backbone',
		
		text : 'require-text',
		
		collections : 'backbone/collections',
		models : 'backbone/models',
		views : 'backbone/views',
		templates : 'backbone/templates',
		controllers : 'backbone/controllers',
		
	}//,
	
	// shim : {
		// 'bootstrap' : {
			// deps : [ 'jquery' ],
			// exports : 'Bootstrap'
		// }
	// }
// 	
});

var specs = [];
specs.push( 'test/spec/appSpec' )
specs.push( 'test/spec/controllers/userControllerSpec' )
specs.push( 'test/spec/models/beerSpec' )
specs.push( 'test/spec/models/userSpec' )


require( specs , 
		function() {

   console.log( 'DONE' );
    
} );