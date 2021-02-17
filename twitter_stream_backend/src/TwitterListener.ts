import needle from 'needle';
import Monitor from './Monitor';
import {Tweet} from './Tweet';


export default class TwitterListener {
    readonly #token: string | undefined
    readonly #streamURL: string
    #monitor: Monitor

    constructor(monitor: Monitor) {
        this.#token = process.env.BEARER_TOKEN;
        this.#streamURL = 'https://api.twitter.com/2/tweets/sample/stream?tweet.fields=entities';
        this.#monitor = monitor
    }

    private streamConnect() {
        const stream = needle.get(this.#streamURL, {
            headers: {
                Authorization: `Bearer ${this.#token}`
            },
            timeout: 20000
        });

        stream.on('data', data => {
            try {
                const tweet: Tweet = JSON.parse(data);
                this.#monitor.addTweet(tweet.data)
            } catch (e) {
                // Keep alive signal received. Do nothing.
            }
        }).on('error', error => {
            console.error(error);

            if (error.code === 'ETIMEDOUT') {
                stream.emit('timeout');
            }
        });

        return stream;
    }

    listen = async () => {

        // Listen to the stream.
        // This reconnection logic will attempt to reconnect when a disconnection is detected.
        // To avoid rate limites, this logic implements exponential backoff, so the wait time
        // will increase if the client cannot reconnect to the stream.

        const sampledStream = this.streamConnect()
        let timeout = 0;
        sampledStream.on('timeout', () => {
            // Reconnect on error
            console.warn('A connection error occurred. Reconnecting…');
            setTimeout(() => {
                timeout++;
                this.streamConnect();
            }, 2 ** timeout);
            this.streamConnect();
        })

    }
}
