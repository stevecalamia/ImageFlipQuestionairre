


/* New Init Goes Here */

$(document).ready(function(){
    qv = new QuestionTextView();
    qv.render();
});

/*

//var q1 = new Question({text:"This product is right for me."})

// declare our vars

			var contexts = {
					front : "front",
					back : "back"
			},
				currentQnum = 0,
				currentContext;

			// init uninitialized variables:
			currentContext = contexts.front;

			function flipImage(e){
				var ost = $("#other_side_term");

				switch (currentContext) {
					case contexts.front:
						ost.html = contexts.back;
						break;
					case contexts.back:
						ost.html = contexts.front;
						break;
					default:
				}
			}

			function insertQ(num) {
				var statement = $("#statement");
				statement.html(questions[num]);
			}
            
        /*****************************************
         * DOC READY
         * **************************************
    		$(document).ready(function(){
				// Fill in the question
				insertQ(currentQnum);
				// Add bottle images
				// Wire up click events
				$(".productimage").click(flipImage);
			});
            
            */