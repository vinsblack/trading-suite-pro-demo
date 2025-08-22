// Test per il Demo System
import { DemoSession, DEMO_CONFIG, handlePremiumFeature } from '../services/DemoSystem';

console.log('🧪 Testing Demo System...');

// Test 1: Configurazione File IDs
console.log('\n📋 Test 1: File IDs Configuration');
console.log('App Config ID:', DEMO_CONFIG.FILES.APP_CONFIG);
console.log('User Permissions ID:', DEMO_CONFIG.FILES.USER_PERMISSIONS);
console.log('Trading Data ID:', DEMO_CONFIG.FILES.TRADING_DATA);
console.log('Analytics ID:', DEMO_CONFIG.FILES.ANALYTICS);

// Test URLs
console.log('\n🔗 Test 2: Generated URLs');
console.log('Config URL:', DEMO_CONFIG.ENDPOINTS.config());
console.log('Permissions URL:', DEMO_CONFIG.ENDPOINTS.permissions());
console.log('Data URL:', DEMO_CONFIG.ENDPOINTS.data());
console.log('Analytics URL:', DEMO_CONFIG.ENDPOINTS.analytics());

// Test 3: Demo Session
console.log('\n⏰ Test 3: Demo Session Creation');
const session = new DemoSession();
console.log('Session ID:', session.sessionId);
console.log('Start Time:', new Date(session.startTime));
console.log('Remaining Time (minutes):', session.getRemainingTime());
console.log('Is Expired:', session.isSessionExpired());

// Test 4: Premium Feature Handler
console.log('\n🔒 Test 4: Premium Feature Handler');
const mockConfig = {
  contact_email: 'vincenzo.gallo77@hotmail.com',
  messages: {
    feature_locked: '🔒 Premium Feature - Contact for full version'
  }
};

// Simulazione chiamata (commenta se vuoi evitare popup)
// handlePremiumFeature('Test Feature', session, mockConfig);

console.log('✅ All tests completed successfully!');

export { session, mockConfig };
