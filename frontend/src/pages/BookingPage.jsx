import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const BookingPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    visitDate: '',
    darshanType: 'Special Darshan',
    timeSlot: '',
    adults: 1,
    children: 0,
    idType: 'Aadhar Card',
    idNumber: ''
  });

  const priceMap = {
    'Free Darshan': 0,
    'Special Darshan': 100,
    'VIP Darshan': 300,
    'Athi Vishishta': 500,
    'Rahu Ketu Pooja': 1116,
    'Archana': 10
  };
  const total = priceMap[formData.darshanType] * formData.adults;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.visitDate || !formData.timeSlot) {
      return alert('Please select both Date and Time Slot');
    }
    setLoading(true);

    try {
      // 1. Create order on backend
      const { data: orderData } = await API.post('/bookings/payment/order', { amount: total });

      if (!orderData.success) throw new Error('Order creation failed');

      const options = {
        key: 'rzp_test_Sdkd6EVya36q0U',
        amount: orderData.order.amount,
        currency: "INR",
        name: "Sri Kalahasthi Temple",
        description: `Booking for ${formData.darshanType} (DEMO)`,
        order_id: orderData.order.id,
        handler: async (response) => {
          try {
            // 2. Verify payment on backend
            const { data: verifyData } = await API.post('/bookings/payment/verify', {
              ...response,
              bookingData: formData
            });
            if (verifyData.success) {
              setSuccess(verifyData.booking);
            }
          } catch (err) {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'UPI / QR Scanner',
                instruments: [{ method: 'upi', protocols: ['vpa', 'qr'] }]
              }
            },
            sequence: ['block.upi'],
            preferences: { show_default_blocks: true }
          }
        },
        theme: { color: "#7A0B2E" },
        modal: {
          ondismiss: () => setLoading(false),
          confirm_close: true
        },
        retry: { enabled: true, enabled_at: 'now' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing payment');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--maroon-deep)', padding: '5rem 10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', textAlign: 'center', maxWidth: '600px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '2px solid var(--gold)' }}>
          <div style={{ fontSize: '5rem', color: '#2ecc71', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ color: 'var(--maroon-deep)', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
          <p className="telugu-font" style={{ color: 'var(--saffron)', fontSize: '1.5rem', marginBottom: '2rem' }}>దర్శనం నిర్ధారించబడింది</p>

          <table style={{ width: '100%', textAlign: 'left', marginBottom: '2rem', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ["Ref No", success.bookingRef],
                ["Name", success.name],
                ["Date", new Date(success.visitDate).toDateString()],
                ["Type", success.darshanType],
                ["Adults", success.adults],
                ["Total", `₹${success.totalAmount}`]
              ].map(([l, v], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '10px', fontWeight: 'bold' }}>{l}</td><td style={{ padding: '10px' }}>{v}</td></tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', background: 'var(--maroon-deep)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🖨 Print Ticket</button>
            <button onClick={() => navigate('/')} style={{ flex: 1, padding: '12px', background: 'var(--gold)', color: 'var(--maroon-deep)', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>🏠 Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--maroon-deep)', paddingBottom: '5rem' }}>
      <header style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--gold)' }}>
        <h1 style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>Book Darshan / దర్శన టిక్కెట్</h1>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer' }}>← BACK</button>
      </header>

      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 20px' }}>
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', border: '2px solid var(--gold)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
            <div className="form-group">
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold' }}>Full Name *</label>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '5px' }} required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold' }}>Mobile Number *</label>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '5px' }} required value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
            </div>
            <div className="form-group">
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold' }}>Email Address</label>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '5px' }} type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold' }}>Darshan / Pooja Type / దర్శన రకం *</label>
              <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '5px' }} value={formData.darshanType} onChange={e => setFormData({ ...formData, darshanType: e.target.value, timeSlot: '' })}>
                {Object.keys(priceMap).map(k => <option key={k} value={k}>{k} (₹{priceMap[k]})</option>)}
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>1. Select Date / తేదీని ఎంచుకోండి *</label>
              <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                {Array.from({ length: 7 }).map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const dateString = date.toISOString().split('T')[0];
                  const isSelected = formData.visitDate === dateString;
                  return (
                    <div
                      key={i}
                      onClick={() => setFormData({ ...formData, visitDate: dateString })}
                      style={{
                        minWidth: '85px',
                        padding: '15px 10px',
                        textAlign: 'center',
                        borderRadius: '12px',
                        border: `2px solid ${isSelected ? 'var(--gold)' : '#eee'}`,
                        background: isSelected ? 'var(--maroon-deep)' : 'white',
                        color: isSelected ? 'var(--gold)' : 'var(--text-dark)',
                        cursor: 'pointer',
                        transition: '0.3s',
                        boxShadow: isSelected ? '0 5px 15px rgba(122,11,46,0.2)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '5px', opacity: isSelected ? 1 : 0.6 }}>{date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: '900' }}>{date.getDate()}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>2. Select Time Slot / సమయం *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {(formData.darshanType === 'Rahu Ketu Pooja'
                  ? ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '04:00 PM - 05:00 PM']
                  : ['Morning (06:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 04:00 PM)', 'Evening (04:00 PM - 08:00 PM)']
                ).map((slot) => {
                  const isSelected = formData.timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      style={{
                        padding: '12px 25px',
                        borderRadius: '50px',
                        border: `2px solid ${isSelected ? 'var(--gold)' : '#ddd'}`,
                        background: isSelected ? 'var(--gold)' : 'white',
                        color: isSelected ? 'var(--maroon-deep)' : '#555',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: '0.2s transform active',
                        fontSize: '0.9rem',
                        boxShadow: isSelected ? '0 4px 10px rgba(201,146,10,0.3)' : 'none'
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {!formData.timeSlot && <p style={{ color: 'var(--saffron)', fontSize: '0.8rem', marginTop: '10px' }}>* Please pick a slot to continue / దయచేసి సమయాన్ని ఎంచుకోండి</p>}
            </div>

            <div className="form-group">
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold' }}>Adults / పెద్దలు *</label>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '5px' }} type="number" min="1" max="10" required value={formData.adults} onChange={e => setFormData({ ...formData, adults: e.target.value })} />
            </div>
            <div className="form-group">
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold' }}>ID Type *</label>
              <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '5px' }} value={formData.idType} onChange={e => setFormData({ ...formData, idType: e.target.value })}>
                <option>Aadhar Card</option><option>Voter ID</option><option>Passport</option><option>PAN Card</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ color: 'var(--maroon)', fontWeight: 'bold' }}>ID Number *</label>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '5px' }} required value={formData.idNumber} onChange={e => setFormData({ ...formData, idNumber: e.target.value })} />
            </div>
          </div>

          <div style={{ background: 'var(--cream)', padding: '1.5rem', borderRadius: '10px', border: '1px dashed var(--saffron)', marginBottom: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--maroon-deep)', fontSize: '1.1rem', fontWeight: 'bold' }}>
              {formData.darshanType} × {formData.adults} persons = <span style={{ color: 'var(--saffron)', fontSize: '1.5rem' }} className="nav-font">₹{total}</span>
            </p>
            <div style={{ marginTop: '10px', color: '#777', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              ⚠️ DEMO MODE: Test Payment Only ⚠️
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '18px', background: 'var(--saffron)', color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '1.2rem', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', animation: 'glowPulse 2s infinite', opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'CONFIRMING...' : '🎟 CONFIRM BOOKING'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
