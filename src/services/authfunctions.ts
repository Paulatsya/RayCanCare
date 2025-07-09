import { auth } from './firebaseconfig';  // Import the Firebase auth object
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Signup function
export const signUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up successfully!'); // Success log
    } catch (error: any) {
        console.log('SIGNUP ERROR:', error);
        console.log('SIGNUP ERROR CODE:', error.code);
        console.log('SIGNUP ERROR MESSAGE:', error.message);
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('A user with this email already exists.');
        } else if (error instanceof Error) {
            console.error('Error signing up:', error.message);
            throw error;
        } else {
            console.error('An unexpected error occurred:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};

// Signin function
export const signIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!'); // Success log
        return true;
    } catch (error: any) {
        if (error instanceof Error) {
            console.error('Error signing in:', error.message);
            throw error;
        } else {
            console.error('An unexpected error occurred:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};
