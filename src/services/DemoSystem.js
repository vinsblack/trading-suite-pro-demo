// Enhanced Demo System with Google Drive Backend + CORS
export const DEMO_CONFIG = {
  // Google Drive File IDs (REALI - COLLEGAMENTO ATTIVO)
  FILES: {
    APP_CONFIG: '1Ng-hnSRG7IIOS85d8n8K_itZnvHLD8J-',              // app_config.json (REALE)
    USER_PERMISSIONS: '1G7vbEoPnc6MHJ64uzqB11PHDAFLGZLr1',          // user_permissions.json (REALE)
    TRADING_DATA: '15KSrtA2QMCOENBJOdlOArtEHmt0ZXnWq',             // trading_data.json (REALE)
    ANALYTICS: '1ydWM2wu9vAxB_ogEV-IJVn_rFRVwpy28'                  // analytics.json (REALE)
  },
  
  // CORS Solutions
  BASE_URL: 'https://drive.google.com/uc?export=download&id=',
  CORS_PROXIES: [
    'https://api.allorigins.win/get?url=',
    'https://cors-anywhere.herokuapp.com/',
    'https://proxy.cors.sh/'
  ],
  
  // Direct endpoints (REALI - COLLEGAMENTO ATTIVO)
  ENDPOINTS: {
    config: 'https://drive.google.com/uc?export=download&id=1Ng-hnSRG7IIOS85d8n8K_itZnvHLD8J-',
    permissions: 'https://drive.google.com/uc?export=download&id=1G7vbEoPnc6MHJ64uzqB11PHDAFLGZLr1',
    data: 'https://drive.google.com/uc?export=download&id=15KSrtA2QMCOENBJOdlOArtEHmt0ZXnWq',
    analytics: 'https://drive.google.com/uc?export=download&id=1ydWM2wu9vAxB_ogEV-IJVn_rFRVwpy28'
  },
  
  // Demo limitations
  DEMO_DURATION_MINUTES: 15,
  MAX_INTERACTIONS: 20
};

// Demo Session Manager
export class DemoSession {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.interactionCount = 0;
    this.config = null;
    this.permissions = null;
    this.isExpired = false;
  }
  
  generateSessionId() {
    return 'demo_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
  
  async initialize() {
    try {
      // Load configuration from Google Drive
      console.log('🚀 Loading demo configuration from Google Drive...');
      
      this.config = await this.fetchConfig();
      this.permissions = await this.fetchPermissions();
      
      console.log('✅ Demo configuration loaded successfully');
      
      return {
        sessionId: this.sessionId,
        config: this.config,
        permissions: this.permissions.demo_users,
        timeRemaining: this.getRemainingTime()
      };
    } catch (error) {
      console.error('❌ Failed to load demo configuration:', error);
      // Use fallback configuration
      return this.getFallbackConfig();
    }
  }
  
  async fetchWithCorsHandling(url, type = 'json') {
    // Try 1: Direct fetch (works if CORS is allowed)
    try {
      console.log(`🔄 Attempting direct fetch: ${type}`);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Direct fetch SUCCESS: ${type}`);
        return data;
      }
    } catch (error) {
      console.log(`❌ Direct fetch failed: ${error.message}`);
    }
    
    // Try 2: AllOrigins proxy with different URLs
    const proxies = [
      'https://api.allorigins.win/get?url=',
      'https://cors-anywhere.herokuapp.com/',
      'https://proxy.cors.sh/'
    ];
    
    for (const proxy of proxies) {
      try {
        console.log(`🔄 Attempting CORS proxy: ${type} via ${proxy}`);
        const proxyUrl = `${proxy}${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (response.ok) {
          const data = await response.json();
          const content = data.contents || data;
          const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
          console.log(`✅ CORS proxy SUCCESS: ${type}`);
          return parsedContent;
        }
      } catch (error) {
        console.log(`❌ CORS proxy failed: ${error.message}`);
      }
    }
    
    // All methods failed - throw error (NO FALLBACK)
    console.error(`❌ All connection methods failed for ${type}`);
    throw new Error(`Backend connection failed for ${type}. Contact vincenzo.gallo77@hotmail.com for working demo access.`);
  }
  
  async fetchConfig() {
    try {
      const data = await this.fetchWithCorsHandling(DEMO_CONFIG.ENDPOINTS.config, 'config');
      console.log('✅ Google Drive backend connected successfully');
      return data;
    } catch (error) {
      console.log('⚠️ Google Drive unavailable - using fallback config');
      // FALLBACK CONFIG instead of blocking
      return {
        demo_active: true,
        maintenance_mode: false,
        current_version: "1.0.0",
        contact_email: "vincenzo.gallo77@hotmail.com",
        max_concurrent_demos: 50,
        demo_duration_minutes: 15,
        messages: {
          demo_expired: "Demo session ended. Contact vincenzo.gallo77@hotmail.com for full version!",
          feature_locked: "🔒 Premium Feature - Contact vincenzo.gallo77@hotmail.com"
        }
      };
    }
  }
  
  async fetchPermissions() {
    try {
      const data = await this.fetchWithCorsHandling(DEMO_CONFIG.ENDPOINTS.permissions, 'permissions');
      return data;
    } catch (error) {
      console.log('⚠️ Google Drive unavailable - using fallback permissions');
      // FALLBACK PERMISSIONS instead of blocking
      return {
        demo_users: {
          allowed_features: ["view_dashboard", "view_strategies", "view_charts", "view_performance"],
          blocked_features: ["create_strategy", "delete_strategy", "live_trading", "real_api_connections"],
          limits: {
            max_session_time_minutes: 15,
            max_balance: 10000,
            max_strategies: 3
          }
        }
      };
    }
  }
  
  async fetchTradingData() {
    if (this.isSessionExpired()) {
      throw new Error('Demo session expired');
    }
    try {
      const data = await this.fetchWithCorsHandling(DEMO_CONFIG.ENDPOINTS.data, 'trading_data');
      console.log('✅ Trading data loaded from Google Drive');
      return data;
    } catch (error) {
      console.log('⚠️ Google Drive unavailable - using fallback trading data');
      // FALLBACK TRADING DATA instead of blocking
      return {
        portfolioValue: 12547.83,
        totalPnL: 1247.83,
        winRate: 87.3,
        strategies: [
          {
            id: '1',
            name: 'BTC Grid Bot',
            pair: 'BTC/USDT',
            type: 'Grid Trading',
            status: 'active',
            pnl: 2456.78,
            pnlPercent: 8.34,
            winRate: 94.2,
            trades: 47,
            risk: 'MEDIUM',
            duration: '02:34:17'
          },
          {
            id: '2',
            name: 'ETH Momentum',
            pair: 'ETH/USDT',
            type: 'Momentum',
            status: 'active',
            pnl: 1823.45,
            pnlPercent: 12.7,
            winRate: 89.4,
            trades: 32,
            risk: 'HIGH',
            duration: '01:45:33'
          }
        ],
        copyTraders: [],
        backtestResults: [],
        apiConnections: [],
        chartData: [
          { time: '06:00', value: 10000 },
          { time: '08:00', value: 10850 },
          { time: '10:00', value: 11420 },
          { time: '12:00', value: 12180 },
          { time: '14:00', value: 12340 },
          { time: '16:00', value: 12548 }
        ],
        performanceData: [
          { name: 'Grid Trading', value: 45, color: '#10b981' },
          { name: 'DCA', value: 30, color: '#3b82f6' },
          { name: 'Momentum', value: 25, color: '#8b5cf6' }
        ]
      };
    }
  }
  
  isSessionExpired() {
    const elapsed = Date.now() - this.startTime;
    const maxDuration = DEMO_CONFIG.DEMO_DURATION_MINUTES * 60 * 1000;
    this.isExpired = elapsed > maxDuration;
    return this.isExpired;
  }
  
  getRemainingTime() {
    const elapsed = Date.now() - this.startTime;
    const maxDuration = DEMO_CONFIG.DEMO_DURATION_MINUTES * 60 * 1000;
    const remaining = Math.max(0, maxDuration - elapsed);
    return Math.floor(remaining / 1000 / 60); // minutes
  }
  
  getRemainingSeconds() {
    const elapsed = Date.now() - this.startTime;
    const maxDuration = DEMO_CONFIG.DEMO_DURATION_MINUTES * 60 * 1000;
    const remaining = Math.max(0, maxDuration - elapsed);
    return Math.floor(remaining / 1000); // seconds
  }
  
  recordInteraction(action) {
    this.interactionCount++;
    console.log(`Demo interaction: ${action} (${this.interactionCount}/${DEMO_CONFIG.MAX_INTERACTIONS})`);
    
    if (this.interactionCount >= DEMO_CONFIG.MAX_INTERACTIONS) {
      this.showInteractionLimitModal();
    }
  }
  
  showInteractionLimitModal() {
    alert(`🎯 Demo Interaction Limit Reached!\n\nYou've explored ${DEMO_CONFIG.MAX_INTERACTIONS} features in the demo.\n\nFor unlimited access to all features:\n📧 Contact: vincenzo.gallo77@hotmail.com\n\n✅ Get the full version with:\n• Unlimited interactions\n• Real trading capabilities\n• All premium features\n• 24/7 support\n\nResponse guaranteed within 24 hours!`);
  }
  
  getFallbackConfig() {
    return {
      sessionId: this.sessionId,
      config: {
        demo_active: true,
        contact_email: 'vincenzo.gallo77@hotmail.com',
        demo_duration_minutes: 15,
        messages: {
          demo_expired: 'Demo session ended. Contact vincenzo.gallo77@hotmail.com for full access!',
          feature_locked: '🔒 Premium Feature - Contact vincenzo.gallo77@hotmail.com for full version',
          backend_disconnected: '🔌 Backend disconnected - Demo session ended. Contact for full version!'
        }
      },
      permissions: {
        allowed_features: ['view_dashboard', 'view_charts'],
        blocked_features: ['all_others']
      },
      timeRemaining: this.getRemainingTime()
    };
  }
}

// Premium Feature Handler
export const handlePremiumFeature = (featureName, demoSession, demoConfig) => {
  if (demoSession) {
    demoSession.recordInteraction(featureName);
  }
  
  const contactEmail = demoConfig?.contact_email || 'vincenzo.gallo77@hotmail.com';
  
  alert(`🔒 ${featureName} - Premium Feature\n\nThis feature is available in the full Trading Suite Pro.\n\n✅ What you get:\n• ${featureName} with full functionality\n• Real-time data connections\n• Advanced trading algorithms\n• Professional support\n• Complete source code\n\n📧 Contact: ${contactEmail}\n\nResponse guaranteed within 24 hours!`);
};