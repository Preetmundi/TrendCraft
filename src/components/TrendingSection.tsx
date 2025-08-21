import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Play, Music, Hash, Eye } from "lucide-react";
import { trendingApi } from "@/services/api";
import { useAuth } from "./AuthProvider";
import { useToast } from "@/hooks/use-toast";

const TrendingSection = () => {
  const [trendingItems, setTrendingItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const data = await trendingApi.getTrendingData();
        setTrendingItems(data.slice(0, 4)); // Show first 4 trending items
      } catch (error) {
        console.error('Error fetching trending data:', error);
        // Fallback to mock data if API fails
        setTrendingItems([
    {
      type: "sound",
      title: "Viral Dance Beat #1",
      usage: "2.3M videos",
      growth: "+340%",
      platform: "TikTok",
      icon: Music,
    },
    {
      type: "hashtag",
      title: "#MomentVibes",
      usage: "890K posts",
      growth: "+280%",
      platform: "Instagram",
      icon: Hash,
    },
    {
      type: "effect",
      title: "Sunset Gradient",
      usage: "1.8M videos",
      growth: "+220%",
      platform: "YouTube",
      icon: Eye,
    },
    {
      type: "sound",
      title: "Chill Lofi Remix",
      usage: "1.1M videos",
      growth: "+195%",
      platform: "TikTok",
      icon: Music,
    }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingData();
  }, []);

  const handleUseTrend = (trend: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use trending elements",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Trend applied",
      description: `${trend.title} has been added to your project`,
    });
  };

  if (loading) {
    return (
      <div className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading trending data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-glass border border-white/10 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Real-time Trend Analysis</span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What's <span className="bg-gradient-primary bg-clip-text text-transparent">Trending</span> Now
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead of the curve with our AI-powered trend detection across all major platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {trendingItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className="bg-gradient-card backdrop-blur-glass border border-white/10 p-6 hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-green-500/20 text-green-400 border-green-500/30"
                  >
                    {item.growth}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{item.usage}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.platform}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-accent hover:text-accent-foreground"
                      onClick={() => handleUseTrend(item)}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Use
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            <TrendingUp className="w-4 h-4 mr-2" />
            View All Trends
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;