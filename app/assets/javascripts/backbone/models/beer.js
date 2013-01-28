define( [ 'jquery', 'backbone', 'underscore', 'models/user' ],
 	function( $, Backbone, _, user ) {
	

	var beer = Backbone.Model.extend({
	
		defaults: {
	    	name: 'Great Beer',
	        style: 'Not Specified',
	        description: 'Truly a great beer.'
	    },
	       
	    initialize : function() {
	       	console.log('new beer named ' + this.get("name" ) );
	    }
		
	
	});
	
	return beer;

});