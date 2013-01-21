define( [ 'jquery', 'backbone', 'underscore', 'text!templates/listItem.html', 'text!templates/modal.html', 'text!templates/order.html'  ],
 	function( $, Backbone, _, template, Modal, Order) {
	
	var item = Backbone.View.extend({
		
		tagName : 'div',
		id : 'bbAssigned',
		
		initialize : function( ) {
			
			this.id = this.model.get('id');
			
			console.log('creating listitem id=',this.id);
			
			this.render();
		}, 
		
		render : function() {
		
			console.log('render..');
			var rendered = _.template( template, this.model.toJSON() );
			//this.el =  rendered ;
			
			$(this.el).append( rendered );
			
			this.setupListeners();
			return this;
		
		},
		
		events : {
			'click .beer-name' : 'clickMoreInfo',
			'click .order-button' : 'clickOrder'
		},
		
		setupListeners : function() {
			
			//  !! setting here, handler scope is wrong currently
			
			//$('.beer-name', $(this.el) ).click( this.clickMoreInfo );
			
			// $('.order-button', $(this.el) ).click( function() {
				// console.log('ORDER');
// 				
					// var orderTemplate = _.template( Order, null)
				// //var modalTemplate = _.template( $('#myModal'), beer[0].toJSON() )
// 				
				// $('#myModal').append( orderTemplate );
				// $('#myModal').modal();
// 				
// 				
			// });
			
			
		},
		
		clickMoreInfo : function( e ) {
			var beerId = this.model.get('id');
			console.log('click id=' + beerId);
			
			var modalTemplate = _.template( Modal, this.model.toJSON() )
			//var modalTemplate = _.template( $('#myModal'), beer[0].toJSON() )
			
			$('#myModal').append( modalTemplate );
			//$('#myModal').html( modalTemplate );
			$('#myModal').modal();
		},
		
		clickOrder : function( e ) {
			console.log('ORDER');
				
					var orderTemplate = _.template( Order, this.model.toJSON())
				//var modalTemplate = _.template( $('#myModal'), beer[0].toJSON() )
				
				$('#myModal').append( orderTemplate );
				$('#myModal').modal();
				
		}
		
	});
	
	return item;
	

} );