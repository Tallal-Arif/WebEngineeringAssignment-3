import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../utils/request.js';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    qualifications: '',
    subjects: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      };

      if (form.role === 'tutor') {
        payload.qualifications = form.qualifications;
        payload.subjects = form.subjects.split(',').map(s => s.trim());
      }

      await apiRequest('http://localhost:5000/api/auth/register', 'POST', payload);
      alert('✅ Account created! You can now log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
  
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
  
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>
  
        {form.role === 'tutor' && (
          <>
            <input name="qualifications" placeholder="Qualifications" value={form.qualifications} onChange={handleChange} />
            <input name="subjects" placeholder="Subjects (comma-separated)" value={form.subjects} onChange={handleChange} />
          </>
        )}
  
        {error && <p className="error-text">{error}</p>}
  
        <button type="submit">Sign Up</button>
  
        <p className="auth-switch">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
