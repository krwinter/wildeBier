define(function(require, exports, module) {

	var template = require('text!templates/user.html'),
		Backbone = require('backbone'),
		User = require('models/user'),
		eventBus = require('controllers/eventBus');
	
	var userView = Backbone.View.extend({
		
		initialize : function(){
			
			this.model = User;
			
			this.render();
			
		},
		
		render : function() {
			
			var rendered = _.template( template, this.model.toJSON() );

			$(this.el).append( rendered );
			
		},
		
		events : {
			
			'click .js-signout' : 'dispatchInitiateSignout'
		},
		
		dispatchInitiateSignout : function() {
			
			eventBus.dispatch( eventBus.e.initiateSignout );
			
		}
		
		
	});
	
	module.exports = userView;


});