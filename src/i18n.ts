import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
const resources = {
  en: {
    translation: {
      // Common
      'save': 'Save',
      'cancel': 'Cancel',
      'edit': 'Edit',
      'delete': 'Delete',
      'view': 'View',
      'loading': 'Loading...',
      'saving': 'Saving...',
      
      // Login & Welcome
      'loginTitle': 'Welcome to Market Genius',
      'loginSubtitle': 'Start your trading journey with the most advanced AI platform',
      'demoAccount': 'Demo Account',
      'welcomeTitle': 'Welcome to Market Genius',
      'welcomeSubtitle': 'Start your trading journey with the most advanced AI platform',
      'getStarted': 'Get Started',
      'learnMore': 'Learn More',
      
      // Dashboard sections
      'adminDashboard': 'Admin Dashboard',
      'billingDashboard': 'Billing',
      'whiteLabelStudio': 'White-Label Studio',
      
      // White-Label Studio
      'createBrandExperience': 'Create your perfect brand experience with live preview',
      'saveChanges': 'Save Changes',
      'brandIdentity': 'Brand Identity',
      'colorsTheme': 'Colors & Theme',
      'typography': 'Typography',
      'layoutStyle': 'Layout & Style',
      'domainSSL': 'Domain & SSL',
      'contactSocial': 'Contact & Social',
      
      // Company Identity
      'companyIdentity': 'Company Identity',
      'companyName': 'Company Name',
      'companyNamePlaceholder': 'Your Company Name',
      'tagline': 'Tagline',
      'taglinePlaceholder': 'Your company tagline',
      'description': 'Description',
      'descriptionPlaceholder': 'Brief description of your company...',
      
      // Brand Assets
      'brandAssets': 'Brand Assets',
      'mainLogo': 'Main Logo',
      'changeLogo': 'Change Logo',
      'uploadLogo': 'Upload Logo',
      'uploading': 'Uploading...',
      'favicon': 'Favicon',
      'changeFavicon': 'Change',
      'uploadFavicon': 'Upload Favicon',
      'fileFormat': 'PNG, JPG up to 2MB',
      
      // Live Preview
      'livePreview': 'Live Preview',
      'welcomeTo': 'Welcome to',
      'yourPlatform': 'Your Platform',
      'yourCompanyDescription': 'Your company description will appear here',
      'feature1': 'Feature 1',
      'feature2': 'Feature 2',
      
      // Colors
      'quickColorPalettes': 'Quick Color Palettes',
      'oceanBlue': 'Ocean Blue',
      'forestGreen': 'Forest Green',
      'sunsetOrange': 'Sunset Orange',
      'royalPurple': 'Royal Purple',
      'cherryRed': 'Cherry Red',
      'midnightDark': 'Midnight Dark',
      'primaryColors': 'Primary Colors',
      'primaryColor': 'Primary Color',
      'mainBrandColor': 'Main brand color',
      'secondaryColor': 'Secondary Color',
      'successHighlights': 'Success & highlights',
      'accentColor': 'Accent Color',
      'linksDecorations': 'Links & decorations',
      'systemColors': 'System Colors',
      'successColor': 'Success Color',
      'warningColor': 'Warning Color',
      'errorColor': 'Error Color',
      'colorPreview': 'Color Preview',
      'primary': 'Primary',
      'secondary': 'Secondary',
      'accent': 'Accent',
      'gradient': 'Gradient',
      'primaryAccent': 'Primary + Accent',
      
      // Contact Information
      'contactInformation': 'Contact Information',
      'contactEmail': 'Contact Email',
      'contactEmailPlaceholder': 'contact@yourcompany.com',
      'supportEmail': 'Support Email',
      'supportEmailPlaceholder': 'support@yourcompany.com',
      'phoneNumber': 'Phone Number',
      'phoneNumberPlaceholder': '+1 (555) 123-4567',
      'companyAddress': 'Company Address',
      'companyAddressPlaceholder': '123 Business Street\nCity, State\nCountry',
      
      // Social Media
      'socialMedia': 'Social Media',
      'facebook': 'Facebook',
      'facebookPlaceholder': 'https://facebook.com/yourpage',
      'twitter': 'Twitter',
      'twitterPlaceholder': 'https://twitter.com/yourhandle',
      'linkedin': 'LinkedIn',
      'linkedinPlaceholder': 'https://linkedin.com/company/yourcompany',
      'instagram': 'Instagram',
      'instagramPlaceholder': 'https://instagram.com/yourprofile',
      
      // Pricing Plans
      'planDemo': 'Demo',
      'planProfessional': 'Professional', 
      'planEnterprise': 'Enterprise',
      'planDemoFeatures': ['Simulated data', 'Basic strategies', 'Community support'],
      'planProfessionalFeatures': ['Real exchange APIs', 'Advanced strategies', 'Priority support', 'Copy trading'],
      'planEnterpriseFeatures': ['All Professional', 'Multi-exchange', 'Advanced AI analytics', 'Dedicated manager'],
      'monthlyPrice': '/month',
      
      // Coming Soon
      'typographySettings': 'Typography Settings',
      'fontCustomization': 'Font customization coming soon...',
      'layoutConfiguration': 'Layout Configuration',
      'advancedLayoutOptions': 'Advanced layout options coming soon...',
      'domainSSLManagement': 'Domain & SSL Management',
      'domainConfiguration': 'Domain configuration coming soon...'
    }
  },
  it: {
    translation: {
      // Common
      'save': 'Salva',
      'cancel': 'Annulla',
      'edit': 'Modifica',
      'delete': 'Elimina',
      'view': 'Visualizza',
      'loading': 'Caricamento...',
      'saving': 'Salvataggio...',
      
      // Login & Welcome
      'loginTitle': 'Benvenuto in Market Genius',
      'loginSubtitle': 'Inizia il tuo percorso di trading con la piattaforma AI più avanzata',
      'demoAccount': 'Account Demo',
      'welcomeTitle': 'Benvenuto in Market Genius',
      'welcomeSubtitle': 'Inizia il tuo percorso di trading con la piattaforma AI più avanzata',
      'getStarted': 'Inizia',
      'learnMore': 'Scopri di più',
      
      // Dashboard sections
      'adminDashboard': 'Pannello Amministrazione',
      'billingDashboard': 'Fatturazione',
      'whiteLabelStudio': 'Studio White-Label',
      
      // White-Label Studio
      'createBrandExperience': 'Crea la tua esperienza di brand perfetta con anteprima live',
      'saveChanges': 'Salva Modifiche',
      'brandIdentity': 'Identità del Brand',
      'colorsTheme': 'Colori e Tema',
      'typography': 'Tipografia',
      'layoutStyle': 'Layout e Stile',
      'domainSSL': 'Dominio e SSL',
      'contactSocial': 'Contatti e Social',
      
      // Company Identity
      'companyIdentity': 'Identità Aziendale',
      'companyName': 'Nome Azienda',
      'companyNamePlaceholder': 'Il Nome della Tua Azienda',
      'tagline': 'Slogan',
      'taglinePlaceholder': 'Lo slogan della tua azienda',
      'description': 'Descrizione',
      'descriptionPlaceholder': 'Breve descrizione della tua azienda...',
      
      // Brand Assets
      'brandAssets': 'Asset del Brand',
      'mainLogo': 'Logo Principale',
      'changeLogo': 'Cambia Logo',
      'uploadLogo': 'Carica Logo',
      'uploading': 'Caricamento...',
      'favicon': 'Favicon',
      'changeFavicon': 'Cambia',
      'uploadFavicon': 'Carica Favicon',
      'fileFormat': 'PNG, JPG fino a 2MB',
      
      // Live Preview
      'livePreview': 'Anteprima Live',
      'welcomeTo': 'Benvenuto in',
      'yourPlatform': 'La Tua Piattaforma',
      'yourCompanyDescription': 'La descrizione della tua azienda apparirà qui',
      'feature1': 'Funzione 1',
      'feature2': 'Funzione 2',
      
      // Colors
      'quickColorPalettes': 'Palette Colori Rapide',
      'oceanBlue': 'Blu Oceano',
      'forestGreen': 'Verde Foresta',
      'sunsetOrange': 'Arancione Tramonto',
      'royalPurple': 'Viola Reale',
      'cherryRed': 'Rosso Ciliegia',
      'midnightDark': 'Nero Mezzanotte',
      'primaryColors': 'Colori Principali',
      'primaryColor': 'Colore Primario',
      'mainBrandColor': 'Colore principale del brand',
      'secondaryColor': 'Colore Secondario',
      'successHighlights': 'Successo ed evidenziature',
      'accentColor': 'Colore di Accento',
      'linksDecorations': 'Link e decorazioni',
      'systemColors': 'Colori di Sistema',
      'successColor': 'Colore di Successo',
      'warningColor': 'Colore di Avviso',
      'errorColor': 'Colore di Errore',
      'colorPreview': 'Anteprima Colori',
      'primary': 'Primario',
      'secondary': 'Secondario',
      'accent': 'Accento',
      'gradient': 'Gradiente',
      'primaryAccent': 'Primario + Accento',
      
      // Contact Information
      'contactInformation': 'Informazioni di Contatto',
      'contactEmail': 'Email di Contatto',
      'contactEmailPlaceholder': 'contatto@tuaazienda.com',
      'supportEmail': 'Email di Supporto',
      'supportEmailPlaceholder': 'supporto@tuaazienda.com',
      'phoneNumber': 'Numero di Telefono',
      'phoneNumberPlaceholder': '+39 123 456 7890',
      'companyAddress': 'Indirizzo Aziendale',
      'companyAddressPlaceholder': 'Via delle Imprese 123\nCittà, Provincia\nItalia',
      
      // Social Media
      'socialMedia': 'Social Media',
      'facebook': 'Facebook',
      'facebookPlaceholder': 'https://facebook.com/tuapagina',
      'twitter': 'Twitter',
      'twitterPlaceholder': 'https://twitter.com/tuoaccount',
      'linkedin': 'LinkedIn',
      'linkedinPlaceholder': 'https://linkedin.com/company/tuaazienda',
      'instagram': 'Instagram',
      'instagramPlaceholder': 'https://instagram.com/tuoprofilo',
      
      // Pricing Plans
      'planDemo': 'Demo',
      'planProfessional': 'Professional',
      'planEnterprise': 'Enterprise', 
      'planDemoFeatures': ['Dati simulati', 'Strategie base', 'Supporto community'],
      'planProfessionalFeatures': ['API exchange reali', 'Strategie avanzate', 'Supporto prioritario', 'Copy trading'],
      'planEnterpriseFeatures': ['Tutto Professional', 'Multi-exchange', 'Analisi AI avanzate', 'Manager dedicato'],
      'monthlyPrice': '/mese',
      
      // Coming Soon
      'typographySettings': 'Impostazioni Tipografia',
      'fontCustomization': 'Personalizzazione font in arrivo...',
      'layoutConfiguration': 'Configurazione Layout',
      'advancedLayoutOptions': 'Opzioni layout avanzate in arrivo...',
      'domainSSLManagement': 'Gestione Dominio e SSL',
      'domainConfiguration': 'Configurazione dominio in arrivo...'
    }
  },
  es: {
    translation: {
      // Common
      'save': 'Guardar',
      'cancel': 'Cancelar',
      'edit': 'Editar',
      'delete': 'Eliminar',
      'view': 'Ver',
      'loading': 'Cargando...',
      'saving': 'Guardando...',
      
      // Login & Welcome
      'loginTitle': 'Bienvenido a Market Genius',
      'loginSubtitle': 'Inicia tu viaje de trading con la plataforma de IA más avanzada',
      'demoAccount': 'Cuenta Demo',
      'welcomeTitle': 'Bienvenido a Market Genius',
      'welcomeSubtitle': 'Inicia tu viaje de trading con la plataforma de IA más avanzada',
      'getStarted': 'Empezar',
      'learnMore': 'Saber Más',
      
      // Dashboard sections
      'adminDashboard': 'Panel de Administración',
      'billingDashboard': 'Facturación',
      'whiteLabelStudio': 'Estudio White-Label',
      
      // White-Label Studio
      'createBrandExperience': 'Crea tu experiencia de marca perfecta con vista previa en vivo',
      'saveChanges': 'Guardar Cambios',
      'brandIdentity': 'Identidad de Marca',
      'colorsTheme': 'Colores y Tema',
      'typography': 'Tipografía',
      'layoutStyle': 'Diseño y Estilo',
      'domainSSL': 'Dominio y SSL',
      'contactSocial': 'Contacto y Social',
      
      // Company Identity
      'companyIdentity': 'Identidad Corporativa',
      'companyName': 'Nombre de la Empresa',
      'companyNamePlaceholder': 'El Nombre de Tu Empresa',
      'tagline': 'Eslogan',
      'taglinePlaceholder': 'El eslogan de tu empresa',
      'description': 'Descripción',
      'descriptionPlaceholder': 'Breve descripción de tu empresa...',
      
      // Brand Assets
      'brandAssets': 'Recursos de Marca',
      'mainLogo': 'Logo Principal',
      'changeLogo': 'Cambiar Logo',
      'uploadLogo': 'Subir Logo',
      'uploading': 'Subiendo...',
      'favicon': 'Favicon',
      'changeFavicon': 'Cambiar',
      'uploadFavicon': 'Subir Favicon',
      'fileFormat': 'PNG, JPG hasta 2MB',
      
      // Live Preview
      'livePreview': 'Vista Previa en Vivo',
      'welcomeTo': 'Bienvenido a',
      'yourPlatform': 'Tu Plataforma',
      'yourCompanyDescription': 'La descripción de tu empresa aparecerá aquí',
      'feature1': 'Característica 1',
      'feature2': 'Característica 2',
      
      // Colors
      'quickColorPalettes': 'Paletas de Colores Rápidas',
      'oceanBlue': 'Azul Océano',
      'forestGreen': 'Verde Bosque',
      'sunsetOrange': 'Naranja Atardecer',
      'royalPurple': 'Púrpura Real',
      'cherryRed': 'Rojo Cereza',
      'midnightDark': 'Negro Medianoche',
      'primaryColors': 'Colores Primarios',
      'primaryColor': 'Color Primario',
      'mainBrandColor': 'Color principal de marca',
      'secondaryColor': 'Color Secundario',
      'successHighlights': 'Éxito y destacados',
      'accentColor': 'Color de Acento',
      'linksDecorations': 'Enlaces y decoraciones',
      'systemColors': 'Colores del Sistema',
      'successColor': 'Color de Éxito',
      'warningColor': 'Color de Advertencia',
      'errorColor': 'Color de Error',
      'colorPreview': 'Vista Previa de Colores',
      'primary': 'Primario',
      'secondary': 'Secundario',
      'accent': 'Acento',
      'gradient': 'Degradado',
      'primaryAccent': 'Primario + Acento',
      
      // Contact Information
      'contactInformation': 'Información de Contacto',
      'contactEmail': 'Email de Contacto',
      'contactEmailPlaceholder': 'contacto@tuempresa.com',
      'supportEmail': 'Email de Soporte',
      'supportEmailPlaceholder': 'soporte@tuempresa.com',
      'phoneNumber': 'Número de Teléfono',
      'phoneNumberPlaceholder': '+34 123 456 789',
      'companyAddress': 'Dirección de la Empresa',
      'companyAddressPlaceholder': 'Calle de los Negocios 123\nCiudad, Provincia\nEspaña',
      
      // Social Media
      'socialMedia': 'Redes Sociales',
      'facebook': 'Facebook',
      'facebookPlaceholder': 'https://facebook.com/tupagina',
      'twitter': 'Twitter',
      'twitterPlaceholder': 'https://twitter.com/tucuenta',
      'linkedin': 'LinkedIn',
      'linkedinPlaceholder': 'https://linkedin.com/company/tuempresa',
      'instagram': 'Instagram',
      'instagramPlaceholder': 'https://instagram.com/tuperfil',
      
      // Pricing Plans
      'planDemo': 'Demo',
      'planProfessional': 'Profesional',
      'planEnterprise': 'Empresarial',
      'planDemoFeatures': ['Datos simulados', 'Estrategias básicas', 'Soporte comunitario'],
      'planProfessionalFeatures': ['APIs de exchange reales', 'Estrategias avanzadas', 'Soporte prioritario', 'Copy trading'],
      'planEnterpriseFeatures': ['Todo Profesional', 'Multi-exchange', 'Análisis AI avanzados', 'Manager dedicado'],
      'monthlyPrice': '/mes',
      
      // Coming Soon
      'typographySettings': 'Configuración de Tipografía',
      'fontCustomization': 'Personalización de fuentes próximamente...',
      'layoutConfiguration': 'Configuración de Diseño',
      'advancedLayoutOptions': 'Opciones de diseño avanzadas próximamente...',
      'domainSSLManagement': 'Gestión de Dominio y SSL',
      'domainConfiguration': 'Configuración de dominio próximamente...'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Default to English
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;