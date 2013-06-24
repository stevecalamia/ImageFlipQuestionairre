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
        "click .productimage":"flipImage"
    },
    initialize: function(){
        _.bindAll(this, "render");
        this.model = new ProductImage();
        /*this.$el.find(".product img").click(_.bind(function(){
            console.log("trying to flip this bitch");
            this.flipImage();
        },this));*/
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
        "click .btn":"blank"
    },
    model: new ProductImage(),
    initialize: function() {
        this.productView = new ProductImageClickFlipView();
        this.productView.model = this.model;
        this.productView.bind("change:model",this.setModel,this.productView.model);
    },
    setModel: function(company,type) {
        this.productView.model.set({ company: company, type: type});
    },
    setInstructionText: function(){
        this.$el.find("#other-side-term").html((this.productView.model.get("state")=="front"?"back":"front"));
    },
    render: function() {
        // add element
        $("#test-body").append("<div id='product-display'></div>");
        this.$el = $("#product-display");
        // add buttons
        this.$el.append('<div id="option_yes" class="btn"><div class="button-text">Yes</div></div>');
        this.$el.append('<div id="option_no" class="btn"><div class="button-text">No</div></div>');
        
        // add instructions
        this.$el.append('<div class="spacer">Click the package to show the <span id="other-side-term">back</span>.</div>');
        
        // add ImageFlipView
        this.$el.append('<div id="product_image_container" class="product"><img src="" alt="" class="productimage"/></div>');
        this.productView.$el = this.$el;
        this.productView.render();
        this.$el.find(".productimage").click(_.bind(function(){
            this.productView.flipImage();
            this.productView.render();
            this.setInstructionText();
        }, this));
        this.delegateEvents();
        
        return this;
    },
    blank: function(){
        $("#test-body").empty();
    }
});