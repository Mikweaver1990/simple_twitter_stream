export interface Tweet {
    data: TweetData
}

export interface TweetData {
    id?: string
    entities?: Entities
    text?: string

}

export interface Entities {
    hashtags?: Array<Hashtag>
    annotations?: Array<any>
    mentions: Array<any>
    urls: Array<any>
    cashtags: Array<any>
}

export interface Hashtag {
    start: number
    end: number
    tag: string
}
