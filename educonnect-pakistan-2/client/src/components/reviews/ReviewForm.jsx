import { useState } from 'react';
import { apiRequest } from '../../utils/request.js';
import { useAuth } from '../../context/AuthContext.jsx';

const ReviewForm = ({ tutorId, onReviewSubmitted }) => {
  const { token } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Submitting review:', { tutorId, rating, text });
    console.log('Token:', token);
    try {
        console.log(tutorId, rating, text);
        await apiRequest('http://localhost:5000/api/reviews', 'POST', {
            tutor: tutorId,
            rating: Number(rating),
            reviewText: text
          }, token);
      setText('');
      setRating(5);
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="review-form">
  <h3>Leave a Review</h3>
  <select value={rating} onChange={e => setRating(e.target.value)} required>
    {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
  </select>
  <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Your feedback..." required />
  {error && <p className="error-text">{error}</p>}
  <button type="submit">Submit Review</button>
</form>
  );
};

export default ReviewForm;
