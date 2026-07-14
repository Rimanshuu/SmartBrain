// Colors
export const COLORS = {
  // Dark Mode
  dark: {
    text: '#f3f4f6',
    textSecondary: '#d1d5db',
    buttonBg: 'rgba(255, 255, 255, 0.2)',
    buttonText: '#ffffff',
    inputBg: 'rgba(255, 255, 255, 0.1)',
    inputBorder: 'rgba(255, 255, 255, 0.3)',
    inputText: '#ffffff',
    navText: '#d5dce9',
  },
  // Light Mode
  light: {
    text: '#1f2937',
    textSecondary: '#6b7280',
    buttonBg: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    buttonText: '#ffffff',
    inputBg: '#ffc3c3',
    inputBorder: 'rgba(139, 92, 246, 0.3)',
    inputText: '#1b2533',
    navText: '#0f172a',
  },
};

// Gradients
export const GRADIENTS = {
  // Background Gradients
  backgrounds: {
    dark: 'linear-gradient(315deg, #000000 10%, #0a0e27 60%, #360a51 100%)',
    light: 'linear-gradient(15deg, #FF5C00 40%, #B505FF 100%)',
  },
  // Toggle Gradients
  toggle: {
    dark: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
    light: 'linear-gradient(315deg, #fac403 5%, #ff4f04 90%)',
  },
  // Button Gradients
  button: {
    dark: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
  },
};

// Shadow Effects
export const SHADOWS = {
  toggleDarkGlow: '0 8px 25px rgba(124, 58, 237, 0.5)',
  toggleLightGlow: '0 8px 15px rgba(255, 107, 53, 0.5)',
  toggleHoverDark: '0 0 40px rgba(124, 58, 237, 0.4)',
  toggleHoverLight: '0 0 40px rgba(247, 168, 168, 0.962)',
  buttonHover: '0 6px 20px rgba(139, 92, 246, 0.3)',
  logoDarkHover: '0 8px 60px rgba(124, 56, 241, 0.7)',
  logoLightHover: '0 8px 100px rgb(253, 251, 251)',
  formDefault: '0 8px 32px rgba(0, 0, 0, 0.1)',
  formHover: '0 12px 40px rgba(0, 0, 0, 0.15)',
};

// Sizing
export const SIZES = {
  toggleWidth: '130px',
  toggleHeight: '60px',
  toggleRadius: '45px',
  toggleCircleSize: '54px',
  logoSize: '150px',
  formWidth: '600px',
  formRadius: '12px',
  inputMaxWidth: '400px',
  iconSize: '24px',
};

// Transitions
export const TRANSITIONS = {
  smooth: 'all 0.3s ease',
  toggle: 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease, box-shadow 0.5s ease',
  background: 'background 0.3s ease',
};

// Opacity
export const OPACITY = {
  // Backgrounds
  toggleBgDark: 'rgba(255, 255, 255, 0.1)',
  toggleBgLight: 'rgba(255, 255, 255, 0.15)',
  logoBgDark: 'rgba(0, 0, 0, 0.5)',
  logoBgLight: 'rgba(139, 92, 246, 0.3)',
  formBgDark: 'rgba(255, 255, 255, 0.15)',
  formBgLight: 'rgba(255, 255, 255, 0.25)',
  // Borders
  toggleBorder: 'rgba(255, 255, 255, 0.15)',
  logoBorder: 'rgba(255, 255, 255, 0.2)',
  formBorder: 'rgba(255, 255, 255, 0.2)',
  // Text/Placeholder
  placeholderDark: 'rgba(255, 255, 255, 0.6)',
  placeholderLight: 'rgba(31, 41, 55, 0.5)',
  // Inner shadow
  innerShadow: 'rgba(0, 0, 0, 0.2)',
};
