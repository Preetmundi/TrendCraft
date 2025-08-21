# 🤖 OpenRouter AI Integration Guide

This guide will help you set up [OpenRouter](https://openrouter.ai/) AI integration for your TrendCraft application.

## 🎯 What is OpenRouter?

[OpenRouter](https://openrouter.ai/) is a unified interface for accessing 400+ AI models from 60+ providers including:

- **OpenAI**: GPT-4, GPT-5, GPT-4o
- **Anthropic**: Claude 3.5 Sonnet, Claude 3.5 Haiku
- **Google**: Gemini 2.5 Pro, Gemini 2.0 Flash
- **Meta**: Llama 3.1, Code Llama
- **And many more...**

## 🚀 Why OpenRouter for TrendCraft?

✅ **Cost-Effective**: Better prices than individual providers  
✅ **High Availability**: Automatic fallback when providers are down  
✅ **Easy Integration**: OpenAI-compatible API  
✅ **Model Selection**: Choose the best model for each task  
✅ **No Subscriptions**: Pay-as-you-go pricing  

## 📋 Setup Steps

### 1. Create OpenRouter Account

1. **Visit [openrouter.ai](https://openrouter.ai/)**
2. **Sign up** using Google, GitHub, or MetaMask
3. **Verify your email** (if required)

### 2. Get Your API Key

1. **Navigate to API Keys** in your dashboard
2. **Create a new API key**
3. **Copy the key** (it starts with `sk-or-`)

### 3. Add API Key to Environment

Add your OpenRouter API key to your environment variables:

```bash
# For local development, create a .env file:
VITE_OPENROUTER_API_KEY=sk-or-your-actual-api-key-here
```

For deployment platforms:

**Vercel:**
- Go to your project settings
- Add environment variable: `VITE_OPENROUTER_API_KEY`
- Set value to your API key

**Netlify:**
- Go to Site settings → Environment variables
- Add: `VITE_OPENROUTER_API_KEY`
- Set value to your API key

**Firebase:**
- Add to your deployment environment variables

### 4. Test the Integration

1. **Start your development server**: `npm run dev`
2. **Navigate to the AI Content Generator** section
3. **Enter a prompt** like: "Create a viral TikTok video about cooking"
4. **Select your target platform** (TikTok, Instagram, YouTube)
5. **Click "Generate Content"**

## 💰 Pricing & Credits

### OpenRouter Pricing (as of 2025):
- **Claude 3.5 Sonnet**: $0.003/1K input, $0.015/1K output
- **GPT-4o Mini**: $0.00015/1K input, $0.0006/1K output
- **Gemini 2.0 Flash**: $0.000075/1K input, $0.0003/1K output

### Estimated Costs for TrendCraft:
- **Content Generation**: ~$0.01-0.05 per generation
- **Trend Analysis**: ~$0.02-0.08 per analysis
- **Content Enhancement**: ~$0.005-0.02 per enhancement

**Monthly Budget**: $10-50 for moderate usage

## 🎛️ Model Configuration

The AI service is configured to use different models for different tasks:

```typescript
// Default models in src/services/ai.ts
const DEFAULT_MODEL = 'anthropic/claude-3.5-sonnet'; // Fast, reliable
const CREATIVE_MODEL = 'openai/gpt-4o-mini'; // For creative content
const ANALYSIS_MODEL = 'anthropic/claude-3.5-sonnet'; // For trend analysis
```

### Recommended Models for Different Tasks:

| Task | Recommended Model | Why |
|------|------------------|-----|
| **Content Generation** | `openai/gpt-4o-mini` | Creative, cost-effective |
| **Trend Analysis** | `anthropic/claude-3.5-sonnet` | Analytical, reliable |
| **Content Enhancement** | `openai/gpt-4o-mini` | Good at optimization |
| **Video Ideas** | `anthropic/claude-3.5-sonnet` | Creative, structured output |

## 🔧 Customization Options

### Change Models

Edit `src/services/ai.ts` to use different models:

```typescript
// For faster, cheaper responses
const DEFAULT_MODEL = 'openai/gpt-4o-mini';

// For higher quality (more expensive)
const DEFAULT_MODEL = 'anthropic/claude-3.5-sonnet';

// For latest models
const DEFAULT_MODEL = 'openai/gpt-5';
```

### Adjust Parameters

Modify temperature and token limits:

```typescript
// More creative (higher temperature)
temperature: 0.9

// More focused (lower temperature)
temperature: 0.3

// Longer responses
max_tokens: 2000

// Shorter responses
max_tokens: 500
```

## 🛡️ Security & Best Practices

### 1. API Key Security
- ✅ **Never commit API keys** to Git
- ✅ **Use environment variables**
- ✅ **Rotate keys regularly**
- ✅ **Monitor usage** in OpenRouter dashboard

### 2. Rate Limiting
- **OpenRouter limits**: 100 requests/minute (free tier)
- **Consider implementing** client-side rate limiting
- **Monitor usage** to avoid hitting limits

### 3. Error Handling
The AI service includes comprehensive error handling:
- Network errors
- API rate limits
- Invalid responses
- Authentication failures

## 📊 Usage Monitoring

### OpenRouter Dashboard
Monitor your usage at [openrouter.ai/dashboard](https://openrouter.ai/dashboard):
- **Token usage** by model
- **Cost tracking**
- **Request history**
- **Performance metrics**

### Cost Optimization Tips
1. **Use cheaper models** for simple tasks
2. **Limit response length** with `max_tokens`
3. **Cache responses** for repeated requests
4. **Batch requests** when possible

## 🚨 Troubleshooting

### Common Issues:

**1. "OpenRouter API key not configured"**
- Check environment variable name: `VITE_OPENROUTER_API_KEY`
- Ensure the key starts with `sk-or-`
- Restart your development server

**2. "Rate limit exceeded"**
- Wait 1 minute before retrying
- Consider upgrading your OpenRouter plan
- Implement client-side rate limiting

**3. "Model not available"**
- Check model name spelling
- Verify model is available in your region
- Try a different model

**4. "Invalid response format"**
- The service includes fallback parsing
- Check browser console for detailed errors
- Verify prompt format

## 🔄 Advanced Features

### Custom Prompts
Modify prompts in `src/services/ai.ts`:

```typescript
const systemPrompt = `You are an expert social media content creator...`;
const userPrompt = `Generate viral video content for: "${request.prompt}"`;
```

### Model Selection Logic
Add intelligent model selection:

```typescript
const selectModel = (task: string, budget: number) => {
  if (budget < 0.01) return 'openai/gpt-4o-mini';
  if (task === 'creative') return 'anthropic/claude-3.5-sonnet';
  return 'openai/gpt-4o-mini';
};
```

### Response Caching
Implement caching for repeated requests:

```typescript
const cacheKey = `${prompt}-${platform}-${style}`;
const cached = localStorage.getItem(cacheKey);
if (cached) return JSON.parse(cached);
```

## 📈 Scaling Considerations

### For High Traffic:
1. **Implement caching** for common requests
2. **Use cheaper models** for bulk operations
3. **Add request queuing** for rate limits
4. **Monitor costs** closely

### For Production:
1. **Set up usage alerts** in OpenRouter dashboard
2. **Implement fallback models** for reliability
3. **Add request logging** for debugging
4. **Consider enterprise plans** for higher limits

## 🎉 Next Steps

1. **Get your API key** from [openrouter.ai](https://openrouter.ai/)
2. **Add it to your environment variables**
3. **Test the AI Content Generator**
4. **Monitor usage and costs**
5. **Customize models and prompts** as needed

## 📞 Support

- **OpenRouter Docs**: [docs.openrouter.ai](https://docs.openrouter.ai/)
- **OpenRouter Discord**: [discord.gg/openrouter](https://discord.gg/openrouter)
- **OpenRouter GitHub**: [github.com/openrouter](https://github.com/openrouter)

---

**Ready to create viral content with AI?** 🚀

Your TrendCraft application now has powerful AI capabilities powered by OpenRouter's extensive model collection!
