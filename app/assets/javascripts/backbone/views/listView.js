define( [ 'jquery', 'backbone', 'underscore', 'views/listItem', 'models/beer', 'collections/beers',
			'text!templates/modal.html', 'bootstrap' ],
 	function( $, Backbone, _, ListItem, Beer, Beers,
 			Modal, bootstrap ) {
	
	var beers,

		listView = Backbone.View.extend({
		
		
		initialize : function() {
			
			beers = new Beers();
			beers.on( "add", function( beer ) {
				console.log('Beer: ' + beer.get("name") + ' added to collection');
			});

			
			this.loadBeerFeed();
			
		},
		
		render : function( data ) {
			
			$('body').append( Modal );
			$('.modal').hide();
			
			$( data ).each( function( index ) {
		        
		        var beer = new Beer( { id : this.id, name : this.name })
		        beers.add( beer );
		        
		        var item = new ListItem( beer );
		        
		    } );
		    
		
		},
		
		loadBeerFeed : function() {
			
			$.ajax({
		        url: "/beers.json",
		        dataType: "json",
		        type: "GET",
		        processData: true,
		        contentType: "application/json",
		        success : this.render
	   	 	});
		},
		
		events : {
			'click .item' : 'clickItem'
		},
		
		
		clickItem : function( e ) {
			var item = $(e.currentTarget);
			console.log(item);
			var beerId = item.attr('data-id');
			console.log('click id=' + beerId);
			var beer = beers.where( { id : Number( beerId ) });
			
			var modalTemplate = _.template( Modal, beer[0].toJSON() )
			
			$('.modal').html( modalTemplate );
			$('.modal').modal();
		}
		
	});
	
	return listView;

});