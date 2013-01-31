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
		
		if ( User.loggedIn()) {
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
			
			//this.showDefaultView();
			this.showNewView( DefaultView );
			
		},
		
		showNewView : function( viewName) {
			
			if ( this.currentView ) {
				$( this.rootElement ).empty();
				
			}
			
			this.currentView = new viewName();
			$( this.rootElement ).append( this.currentView.el );
			
		},
		
		// showDefaultView : function() {
// 			
			// var view = new DefaultView(); 
			// $( this.rootElement ).append( view.el );
			// this.currentView = view;
// 			
		 // },
		
		showUserView : function() {
			
			this.showNewView( UserView );
			
		},
		
		showLoginView : function() {
			

			this.showNewView( LoginView );
			
			
		}
		
	}
	
	
	module.exports = viewController;
	
	
});
