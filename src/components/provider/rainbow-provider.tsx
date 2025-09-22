'use client';

import '../../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

import { config, customThemeOptions } from '../../config/wagmi';

const client = new QueryClient();

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <RainbowKitProvider
                    theme={darkTheme(customThemeOptions)}
                    modalSize="wide"
                    showRecentTransactions={false}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

