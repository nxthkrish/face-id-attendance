import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1d059710d449430188e56829f2dc1ea8',
  appName: 'face-id-attendance',
  webDir: 'dist',
  server: {
    url: 'https://1d059710-d449-4301-88e5-6829f2dc1ea8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera']
    }
  }
};

export default config;