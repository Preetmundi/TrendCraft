# 🚨 Vercel Deployment Issues - Fix Guide

## 🔍 **Current Issues:**

1. **Real-time data not working** ❌
2. **Sign-up functionality broken** ❌  
3. **Environment variables not configured** ❌

## 🛠️ **Step-by-Step Fix:**

### 1. **Configure Environment Variables in Vercel**

**Go to your Vercel Dashboard:**
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your TrendCraft project
3. Go to **Settings** → **Environment Variables**

**Add these environment variables:**

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://lxombdqdwhrxhzriisbp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4b21iZHFkd2hyeGh6cmlpc2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzkzNjgsImV4cCI6MjA2ODgxNTM2OH0.4oYropTQR2ir0qmHMcvNMMzJMdUJNsNLSXRThR3Ishk

# OpenRouter AI Configuration
VITE_OPENROUTER_API_KEY=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

# App Configuration
VITE_APP_NAME=TrendCraft
VITE_APP_URL=https://your-vercel-domain.vercel.app
```

**Important:** 
- ✅ Set **Environment** to **Production**
- ✅ Set **Environment** to **Preview** (for pull requests)
- ✅ Set **Environment** to **Development** (for local testing)

### 2. **Redeploy Your Application**

After adding environment variables:

1. **Go to Deployments tab**
2. **Click "Redeploy"** on your latest deployment
3. **Wait for deployment to complete**

### 3. **Verify Supabase Configuration**

**Check your Supabase project settings:**

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `lxombdqdwhrxhzriisbp`
3. Go to **Settings** → **API**
4. Verify these settings:

```bash
Project URL: https://lxombdqdwhrxhzriisbp.supabase.co
Project API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4b21iZHFkd2hyeGh6cmlpc2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzkzNjgsImV4cCI6MjA2ODgxNTM2OH0.4oYropTQR2ir0qmHMcvNMMzJMdUJNsNLSXRThR3Ishk
```

### 4. **Check Supabase Authentication Settings**

**In Supabase Dashboard:**
1. Go to **Authentication** → **Settings**
2. **URL Configuration:**
   - Site URL: `https://your-vercel-domain.vercel.app`
   - Redirect URLs: `https://your-vercel-domain.vercel.app/**`
3. **Email Auth:**
   - ✅ Enable email confirmations: **OFF** (for testing)
   - ✅ Enable email change confirmations: **OFF**

### 5. **Test the Fix**

**After redeployment, test these features:**

1. **Sign Up Test:**
   - Go to your Vercel app
   - Click "Get Started" or "Sign Up"
   - Try creating a new account
   - Check if you receive confirmation

2. **Real-time Data Test:**
   - Navigate to the Trending Section
   - Check if trending data loads
   - Try the AI Content Generator

3. **AI Content Generation Test:**
   - Sign in to your account
   - Go to AI Content Generator
   - Enter a prompt and test generation

### 6. **Debugging Steps**

**If issues persist, check browser console:**

1. **Open Developer Tools** (F12)
2. **Go to Console tab**
3. **Look for errors:**
   - Supabase connection errors
   - Environment variable errors
   - API key errors

**Common Error Messages:**

```bash
# Environment variable missing
"VITE_SUPABASE_URL is not defined"

# Supabase connection failed
"Failed to fetch from Supabase"

# Authentication error
"Invalid login credentials"
```

### 7. **Alternative Fix - Local Testing**

**Test locally first:**

1. **Create `.env.local` file:**
```bash
VITE_SUPABASE_URL=https://lxombdqdwhrxhzriisbp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4b21iZHFkd2hyeGh6cmlpc2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzkzNjgsImV4cCI6MjA2ODgxNTM2OH0.4oYropTQR2ir0qmHMcvNMMzJMdUJNsNLSXRThR3Ishk
VITE_OPENROUTER_API_KEY=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
VITE_APP_NAME=TrendCraft
VITE_APP_URL=http://localhost:8080
```

2. **Run locally:**
```bash
npm run dev
```

3. **Test all features locally first**

### 8. **Security Note**

**⚠️ IMPORTANT:** Your OpenRouter API key is now exposed in the `.env.example` file. 

**Immediate actions:**
1. **Regenerate your OpenRouter API key**
2. **Update the key in Vercel environment variables**
3. **Never commit API keys to Git**

### 9. **Final Verification**

**After fixing, verify these work:**

✅ **Authentication:**
- Sign up with new email
- Sign in with existing account
- Sign out functionality

✅ **Real-time Data:**
- Trending section loads data
- No loading errors
- Data updates properly

✅ **AI Features:**
- Content generation works
- No API key errors
- Responses are generated

## 🆘 **If Still Not Working:**

1. **Check Vercel logs:**
   - Go to your deployment
   - Click "Functions" tab
   - Look for error logs

2. **Contact Support:**
   - Vercel: [vercel.com/support](https://vercel.com/support)
   - Supabase: [supabase.com/support](https://supabase.com/support)

3. **Alternative Deployment:**
   - Try Netlify or Firebase Hosting
   - Follow the same environment variable setup

## 📞 **Quick Help:**

**Your current Vercel URL:** `https://your-project-name.vercel.app`

**Environment Variables to add in Vercel:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` 
- `VITE_OPENROUTER_API_KEY`
- `VITE_APP_NAME`
- `VITE_APP_URL`

**After adding variables, redeploy and test!** 🚀
