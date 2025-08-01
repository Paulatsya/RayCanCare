import axios from 'axios';
import { GEMINI_API_KEY } from '@env';

export async function sendMessageToGemini(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

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
