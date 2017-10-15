//console.log('this is loaded');

//below are api keys for twitter, spotify and OMDB
var twitterKeys = {
  consumer_key: 'WLzdGtxFBdAgidx31UlzZu2ZI',
  consumer_secret: 'RaNWVCzyfOltzut1SqlE79T3s6otZflLnvQvujWH7qFFlbM4Iw',
  access_token_key: '919071186083913728-qRPfLaWN4qJ3kLgEi60GvbAbQsccItj',
  access_token_secret: 'hiYJ71EHdo1YuhXPVE6X2GAqsmPAhzDMTVf2aJMCHvW1g',
}

var spotifyKeys = {
  client_id : '3ff5b74bedf3445891d6cf72c73a3e39',
  client_secret : '345ef136f42f42d1bb470dc6cd0fdc17'
}

var omdbKey = {
  api_key : "40e9cece"
}

//exporting this file to liri.js
module.exports = [twitterKeys, spotifyKeys,omdbKey];