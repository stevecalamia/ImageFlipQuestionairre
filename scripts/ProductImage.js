var ProductImage = Backbone.Model.extend({
    defaults: {
        imageurlbase: "./images/",
        type: "",
        company: "",
        state: "front"
    },
    initialize: function() {
        this.on("change", this.flipImage, this);
        
    },
    getFrontURL: function() {
        return this.imageurlbase + "_front.jpg";
    },
    getBackURL: function() {
        return this.iamgeurlbase + "_back.jpg"
    }
});

var ProductPair = Backbone.Collection.extend({
    model: ProductImage
});

var ProductImageClickFlipView = Backbone.View.extend({
    initialize: function(){
        
    }
});