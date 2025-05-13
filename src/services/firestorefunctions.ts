import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseconfig';  // Your firestore initialization file

const saveUserData = async (userId: string, data: any) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, data);
        console.log('User data saved successfully!');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error saving user data:', error.message);  // Safe to access message
        } else {
            console.error('An unexpected error occurred:', error);  // Handle non-Error types
        }
    }
};
