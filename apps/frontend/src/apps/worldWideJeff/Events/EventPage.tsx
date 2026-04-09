import { useNavigate, useParams } from "react-router-dom";
import { hardCodedEvents } from "./EventTypes"

const EventPage = () => {
    const { eventId } = useParams();
    const navigator = useNavigate()

    const event = hardCodedEvents.find((event: any) => {
        return event.id === eventId
    })



    return (<>
        {
            event ?
                <div>
                    <h1>{event.name}</h1>
                    <p>{event.startDate.toString()}</p>
                    <p>{event.details}</p>
                    <p>{event.status}</p>
                    {event?.links?.length && event?.links?.length > 0 &&
                        <>
                            <h3>Links</h3>
                            <a href={event.links[0].link}> {event.links[0].linkDescription}</a>

                        </>
                    }
                    <br /><br /><br />
                    <button onClick={() => navigator('/events')}>GO BACK!!!</button>
                </div>
                :
                <div>
                    no event found
                </div>
        }
    </>)
}

export default EventPage;