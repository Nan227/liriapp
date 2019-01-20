require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("monemt");
var spotify = new Spotify(keys.spotify);

App(process.argv[2], process.argv[3]);

function App(command, parameter) {
  switch (command) {
    case "my-band":
      getMyBand(parameter);
      break;
    case "spotify-this-song":
      getSpotifySong(parameter);
      break;
    case "movie-this":
      getMovie(parameter);
      break;
    case "do-what-it-says":
      followFileCommand();
      break;
    default:
      console.log("Liri does not know that command. Please try again.");
  }
}