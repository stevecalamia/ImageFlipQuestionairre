var ProductImage = Backbone.Model.extend({
    defaults: {
        imageurlbase: "./images/",
        type: "",
        company: ""
    },
    initialize: function() {}
});

var ProductPair = Backbone.Collection.extend({
    model: ProductImage
});

var ProductImageView = Backbone.View.extend({
    initialize: function(){
        
    }
});