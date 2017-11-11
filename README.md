# LIRI Bot

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition INterface, SIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data.

### Overview
LIRI has 3 main functions. 
1. Display your latest tweets. For this version, to make it interesting, we have picked to display Donald Trump's tweets.
2. Display song information gathered from the Spotify API
3. Display movie information gathered from the OMDB API

### Instructions
1. Clone this repo
2. In your terminal/bash, navigate to the directory of the cloned repo
3. Type these commands
  * `node liri.js my-tweets`
    * this will show Donald Trump's last 20 tweets and when they were created at your terminal/bash window
  * `node liri.js spotify-this-song '<song name here>'`
    * This will show the following information about the song in the terminal/bash window
      * Artist(s)
      * The song's name
      * A preview link of the song from Spotify
      * The album that the song is from
    * If no song is provided then the program will default to "The Sign" by Ace of Base 
  * `node liri.js movie-this '<movie name here>'`
    * This will output the following information to your terminal/bash window
      ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
      ``` 
    * If the user doesn't type a movie in, the program will output data for the movie 'Mr.Nobody.'
  * `node liri.js do-what-it-says`
    * LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
      * If the text inside random.txt says `spotify-this-song,"I Want it That Way"` then it will display the information about the song in the terminal/bash window as per above
      * Feel free to change the text in that document to test out the other commands
### Demo
Demo section in progress...

### Tech Details
* Node
* Terminal / Command Line
* NPM Packages & APIs 
  * [request](https://www.npmjs.com/package/request)
  * [twitter](https://www.npmjs.com/package/twitter)
  * [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
  * [OMDb API](http://www.omdbapi.com/)
