$(document).ready(function(){
    var gifButtons = ["funny","top","crazy","wacko"];
    renderButtons();

    
    function gifAppear(){

        $("#gifs-appear-here").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var apiKey = "exluyV6PNAMyh8oBVzecUpYfBK60AWrt";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=" + apiKey;   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var j = 0; j < limit; j++) {    

                var displayDiv = $("<div>");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#gifs-appear-here").append(displayDiv);
            }
        });
    }

    function renderButtons(){ 

        $("#gif-buttons").empty();

        for (var i = 0; i < gifButtons.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", gifButtons[i]); 
            newButton.text(gifButtons[i]); 
            $("#gif-buttons").append(newButton); 
        }
    }

    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#gif-submit").on("click", function(event){

        var input = $("#gifSubmit").val().trim();
        console.log(input);
        gifButtons.push(input);
        event.preventDefault();       
        renderButtons();

    })

    $(document).on("click", "#input", gifAppear);
    $(document).on("click", ".gif", imageChangeState);
});