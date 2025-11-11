# 🚀 Vercel Deployment Guide for CIAS

## Step-by-Step Deployment Instructions

### 1. Import Project to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository: `abhi3114-glitch/CIAS`
4. Click "Import"

### 2. Configure Environment Variables

**IMPORTANT**: In the Vercel project settings, add the following environment variable:

- **Variable Name**: `VITE_GROQ_API_KEY`
- **Value**: Your actual Groq API key (get it from https://console.groq.com/keys)
- **Environment**: Production, Preview, and Development (check all three)

**DO NOT** use `@groq_api_key` or any secret reference. Use your actual API key directly.

### 3. Deploy

1. Click "Deploy" button
2. Wait for build to complete (~2-3 minutes)
3. Your app will be live!

## 🔑 Getting Your Groq API Key

1. Visit: https://console.groq.com/keys
2. Sign up or log in
3. Click "Create API Key"
4. Copy the key (starts with `gsk_...`)
5. Paste it in Vercel's environment variable

## ⚙️ Build Configuration

Vercel will automatically detect these settings from `vercel.json`:

- **Framework**: Vite
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

## 🐛 Troubleshooting

### Error: "Environment Variable references Secret"
- **Solution**: Remove the `env` section from `vercel.json` (already fixed)
- Add the environment variable directly in Vercel dashboard

### Build Fails
- Check that `VITE_GROQ_API_KEY` is set in all environments
- Ensure the API key is valid and active

### App Loads But AI Doesn't Work
- Verify the environment variable name is exactly: `VITE_GROQ_API_KEY`
- Check browser console for API errors
- Ensure your Groq API key has sufficient credits

## 📝 Environment Variable Format

```
VITE_GROQ_API_KEY=gsk_your_actual_key_here
```

**Example** (use your real key):
```
VITE_GROQ_API_KEY=gsk_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

## ✅ Verification

After deployment:

1. Visit your Vercel URL
2. Go to "Workspace" tab
3. Type 50+ words in the text area
4. You should see AI-generated Socratic questions appear
5. Check for bias detection alerts
6. Test insight suggestions

## 🔄 Redeployment

If you need to redeploy:

1. Make changes to your code
2. Push to GitHub: `git push origin main`
3. Vercel will automatically redeploy

Or manually trigger:
1. Go to Vercel dashboard
2. Click "Redeploy" on your project

## 📧 Support

If issues persist:
- Check Vercel deployment logs
- Verify API key is correct
- Test API key at https://console.groq.com/playground

---

**Your CIAS app should now be live! 🎉**