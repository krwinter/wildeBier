define(function(require, exports, module) {
	
	var DefaultView = require('views/defaultView'),
		UserView = require('views/userView'),
		LoginView = require('views/loginView'),
		User = require('models/user'),
		eventBus = require('controllers/eventBus');

	
	var setupListeners = function(){
		
		eventBus.listen( eventBus.e.userReconciled, onUserReconciled, viewController );
	
	};
	
	var onUserReconciled = function(){
		
		if ( User.get('id') ) {
			viewController.showUserView();
		} else {
			viewController.showLoginView();
		}
		
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
			
		},
		
		showLoginView : function() {
			
			var view = new LoginView();
			$( this.rootElement ).append( view.el );
			this.currentView = view;
			
			
		}
		
	}
	
	
	module.exports = viewController;
	
	
});
