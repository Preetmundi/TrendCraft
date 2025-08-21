# 🔥 Firebase Quick Setup - 10 Minutes

## 🚀 **Step 1: Create Firebase Project**

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Click "Create a project"**
3. **Name**: `trendcraft-app`
4. **Enable Google Analytics**: ✅ Yes
5. **Click "Create project"**

## ⚙️ **Step 2: Enable Services**

### Authentication:
1. **Go to Authentication** → **Sign-in method**
2. **Enable Email/Password** ✅
3. **Enable Google** (optional) ✅

### Firestore Database:
1. **Go to Firestore Database**
2. **Click "Create database"**
3. **Start in test mode** (we'll secure later)
4. **Choose location**: `us-central1`

### Storage:
1. **Go to Storage**
2. **Click "Get started"**
3. **Start in test mode**

## 🔑 **Step 3: Get Configuration**

1. **Click gear icon** → **Project settings**
2. **Scroll to "Your apps"**
3. **Click web icon** (</>)
4. **Register app**: `trendcraft-web`
5. **Copy the config object**

## 📝 **Step 4: Update Environment Variables**

**In Vercel Dashboard:**
1. Go to **Settings** → **Environment Variables**
2. **Remove Supabase variables**
3. **Add Firebase variables**:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## 🗄️ **Step 5: Create Collections**

**In Firestore Console:**
1. **Go to Firestore Database**
2. **Click "Start collection"**
3. **Create these collections**:

### profiles
```
Document ID: auto-generated
Fields:
- email: string
- username: string (optional)
- avatar_url: string (optional)
- created_at: timestamp
- updated_at: timestamp
```

### trending_data
```
Document ID: auto-generated
Fields:
- platform: string (tiktok, instagram, youtube)
- trend_type: string (sound, hashtag, effect)
- title: string
- usage_count: number
- growth_rate: number
- is_active: boolean
- created_at: timestamp
```

### projects
```
Document ID: auto-generated
Fields:
- user_id: string
- title: string
- description: string (optional)
- video_url: string (optional)
- status: string (draft, published)
- created_at: timestamp
- updated_at: timestamp
```

### video_assets
```
Document ID: auto-generated
Fields:
- user_id: string
- file_name: string
- file_url: string
- file_size: number
- duration: number (optional)
- created_at: timestamp
```

## 🔒 **Step 6: Security Rules**

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

## 🚀 **Step 7: Deploy**

1. **Push code to GitHub**
2. **Vercel will auto-deploy**
3. **Test the app**

## 🧪 **Step 8: Test**

1. **Visit your Vercel URL**
2. **Click 🔧 Debug button** (bottom-right)
3. **Run tests** to verify everything works

## 📊 **Sample Data**

**Add this trending data to Firestore:**

```javascript
// trending_data collection
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

## 🎉 **Done!**

Your app now uses **Firebase** instead of Supabase with:
- ✅ **Better free tier** (50K reads/day vs 500MB total)
- ✅ **Real-time updates**
- ✅ **Offline support**
- ✅ **Built-in analytics**
- ✅ **Google ecosystem integration**

## 💰 **Cost Comparison:**

| Feature | Supabase Free | Firebase Free |
|---------|---------------|---------------|
| **Database** | 500MB | 1GB |
| **Bandwidth** | 2GB/month | 10GB/month |
| **Reads** | Unlimited | 50K/day |
| **Writes** | Unlimited | 20K/day |
| **Authentication** | ✅ | ✅ |
| **Storage** | 1GB | 5GB |
| **Functions** | ❌ | 125K invocations |

**Firebase gives you 10x more for free!** 🚀
