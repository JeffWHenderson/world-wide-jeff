type event = {
    id: string;
    name: string;
    details: string;
    startDate?: string; // use date time stamp. no offset?
    // recurring?: boolean;
    // plannedByJeff?: boolean;
    // local?: boolean;
    // open?: boolean; 
}


export const events: event[] = [
    {
        id: "some-id--2",
        name: "Hike - North Georgia",
        details: "Lets look at trees and maybe a waterfall"
    },
    {
        id: "some-id--3",
        name: "Kayak & Paddleboard",
        details: "day on the water and then Halal after"
    },
    {
        id: "some-id--4",
        name: "Hot air Balloon",
        details: "I'm not really even sure that  this is a thing"
    },
    {
        id: "some-id",
        name: "zombie walk",
        details: "A beltline bar crawl with some sick zombie makeup"
    },
    {
        id: "some-id-2",
        name: "pool party",
        details: "Pool party at the condo"
    },
    {
        id: "some-id-3",
        name: "Wall Ride",
        details: "twice a month group bike ride"
    },
    {
        id: "some-id-4",
        name: "Piedmont Heights Pickleball League",
        details: "a very poorly managed (by me) pickleball league"
    },
    {
        id: "some-id-6",
        name: "Outdoor Movie Night: The Room",
        details: "Lets watch a movie by the pool"
    },
    {
        id: "some-id-7",
        name: "Texas Hold em Poker",
        details: "Bluffing encouraged"
    },
    {
        id: "some-id-8",
        name: "Virginia Highlands Porchfest",
        details: "I'm not planning this but its a whole thing we should get a group together to do"
    },
    {
        id: "some-id-9",
        name: "Lantern Festival",
        details: "Lets meet before and make some lanterns. I'm not planning the actual event but its a whole thing we should get a group together to do"
    },
    {
        id: "some-id-10",
        name: "Dragon Con",
        details: "Get your tickets now"
    },
    {
        id: "some-id-11",
        name: "Karoake night",
        details: "Go big or go home"
    },
    {
        id: "some-id-12",
        name: "Rennaisance Festival",
        details: "huzzah?"
    },
    {
        id: "some-id-14",
        name: "Atlanta streets alive",
        details: "dates"
    },
    {
        id: "some-id-15",
        name: "Hot Pot",
        details: "Just need to remember I like doing these"
    },
    {
        id: "some-id-16",
        name: "slack line",
        details: "invite people to do a slackline but also don't let people think i'm one of those slackline guys in any way"
    }
]