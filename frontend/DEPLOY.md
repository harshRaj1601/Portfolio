# Harsh Jaiswal Portfolio Website

A modern, responsive portfolio website built with React and Flask.

## Quick Deploy

### Frontend (Vercel)

```bash
vercel
```

### Backend (Railway)

```bash
cd backend
railway up
```

## Detailed Deployment Instructions

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   - VITE_API_URL: Your backend URL (after deploying to Railway)

### Backend (Railway)

1. Go to [Railway](https://railway.app)
2. Create new project
3. Add your GitHub repository
4. Add environment variables:
   ```
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SENDER_EMAIL=harshrajjaiswal16012003@gmail.com
   APP_PASSWORD=your-gmail-app-password
   RECIPIENT_EMAIL=harshrajjaiswal16012003@gmail.com
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
   ```
5. Deploy

## Features

- Modern, responsive design
- Visitor tracking
- Contact form with email notifications
- Resume download tracking
- Interactive animations

## Local Development

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Environment Files

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
FLASK_APP=app.py
FLASK_ENV=development
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=harshrajjaiswal16012003@gmail.com
APP_PASSWORD=your-gmail-app-password
RECIPIENT_EMAIL=harshrajjaiswal16012003@gmail.com
ALLOWED_ORIGINS=http://localhost:5173
```
