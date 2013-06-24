var Router = Backbone.Router.extend({
    
    routes: {
        // we only need a few routes:
        /*
            Question barrage
                VARS:
                    Product Pair (Product 1 / Product 2)
                    Question Number
        */
        "questions/:productpair/:qnum":"questions",
        
        /*
            Single Product Display
                Toggle for continue to second in pair, probably defined by
                    if a pair is specified or only a single product is.
        */
        "product/:company/:type":"product",
    },
        
    questions: function(productpair,qnum) {
        
        // render the question
        this.qv = new QuestionTextView();
        this.qv.setQuestionNumber(qnum);
        this.qv.render();    
        
        //wire up the button events
        $(".btn").click(_.bind(function(router, prod, e){ 
            this.nextQuestion();
            router.navigate("questions/"+prod+"/"+this.currentQnum);
        },this.qv, this, productpair));
        
        // show the images
        this.imgs = new ProductImageClickFlipViewController();
        this.imgs.setPair(productpair);
        this.imgs.showFronts();
        this.imgs.render();
        
        $("#test-body").show();
    },
    
    product: function(company,type) {
        $("#test-body").empty().show();
        this.pi = new SingleProductImageView();
        this.pi.setModel(company,type);
        this.pi.render();
        $("#test-body").show();
    }

});