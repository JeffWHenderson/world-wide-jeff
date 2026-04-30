import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pickleball.css";
import UnderConstruction from "../common/Core/UnderConstruction";

type Area = "All" | "Atlanta" | "Decatur" | "Dunwoody";

interface Session {
    days: string;
    times: string;
}

interface Venue {
    name: string;
    address: string;
    mapsUrl: string;
    area: Exclude<Area, "All">;
    courtType: "Indoor" | "Outdoor" | "Mixed";
    sessions: Session[];
    cost: string;
    notes?: string;
}

const venues: Venue[] = [
    {
        name: "Marcus JCC — Eva G. Lipman Pickleball Complex",
        address: "5342 Tilly Mill Rd, Dunwoody, GA 30338",
        mapsUrl: "https://maps.google.com/?q=5342+Tilly+Mill+Rd+Dunwoody+GA+30338",
        area: "Dunwoody",
        courtType: "Mixed",
        sessions: [
            { days: "Mon, Wed, Fri", times: "10:00 AM – 2:00 PM (All Levels)" },
            { days: "Mon, Wed", times: "6:30 PM – 10:00 PM (Intermediate / Beginner)" },
            { days: "Tue, Thu", times: "6:30 PM – 10:00 PM (Advanced)" },
            { days: "Saturday", times: "9:00 AM – 12:00 PM (All Levels)" },
            { days: "Sunday", times: "11:30 AM – 4:00 PM (All Levels)" },
        ],
        cost: "Free for members · $10/session drop-in · SilverSneakers accepted",
        notes: "15 courts (11 covered). Paddle rack rotation — no sign-up needed.",
    },
    {
        name: "Atlanta Pickleball Center",
        address: "1359 Ellsworth Industrial Blvd NW, Atlanta, GA 30318",
        mapsUrl: "https://maps.google.com/?q=1359+Ellsworth+Industrial+Blvd+NW+Atlanta+GA+30318",
        area: "Atlanta",
        courtType: "Indoor",
        sessions: [
            { days: "Mon – Fri", times: "8:00 AM – 12:00 PM & 4:00 PM – 10:00 PM" },
            { days: "Sat – Sun", times: "8:00 AM – 6:00 PM" },
        ],
        cost: "Paid — book via CourtReserve app",
        notes: "10 climate-controlled courts. Social play sessions organized by skill level (2.5–4.0+).",
    },
    {
        name: "The Painted Pickle",
        address: "279 Ottley Dr NE, Atlanta, GA 30324",
        mapsUrl: "https://maps.google.com/?q=279+Ottley+Dr+NE+Atlanta+GA+30324",
        area: "Atlanta",
        courtType: "Indoor",
        sessions: [
            { days: "Fri & Sat", times: "8:00 PM – 12:00 AM" },
            { days: "Sunday", times: "7:00 PM – 10:00 PM" },
        ],
        cost: "$25/person Fri–Sat · $20/person Sun",
        notes: "Courts split by skill: Beginner, Intermediate (≤3.5), Advanced (4.0+). Food & drinks available.",
    },
    {
        name: "Sharon Lester Tennis & Pickleball Center (Piedmont Park)",
        address: "400 Park Dr NE, Atlanta, GA 30306",
        mapsUrl: "https://maps.google.com/?q=400+Park+Dr+NE+Atlanta+GA+30306",
        area: "Atlanta",
        courtType: "Outdoor",
        sessions: [
            { days: "Mon – Fri", times: "9:00 AM – 9:00 PM" },
            { days: "Saturday", times: "9:00 AM – 6:00 PM" },
        ],
        cost: "$10 – $30 depending on session",
        notes: "8 courts. Operated by Agape Tennis Academy. Check the Agape app for current open play sessions.",
    },
    {
        name: "Lake Claire Park",
        address: "430 Lake Shore Dr NE, Atlanta, GA 30307",
        mapsUrl: "https://maps.google.com/?q=430+Lake+Shore+Dr+NE+Atlanta+GA+30307",
        area: "Atlanta",
        courtType: "Outdoor",
        sessions: [
            { days: "Tue, Thu, Sat, Sun", times: "~8:00 AM (informal drop-in)" },
        ],
        cost: "Free",
        notes: "3 courts. Bring your own net. Purely informal — very active community.",
    },
    {
        name: "DeKalb Tennis Center (Agape)",
        address: "1400 McConnell Dr, Decatur, GA 30033",
        mapsUrl: "https://maps.google.com/?q=1400+McConnell+Dr+Decatur+GA+30033",
        area: "Decatur",
        courtType: "Outdoor",
        sessions: [
            { days: "Mon, Wed, Fri", times: "9:00 AM – 12:00 PM" },
            { days: "Thursday", times: "4:30 PM – 6:00 PM (2.5–5.0)" },
        ],
        cost: "$7/court/hour",
        notes: "10 lighted courts. Check in at the pro shop on arrival.",
    },
    {
        name: "Ebster Recreation Center",
        address: "105 Electric Ave, Decatur, GA 30030",
        mapsUrl: "https://maps.google.com/?q=105+Electric+Ave+Decatur+GA+30030",
        area: "Decatur",
        courtType: "Indoor",
        sessions: [
            { days: "Tuesday", times: "11:15 AM – 2:00 PM" },
            { days: "Wednesday", times: "2:30 PM – 6:00 PM" },
        ],
        cost: "Free for Decatur residents · $3 non-residents",
        notes: "3 wood-floor courts. Drop-in, no advance registration.",
    },
    {
        name: "Oakhurst Recreation Center",
        address: "450 East Lake Drive, Decatur, GA 30030",
        mapsUrl: "https://maps.google.com/?q=450+East+Lake+Drive+Decatur+GA+30030",
        area: "Decatur",
        courtType: "Indoor",
        sessions: [
            { days: "Tue & Thu", times: "5:00 PM – 7:00 PM" },
            { days: "Saturday", times: "2:00 PM – 4:00 PM (Mar–Oct)" },
        ],
        cost: "Small fee · memberships available",
        notes: "Schedule may vary seasonally — call ahead to confirm.",
    },
    {
        name: "Dottie Bridges Courts at Flat Shoals Park",
        address: "4522 Flat Shoals Pkwy, Decatur, GA",
        mapsUrl: "https://maps.google.com/?q=4522+Flat+Shoals+Pkwy+Decatur+GA",
        area: "Decatur",
        courtType: "Outdoor",
        sessions: [
            { days: "Mon, Wed, Fri", times: "10:00 AM – 2:00 PM" },
        ],
        cost: "Free",
        notes: "4 courts. Part of DeKalb County parks system.",
    },
    {
        name: "Decatur YMCA",
        address: "1100 Clairemont Ave, Decatur, GA 30030",
        mapsUrl: "https://maps.google.com/?q=1100+Clairemont+Ave+Decatur+GA+30030",
        area: "Decatur",
        courtType: "Indoor",
        sessions: [
            { days: "Mon, Wed, Fri", times: "9:00 AM – 11:00 AM" },
        ],
        cost: "YMCA membership required",
    },
    {
        name: "Scott Park",
        address: "231 Sycamore Street, Decatur, GA 30030",
        mapsUrl: "https://maps.google.com/?q=231+Sycamore+Street+Decatur+GA+30030",
        area: "Decatur",
        courtType: "Outdoor",
        sessions: [
            { days: "Daily", times: "8:00 AM – 10:00 PM (by reservation)" },
        ],
        cost: "Residents $5–$10 · Non-residents $10–$20 per 2 hrs",
        notes: "2 courts. Reserve via Glenlake Tennis Center: 404-377-7231 or CommunityPass.",
    },
    {
        name: "Beulah Community Family Life Center",
        address: "2340 Clifton Springs Rd, Decatur, GA 30032",
        mapsUrl: "https://maps.google.com/?q=2340+Clifton+Springs+Rd+Decatur+GA+30032",
        area: "Decatur",
        courtType: "Indoor",
        sessions: [
            { days: "Wednesday", times: "8:00 AM – 12:00 PM" },
        ],
        cost: "$20/month membership",
        notes: "5 wood-floor courts. Membership required.",
    },
];

const AREAS: Area[] = ["All", "Atlanta", "Decatur", "Dunwoody"];

const badgeClass = { Indoor: "pickle-badge-indoor", Outdoor: "pickle-badge-outdoor", Mixed: "pickle-badge-mixed" };

const Pickleball = () => {
    const navigate = useNavigate();
    const [area, setArea] = useState<Area>("All");

    const filtered = area === "All" ? venues : venues.filter((v) => v.area === area);

    return (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px 80px" }}>
            <button className="back-btn" onClick={() => navigate("/")}>← Home</button>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
                Pickleball
            </h1>
            <UnderConstruction name="Pickleball Open Playtimes" />
            <p style={{ margin: "0 0 20px", color: "#666", fontSize: "0.9rem" }}>
                Open play locations in Atlanta, Decatur & Dunwoody.
            </p>

            <div className="pickle-filters">
                {AREAS.map((a) => (
                    <button
                        key={a}
                        className={`pickle-filter-btn${area === a ? " active" : ""}`}
                        onClick={() => setArea(a)}
                    >
                        {a} {a === "All" ? `(${venues.length})` : `(${venues.filter(v => v.area === a).length})`}
                    </button>
                ))}
            </div>

            <div className="pickle-grid">
                {filtered.map((venue) => (
                    <div className="pickle-card" key={venue.name}>
                        <div className="pickle-card-header">
                            <p className="pickle-card-name">{venue.name}</p>
                            <span className={`pickle-badge ${badgeClass[venue.courtType]}`}>
                                {venue.courtType}
                            </span>
                        </div>

                        <p className="pickle-address">
                            <a href={venue.mapsUrl} target="_blank" rel="noreferrer">
                                {venue.address}
                            </a>
                        </p>

                        <div className="pickle-schedule">
                            {venue.sessions.map((s, i) => (
                                <div className="pickle-schedule-row" key={i}>
                                    <span className="pickle-days">{s.days}</span>
                                    <span className="pickle-times">{s.times}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pickle-meta">
                            <span><strong>Cost:</strong> {venue.cost}</span>
                            {venue.notes && <span><strong>Notes:</strong> {venue.notes}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pickleball;
