'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  baseSepolia,
  base
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'MomentumFi',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    baseSepolia,
    base
  ],
  ssr: true,
});

// Custom theme options dengan warna ungu
export const customThemeOptions = {
  accentColor: '#8b5cf6', // Warna ungu
  borderRadius: 'large' as const, // Radius yang lebih besar
  fontStack: 'system' as const,
  overlayBlur: 'small' as const,
};
