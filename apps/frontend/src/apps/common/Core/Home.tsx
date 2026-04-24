import { Link } from "react-router-dom";
import "./home.css";

const sections = [
    {
        to: "/events",
        icon: "📅",
        title: "Events",
        desc: "Upcoming and past events — zombie walks, meetups, and more.",
    },
    {
        to: "/pickleball",
        icon: "🏓",
        title: "Pickleball",
        desc: "Courts, games, and everything pickleball.",
    },
    {
        to: "/language-app",
        icon: "🌐",
        title: "Language App",
        desc: "Learn Spanish and Chinese with flashcards and spaced repetition.",
    },
    {
        to: "/contact",
        icon: "✉️",
        title: "Contact",
        desc: "Get in touch.",
    },
];

const Home = () => {
    return (
        <>
            <div className="home-hero">
                <h1 className="home-hero-title">World Wide Jeff</h1>
                <p className="home-hero-sub">Events, projects, and tools — all in one place.</p>
            </div>

            <div className="home-nav-grid">
                {sections.map((s) => (
                    <Link key={s.to} to={s.to} className="home-nav-card">
                        <div className="home-nav-card-icon">{s.icon}</div>
                        <p className="home-nav-card-title">{s.title}</p>
                        <p className="home-nav-card-desc">{s.desc}</p>
                        <div className="home-nav-card-arrow">→</div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Home;
