# 🚀 Vercel Deployment Guide - Complete Setup

## 🎯 **Why Vercel Instead of Firebase Studio?**

✅ **Perfect for Vite + React** - Native support  
✅ **Automatic deployments** - Push to GitHub, auto-deploy  
✅ **Environment variables** - Easy configuration  
✅ **Custom domains** - Free SSL certificates  
✅ **Analytics** - Built-in performance monitoring  
✅ **Edge functions** - Serverless API support  

## 📋 **Prerequisites**

1. **GitHub account** (free)
2. **Vercel account** (free)
3. **Firebase project** (for backend)
4. **OpenRouter API key** (for AI features)

## 🚀 **Step 1: Push to GitHub**

### 1. **Initialize Git (if not already done)**
```bash
git init
git add .
git commit -m "Initial commit with Firebase migration"
```

### 2. **Create GitHub Repository**
1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. Name: `trendcraft-app`
4. Make it **Public** (for free Vercel)
5. Click **"Create repository"**

### 3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/trendcraft-app.git
git branch -M main
git push -u origin main
```

## 🔥 **Step 2: Create Firebase Project**

### 1. **Go to Firebase Console**
- Visit [console.firebase.google.com](https://console.firebase.google.com)
- Click **"Create a project"**
- Name: `trendcraft-app`
- Enable Google Analytics: ✅ Yes

### 2. **Enable Services**
- **Authentication** → Enable Email/Password
- **Firestore Database** → Create database (test mode)
- **Storage** → Get started (test mode)

### 3. **Get Configuration**
- Go to **Project Settings** (gear icon)
- Scroll to **"Your apps"**
- Click **Web icon** (</>)
- Register app: `trendcraft-web`
- Copy the config object

## ⚙️ **Step 3: Deploy to Vercel**

### 1. **Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Click **"Import"**

### 2. **Configure Project**
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave empty)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. **Add Environment Variables**
Click **"Environment Variables"** and add:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# OpenRouter AI Configuration
VITE_OPENROUTER_API_KEY=your_openrouter_api_key

# App Configuration
VITE_APP_NAME=TrendCraft
VITE_APP_URL=https://your-vercel-domain.vercel.app
```

### 4. **Deploy**
Click **"Deploy"** and wait 2-3 minutes.

## 🗄️ **Step 4: Setup Firebase Database**

### 1. **Create Collections**
In Firebase Console → Firestore Database:

**profiles collection:**
```javascript
{
  email: "user@example.com",
  username: "username",
  avatar_url: "https://...",
  created_at: serverTimestamp(),
  updated_at: serverTimestamp()
}
```

**trending_data collection:**
```javascript
{
  platform: "tiktok",
  trend_type: "sound",
  title: "Viral Dance Beat #1",
  usage_count: 2300000,
  growth_rate: 340,
  is_active: true,
  created_at: serverTimestamp()
}
```

**projects collection:**
```javascript
{
  user_id: "user_uid",
  title: "My Video Project",
  description: "Project description",
  video_url: "https://...",
  status: "draft",
  created_at: serverTimestamp(),
  updated_at: serverTimestamp()
}
```

**video_assets collection:**
```javascript
{
  user_id: "user_uid",
  file_name: "video.mp4",
  file_url: "https://...",
  file_size: 1024000,
  duration: 30,
  created_at: serverTimestamp()
}
```

### 2. **Add Sample Data**
Add these trending items to `trending_data`:

```javascript
// Item 1
{
  platform: "tiktok",
  trend_type: "sound",
  title: "Viral Dance Beat #1",
  usage_count: 2300000,
  growth_rate: 340,
  is_active: true,
  created_at: serverTimestamp()
}

// Item 2
{
  platform: "instagram",
  trend_type: "hashtag",
  title: "#MomentVibes",
  usage_count: 890000,
  growth_rate: 280,
  is_active: true,
  created_at: serverTimestamp()
}

// Item 3
{
  platform: "youtube",
  trend_type: "effect",
  title: "Sunset Gradient",
  usage_count: 1800000,
  growth_rate: 220,
  is_active: true,
  created_at: serverTimestamp()
}

// Item 4
{
  platform: "tiktok",
  trend_type: "sound",
  title: "Chill Lofi Remix",
  usage_count: 1100000,
  growth_rate: 195,
  is_active: true,
  created_at: serverTimestamp()
}
```

## 🔒 **Step 5: Security Rules**

### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /projects/{projectId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.user_id;
    }
    match /trending_data/{docId} {
      allow read: if true;
      allow write: if false;
    }
    match /video_assets/{assetId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.user_id;
    }
  }
}
```

### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🧪 **Step 6: Test Your App**

### 1. **Visit Your Vercel URL**
- Go to your deployed Vercel URL
- Should look like: `https://trendcraft-app.vercel.app`

### 2. **Use Debug Panel**
- Click the **🔧 button** (bottom-right corner)
- Click **"Run Tests"**
- Verify all tests pass:
  - ✅ Firebase Connection
  - ✅ Authentication
  - ✅ Trending Data
  - ✅ AI Service

### 3. **Test Features**
- **Sign Up**: Create a new account
- **Sign In**: Login with existing account
- **AI Content Generator**: Generate content with OpenRouter
- **Trending Section**: View real-time trending data

## 🔄 **Step 7: Continuous Deployment**

### Automatic Deployments:
- **Push to GitHub** → **Auto-deploy to Vercel**
- **Preview deployments** for pull requests
- **Production deployments** for main branch

### Environment Variables:
- **Production**: Live app
- **Preview**: Test deployments
- **Development**: Local development

## 📊 **Step 8: Monitoring**

### Vercel Analytics:
- **Performance**: Page load times
- **Usage**: Bandwidth and function calls
- **Errors**: Real-time error tracking

### Firebase Analytics:
- **User engagement**: Page views, events
- **User behavior**: Conversion funnels
- **Crash reporting**: Error tracking

## 🎉 **Success!**

Your TrendCraft app is now:
- ✅ **Deployed on Vercel** (perfect for Vite)
- ✅ **Backend on Firebase** (better free tier)
- ✅ **AI integration** (OpenRouter)
- ✅ **Real-time data** (Firestore)
- ✅ **Authentication** (Firebase Auth)
- ✅ **File storage** (Firebase Storage)

## 💰 **Cost Breakdown:**

| Service | Free Tier | Your Usage |
|---------|-----------|------------|
| **Vercel** | Unlimited | ✅ Free |
| **Firebase** | 50K reads/day | ✅ Free |
| **OpenRouter** | $5 credit | ✅ Free |
| **GitHub** | Unlimited | ✅ Free |

**Total Cost: $0/month** 🎉

## 🆘 **Troubleshooting**

### If Vercel deployment fails:
1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set
3. **Test locally** with `npm run build`

### If Firebase connection fails:
1. **Check Firebase config** in environment variables
2. **Verify Firestore rules** are set correctly
3. **Test with debug panel**

### If AI features don't work:
1. **Verify OpenRouter API key** is set
2. **Check API key permissions**
3. **Test with debug panel**

## 📞 **Next Steps:**

1. **Custom domain** (optional)
2. **SEO optimization**
3. **Performance monitoring**
4. **User analytics**
5. **Feature enhancements**

**Your app is now live and ready for users!** 🚀
