const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const registerParticipant = async (registrationData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw data;
  }
  
  return data;
};

export const getRegistrations = async () => {
  const response = await fetch(`${API_BASE_URL}/registrations`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch registrations');
  }
  
  return response.json();
};
