// THIS CODE IS TRASH -- I'm just seeing if this is useful for me at all
// ALSO I KNOW THE IMAGES ARE TERRIBLE AI SLOP - I wouldn't let this 

const PicturePopUp = ({ levelId, setOpenPicture }: any) => {
    console.log("levelId in pop up", levelId)
    return levelId ? <div className="picture-container">
        <div><h3>Describe as much as you can!</h3></div>
        <div><h4>Sorry this is AI slop, I'm just testing this out</h4></div>
        <span
            className="close"
            onClick={() => setOpenPicture(null)}
        >&times;
        </span>
        <img
            className="picture-style"
            src={`/${levelId}.png`}
            alt={`${levelId}`}
        />
    </div> :
        <></>
}

export default PicturePopUp