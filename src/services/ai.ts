import { supabase } from '@/integrations/supabase/client';

// OpenRouter API Configuration
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Default model configuration
const DEFAULT_MODEL = 'anthropic/claude-3.5-sonnet'; // Fast, reliable, and cost-effective
const CREATIVE_MODEL = 'openai/gpt-4o-mini'; // For creative content
const ANALYSIS_MODEL = 'anthropic/claude-3.5-sonnet'; // For trend analysis

interface AIRequestOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  system_prompt?: string;
}

interface VideoGenerationRequest {
  prompt: string;
  style?: 'trendy' | 'professional' | 'casual' | 'viral';
  platform?: 'tiktok' | 'instagram' | 'youtube';
  duration?: number; // in seconds
}

interface TrendAnalysisRequest {
  platform: 'tiktok' | 'instagram' | 'youtube';
  category?: string;
  timeframe?: '24h' | '7d' | '30d';
}

interface ContentEnhancementRequest {
  originalContent: string;
  enhancementType: 'title' | 'description' | 'hashtags' | 'script';
  targetPlatform: 'tiktok' | 'instagram' | 'youtube';
}

class AIService {
  private async makeRequest(
    messages: any[],
    options: AIRequestOptions = {}
  ): Promise<string> {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'TrendCraft AI Content Generator'
      },
      body: JSON.stringify({
        model: options.model || DEFAULT_MODEL,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 1000,
        stream: false
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`AI API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  // Generate video descriptions and titles
  async generateVideoContent(request: VideoGenerationRequest): Promise<{
    title: string;
    description: string;
    hashtags: string[];
    script: string;
  }> {
    const systemPrompt = `You are an expert social media content creator specializing in viral video content for ${request.platform || 'social media'}. 
    
    Create engaging, trending content that follows current viral patterns. Focus on:
    - Catchy, clickable titles
    - Engaging descriptions that encourage interaction
    - Relevant hashtags that are currently trending
    - Short, punchy scripts optimized for ${request.duration || 30} seconds
    
    Style: ${request.style || 'trendy'}
    Platform: ${request.platform || 'general'}`;

    const userPrompt = `Generate viral video content for this prompt: "${request.prompt}"
    
    Please provide:
    1. A catchy title (max 60 characters)
    2. An engaging description (max 150 characters)
    3. 5-8 trending hashtags
    4. A short script outline for ${request.duration || 30} seconds
    
    Format as JSON:
    {
      "title": "string",
      "description": "string", 
      "hashtags": ["string"],
      "script": "string"
    }`;

    const response = await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], {
      model: CREATIVE_MODEL,
      temperature: 0.8,
      max_tokens: 800
    });

    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback parsing if JSON is malformed
      const lines = response.split('\n');
      return {
        title: lines.find(l => l.includes('title'))?.split(':')[1]?.trim() || 'Viral Video',
        description: lines.find(l => l.includes('description'))?.split(':')[1]?.trim() || 'Check out this amazing content!',
        hashtags: lines.filter(l => l.includes('#')).map(l => l.trim()) || ['#viral', '#trending'],
        script: lines.find(l => l.includes('script'))?.split(':')[1]?.trim() || 'Create engaging content here'
      };
    }
  }

  // Analyze trending content and provide insights
  async analyzeTrends(request: TrendAnalysisRequest): Promise<{
    trendingTopics: string[];
    recommendedContent: string[];
    growthPredictions: string[];
    engagementTips: string[];
  }> {
    const systemPrompt = `You are a social media trend analyst with deep expertise in ${request.platform} trends. 
    
    Analyze current trends and provide actionable insights for content creators. Focus on:
    - Emerging trends and viral patterns
    - Content recommendations based on current popularity
    - Growth predictions for different content types
    - Engagement strategies that work on ${request.platform}`;

    const userPrompt = `Analyze current trends on ${request.platform} for ${request.timeframe || '7d'} timeframe.
    
    Category: ${request.category || 'general'}
    
    Provide analysis in JSON format:
    {
      "trendingTopics": ["string"],
      "recommendedContent": ["string"],
      "growthPredictions": ["string"],
      "engagementTips": ["string"]
    }`;

    const response = await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], {
      model: ANALYSIS_MODEL,
      temperature: 0.6,
      max_tokens: 1200
    });

    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        trendingTopics: ['AI content', 'Short-form videos', 'User-generated content'],
        recommendedContent: ['Behind-the-scenes content', 'Tutorial videos', 'Trending challenges'],
        growthPredictions: ['Video content will continue to dominate', 'AI-generated content will increase'],
        engagementTips: ['Use trending hashtags', 'Post consistently', 'Engage with comments']
      };
    }
  }

  // Enhance existing content with AI
  async enhanceContent(request: ContentEnhancementRequest): Promise<string> {
    const systemPrompt = `You are a social media optimization expert specializing in ${request.targetPlatform} content enhancement.
    
    Your goal is to improve content for maximum engagement and reach on ${request.targetPlatform}.`;

    let userPrompt = '';
    switch (request.enhancementType) {
      case 'title':
        userPrompt = `Enhance this title for ${request.targetPlatform}: "${request.originalContent}"
        
        Make it more engaging, clickable, and optimized for the platform. Keep it under 60 characters.`;
        break;
      case 'description':
        userPrompt = `Enhance this description for ${request.targetPlatform}: "${request.originalContent}"
        
        Make it more engaging and include call-to-actions. Keep it under 150 characters.`;
        break;
      case 'hashtags':
        userPrompt = `Generate trending hashtags for this content on ${request.targetPlatform}: "${request.originalContent}"
        
        Provide 5-8 relevant, trending hashtags that will increase discoverability.`;
        break;
      case 'script':
        userPrompt = `Enhance this video script for ${request.targetPlatform}: "${request.originalContent}"
        
        Make it more engaging, add hooks, and optimize for the platform's format.`;
        break;
    }

    return await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], {
      model: CREATIVE_MODEL,
      temperature: 0.7,
      max_tokens: 500
    });
  }

  // Generate creative video ideas based on trends
  async generateVideoIdeas(platform: string, category?: string): Promise<{
    ideas: string[];
    executionTips: string[];
    expectedEngagement: string;
  }> {
    const systemPrompt = `You are a creative director specializing in viral video content for ${platform}.
    
    Generate innovative video ideas that are likely to go viral based on current trends and platform algorithms.`;

    const userPrompt = `Generate 5 creative video ideas for ${platform}${category ? ` in the ${category} category` : ''}.
    
    For each idea, provide:
    - A unique concept
    - Why it would work on this platform
    - Expected engagement level
    
    Format as JSON:
    {
      "ideas": ["string"],
      "executionTips": ["string"],
      "expectedEngagement": "string"
    }`;

    const response = await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], {
      model: CREATIVE_MODEL,
      temperature: 0.9,
      max_tokens: 1000
    });

    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        ideas: [
          'Behind-the-scenes content creation',
          'Trending challenge participation',
          'Educational content with humor',
          'User-generated content showcase',
          'Interactive Q&A sessions'
        ],
        executionTips: [
          'Start with a strong hook',
          'Keep it under 60 seconds',
          'Use trending music',
          'Add captions for accessibility'
        ],
        expectedEngagement: 'High engagement potential with proper execution'
      };
    }
  }

  // Get model recommendations based on use case
  async getModelRecommendations(useCase: string): Promise<{
    recommendedModel: string;
    reasoning: string;
    estimatedCost: string;
  }> {
    const systemPrompt = `You are an AI model expert who helps users choose the best model for their specific use case.
    
    Consider factors like cost, speed, quality, and suitability for the task.`;

    const userPrompt = `Recommend the best OpenRouter model for: ${useCase}
    
    Consider:
    - Task requirements
    - Cost efficiency
    - Speed vs quality trade-offs
    - Model capabilities
    
    Format as JSON:
    {
      "recommendedModel": "string",
      "reasoning": "string", 
      "estimatedCost": "string"
    }`;

    const response = await this.makeRequest([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], {
      model: DEFAULT_MODEL,
      temperature: 0.3,
      max_tokens: 400
    });

    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        recommendedModel: 'anthropic/claude-3.5-sonnet',
        reasoning: 'Balanced performance for general content generation',
        estimatedCost: '$0.003 per 1K input tokens, $0.015 per 1K output tokens'
      };
    }
  }
}

export const aiService = new AIService();
