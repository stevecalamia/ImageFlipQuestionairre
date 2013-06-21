    		// declare our vars
			var questions = [
				"This product is right for me.",
				"The claims made on this package are believable.",
				"The claims on this package are important to me. ",
				"This is a good value.   ",
				"This contains effective cleaning agents.",
				"This product is safe for my family.",
				"This product is safe for the environment."
			],
				contexts = {
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
         * **************************************/
    		$(document).ready(function(){
				// Fill in the question
				insertQ(currentQnum);
				// Add bottle images
				// Wire up click events
				$(".productimage").click(flipImage);
			});