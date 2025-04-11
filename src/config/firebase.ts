import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APP_API_KEY,
  authDomain: process.env.FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_APP_ID,
  measurementId: process.env.FIREBASE_APP_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error(
    'ERROR: Firebase configuration environment variables are missing!',
  );
  console.error(
    'Please ensure FIREBASE_APP_* variables are set in your .env file.',
  );
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
