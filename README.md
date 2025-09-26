# Portfolio Website

A modern, responsive portfolio website built with React, Firebase, and Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
git clone <your-repository-url>
cd portfolio/react-frontend
npm install
```

### 2. Setup Configuration Files

```bash
# Create environment file from template
cp .env.example .env

# Download service account key from Firebase Console
# Place it as: serviceAccountKey.json
```

### 3. Configure Environment Variables

Edit `.env` file with your credentials:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 4. Run the Project

```bash
# Seed dummy data first
npm run seeder

# Start development server
npm start
```

## 📋 Required Setup

### Firebase Setup
1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Get web app configuration
4. Generate service account key

### EmailJS Setup
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Add email service
3. Create email template
4. Get public key

### Configuration Files
- `.env` - Environment variables (copy from `.env.example`)
- `serviceAccountKey.json` - Firebase admin SDK key

---

**Happy coding! 🎉**
