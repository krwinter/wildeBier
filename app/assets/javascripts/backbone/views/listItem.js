define( [ 'jquery', 'backbone', 'underscore', 'text!templates/listItem.html' ],
 	function( $, Backbone, _, template) {
	
	var item = Backbone.View.extend({
		
		el : $('#list'),
		
		model : undefined,
		
		initialize : function( data ) {
			
			this.model = data;
			
			this.render();
			
		}, 
		
		render : function() {
		
			console.log('render..');
			var rendered = _.template( template, this.model.toJSON() );
			
			$(this.el).append( rendered );
			
			this.setupListeners();
		
		},
		
		setupListeners : function() {
			
			$('.like', $(this.el) ).click( function() {
				console.log('LIKE');
			})
			
		}
		
	});
	
	return item;
	

} );