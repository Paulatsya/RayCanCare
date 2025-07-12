import { doc, setDoc , getDoc} from 'firebase/firestore';
import { db } from './firebaseconfig';  // Your firestore initialization file
import { getAuth } from 'firebase/auth';

export const saveUserData = async (userId: string, data: any) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, data, { merge: true });
        console.log('User data saved successfully!');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error saving user data:', error.message);  // Safe to access message
        } else {
            console.error('An unexpected error occurred:', error);  // Handle non-Error types
        }
    }
};

export const getPatientData = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // Example: { name, age, gender, condition }
  } else {
    throw new Error("No patient data found");
  }
};

