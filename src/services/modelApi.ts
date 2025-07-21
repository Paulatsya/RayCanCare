import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your IP

export const getTreatmentPrediction = async (userData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, userData);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};