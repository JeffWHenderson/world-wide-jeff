type event = {
    id: string;
    name: string;
    details: string;
    startDate: "tbd" | "cancelled" | string; // use date time stamp. no offset?
    // recurring?: boolean;
    // plannedByJeff?: boolean;
    // local?: boolean;
    // open?: boolean; 
}


export const events: event[] = [
    {
        id: "some-id-8",
        name: "Virginia Highlands Porchfest",
        details: "I'm not planning this but its a whole thing we should get a group together to do",
        startDate: "2025-5-17"
    },
    {
        id: "some-id-9",
        name: "Lantern Festival",
        details: "Lets meet before and make some lanterns. I'm not planning the actual event but its a whole thing we should get a group together to do",
        startDate: "cancelled"
    },
    {
        id: "some-id-10",
        name: "Dragon Con",
        details: "Get your tickets now",
        startDate: "2025-08-28"
    },
    {
        id: "some-id-12",
        name: "Rennaisance Festival",
        details: "huzzah?",
        startDate: "2025-5-18"
    },
    {
        id: "some-id--2",
        name: "Hike - North Georgia",
        details: "Lets look at trees and maybe a waterfall",
        startDate: "tbd"
    },
    {
        id: "some-id--3",
        name: "Kayak & Paddleboard",
        details: "day on the water and then Halal after",
        startDate: "tbd"
    },
    {
        id: "some-id--4",
        name: "Hot air Balloon",
        details: "I'm not really even sure that  this is a thing",
        startDate: "tbd"
    },
    {
        id: "some-id",
        name: "zombie walk",
        details: "A beltline bar crawl with some sick zombie makeup",
        startDate: "tbd"
    },
    {
        id: "some-id-2",
        name: "pool party",
        details: "Pool party at the condo",
        startDate: "tbd"
    },
    {
        id: "some-id-3",
        name: "Wall Ride",
        details: "twice a month group bike ride",
        startDate: "tbd"
    },
    {
        id: "some-id-4",
        name: "Piedmont Heights Pickleball League",
        details: "a very poorly managed (by me) pickleball league",
        startDate: "tbd"
    },
    {
        id: "some-id-6",
        name: "Outdoor Movie Night: The Room",
        details: "Lets watch a movie by the pool",
        startDate: "tbd"
    },
    {
        id: "some-id-7",
        name: "Texas Hold em Poker",
        details: "Bluffing encouraged",
        startDate: "tbd"
    },
    {
        id: "some-id-11",
        name: "Karoake night",
        details: "Go big or go home",
        startDate: "tbd"
    },
    {
        id: "some-id-14",
        name: "Atlanta streets alive",
        details: "dates",
        startDate: "tbd"
    },
    {
        id: "some-id-15",
        name: "Hot Pot",
        details: "Just need to remember I like doing these",
        startDate: "tbd"
    },
    {
        id: "some-id-16",
        name: "slack line",
        details: "invite people to do a slackline but also don't let people think i'm one of those slackline guys in any way",
        startDate: "tbd"
    }
]