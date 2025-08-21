import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles, TrendingUp, Video } from "lucide-react";
import { AuthModal } from "./AuthModal";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-primary rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-accent/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-32 w-8 h-8 bg-primary/40 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">TrendCraft</span>
          </div>
          <div className="flex space-x-4">
            <AuthModal trigger={<Button variant="ghost">Sign In</Button>} />
            <AuthModal trigger={<Button variant="default">Get Started</Button>} />
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-glass border border-white/10 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">AI-Powered Viral Video Creation</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Create <span className="bg-gradient-primary bg-clip-text text-transparent">Viral Videos</span>
            <br />
            That Trend
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your content with AI-powered trend integration. Upload your video and watch our AI add trending sounds, effects, and viral elements automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Creating
            </Button>
            <Button variant="glass" size="xl">
              <TrendingUp className="w-5 h-5 mr-2" />
              Explore Trends
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-6 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Trend Detection</h3>
            <p className="text-muted-foreground">
              Real-time analysis of viral trends across TikTok, Instagram, and YouTube Shorts.
            </p>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-6 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">AI Enhancement</h3>
            <p className="text-muted-foreground">
              Automatic application of trending effects, sounds, and visual elements to your content.
            </p>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-6 hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">One-Click Export</h3>
            <p className="text-muted-foreground">
              Export optimized videos for all platforms with direct sharing to your social accounts.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;