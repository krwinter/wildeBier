define( [ 'jquery', 'backbone', 'underscore', 'models/beer'],
 	function( $, Backbone, _, Beer ) {
 		

	var beers = Backbone.Collection.extend( { 
		
		model : Beer
		

		
	});


	return beers;

} );
