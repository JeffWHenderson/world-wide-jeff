import { useNavigate, useParams } from "react-router-dom";
import { hardCodedEvents } from "./EventTypes";
import ZombieWalk from "./ZombieWalk";
import "./events.css";

const EventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const event = hardCodedEvents.find((e) => e.id === eventId);

    if (event?.id === "zombie_walk_2026") {
        return <ZombieWalk />;
    }

    if (!event) {
        return (
            <div className="event-detail-page">
                <button className="event-detail-back" onClick={() => navigate("/events")}>
                    ← Back to Events
                </button>
                <p>Event not found.</p>
            </div>
        );
    }

    const dateStr =
        event.startDate === "tbd"
            ? "Date TBD"
            : event.startDate.toLocaleDateString("default", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              });

    return (
        <div className="event-detail-page">
            <button className="event-detail-back" onClick={() => navigate("/events")}>
                ← Back to Events
            </button>

            <h1 className="event-detail-title">{event.name}</h1>
            <p className="event-detail-meta">{dateStr}</p>

            {event.details && <p className="event-detail-body">{event.details}</p>}

            {event.links && event.links.length > 0 && (
                <div className="event-detail-links">
                    <h3>Links</h3>
                    {event.links.map((l) => (
                        <a key={l.link} href={l.link} target="_blank" rel="noreferrer">
                            {l.linkDescription}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventPage;
