# Trading Suite Pro - Demo Version

**AI-Powered Cryptocurrency & Forex Trading Platform**

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-proprietary-red.svg)](LICENSE.txt)

A professional trading dashboard with real-time analytics, copy trading, AI backtesting, and portfolio management. Built with React and TypeScript.

> **Important:** This is a demo version with simulated data. It is not connected to real markets and should not be used for actual trading decisions. Past performance shown is entirely fictional. Always consult a qualified financial advisor before investing.

---

## Screenshots

<img width="100%" alt="Login" src="https://github.com/user-attachments/assets/b4c83035-77c7-464e-9dbc-4f0d6916fa92" />

<img width="100%" alt="Dashboard" src="https://github.com/user-attachments/assets/0b7301d9-f8a8-4917-af79-1cf6e3182e39" />

<img width="100%" alt="Copy Trading" src="https://github.com/user-attachments/assets/8e615a54-64f5-4dad-853b-c8a811049584" />

<img width="100%" alt="AI Backtest" src="https://github.com/user-attachments/assets/199536d3-c9a1-4f99-991c-41dc0197be9b" />

<img width="100%" alt="API Settings" src="https://github.com/user-attachments/assets/6878b52a-ec4c-4953-9f3d-87b324f821a0" />

---

## Features

- **Real-time Dashboard** — Interactive charts and statistics with simulated market data
- **Copy Trading** — Automated strategy mirroring with demo trader profiles
- **AI Backtest Engine** — Run backtests with simulated ML-driven results
- **Exchange API Integration** — Configuration panel for connecting exchange APIs
- **Multi-language** — English, Italian, and Spanish support
- **Responsive Design** — Optimized for desktop and mobile
- **Demo Timer** — Built-in countdown with upgrade prompts

---

## Quick Start

```bash
git clone https://github.com/vinsblack/trading-suite-pro-demo.git
cd trading-suite-pro-demo

npm install
npm start
```

The app runs immediately with built-in demo data. No configuration required.

Open [http://localhost:3000](http://localhost:3000) and click "Try Demo Account" to explore.

---

## Demo Walkthrough

1. Launch the app and click **Try Demo Account** on the login screen
2. Explore the **Dashboard** with simulated real-time charts and portfolio stats
3. Browse **Copy Trading** to see demo trader profiles and simulated performance
4. Run the **AI Backtest** engine with pre-configured simulated results
5. Check **API Settings** with pricing tiers for the full version
6. Premium features display upgrade prompts directing to the commercial version

---

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for interactive charts
- **i18next** for internationalization
- **Lucide Icons** for iconography
- **Google Drive API** (optional, for custom data sources)

---

## Project Structure

```
src/
├── components/      # React components
├── services/        # Demo data system and optional Google Drive integration
├── styles/          # CSS stylesheets
└── App.tsx          # Main application entry point

GOOGLE_DRIVE_FILES/  # Example templates for custom configurations (optional)
```

---

## Optional Configuration

The app works out of the box with hardcoded demo data. Google Drive integration is available for loading custom datasets:

1. Copy `src/services/DriveAPI-EXAMPLE.js` to `src/services/DriveAPI.js`
2. Configure your Google Drive API credentials
3. Place custom JSON files in the `GOOGLE_DRIVE_FILES/` directory

---

## Commercial Version

The full version includes real market data integration, live exchange API connections, and personalized support.

**Contact:** vincenzo.gallo77@hotmail.com

What's included:

- Live exchange API integration (Binance, Coinbase, Kraken, etc.)
- Real-time market data feeds
- Google Drive backend configuration
- Dedicated setup and onboarding support
- Priority bug fixes and feature requests

---

## Disclaimer

All financial data displayed in this application is **simulated**. Trader profiles are **fictional**. Performance results are **generated for demonstration purposes only**. This software has no connection to real financial markets.

This application does not constitute financial advice. Do not use it for real investment decisions. The developer assumes no responsibility for financial losses of any kind.

---

## License

Proprietary — see [LICENSE.txt](LICENSE.txt) for details.

---

## Contact

**Vincenzo Gallo** — Full Stack Developer

- Email: vincenzo.gallo77@hotmail.com
- GitHub: [vinsblack](https://github.com/vinsblack)
- Location: Salerno, Italy
