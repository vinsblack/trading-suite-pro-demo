// GOOGLE DRIVE DEMO CONTROL SYSTEM

export const DEMO_CONTROL = {
  // File pubblici su Google Drive (condivisi con link)
  CONFIG_FILE: 'https://drive.google.com/uc?id=1ABC123_config&export=download',
  FEATURES_FILE: 'https://drive.google.com/uc?id=1DEF456_features&export=download', 
  DEMO_STATUS: 'https://drive.google.com/uc?id=1GHI789_status&export=download',
  
  // Controllo demo
  checkDemoStatus: async () => {
    try {
      const response = await fetch(DEMO_CONTROL.DEMO_STATUS);
      const status = await response.json();
      
      return {
        allowed: status.demo_active,
        expires: status.expires_at,
        features: status.allowed_features,
        message: status.contact_message
      };
    } catch {
      return { allowed: false, message: 'Contact vincenzo.gallo77@hotmail.com' };
    }
  }
};

// Esempio file JSON su Google Drive:
/*
{
  "demo_active": true,
  "expires_at": "2024-12-31T23:59:59Z",
  "allowed_features": ["dashboard", "view_strategies", "charts"],
  "blocked_features": ["add_strategy", "real_trading", "api_connections"],
  "contact_message": "Demo expires soon. Contact vincenzo.gallo77@hotmail.com for full version",
  "max_demo_time": 1800000
}
*/