// Google Drive API Configuration
export const DRIVE_CONFIG = {
  // SOSTITUISCI QUESTI ID CON I TUOI ID REALI DA GOOGLE DRIVE
  FILES: {
    APP_CONFIG: '1XYZ789ABC123',        // ID del file app_config.json
    USER_PERMISSIONS: '1DEF456GHI789',  // ID del file user_permissions.json  
    TRADING_DATA: '1JKL012MNO345',      // ID del file trading_data.json
    ANALYTICS: '1PQR678STU901'          // ID del file analytics.json
  },
  
  BASE_URL: 'https://drive.google.com/uc?export=download&id=',
  
  // Helper per costruire URLs
  getFileUrl: (fileId) => `${DRIVE_CONFIG.BASE_URL}${fileId}`,
  
  // Endpoints
  ENDPOINTS: {
    config: () => DRIVE_CONFIG.getFileUrl(DRIVE_CONFIG.FILES.APP_CONFIG),
    permissions: () => DRIVE_CONFIG.getFileUrl(DRIVE_CONFIG.FILES.USER_PERMISSIONS),
    data: () => DRIVE_CONFIG.getFileUrl(DRIVE_CONFIG.FILES.TRADING_DATA),
    analytics: () => DRIVE_CONFIG.getFileUrl(DRIVE_CONFIG.FILES.ANALYTICS)
  }
};

// API Service per comunicare con Google Drive
export class DriveAPI {
  static async fetchConfig() {
    try {
      const response = await fetch(DRIVE_CONFIG.ENDPOINTS.config());
      if (!response.ok) throw new Error('Config not available');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch config:', error);
      throw new Error('Cannot connect to demo server');
    }
  }
  
  static async fetchPermissions() {
    try {
      const response = await fetch(DRIVE_CONFIG.ENDPOINTS.permissions());
      if (!response.ok) throw new Error('Permissions not available');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
      return { demo_users: { blocked_features: ['all'] } };
    }
  }
  
  static async fetchTradingData() {
    try {
      const response = await fetch(DRIVE_CONFIG.ENDPOINTS.data());
      if (!response.ok) throw new Error('Data not available');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch trading data:', error);
      return { demo_data: null };
    }
  }
  
  static async recordAnalytics(eventType, data = {}) {
    // Per ora solo log, in futuro potresti implementare un webhook
    console.log('Analytics Event:', eventType, data);
    
    // Potresti usare un servizio come Google Forms per raccogliere analytics
    // oppure un webhook che scrive su Google Sheets
  }
}

// Demo Session Manager
export class DemoSession {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.permissions = null;
    this.config = null;
  }
  
  generateSessionId() {
    return 'demo_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
  
  async initialize() {
    // Carica configurazione da Google Drive
    this.config = await DriveAPI.fetchConfig();
    this.permissions = await DriveAPI.fetchPermissions();
    
    // Verifica se demo è attiva
    if (!this.config.demo_active) {
      throw new Error(this.config.messages.maintenance);
    }
    
    // Record session start
    DriveAPI.recordAnalytics('session_start', {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    });
    
    return {
      sessionId: this.sessionId,
      config: this.config,
      permissions: this.permissions.demo_users
    };
  }
  
  isFeatureAllowed(featureName) {
    if (!this.permissions) return false;
    return this.permissions.demo_users.allowed_features.includes(featureName);
  }
  
  isSessionExpired() {
    const elapsed = Date.now() - this.startTime;
    const maxDuration = this.config.demo_duration_minutes * 60 * 1000;
    return elapsed > maxDuration;
  }
  
  getRemainingTime() {
    const elapsed = Date.now() - this.startTime;
    const maxDuration = this.config.demo_duration_minutes * 60 * 1000;
    const remaining = Math.max(0, maxDuration - elapsed);
    return Math.floor(remaining / 1000 / 60); // minutes
  }
}