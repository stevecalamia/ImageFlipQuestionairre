var Router = Backbone.Router.extend({
    
    routes: {
        // we only need a few routes:
        /*
            Question barrage
                VARS:
                    Product Pair (Product 1 / Product 2)
                    Question Number
        */
        "questions/:product1/:product2/:qnum":"questions",
        
        /*
            Single Product Display
                Toggle for continue to second in pair, probably defined by
                    if a pair is specified or only a single product is.
        */
        "product/:product1":"product",
        "product/:product1/:product2":"product"
    },
        
        questions: function(product1,product2,qnum) {
            console.log("questions route");
            qv = new QuestionTextView();
            qv.setQuestionNumber(qnum);
            qv.render();    
        },
        
        product: function(product1,product2) {
            
        }

});