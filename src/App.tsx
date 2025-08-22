import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3,
  Users,
  TrendingUp,
  PieChart,
  DollarSign,
  Settings,
  LogOut,
  User,
  Search,
  Plus,
  Play,
  Pause,
  Eye,
  Star,
  Activity,
  Zap,
  TestTube,
  Download,
  Key,
  Wifi,
  CheckCircle,
  AlertCircle,
  Copy,
  Brain,
  CreditCard,
  Menu,
  X,
  Shield,
  Sparkles,
  Clock,
  Mail,
  Lock
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { DemoSession, handlePremiumFeature } from './services/DemoSystem';
import AdminDashboard from './components/AdminDashboard';
import './App.css';
import './styles/admin.css';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  plan: 'demo' | 'professional' | 'enterprise';
  avatar?: string;
  provider?: 'google' | 'microsoft' | 'facebook' | 'email' | 'demo';
}

interface Strategy {
  id: string;
  name: string;
  pair: string;
  type: string;
  status: 'active' | 'paused' | 'stopped';
  pnl: number;
  pnlPercent: number;
  winRate: number;
  trades: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  duration: string;
}

interface CopyTrader {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  winRate: number;
  totalReturn: number;
  monthlyReturn: number;
  riskScore: number;
  strategies: number;
  following: boolean;
  verified: boolean;
  country: string;
}

interface BacktestResult {
  id: string;
  name: string;
  period: string;
  returns: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  aiConfidence: number;
  totalTrades: number;
  profitFactor: number;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

interface Plan {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface ApiConnection {
  exchange: string;
  status: 'connected' | 'disconnected' | 'error';
  apiKey: string;
  permissions: string[];
  lastTest: string;
  volume24h?: number;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const App: React.FC = () => {
  // Demo System State
  const [demoSession, setDemoSession] = useState<DemoSession | null>(null);
  const [demoConfig, setDemoConfig] = useState<any>(null);
  const [demoData, setDemoData] = useState<any>(null);
  const [remainingTime, setRemainingTime] = useState<number>(15);
  const [demoExpired, setDemoExpired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [demoModeOnly, setDemoModeOnly] = useState<boolean>(false);
  
  // Original State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setShowLoginModal] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [traderSearchQuery, setTraderSearchQuery] = useState('');
  const [traderSortBy, setTraderSortBy] = useState('winRate');
  const [traderFilter, setTraderFilter] = useState('all');

  // Dati demo realistici per GitHub
  const [portfolioValue] = useState(12547.83);
  const [totalPnL] = useState(1247.83);
  const [winRate] = useState(87.3);

  const translations: Translations = {
    en: {
      dashboard: 'Dashboard',
      copyTrading: 'Copy Trading',
      aiBacktest: 'AI Backtest',
      apiSettings: 'API Settings',
      totalBalance: 'Total Balance',
      totalPnL: 'Total P&L',
      activeStrategies: 'Active Strategies',
      winRate: 'Win Rate',
      pnlHistory: 'P&L History',
      strategyPerformance: 'Strategy Performance',
      tradingStrategies: 'Trading Strategies',
      addStrategy: 'Add Strategy',
      professionalTraders: 'Professional Traders',
      followers: 'followers',
      follow: 'Follow',
      unfollow: 'Unfollow',
      aiBacktestEngine: 'AI Backtest Engine',
      newBacktest: 'New Backtest',
      aiConfidence: 'AI Confidence',
      returns: 'Returns',
      sharpeRatio: 'Sharpe Ratio',
      maxDrawdown: 'Max Drawdown',
      pricingPlans: 'Pricing Plans',
      recommended: 'Recommended',
      currentPlan: 'Current Plan',
      upgrade: 'Upgrade',
      apiConnections: 'API Connections',
      saveSettings: 'Save Settings',
      language: 'Language',
      currency: 'Currency',
      upgradeRequired: 'Upgrade Required',
      featureRequires: 'This feature requires a Professional or Enterprise plan.',
      viewPlans: 'View Plans',
      cancel: 'Cancel',
      live: 'Live',
      loginTitle: 'Welcome to Market Genius',
      loginSubtitle: 'Start your trading journey with the most advanced AI-powered platform',
      continueWith: 'Continue with',
      signInEmail: 'Sign in with Email',
      demoAccount: 'Try Demo Account',
      welcome: 'Welcome',
      welcomeMessage: 'Your journey to intelligent trading starts now',
      getStarted: 'Get Started',
      demoMode: 'Demo Mode',
      searchTraders: 'Search Traders',
      sortBy: 'Sort By',
      filterBy: 'Filter By',
      allTraders: 'All Traders',
      verified: 'Verified Only',
      topPerformers: 'Top Performers',
      searchPlaceholder: 'Search traders by name or country...',
      sortByWinRate: 'Win Rate',
      sortByReturn: 'Total Return',
      sortByFollowers: 'Followers',
      sortByRisk: 'Risk Score',
      demoTimeRemaining: 'Demo Time Remaining',
      demoSessionEnded: 'Demo Session Ended',
      contactForFullVersion: 'Contact for full version',
      fullAccess: 'Full Access',
      planDemo: 'Demo',
      planProfessional: 'Professional', 
      planEnterprise: 'Enterprise',
      monthlyPrice: '/month'
    },
    it: {
      dashboard: 'Dashboard',
      copyTrading: 'Copy Trading',
      aiBacktest: 'AI Backtest',
      apiSettings: 'Impostazioni API',
      totalBalance: 'Saldo Totale',
      totalPnL: 'P&L Totale',
      activeStrategies: 'Strategie Attive',
      winRate: 'Tasso di Vittoria',
      pnlHistory: 'Storico P&L',
      strategyPerformance: 'Performance Strategie',
      tradingStrategies: 'Strategie di Trading',
      addStrategy: 'Aggiungi Strategia',
      professionalTraders: 'Trader Professionali',
      followers: 'followers',
      follow: 'Segui',
      unfollow: 'Non seguire',
      aiBacktestEngine: 'Motore AI Backtest',
      newBacktest: 'Nuovo Backtest',
      aiConfidence: 'Confidenza AI',
      returns: 'Rendimenti',
      sharpeRatio: 'Sharpe Ratio',
      maxDrawdown: 'Max Drawdown',
      pricingPlans: 'Piani Tariffari',
      recommended: 'Consigliato',
      currentPlan: 'Piano Attuale',
      upgrade: 'Aggiorna',
      apiConnections: 'Connessioni API',
      saveSettings: 'Salva Impostazioni',
      language: 'Lingua',
      currency: 'Valuta',
      upgradeRequired: 'Aggiornamento Richiesto',
      featureRequires: 'Questa funzionalità richiede un piano Professional o Enterprise.',
      viewPlans: 'Visualizza Piani',
      cancel: 'Annulla',
      live: 'Live',
      loginTitle: 'Benvenuto in Market Genius',
      loginSubtitle: 'Inizia il tuo percorso di trading con la piattaforma AI più avanzata',
      continueWith: 'Continua con',
      signInEmail: 'Accedi con Email',
      demoAccount: 'Prova Account Demo',
      welcome: 'Benvenuto',
      welcomeMessage: 'Il tuo viaggio nel trading intelligente inizia ora',
      getStarted: 'Inizia',
      demoMode: 'Modalità Demo',
      searchTraders: 'Cerca Trader',
      sortBy: 'Ordina Per',
      filterBy: 'Filtra Per',
      allTraders: 'Tutti i Trader',
      verified: 'Solo Verificati',
      topPerformers: 'Top Performer',
      searchPlaceholder: 'Cerca trader per nome o paese...',
      sortByWinRate: 'Tasso Vittoria',
      sortByReturn: 'Rendimento Totale',
      sortByFollowers: 'Followers',
      sortByRisk: 'Punteggio Rischio',
      demoTimeRemaining: 'Tempo Demo Rimanente',
      demoSessionEnded: 'Sessione Demo Terminata',
      contactForFullVersion: 'Contatta per versione completa',
      fullAccess: 'Accesso Completo',
      planDemo: 'Demo',
      planProfessional: 'Professionale',
      planEnterprise: 'Enterprise',
      monthlyPrice: '/mese'
    }
  };

  const t = (key: string): string => {
    return translations[selectedLanguage]?.[key] || translations['en'][key] || key;
  };

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currencies: Currency[] = [
    { code: 'USD', symbol: '$', rate: 1.0 },
    { code: 'EUR', symbol: '€', rate: 0.85 },
    { code: 'GBP', symbol: '£', rate: 0.73 },
    { code: 'BTC', symbol: '₿', rate: 0.000023 }
  ];

  // 🚀 Demo System Initialization
  useEffect(() => {
    const initializeDemo = async () => {
      try {
        setLoading(true);
        console.log('🎯 Initializing Trading Suite Pro Demo...');
        
        // Create demo session
        const session = new DemoSession();
        const sessionData = await session.initialize();
        
        setDemoSession(session);
        setDemoConfig(sessionData.config);
        setRemainingTime(sessionData.timeRemaining);
        
        // Load trading data from Google Drive
        const tradingData = await session.fetchTradingData();
        setDemoData(tradingData);
        
        // Auto-login for demo (come era originariamente)
        setUser({
          id: sessionData.sessionId,
          name: 'Demo User',
          email: 'demo@tradingsuite.com',
          plan: 'demo',
          provider: 'demo',
          avatar: '🎯'
        });
        
        setIsAuthenticated(true);
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 3000);
        
        console.log('✅ Demo initialized successfully');
        
      } catch (error: any) {
        console.error('❌ Demo initialization failed:', error);
        if (error?.message === 'DEMO_MODE_ONLY') {
          console.log('🔒 Forcing Demo Mode Only (Google Drive blocked)');
          setDemoModeOnly(true);
        } else {
          setDemoExpired(true);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeDemo();
  }, []);
  
  // ⏰ Demo Timer Management (RIPRISTINATO con Google Drive)
  useEffect(() => {
    if (!demoSession) return;

    const interval = setInterval(() => {
      const timeLeft = demoSession.getRemainingTime();
      setRemainingTime(timeLeft);
      
      if (demoSession.isSessionExpired()) {
        setDemoExpired(true);
        clearInterval(interval);
        alert('🔒 Demo session ended!\n\n✨ Want the FULL VERSION with:\n• Unlimited access\n• No time limits\n• All premium features\n• Local installation\n\n📧 Contact: vincenzo.gallo77@hotmail.com');
      }
    }, 1000); // Check every second for real-time countdown

    return () => clearInterval(interval);
  }, [demoSession, demoConfig]);
  
  // 🔒 Premium Feature Handler
  const handleLockedFeature = (featureName: string) => {
    setShowUpgradeModal(true);
  };

  // ⚠️ TUTTI GLI HOOKS DEVONO ESSERE QUI (prima dei return condizionali)
  
  // Dynamic plan features that update when language changes
  const { i18n } = useTranslation();
  
  // Sync selectedLanguage with i18n language
  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);
  
  const plans: Plan[] = useMemo(() => {
    const lang = i18n.language;
    
    const getLocalizedFeatures = () => {
      return {
        demo: lang === 'en' ? ['Simulated data', 'Basic strategies', 'Community support'] :
              lang === 'es' ? ['Datos simulados', 'Estrategias básicas', 'Soporte comunitario'] :
              ['Dati simulati', 'Strategie base', 'Supporto community'],
        professional: lang === 'en' ? ['Real exchange APIs', 'Advanced strategies', 'Priority support', 'Copy trading'] :
                      lang === 'es' ? ['APIs de exchange reales', 'Estrategias avanzadas', 'Soporte prioritario', 'Copy trading'] :
                      ['API exchange reali', 'Strategie avanzate', 'Supporto prioritario', 'Copy trading'],
        enterprise: lang === 'en' ? ['All Professional', 'Multi-exchange', 'Advanced AI analytics', 'Dedicated manager'] :
                    lang === 'es' ? ['Todo Profesional', 'Multi-exchange', 'Análisis AI avanzados', 'Manager dedicado'] :
                    ['Tutto Professional', 'Multi-exchange', 'Analisi AI avanzate', 'Manager dedicato']
      };
    };

    const localizedFeatures = getLocalizedFeatures();

    return [
      {
        name: t('planDemo'),
        price: 0,
        features: localizedFeatures.demo
      },
      {
        name: t('planProfessional'),
        price: 79,
        features: localizedFeatures.professional,
        recommended: true
      },
      {
        name: t('planEnterprise'),
        price: 199,
        features: localizedFeatures.enterprise
      }
    ];
  }, [i18n.language, t]);

  // Dati demo completi per GitHub (hardcoded)
  const strategies: Strategy[] = [
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
    },
    {
      id: '3',
      name: 'BNB DCA',
      pair: 'BNB/USDT',
      type: 'DCA',
      status: 'active',
      pnl: 967.60,
      pnlPercent: 5.8,
      winRate: 91.7,
      trades: 28,
      risk: 'LOW',
      duration: '03:12:09'
    }
  ];

  const copyTraders: CopyTrader[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      avatar: '👨‍💼',
      followers: 3247,
      winRate: 92.3,
      totalReturn: 347.8,
      monthlyReturn: 18.4,
      riskScore: 7,
      strategies: 8,
      following: false,
      verified: true,
      country: '🇺🇸'
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      avatar: '👩‍💼',
      followers: 2189,
      winRate: 89.7,
      totalReturn: 298.5,
      monthlyReturn: 15.2,
      riskScore: 5,
      strategies: 6,
      following: true,
      verified: true,
      country: '🇪🇸'
    },
    {
      id: '3',
      name: 'Chen Wei',
      avatar: '👨‍💻',
      followers: 4521,
      winRate: 94.1,
      totalReturn: 467.3,
      monthlyReturn: 22.7,
      riskScore: 8,
      strategies: 12,
      following: false,
      verified: true,
      country: '🇨🇳'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      avatar: '👩‍🔬',
      followers: 2867,
      winRate: 91.4,
      totalReturn: 389.2,
      monthlyReturn: 19.8,
      riskScore: 6,
      strategies: 9,
      following: false,
      verified: true,
      country: '🇬🇧'
    }
  ];

  const backtestResults: BacktestResult[] = [
    {
      id: '1',
      name: 'Advanced Grid Strategy',
      period: '12M',
      returns: 94.7,
      sharpeRatio: 2.84,
      maxDrawdown: -7.3,
      winRate: 94.8,
      aiConfidence: 96,
      totalTrades: 1247,
      profitFactor: 3.42
    },
    {
      id: '2',
      name: 'ML Momentum Enhanced',
      period: '6M',
      returns: 67.2,
      sharpeRatio: 2.31,
      maxDrawdown: -12.1,
      winRate: 87.4,
      aiConfidence: 89,
      totalTrades: 892,
      profitFactor: 2.78
    }
  ];

  const [apiConnections] = useState<ApiConnection[]>([
    {
      exchange: 'Binance',
      status: 'connected',
      apiKey: 'bVx...K8d',
      permissions: ['Spot Trading', 'Futures', 'Read'],
      lastTest: '2 min ago',
      volume24h: 45672000
    },
    {
      exchange: 'Coinbase Pro',
      status: 'connected',
      apiKey: 'cBp...X2m',
      permissions: ['Spot Trading', 'Read'],
      lastTest: '5 min ago',
      volume24h: 23450000
    }
  ]);

  const chartData = [
    { time: '06:00', value: 10000 },
    { time: '08:00', value: 10850 },
    { time: '10:00', value: 11420 },
    { time: '12:00', value: 12180 },
    { time: '14:00', value: 12340 },
    { time: '16:00', value: 12548 }
  ];

  const performanceData = [
    { name: 'Grid Trading', value: 45, color: '#10b981' },
    { name: 'DCA', value: 30, color: '#3b82f6' },
    { name: 'Momentum', value: 25, color: '#8b5cf6' }
  ];

  // Conversione valuta
  const convertCurrency = (amount: number): string => {
    const currency = currencies.find(c => c.code === selectedCurrency);
    if (!currency) return `${amount.toFixed(2)}`;
    
    const converted = amount * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  // Gestione autenticazione
  const handleSocialLogin = (provider: 'google' | 'microsoft' | 'facebook') => {
    console.log(`Login with ${provider}`);
    setUser({
      id: '1',
      name: 'Vincenzo',
      email: 'vincenzo@example.com',
      plan: 'professional',
      provider,
      avatar: provider === 'google' ? '🔵' : provider === 'microsoft' ? '🟦' : '🟢'
    });
    setIsAuthenticated(true);
    setShowLoginModal(false);
    setShowWelcome(true);
    
    setTimeout(() => setShowWelcome(false), 3000);
  };

  const handleDemoLogin = () => {
    console.log('Demo login');
    setUser({
      id: 'demo',
      name: 'Enterprise Demo',
      email: 'enterprise@demo.com',
      plan: 'enterprise',
      provider: 'demo',
      avatar: '👑'
    });
    setIsAuthenticated(true);
    setShowLoginModal(false);
    setShowWelcome(true);
    
    setTimeout(() => setShowWelcome(false), 3000);
  };

  // Filtro e ricerca trader
  const getFilteredAndSortedTraders = () => {
    let filtered = copyTraders.filter(trader => {
      // Filtro per ricerca
      const matchesSearch = trader.name.toLowerCase().includes(traderSearchQuery.toLowerCase()) ||
                           trader.country.toLowerCase().includes(traderSearchQuery.toLowerCase());
      
      // Filtro per categoria
      if (traderFilter === 'verified') return matchesSearch && trader.verified;
      if (traderFilter === 'topPerformers') return matchesSearch && trader.winRate > 90;
      
      return matchesSearch;
    });

    // Ordinamento
    filtered.sort((a, b) => {
      switch (traderSortBy) {
        case 'winRate':
          return b.winRate - a.winRate;
        case 'totalReturn':
          return b.totalReturn - a.totalReturn;
        case 'followers':
          return b.followers - a.followers;
        case 'riskScore':
          return a.riskScore - b.riskScore; // Rischio più basso per primo
        default:
          return b.winRate - a.winRate;
      }
    });

    return filtered;
  };

  // Logo reale del progetto
  const MarketGeniusLogo = ({ size = 'normal' }: { size?: 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge' }) => {
    const sizeClasses = {
      small: 'w-8 h-8',
      normal: 'w-12 h-12',
      large: 'w-16 h-16',
      xlarge: 'w-18 h-16',
      xxlarge: 'w-32 h-28'
    };

    return (
      <div className="flex items-center">
        <div className="relative">
          <img 
            src="/logo.png" 
            alt="Market Genius Logo" 
            className={`${sizeClasses[size]} object-contain rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200`}
            onError={(e) => {
              // Fallback al logo SVG se l'immagine non carica
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
          <div className={`${sizeClasses[size]} bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200 hidden`}>
            <div className="relative">
              <Sparkles className="w-6 h-6 text-black" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 📱 COMPONENTI UI (definiti prima dei return)
  
  // Demo Mode Only Screen
  const DemoModeOnlyScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Demo Mode Only</h2>
            <p className="text-gray-300 text-lg mb-6">
              This application requires backend configuration to function properly.
            </p>
          </div>
          
          <div className="bg-black/20 rounded-xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Contact for Full Access
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              To get the fully functional version with real data and backend integration:
            </p>
            <a 
              href="mailto:vincenzo.gallo77@hotmail.com?subject=Trading Suite Pro - Full Version Request" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              vincenzo.gallo77@hotmail.com
            </a>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p>✨ Full version includes:</p>
            <ul className="list-disc list-inside text-left mt-2 space-y-1">
              <li>Real trading data</li>
              <li>Backend integration</li>
              <li>Unlimited access</li>
              <li>Professional support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Welcome Modal
  const WelcomeModal = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/95 to-teal-900/95 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/98 backdrop-blur-xl p-8 rounded-3xl max-w-lg w-full mx-4 shadow-2xl text-center transform animate-pulse border border-white/30">
        <div className="flex justify-center mb-6">
          <MarketGeniusLogo size="xlarge" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
          {t('welcome')} {user?.name}!
        </h2>
        <p className="text-gray-600 text-lg mb-4 font-medium">{t('welcomeMessage')}</p>
        {user?.plan === 'demo' && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 rounded-lg">
            <p className="text-yellow-800 text-sm font-medium">{t('demoMode')} - Dati simulati</p>
          </div>
        )}
      </div>
    </div>
  );

  // Login Modal migliorato
  const LoginModal = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/96 to-teal-900/96 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-white/98 backdrop-blur-xl p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl border border-white/40">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <MarketGeniusLogo size="xlarge" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            {t('loginTitle')}
          </h2>
          <p className="text-gray-600 font-medium">{t('loginSubtitle')}</p>
        </div>
        
        <div className="space-y-4">
          {/* Demo Account Button */}
          <button 
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center gap-3 p-4 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 rounded-xl hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Shield className="w-5 h-5 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" />
            <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t('demoAccount')}</span>
            <Sparkles className="w-4 h-4 animate-pulse bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" />
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-black font-bold" style={{color: '#000000 !important'}}>o accedi con</span>
            </div>
          </div>

          <button 
            onClick={() => handleSocialLogin('google')}
            className="social-btn group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="font-bold text-black" style={{color: '#000000 !important'}}>{t('continueWith')} Google</span>
          </button>
          
          <button 
            onClick={() => handleSocialLogin('microsoft')}
            className="social-btn group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#f25022" d="M0 0h11v11H0z"/>
                <path fill="#00a4ef" d="M13 0h11v11H13z"/>
                <path fill="#7fba00" d="M0 13h11v11H0z"/>
                <path fill="#ffb900" d="M13 13h11v11H13z"/>
              </svg>
            </div>
            <span className="font-bold text-black" style={{color: '#000000 !important'}}>{t('continueWith')} Microsoft</span>
          </button>
          
          <button 
            onClick={() => handleSocialLogin('facebook')}
            className="social-btn group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="font-bold text-black" style={{color: '#000000 !important'}}>{t('continueWith')} Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );

  // MAIN RENDER - CHECK STATES FIRST
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl font-semibold animate-pulse">
          Loading Trading Suite Pro...
        </div>
      </div>
    );
  }

  if (demoModeOnly) {
    return <DemoModeOnlyScreen />;
  }

  if (!isAuthenticated) {
    return <LoginModal />;
  }





  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{t('totalBalance')}</p>
              <p className="text-2xl font-bold text-gray-900">{convertCurrency(portfolioValue)}</p>
              <p className="text-green-500 text-sm font-semibold">+11.02%</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
              <DollarSign className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{t('totalPnL')}</p>
              <p className="text-2xl font-bold text-green-600">{convertCurrency(totalPnL)}</p>
              <p className="text-green-500 text-sm font-semibold">+11.02%</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{t('activeStrategies')}</p>
              <p className="text-2xl font-bold text-gray-900">{strategies.filter(s => s.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
              <Activity className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{t('winRate')}</p>
              <p className="text-2xl font-bold text-gray-900">{winRate}%</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
              <Star className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <h3 className="text-gray-900 text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-black" />
            {t('pnlHistory')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#colorPnl)" />
              <defs>
                <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card">
          <h3 className="text-gray-900 text-lg font-bold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-black" />
            {t('strategyPerformance')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {performanceData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategies */}
      <div className="glass-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-900 text-xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-black" />
            {t('tradingStrategies')}
          </h3>
          <button 
            onClick={() => user?.plan === 'demo' ? handleLockedFeature('Add Strategy') : console.log('Add strategy')}
            className="modern-btn-primary"
          >
            <Plus className="w-4 h-4" />
            {t('addStrategy')}
          </button>
        </div>
        
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="strategy-card-modern">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-gray-900 font-bold">{strategy.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      strategy.status === 'active' ? 'bg-green-100 text-green-800' :
                      strategy.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {strategy.status}
                    </span>
                    {strategy.risk === 'HIGH' && <AlertCircle className="w-4 h-4 text-red-500" />}
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{strategy.pair} • {strategy.type}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs font-medium">P&L</p>
                      <p className={`font-bold ${strategy.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {convertCurrency(strategy.pnl)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium">{t('winRate')}</p>
                      <p className="font-bold text-gray-900">{strategy.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium">Trades</p>
                      <p className="font-bold text-gray-900">{strategy.trades}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium">Risk</p>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        strategy.risk === 'LOW' ? 'bg-green-100 text-green-800' :
                        strategy.risk === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {strategy.risk}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium">Duration</p>
                      <p className="font-bold text-gray-900">{strategy.duration}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 ml-4">
                  {strategy.status === 'active' ? (
                    <button 
                      onClick={() => handleLockedFeature('Pause Strategy')}
                      className="action-btn-small action-btn-warning"
                    >
                      <Pause className="w-3 h-3" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleLockedFeature('Resume Strategy')}
                      className="action-btn-small action-btn-success"
                    >
                      <Play className="w-3 h-3" />
                    </button>
                  )}
                  <button 
                    onClick={() => handleLockedFeature('View Strategy Details')}
                    className="action-btn-small action-btn-info"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => handleLockedFeature('Stop Strategy')}
                    className="action-btn-small action-btn-danger"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCopyTrading = () => (
    <div className="space-y-6">
      <div className="glass-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-900 text-xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-black" />
            {t('professionalTraders')}
          </h3>
          <div className="text-gray-500 text-sm">
            {getFilteredAndSortedTraders().length} {t('allTraders').toLowerCase()}
          </div>
        </div>

        {/* Controlli di ricerca e filtro */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barra di ricerca */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={traderSearchQuery}
                onChange={(e) => setTraderSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 transition-all duration-200 shadow-sm"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Filtro categoria */}
            <select
              value={traderFilter}
              onChange={(e) => setTraderFilter(e.target.value)}
              className="modern-select min-w-[160px]"
            >
              <option value="all">{t('allTraders')}</option>
              <option value="verified">{t('verified')}</option>
              <option value="topPerformers">{t('topPerformers')}</option>
            </select>

            {/* Ordinamento */}
            <select
              value={traderSortBy}
              onChange={(e) => setTraderSortBy(e.target.value)}
              className="modern-select min-w-[160px]"
            >
              <option value="winRate">{t('sortByWinRate')}</option>
              <option value="totalReturn">{t('sortByReturn')}</option>
              <option value="followers">{t('sortByFollowers')}</option>
              <option value="riskScore">{t('sortByRisk')}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getFilteredAndSortedTraders().map((trader) => (
            <div key={trader.id} className="trader-card-modern">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{trader.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-gray-900 font-bold">{trader.name}</h4>
                    {trader.verified && <CheckCircle className="w-5 h-5 text-blue-500" />}
                    <span className="text-lg">{trader.country}</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{trader.followers} {t('followers')}</p>
                </div>
                <button
                  onClick={() => handleLockedFeature('Copy Trading')}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                    trader.following 
                      ? 'bg-red-100 hover:bg-red-200 text-red-700' 
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                  }`}
                >
                  {trader.following ? t('unfollow') : t('follow')}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 text-xs font-medium">{t('winRate')}</p>
                  <p className="text-green-600 font-bold">{trader.winRate}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">Total Return</p>
                  <p className="text-green-600 font-bold">+{trader.totalReturn}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">Monthly Return</p>
                  <p className="text-green-600 font-bold">+{trader.monthlyReturn}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">Risk Score</p>
                  <p className="text-gray-900 font-bold">{trader.riskScore}/10</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">{trader.strategies} strategies</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleLockedFeature('View Trader Details')}
                    className="action-btn action-btn-info"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleLockedFeature('Copy Portfolio')}
                    className="action-btn action-btn-default"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBacktest = () => (
    <div className="space-y-6">
      <div className="glass-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-900 text-xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-black" />
            {t('aiBacktestEngine')}
          </h3>
          <button 
            onClick={() => handleLockedFeature('AI Backtest')}
            className="modern-btn-secondary"
          >
            <TestTube className="w-4 h-4" />
            {t('newBacktest')}
          </button>
        </div>
        
        <div className="space-y-4">
          {backtestResults.map((result) => (
            <div key={result.id} className="backtest-card-modern">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-gray-900 font-bold text-lg">{result.name}</h4>
                  <p className="text-gray-500 text-sm font-medium">Period: {result.period}</p>
                </div>
                <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-700 font-bold text-sm">{result.aiConfidence}% {t('aiConfidence')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div>
                  <p className="text-gray-500 text-xs font-medium">{t('returns')}</p>
                  <p className="text-green-600 font-bold">+{result.returns}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">{t('sharpeRatio')}</p>
                  <p className="text-gray-900 font-bold">{result.sharpeRatio}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">{t('maxDrawdown')}</p>
                  <p className="text-red-600 font-bold">{result.maxDrawdown}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">{t('winRate')}</p>
                  <p className="text-green-600 font-bold">{result.winRate}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">Trades</p>
                  <p className="text-gray-900 font-bold">{result.totalTrades}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleLockedFeature('View Backtest Details')}
                    className="action-btn action-btn-info"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleLockedFeature('Download Report')}
                    className="action-btn action-btn-success"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      {/* Pricing Plans */}
      <div className="glass-card">
        <h3 className="text-gray-900 text-xl font-bold mb-6 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-black" />
          {t('pricingPlans')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.recommended ? 'pricing-card-recommended' : ''}`}>
              {plan.recommended && (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-3 py-1 rounded-full mb-4 w-fit font-bold">
                  ⭐ {t('recommended')}
                </div>
              )}
              <h4 className="text-gray-900 font-bold text-2xl mb-2">{plan.name}</h4>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{convertCurrency(plan.price)}</span>
                <span className="text-gray-500 font-medium">{t('monthlyPrice')}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 font-medium flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleLockedFeature(`Upgrade to ${plan.name}`)}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
                  plan.recommended 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {user?.plan === plan.name.toLowerCase() ? `✓ ${t('currentPlan')}` : t('upgrade')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* API Connections */}
      <div className="glass-card">
        <h3 className="text-gray-900 text-xl font-bold mb-6 flex items-center gap-2">
          <Key className="w-6 h-6 text-black" />
          {t('apiConnections')}
        </h3>
        <div className="space-y-4">
          {apiConnections.map((connection, index) => (
            <div key={index} className="api-connection-card">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full shadow-lg ${
                    connection.status === 'connected' ? 'bg-green-500 animate-pulse' :
                    connection.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg">{connection.exchange}</h4>
                    <p className="text-gray-500 font-medium">
                      {connection.apiKey || 'Non configurato'} • Last test: {connection.lastTest}
                    </p>
                    {connection.volume24h && (
                      <p className="text-gray-400 text-sm">Volume 24h: ${(connection.volume24h / 1000000).toFixed(1)}M</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleLockedFeature('Test API Connection')}
                    className="action-btn action-btn-info"
                  >
                    <Wifi className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleLockedFeature('Configure API')}
                    className="action-btn action-btn-default"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {connection.permissions.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {connection.permissions.map((perm, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                      {perm}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {showWelcome && <WelcomeModal />}
      
      {/* 🎯 Demo Timer Banner - REMOVED */}
      
      {/* Demo Expired Banner */}
      {demoExpired && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white py-4 px-6 z-[60] shadow-2xl border-b border-red-400">
          <div className="flex items-center justify-center gap-4 max-w-6xl mx-auto">
            <Lock className="w-6 h-6 text-red-300" />
            <span className="font-bold text-xl text-red-200 drop-shadow-lg">
              🔒 Demo Session Ended - Contact vincenzo.gallo77@hotmail.com for Full Access!
            </span>
          </div>
        </div>
      )}
      
      {/* Mobile menu button */}
      <div className="lg:hidden fixed left-4 top-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-200"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 modern-sidebar backdrop-blur-xl border-r border-white/20 p-6 transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40`}>
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <MarketGeniusLogo size="xlarge" />
        </div>

        {/* Language & Currency */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">{t('language')}</label>
            <select 
              value={selectedLanguage}
              onChange={(e) => {
                const newLang = e.target.value;
                setSelectedLanguage(newLang);
                i18n.changeLanguage(newLang);
              }}
              className="modern-select"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">{t('currency')}</label>
            <select 
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="modern-select"
            >
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`nav-item ${currentView === 'dashboard' ? 'nav-item-active' : ''}`}
          >
            <BarChart3 className="w-5 h-5" />
            {t('dashboard')}
          </button>
          
          <button
            onClick={() => setCurrentView('copy-trading')}
            className={`nav-item ${currentView === 'copy-trading' ? 'nav-item-active' : ''}`}
          >
            <Users className="w-5 h-5" />
            {t('copyTrading')}
          </button>
          
          <button
            onClick={() => setCurrentView('backtest')}
            className={`nav-item ${currentView === 'backtest' ? 'nav-item-active' : ''}`}
          >
            <TestTube className="w-5 h-5" />
            {t('aiBacktest')}
          </button>
          
          <button
            onClick={() => setCurrentView('api-settings')}
            className={`nav-item ${currentView === 'api-settings' ? 'nav-item-active' : ''}`}
          >
            <Settings className="w-5 h-5" />
            {t('apiSettings')}
          </button>
          
          {user?.plan !== 'demo' && (
            <button
              onClick={() => setCurrentView('admin')}
              className={`nav-item ${currentView === 'admin' ? 'nav-item-active' : ''}`}
            >
              <Shield className="w-5 h-5" />
              Admin Panel
            </button>
          )}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="user-profile-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                {user?.avatar || user?.name?.charAt(0)}
              </div>
              <div>
                <p className="text-gray-900 font-bold">{user?.name}</p>
                <p className="text-gray-500 text-xs font-medium capitalize">
                  {user?.plan === 'demo' ? '🚀 Demo Plan' : `✨ ${user?.plan} Plan`}
                </p>
              </div>
            </div>
            {user?.plan === 'demo' && (
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('upgrade')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className={`lg:ml-64 p-6`}>
        {/* Demo Data Disclaimer */}
        {user?.plan === 'demo' && (
          <div className="mb-8 mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-xl p-4 mx-2">
            <div className="flex items-center gap-3 text-yellow-900">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-bold">
                📊 <strong>Dati Dimostrativi</strong> - Tutti i dati finanziari sono simulati. L'app non garantisce guadagni reali.
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {currentView === 'dashboard' && t('dashboard')}
              {currentView === 'copy-trading' && t('copyTrading')}
              {currentView === 'backtest' && t('aiBacktest')}
              {currentView === 'api-settings' && t('apiSettings')}
              {currentView === 'admin' && 'Admin Panel'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {t('live')}
              </div>
              {user?.plan === 'demo' && (
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    🚀 {t('demoMode')}
                  </div>
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {Math.floor(remainingTime)}m{demoSession && `:${String(Math.floor(demoSession.getRemainingSeconds() % 60)).padStart(2, '0')}s`}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => user?.plan === 'demo' ? handleLockedFeature('Add Strategy') : console.log('Add strategy')}
              className="modern-btn-primary"
            >
              <Plus className="w-4 h-4" />
              {t('addStrategy')}
            </button>
          </div>
        </div>

        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'copy-trading' && renderCopyTrading()}
        {currentView === 'backtest' && renderBacktest()}
        {currentView === 'api-settings' && renderApiSettings()}
        {currentView === 'admin' && <AdminDashboard />}
      </div>

      {/* Upgrade Modal - MENO TRASPARENTE */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-gray-900 text-2xl font-bold mb-3">{t('upgradeRequired')}</h3>
              <p className="text-gray-600 mb-6 font-medium">
                {t('featureRequires')}
              </p>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg mb-6">
                <p className="text-emerald-800 text-sm font-medium">
                  📧 Contact vincenzo.gallo77@hotmail.com for immediate upgrade!
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowUpgradeModal(false);
                    setCurrentView('api-settings');
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {t('upgrade')}
                </button>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-colors"
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
