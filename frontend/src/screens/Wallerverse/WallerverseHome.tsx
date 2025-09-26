import { useState } from "react";
import UnderConstruction from "../Core/UnderConstruction";
import { userInfoMock } from "./wallerverseTypes";

const styleDefaults = {
    backgroundColor: undefined,
    color: undefined
}

const WallerverseHome = () => {
    const [pageStyle, setPageStyle] = useState<any>(styleDefaults)

    const changeStyles = (newStyles: object) => {
        setPageStyle({ ...pageStyle, ...newStyles })
    }

    return (
        <div style={pageStyle}>
            <UnderConstruction name="Wallerverse" />
            <p style={{ color: "red" }}>Any changes you make will not be permanent</p>
            <h2>{userInfoMock.displayName}</h2>
            <br />
            <br />
            <br />
            <br />
            <h3>Top 8 Friends</h3>
            <div style={{ display: "flex" }}>
                <p style={{ width: "50px", height: "50px", backgroundColor: "black", margin: "3px" }}>Tom</p>
                <p style={{ width: "50px", height: "50px", backgroundColor: "black", margin: "3px" }}>Audry</p>
                <p style={{ width: "50px", height: "50px", backgroundColor: "black", margin: "3px" }}>Jeff</p>
                <p style={{ width: "50px", height: "50px", backgroundColor: "black", margin: "3px" }}>Jeff</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ width: "50px", height: "50px", backgroundColor: "black", margin: "3px" }}>Jeff</p>
                <p style={{ width: "50px", height: "50px", backgroundColor: "black", margin: "3px" }}>Jeff</p>
                <p style={{ width: "50px", height: "50px", backgroundColor: "black", margin: "3px" }}>Jeff</p>
                <p style={{ width: "50px", height: "50px", backgroundColor: "black", margin: "3px" }}>Jeff</p>
            </div>

            <h3>Someday you'll be able to style your own html</h3>

            <button onClick={() => changeStyles({ backgroundColor: "orange" })}>Change background</button>
        </div >
    )

}

export default WallerverseHome;