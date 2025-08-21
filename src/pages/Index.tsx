import Hero from "@/components/Hero";
import VideoUpload from "@/components/VideoUpload";
import TrendingSection from "@/components/TrendingSection";
import EditorPreview from "@/components/EditorPreview";
import AIContentGenerator from "@/components/AIContentGenerator";
import DebugPanel from "@/components/DebugPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <VideoUpload />
      <AIContentGenerator />
      <TrendingSection />
      <EditorPreview />
      <DebugPanel />
    </div>
  );
};

export default Index;
