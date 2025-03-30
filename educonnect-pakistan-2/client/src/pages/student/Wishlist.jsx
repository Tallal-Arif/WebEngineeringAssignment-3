import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiRequest } from '../../utils/request.js';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const data = await apiRequest('http://localhost:5000/api/wishlist', 'GET', null, token);
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>

      {items.length === 0 ? (
        <p>You have no tutors in your wishlist.</p>
      ) : (
        <table className="wishlist-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subjects</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
          {items.map(item => (
  <tr key={item.tutor._id}>
    <td>{item.tutor.name}</td>
    <td>{item.tutor.subjects.join(', ')}</td>
    <td>
      <Link to={`/student/tutors/${item.tutor._id}`}>View</Link>
    </td>
  </tr>
))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Wishlist;
