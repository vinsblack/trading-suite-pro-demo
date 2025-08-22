import React from 'react';

interface PaymentIconProps {
  className?: string;
}

export const VisaIcon: React.FC<PaymentIconProps> = ({ className = "w-8 h-5" }) => (
  <svg viewBox="0 0 40 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="4" fill="#1A1F71"/>
    <path d="M16.1 18.7H13.4L15.2 5.3H17.9L16.1 18.7Z" fill="white"/>
    <path d="M26.8 5.6C26.3 5.4 25.4 5.1 24.2 5.1C21.7 5.1 19.9 6.4 19.9 8.3C19.9 9.7 21.2 10.5 22.2 11C23.2 11.5 23.6 11.8 23.6 12.3C23.6 13 22.8 13.3 22.1 13.3C21.1 13.3 20.6 13.1 19.8 12.8L19.5 12.7L19.1 15.3C19.7 15.6 20.8 15.8 22 15.8C24.7 15.8 26.5 14.6 26.5 12.5C26.5 11.4 25.8 10.6 24.2 10C23.3 9.6 22.8 9.3 22.8 8.7C22.8 8.2 23.4 7.7 24.7 7.7C25.7 7.7 26.4 7.9 26.9 8.1L27.2 8.2L27.6 5.6H26.8Z" fill="white"/>
    <path d="M33.2 5.3H31.3C30.7 5.3 30.3 5.5 30 6.1L26.1 18.7H28.8L29.4 17.1H32.8L33.1 18.7H35.4L33.2 5.3ZM30.2 14.8L31.4 11.4L32 14.8H30.2Z" fill="white"/>
    <path d="M11.4 5.3L8.8 15.2L8.5 13.7C8 12.2 6.6 10.5 5 9.6L7.3 18.7H10.1L14.2 5.3H11.4Z" fill="white"/>
    <path d="M5.6 5.3H1.4L1.3 5.7C4.6 6.4 7.1 8.3 8.2 10.9L7 6.1C6.8 5.5 6.4 5.3 5.9 5.3H5.6Z" fill="white"/>
  </svg>
);

export const MasterCardIcon: React.FC<PaymentIconProps> = ({ className = "w-8 h-5" }) => (
  <svg viewBox="0 0 40 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="4" fill="#000"/>
    <circle cx="15" cy="12" r="7" fill="#EB001B"/>
    <circle cx="25" cy="12" r="7" fill="#F79E1B"/>
    <path d="M20 7.5C18.5 8.8 17.5 10.3 17.5 12C17.5 13.7 18.5 15.2 20 16.5C21.5 15.2 22.5 13.7 22.5 12C22.5 10.3 21.5 8.8 20 7.5Z" fill="#FF5F00"/>
  </svg>
);

export const PayPalIcon: React.FC<PaymentIconProps> = ({ className = "w-8 h-5" }) => (
  <svg viewBox="0 0 40 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="4" fill="#0070BA"/>
    <path d="M14.5 6H17.8C19.9 6 21.5 7.6 21.5 9.7C21.5 11.8 19.9 13.4 17.8 13.4H15.8L15.2 16.8H13.5L14.5 6Z" fill="white"/>
    <path d="M16.2 7.2H17.8C19 7.2 20 8.2 20 9.4C20 10.6 19 11.6 17.8 11.6H16.6L16.2 7.2Z" fill="#0070BA"/>
    <path d="M22.5 9.5H24.8C25.9 9.5 26.8 10.4 26.8 11.5C26.8 12.6 25.9 13.5 24.8 13.5H23.8L23.5 15.8H22.2L22.5 9.5Z" fill="white"/>
    <path d="M23.2 10.7H24.3C24.7 10.7 25 11 25 11.4C25 11.8 24.7 12.1 24.3 12.1H23.5L23.2 10.7Z" fill="#0070BA"/>
  </svg>
);

export const AmexIcon: React.FC<PaymentIconProps> = ({ className = "w-8 h-5" }) => (
  <svg viewBox="0 0 40 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="4" fill="#006FCF"/>
    <path d="M8.5 8.5L10 11.5L11.5 8.5H13.5V15.5H12V10.5L10.5 13.5H9.5L8 10.5V15.5H6.5V8.5H8.5Z" fill="white"/>
    <path d="M15 8.5H19V10H16.5V11H18.5V12.5H16.5V14H19V15.5H15V8.5Z" fill="white"/>
    <path d="M21 8.5H22.5L23.5 10.5L24.5 8.5H26L24.5 12L26 15.5H24.5L23.5 13.5L22.5 15.5H21L22.5 12L21 8.5Z" fill="white"/>
  </svg>
);

export const ApplePayIcon: React.FC<PaymentIconProps> = ({ className = "w-8 h-5" }) => (
  <svg viewBox="0 0 40 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="4" fill="#000"/>
    <path d="M12.5 9.5C12.3 8.5 11.8 7.8 11 7.4C10.5 7.1 9.8 6.9 9.1 6.9C9 6.9 8.9 6.9 8.8 6.9C8.7 7.8 9 8.6 9.5 9.2C10 9.8 10.7 10.2 11.5 10.2C11.6 10.2 11.7 10.2 11.8 10.2C12 10.1 12.3 9.9 12.5 9.5Z" fill="white"/>
    <path d="M11.8 10.3C10.8 10.3 9.9 10.8 9.4 10.8C8.8 10.8 8 10.3 7.1 10.3C5.9 10.3 4.8 11 4.3 12.1C3.2 14.3 4 17.5 5.1 19.2C5.6 20 6.2 20.8 7 20.8C7.8 20.8 8.1 20.4 9.1 20.4C10.1 20.4 10.3 20.8 11.2 20.8C12.1 20.8 12.6 20.1 13.1 19.2C13.7 18.2 13.9 17.2 13.9 17.1C13.9 17.1 12.2 16.4 12.2 14.4C12.2 12.7 13.5 11.9 13.6 11.8C12.8 10.6 11.6 10.3 11.8 10.3Z" fill="white"/>
    <path d="M21 8H24.5C25.9 8 27 9.1 27 10.5V13.5C27 14.9 25.9 16 24.5 16H21V8ZM22.5 9.5V14.5H24.5C25.1 14.5 25.5 14.1 25.5 13.5V10.5C25.5 9.9 25.1 9.5 24.5 9.5H22.5Z" fill="white"/>
    <path d="M28 8H29.5V12L31.5 8H33.5L31.2 12.3L33.5 16H31.5L29.5 12.7V16H28V8Z" fill="white"/>
  </svg>
);

export const GooglePayIcon: React.FC<PaymentIconProps> = ({ className = "w-8 h-5" }) => (
  <svg viewBox="0 0 40 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="4" fill="#4285F4"/>
    <path d="M15.5 12.5V10.5H20.5C20.6 11 20.6 11.5 20.6 12C20.6 15.5 18.2 17.5 15.5 17.5C12.5 17.5 10 15 10 12S12.5 6.5 15.5 6.5C17 6.5 18.2 7.1 19.1 8L17.6 9.5C17 8.9 16.3 8.5 15.5 8.5C13.6 8.5 12 10.1 12 12S13.6 15.5 15.5 15.5C17.8 15.5 18.7 14 18.8 12.5H15.5Z" fill="white"/>
    <path d="M22 8H23.5V12L25.5 8H27.5L25.2 12.3L27.5 16H25.5L23.5 12.7V16H22V8Z" fill="white"/>
    <path d="M28.5 8H30V16H28.5V8Z" fill="white"/>
  </svg>
);

export const GenericCardIcon: React.FC<PaymentIconProps> = ({ className = "w-8 h-5" }) => (
  <svg viewBox="0 0 40 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="24" rx="4" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1"/>
    <rect x="2" y="6" width="36" height="3" fill="#374151"/>
    <rect x="4" y="14" width="8" height="2" rx="1" fill="#9CA3AF"/>
    <rect x="14" y="14" width="6" height="2" rx="1" fill="#9CA3AF"/>
    <rect x="32" y="16" width="6" height="3" rx="1" fill="#D1D5DB"/>
  </svg>
);

interface PaymentMethodIconProps extends PaymentIconProps {
  type: 'visa' | 'mastercard' | 'paypal' | 'amex' | 'apple-pay' | 'google-pay' | 'generic';
}

export const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ type, className }) => {
  switch (type) {
    case 'visa':
      return <VisaIcon className={className} />;
    case 'mastercard':
      return <MasterCardIcon className={className} />;
    case 'paypal':
      return <PayPalIcon className={className} />;
    case 'amex':
      return <AmexIcon className={className} />;
    case 'apple-pay':
      return <ApplePayIcon className={className} />;
    case 'google-pay':
      return <GooglePayIcon className={className} />;
    default:
      return <GenericCardIcon className={className} />;
  }
};