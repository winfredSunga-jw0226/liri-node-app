var keys = require("./keys.js");
var fs = require("fs");
var nodeParams = process.argv;
var nodeParamLength = nodeParams.length;
var command = nodeParams[2];
var input = nodeParams.slice(3, nodeParamLength + 1)
var logFile = "log.txt";

function myTweets() {
  var Twitter = require('twitter');

  var client = new Twitter({
  consumer_key: keys[0].consumer_key,
  consumer_secret: keys[0].consumer_secret,
  access_token_key: keys[0].access_token_key,
  access_token_secret: keys[0].access_token_secret
  });

  client.get('search/tweets', {q: '@realDonaldTrump', count : 20}, function(error, tweets, response) {
   
    if (error || response.statusCode !== 200) {
      return console.log(error);       
    } else {
      //log the command to file
      logToFile(logFile, "\n");
      logToFile(logFile, "node liri.js " + command);
      logToFile(logFile, "\n");

      for (var i = 0; i < tweets.statuses.length; i++) {
        var tweetNum = i + 1;

        //log data to file
        logToFile(logFile, "\n");
        logToFile(logFile, "Tweet # " + tweetNum + " : " + tweets.statuses[i].text + "\n");
        logToFile(logFile, "Created At : " +  tweets.statuses[i].created_at + "\n");
        logToFile(logFile, "##############################################################################################################");
      } 
    }
  });

}

function spotifyThisSong(song, artist) {
  var Spotify = require('node-spotify-api');
 
  var spotify = new Spotify({
    id: keys[1].client_id,
    secret: keys[1].client_secret
  });

  if (!artist) {
    spotify.search({ type: 'track', query: song }, function(error, response) {
      if (error) {
        return console.log('Error occurred: ' + error);
      }
      
      //log the command to file
      logToFile(logFile, "\n");
      logToFile(logFile, "node liri.js " + command + " " + input.join(" "));
      logToFile(logFile, "\n");

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
  } else {
    spotify.search({type: "track", query : "artist:" + artist + "%20" + "track:" + song}, function(error, response) {
      console.log("song : " + song + " artist : " + artist);
      if (error) {
        return console.log("Error occurred: " + error);
      }

      //log command to file
      logToFile(logFile, "\n");
      logToFile(logFile, "node liri.js " + command);
      logToFile(logFile, "\n");

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

function movieThis(title) {
  var request = require("request");
  var omdbKey = keys[2].api_key;
  var url = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + title;

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

function doWhatItSays() {

  fs.readFile("random.txt","utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    commandFromFile = data.split(",")[0];
    inputFromFile = data.split(",")[1].split(" "); 
    
    //run the command
    wrapperFunction(commandFromFile, inputFromFile);
  });
}

function wrapperFunction(command, input) {
  
  if (command === "my-tweets") {
  myTweets();
  } else if (command === "spotify-this-song") {
    if (input.length !== 0) {
      var songNameArray = input;
      var songNameString = songNameArray.join("+");
      spotifyThisSong(songNameString);
    } else {
      var songNameString = "The Sign";
      var artist = "Ace of Base";
      spotifyThisSong(songNameString, artist);
    } 
  } else if (command === "movie-this") {
    var movieTitleArray = input;
    var movieTitleString = movieTitleArray.join("+");
    movieThis(movieTitleString);
  } else if (command === "do-what-it-says"){
    doWhatItSays();
  }
}

function logToFile(file, data, error) {
  fs.appendFile(file, data, function(error) {
    if (error) {
      console.log(error);
    } else {
      //print data to console
      console.log(data);
    }
  });
}

wrapperFunction(command, input);

  









