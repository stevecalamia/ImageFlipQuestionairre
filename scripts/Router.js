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
        $(".btn").click(_.bind(function(router, prod1, prod2){ 
            console.log("inside bound funtion intending to call nextQuestion");
            console.log(this);
            console.log(router);
            console.log(prod1,prod2);
            this.nextQuestion();
            router.navigate("questions/"+prod1+"/"+prod2+"/"+this.currentQnum);
            }
        ,qv, this, product1, product2));
    },
    
    product: function(product1,product2) {
        
    }

});