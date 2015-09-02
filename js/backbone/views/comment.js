App.Views.Comment = Backbone.View.extend({
  className: 'comment',
  tagName: 'div',
  initialize: function(){
    this.template = Handlebars.compile($("#commentTemplate").html());
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes))
  }
})
