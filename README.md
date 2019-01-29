# liriapp

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. Liri need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. Then sent it back the data.

# API use

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

   * [OMDB API](http://www.omdbapi.com) and the 
   
   * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)
   
# liri.js can take in one of the following commands:

   * concert-this -> this command will search the Bands in Town Artist by giving name of the venue, location, and date of the Event 

   * spotify-this-song -> this command will search songs by giving the song's name, preview link of the song from Spotify, the album that the song is from

   * movie-this -> this command will search a movie infomation by giving a movie's name, year, rating, country, language, and plot. 

   * do-what-it-says -> this command will rewrite the result of the spotify-this-song, movie-this, and concert-this 
   
# Screen capture
<img src = "./img/liriapp.png">
 
# Github project

https://nan227.github.io/liriapp/

# Video

https://youtu.be/DYDXJXcJUig
