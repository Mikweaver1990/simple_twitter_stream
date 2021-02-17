import Monitor from "./Monitor"
import TwitterListener from "./TwitterListener"
import * as dotenv from 'dotenv'
import express from 'express'
import {routes} from "./routes"

dotenv.config()

class App {
    monitor: Monitor
    listener: TwitterListener
    server: express.Application

    constructor() {
        this.monitor = new Monitor()
        this.listener = new TwitterListener(this.monitor)
        this.server = express()
        this.configureRoutes(this.monitor)
    }

    private configureRoutes(monitor: Monitor) {
        this.server.use('/api/v1', routes(monitor))
    }

    run() {
        this.server.listen(process.env.PORT)
        this.listener.listen()
        console.log('Listening for tweets...')

        setInterval(() => {
            const topFive = this.monitor.getTop5Hashtags()
            console.log(`Tweets Processed: ${this.monitor.tweetCount()}`)
            topFive.forEach((obj, index) => {
                console.log(`#${index + 1}: Count: ${obj[1].toString().padStart(4)} Tag: ${obj[0]}`)
            })
            console.log('\n')
        }, Number(process.env.TWEET_STATS_LOG_INTERVAL_MS))
    }
}

const myApp = new App()

myApp.run()
