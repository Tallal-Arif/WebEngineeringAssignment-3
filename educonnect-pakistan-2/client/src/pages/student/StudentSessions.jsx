import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiRequest } from '../../utils/request.js';

const StudentSessions = () => {
    const { user, token } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await apiRequest('http://localhost:5000/api/sessions/student', 'GET', null, token);
        setSessions(data);
      } catch (err) {
        console.error('Failed to fetch student sessions:', err.message);
      }
    };

    fetchSessions();
  }, [token]);

  return (
    <div className="sessions-page">
      <h2>My Sessions</h2>
      <ul className="session-list">
        {sessions.map((session) => (
          <li key={session._id}>
            With {user.role === 'student' ? `Tutor: ${session.tutor.name}` : `Student: ${session.student.name}`}<br />
            Date: {new Date(session.date).toLocaleDateString()} at {session.time}<br />
            Type: {session.type} | Status: {session.status}
            {user.role === 'tutor' && session.status !== 'completed' && (
              <button onClick={() => handleMarkCompleted(session._id)}>Mark Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default StudentSessions;
