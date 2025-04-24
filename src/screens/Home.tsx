import { events } from "./Events"

const Home = () => {
    return (
        <>
            {/* EVENT CARD START */}
            <h2>EVENTS</h2>
            {
                events.map(item => (
                    <div style={{ backgroundColor: "grey", border: "1px solid grey", margin: "2px", borderRadius: "10px", padding: "0px 4px 0px 8px" }} key={item.id} onClick={() => console.log("clicked " + item.id)}>
                        <h4> {item.name}</h4 >
                        <p>{item.details}</p>
                    </div>
                ))
            }
            {/* EVENT CARD END */}
        </>

    );
};

export default Home;