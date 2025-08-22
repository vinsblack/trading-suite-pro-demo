// Google Drive API Configuration with REAL IDs
export const DRIVE_CONFIG = {
  FILES: {
    APP_CONFIG: '1z1IqV0P_w59IvDIN-nY8iGHC90LMRZpT',        // app_config.json
    USER_PERMISSIONS: '1nmZDjtLhT4shbbaWSqBaIVC68qgqQydw',  // user_permissions.json  
    TRADING_DATA: '1fIg_SsGtGtp9s5Tw-mYZMKAgG2B9oz6M',      // trading_data.json
    ANALYTICS: '1A7pqEM2jcJP7WC_HJJenuHuK5-m7CByF'          // analytics.json
  },
  BASE_URL: 'https://drive.google.com/uc?export=download&id='
};

// Enhanced DriveAPI with real Google Drive integration
export class DriveAPI {
  static async fetchFile(fileId) {
    try {
      const url = DRIVE_CONFIG.BASE_URL + fileId;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching from Google Drive:', error);
      throw error;
    }
  }
  
  static async fetchConfig() {
    return await this.fetchFile(DRIVE_CONFIG.FILES.APP_CONFIG);
  }
  
  static async fetchPermissions() {
    return await this.fetchFile(DRIVE_CONFIG.FILES.USER_PERMISSIONS);
  }
  
  static async fetchTradingData() {
    return await this.fetchFile(DRIVE_CONFIG.FILES.TRADING_DATA);
  }
  
  static async fetchAnalytics() {
    return await this.fetchFile(DRIVE_CONFIG.FILES.ANALYTICS);
  }
  
  static async recordAnalytics(eventType, data = {}) {
    // For now, just log analytics (read-only access)
    console.log('📊 Analytics Event:', eventType, data);
    // In production, you'd send this to a logging service
  }
}

// Enhanced Demo Session with real Google Drive data
export class DemoSession {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.permissions = null;
    this.config = null;
    this.tradingData = null;
  }
  
  generateSessionId() {
    return 'demo_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
  
  async initialize() {
    try {
      console.log('🔗 Connecting to Google Drive backend...');
      
      // Fetch all data from Google Drive
      this.config = await DriveAPI.fetchConfig();
      this.permissions = await DriveAPI.fetchPermissions();
      this.tradingData = await DriveAPI.fetchTradingData();
      
      if (!this.config.demo_active) {
        throw new Error(this.config.messages?.maintenance || 'Demo currently unavailable');
      }
      
      DriveAPI.recordAnalytics('session_start', {
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      });
      
      console.log('✅ Google Drive connection successful!');
      
      return {
        sessionId: this.sessionId,
        config: this.config,
        permissions: this.permissions,
        timeRemaining: this.config.demo_duration_minutes || 15
      };
    } catch (error) {
      console.error('❌ Google Drive connection failed:', error);
      throw new Error('Failed to initialize demo session. Please check your connection.');
    }
  }
  
  async fetchTradingData() {
    if (!this.tradingData) {
      this.tradingData = await DriveAPI.fetchTradingData();
    }
    return this.tradingData;
  }
  
  isFeatureAllowed(featureName) {
    if (!this.permissions) return false;
    return this.permissions.demo_users?.allowed_features?.includes(featureName) || false;
  }
  
  isSessionExpired() {
    const elapsed = Date.now() - this.startTime;
    const maxDuration = (this.config?.demo_duration_minutes || 15) * 60 * 1000;
    return elapsed > maxDuration;
  }
  
  getRemainingTime() {
    const elapsed = Date.now() - this.startTime;
    const maxDuration = (this.config?.demo_duration_minutes || 15) * 60 * 1000;
    const remaining = Math.max(0, maxDuration - elapsed);
    return Math.floor(remaining / 1000 / 60);
  }
  
  getRemainingSeconds() {
    const elapsed = Date.now() - this.startTime;
    const maxDuration = (this.config?.demo_duration_minutes || 15) * 60 * 1000;
    const remaining = Math.max(0, maxDuration - elapsed);
    return Math.floor((remaining / 1000) % 60);
  }
}

// Premium Feature Handler
export const handlePremiumFeature = (featureName) => {
  console.log(`🔒 Premium feature accessed: ${featureName}`);
  DriveAPI.recordAnalytics('premium_feature_attempt', {
    feature: featureName,
    timestamp: new Date().toISOString()
  });
  return false; // Always show upgrade modal for demo
};

export default { DriveAPI, DemoSession, handlePremiumFeature, DRIVE_CONFIG };
