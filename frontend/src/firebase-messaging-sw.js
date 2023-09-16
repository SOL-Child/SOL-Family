import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_API_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_API_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_API_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_API_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_API_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'denied') {
        return;
    }
}

requestPermission();

export async function getTokenVal() {
    const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_API_TOKEN,
    });

    return token;
}
