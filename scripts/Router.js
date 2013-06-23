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
        "product/:product1":"product",
        "product/:product1/:product2":"product"
    },
        
    questions: function(productpair,qnum) {
        console.log("questions route");
        $("#test-body").show();
        
        // render the question
        qv = new QuestionTextView();
        qv.setQuestionNumber(qnum);
        qv.render();    
        
        //wire up the button events
        $(".btn").click(_.bind(function(router, prod, e){ 
            this.nextQuestion();
            router.navigate("questions/"+prod+"/"+this.currentQnum);
        },qv, this, productpair));
        
        // show the images
        imgs = new ProductImageClickFlipViewController();
        imgs.setPair(productpair);
        imgs.showFronts();
        imgs.render();
    },
    
    product: function(product1,product2) {
        console.log("product route");
        pi = new SingleProductImageView();
        pi.render();
    }

});