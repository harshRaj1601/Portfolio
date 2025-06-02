const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return { success: true, message: 'Request successful' };
};

export const trackVisit = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/track-visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}) // Send empty object to avoid body parsing issues
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error tracking visit:', error);
    return { success: false, message: 'Failed to track visit' };
  }
};

export const trackResumeDownload = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/track-resume-download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}) // Send empty object to avoid body parsing issues
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error tracking resume download:', error);
    return { success: false, message: 'Failed to track resume download' };
  }
};

export const sendContactMessage = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, message: 'Failed to send message' };
  }
};
