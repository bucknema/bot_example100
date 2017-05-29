/**
 * Created by Mark Buckner on 5/28/2017.
 */

/*
 * for twitter-node-client help:
 see https://github.com/BoyCook/TwitterJSClient/blob/master/README.md
 */

/*CALLBACK FUNCTIONS*/
var error = function(err, response, body){
    console.log('ERROR [%s]', err);
};

var success = function(data){
    console.log('Data [%s]', data);
};

/*Variables to hold parsed tweet info*/
var tweet_content = "";
var tweet_screenName = "";
var tweet_string ="";
var tweet_id = 0; //internal ID
var tweet_id_str =""; //external ID included in Tweet's unique URL

/*Call back function for when the response from getSearch comes back*/
var successfulSearch = function(data){

    //console.log(data);

    /*reset variables*/
    tweet_content= "";
    tweet_screenName= "";
    tweet_string ="";
    tweet_id = 0;
    tweet_id_str = "";

    /*data comes back in JSON format. You can parse this with JSON.parse()!*/
    var response = JSON.parse(data);

    /*Now we can access specific properties of the response*/
    /*the statuses property has an array with most of what we are interested in*/
    /*Uncomment this and examine response.statuses in your console to see the info you have
    access to!
     */
    //console.log(response.statuses);
    //console.log("\n\n");

    /*Log the contents of the tweet we found with hashtag #bot to the console*/
  //  console.log("I searched for a tweet containing \"#bot\" and I found this tweet: \n");
  //  console.log("\""+response.statuses[0].text+"\"");
    tweet_content = response.statuses[0].text;
  //  console.log("\n\n");

    /*Log the user name of who tweeted it to the console*/
   // console.log("user name of person who tweeted it: \n");
   // console.log("@"+ response.statuses[0].user.screen_name);
    tweet_screenName = response.statuses[0].user.screen_name;
   // console.log(tweet_screenName);
   // console.log("\n\n\n");

    /*Log the user name of who tweeted it to the console*/
   // console.log("Internal tweet id for the tweet I found: \n");
   // console.log(response.statuses[0].id);
    tweet_id = response.statuses[0].id;
   // console.log("\n\n");

    var tweet_id_str = response.statuses[0].id_str;
    RT_id = response.statuses[0].id_str;
    //console.log("URL of the tweet I found ");
   // console.log("http://twitter.com/"+tweet_screenName+"/status/"+tweet_id_str);
   // console.log("\n\n");

    /*respond to account that was tweeting about bots!*/
    tweet_string = "Hi there @";
    tweet_string += tweet_screenName;
    //console.log(tweet_string);
    tweet_string += ", you used the hashtag #bots. I am a Node.js bot! Greetings, friend :)";

    twitter.postTweet({status: tweet_string}, error, success);

};

var Twitter = require('twitter-node-client').Twitter;

/*Credentials retrieved from your twitter apps dashboard go here:*/
//replace YOUR_KEY as appropriate
var config = {
    "consumerKey": "xxxxx",
    "consumerSecret": "xxxxx",
    "accessToken": "xxxxx",
    "accessTokenSecret": "xxxxx",
    "callBackUrl": "XXX"
};

/*Set-up*/
var twitter = new Twitter(config);

/*searches for #bot tweets and replies to them!*/
var botHashtag_searchAndReply = function() {
    /*Code to retweet first tweet found (i.e., most recent) with hashtag #bot*/
    twitter.getSearch({'q':'#bot','count': 1}, error, successfulSearch);
}

/*Use JavaScript's timer function setInterval() to automatically schedule an action*/
setInterval(botHashtag_searchAndReply,900000);
