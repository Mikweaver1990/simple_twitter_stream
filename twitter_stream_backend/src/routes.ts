import express, {Router} from "express"
import Monitor from "./Monitor"

class TweetStatsController {
    protected router: Router
    protected monitor: Monitor

    constructor(router: Router, monitor: Monitor) {
        this.router = router
        this.monitor = monitor
        this.config()
    }

    private config() {
        this.router.get('/tweet-stats',
            (_req, res) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.send(this.monitor.getTweetStats())
            })
    }
}

export function routes(monitor: Monitor): Router {
    const router: Router = express.Router()
    const tweetStatsController: TweetStatsController = new TweetStatsController(router, monitor)

    return router;
}
