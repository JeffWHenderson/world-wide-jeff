// THIS CODE IS TRASH -- I'm just seeing if this is useful for me at all
// ALSO I KNOW THE IMAGES ARE TERRIBLE AI SLOP - I wouldn't let this 

import { useState } from "react"

const PicturePopUp = ({ levelId, setOpenPicture }: any) => {
    // OKAY HERE ME OUT, I'm going to make this a story type thing that has a moving marker to help identify what is the subject... its going to be so cool
    const [pointerPositionVertical, setPointerPositionVertical] = useState("30%")
    const [pointerPositionHorizontal, setPointerPositionHorizontal] = useState("20%")


    const movePointer = () => {
        setPointerPositionVertical(`${Math.floor(Math.random() * 100) + 1}%`)
        setPointerPositionHorizontal(`${Math.floor(Math.random() * 100) + 1}%`)
    }

    return levelId ? <div className="picture-container">
        <div><h3>Describe as much as you can!</h3></div>
        <div><h4>Sorry this is AI slop, I'm just testing this out</h4></div>
        <div onClick={() => movePointer()}>random</div>
        <span
            className="close"
            onClick={() => setOpenPicture(null)}
        >&times;
        </span>
        <div className="circle" style={{ position: 'absolute', top: pointerPositionVertical, left: pointerPositionHorizontal }}></div>
        <img
            className="picture-style"
            src={`/${levelId}.png`}
            alt={`${levelId}`}
        />
    </div> :
        <></>
}

export default PicturePopUp