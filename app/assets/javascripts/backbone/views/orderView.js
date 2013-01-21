define( [ 'jquery', 'backbone', 'underscore',  'models/beer', 'collections/beers',
			'text!templates/order.html', 'bootstrap' ],
 	function( $, Backbone, _, Beer, Beers,
 			Order, bootstrap ) {
 				

		var items,

		orderView = Backbone.View.extend({
		
		
		initialize : function() {
			
		
		},
		
		render : function( data ) {
			
			$('body').append( Order );

			
		    
		
		}
	});
	
	return orderView;




} );