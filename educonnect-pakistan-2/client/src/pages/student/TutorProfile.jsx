import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../utils/request.js';
import { useAuth } from '../../context/AuthContext.jsx';
import ReviewList from '../../components/reviews/ReviewList.jsx';
import ReviewForm from '../../components/reviews/ReviewForm.jsx';
import BookingForm from '../../components/sessions/BookingForm.jsx';
import WishlistButton from '../../components/wishlist/WishlistButton.jsx';

const TutorProfile = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [tutor, setTutor] = useState(null);

  const fetchTutor = async () => {
    try {
      const data = await apiRequest(`http://localhost:5000/api/tutors/${id}`, 'GET', null, token);
      setTutor(data);
    } catch (err) {
      console.error('Failed to fetch tutor:', err.message);
    }
  };

  useEffect(() => {
    fetchTutor();
  }, [id]);

  if (!tutor) return <p>Loading tutor...</p>;
  console.log('Tutor:', tutor);

  return (
    <div className="tutor-profile-page">
      <h2>{tutor.name}</h2>
      <WishlistButton tutorId={tutor._id} />
      <p>Subjects: {tutor.subjects.join(', ')}</p>
      <p>Qualifications: {tutor.qualifications}</p>
      <p>Rate: {tutor.hourlyRate} PKR/hr</p>
      <p>Mode: {tutor.preferences}</p>

      <hr />
      <ReviewForm tutorId={tutor._id} onReviewSubmitted={fetchTutor} />
      <BookingForm tutor={tutor} />
    </div>
  );
};

export default TutorProfile;
