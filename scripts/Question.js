question_list = [
    { text: "This product is right for me."},
    { text: "The claims made on this package are believable."},
    { text: "The claims on this package are important to me. "},
    { text: "This is a good value."},
    { text: "This contains effective cleaning agents."},
    { text: "This product is safe for my family."},
    { text: "This product is safe for the environment."},
];

var Question = Backbone.Model.extend({
    defaults: {
        text: ""
    }
});

var Questions = Backbone.Collection.extend({
    model: Question,
});

var QuestionTextView = Backbone.View.extend({
    el: "#statement",
    events: {
        'click .btn':'nextQuestion'
    },
    initialize: function() {
        _.bindAll(this, 'render', 'nextQuestion');
        
        this.collection = new Questions(question_list);
        this.model = this.collection.at(0);
        this.currentQnum = 0;
    },
    render: function(){
        $(this.el).html(this.model.get("text"));
    },
    nextQuestion: function(){
        this.currentQnum++;
        if (this.currentQnum >= this.collection.length) {
            //close the browser window
        }
        this.model = this.collection.at(this.currentQnum);
        this.render();
    }
});
