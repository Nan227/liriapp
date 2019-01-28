require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");

var Spotify = require("node-spotify-api");

var axios = require("axios");
var moment = require("moment");
var fs = require('fs');

var logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})


App(process.argv[2], process.argv[3]);

function App(command, parameter) {
  switch (command) {
    case "concert-this":
      getMyBand();
      break;
    case "spotify-this-song":
      getSpotifySong(parameter);
      break;
    case "movie-this":
      getMovie();
      break;
    case "do-what-it-says":
      followFileCommand();
      break;
    default:
      console.log("Liri does not know that command. Please try again.");
  }
}

function getMyBand(){

  var band = process.argv[3];
  
  // Then run a request with axios to the band API with the band specified

  // borrow Alex to get it safe environment. I will change it after I learn Herokuapp.com
  var queryUrl = "https://alex-rosencors.herokuapp.com/?url=https://rest.bandsintown.com/artists/" + band + "/events?app_id=e1ba7c7a-44d1-4d3e-a299-176f4592a8c3";

  //  check if it works
  // console.log(queryUrl);
  
  axios.get(queryUrl).then(
    function(response) {
      // checking if it work
        //console.log(response.data);
      // var data = response.data.venue;
      for (i = 0; i < 5; i++) {

    console.log("--------------------------------------");
      console.log("-> Name of the venue: " + response.data[i].venue.name);
      console.log("   Venue location: " +  response.data[i].venue.city +" "+ response.data[i].venue.country);

      var time = response.data[i].datetime;
      var converttime = moment(time).format('MMMM DD YYYY');
      console.log("   Date of the Event: "+ converttime);
      console.log("--------------------------------------");
    }
   }
  ).catch(function(error) {
    console.log("------------------------------------");
    console.log("You did not input a name of band on "
    + error);
    
  });
  
}

function getSpotifySong(inputs) {

  var spotify = new Spotify(keys.spotify);
		if (!inputs){
        	inputs = 'The Sign';
    	}
		spotify.search({ type: 'track', query: inputs }, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }
          // check all data comeback
          //  console.log(data);

          var songInfo = data.tracks.items;
          
          for (let i = 0; i < songInfo.length; i++) {
            
            console.log("--------------------------------------");
            console.log("Artist(s): " + songInfo[i].artists[0].name);
            console.log("The song name's : " + songInfo[i].name);
            console.log("Preview Link: " + songInfo[i].preview_url);
            console.log("Album: " + songInfo[i].album.name);
            
          }
	});
}

function getMovie(){

  // Grab the movieName which will always be the third node argument.
  var movie = process.argv[3];
  
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  
  //  check if work 
  // console.log(queryUrl);

  axios.get(queryUrl).then(
    function(response) {
      // checking if it work
      //console.log(response.data);
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: "+ response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);

    }
// If it error, it will show a movie name "Mr. Nobody"
  ).catch(function(error) {
    console.log("------------------------------------");
    console.log("You did not input movie name on "
    + error);
    console.log("------------------------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should check this link : http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!")
     //adds text to log.txt
  
  });
  
}

function followFileCommand() {
	fs.readFile("random.txt", "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}

		// Then split it by commas (to make it more readable)
		var dataArr = data.split(",");
    // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
    for (i = 0; i < dataArr.length; i ++){
      var readFile = dataArr[i];
      var insideFile = dataArr[i+2];
     
      App(readFile, insideFile);

      // (readFile === "spotify-this-song") ? getSpotifySong(insideFile) : (readFile === "movie-this") ? getMovie(insideFile) : (readFile === "concert-this") ? (getMyBand(insideFile)) : (console.log("Error, no more data"))
      

      logger.write("doWhatItSays retrieved " + readFile + ", " + insideFile +" \n");
     }
    }	
  )};
