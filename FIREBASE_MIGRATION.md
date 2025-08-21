# 🔥 Firebase Migration Guide - Free Backend Alternative

## 🎯 **Why Firebase?**

✅ **Generous Free Tier:**
- 50,000 reads/day
- 20,000 writes/day  
- 1GB storage
- 10GB/month bandwidth
- Authentication included

✅ **Perfect for TrendCraft:**
- Real-time database
- Authentication system
- File storage
- Cloud functions
- Analytics

## 🚀 **Migration Steps:**

### 1. **Create Firebase Project**

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Click "Create a project"**
3. **Name it**: `trendcraft-app`
4. **Enable Google Analytics**: Yes
5. **Click "Create project"**

### 2. **Enable Services**

**In Firebase Console:**

1. **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable Email/Password
   - Enable Google (optional)

2. **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in test mode (we'll secure it later)

3. **Storage**:
   - Go to Storage
   - Click "Get started"
   - Start in test mode

### 3. **Get Configuration**

**In Project Settings:**
1. Click the gear icon → Project settings
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register app: `trendcraft-web`
5. Copy the config object

### 4. **Install Firebase SDK**

```bash
npm install firebase
```

### 5. **Update Environment Variables**

Replace Supabase variables with Firebase:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Keep OpenRouter
VITE_OPENROUTER_API_KEY=your_openrouter_api_key

# App Configuration
VITE_APP_NAME=TrendCraft
VITE_APP_URL=https://your-vercel-domain.vercel.app
```

## 🔧 **Code Migration:**

### 1. **Firebase Client Setup**

Create `src/integrations/firebase/client.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 2. **Database Schema Migration**

**Firestore Collections:**

```typescript
// profiles collection
interface Profile {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// projects collection
interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  video_url?: string;
  status: 'draft' | 'published';
  created_at: Timestamp;
  updated_at: Timestamp;
}

// trending_data collection
interface TrendingData {
  id: string;
  platform: 'tiktok' | 'instagram' | 'youtube';
  trend_type: 'sound' | 'hashtag' | 'effect';
  title: string;
  usage_count: number;
  growth_rate: number;
  is_active: boolean;
  created_at: Timestamp;
}

// video_assets collection
interface VideoAsset {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  duration?: number;
  created_at: Timestamp;
}
```

### 3. **Authentication Migration**

Replace Supabase auth with Firebase auth:

```typescript
// src/components/AuthProvider.tsx
import { auth } from '@/integrations/firebase/client';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

// Update AuthProvider to use Firebase
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  const signUp = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  // ... rest of provider
};
```

### 4. **API Service Migration**

Create `src/services/firebase-api.ts`:

```typescript
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';

export const firebaseApi = {
  // Profiles
  async getProfile(userId: string) {
    const docRef = doc(db, 'profiles', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  async createProfile(profile: any) {
    return await addDoc(collection(db, 'profiles'), profile);
  },

  // Trending Data
  async getTrendingData(platform?: string) {
    let q = collection(db, 'trending_data');
    
    if (platform) {
      q = query(q, where('platform', '==', platform));
    }
    
    q = query(q, where('is_active', '==', true), orderBy('growth_rate', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Projects
  async getUserProjects(userId: string) {
    const q = query(
      collection(db, 'projects'),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createProject(project: any) {
    return await addDoc(collection(db, 'projects'), project);
  },

  // Video Assets
  async uploadVideoAsset(asset: any) {
    return await addDoc(collection(db, 'video_assets'), asset);
  }
};
```

## 📊 **Data Migration:**

### 1. **Export Supabase Data**

```sql
-- Export from Supabase
SELECT * FROM profiles;
SELECT * FROM projects;
SELECT * FROM trending_data;
SELECT * FROM video_assets;
```

### 2. **Import to Firebase**

Use Firebase Admin SDK or manual import:

```typescript
// Migration script
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('./serviceAccountKey.json');
initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

// Import data
async function migrateData() {
  // Import profiles
  for (const profile of supabaseProfiles) {
    await db.collection('profiles').doc(profile.id).set(profile);
  }
  
  // Import other collections...
}
```

## 🔒 **Security Rules:**

### Firestore Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Profiles - users can read/write their own
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Projects - users can read/write their own
    match /projects/{projectId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // Trending data - public read
    match /trending_data/{docId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Video assets - users can read/write their own
    match /video_assets/{assetId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
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
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
  }
}
```

## 🚀 **Deployment Update:**

### Update Vercel Environment Variables:

```bash
# Remove Supabase variables
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY

# Add Firebase variables
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Keep OpenRouter
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

## 💰 **Cost Comparison:**

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Supabase** | 500MB DB, 2GB bandwidth | $25/month |
| **Firebase** | 1GB DB, 10GB bandwidth | $25/month |
| **PlanetScale** | 1 DB, 1B reads/month | $29/month |
| **Neon** | 0.5GB storage | $19/month |

## 🎉 **Benefits of Firebase:**

✅ **Better Free Tier** - More generous limits  
✅ **Google Ecosystem** - Integrates with other Google services  
✅ **Real-time Updates** - Built-in real-time listeners  
✅ **Offline Support** - Works without internet  
✅ **Analytics** - Built-in user analytics  
✅ **Crashlytics** - Error tracking included  

## 📞 **Next Steps:**

1. **Create Firebase project**
2. **Update environment variables**
3. **Migrate authentication code**
4. **Update API services**
5. **Deploy and test**

**Firebase will give you a much better free tier and more features than Supabase!** 🚀
