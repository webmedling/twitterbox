var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'hVdxPEf7TFQ54n7g3ujSU9jVP',
  consumer_secret: 'bBmN0JkaRKULaTJQmmOWlhpmqMUeZHkIWxElObZ2PvmqKdkBov',
  access_token_key: '797391927477932032-vmHjn8fE4CmFCkawvD6ClvnRwb5NSDR',
  access_token_secret: 'AFnm0EaLj4S085GZpZyyJbgsaT9O0zWGKa6tPGxiGwexl'
});

/*
client.get('search/tweets', {q: '%23brexit'}, function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);
});
*/

/*
client.stream('statuses/filter', {track: '%23brexit'},  function(stream) {
  stream.on('data', function(tweet) {
    if(!tweet.retweeted_status){
    	console.log("[" + tweet.created_at + "] " + tweet.user.screen_name + ": " + tweet.text);
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
*/

client.stream('user', function(stream) {
  stream.on('data', function(tweet) {
    
    console.log("[" + tweet.created_at + "] " + tweet.user.screen_name + ": " + tweet.text);
    //console.log(tweet);

    if(tweet.user.screen_name != 'bill_medling' && tweet.text.indexOf('@bill_medling') > -1) {

      client.post('statuses/update', { status: 'Hi ' + '@' + tweet.user.screen_name + '. Thanks for the tweet.' }, function(error, tweet, response) {

        if (!error) {
          console.log('Auto tweet succeeded.');
        } else {
          console.log(error);
        }


      });

    }

  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

