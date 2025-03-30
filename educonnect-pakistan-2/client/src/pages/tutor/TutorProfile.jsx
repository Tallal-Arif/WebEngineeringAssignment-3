import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiRequest } from '../../utils/request.js';

const TutorProfile = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    qualifications: '',
    subjects: '',
    hourlyRate: '',
    preferences: 'online'
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiRequest('http://localhost:5000/api/tutors/me', 'GET', null, token);
        setFormData({
          name: res.name,
          qualifications: res.qualifications,
          subjects: res.subjects.join(', '),
          hourlyRate: res.hourlyRate,
          preferences: res.preferences
        });
        setStatus(res.isVerified ? '✅ Verified' : '❌ Not Verified');
      } catch (err) {
        console.error('Failed to load tutor profile:', err.message);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const updated = {
        ...formData,
        subjects: formData.subjects.split(',').map(s => s.trim())
      };
      await apiRequest('http://localhost:5000/api/tutors/me', 'PUT', updated, token);
      alert('✅ Profile updated');
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <p>Status: {status}</p>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="Qualifications" />
        <input name="subjects" value={formData.subjects} onChange={handleChange} placeholder="Subjects (comma-separated)" />
        <input name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} type="number" placeholder="Hourly Rate" />
        <select name="preferences" value={formData.preferences} onChange={handleChange}>
          <option value="online">Online</option>
          <option value="in-person">In-Person</option>
          <option value="both">Both</option>
        </select>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default TutorProfile;
