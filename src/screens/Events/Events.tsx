import { hardCodedEvents } from "./EventTypes"

const Events = () => {
    const displayDate = (date: "tbd" | "cancelled" | string) => {
        if (date === 'cancelled') {
            return <span style={{ color: 'black', backgroundColor: "red", padding: "4px", borderRadius: "10px" }}>{date}</span>
        }

        if (date === 'tbd') {
            return <span style={{ color: 'black', backgroundColor: "yellow", padding: "4px", borderRadius: "10px" }}>{date}</span>
        }

        return <span style={{ color: 'black', backgroundColor: "white", padding: "4px", borderRadius: "10px" }}>{date.split("2025-")[1]}</span>
    }


    return (
        <>
            {/* EVENT CARD START */}
            <h2>EVENTS</h2>
            {
                hardCodedEvents.map(item => (
                    <div style={{ backgroundColor: "grey", border: "1px solid grey", margin: "2px", borderRadius: "10px", padding: "0px 4px 0px 8px" }} key={item.id} onClick={() => console.log("clicked " + item.id)}>
                        <div>
                            <h4> {displayDate(item.startDate)} {item.name}</h4 >
                        </div>

                        <p>{item.details}</p>
                    </div>
                ))
            }
            {/* EVENT CARD END */}
        </>
    )
}

export default Events;