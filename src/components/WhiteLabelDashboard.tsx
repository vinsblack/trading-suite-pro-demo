/**
 * White-Label Management Dashboard - Redesigned
 * Personalizzazione completa brand e interfaccia con live preview
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Palette, Upload, Globe, Eye,
  Type, Layout, Smartphone, Monitor,
  Save, Paintbrush, Shield,
  Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram,
  Sparkles, Heart, Camera, RefreshCw
} from 'lucide-react';

// Types
interface CompanyAddress {
  street?: string;
  city?: string;
  country?: string;
  postal_code?: string;
}

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

interface BrandingTheme {
  id: string;
  company_name: string;
  company_tagline?: string;
  company_description?: string;
  logo_url?: string;
  logo_dark_url?: string;
  favicon_url?: string;
  background_image_url?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  neutral_color: string;
  success_color: string;
  warning_color: string;
  error_color: string;
  font_family: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  border_radius: string;
  shadow_intensity: string;
  spacing_unit: string;
  custom_domain?: string;
  domain_verified: boolean;
  contact_email?: string;
  support_email?: string;
  contact_phone?: string;
  company_address?: CompanyAddress;
  social_links?: SocialLinks;
  terms_of_service?: string;
  privacy_policy?: string;
  custom_css?: string;
  analytics_code?: string;
  feature_flags?: object;
  is_active: boolean;
  preview_mode: boolean;
}

interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

const WhiteLabelDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState('branding');
  const [theme, setTheme] = useState<BrandingTheme | null>(null);
  // const [, setPreviewMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAsset, setUploadingAsset] = useState<string | null>(null);

  // Color palettes predefinite
  const colorPalettes: ColorPalette[] = [
    {
      name: t('oceanBlue'),
      primary: '#3b82f6',
      secondary: '#10b981',
      accent: '#06b6d4'
    },
    {
      name: t('forestGreen'),
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399'
    },
    {
      name: t('sunsetOrange'),
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c'
    },
    {
      name: t('royalPurple'),
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa'
    },
    {
      name: t('cherryRed'),
      primary: '#ef4444',
      secondary: '#dc2626',
      accent: '#f87171'
    },
    {
      name: t('midnightDark'),
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#6b7280'
    }
  ];

  const tabs = [
    {
      id: 'branding',
      label: t('brandIdentity'),
      icon: Palette,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'colors',
      label: t('colorsTheme'),
      icon: Paintbrush,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'typography',
      label: t('typography'),
      icon: Type,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'layout',
      label: t('layoutStyle'),
      icon: Layout,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'domain',
      label: t('domainSSL'),
      icon: Globe,
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'contact',
      label: t('contactSocial'),
      icon: Mail,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    setLoading(true);
    
    // Mock data per demo - In produzione verrebbe da API
    const mockTheme: BrandingTheme = {
      id: 'theme_1',
      company_name: 'ACME Trading Pro',
      company_tagline: 'Professional Trading Excellence',
      company_description: 'Advanced algorithmic trading platform powered by AI and machine learning',
      logo_url: '/logo.png',
      favicon_url: '/favicon.ico',
      primary_color: '#3b82f6',
      secondary_color: '#10b981',
      accent_color: '#8b5cf6',
      neutral_color: '#6b7280',
      success_color: '#10b981',
      warning_color: '#f59e0b',
      error_color: '#ef4444',
      font_family: 'Inter',
      font_size_base: '16px',
      font_weight_normal: '400',
      font_weight_bold: '600',
      border_radius: '12px',
      shadow_intensity: 'medium',
      spacing_unit: '16px',
      custom_domain: 'trading.acme.com',
      domain_verified: true,
      contact_email: 'contact@acme.com',
      support_email: 'support@acme.com',
      contact_phone: '+1 (555) 123-4567',
      company_address: {
        street: '123 Trading Street',
        city: 'New York',
        country: 'USA',
        postal_code: '10001'
      },
      social_links: {
        facebook: 'https://facebook.com/acme',
        twitter: 'https://twitter.com/acme',
        linkedin: 'https://linkedin.com/company/acme',
        instagram: 'https://instagram.com/acme'
      },
      is_active: true,
      preview_mode: true
    };

    setTheme(mockTheme);
    setLoading(false);
  };

  const handleThemeUpdate = (updates: Partial<BrandingTheme>) => {
    if (!theme) return;
    
    const updatedTheme = { ...theme, ...updates };
    setTheme(updatedTheme);
    
    // Apply live color changes to the page
    if (updates.primary_color) {
      document.documentElement.style.setProperty('--brand-primary', updates.primary_color);
    }
    if (updates.secondary_color) {
      document.documentElement.style.setProperty('--brand-secondary', updates.secondary_color);
    }
    if (updates.accent_color) {
      document.documentElement.style.setProperty('--brand-accent', updates.accent_color);
    }
  };

  const handleColorPaletteSelect = (palette: ColorPalette) => {
    handleThemeUpdate({
      primary_color: palette.primary,
      secondary_color: palette.secondary,
      accent_color: palette.accent
    });
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaving(false);
    // Show success message
  };

  const handleAssetUpload = async (assetType: string, file: File) => {
    setUploadingAsset(assetType);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockUrl = URL.createObjectURL(file);
    handleThemeUpdate({ [assetType + '_url']: mockUrl });
    setUploadingAsset(null);
  };

  const renderBrandingTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Company Information */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{t('companyIdentity')}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('companyName')}</label>
              <input
                type="text"
                value={theme?.company_name || ''}
                onChange={(e) => handleThemeUpdate({ company_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent font-semibold text-lg"
                placeholder={t('companyNamePlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('tagline')}</label>
              <input
                type="text"
                value={theme?.company_tagline || ''}
                onChange={(e) => handleThemeUpdate({ company_tagline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder={t('taglinePlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('description')}</label>
              <textarea
                value={theme?.company_description || ''}
                onChange={(e) => handleThemeUpdate({ company_description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent h-24 resize-none"
                placeholder={t('descriptionPlaceholder')}
              />
            </div>
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{t('brandAssets')}</h3>
          </div>

          <div className="space-y-6">
            {/* Main Logo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">{t('mainLogo')}</label>
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center hover:border-purple-300 transition-colors bg-white">
                {theme?.logo_url ? (
                  <div className="space-y-3">
                    <img src={theme.logo_url} alt="Logo" className="mx-auto h-16 object-contain" />
                    <button
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      className="text-sm text-purple-600 hover:text-purple-700 font-semibold bg-purple-50 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                      disabled={uploadingAsset === 'logo'}
                    >
                      {uploadingAsset === 'logo' ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Uploading...
                        </div>
                      ) : t('changeLogo')}
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <button
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      className="text-purple-600 hover:text-purple-700 font-semibold"
                      disabled={uploadingAsset === 'logo'}
                    >
                      {uploadingAsset === 'logo' ? t('uploading') : t('uploadLogo')}
                    </button>
                    <p className="text-xs text-gray-500 mt-2">{t('fileFormat')}</p>
                  </div>
                )}
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAssetUpload('logo', file);
                  }}
                />
              </div>
            </div>

            {/* Favicon */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">{t('favicon')}</label>
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-4 text-center hover:border-purple-300 transition-colors bg-white">
                {theme?.favicon_url ? (
                  <div className="flex items-center justify-center gap-3">
                    <img src={theme.favicon_url} alt="Favicon" className="w-8 h-8" />
                    <button
                      onClick={() => document.getElementById('favicon-upload')?.click()}
                      className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      {t('changeFavicon')}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => document.getElementById('favicon-upload')?.click()}
                    className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                  >
                    {t('uploadFavicon')}
                  </button>
                )}
                <input
                  id="favicon-upload"
                  type="file"
                  accept=".ico,image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAssetUpload('favicon', file);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="lg:sticky lg:top-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{t('livePreview')}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-gray-400" />
              <Smartphone className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Mock Website Preview */}
          <div 
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            style={{
              '--brand-primary': theme?.primary_color || '#3b82f6',
              '--brand-secondary': theme?.secondary_color || '#10b981',
              '--brand-accent': theme?.accent_color || '#8b5cf6'
            } as React.CSSProperties}
          >
            {/* Header */}
            <div 
              className="px-6 py-4 border-b border-gray-100"
              style={{ backgroundColor: theme?.primary_color || '#3b82f6' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme?.logo_url ? (
                    <img src={theme.logo_url} alt="Logo" className="h-8 object-contain" />
                  ) : (
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-white font-bold text-sm">{theme?.company_name || 'Your Company'}</h4>
                    {theme?.company_tagline && (
                      <p className="text-white/80 text-xs">{theme.company_tagline}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">Welcome to {theme?.company_name || 'Your Platform'}</h5>
                  <p className="text-gray-600 text-sm">{theme?.company_description || 'Your company description will appear here'}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    className="px-4 py-2 text-white text-sm font-semibold rounded-lg"
                    style={{ backgroundColor: theme?.primary_color || '#3b82f6' }}
                  >
                    Get Started
                  </button>
                  <button 
                    className="px-4 py-2 text-sm font-semibold rounded-lg border"
                    style={{ 
                      borderColor: theme?.secondary_color || '#10b981',
                      color: theme?.secondary_color || '#10b981'
                    }}
                  >
                    Learn More
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-lg border border-gray-200">
                    <div 
                      className="w-4 h-4 rounded mb-2"
                      style={{ backgroundColor: theme?.accent_color || '#8b5cf6' }}
                    ></div>
                    <p className="text-xs font-semibold text-gray-900">Feature 1</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-200">
                    <div 
                      className="w-4 h-4 rounded mb-2"
                      style={{ backgroundColor: theme?.secondary_color || '#10b981' }}
                    ></div>
                    <p className="text-xs font-semibold text-gray-900">Feature 2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">© {new Date().getFullYear()} {theme?.company_name || 'Your Company'}</p>
                <div className="flex gap-2">
                  {theme?.social_links?.facebook && <Facebook className="w-3 h-3 text-gray-400" />}
                  {theme?.social_links?.twitter && <Twitter className="w-3 h-3 text-gray-400" />}
                  {theme?.social_links?.linkedin && <Linkedin className="w-3 h-3 text-gray-400" />}
                  {theme?.social_links?.instagram && <Instagram className="w-3 h-3 text-gray-400" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderColorsTab = () => (
    <div className="space-y-8">
      {/* Color Palettes */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Quick Color Palettes</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorPalettes.map((palette) => (
            <button
              key={palette.name}
              onClick={() => handleColorPaletteSelect(palette)}
              className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1">
                  <div 
                    className="w-6 h-6 rounded-lg shadow-sm"
                    style={{ backgroundColor: palette.primary }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-lg shadow-sm"
                    style={{ backgroundColor: palette.secondary }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-lg shadow-sm"
                    style={{ backgroundColor: palette.accent }}
                  ></div>
                </div>
                <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm font-semibold text-gray-900 text-left">{palette.name}</p>
              <div className="flex gap-2 mt-2 text-xs text-gray-500">
                <span>{palette.primary}</span>
                <span>•</span>
                <span>{palette.secondary}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Primary Colors */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Primary Colors</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Primary Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme?.primary_color || '#3b82f6'}
                  onChange={(e) => handleThemeUpdate({ primary_color: e.target.value })}
                  className="w-16 h-16 rounded-xl border border-gray-200 cursor-pointer"
                />
                <div>
                  <input
                    type="text"
                    value={theme?.primary_color || '#3b82f6'}
                    onChange={(e) => handleThemeUpdate({ primary_color: e.target.value })}
                    className="px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Main brand color</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Secondary Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme?.secondary_color || '#10b981'}
                  onChange={(e) => handleThemeUpdate({ secondary_color: e.target.value })}
                  className="w-16 h-16 rounded-xl border border-gray-200 cursor-pointer"
                />
                <div>
                  <input
                    type="text"
                    value={theme?.secondary_color || '#10b981'}
                    onChange={(e) => handleThemeUpdate({ secondary_color: e.target.value })}
                    className="px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Success & highlights</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Accent Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme?.accent_color || '#8b5cf6'}
                  onChange={(e) => handleThemeUpdate({ accent_color: e.target.value })}
                  className="w-16 h-16 rounded-xl border border-gray-200 cursor-pointer"
                />
                <div>
                  <input
                    type="text"
                    value={theme?.accent_color || '#8b5cf6'}
                    onChange={(e) => handleThemeUpdate({ accent_color: e.target.value })}
                    className="px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Links & decorations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Colors */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">System Colors</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Success Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme?.success_color || '#10b981'}
                  onChange={(e) => handleThemeUpdate({ success_color: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme?.success_color || '#10b981'}
                  onChange={(e) => handleThemeUpdate({ success_color: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Warning Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme?.warning_color || '#f59e0b'}
                  onChange={(e) => handleThemeUpdate({ warning_color: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme?.warning_color || '#f59e0b'}
                  onChange={(e) => handleThemeUpdate({ warning_color: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Error Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme?.error_color || '#ef4444'}
                  onChange={(e) => handleThemeUpdate({ error_color: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme?.error_color || '#ef4444'}
                  onChange={(e) => handleThemeUpdate({ error_color: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Preview */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Color Preview</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div 
              className="w-full h-20 rounded-xl mb-3 shadow-sm"
              style={{ backgroundColor: theme?.primary_color || '#3b82f6' }}
            ></div>
            <p className="text-sm font-semibold text-gray-900">Primary</p>
            <p className="text-xs text-gray-500 font-mono">{theme?.primary_color}</p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-full h-20 rounded-xl mb-3 shadow-sm"
              style={{ backgroundColor: theme?.secondary_color || '#10b981' }}
            ></div>
            <p className="text-sm font-semibold text-gray-900">Secondary</p>
            <p className="text-xs text-gray-500 font-mono">{theme?.secondary_color}</p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-full h-20 rounded-xl mb-3 shadow-sm"
              style={{ backgroundColor: theme?.accent_color || '#8b5cf6' }}
            ></div>
            <p className="text-sm font-semibold text-gray-900">Accent</p>
            <p className="text-xs text-gray-500 font-mono">{theme?.accent_color}</p>
          </div>
          
          <div className="text-center">
            <div className="w-full h-20 rounded-xl mb-3 shadow-sm bg-gradient-to-br"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${theme?.primary_color || '#3b82f6'}, ${theme?.accent_color || '#8b5cf6'})`
              }}
            ></div>
            <p className="text-sm font-semibold text-gray-900">Gradient</p>
            <p className="text-xs text-gray-500">Primary + Accent</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-8">
      {/* Contact Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
          </div>

          <div className="space-y-6">
            {/* Contact Email Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg shadow-md">
                  <Mail className="w-4 h-4 text-black" />
                </div>
                <label className="text-sm font-bold text-gray-800">Contact Email</label>
              </div>
              <input
                type="email"
                value={theme?.contact_email || ''}
                onChange={(e) => handleThemeUpdate({ contact_email: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-800"
                placeholder="contact@yourcompany.com"
              />
            </div>

            {/* Support Email Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg shadow-md">
                  <Shield className="w-4 h-4 text-black" />
                </div>
                <label className="text-sm font-bold text-gray-800">Support Email</label>
              </div>
              <input
                type="email"
                value={theme?.support_email || ''}
                onChange={(e) => handleThemeUpdate({ support_email: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-800"
                placeholder="support@yourcompany.com"
              />
            </div>

            {/* Phone Number Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg shadow-md">
                  <Phone className="w-4 h-4 text-black" />
                </div>
                <label className="text-sm font-bold text-gray-800">Phone Number</label>
              </div>
              <input
                type="tel"
                value={theme?.contact_phone || ''}
                onChange={(e) => handleThemeUpdate({ contact_phone: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-800"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Company Address Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg shadow-md">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <label className="text-sm font-bold text-gray-800">Company Address</label>
              </div>
              <textarea
                value={typeof theme?.company_address === 'object' ? 
                  `${(theme.company_address as CompanyAddress)?.street || ''}\n${(theme.company_address as CompanyAddress)?.city || ''}\n${(theme.company_address as CompanyAddress)?.country || ''}` : 
                  theme?.company_address || ''}
                onChange={(e) => {
                  const lines = e.target.value.split('\n');
                  handleThemeUpdate({
                    company_address: {
                      street: lines[0] || '',
                      city: lines[1] || '',
                      country: lines[2] || '',
                      postal_code: lines[3] || ''
                    }
                  });
                }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none font-medium text-gray-800"
                placeholder="123 Business Street&#10;City, State&#10;Country"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Social Media</h3>
          </div>

          <div className="space-y-6">
            {/* Facebook Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg shadow-md" style={{ backgroundColor: '#1877F2' }}>
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <label className="text-sm font-bold text-gray-800">Facebook</label>
              </div>
              <input
                type="url"
                value={(theme?.social_links as SocialLinks)?.facebook || ''}
                onChange={(e) => handleThemeUpdate({
                  social_links: { ...(theme?.social_links as SocialLinks), facebook: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-800"
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            {/* Twitter Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg shadow-md" style={{ backgroundColor: '#1DA1F2' }}>
                  <Twitter className="w-4 h-4 text-white" />
                </div>
                <label className="text-sm font-bold text-gray-800">Twitter</label>
              </div>
              <input
                type="url"
                value={(theme?.social_links as SocialLinks)?.twitter || ''}
                onChange={(e) => handleThemeUpdate({
                  social_links: { ...(theme?.social_links as SocialLinks), twitter: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-800"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            {/* LinkedIn Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg shadow-md" style={{ backgroundColor: '#0A66C2' }}>
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <label className="text-sm font-bold text-gray-800">LinkedIn</label>
              </div>
              <input
                type="url"
                value={(theme?.social_links as SocialLinks)?.linkedin || ''}
                onChange={(e) => handleThemeUpdate({
                  social_links: { ...(theme?.social_links as SocialLinks), linkedin: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-800"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            {/* Instagram Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg shadow-md" style={{ background: 'linear-gradient(45deg, #F56040, #E1306C, #C13584, #833AB4, #5851DB)' }}>
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <label className="text-sm font-bold text-gray-800">Instagram</label>
              </div>
              <input
                type="url"
                value={(theme?.social_links as SocialLinks)?.instagram || ''}
                onChange={(e) => handleThemeUpdate({
                  social_links: { ...(theme?.social_links as SocialLinks), instagram: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-800"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('whiteLabelStudio')}</h1>
            <p className="text-gray-600 text-lg">{t('createBrandExperience')}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="p-1 bg-gradient-to-br from-rose-600 to-pink-600 rounded-lg shadow-md">
                    <RefreshCw className="w-4 h-4 text-black animate-spin" />
                  </div>
                  {t('saving')}
                </>
              ) : (
                <>
                  <div className="p-1 bg-gradient-to-br from-rose-600 to-pink-600 rounded-lg shadow-md">
                    <Save className="w-4 h-4 text-black" />
                  </div>
                  {t('saveChanges')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-4 px-6 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                  : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg shadow-md ${
                tab.id === 'branding' ? 'bg-gradient-to-br from-pink-400 to-rose-500' :
                tab.id === 'colors' ? 'bg-gradient-to-br from-purple-400 to-indigo-500' :
                tab.id === 'typography' ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                tab.id === 'layout' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' :
                tab.id === 'domain' ? 'bg-gradient-to-br from-orange-400 to-amber-500' :
                'bg-gradient-to-br from-indigo-400 to-purple-500'
              }`}>
                <Icon className="w-4 h-4 text-black" />
              </div>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {currentTab === 'branding' && renderBrandingTab()}
        {currentTab === 'colors' && renderColorsTab()}
        {currentTab === 'contact' && renderContactTab()}
        {currentTab === 'typography' && (
          <div className="text-center py-12">
            <Type className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Typography Settings</h3>
            <p className="text-gray-500">Font customization coming soon...</p>
          </div>
        )}
        {currentTab === 'layout' && (
          <div className="text-center py-12">
            <Layout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Layout Configuration</h3>
            <p className="text-gray-500">Advanced layout options coming soon...</p>
          </div>
        )}
        {currentTab === 'domain' && (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Domain & SSL Management</h3>
            <p className="text-gray-500">Domain configuration coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhiteLabelDashboard;