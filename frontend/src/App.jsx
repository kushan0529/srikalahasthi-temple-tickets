import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Tiro+Telugu&display=swap');

      :root {
        --saffron: #E8610A;
        --gold: #C9920A;
        --gold-light: #F5C842;
        --maroon: #7A0B2E;
        --maroon-deep: #4A0018;
        --cream: #FDF6E3;
        --text-dark: #1A0A00;
      }

      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        background-color: var(--maroon-deep); 
        color: var(--cream); 
        font-family: 'Crimson Text', serif;
        overflow-x: hidden;
      }

      h1, h2, h3, .heading-font { font-family: 'Cinzel Decorative', cursive; }
      .nav-font, button, label { font-family: 'Cinzel', serif; }
      .telugu-font { font-family: 'Tiro Telugu', serif; }

      @keyframes ticker {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }

      @keyframes glowPulse {
        0% { box-shadow: 0 0 5px var(--gold); }
        50% { box-shadow: 0 0 20px var(--gold-light); }
        100% { box-shadow: 0 0 5px var(--gold); }
      }

      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
        50% { transform: translateY(-20px) rotate(5deg); opacity: 0.3; }
        100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
      }

      /* Scrollbar Styling */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: var(--maroon-deep); }
      ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--gold-light); }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
