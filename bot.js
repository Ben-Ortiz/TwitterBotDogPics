import 'dotenv/config';
import { TwitterApi } from "twitter-api-v2";
import fetch from "node-fetch";

const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET
});


const rwClient = client.readWrite;
async function postTweet() {
    try {
        
        // Fetch a random dog image
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        const imageUrl = data.message;

        // Fetch the image as a buffer
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

        // Upload the image directly from buffer
        const mediaId = await rwClient.v1.uploadMedia(imageBuffer, { type: "jpg" });

        // Post the tweet with the image
        const tweet = await rwClient.v2.tweet({
            text: "Random dog picture! 🐶",
            media: { media_ids: [mediaId] }
        });

        console.log("Tweet posted: ", tweet);
    } catch (error) {
        console.error("Error posting tweet:", error);
    }
}

//run app
postTweet();