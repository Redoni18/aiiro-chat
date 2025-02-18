const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const askQuestion = async (question: string) => {
  const response = await fetch(`${API_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response');
  }

  return response.json();
};