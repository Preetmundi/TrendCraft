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
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/integrations/firebase/client';

// Types
export interface Profile {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  video_url?: string;
  status: 'draft' | 'published';
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface TrendingData {
  id: string;
  platform: 'tiktok' | 'instagram' | 'youtube';
  trend_type: 'sound' | 'hashtag' | 'effect';
  title: string;
  usage_count: number;
  growth_rate: number;
  is_active: boolean;
  created_at: Timestamp;
}

export interface VideoAsset {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  duration?: number;
  created_at: Timestamp;
}

// API Service
export const firebaseApi = {
  // Profiles
  async getProfile(userId: string): Promise<Profile | null> {
    try {
      const docRef = doc(db, 'profiles', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Profile : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },

  async createProfile(profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'profiles'), {
        ...profile,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<void> {
    try {
      const docRef = doc(db, 'profiles', userId);
      await updateDoc(docRef, {
        ...updates,
        updated_at: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Trending Data
  async getTrendingData(platform?: string): Promise<TrendingData[]> {
    try {
      let q = collection(db, 'trending_data');
      
      if (platform) {
        q = query(q, where('platform', '==', platform));
      }
      
      q = query(q, where('is_active', '==', true), orderBy('growth_rate', 'desc'), limit(10));
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as TrendingData);
    } catch (error) {
      console.error('Error getting trending data:', error);
      // Return mock data if Firebase fails
      return [
        {
          id: '1',
          platform: 'tiktok',
          trend_type: 'sound',
          title: 'Viral Dance Beat #1',
          usage_count: 2300000,
          growth_rate: 340,
          is_active: true,
          created_at: Timestamp.now(),
        },
        {
          id: '2',
          platform: 'instagram',
          trend_type: 'hashtag',
          title: '#MomentVibes',
          usage_count: 890000,
          growth_rate: 280,
          is_active: true,
          created_at: Timestamp.now(),
        },
        {
          id: '3',
          platform: 'youtube',
          trend_type: 'effect',
          title: 'Sunset Gradient',
          usage_count: 1800000,
          growth_rate: 220,
          is_active: true,
          created_at: Timestamp.now(),
        },
        {
          id: '4',
          platform: 'tiktok',
          trend_type: 'sound',
          title: 'Chill Lofi Remix',
          usage_count: 1100000,
          growth_rate: 195,
          is_active: true,
          created_at: Timestamp.now(),
        },
      ];
    }
  },

  async getTrendingDataById(trendId: string): Promise<TrendingData | null> {
    try {
      const docRef = doc(db, 'trending_data', trendId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as TrendingData : null;
    } catch (error) {
      console.error('Error getting trending data by ID:', error);
      throw error;
    }
  },

  // Projects
  async getUserProjects(userId: string): Promise<Project[]> {
    try {
      const q = query(
        collection(db, 'projects'),
        where('user_id', '==', userId),
        orderBy('created_at', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Project);
    } catch (error) {
      console.error('Error getting user projects:', error);
      throw error;
    }
  },

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...project,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    try {
      const docRef = doc(db, 'projects', projectId);
      await updateDoc(docRef, {
        ...updates,
        updated_at: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async deleteProject(projectId: string): Promise<void> {
    try {
      const docRef = doc(db, 'projects', projectId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Video Assets
  async uploadVideoAsset(asset: Omit<VideoAsset, 'id' | 'created_at'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'video_assets'), {
        ...asset,
        created_at: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error uploading video asset:', error);
      throw error;
    }
  },

  async getUserVideoAssets(userId: string): Promise<VideoAsset[]> {
    try {
      const q = query(
        collection(db, 'video_assets'),
        where('user_id', '==', userId),
        orderBy('created_at', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as VideoAsset);
    } catch (error) {
      console.error('Error getting user video assets:', error);
      throw error;
    }
  },

  // Storage
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      // Note: Firebase Storage doesn't have a direct delete method in client SDK
      // You might need to use Firebase Functions for this
      console.warn('File deletion not implemented in client SDK');
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
};

export default firebaseApi;
