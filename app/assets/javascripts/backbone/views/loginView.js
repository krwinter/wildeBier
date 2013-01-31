define(function(require, exports, module) {

	var template = require('text!templates/login.html'),
		Backbone = require('backbone'),
		eventBus = require('controllers/eventBus');
	
	
	
	var initiateLogin = function() {
		
			var loginObj = {
				
				un : $('.js-login-username').val(),
				pw : $('.js-login-password').val(),
			};
			
			eventBus.dispatch( eventBus.e.initiateLogin, loginObj );
		
		},
	
		initiateFbLogin = function() {
			
			eventBus.dispatch( eventBus.e.fbInitiateLogin );
			
		}
	
	
	var loginView = Backbone.View.extend({
		
		initialize : function(){
			
			this.render();
			
		},
		
		render : function() {
			
			$(this.el).append( template );
			
		},
		
		events : {
			
			'click .js-login-button' : initiateLogin,
			
			'click .js-facebook-login-button' : initiateFbLogin
			
			
		}
		
		
	});
	
	module.exports = loginView;


});