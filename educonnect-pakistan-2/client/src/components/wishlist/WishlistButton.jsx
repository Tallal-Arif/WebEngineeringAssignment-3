import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiRequest } from '../../utils/request.js';

const WishlistButton = ({ tutorId }) => {
  const { token } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);

  const checkWishlist = async () => {
    try {
      const wishlist = await apiRequest('http://localhost:5000/api/wishlist', 'GET', null, token);
      setInWishlist(wishlist.some(item => item.tutor._id === tutorId));
    } catch (err) {
      console.error('Error checking wishlist:', err.message);
    }
  };

  const toggleWishlist = async () => {
    try {
      if (inWishlist) {
        await apiRequest(`http://localhost:5000/api/wishlist/${tutorId}`, 'DELETE', null, token);
        setInWishlist(false);
      } else {
        await apiRequest(`http://localhost:5000/api/wishlist/${tutorId}`, 'POST', null, token);
        setInWishlist(true);
      }
    } catch (err) {
      console.error('Error updating wishlist:', err.message);
    }
  };

  useEffect(() => {
    checkWishlist();
  }, [tutorId]);

  return (
    <button onClick={toggleWishlist}>
      {inWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
    </button>
  );
};

export default WishlistButton;
