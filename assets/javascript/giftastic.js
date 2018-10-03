$(document).ready(function() {
    var movies = ["Avengers", "Casablanca", "The Godfather", "Jaws", "Monty Python", "Pulp Fiction", "Star Wars", "Vertigo"];
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nKKeSF9jUWfHKjw8tppq5wwXRyFTvDR2";
    var inputText = '';

    function makeButton(input){
        var movieButton = document.createElement("button");
        movieButton.innerText = input;
        movieButton.setAttribute("movieName", input);
        $("#buttons").append(movieButton);
    };

    function startupButtons(){
        for (i=0; i< movies.length; i++) {
            makeButton(movies[i]);
        }
    };
    
    startupButtons();
    
    function gifSearch() {
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response){
                var gifList = response.data;
                
                for (i=0; i<10; i++) {
                    // Creating a div for the gif
                    var movieGifs = $("<div>");

              // Storing the result item's rating
                    var rating = gifList[i].rating;

              // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
                    var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
                    personImage.attr("src", gifList[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    movieGifs.append(p);
                    movieGifs.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifResultsBox").append(movieGifs);
                }
            })
    };

    $("button").on('click', function(){
        var searchTerm = $(this).attr("movieName");
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nKKeSF9jUWfHKjw8tppq5wwXRyFTvDR2&q=" + searchTerm;
        gifSearch(queryURL);
        console.log(queryURL);
    });

    $("#searchButton").on('click', function(event){
        event.preventDefault();
        inputText = $("#userSearch").val();
        makeButton(inputText);
        $("#userSearch").val('');
        
    });
});