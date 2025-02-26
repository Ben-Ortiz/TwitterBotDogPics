import 'dotenv/config';
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET
});


const rwClient = client.readWrite;
async function postTweet() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    try {
        const tweet = await rwClient.v2.tweet("today is: " + formattedDate);
        console.log("Tweet posted: ", tweet);
    } catch(error) {
        console.error("Error posting tweet: ", error);
    }
}

//run app
postTweet();