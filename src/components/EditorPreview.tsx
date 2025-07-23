import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Volume2, 
  Sparkles, 
  Type, 
  Palette,
  Music,
  Zap
} from "lucide-react";

const EditorPreview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("effects");

  const effects = [
    { name: "Sunset Glow", trending: true, category: "Filter" },
    { name: "Neon Lights", trending: false, category: "Animation" },
    { name: "Retro VHS", trending: true, category: "Filter" },
    { name: "Glitch Effect", trending: false, category: "Transition" },
  ];

  const sounds = [
    { name: "Viral Dance Beat", trending: true, duration: "0:15" },
    { name: "Chill Lofi Mix", trending: false, duration: "0:30" },
    { name: "Upbeat Pop", trending: true, duration: "0:20" },
    { name: "Emotional Piano", trending: false, duration: "0:25" },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI-Powered <span className="bg-gradient-primary bg-clip-text text-transparent">Video Editor</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Professional editing tools with AI-assisted trend integration
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-6">
              <div className="aspect-video bg-black rounded-lg mb-4 relative overflow-hidden">
                {/* Mock video preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </div>
                    <p className="text-white text-lg font-medium">Just a moment</p>
                    <p className="text-white/70 text-sm">Preview will appear here</p>
                  </div>
                </div>
                
                {/* Trending overlay example */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-primary text-white border-none">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Trending Effect Applied
                  </Badge>
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="glass"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <div className="text-sm text-muted-foreground">0:00 / 0:15</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="default">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Editing Tools */}
          <div className="space-y-6">
            <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-card/50">
                  <TabsTrigger value="effects" className="data-[state=active]:bg-primary">
                    <Zap className="w-4 h-4 mr-2" />
                    Effects
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="data-[state=active]:bg-primary">
                    <Music className="w-4 h-4 mr-2" />
                    Audio
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="effects" className="mt-4 space-y-3">
                  {effects.map((effect, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-card/30 rounded-lg hover:bg-card/50 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-foreground">
                            {effect.name}
                          </span>
                          {effect.trending && (
                            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                              Trending
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {effect.category}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Apply
                      </Button>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="audio" className="mt-4 space-y-3">
                  {sounds.map((sound, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-card/30 rounded-lg hover:bg-card/50 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-foreground">
                            {sound.name}
                          </span>
                          {sound.trending && (
                            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                              Trending
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {sound.duration}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Auto-enhance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Type className="w-4 h-4 mr-2" />
                  Add captions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="w-4 h-4 mr-2" />
                  Color grade
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPreview;