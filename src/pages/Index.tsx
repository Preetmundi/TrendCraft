import React from 'react';
import Hero from '@/components/Hero';
import TrendingSection from '@/components/TrendingSection';
import VideoUpload from '@/components/VideoUpload';
import EditorPreview from '@/components/EditorPreview';
import AIContentGenerator from '@/components/AIContentGenerator';
import DebugPanel from '@/components/DebugPanel';

const Index = () => {
  // Add a simple check to see if we're loading
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">TrendCraft</h1>
          <p className="text-lg">Loading your creative workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Fallback UI if Firebase isn't configured */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">🎬 TrendCraft</h1>
          <p className="text-xl mb-2">Your AI-Powered Content Creation Studio</p>
          <p className="text-sm text-gray-300">
            {import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Firebase Configured' : '⚠️ Firebase Not Configured'}
          </p>
        </div>
      </div>

      {/* Main Components */}
      <Hero />
      <TrendingSection />
      <VideoUpload />
      <EditorPreview />
      <AIContentGenerator />
      <DebugPanel />
    </div>
  );
};

export default Index;
