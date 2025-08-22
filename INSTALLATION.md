# 🚀 Quick Installation Guide - Trading Suite Pro

## 📋 System Requirements

- **Node.js**: 16.0 or higher
- **npm**: 7.0 or higher (or yarn 1.22+)
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## ⚡ 5-Minute Setup

### Step 1: Extract & Navigate
```bash
# Extract the downloaded package
unzip trading-suite-pro-v1.0.zip
cd trading-suite-pro
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install
```

### Step 3: Environment Configuration (Optional)
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings (optional for demo)
# nano .env
```

### Step 4: Start Development Server
```bash
# Start the application
npm start
```

🎉 **That's it!** Your trading dashboard will open at `http://localhost:3000`

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# The build/ folder contains your production-ready files
```

## 🌐 Deploy to Live Server

### Option A: Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy with one command
vercel --prod
```

### Option B: Deploy to Netlify
```bash
# Build first
npm run build

# Drag and drop the build/ folder to netlify.com/drop
```

### Option C: Traditional Hosting
1. Run `npm run build`
2. Upload the `build/` folder contents to your web server
3. Point your domain to the uploaded files

## 🔧 Configuration Options

### Language Settings
Default language is Italian. To change:
1. Open `src/i18n.ts`
2. Change `lng: 'it'` to `lng: 'en'` or `lng: 'es'`

### Branding Customization
1. Navigate to White-Label Studio in the dashboard
2. Upload your logo and customize colors
3. All changes preview in real-time

### API Integration (Future)
The `.env.example` file contains all necessary variables for future API integration.

## 🆘 Common Issues

### Issue: "npm install" fails
**Solution**: Update Node.js to version 16+ and npm to 7+

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Use different port
PORT=3001 npm start
```

### Issue: Build fails with TypeScript errors
**Solution**: 
```bash
# Fix TypeScript issues
npm run type-check
```

## 📞 Support

- **Email**: support@tradingsuitepro.com
- **Documentation**: README.md (comprehensive guide)
- **License Questions**: licensing@tradingsuitepro.com

## 🔄 Updates

To check for updates:
1. Visit your purchase platform (ThemeForest, Gumroad, etc.)
2. Download latest version if available
3. See CHANGELOG.md for version differences

---

**🎯 Pro Tip**: Start with the default configuration first, then customize as needed. The dashboard works perfectly out of the box!