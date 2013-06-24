productPairs = {
    aws : ["Affresh","Weiman","stainless"],
    awc : ["Affresh","Weiman","counter"],
    atl : ["Affresh","Tide","laundry"],
    acd : ["Affresh","Cascade","DW"]
};

var ProductImage = Backbone.Model.extend({
    defaults: {
        imageurlbase: "./images/",
        type: "",
        company: "",
        state: "front",
        extension: "jpg"
    },
    initialize: function() {
        _.bindAll(this, "getURL");
        
    },
    getURL: function(){
        return this.get("imageurlbase") + this.get("company") + "_" + this.get("type") + "_" + this.get("state") + "." + this.get("extension");
    }
});

var ProductPair = Backbone.Collection.extend({
    model: ProductImage
});

var ProductImageClickFlipViewController = Backbone.View.extend({
    events : {
        "click .productImage" : "flipImages"
        
    },
    initialize: function(){
        _.bindAll(this, "setPair", "render");
        this.$el = $("#options");
    
        this.products = new ProductPair();
        this.products.add(new ProductImage());
        this.products.add(new ProductImage());
        
        this.product1 = new ProductImageClickFlipView({ 
            el : $("#product1"),
            model: this.products.at(0)
            });
        this.product2 = new ProductImageClickFlipView({ 
            el : $("#product2"),
            model: this.products.at(1)
            });
            
        this.$el.find(".option .product img").click(_.bind(function(){
            this.flipImages();
        },this));
    },
    setPair: function(productPair){
        this.productPairs = productPairs[productPair];
        this.product1.model.set({ 
            company : this.productPairs[0],
            type: this.productPairs[2]
        });
        this.product2.model.set({ 
            company : this.productPairs[1],
            type : this.productPairs[2]
        });
    },
    flipImages: function(){
        this.product1.flipImage();
        this.product2.flipImage();
        this.setInstructionText();
    },
    setInstructionText: function(){
        this.$el.find("#other-side-term").html((this.product1.model.get("state")=="front"?"backs":"fronts"));
    },
    showFronts: function(){
        this.product1.model.set({state:"front"});
        this.product2.model.set({state:"front"});
        this.setInstructionText();
    },
    render: function(){
        this.product1.render();
        this.product2.render();
        return this;
    }
});

var ProductImageClickFlipView = Backbone.View.extend({
    events: {
        "click .productImage":"flipImage"
    },
    initialize: function(){
        _.bindAll(this, "render");
        this.model = new ProductImage();
        this.model.bind("change:state",this.render);
    },
    flipImage: function() {
        this.model.set({state: (this.model.get("state")=="front"?"back":"front")});
        return this;
    },
    render: function(){
        this.$el.find(".product img").attr("src",this.model.getURL());
        return this;
    }
});

var SingleProductImageView = Backbone.View.extend({
    el: "#product-display",
    events: {
        
    },
    initialize: function() {
        this.productView = new ProductImageClickFlipView();
        this.model = new ProductImage();
        this.productView = this.model;
        this.productView.bind("change:model",this.setModel,this.productView.model);
    },
    setModel: function(m) {
        this.model = m;  
    },
    render: function() {
        
    }
});