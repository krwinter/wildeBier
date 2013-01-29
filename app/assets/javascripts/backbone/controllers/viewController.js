define(function(require, exports, module) {
	
	var DefaultView = require('views/defaultView');
		UserView = require('views/userView'),
		User = require('models/user'),
		eventBus = require('controllers/eventBus');

	
	var setupListeners = function(){
		
		eventBus.listen( eventBus.e.userReconciled, onUserReconciled, viewController );
	
	};
	
	var onUserReconciled = function(){
		
		viewController.showUserView();
	}
	
	
	var viewController = {
		
		rootElement : 'body',
		
		currentView : undefined,
		
		init : function( config ) {
			
			console.log('viewController INIT');
			
			setupListeners();
			
			if ( config && config.rootElement ) {
				this.rootElement = config.rootElement;
			}
			
			this.showDefaultView();
			
		},
		
		showDefaultView : function() {
			
			var view = new DefaultView(); 
			$( this.rootElement ).append( view.el );
			this.currentView = view;
			
		 },
		
		showUserView : function() {
			
			var view = new UserView();
			$( this.rootElement ).append( view.el );
			this.currentView = view;
			
		}
		
	}
	
	
	module.exports = viewController;
	
	
});
