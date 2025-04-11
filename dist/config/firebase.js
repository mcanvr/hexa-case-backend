"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
dotenv_1.default.config();
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
    console.error('ERROR: Firebase configuration environment variables are missing!');
    console.error('Please ensure FIREBASE_APP_* variables are set in your .env file.');
    process.exit(1);
}
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
