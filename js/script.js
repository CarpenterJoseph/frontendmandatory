var movieList = document.getElementById("movie-container");
var apiKey = "f1ad44e";

async function getMovieData(){
    const response = await fetch("./movies.json");
    const data = await response.json();
    generateMovies(data);
}



function generateMovies(movieData){
    movieData.forEach(movie => {
        //var movie = movieData[0];
        async function getOMDBData(){
            //careful
            const response = await fetch("https://www.omdbapi.com/?t=" + movie.Title + "&apikey=" + apiKey);
            const data = await response.json();
            console.log(data);
            var li = document.createElement("li");

            var title = document.createElement("h3");
            title.appendChild(document.createTextNode(movie.Title));
            li.appendChild(title);

            var released = document.createElement("p");
            released.appendChild(document.createTextNode("Released: "+ data.Year));
            li.appendChild(released);

            var plot = document.createElement("p")
            plot.appendChild(document.createTextNode("Rating: " + data.Plot));
            li.appendChild(plot);

            var rating = document.createElement("p");
            rating.appendChild(document.createTextNode("Rating: " + data.Ratings[0].Value));
            li.appendChild(rating);


            var d = new Date();
            var age = d.getFullYear() - data.Year;
            var ageOfMovie = document.createElement("p");
            ageOfMovie.appendChild(document.createTextNode("Age: " + age));
            li.appendChild(ageOfMovie);

            var trailer = document.createElement("a");
            trailer.setAttribute("href", "" + movie.TrailerLink);
            trailer.appendChild(document.createTextNode("Trailer"));
            li.appendChild(trailer);


            movieList.appendChild(li);
        }
        getOMDBData();

        
        
    });
}
getMovieData();











