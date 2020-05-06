//move list in html dom
var movieList = document.getElementById("movie-container");
//key used for omdb api
var apiKey = "f1ad44e";

//gets moviejson data and passes it on to generate movies
async function getMovieData(){
    const response = await fetch("./movies.json");
    const data = await response.json();
    generateMovies(data);
}

//main function for displaying movie data
function generateMovies(movieData){
    movieData.forEach(movie => {
        //foreach movie get data from omdb and attach it to movielist
        async function getOMDBData(){
            const response = await fetch("https://www.omdbapi.com/?t=" + movie.Title + "&apikey=" + apiKey);
            const data = await response.json();
            console.log(data);
            var li = document.createElement("li");

            //header
            var title = document.createElement("h3");
            title.appendChild(document.createTextNode(movie.Title));
            li.appendChild(title);

            //release date
            var released = document.createElement("p");
            released.appendChild(document.createTextNode("Released: "+ data.Year));
            li.appendChild(released);
            
            //plot
            var plot = document.createElement("p")
            plot.appendChild(document.createTextNode("Rating: " + data.Plot));
            li.appendChild(plot);
            
            //rating
            var rating = document.createElement("p");
            rating.appendChild(document.createTextNode("Rating: " + data.Ratings[0].Value));
            li.appendChild(rating);

            //date object
            var d = new Date();
            //calculate age of movie
            var age = d.getFullYear() - data.Year;
            //age of movie
            var ageOfMovie = document.createElement("p");
            ageOfMovie.appendChild(document.createTextNode("Age: " + age));
            li.appendChild(ageOfMovie);

            //trailer
            var trailer = document.createElement("a");
            trailer.setAttribute("href", "" + movie.TrailerLink);
            trailer.appendChild(document.createTextNode("Trailer"));
            li.appendChild(trailer);

            //append movie data to movielist
            movieList.appendChild(li);
        }
        getOMDBData();
    });
}
getMovieData();











