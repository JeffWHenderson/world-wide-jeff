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
        id: "some-id-12",
        name: "Rennaisance Festival",
        details: "huzzah?",
        startDate: "2025-5-18"
    },
    {
        id: "some-id-14",
        name: "Atlanta streets alive",
        details: "dates",
        startDate: "2025-5-18"
    },
    {
        id: "some-id-23244",
        name: "Nic cage Movie day",
        details: "At friends house, ask for detials",
        startDate: "2025-5-18"
    },
    {
        id: "some-id-2324df344",
        name: "Nic cage Movie day",
        details: "At friends house, ask for detials",
        startDate: "2025-5-18"
    },
    {
        id: "some-id-10",
        name: "Dragon Con",
        details: "Get your tickets now",
        startDate: "2025-08-28"
    },
    {
        id: "some-id-10",
        name: "Shaky Knees",
        details: "Get your tickets now",
        startDate: "2025-09-19"
    },
    {
        id: "some-id-9",
        name: "Lantern Festival",
        details: "Lets meet before and make some lanterns. I'm not planning the actual event but its a whole thing we should get a group together to do",
        startDate: "cancelled"
    },
    {
        id: "some-id-0393554",
        name: "Art Projects Day",
        details: "Bring something you are working on and we can all work on our art projects we've been neglecting",
        startDate: "tbd"
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
        id: "some-id-0304949",
        name: "Paint'n'sip at home",
        details: "A paint and sip but without a competent instructor",
        startDate: "tbd"
    },
    {
        id: "some-id--34546er77",
        name: "other pitched ideas",
        details: "Candle making, dumpling wrapping, Line dancing, salsa at eclipse di luna, bro force co-op, track more concerts, track comedy shows, dog beach, find more local-events",
        startDate: "tbd"
    },
    {
        id: "some-id--4",
        name: "Hot air Balloon",
        details: "I'm not really even sure that this is a thing",
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