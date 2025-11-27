import { useState, useEffect } from 'react';
import { getRegistrations } from '../services/api';
import './ParticipantsList.css';

const ParticipantsList = ({ refreshTrigger }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const data = await getRegistrations();
      setParticipants(data);
      setError('');
    } catch {
      setError('Failed to load participants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="participants-container">
        <h2>Registered Participants</h2>
        <p className="loading">Loading participants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="participants-container">
        <h2>Registered Participants</h2>
        <p className="error">{error}</p>
        <button onClick={fetchParticipants} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="participants-container">
      <h2>Registered Participants ({participants.length})</h2>
      {participants.length === 0 ? (
        <p className="no-participants">No participants registered yet.</p>
      ) : (
        <div className="table-container">
          <table className="participants-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={participant.id}>
                  <td>{index + 1}</td>
                  <td>{participant.name}</td>
                  <td>{participant.email}</td>
                  <td>{participant.event_choice}</td>
                  <td>{new Date(participant.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ParticipantsList;
