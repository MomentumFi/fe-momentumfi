"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { useToast } from "src/hooks/use-toast"

const buttonBaseStyles = "rounded-full hover:rounded-full";

const ChainIcon = ({ iconUrl, name, background, size = 20 }: {
    iconUrl?: string;
    name?: string;
    background?: string;
    size?: number;
}) => (
    <div
        style={{
            background,
            width: size,
            height: size,
            borderRadius: 999,
            overflow: 'hidden',
            marginRight: 4,
        }}
    >
        {iconUrl && (
            <img
                alt={`${name ?? 'Chain'} icon`}
                src={iconUrl}
                style={{ width: size, height: size }}
            />
        )}
    </div>
);

const GradientButton = ({ children, onClick, variant = 'outline' }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'outline' | 'default';
}) => (
    <Button
        onClick={onClick}
        type="button"
        variant={variant}
        className={`${buttonBaseStyles} flex items-center gap-2 cursor-pointer`}
    >
        {children}
    </Button>
);

export function ConnectButton() {
    const { toast } = useToast()

    return (
        <RainbowConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        onClick={openConnectModal}
                                        type="button"
                                        className="rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold px-6 py-3 transition-all duration-300 ease-in-out shadow hover:brightness-110 hover:shadow-lg dark:from-indigo-400 dark:to-pink-400"
                                    >
                                        Connect Wallet
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button
                                        onClick={openChainModal}
                                        type="button"
                                        variant="destructive"
                                        className="rounded-full cursor-pointer"
                                    >
                                        Wrong network
                                    </Button>
                                );
                            }

                            return (
                                <div className="flex flex-row gap-3 z-50">
                                    {/* Chain/Network Button - langsung buka modal */}
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={openChainModal}
                                        className={`${buttonBaseStyles} flex items-center gap-2 cursor-pointer`}
                                    >
                                        {chain.hasIcon && (
                                            <div className='min-w-5'>
                                                <ChainIcon
                                                    iconUrl={chain.iconUrl}
                                                    name={chain.name}
                                                    background={chain.iconBackground}
                                                />
                                            </div>
                                        )}
                                        {/* Hanya icon, tanpa nama network */}
                                    </Button>

                                    {/* Account Button - langsung buka modal */}
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={openAccountModal}
                                        className={`${buttonBaseStyles} flex items-center gap-2 cursor-pointer`}
                                    >
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        <span className="max-w-32 truncate">
                                            {account.displayName}
                                        </span>
                                        {account.displayBalance && (
                                            <span className="text-xs text-muted-foreground hidden sm:inline">
                                                {account.displayBalance}
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </RainbowConnectButton.Custom>
    )
}

export default function Connect() {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <ConnectButton />
        </div>
    );
}
