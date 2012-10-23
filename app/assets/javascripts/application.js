// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
// DO NOT = require jquery
// DO NOT = require jquery_ujs
// DO NOT = require_tree .
// 
// We need to leave these in for now - they make the DELETE method work
//
//= require jquery
//= require jquery_ujs

require.config({
	
	paths : {
		
		jquery : 'jquery',
		underscore : 'underscore',
		backbone : 'backbone',
		
		text : 'require-text',
		
		collections : 'backbone/collections',
		models : 'backbone/models',
		views : 'backbone/views',
		templates : 'backbone/templates',
		
	},
	
	shim : {
		'bootstrap' : {
			deps : [ 'jquery' ],
			exports : 'Bootstrap'
		}
	}
	
});


require( ['jquery', 'backbone', 'underscore', 'app' ], 
		function($, Backbone, _, App ) {

   App.init();
    
} );