import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type Project = Tables['projects']['Row'];
type TrendingData = Tables['trending_data']['Row'];
type VideoAsset = Tables['video_assets']['Row'];

// Profile API
export const profileApi = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Projects API
export const projectsApi = {
  async getProjects(userId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProject(projectId: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProject(projectId: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    
    if (error) throw error;
  },
};

// Trending Data API
export const trendingApi = {
  async getTrendingData(platform?: string, trendType?: string): Promise<TrendingData[]> {
    let query = supabase
      .from('trending_data')
      .select('*')
      .eq('is_active', true)
      .order('growth_rate', { ascending: false });

    if (platform) {
      query = query.eq('platform', platform);
    }
    if (trendType) {
      query = query.eq('trend_type', trendType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async getTrendingDataById(trendId: string): Promise<TrendingData | null> {
    const { data, error } = await supabase
      .from('trending_data')
      .select('*')
      .eq('trend_id', trendId)
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Video Assets API
export const videoAssetsApi = {
  async getProjectAssets(projectId: string): Promise<VideoAsset[]> {
    const { data, error } = await supabase
      .from('video_assets')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createVideoAsset(asset: Omit<VideoAsset, 'id' | 'created_at'>): Promise<VideoAsset> {
    const { data, error } = await supabase
      .from('video_assets')
      .insert(asset)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateVideoAsset(assetId: string, updates: Partial<VideoAsset>): Promise<VideoAsset> {
    const { data, error } = await supabase
      .from('video_assets')
      .update(updates)
      .eq('id', assetId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Storage API
export const storageApi = {
  async uploadVideo(file: File, userId: string): Promise<string> {
    const fileName = `${userId}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(fileName, file);
    
    if (error) throw error;
    return data.path;
  },

  async uploadThumbnail(file: File, userId: string): Promise<string> {
    const fileName = `${userId}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(fileName, file);
    
    if (error) throw error;
    return data.path;
  },

  async getVideoUrl(path: string): Promise<string> {
    const { data } = supabase.storage
      .from('videos')
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  async getThumbnailUrl(path: string): Promise<string> {
    const { data } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(path);
    
    return data.publicUrl;
  },
};
