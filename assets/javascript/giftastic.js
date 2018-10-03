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
                    var movieGifs = $("<div>");
                    var rating = gifList[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img>");
                    personImage.attr("src", gifList[i].images.fixed_height.url);
                    movieGifs.append(p);
                    movieGifs.append(personImage);
                    $("#gifResultsBox").prepend(movieGifs);
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