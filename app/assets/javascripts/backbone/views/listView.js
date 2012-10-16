define( [ 'jquery', 'backbone', 'underscore', 'views/listItem', 'models/beer', 'collections/beers' ],
 	function( $, Backbone, _, ListItem, Beer, Beers ) {
	
	var beers,

		listView = Backbone.View.extend({
		
		
		initialize : function() {
			//alert('listview');
			
			beers = new Beers();
			beers.on( "add", function( beer ) {
				console.log('Beer: ' + beer.get("name") + ' added to collection');
			});

			
			this.loadBeerFeed();
			
			//this.render();
		},
		
		render : function( data ) {
			
	    	//var compiled = _.template('<div class="item" data-id="id">name is <%= name %></div>', {name : 'joe'});
	       // $(this.el).html( compiled );
				
			$( data ).each( function( index ) {
		        
		        var beer = new Beer( { id : this.id, name : this.name })
		        beers.add( beer );
		        
		       // var item = new ListItem( { model : beer } );
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
			console.log('click');
			console.log('e=',e);
			var item = $(e.currentTarget);
			console.log(item);
		}
		
	});
	
	return listView;

});