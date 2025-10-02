const fs = require('fs');
const path = require('path');

// Required environment variables
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID',
  'REACT_APP_EMAILJS_SERVICE_ID',
  'REACT_APP_EMAILJS_TEMPLATE_ID',
  'REACT_APP_EMAILJS_PUBLIC_KEY'
];

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.warn('⚠️  .env file not found!');
  console.log('📝 Some features may not work without proper configuration.');
  console.log('📝 You can create a .env file based on .env.example for full functionality.');
} else {
  // Load environment variables only if .env exists
  require('dotenv').config({ path: envPath });
}

// Check required environment variables (only if .env exists)
if (fs.existsSync(envPath)) {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('⚠️  Some environment variables are missing:');
    missingVars.forEach(varName => console.warn(`  - ${varName}`));
    console.log('📝 Some features may not work properly.');
  }
}

// Check if serviceAccountKey.json exists (for seeding)
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.warn('⚠️  serviceAccountKey.json not found!');
  console.log('📝 You won\'t be able to run the seeder script without this file.');
  console.log('📝 Download it from Firebase Console → Project Settings → Service Accounts');
}

console.log('✅ Configuration validation completed!');
console.log('🚀 You can now run the application.');