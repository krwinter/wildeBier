define(function(require, exports, module) {

	var template = require('text!templates/user.html');
	
	var userView = Backbone.View.extend({
		
		initialize : function(){
			
			this.render();
			
		},
		
		render : function() {
			
			$(this.el).append( template );
			
		}
		
		
	});
	
	module.exports = userView;


});