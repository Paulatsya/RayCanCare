import { auth } from './firebaseconfig';  // Import the Firebase auth object
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Signup function
export const signUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up successfully!');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error signing up:', error.message);  // Safe to access message
        } else {
            console.error('An unexpected error occurred:', error);  // Handle non-Error types
        }
    }
};

// Signin function
export const signIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error signing in:', error.message);  // Safe to access message
        } else {
            console.error('An unexpected error occurred:', error);  // Handle non-Error types
        }
    }
};
