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
        console.log(this.imageurlbase,this.company,this.type,this.state,this.extension);
        return this.get("imageurlbase") + this.get("company") + "_" + this.get("type") + "_" + this.get("state") + "." + this.get("extension");
    }
});

var ProductPair = Backbone.Collection.extend({
    model: ProductImage
});

var ProductImageClickFlipViewController = Backbone.View.extend({
    initialize: function(){
        console.log("init controller");
        _.bindAll(this, "setPair", "render");
        
        this.products = new ProductPair();
        this.products.add(new ProductImage());
        this.products.add(new ProductImage());
        
        this.product1 = new ProductImageClickFlipView({ 
            id : "product1",
            model: this.products.at(0)
            });
        this.product2 = new ProductImageClickFlipView({ 
            id : "product2",
            model: this.products.at(1)
            });
    },
    setPair: function(productPair){
        console.log("setting pair");
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
    render: function(){
        console.log("rendering from controller");
        this.product1.render();
        console.log("rendering product2");
        this.product2.render();
    }
});

var ProductImageClickFlipView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, "render");
        this.model = new ProductImage();
    },
    render: function(){
        console.log(this.model);
        console.log(this.model.get("company"));
        $("#"+this.id + " .product img").attr("src",this.model.getURL());
        return this;
    }
});