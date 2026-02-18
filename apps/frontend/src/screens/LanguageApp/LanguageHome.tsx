import { Link, useNavigate } from "react-router-dom";
import { AvailableLanguages } from "./LanguageTypes";
import "./main-styles.css";

const LanguageAppHome = () => {
    const navigator = useNavigate()

    function goToLanguagePage(selectedLanguage: string) {
        navigator(`${selectedLanguage}`)
    }

    return <>
        <div style={{ color: '--text-color' }}>
            <h1>Welcome To My Language App</h1>
            <div style={{ display: 'flex', justifySelf: 'center', justifyContent: 'space-between', width: '90vw' }}>
                {
                    Object.values(AvailableLanguages).map(option => (
                        <button onClick={() => goToLanguagePage(option)} key={option}>
                            {option}
                        </button>
                    ))
                }
            </div>
            <p>Its cool you are here and I'm happy</p>
            <h2>How do I start?</h2>
            <ul>
                <li><strong>Absolute beginner:</strong> Watch a video on pronunciation first. It will help a lot on hearing aspects of the language.  Then get started!</li>
                <li><strong>Still not super familiar:</strong> Start slower, reading each card and going through at a pace that gives you time to listen, read, and reapeat. You'll naturally start picking up on patterns</li>
                <li><strong>Add to your personal decks:</strong> Each level has an ugly yellow card of vocab that you can add to as you go.  Struggling with a few words still? Add the words and phrases to your personal decks.  Its all saved locally so it won't transfer between different devices but thats a decsion I made cause I don't want to make a database with your info</li>
                <li><strong>Speeding up:</strong> Go through the decks by listening, as you are familiar turn off the helper queues in English and listen only in the langauge you are learning</li>
                <li><strong>Consistency:</strong> 10 minutes a day! More time is fine, but consistency is king</li>
                <li><strong>Immersion:</strong> You're tired of the flashcards? Read and listen to the stories. Going past your comfort zone is more important than memorizing cards</li>
                <li><strong>Needing help?:</strong> I'm working on short lessons and grammar notes. But focus more on diving into the language. Your brain will pick up the patterns automatically in most cases, when something is not adding up the lessons are just there to help</li>
                <li><strong>Move on:</strong> This course is made to give you a start to where you can understand generated voices, but once you have that listening to native speakers is invaluable. I personally like searching for "vlog in slow spanish" on youtube if movies and tv move to fast</li>
                <li><strong>Move on again:</strong> Keep immersing.  A web app is a good start but challenge yourself outside of here</li>
            </ul>
            <h2>Core Concepts</h2>
            <ul>
                <li><strong>Comprehensible input:</strong> You should interact with the language at a place where you aren't completely comfortable but you are picking up most of it</li>
                <li><strong>Thematic dictionaries:</strong> Each level will have a limitted vocab set but go through many grammar topics so you don't feel like you're only memorizing words. You can start speaking about a topic quickly and in more complex structures. Nothing sucks more than learning for a year and only being able to speak in the present tense if at all</li>
                <li><strong>No user profiles No data stealing:</strong> There is no way for me to profit off your data, code is open source if you don't trust me</li>
                <li><strong>Alway free and no adds:</strong> I'm not good at capitalism</li>
                <li><strong>Community:</strong> Be nice, work together. Right now this thing is small but if I actually get a community of people together I'll make discord servers so you can practice with other learners</li>
                <li><strong>Community 2:</strong> Start with a friend, you can focus on the same theme and try talking about that. I may not be able to build a big community but I believe you can</li>
            </ul>

            <h2>Contribute</h2>
            <ul>
                <li>This is open for anybody to contribute.  I can add features and everything but my dream is that users can help shape the courses and bring in more languages</li>
                <li><strong>Code: <a href="https://github.com/JeffWHenderson/world-wide-jeff">GITHUB</a></strong></li>
                <li><strong>Report bugs or Feature requests:</strong> email me: <Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    </>
}

export default LanguageAppHome;