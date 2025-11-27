import { useState } from 'react';
import { registerParticipant } from '../services/api';
import './RegistrationForm.css';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event_choice: ''
  });
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const events = [
    'Tech Conference 2024',
    'Web Development Workshop',
    'AI & Machine Learning Summit',
    'Cybersecurity Bootcamp',
    'Cloud Computing Meetup'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors([]);
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      await registerParticipant(formData);
      setSuccessMessage('Registration successful!');
      setFormData({ name: '', email: '', event_choice: '' });
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors.map(err => err.msg));
      } else {
        setErrors(['An error occurred. Please try again.']);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error">{error}</p>
            ))}
          </div>
        )}
        
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="event_choice">Select Event</label>
          <select
            id="event_choice"
            name="event_choice"
            value={formData.event_choice}
            onChange={handleChange}
            required
          >
            <option value="">-- Select an Event --</option>
            {events.map((event, index) => (
              <option key={index} value={event}>{event}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
