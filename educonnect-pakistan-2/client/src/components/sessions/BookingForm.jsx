import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiRequest } from '../../utils/request.js';

const BookingForm = ({ tutor }) => {
  const { token, user } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState(tutor.preferences === 'online' ? 'online' : 'in-person');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleBook = async (e) => {
    e.preventDefault();
    setError('');
    try {
        await apiRequest('http://localhost:5000/api/sessions', 'POST', {
            tutorId: tutor._id,
            date,
            time,
            type
          }, token);
      setMessage('✅ Session booked successfully!');
      setDate('');
      setTime('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleBook} className="booking-form">
  <h3>Book a Session</h3>
  <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
  <input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 10AM" required />
  <select value={type} onChange={e => setType(e.target.value)}>
    <option value="online">Online</option>
    <option value="in-person">In-person</option>
  </select>
  <p>Rate: {tutor.hourlyRate} PKR</p>
  {error && <p className="error-text">{error}</p>}
  {message && <p style={{ color: 'green' }}>{message}</p>}
  <button type="submit">Book Now</button>
</form>
  );
};

export default BookingForm;
