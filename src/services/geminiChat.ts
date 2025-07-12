import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyA7KDuviFhzc2-J4X7OwQtLI_igYMIeRAc';

export async function sendMessageToGemini(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          //maxOutputTokens: 500,
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('Gemini response:', response.data);
    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response'
    );
  } catch (error: any) {
    console.error('Gemini API error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      response: error.response?.data,
    });
    return 'No response';
  }
}

