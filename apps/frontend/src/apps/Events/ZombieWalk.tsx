import React, { useState, useEffect } from 'react';

const ZombieWalk: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isEventStarted, setIsEventStarted] = useState(false);

    // Target: April 25, 2026, 7:00 PM local time
    const targetDate = new Date(2026, 3, 25, 19, 0, 0);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                setIsEventStarted(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setIsEventStarted(false);
            const secondsTotal = Math.floor(diff / 1000);
            const days = Math.floor(secondsTotal / 86400);
            const hours = Math.floor((secondsTotal % 86400) / 3600);
            const minutes = Math.floor((secondsTotal % 3600) / 60);
            const seconds = secondsTotal % 60;

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    //     const addToCalendar = () => {
    //         const startDate = new Date(2026, 3, 25, 19, 0, 0);
    //         const endDate = new Date(2026, 3, 26, 1, 0, 0);

    //         const formatLocalForICS = (date: Date) => {
    //             const year = date.getFullYear();
    //             const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //             const day = date.getDate().toString().padStart(2, '0');
    //             const hours = date.getHours().toString().padStart(2, '0');
    //             const minutes = date.getMinutes().toString().padStart(2, '0');
    //             const seconds = date.getSeconds().toString().padStart(2, '0');
    //             return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    //         };

    //         const startStr = formatLocalForICS(startDate);
    //         const endStr = formatLocalForICS(endDate);

    //         const icsContent = `BEGIN:VCALENDAR
    // VERSION:2.0
    // PRODID:-//ZombieWalkATL//EN
    // BEGIN:VEVENT
    // UID:zombiewalk2026atl@event.com
    // DTSTAMP:${startStr}Z
    // DTSTART;TZID=America/New_York:${startStr}
    // DTEND;TZID=America/New_York:${endStr}
    // SUMMARY:🧟 Zombie Walk & Bar Crawl Atlanta 2026 🧟
    // DESCRIPTION:Join the undead horde! Starts at Ladybird (684 John Wesley Dobbs Ave NE). Bar crawl to multiple locations. Costume contest. 21+ event. Crawl begins at 7pm.
    // LOCATION:Ladybird Atlanta, 684 John Wesley Dobbs Ave NE, Atlanta, GA 30312
    // URL:https://zombiewalkatl.example
    // BEGIN:VALARM
    // TRIGGER:-PT30M
    // ACTION:DISPLAY
    // DESCRIPTION:Reminder: Zombie Walk starts in 30 minutes at Ladybird!
    // END:VALARM
    // END:VEVENT
    // END:VCALENDAR`;

    //         const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    //         const link = document.createElement('a');
    //         const url = URL.createObjectURL(blob);
    //         link.href = url;
    //         link.download = 'Zombie_Walk_2026.ics';
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //         URL.revokeObjectURL(url);

    //         // Show toast message
    //         const toast = document.createElement('div');
    //         toast.innerText = '📅 Reminder downloaded! Open file to add to your calendar.';
    //         toast.style.position = 'fixed';
    //         toast.style.bottom = '20px';
    //         toast.style.left = '20px';
    //         toast.style.backgroundColor = '#2c1a12';
    //         toast.style.color = '#ffddb0';
    //         toast.style.padding = '12px 20px';
    //         toast.style.borderRadius = '40px';
    //         toast.style.borderLeft = '5px solid #bc5a2c';
    //         toast.style.fontWeight = 'bold';
    //         toast.style.zIndex = '999';
    //         toast.style.backdropFilter = 'blur(8px)';
    //         document.body.appendChild(toast);
    //         setTimeout(() => toast.remove(), 3500);
    //     };

    const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

    return (
        <div style={styles.container}>
            <div style={styles.hero}>
                <h1 style={styles.eventTitle}>Zombie Walk 2026</h1>
                <div style={styles.dateBadge}>📍 SATURDAY APRIL 25, 2026 · 7PM · 🧠 ATLANTA</div>
            </div>

            <div style={styles.freeNote}>🧟‍♀️ FREE EVENT · BAR CRAWL STARTS AT PAINTED PARK · APRIL 25, 2026 🧟‍♂️</div>

            <div style={styles.countdownWrapper}>
                <div style={styles.countdown}>
                    <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{formatNumber(timeLeft.days)}</div>
                        <div style={styles.countdownLabel}>DAYS</div>
                    </div>
                    <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{formatNumber(timeLeft.hours)}</div>
                        <div style={styles.countdownLabel}>HOURS</div>
                    </div>
                    <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{formatNumber(timeLeft.minutes)}</div>
                        <div style={styles.countdownLabel}>MINUTES</div>
                    </div>
                    <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{formatNumber(timeLeft.seconds)}</div>
                        <div style={styles.countdownLabel}>SECONDS</div>
                    </div>
                </div>
                {isEventStarted && (
                    <div style={styles.eventStartedMessage}>
                        🧟 THE ZOMBIE WALK IS HAPPENING NOW! GET TO PAINTED PARK 🧟
                    </div>
                )}
            </div>

            <div style={styles.infoGrid}>
                <div style={styles.infoCard}>
                    <h3 style={styles.cardTitle}>Jeff, what is a Zombie Walk?</h3>
                    <div style={{ textAlign: 'left' }}>
                        <ol>
                            <li>Put on zombie makeup</li>
                            <li>Meet at Painted Park</li>
                            <li>Drink</li>
                        </ol>
                        <a href="https://www.tiktok.com/@katiefarhood/video/6889075121588292869">You can do makeup like this</a>
                    </div>
                </div>

                <div style={styles.infoCard}>
                    <h3 style={styles.cardTitle}>Celebrating</h3>
                    <div>
                        <div>Anushka's Birthday</div>
                        <div>Jeff's birthday</div>
                        <div>Anybody born in April or whenever</div>
                    </div>
                </div>
            </div>

            <div style={styles.routeSection}>
                <h2 style={styles.sectionTitle}>🧠 BRAIN-CRAWL ROUTE 🧠</h2>
                <div style={styles.crawlSteps}>
                    <div style={styles.step}>
                        <span style={styles.stepNumber}>1</span>
                        <span style={styles.stepContent}>
                            <strong>Painted Park</strong>
                        </span>
                        <span style={styles.stepTime}>7:00p – 7:30p</span>
                    </div>
                    <div style={styles.step}>
                        <span style={styles.stepNumber}>2</span>
                        <span style={styles.stepContent}>
                            <strong>Ladybird</strong>
                        </span>
                        <span style={styles.stepTime}>7:45p – 8:30p</span>
                    </div>
                    <div style={styles.step}>
                        <span style={styles.stepNumber}>3</span>
                        <span style={styles.stepContent}>
                            <strong>Pour Taproom</strong>
                        </span>
                        <span style={styles.stepTime}>8:45p – 9:15p</span>
                    </div>
                    <div style={styles.step}>
                        <span style={styles.stepNumber}>4</span>
                        <span style={styles.stepContent}>
                            <strong>97 Estoria</strong>
                        </span>
                        <br />
                        <span style={styles.stepTime}>9:30p - Whenever</span>
                    </div>
                </div>
                {/* <div style={styles.zombieGraffiti}>🧟‍♂️  🧠  🍺  🧟‍♀️  “DRAG YOUR LIMBS FROM BAR TO BAR”</div> */}
            </div>

            {/* <div style={styles.warningBox}>
                <h4 style={styles.warningTitle}>⚠️ ZOMBIE SURVIVAL GUIDE ⚠️</h4>
                <p>
                    ✔️ 21+ with valid ID (brains only for the undead).<br />
                    ✔️ Costumes encouraged but not mandatory — face paint recommended.<br />
                    ✔️ Please drink responsibly & arrange a ride share / MARTA.<br />
                    ✔️ Follow the herd: look for the green glow sticks & zombie flag.<br />
                    ✔️ Tag your pics: <strong style={{ color: '#f0a575' }}>#ZombieWalkATL</strong> | 📸 Official photographer on route.
                </p>
                <button style={styles.button} onClick={addToCalendar}>
                    📅 ADD TO CALENDAR (REMINDER)
                </button>
            </div> */}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        background: 'radial-gradient(circle at 10% 20%, #1a0b0b, #0a0303)',
        color: '#f0e6d0',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        lineHeight: 1.5,
        minHeight: '100vh',
    },
    hero: {
        textAlign: 'center',
        padding: '3rem 1rem 4rem',
        position: 'relative',
    },
    eventTitle: {
        fontFamily: "'Creepster', cursive",
        fontSize: 'clamp(3.8rem, 12vw, 7rem)',
        background: 'linear-gradient(135deg, #eebb77, #bc5a2c, #8b2c1d)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        textShadow: '0 0 8px rgba(0,0,0,0.5)',
        letterSpacing: '4px',
        marginBottom: '0.5rem',
    },
    tagline: {
        fontSize: '1.3rem',
        letterSpacing: '2px',
        color: '#e0a878',
        borderTop: '2px dashed #bc5a2c',
        display: 'inline-block',
        paddingTop: '0.8rem',
        fontWeight: 500,
    },
    dateBadge: {
        background: '#2c0f0aee',
        backdropFilter: 'blur(4px)',
        display: 'inline-block',
        padding: '0.5rem 1.8rem',
        borderRadius: '60px',
        margin: '1.5rem 0 0.5rem',
        fontWeight: 700,
        fontSize: '1.3rem',
        border: '1px solid #bc5a2c',
        boxShadow: '0 0 12px rgba(188, 90, 44, 0.4)',
    },
    countdownWrapper: {
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: '3rem',
        padding: '1.2rem 1rem',
        margin: '2rem 0 2.5rem',
        border: '1px solid #7a3a28',
        boxShadow: '0 20px 30px -15px black',
    },
    countdown: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1.2rem',
        flexWrap: 'wrap',
    },
    countdownItem: {
        background: '#0e0503d9',
        padding: '0.8rem 1.3rem',
        borderRadius: '2rem',
        minWidth: '90px',
        textAlign: 'center',
        borderBottom: '3px solid #bc5a2c',
    },
    countdownNumber: {
        fontSize: '2.2rem',
        fontWeight: 800,
        fontFamily: 'monospace',
        letterSpacing: '2px',
        color: '#ffbc8c',
    },
    countdownLabel: {
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        fontWeight: 600,
        opacity: 0.8,
    },
    countdownCaption: {
        textAlign: 'center',
        marginTop: '12px',
        fontSize: '0.85rem',
    },
    eventStartedMessage: {
        textAlign: 'center',
        marginTop: '12px',
        fontWeight: 'bold',
        color: '#ffbc8c',
        animation: 'pulse 1.8s infinite',
    },
    infoGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
        margin: '3rem 0 3rem',
    },
    infoCard: {
        background: '#1c0d09cc',
        backdropFilter: 'blur(8px)',
        borderRadius: '2rem',
        padding: '1.6rem 2rem',
        flex: '1 1 260px',
        textAlign: 'center',
        transition: '0.2s ease',
        border: '1px solid #a95136',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    },
    cardIcon: {
        fontSize: '2.8rem',
        marginBottom: '1rem',
    },
    cardTitle: {
        fontFamily: "'Creepster', cursive",
        fontSize: '1.8rem',
        letterSpacing: '1px',
        marginBottom: '0.8rem',
        color: '#e9b386',
    },
    addressLink: {
        color: '#f0b27a',
        textDecoration: 'none',
        borderBottom: '1px dotted #bc5a2c',
    },
    routeSection: {
        margin: '3rem 0 2.5rem',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '2.5rem',
        padding: '1.8rem',
    },
    sectionTitle: {
        fontFamily: "'Creepster', cursive",
        fontSize: '2.4rem',
        textAlign: 'center',
        marginBottom: '2rem',
        letterSpacing: '2px',
        color: '#e5b07c',
    },
    crawlSteps: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '700px',
        margin: '0 auto',
    },
    step: {
        background: '#210f0ad9',
        borderRadius: '80px',
        padding: '0.9rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        borderLeft: '8px solid #bc5a2c',
    },
    stepNumber: {
        background: '#bc5a2c',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: '1.3rem',
        color: '#0f0502',
    },
    stepContent: {
        flex: 1,
        fontWeight: 500,
    },
    stepTime: {
        fontFamily: 'monospace',
        background: '#00000066',
        padding: '0.2rem 0.8rem',
        borderRadius: '30px',
        fontSize: '0.85rem',
    },
    zombieGraffiti: {
        fontSize: '2.5rem',
        textAlign: 'center',
        opacity: 0.4,
        marginTop: '1rem',
        userSelect: 'none',
    },
    warningBox: {
        background: '#281008c9',
        borderRadius: '2rem',
        padding: '1.5rem',
        margin: '2rem 0',
        textAlign: 'center',
        border: '1px dashed #e07a5a',
    },
    warningTitle: {
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '0.8rem',
    },
    button: {
        background: '#bc5a2c',
        border: 'none',
        padding: '0.9rem 2rem',
        fontWeight: 'bold',
        borderRadius: '60px',
        color: '#0f0502',
        fontSize: '1.1rem',
        marginTop: '1rem',
        transition: '0.2s',
        cursor: 'pointer',
        boxShadow: '0 5px 12px black',
    },
    freeNote: {
        textAlign: 'center',
        marginTop: '1rem',
        fontStyle: 'italic',
        background: '#00000044',
        borderRadius: '3rem',
        padding: '0.8rem',
    },
    footer: {
        textAlign: 'center',
        marginTop: '4rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #5e2e1e',
        fontSize: '0.85rem',
        color: '#bd8f74',
    },
};

export default ZombieWalk;