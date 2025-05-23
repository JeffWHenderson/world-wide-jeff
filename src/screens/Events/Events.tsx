import { hardCodedEvents } from "./EventTypes"

const Events = () => {
    const displayDate = (date: "tbd" | Date) => {
        if (date === 'tbd') {
            return <span style={{ color: 'black', backgroundColor: "yellow", padding: "4px", borderRadius: "10px" }}>{date}</span>
        }

        // TODO: Better Date Formatting
        return <span style={{ color: 'black', backgroundColor: "white", padding: "4px", borderRadius: "10px" }}>{date.toString().split(" 2025")[0]}</span>
    }

    return (
        <>
            {/* EVENT CARD START */}
            <h2>Coming Up</h2>
            {
                hardCodedEvents.map(item => (
                    // TODO: this is just a hack while I don't have internet to figure out the best way to handle dates
                    !item.startDate.toString().includes("May") &&
                    <div style={{ backgroundColor: "grey", border: "1px solid grey", margin: "2px", borderRadius: "10px", padding: "0px 4px 0px 8px" }} key={item.id} onClick={() => console.log("clicked " + item.id)}>
                        <div>
                            <h4> {displayDate(item.startDate)} {item.name}</h4 >
                        </div>

                        <p>{item.details}</p>
                    </div>
                ))
            }
            {/* EVENT CARD END */}

            <h2>Completed Events</h2>
            {
                hardCodedEvents.map(item => (
                    // TODO: this is just a hack while I don't have internet to figure out the best way to handle dates
                    item.startDate.toString().includes("May") &&
                    <div style={{ backgroundColor: "grey", border: "1px solid grey", margin: "2px", borderRadius: "10px", padding: "0px 4px 0px 8px" }} key={item.id} onClick={() => console.log("clicked " + item.id)}>
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