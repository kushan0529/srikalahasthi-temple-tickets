import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return navigate('/login');
    API.get('/bookings/my').then(res => {
      setBookings(res.data.bookings || []);
      setLoading(false);
    });
  }, [isAuthenticated]);

  const handleCancel = async (ref) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await API.patch(`/bookings/${ref}/cancel`);
      setBookings(bookings.map(b => b.bookingRef === ref ? {...b, status: 'cancelled'} : b));
    } catch (err) {
      alert('Error cancelling booking');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: '5rem' }}>
      <header style={{ background: 'var(--maroon-deep)', padding: '2rem 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--gold)' }}>
         <h1 style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>My Bookings / నా బుకింగ్స్</h1>
         <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer' }}>🏠 HOME</button>
      </header>

      {/* Ticket Modal */}
      {selectedBooking && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', maxWidth: '500px', width: '100%', border: '5px double var(--gold)', position: 'relative' }}>
            <button onClick={() => setSelectedBooking(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--maroon)' }}>✕</button>
            <div style={{ textAlign: 'center', borderBottom: '2px dashed var(--gold)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'var(--maroon-deep)', margin: 0 }}>SRI KALAHASTHI TEMPLE</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--saffron)', fontWeight: 'bold' }}>Official E-Ticket / ఇ-టిక్కెట్</p>
            </div>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ["Ref No", selectedBooking.bookingRef],
                  ["Name", selectedBooking.name],
                  ["Date", new Date(selectedBooking.visitDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })],
                  ["Type", selectedBooking.darshanType],
                  ["Slot", selectedBooking.timeSlot || 'General'],
                  ["Persons", selectedBooking.adults],
                  ["Status", selectedBooking.status.toUpperCase()],
                  ["Amount", `₹${selectedBooking.totalAmount}`]
                ].map(([l, v], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 0', fontWeight: 'bold', fontSize: '0.9rem', color: '#666' }}>{l}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 'bold', color: 'var(--maroon-deep)' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button onClick={() => window.print()} style={{ background: 'var(--maroon-deep)', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '10px 30px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>🖨️ PRINT TICKET</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 20px' }}>
        {loading ? <p style={{ textAlign: 'center', color: 'var(--maroon-deep)' }}>Loading your holy journey...</p> : (
          bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
               <p style={{ fontSize: '1.5rem', color: 'var(--maroon)', marginBottom: '2rem' }}>No bookings yet. Book your darshan now! 🕉️</p>
               <button onClick={() => navigate('/booking')} style={{ padding: '15px 40px', background: 'var(--saffron)', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>BOOK NOW</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {bookings.map((b, i) => (
                <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '15px', borderTop: `6px solid ${b.status === 'confirmed' ? 'var(--gold)' : '#e74c3c'}`, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--maroon-deep)' }}>{b.bookingRef}</span>
                    <span style={{ padding: '3px 10px', borderRadius: '4px', background: b.status === 'confirmed' ? '#eafaf1' : '#fdedec', color: b.status === 'confirmed' ? '#2ecc71' : '#e74c3c', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{b.status}</span>
                  </div>
                  <h3 style={{ color: 'var(--text-dark)', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>{b.darshanType}</h3>
                  <div style={{ fontSize: '0.9rem', color: '#555', lineHeight: '2' }}>
                    <p>📅 Date: <strong>{new Date(b.visitDate).toDateString()}</strong></p>
                    <p>🕒 Slot: <strong>{b.timeSlot || 'General Darshan'}</strong></p>
                    <p>👥 Adults: <strong>{b.adults}</strong></p>
                    <p>💰 Total: <strong style={{ color: 'var(--maroon)', fontSize: '1.1rem' }}>₹{b.totalAmount}</strong></p>
                  </div>
                  
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setSelectedBooking(b)} 
                      style={{ flex: 2, padding: '10px', background: 'var(--maroon-deep)', color: 'var(--gold)', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      👁️ VIEW TICKET
                    </button>
                    {b.status === 'confirmed' && new Date(b.visitDate) > new Date() && (
                      <button 
                        onClick={() => handleCancel(b.bookingRef)} 
                        style={{ flex: 1, padding: '10px', border: '1px solid #e74c3c', color: '#e74c3c', background: 'transparent', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        CANCEL
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
