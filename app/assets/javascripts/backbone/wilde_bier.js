//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

window.WildeBier = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  
   init: function() {
      //alert('GO!');
        //Backbone.history.start();
        var ListView = new this.Views.ListView( { el : $('#list')} )
        var Beer = new WildeBier.Models.Beer( { name: 'Belgian Leggy Blond' } );
   }
}