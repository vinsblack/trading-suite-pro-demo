import React, { useState } from 'react';
import { Settings, Key, Save, Eye, EyeOff, TestTube, CheckCircle, AlertCircle } from 'lucide-react';

interface ApiSettings {
  binance: {
    apiKey: string;
    secret: string;
    sandbox: boolean;
    enabled: boolean;
  };
  bybit: {
    apiKey: string;
    secret: string;
    sandbox: boolean;
    enabled: boolean;
  };
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<ApiSettings>({
    binance: {
      apiKey: '',
      secret: '',
      sandbox: true,
      enabled: false
    },
    bybit: {
      apiKey: '',
      secret: '',
      sandbox: true,
      enabled: false
    }
  });

  const [showSecrets, setShowSecrets] = useState({
    binance: false,
    bybit: false
  });

  const [testResults, setTestResults] = useState<{[key: string]: 'testing' | 'success' | 'error' | null}>({
    binance: null,
    bybit: null
  });

  const handleInputChange = (exchange: keyof ApiSettings, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [exchange]: {
        ...prev[exchange],
        [field]: value
      }
    }));
  };

  const testConnection = async (exchange: keyof ApiSettings) => {
    setTestResults(prev => ({ ...prev, [exchange]: 'testing' }));
    
    try {
      // Simula test connessione API
      const response = await fetch('http://localhost:5000/api/test-exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exchange,
          apiKey: settings[exchange].apiKey,
          secret: settings[exchange].secret,
          sandbox: settings[exchange].sandbox
        })
      });

      if (response.ok) {
        setTestResults(prev => ({ ...prev, [exchange]: 'success' }));
      } else {
        setTestResults(prev => ({ ...prev, [exchange]: 'error' }));
      }
    } catch (error) {
      setTestResults(prev => ({ ...prev, [exchange]: 'error' }));
    }
  };

  const saveSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        alert('Settings saved successfully!');
        onClose();
      } else {
        alert('Error saving settings');
      }
    } catch (error) {
      alert('Error connecting to bot backend');
    }
  };

  const ExchangeConfig = ({ exchange, name }: { exchange: keyof ApiSettings, name: string }) => (
    <div className="exchange-config">
      <div className="exchange-header">
        <h3>{name} Configuration</h3>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings[exchange].enabled}
            onChange={(e) => handleInputChange(exchange, 'enabled', e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {settings[exchange].enabled && (
        <>
          <div className="form-group">
            <label>API Key</label>
            <input
              type="text"
              placeholder="Enter your API key"
              value={settings[exchange].apiKey}
              onChange={(e) => handleInputChange(exchange, 'apiKey', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Secret Key</label>
            <div className="secret-input">
              <input
                type={showSecrets[exchange] ? 'text' : 'password'}
                placeholder="Enter your secret key"
                value={settings[exchange].secret}
                onChange={(e) => handleInputChange(exchange, 'secret', e.target.value)}
              />
              <button
                type="button"
                className="secret-toggle"
                onClick={() => setShowSecrets(prev => ({ ...prev, [exchange]: !prev[exchange] }))}
              >
                {showSecrets[exchange] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings[exchange].sandbox}
                onChange={(e) => handleInputChange(exchange, 'sandbox', e.target.checked)}
              />
              <span>Sandbox Mode (Safe Testing)</span>
            </label>
          </div>

          <div className="test-connection">
            <button
              type="button"
              className={`test-btn ${testResults[exchange] || ''}`}
              onClick={() => testConnection(exchange)}
              disabled={!settings[exchange].apiKey || !settings[exchange].secret}
            >
              <TestTube size={16} />
              {testResults[exchange] === 'testing' && 'Testing...'}
              {testResults[exchange] === 'success' && 'Connection OK'}
              {testResults[exchange] === 'error' && 'Connection Failed'}
              {!testResults[exchange] && 'Test Connection'}
            </button>
            {testResults[exchange] === 'success' && (
              <CheckCircle className="success-icon" size={16} />
            )}
          </div>
        </>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <div className="modal-header">
          <h2>
            <Key size={20} />
            Exchange API Configuration
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="warning-box">
            <AlertCircle size={16} />
            <div>
              <strong>Important:</strong> Your API keys are encrypted and stored securely. 
              Never share your secret keys. Enable sandbox mode for testing.
            </div>
          </div>

          <ExchangeConfig exchange="binance" name="Binance" />
          <ExchangeConfig exchange="bybit" name="Bybit" />

          <div className="info-box">
            <h4>How to get API keys:</h4>
            <ul>
              <li><strong>Binance:</strong> Account → API Management → Create API Key</li>
              <li><strong>Bybit:</strong> Account → API → Create New Key</li>
            </ul>
            <p><strong>Required permissions:</strong> Spot Trading (NO withdrawal permissions needed)</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={saveSettings}>
            <Save size={16} />
            Save & Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;