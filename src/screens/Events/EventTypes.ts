export type event = {
    id: string;
    name: string;
    details: string;
    startDate: "tbd" | "cancelled" | string; // use date time stamp. no offset?
    // recurring?: boolean;
    // plannedByJeff?: boolean;
    // local?: boolean;
    // open?: boolean; 
}


export const hardCodedEvents: event[] = [
    {
        id: "ca7866be-6e1b-4e6b-8b8a-2d5a9c0bf9ce",
        name: "Virginia Highlands Porchfest",
        details: "I'm not planning this but its a whole thing we should get a group together to do",
        startDate: "2025-5-17"
    },
    {
        id: "66b8dc2e-ca70-47fa-be5b-05103bf73982",
        name: "Rennaisance Festival",
        details: "huzzah?",
        startDate: "2025-5-18"
    },
    {
        id: "1d4196e8-a920-4875-8987-5da349bf28ab",
        name: "Atlanta streets alive",
        details: "dates",
        startDate: "2025-5-18"
    },
    {
        id: "25dca23c-ca88-4bbc-84c7-c08a59907f84",
        name: "Nic cage Movie day",
        details: "At friends house, ask for detials",
        startDate: "2025-5-18"
    },
    {
        id: "eee9762e-ec55-4ad4-88ca-a8d8f071a49d",
        name: "Nic cage Movie day",
        details: "At friends house, ask for detials",
        startDate: "2025-5-18"
    },
    {
        id: "d269d4f8-5019-4974-b07a-761d43b21adf",
        name: "Dragon Con",
        details: "Get your tickets now",
        startDate: "2025-08-28"
    },
    {
        id: "eaf93d4b-c793-4397-9330-872449bed5be",
        name: "Shaky Knees",
        details: "Get your tickets now",
        startDate: "2025-09-19"
    },
    {
        id: "7c1a778b-20f2-4a9e-ab7a-bfa7293c1db2",
        name: "Lantern Festival",
        details: "Lets meet before and make some lanterns. I'm not planning the actual event but its a whole thing we should get a group together to do",
        startDate: "cancelled"
    },
    {
        id: "867a25fb-224c-400e-98d2-6ca0a45444c7",
        name: "Art Projects Day",
        details: "Bring something you are working on and we can all work on our art projects we've been neglecting",
        startDate: "tbd"
    },
    {
        id: "48991928-4c60-493b-9bd2-426cf3116eac",
        name: "Hike - North Georgia",
        details: "Lets look at trees and maybe a waterfall",
        startDate: "tbd"
    },
    {
        id: "d1088340-82c2-45f7-8e99-2c17a9334230",
        name: "Kayak & Paddleboard",
        details: "day on the water and then Halal after",
        startDate: "tbd"
    },
    {
        id: "59f95cf4-b803-4a9d-a712-1fa679056fde",
        name: "Paint'n'sip at home",
        details: "A paint and sip but without a competent instructor",
        startDate: "tbd"
    },
    {
        id: "7600e356-bf29-4470-9567-001219fb4619",
        name: "other pitched ideas",
        details: "Candle making, dumpling wrapping, Line dancing, salsa at eclipse di luna, bro force co-op, track more concerts, track comedy shows, dog beach, find more local-events",
        startDate: "tbd"
    },
    {
        id: "f551e54e-a8cf-4410-b9a2-f32f2a7987e9",
        name: "Hot air Balloon",
        details: "I'm not really even sure that this is a thing",
        startDate: "tbd"
    },
    {
        id: "02f854de-fdfc-486b-ab73-24ca6c6300bf",
        name: "zombie walk",
        details: "A beltline bar crawl with some sick zombie makeup",
        startDate: "tbd"
    },
    {
        id: "b1e3976b-8368-4892-a64d-2d77e5b3f365",
        name: "pool party",
        details: "Pool party at the condo",
        startDate: "tbd"
    },
    {
        id: "e72540d9-7ed4-4c5d-a337-4b728b7d1957",
        name: "Wall Ride",
        details: "twice a month group bike ride",
        startDate: "tbd"
    },
    {
        id: "1516fe29-bfaf-4345-9ebf-64d038781005",
        name: "Piedmont Heights Pickleball League",
        details: "a very poorly managed (by me) pickleball league",
        startDate: "tbd"
    },
    {
        id: "ad4c0794-0fbe-4f4d-af0c-41bb8be5a47a",
        name: "Outdoor Movie Night: The Room",
        details: "Lets watch a movie by the pool",
        startDate: "tbd"
    },
    {
        id: "df51880b-c66d-4a0d-b2bf-bbe38201a2ee",
        name: "Texas Hold em Poker",
        details: "Bluffing encouraged",
        startDate: "tbd"
    },
    {
        id: "fbb858e9-ba89-46c0-9f1c-9c992d15d27c",
        name: "Karoake night",
        details: "Go big or go home",
        startDate: "tbd"
    },
    {
        id: "a4753aa2-c8c1-4300-a994-4ad7fbef4f65",
        name: "Hot Pot",
        details: "Just need to remember I like doing these",
        startDate: "tbd"
    },
    {
        id: "7c0ecb0f-42b3-43ff-8f6b-c8f0d3c447e9",
        name: "slack line",
        details: "invite people to do a slackline but also don't let people think i'm one of those slackline guys in any way",
        startDate: "tbd"
    }
]