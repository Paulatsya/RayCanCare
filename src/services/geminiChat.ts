import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyA7KDuviFhzc2-J4X7OwQtLI_igYMIeRAc';

export async function sendMessageToGemini(message: string): Promise<string> {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`
,
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    console.log('Gemini API response:', response.data);
    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      response.data?.candidates?.[0]?.content?.text ||
      'No response'
    );
  } catch (err: any) {
    console.log('Gemini API error:', err?.response?.data || err.message || err);
    return 'No response';
  }
}