import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const SectionTitle = ({ telugu, english, dark = false }) => (
  <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeInUp 1s ease' }}>
    <p className="telugu-font" style={{ color: dark ? 'var(--maroon)' : 'var(--gold)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{telugu}</p>
    <h2 style={{ color: dark ? 'var(--maroon-deep)' : 'var(--gold-light)', fontSize: '2.5rem', marginBottom: '1rem' }}>{english}</h2>
    <div style={{ width: '80px', height: '3px', background: 'var(--saffron)', margin: '0 auto' }}></div>
  </div>
);

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sevas, setSevas] = useState([]);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    API.get('/sevas').then(res => setSevas(res.data.sevas || []));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemStyle = (id) => ({
    color: 'var(--cream)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '700',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'color 0.3s'
  });

  return (
    <div style={{ position: 'relative' }}>
      
      {/* 1. TICKER */}
      <div style={{ 
        background: 'var(--maroon)', 
        color: 'var(--gold-light)', 
        padding: '8px 0', 
        fontSize: '0.9rem', 
        fontWeight: 'bold',
        borderBottom: '1px solid var(--gold)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1001
      }}>
        <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'ticker 25s linear infinite' }}>
          🕉️ ఓం నమః శివాయ • Temple open 6AM–8PM • Rahu Ketu Pooja daily 10AM • Book online – No Queue 🕉️ &nbsp;&nbsp;&nbsp;&nbsp; 
          🕉️ ఓం నమః శివాయ • Temple open 6AM–8PM • Rahu Ketu Pooja daily 10AM • Book online – No Queue 🕉️
        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: scrolled ? '0' : '40px',
        left: 0,
        right: 0,
        background: scrolled ? 'var(--maroon-deep)' : 'transparent',
        padding: '1.5rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.4s ease',
        zIndex: 1000,
        borderBottom: scrolled ? '1px solid var(--gold)' : 'none',
        boxShadow: scrolled ? '0 5px 20px rgba(0,0,0,0.5)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '2rem' }}>🕉️</span>
          <div>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--gold-light)', margin: 0 }}>Sri Kalahasthi</h1>
            <p className="telugu-font" style={{ fontSize: '0.7rem', color: 'var(--saffron)', margin: 0 }}>శ్రీకాళహస్తి దేవస్థానం</p>
          </div>
        </div>

        <ul style={{ display: 'flex', listStyle: 'none', gap: '30px', alignItems: 'center' }} className="nav-font">
          <li><a href="#home" style={navItemStyle()}>HOME</a></li>
          <li><a href="#about" style={navItemStyle()}>ABOUT</a></li>
          <li><a href="#darshan" style={navItemStyle()}>DARSHAN</a></li>
          <li><a href="#sevas" style={navItemStyle()}>SEVAS</a></li>
          <li><a href="#timings" style={navItemStyle()}>TIMINGS</a></li>
          {isAuthenticated ? (
            <>
              <li style={{ color: 'var(--gold)' }}>NAMASKARAM, {user.name.split(' ')[0]}</li>
              <li><button onClick={() => navigate('/my-bookings')} style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>MY BOOKINGS</button></li>
              <li><button onClick={logout} style={{ background: 'var(--saffron)', border: 'none', color: 'white', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>LOGOUT</button></li>
            </>
          ) : (
            <li><button onClick={() => navigate('/login')} style={{ background: 'var(--gold)', border: 'none', color: 'var(--maroon-deep)', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>LOGIN</button></li>
          )}
          <li>
            <button 
              onClick={() => navigate(isAuthenticated ? '/booking' : '/login')}
              style={{ 
                background: 'linear-gradient(to right, var(--saffron), var(--gold))',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '5px',
                fontWeight: '900',
                cursor: 'pointer',
                animation: 'glowPulse 2s infinite'
              }}
            >
              BOOK NOW
            </button>
          </li>
        </ul>
      </nav>

      {/* 3. HERO SECTION */}
      <section id="home" style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #2a0010 0%, #0d0005 70%, #1a0a00 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 5%'
      }}>
        {/* Decorative Rings */}
        <div style={{ position: 'absolute', width: '800px', height: '800px', border: '1px solid var(--gold)', borderRadius: '50%', opacity: 0.1, animation: 'floatUp 8s infinite ease-in-out' }}></div>
        <div style={{ position: 'absolute', width: '600px', height: '600px', border: '2px solid var(--gold-light)', borderRadius: '50%', opacity: 0.1, animation: 'floatUp 12s infinite ease-in-out reverse' }}></div>
        <div style={{ position: 'absolute', width: '400px', height: '400px', border: '1px dashed var(--gold)', borderRadius: '50%', opacity: 0.1, animation: 'floatUp 10s infinite ease-in-out' }}></div>

        <div style={{ textAlign: 'center', maxWidth: '900px', zIndex: 1, animation: 'fadeInUp 1.5s ease-out' }}>
          <p className="telugu-font" style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '1rem' }}>శ్రీ కాళహస్తీశ్వర స్వామి దేవాలయం</p>
          <h1 style={{ 
            fontSize: scrolled ? '4.5rem' : '5.5rem', 
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #ffd700, #fff, #ffd700)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
            transition: 'font-size 0.5s ease'
          }}>
            Sri Kalahasthi Temple
          </h1>
          <p style={{ fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--cream)', marginBottom: '3rem', letterSpacing: '1px' }}>
            One of the Pancha Bhuta Stalas · Vayu Lingam · Rahu Ketu Dosha Nivarana Kshetram
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button 
              onClick={() => navigate(isAuthenticated ? '/booking' : '/login')}
              style={{ padding: '18px 45px', background: 'var(--saffron)', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
              onMouseOver={(e) => e.target.style.background = 'var(--gold)'}
              onMouseOut={(e) => e.target.style.background = 'var(--saffron)'}
            >
              🎟 BOOK DARSHAN
            </button>
            <a 
              href="#sevas"
              style={{ padding: '18px 45px', background: 'transparent', color: 'var(--gold)', border: '2px solid var(--gold)', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', transition: '0.3s' }}
              onMouseOver={(e) => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--maroon-deep)'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)'; }}
            >
              🪔 VIEW SEVAS
            </a>
          </div>

          <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '50px', borderTop: '1px solid rgba(255,215,0,0.2)', paddingTop: '2rem' }}>
            {[
              { label: "1000+ Years", sub: "Old Legacy" },
              { label: "Vayu Kshetram", sub: "Panchabhuta" },
              { label: "Rahu-Ketu", sub: "Nivarana Pooja" }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '5px' }}>{stat.label}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" style={{ padding: '8rem 10%', background: 'var(--maroon-deep)' }}>
        <SectionTitle telugu="క్షేత్ర చరిత్ర" english="Sacred History" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '4rem' }}>
          {[
            { icon: "🌬️", title: "Vayu Lingam", desc: "The lamp inside the sanctum flickers continuously despite no air flow." },
            { icon: "🐍", title: "Rahu-Ketu", desc: "Supreme kshetra for Rahu and Ketu Sarpa Dosha Nivarana." },
            { icon: "🏛️", title: "Dravidian Marvel", desc: "Exquisite stone carvings from Chola and Vijayanagara eras." },
            { icon: "📍", title: "Srikalahasti", desc: "Situated on the banks of Swarnamukhi River." }
          ].map((card, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '2.5rem', borderRadius: '15px', border: '1px solid var(--maroon)', transition: '0.3s' }}
                 onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--gold)'}
                 onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--maroon)'}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{card.icon}</div>
              <h3 style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>{card.title}</h3>
              <p style={{ color: 'var(--cream)', opacity: 0.8 }}>{card.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
          <div style={{ flex: 1, borderLeft: '5px solid var(--gold)', paddingLeft: '2rem' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--cream)' }}>
              The temple is named after three animals: <strong>Sri</strong> (Spider), <strong>Kala</strong> (Serpent), and <strong>Hasti</strong> (Elephant), 
              all of whom attained salvation by worshipping Lord Shiva. Legend says the spider spun a web over the Lingam, 
              the serpent placed a gem, and the elephant washed it with water. Impressed by their devotion, 
              Lord Shiva merged their names into the name of this holy town.
            </p>
          </div>
          <div style={{ flex: 1 }}>
             <img src="/temple2.jpg" style={{ width: '100%', borderRadius: '15px', border: '2px solid var(--gold)' }} />
          </div>
        </div>
      </section>

      {/* 5. DARSHAN SECTION */}
      <section id="darshan" style={{ padding: '8rem 10%', background: 'var(--cream)' }}>
        <SectionTitle telugu="దర్శన రకాలు" english="Darshan Types" dark />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            { title: "Free Darshan", price: "0", wait: "3-4 hrs", te: "సర్వ దర్శనం" },
            { title: "Special Darshan", price: "100", wait: "1-2 hrs", te: "శీఘ్ర దర్శనం" },
            { title: "VIP Darshan", price: "300", wait: "30-45 min", te: "విశిష్ట దర్శనం", popular: true },
            { title: "Athi Vishishta", price: "500", wait: "15-20 min", te: "అతి విశిష్ట దర్శనం" }
          ].map((d, i) => (
            <div key={i} style={{ 
              background: 'white', 
              padding: '3rem 2rem', 
              borderRadius: '15px', 
              textAlign: 'center', 
              border: '1px solid rgba(122,11,46,0.1)',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              transition: '0.3s'
            }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--gold)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(122,11,46,0.1)'}>
              {d.popular && <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--saffron)', color: 'white', padding: '5px 20px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>POPULAR</span>}
              <p className="telugu-font" style={{ color: 'var(--maroon)', marginBottom: '0.5rem' }}>{d.te}</p>
              <h3 style={{ color: 'var(--maroon-deep)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>{d.title}</h3>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--saffron)', marginBottom: '1rem' }}>₹{d.price}</p>
              <p style={{ color: '#666', marginBottom: '2rem' }}>Wait time: {d.wait}</p>
              <button 
                onClick={() => navigate('/booking')}
                style={{ width: '100%', padding: '12px', background: 'var(--maroon-deep)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                BOOK NOW
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SEVAS SECTION */}
      <section id="sevas" style={{ padding: '8rem 10%', background: 'var(--maroon-deep)' }}>
        <SectionTitle telugu="నిత్య సేవలు" english="Sevas & Poojas" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {sevas.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '25px', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,215,0,0.1)', transition: '0.3s' }}
                 onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--gold-light)'}
                 onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,215,0,0.1)'}>
              <div style={{ fontSize: '2.5rem', color: 'var(--gold)' }}>{s.icon || '🪔'}</div>
              <div>
                <p className="telugu-font" style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>{s.teluguName}</p>
                <h3 style={{ color: 'white', fontSize: '1.4rem', margin: '5px 0' }}>{s.name}</h3>
                <p style={{ color: 'var(--cream)', opacity: 0.7, fontSize: '0.9rem', marginBottom: '1rem' }}>{s.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem', color: 'var(--gold-light)', fontWeight: 'bold' }}>₹{s.price}</span>
                  <button style={{ background: 'var(--gold)', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>BOOK</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TIMINGS SECTION */}
      <section id="timings" style={{ padding: '8rem 10%', background: 'var(--cream)' }}>
        <SectionTitle telugu="దర్శన వేళలు" english="Temple Timings" dark />
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid var(--maroon)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
              <thead>
                <tr style={{ background: 'var(--maroon-deep)', color: 'var(--gold-light)' }}>
                  <th style={{ padding: '20px', textAlign: 'left' }}>TIME SLOT</th>
                  <th style={{ padding: '20px', textAlign: 'left' }}>EVENT / POOJA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["5:30 AM", "Morning Open"], ["6:00 AM", "Maha Deepam"], ["7:00 AM", "Nitya Kalyanam"],
                  ["10:00 AM", "Rahu Ketu Pooja"], ["12:00 PM", "Noon Neivedhyam"], ["2:00 PM", "Afternoon Open"],
                  ["6:00 PM", "Evening Deepam"], ["7:30 PM", "Night Seva"], ["8:30 PM", "Temple Close"]
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(122,11,46,0.03)' : 'white' }}>
                    <td style={{ padding: '15px 20px', fontWeight: 'bold', color: 'var(--maroon)' }}>{row[0]}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-dark)' }}>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--saffron)', color: 'white', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold' }}>
            🔔 Festival Notice: Timings may vary on Ekadasi and Shivaratri.
          </div>
        </div>
      </section>

      {/* 8. GALLERY */}
      <section id="gallery" style={{ padding: '8rem 10%', background: 'var(--maroon-deep)' }}>
        <SectionTitle telugu="చిత్రమాలిక" english="Gallery" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {["/temple1.jpg", "/temple2.jpg", "/temple1.jpg", "/temple2.jpg"].map((src, i) => (
            <div key={i} style={{ height: '300px', overflow: 'hidden', borderRadius: '15px', border: '2px solid var(--gold)', position: 'relative' }}>
              <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }} 
                   onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                   onMouseOut={(e) => e.target.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </section>

      {/* 9. CONTACT */}
      <section id="contact" style={{ padding: '8rem 10%', background: 'var(--cream)' }}>
        <SectionTitle telugu="సంప్రదించండి" english="Reach Us" dark />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '4rem' }}>
          {[
            { icon: "🚂", title: "By Train", desc: "Srikalahasti Station (3km)" },
            { icon: "🚌", title: "By Bus", desc: "RTC Bus Stand (1km)" },
            { icon: "✈️", title: "By Air", desc: "Tirupati Airport (25km)" },
            { icon: "🚗", title: "By Road", desc: "Connected via NH 71" }
          ].map((item, i) => (
            <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '15px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h4 style={{ color: 'var(--maroon-deep)', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '50px' }}>
          <div style={{ flex: 1, padding: '2rem', background: 'var(--maroon-deep)', borderRadius: '15px', color: 'white' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Temple Address</h3>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Sri Kalahasteeswara Swami Devasthanam</p>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Srikalahasti, Chittoor District,<br/>Andhra Pradesh – 517644</p>
            <p style={{ color: 'var(--gold-light)' }}>📧 info@srikalahasthitemple.org</p>
            <p style={{ color: 'var(--gold-light)' }}>📞 +91 8578 222240</p>
          </div>
          <div style={{ flex: 1.5, background: '#eee', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#999', flexDirection: 'column' }}>
             📍 Map View Placeholder
             <a href="https://maps.google.com" style={{ fontSize: '0.9rem', color: 'var(--maroon)', marginTop: '10px' }}>Open in Google Maps</a>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer style={{ background: '#0a0003', padding: '5rem 10% 2rem', color: 'var(--cream)', borderTop: '2px solid var(--gold)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Sri Kalahasthi</h2>
            <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: '1.8' }}>The supreme spiritual gateway to Rahu-Ketu Dosha Nivarana and salvation. One of the powerful Panchabhuta Sthalams representing Vayu (Air).</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#about" style={{ color: 'var(--cream)', textDecoration: 'none', opacity: 0.8 }}>About Temple</a></li>
              <li><a href="#darshan" style={{ color: 'var(--cream)', textDecoration: 'none', opacity: 0.8 }}>Darshan Booking</a></li>
              <li><a href="#sevas" style={{ color: 'var(--cream)', textDecoration: 'none', opacity: 0.8 }}>Online Sevas</a></li>
              <li><a href="#timings" style={{ color: 'var(--cream)', textDecoration: 'none', opacity: 0.8 }}>Temple Timings</a></li>
            </ul>
          </div>
          <div>
             <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Follow Us</h3>
             <div style={{ display: 'flex', gap: '15px', fontSize: '1.5rem' }}>
                <span>📘</span> <span>📸</span> <span>🐦</span> <span>▶️</span>
             </div>
          </div>
          <div>
             <button onClick={() => navigate(isAuthenticated ? '/booking' : '/login')} style={{ width: '100%', padding: '15px', background: 'var(--saffron)', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>BOOK DARSHAN NOW</button>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,215,0,0.1)', opacity: 0.6, fontSize: '0.8rem' }}>
           &copy; 2026 Sri Kalahasthi Devasthanam. All Rights Reserved. <br/>
           <span style={{ fontSize: '1.2rem', marginTop: '10px', display: 'block', color: 'var(--gold)' }}>ఓం నమః శివాయ 🕉️</span>
        </div>
      </footer>

      {/* 11. FLOATING BUTTONS */}
      <a href="https://wa.me/911234567890?text=Om Namah Shivaya! I need help with booking." target="_blank" rel="noreferrer" style={{
        position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', background: '#25D366', borderRadius: '50%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', zIndex: 1000, textDecoration: 'none'
      }}>💬</a>

      {scrolled && <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} style={{
        position: 'fixed', bottom: '110px', right: '30px', width: '50px', height: '50px', background: 'var(--gold)', borderRadius: '50%', 
        border: 'none', fontSize: '1.5rem', cursor: 'pointer', zIndex: 1000, boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
      }}>↑</button>}

    </div>
  );
};

export default HomePage;
