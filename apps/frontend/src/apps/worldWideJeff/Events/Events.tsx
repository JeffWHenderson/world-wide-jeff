import { useNavigate } from "react-router-dom"
import { EventDetails, hardCodedEvents } from "./EventTypes"

const Events = () => {
    const navigator = useNavigate()


    const displayDate = (date: "tbd" | Date) => {
        if (date === 'tbd') {
            return <span style={{ color: 'black', backgroundColor: "yellow", padding: "4px", borderRadius: "10px" }}>{date}</span>
        }

        // TODO: Better Date Formatting
        return <span style={{ color: 'black', backgroundColor: "white", padding: "4px", borderRadius: "10px" }}>{date.toString().split(" 202")[0]}</span>
    }

    const handleOpenEventPage = (item: EventDetails) => {
        navigator(`/events/${item.id}`);
    }

    const isCompleted = (startDate: string | Date) => {
        if (typeof startDate == "object") {
            return startDate.getTime() < Date.now();
        }
        return false;
    }

    return (
        <>
            {/* EVENT CARD START */}
            <h2>Coming Up</h2>
            {
                hardCodedEvents.map(item => (
                    // TODO: this is just a hack while I don't have internet to figure out the best way to handle dates
                    !isCompleted(item.startDate) &&
                    <div
                        style={{
                            backgroundColor: "var(--card-color)",
                            border: "1px solid grey", margin: "2px",
                            borderRadius: "10px",
                            padding: "0px 4px 0px 8px",
                            color: "var(--text-color)"
                        }}
                        className="comment"
                        key={item.id} onClick={() => handleOpenEventPage(item)}
                    >
                        <div>
                            <h4> {displayDate(item.startDate)} {item.name}</h4 >
                        </div>

                        <p className="comment">{item.details}</p>
                    </div>
                ))
            }
            {/* EVENT CARD END */}

            <h2>Completed Events</h2>
            {
                hardCodedEvents.map(item => (
                    // TODO: this is just a hack while I don't have internet to figure out the best way to handle dates
                    isCompleted(item.startDate) &&
                    <div style={{ backgroundColor: "grey", border: "1px solid grey", margin: "2px", borderRadius: "10px", padding: "0px 4px 0px 8px" }} key={item.id} onClick={() => handleOpenEventPage(item)}>
                        <div>
                            <h4> {displayDate(item.startDate)} {item.name}</h4 >
                        </div>

                        <p>{item.details}</p>
                    </div>
                ))
            }

        </>
    )
}

export default Events;