import { config } from 'dotenv'
import Twitter from 'twitter'
import fetch from 'node-fetch'

config({ path: './config.env'})

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
})

const startTweet = async () => {
  
  twitterClient.get(
    'followers/list',
    function (error, id_list, response) {
      if (!error) {

        // If successful, a users object will be returned.
        console.log(id_list);
    
        // Lets tweet it
        var status = {
          status: `hello again @${id_list.users[0].screen_name}`
        }
    
        twitterClient.post('statuses/update', status, function(error, tweet, response) {
          if (!error) {
            console.log(tweet);
          }
          if (error) {
            console.log(error);
          }
        });
    
      }
      if(error) {
        console.log(error)
      }
    }
  )
}

startTweet();

const startDm = async () => {
  
  twitterClient.get(
    'followers/list',
    function (error, id_list, response) {
      if (!error) {

        // If successful, a users object will be returned.
        console.log(id_list);
    
        // Lets tweet it
        var status = {
          "event": {
            "type": "message_create", 
            "message_create": {
              "target": {
                "recipient_id": `"${id_list.users[0].id}"`
              }, 
              "message_data": {
                "text": "Hello World!"
              }
            }
          }
        }
    
        twitterClient.post('direct_messages/events/new', status, function(error, tweet, response) {
          if (!error) {
            console.log(tweet);
          }
          if (error) {
            console.log(error)
          }
        });
    
      }
      if(error) {
        console.log(error)
      }
    }
  )
}

startDm();