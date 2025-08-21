import Hero from "@/components/Hero";
import VideoUpload from "@/components/VideoUpload";
import TrendingSection from "@/components/TrendingSection";
import EditorPreview from "@/components/EditorPreview";
import AIContentGenerator from "@/components/AIContentGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <VideoUpload />
      <AIContentGenerator />
      <TrendingSection />
      <EditorPreview />
    </div>
  );
};

export default Index;
