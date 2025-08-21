import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Wand2, Copy } from 'lucide-react';
import { aiService } from '@/services/ai';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';

const AIContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState<'tiktok' | 'instagram' | 'youtube'>('tiktok');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const handleGenerateContent = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to use AI content generation',
        variant: 'destructive',
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: 'Prompt required',
        description: 'Please enter a prompt for content generation',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const content = await aiService.generateVideoContent({
        prompt,
        platform,
        duration: 30,
      });
      setGeneratedContent(content);
      toast({
        title: 'Content generated!',
        description: 'Your viral content is ready',
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: 'Generation failed',
        description: error instanceof Error ? error.message : 'Failed to generate content',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Content copied to clipboard',
    });
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-glass border border-white/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Powered by OpenRouter AI</span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI <span className="bg-gradient-primary bg-clip-text text-transparent">Content Generator</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate viral video content using advanced AI models from OpenRouter
          </p>
        </div>

        <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="prompt">Content Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the video content you want to create..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={(value: any) => setPlatform(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerateContent} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              {generatedContent && (
                <>
                  <div>
                    <Label>Title</Label>
                    <div className="p-3 bg-card/20 rounded-lg border border-white/10">
                      <p className="text-foreground font-medium">{generatedContent.title}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(generatedContent.title)}
                        className="mt-2"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <div className="p-3 bg-card/20 rounded-lg border border-white/10">
                      <p className="text-foreground">{generatedContent.description}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(generatedContent.description)}
                        className="mt-2"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Hashtags</Label>
                    <div className="p-3 bg-card/20 rounded-lg border border-white/10">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {generatedContent.hashtags.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(generatedContent.hashtags.join(' '))}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy All
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Script Outline</Label>
                    <div className="p-3 bg-card/20 rounded-lg border border-white/10">
                      <p className="text-foreground text-sm">{generatedContent.script}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(generatedContent.script)}
                        className="mt-2"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIContentGenerator;

