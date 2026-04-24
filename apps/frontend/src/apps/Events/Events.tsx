import { useNavigate } from "react-router-dom";
import { EventDetails, hardCodedEvents } from "./EventTypes";
import "./events.css";

const formatDate = (date: "tbd" | Date) => {
    if (date === "tbd") {
        return { month: "TBD", day: null };
    }
    return {
        month: date.toLocaleString("default", { month: "short" }),
        day: date.getDate(),
    };
};

const isCompleted = (startDate: "tbd" | Date) =>
    typeof startDate === "object" && startDate.getTime() < Date.now();

const EventCard = ({ item, onClick }: { item: EventDetails; onClick: () => void }) => {
    const { month, day } = formatDate(item.startDate);
    const completed = isCompleted(item.startDate);

    return (
        <div
            className={`event-card${completed ? " completed" : ""}`}
            onClick={onClick}
        >
            <div className={`event-date-badge${item.startDate === "tbd" ? " tbd" : ""}`}>
                {day !== null ? (
                    <>
                        <span>{month}</span>
                        <span className="event-date-day">{day}</span>
                    </>
                ) : (
                    <span>TBD</span>
                )}
            </div>
            <div className="event-card-content">
                <p className="event-card-name">{item.name}</p>
                {item.details && <p className="event-card-details">{item.details}</p>}
                {item.status === "cancelled" && (
                    <span className="event-card-status">Cancelled</span>
                )}
            </div>
        </div>
    );
};

const Events = () => {
    const navigate = useNavigate();

    const upcoming = hardCodedEvents.filter((e) => !isCompleted(e.startDate));
    const completed = hardCodedEvents.filter((e) => isCompleted(e.startDate));

    return (
        <div className="events-page">
            <button className="back-btn" onClick={() => navigate("/")}>← Home</button>
            <h1 className="events-page-title">Events</h1>

            <div className="events-section">
                <p className="events-section-heading">Coming Up</p>
                {upcoming.map((item) => (
                    <EventCard
                        key={item.id + item.name}
                        item={item}
                        onClick={() => navigate(`/events/${item.id}`)}
                    />
                ))}
            </div>

            {completed.length > 0 && (
                <div className="events-section">
                    <p className="events-section-heading">Completed</p>
                    {completed.map((item) => (
                        <EventCard
                            key={item.id + item.name}
                            item={item}
                            onClick={() => navigate(`/events/${item.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;
