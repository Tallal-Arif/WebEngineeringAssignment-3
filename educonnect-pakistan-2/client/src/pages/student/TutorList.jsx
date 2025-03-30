import { useEffect, useState } from 'react';
import { apiRequest } from '../../utils/request.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const TutorList = () => {
  const { token } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [filters, setFilters] = useState({
    subject: '',
    location: '',
    minRating: '',
    minPrice: '',
    maxPrice: '',
    availability: ''
  });

  const fetchTutors = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const data = await apiRequest(`http://localhost:5000/api/tutors?${query}`, 'GET', null, token);
      setTutors(data);
    } catch (err) {
      console.error('Failed to fetch tutors:', err.message);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => fetchTutors();

  return (
    <div className="tutor-list-page">
  <h2>Find a Tutor</h2>
  <div className="filter-bar">
        <input name="subject" placeholder="Subject" onChange={handleChange} />
        <select name="location" onChange={handleChange}>
          <option value="">All</option>
          <option value="online">Online</option>
          <option value="in-person">In-person</option>
          <option value="both">Both</option>
        </select>
        <input name="minRating" placeholder="Min Rating" type="number" onChange={handleChange} />
        <input name="minPrice" placeholder="Min Price" type="number" onChange={handleChange} />
        <input name="maxPrice" placeholder="Max Price" type="number" onChange={handleChange} />
        <input name="availability" placeholder="Day (e.g. Monday)" onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table className="tutor-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Subjects</th>
      <th>Rate (PKR/hr)</th>
      <th>Mode</th>
      <th>Qualifications</th>
      <th>Profile</th>
    </tr>
  </thead>
  <tbody>
    {tutors.map((tutor) => (
      <tr key={tutor._id}>
        <td>{tutor.name}</td>
        <td>{tutor.subjects.join(', ')}</td>
        <td>{tutor.hourlyRate}</td>
        <td>{tutor.preferences}</td>
        <td>{tutor.qualifications}</td>
        <td>
          <Link to={`/student/tutors/${tutor._id}`}>View</Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default TutorList;
