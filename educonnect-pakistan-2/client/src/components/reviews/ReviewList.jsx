import { useEffect, useState } from 'react';
import { apiRequest } from '../../utils/request.js';
import { useAuth } from '../../context/AuthContext.jsx';

const ReviewList = ({ tutorId }) => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await apiRequest(`http://localhost:5000/api/reviews/${tutorId}`, 'GET', null, token);
        console.log('Fetched Reviews:', data);
        setReviews(data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err.message);
      }
    };
    fetchReviews();
  }, [tutorId, token]);

  return (
    <div className="review-list">
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((r) => (
            <li key={r._id}>
              ⭐ {r.rating} - {r.reviewText}<br />
              <small>By: {r.student?.name || 'Anonymous'}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
