import {Entities, TweetData} from "./Tweet"

export default class Monitor {
    readonly #hashtagMap: Map<string, number>
    #totalTweets: number

    constructor() {
        this.#hashtagMap = new Map()
        this.#totalTweets = 0
    }

    getTweetStats() {
        return {
            count: this.tweetCount(),
            topHashtags: this.getTop5Hashtags()
        }
    }

    tweetCount = () => {
        return this.#totalTweets
    }

    addTweet = (tweet: TweetData) => {
        const entities: Entities | undefined = tweet.entities
        if (entities !== undefined && entities.hashtags !== undefined) {
            entities.hashtags.forEach(hashtag => {
                this.addHashgag(hashtag.tag)
            })
        }
        this.#totalTweets++
    }

    private addHashgag = (tag: string) => {
        if (this.#hashtagMap.has(tag)) {
            //@ts-ignore
            this.#hashtagMap.set(tag, this.#hashtagMap.get(tag) + 1)
        } else {
            this.#hashtagMap.set(tag, 1)
        }
    }

    getTop5Hashtags = (): [string, number][] => {
        const hashtagArray = Array.from(this.#hashtagMap)

        hashtagArray.sort(Monitor.sortArray)

        return hashtagArray.slice(0, 5)
    }

    private static sortArray(a: [string, number], b: [string, number]): number {
        if (a[1] === b[1])
            return (a[0] < b[0]) ? -1 : 1
        else {
            return (a[1] < b[1]) ? 1 : -1
        }
    }
}
