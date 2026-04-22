import { useState } from "react";
import "./Home.css";

const sevas = [
    { id: 1, name: "Rahu Ketu Pooja", telugu: "రాహు కేతు పూజ", price: 500, time: "6:00 AM - 6:00 PM" },
    { id: 2, name: "Rudrabhishekam", telugu: "రుద్రాభిషేకం", price: 600, time: "7:00 AM" },
    { id: 3, name: "Kalyanotsavam", telugu: "కళ్యాణోత్సవం", price: 1000, time: "10:30 AM" },
    { id: 4, name: "Sahasra Namarchana", telugu: "సహస్ర నామార్చన", price: 200, time: "5:00 PM" },
];

export default function Home() {
    const [lang, setLang] = useState("en");

    const t = {
        en: {
            title: "Sri Kalahasthi Devasthanam",
            subtitle: "The Dakshina Kasi - Gateway to Mukti",
            register: "Register / Login",
            sevas: "Popular Sevas",
            timings: "Temple Timings",
            bookNow: "Book Now",
            contact: "Contact Us",
            news: "Special Rahu Ketu Pooja timings during Grahanam: 10 AM to 4 PM. Please check your slots."
        },
        te: {
            title: "శ్రీకాళహస్తి దేవస్థానం",
            subtitle: "దక్షిణ కాశీ - ముక్తి ద్వారం",
            register: "రిజిస్టర్ / లాగిన్",
            sevas: "ప్రసిద్ధ సేవలు",
            timings: "ఆలయ వేళలు",
            bookNow: "బుక్ చేయండి",
            contact: "సంప్రదించండి",
            news: "గ్రహణం సమయంలో ప్రత్యేక రాహు కేతు పూజ సమయాలు: ఉదయం 10 నుండి సాయంత్రం 4 వరకు."
        }
    };

    const currentT = t[lang];

    return (
        <div className="home-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <img src="/favicon.svg" alt="Logo" />
                    <span>{currentT.title}</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#sevas">Sevas</a></li>
                    <li><a href="#timings">Timings</a></li>
                    <li><button className="lang-toggle" onClick={() => setLang(lang === "en" ? "te" : "en")}>
                        {lang === "en" ? "తెలుగు" : "English"}
                    </button></li>
                </ul>
            </nav>

            {/* News Ticker */}
            <div className="news-ticker">
                <div className="ticker-content">
                    {currentT.news}
                </div>
            </div>

            {/* Hero Section */}
            <section id="hero" className="hero-section" style={{ backgroundImage: 'url("/temple1.jpg")' }}>
                <div className="hero-overlay">
                    <div className="decorative-rings">
                        <div className="ring ring-1"></div>
                        <div className="ring ring-2"></div>
                        <div className="ring ring-3"></div>
                    </div>
                    <div className="hero-content">
                        <h1>{currentT.title}</h1>
                        <p>{currentT.subtitle}</p>
                        <button className="cta-btn">{currentT.bookNow}</button>
                    </div>
                </div>
            </section>

            {/* Sevas Section */}
            <section id="sevas" className="sevas-section">
                <h2>{currentT.sevas}</h2>
                <div className="seva-grid">
                    {sevas.map(seva => (
                        <div key={seva.id} className="seva-card">
                            <h3>{lang === "en" ? seva.name : seva.telugu}</h3>
                            <p className="price">₹{seva.price}</p>
                            <p className="time">{seva.time}</p>
                            <button className="book-btn">{currentT.bookNow}</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timings Section */}
            <section id="timings" className="timings-section">
                <h2>{currentT.timings}</h2>
                <div className="table-container">
                    <table className="timings-table">
                        <thead>
                            <tr>
                                <th>Darshan / Pooja</th>
                                <th>Morning</th>
                                <th>Evening</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>General Darshan</td>
                                <td>6:00 AM - 12:00 PM</td>
                                <td>4:00 PM - 9:00 PM</td>
                            </tr>
                            <tr>
                                <td>Special Entry</td>
                                <td>7:00 AM - 11:00 AM</td>
                                <td>5:00 PM - 8:00 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2026 Sri Kalahasthi Devasthanam. All Rights Reserved.</p>
            </footer>

            {/* WhatsApp Float */}
            <a href="https://wa.me/911234567890" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
            </a>
        </div>
    );
}