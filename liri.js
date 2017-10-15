//grab the api keys from keys.js
var keys = require("./keys.js");

//we'll require file system functions
var fs = require("fs");

//grab all the input from the terminal, this is an array
var nodeParams = process.argv;

//get the length of the input array from terminal
var nodeParamLength = nodeParams.length;

//the command will be found in the 3rd element of the input array
var command = nodeParams[2];

//the elements after the command (3rd elements) are the input parameters
var input = nodeParams.slice(3, nodeParamLength + 1)

//specify the log file where all the output data (and the actual command) will go
var logFile = "log.txt";

//create a function for displaying tweets
function myTweets() {
  //require the twitter api
  var Twitter = require('twitter');

  //create a new instance of Twitter and assign the keys
  var client = new Twitter({
  consumer_key: keys[0].consumer_key,
  consumer_secret: keys[0].consumer_secret,
  access_token_key: keys[0].access_token_key,
  access_token_secret: keys[0].access_token_secret
  });

  //assign the parameter(s) - we'll only display 20 tweets
  var params = {screen_name: 'realDonaldTrump', count : 20};

  //call the get method of the Twitter object
  client.get('statuses/user_timeline', params, function(error, tweets, response) {  
    //handle error
    if (error || response.statusCode !== 200) {
      return console.log(error);       
    } else {

      //log the command to file
      logToFile(logFile, "\n");
      logToFile(logFile, "node liri.js " + command);
      logToFile(logFile, "\n");

      //iterate through all 20 tweets
      for (var i = 0; i < tweets.length; i++) {
        var tweetNum = i + 1;

        //log data to file
        logToFile(logFile, "\n");
        logToFile(logFile, "Tweet # " + tweetNum + " : " + tweets[i].text + "\n");
        logToFile(logFile, "Created At : " +  tweets[i].created_at + "\n");
        logToFile(logFile, "##############################################################################################################");
      } 
    }  
  });

}

//create a spotify function
function spotifyThisSong(song, artist) {
  //require the Spotify API
  var Spotify = require('node-spotify-api');
 
  //create a new instance of the Spotify object and assign the keys
  var spotify = new Spotify({
    id: keys[1].client_id,
    secret: keys[1].client_secret
  });

  //if a song was provided on the terminal
  if (song && !artist) {
    //search for the song
    spotify.search({ type: 'track', query: song }, function(error, response) {
      //handle error
      if (error) {
        return console.log('Error occurred: ' + error);
      }
      
      //log the command to file
      logToFile(logFile, "\n");
      logToFile(logFile, "node liri.js " + command + " " + input.join(" "));
      logToFile(logFile, "\n");

      //iterate through the songs returned as a response
      for (var i = 0; i < response.tracks.items.length; i++) {
        var songNumber = i + 1;

        //log data to file
        logToFile(logFile, "\n");
        logToFile(logFile, "Song # :" + songNumber + "\n");
        logToFile(logFile, "Artist : " + response.tracks.items[i].artists[0].name + "\n");
        logToFile(logFile, "Song Title : " + response.tracks.items[i].name + "\n");
        logToFile(logFile, "PreviewLink : " + response.tracks.items[i].preview_url + "\n");
        logToFile(logFile, "Album Name : " + response.tracks.items[i].album.name + "\n");
        logToFile(logFile, "###########################################################################################################");
      }
      
    });
  } //else if there is no song provided
  else {
    //search for "The Sign" by Ace of Base
    spotify.search({type: "track", query : "artist:" + artist + "%20" + "track:" + song}, function(error, response) {
      //handle error
      if (error) {
        return console.log("Error occurred: " + error);
      }

      //log command to file
      logToFile(logFile, "\n");
      logToFile(logFile, "node liri.js " + command);
      logToFile(logFile, "\n");

      //iterate through all songs returned as s response
      for (var i = 0; i < response.tracks.items.length; i++) {
        var songNumber = i + 1;
      
        //log data to file
        logToFile(logFile, "\n");
        logToFile(logFile, "Song # : " + songNumber + "\n");
        logToFile(logFile, "Artist : " + response.tracks.items[i].artists[0].name + "\n");
        logToFile(logFile, "Song Title : " + response.tracks.items[i].name + "\n");
        logToFile(logFile, "PreviewLink : " + response.tracks.items[i].preview_url + "\n");
        logToFile(logFile, "Album Name : " + response.tracks.items[i].album.name + "\n");
        logToFile(logFile, "#######################################################################################################");
      }
    }); 
  }
}

//create a movie-this function 
function movieThis(title) {
  //require the request API to be able to generate a GET request
  var request = require("request");

  //grab the OMDB API key
  var omdbKey = keys[2].api_key;

  //create a dynamic query URL
  var url = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + title;

  //GET request to OMDB API
  request(url, function(error, response, body) {
    if (error) {
      return console.log(error);
    }

    //log command to file 
    logToFile(logFile, "\n");
    logToFile(logFile, "node liri.js " + command + " " + input.join(" "));
    logToFile(logFile, "\n");

    //log data to file
    logToFile(logFile, "\n");
    logToFile(logFile, "Movie Title : " + JSON.parse(body).Title + "\n");
    logToFile(logFile, "Release Year : " + JSON.parse(body).Year + "\n");
    logToFile(logFile, "IMDB Rating : " + JSON.parse(body).Ratings[0].Value + "\n");
    logToFile(logFile, "Rotten Tomatoes Rating : " + JSON.parse(body).Ratings[1].Value + "\n");
    logToFile(logFile, "Country : " + JSON.parse(body).Country + "\n");
    logToFile(logFile, "Language : " + JSON.parse(body).Language + "\n");
    logToFile(logFile, "Plot : " + JSON.parse(body).Plot + "\n");
    logToFile(logFile, "Actors : " + JSON.parse(body).Actors + "\n");
    logToFile(logFile, "###########################################################################################################");

  });

}

//create a do-what-it-says function
function doWhatItSays() {

  //read the random.txt file 
  fs.readFile("random.txt","utf8", function(error, data) {

    //handle error
    if (error) {
      return console.log(error);
    }

    //get the command from the file
    commandFromFile = data.split(",")[0];

    //get the input parameter from the file
    inputFromFile = data.split(",")[1].split(" "); 
    
    //run the command
    wrapperFunction(commandFromFile, inputFromFile);
  });
}

//create a wrapper function to control the flow of execution
function wrapperFunction(command, input) {
  
  //if my-tweets is called, call function for that  
  if (command === "my-tweets") {
    myTweets();
  } 
  //else if spotify-this-song is being called 
  else if (command === "spotify-this-song") {
    //if a song was provided
    if (input.length !== 0) {
      //pass the song as input to the spotify function
      var songNameArray = input;
      var songNameString = songNameArray.join("+");
      spotifyThisSong(songNameString);
    } 
    //else
    else {
      //search for the song "The Sign" by Ace of Base
      var songNameString = "The Sign";
      var artist = "Ace of Base";
      spotifyThisSong(songNameString, artist);
    } 
  } 
  //else if movie-this is being called
  else if (command === "movie-this") {
    //grab the movie from the input
    var movieTitleArray = input;
    var movieTitleString = movieTitleArray.join("+");

    //pass the movie into the function
    movieThis(movieTitleString);
  } 
  //else if do-what-it-says is being called
  else if (command === "do-what-it-says"){
    //call the function
    doWhatItSays();
  }
  else {
    return console.log("that is not a valid function");
  }
}

//create a function to log data into the log,txt file
function logToFile(file, data, error) {
  fs.appendFile(file, data, function(error) {

    //handle error
    if (error) {
      console.log(error);
    } else {
      //print data to console
      console.log(data);
    }
  });
}

//run the wrapper function whenever liri.js gets called - pass the command and input(s) as parameters
wrapperFunction(command, input);

  









