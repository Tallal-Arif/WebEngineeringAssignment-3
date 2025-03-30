import { useEffect, useState } from 'react';
import { apiRequest } from '../../utils/request.js';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [report, setReport] = useState(null);

  const fetchRequests = async () => {
    try {
      const data = await apiRequest('http://localhost:5000/api/admin/verifications', 'GET', null, token);
      setRequests(data);
    } catch (err) {
      console.error('Failed to fetch verification requests:', err.message);
    }
  };

  const fetchReport = async () => {
    try {
      const data = await apiRequest('http://localhost:5000/api/admin/report', 'GET', null, token);
      setReport(data);
    } catch (err) {
      console.error('Failed to fetch report:', err.message);
    }
  };

  const handleUpdate = async (id, status) => {
    const comment = prompt('Optional comment:') || '';
    try {
      await apiRequest(`http://localhost:5000/api/admin/verifications/${id}`, 'PUT', { status, comment }, token);
      fetchRequests();
    } catch (err) {
      console.error('Failed to update request:', err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchReport();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {report && (
        <div className="admin-report">
          <h3>📊 Platform Stats</h3>
          <ul>
            <li>Total Tutors: {report.totalTutors}</li>
            <li>Verified Tutors: {report.verifiedTutors}</li>
            <li>Total Students: {report.totalStudents}</li>
            <li>Total Sessions: {report.totalSessions}</li>
            <li>Completed Sessions: {report.completedSessions}</li>
            <li>Total Earnings: {report.totalEarnings} PKR</li>
          </ul>
        </div>
      )}

      <hr />

      <h3>🧾 Verification Requests</h3>
      <ul className="verification-list">
        {requests.map(req => (
          <li key={req._id}>
            <strong>{req.tutor.name}</strong> ({req.tutor.email})<br />
            Status: {req.status} <br />
            Qualifications: {req.tutor.qualifications}<br />
            {req.status === 'pending' && (
              <>
                <button onClick={() => handleUpdate(req._id, 'approved')}>Approve</button>
                <button onClick={() => handleUpdate(req._id, 'rejected')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
