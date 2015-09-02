App.Views.Grumble = Backbone.View.extend({
  className: 'grumble',
  tagName: 'div',

  events: {
    'click .edit': 'renderEditForm',
    'click .cancel': 'render',
    'click .submit': 'updateGrumble',
    'click .delete': 'deleteGrumble',
  },

  initialize: function() {
    var self = this;
    this.listenTo(this.model, 'change', this.render);

    this.template = Handlebars.compile($("#grumbleTemplate").html());
    this.editTemplate = Handlebars.compile($("#grumbleFormTemplate").html());
    this.commentTemplate = Handlebars.compile($("#commentTemplate").html())
    this.model.comments.fetch().done(function(){
      self.render();
    })
  },

  render: function() {
    if(event) {
      event.preventDefault();
    }
    this.$el.html(this.template(this.model.toJSON()));
    this.model.comments.each(this.renderComment.bind(this))
  },

  renderComment: function(comment){
    var commentView = new App.Views.Comment({model: comment})
    this.$el.append(commentView.$el)

      // this.commentTemplate(comment.attributes))

  },

  renderEditForm: function(){
    this.$el.html(this.editTemplate(this.model.toJSON()));
  },

  updateGrumble: function() {
    event.preventDefault();
    var data = {
      title: this.$("[name='title']").val(),
      authorName: this.$("[name='authorName']").val(),
      content: this.$("[name='content']").val(),
      photoUrl: this.$("[name='photoUrl']").val()
    }
    this.model.save(data);
    this.render();
  },

  deleteGrumble: function(){
    this.model.destroy();
    this.$el.fadeOut();
  }

});
