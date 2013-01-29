define(function(require, exports, module) {

	var template = require('text!templates/default.html');
	var Backbone = require('backbone');
	
	var defaultView = Backbone.View.extend({
		
		initialize : function(){
			
			this.render();
			
		},
		
		render : function() {
			
			$(this.el).append( template );
			
		}
		
		
	});
	
	module.exports = defaultView;


});