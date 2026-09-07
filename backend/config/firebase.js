const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const path = require('path');

// Try to load service account from file first
let serviceAccount = null;

try {
  // Try to load from file (in the config directory)
  const serviceAccountPath = path.join(__dirname, 'service-account-key.json');
  serviceAccount = require(serviceAccountPath);
  console.log('✅ Firebase service account loaded from file (firebase.js)');
} catch (error) {
  console.warn('⚠️ Service account file not found in firebase.js:', error.message);
  
  // If file not found, try environment variable
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      console.log('✅ Firebase service account loaded from environment (firebase.js)');
    } catch (parseError) {
      console.error('❌ Error parsing FIREBASE_SERVICE_ACCOUNT:', parseError);
    }
  }
}

// Initialize Firebase
let firebaseApp = null;
let firebaseAuth = null;

if (serviceAccount) {
  try {
    firebaseApp = initializeApp({
      credential: cert(serviceAccount),
    });
    firebaseAuth = getAuth(firebaseApp);
    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
  }
} else {
  console.warn('⚠️ Firebase Admin not configured. Google Sign-In will not work.');
}

module.exports = {
  firebaseApp,
  firebaseAuth,
};