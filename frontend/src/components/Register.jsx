import { useState } from "react";
import "./Register.css";

export default function Register() {
    const [lang, setLang] = useState("en");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name || !email || !number || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

    }
    return (
        <div className="register-page">
            <div className="register-card">
                <h1>{lang === "en" ? "Devotee Registration" : "భక్తుల నమోదు"}</h1>
                <p className="subtitle">{lang === "en" ? "Create your account for easy bookings" : "సులభమైన బుకింగ్ కోసం మీ ఖాతాను సృష్టించండి"}</p>
                
                {error && <div className="error-msg">{error}</div>}
                {success && <div className="success-msg">{success}</div>}

                <div className="form-group">
                    <label>{lang === "en" ? "Full Name" : "పూర్తి పేరు"}</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rama Rao" />
                </div>

                <div className="form-group">
                    <label>{lang === "en" ? "Email Address" : "ఈమెయిల్ చిరునామా"}</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
                </div>

                <div className="form-group">
                    <label>{lang === "en" ? "Mobile Number" : "మొబైల్ సంఖ్య"}</label>
                    <input type="number" value={number} onChange={e => setNumber(e.target.value)} placeholder="10-digit number" />
                </div>

                <div className="form-group">
                    <label>{lang === "en" ? "Password" : "పాస్ వర్డ్"}</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" />
                </div>

                <div className="form-group">
                    <label>{lang === "en" ? "Confirm Password" : "పాస్ వర్డ్ నిర్ధారించండి"}</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="********" />
                </div>

                <button type="submit" className="submit-btn" onClick={handleSubmit}>
                    {lang === "en" ? "Register" : "నమోదు చేయండి"}
                </button>
                
                <p className="login-link">
                    {lang === "en" ? "Already have an account?" : "ఇప్పటికే ఖాతా ఉందా?"} <a>{lang === "en" ? "Login" : "లాగిన్"}</a>
                </p>
            </div>
        </div>
    )
}