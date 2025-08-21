# 🚀 Quick Vercel Fix - Step by Step

## 🚨 **URGENT: Fix Your Vercel Deployment**

Your app is deployed but not working because **environment variables are missing** in Vercel.

## ⚡ **5-Minute Fix:**

### 1. **Go to Vercel Dashboard**
- Visit: [vercel.com/dashboard](https://vercel.com/dashboard)
- Click on your **TrendCraft project**

### 2. **Add Environment Variables**
- Go to **Settings** → **Environment Variables**
- Click **"Add New"** for each variable:

```bash
# Variable 1
Name: VITE_SUPABASE_URL
Value: https://lxombdqdwhrxhzriisbp.supabase.co
Environment: Production, Preview, Development

# Variable 2  
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4b21iZHFkd2hyeGh6cmlpc2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzkzNjgsImV4cCI6MjA2ODgxNTM2OH0.4oYropTQR2ir0qmHMcvNMMzJMdUJNsNLSXRThR3Ishk
Environment: Production, Preview, Development

# Variable 3
Name: VITE_OPENROUTER_API_KEY  
Value: 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
Environment: Production, Preview, Development

# Variable 4
Name: VITE_APP_NAME
Value: TrendCraft
Environment: Production, Preview, Development

# Variable 5
Name: VITE_APP_URL
Value: https://your-vercel-domain.vercel.app
Environment: Production, Preview, Development
```

### 3. **Redeploy**
- Go to **Deployments** tab
- Click **"Redeploy"** on your latest deployment
- Wait 2-3 minutes

### 4. **Test Your App**
- Visit your Vercel URL
- Click the **🔧 Debug button** (bottom-right corner)
- Run the tests to verify everything works

## 🔧 **Debug Panel Features:**

The debug panel will show you:
- ✅ Environment variables status
- ✅ Supabase connection test
- ✅ Authentication test  
- ✅ Trending data test
- ✅ AI service test

## 🆘 **If Still Broken:**

1. **Check browser console** (F12) for errors
2. **Verify Supabase settings** at [supabase.com/dashboard](https://supabase.com/dashboard)
3. **Regenerate OpenRouter API key** (since it was exposed)

## 📞 **Need Help?**

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)

---

**After adding environment variables and redeploying, your app should work perfectly!** 🎉
