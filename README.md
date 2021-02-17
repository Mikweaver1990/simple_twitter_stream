To run the project:

* copy the .env_default and rename the copy to .env
    * paste your twitter application bearer token in the .env file
* run `npm i` in root directory
* run `npm start`

You can now hit `http://localhost:3121/api/v1/tweet-stats` for a response containing the total number of tweets processed and the top five hashtags seen.

After you are running the server, you can simply just open index.html to run the single page application.
