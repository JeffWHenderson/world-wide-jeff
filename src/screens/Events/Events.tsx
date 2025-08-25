import { useState } from "react"
import { EventDetails, hardCodedEvents } from "./EventTypes"

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null)

    const displayDate = (date: "tbd" | Date) => {
        if (date === 'tbd') {
            return <span style={{ color: 'black', backgroundColor: "yellow", padding: "4px", borderRadius: "10px" }}>{date}</span>
        }

        // TODO: Better Date Formatting
        return <span style={{ color: 'black', backgroundColor: "white", padding: "4px", borderRadius: "10px" }}>{date.toString().split(" 2025")[0]}</span>
    }

    const handleOpenEventPage = (item: EventDetails) => {
        setSelectedEvent(item);
    }

    if (selectedEvent) {
        return (
            <>
                <h1>{selectedEvent.name}</h1>
                <p>{selectedEvent.startDate.toString()}</p>
                <p>{selectedEvent.details}</p>
                <p>{selectedEvent.status}</p>
                {selectedEvent?.links?.length && selectedEvent?.links?.length > 0 &&
                    <>
                        <h3>Links</h3>
                        <a href={selectedEvent.links[0].link}> {selectedEvent.links[0].linkDescription}</a>

                    </>
                }
                <br /><br /><br />
                <button onClick={() => setSelectedEvent(null)}>GO BACK!!!</button>
            </>
        )
    }

    return (
        <>
            {/* EVENT CARD START */}
            <h2>Coming Up</h2>
            {
                hardCodedEvents.map(item => (
                    // TODO: this is just a hack while I don't have internet to figure out the best way to handle dates
                    !item.startDate.toString().includes("May") &&
                    <div className="comment" style={{ backgroundColor: "grey", border: "1px solid grey", margin: "2px", borderRadius: "10px", padding: "0px 4px 0px 8px" }} key={item.id} onClick={() => handleOpenEventPage(item)}>
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
                    item.startDate.toString().includes("May") &&
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