"use client"

import { useState, useRef, useEffect } from "react"
import {
    ChevronDown,
    Copy,
    ExternalLink,
    Check,
    X,
    RefreshCw,
} from "lucide-react"

interface PlugWallet {
    accountId: string
    principalId: string
    balanceICP: number
    symbol?: string
}

export default function ConnectPlug({ onBalanceUpdate }: { onBalanceUpdate?: (balance: number) => void }) {

    const ICP_LEDGER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai" as const; // ICP Ledger (mainnet)
    type PlugAny = any; // supaya cepat, bisa diketikkan lebih rapi nanti

    const [connectedWallet, setConnectedWallet] = useState<PlugWallet | null>(null)
    const [showCopySuccess, setShowCopySuccess] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false)
    const [icpPrice, setIcpPrice] = useState<number | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null)



    async function getIcpBalanceViaLedger(plug: PlugAny): Promise<{
        amount: number;
        symbol: string;
        decimals: number;
    }> {
        // pastikan agent siap untuk canister ledger + host mainnet
        await plug.createAgent({
            whitelist: [ICP_LEDGER_ID],
            host: "https://icp0.io", // host mainnet (bisa juga https://ic0.app)
        });

        // definisikan interface minimal ICRC-1
        const actor = await plug.createActor({
            canisterId: ICP_LEDGER_ID,
            interfaceFactory: ({ IDL }: any) =>
                IDL.Service({
                    icrc1_symbol: IDL.Func([], [IDL.Text], ["query"]),
                    icrc1_decimals: IDL.Func([], [IDL.Nat8], ["query"]),
                    icrc1_balance_of: IDL.Func(
                        [IDL.Record({ owner: IDL.Principal, subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)) })],
                        [IDL.Nat],
                        ["query"]
                    ),
                }),
        });

        const owner = await plug.agent.getPrincipal();
        const raw: bigint = await actor.icrc1_balance_of({ owner, subaccount: [] });
        const decimals: number = Number(await actor.icrc1_decimals());
        const symbol: string = await actor.icrc1_symbol();

        // hati-hati overflow; untuk UI kecil aman pakai Number
        const amount = Number(raw) / 10 ** decimals;
        return { amount, symbol, decimals };
    }

    // USD Price
    useEffect(() => {
        const fetchIcpPrice = async () => {
            try {
                const res = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd"
                );
                const data = await res.json();
                setIcpPrice(data["internet-computer"].usd);
            } catch (err) {
                console.error("Failed to fetch ICP price:", err);
            }
        };

        fetchIcpPrice();
        // auto-refresh tiap 1 menit
        const interval = setInterval(fetchIcpPrice, 60_000);
        return () => clearInterval(interval);
    }, []);



    // ✅ Auto check connection when component mounts
    useEffect(() => {
        const checkConnection = async () => {
            const plug = (window as any)?.ic?.plug;
            if (!plug) return;

            const ok = await plug.isConnected();
            if (ok) {
                const accountId = plug.accountId;
                const principalId = plug.principalId;
                let balanceICP = 0;
                try {
                    const { amount } = await getIcpBalanceViaLedger(plug);
                    balanceICP = amount;
                } catch (e) {
                    console.error("Auto fetch balance fail:", e);
                }
                setConnectedWallet({ accountId, principalId, balanceICP, symbol: "ICP" });
                // Kirim balance ke parent melalui callback
                if (onBalanceUpdate) {
                    onBalanceUpdate(balanceICP);
                }
            }
        };
        checkConnection();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsWalletDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const connectPlugWallet = async () => {
        setIsConnecting(true);
        try {
            const plug = (window as any)?.ic?.plug;
            if (!plug) {
                alert("Plug wallet not found. Please install the Plug extension.");
                return;
            }

            // minta koneksi + whitelist ledger agar bisa query saldo
            await plug.requestConnect({
                whitelist: [ICP_LEDGER_ID],
                host: "https://icp0.io",
            });

            const accountId = plug.accountId;
            const principalId = plug.principalId;
            const { amount, symbol } = await getIcpBalanceViaLedger(plug);

            setConnectedWallet({
                accountId,
                principalId,
                balanceICP: amount,
                symbol,
            });
            // Kirim balance ke parent melalui callback
            if (onBalanceUpdate) {
                onBalanceUpdate(amount);
            }
        } catch (error) {
            console.error("Failed to connect to Plug wallet:", error);
            alert("Failed to connect to Plug wallet");
        } finally {
            setIsConnecting(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setShowCopySuccess(true)
            setTimeout(() => setShowCopySuccess(false), 2000)
        } catch (error) {
            console.error("Failed to copy:", error)
        }
    }

    const truncateAddress = (address: string, start = 4, end = 4) => {
        if (address.length <= start + end) return address
        return `${address.slice(0, start)}...${address.slice(-end)}`
    }

    const openAccountInDashboard = (accountId: string) => {
        window.open(`https://dashboard.internetcomputer.org/account/${accountId}`, "_blank")
    }

    const handleDisconnect = () => {
        setConnectedWallet(null)
        setIsWalletDropdownOpen(false)
    }

    return (
        <>
            {/* Wallet Section */}
            <div className="relative" ref={dropdownRef}>
                {connectedWallet ? (
                    <>
                        <button
                            onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                            className="flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-2 hover:bg-slate-700/50 transition-colors"
                        >
                            <img src="https://app.icpswap.com/images/connect/Plug.svg" alt="Plug Icon" className="w-10 h-10" />

                            <span className="text-white text-sm">{truncateAddress(connectedWallet.principalId)}</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* Wallet Dropdown */}
                        {isWalletDropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl z-50">
                                {/* Header with copy icon */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <img src="https://app.icpswap.com/images/connect/Plug.svg" alt="Plug Icon" className="w-10 h-10" />

                                        <span className="text-white font-medium">{truncateAddress(connectedWallet.principalId)}</span>
                                    </div>
                                    <button onClick={() => copyToClipboard(connectedWallet.principalId)}>
                                        <Copy className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                                    </button>
                                </div>
                                <button
                                    onClick={async () => {
                                        try {
                                            setIsRefreshing(true);
                                            const plug = (window as any).ic.plug;
                                            const { amount } = await getIcpBalanceViaLedger(plug);
                                            setConnectedWallet((w) => (w ? { ...w, balanceICP: amount } : w));
                                        } catch (e) {
                                            console.error("Refresh balance error:", e);
                                        } finally {
                                            setIsRefreshing(false);
                                        }
                                    }}
                                    disabled={isRefreshing}
                                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                                    {isRefreshing ? "Refreshing..." : "Refresh Balance"}
                                </button>

                                {/* Balance */}
                                <div className="text-center mb-4">
                                    <div className="text-white text-3xl font-light">
                                        {isRefreshing ? (
                                            <div className="h-8 w-32 mx-auto bg-gray-700 rounded animate-pulse" />
                                        ) : (
                                            <>
                                                {connectedWallet.balanceICP.toFixed(4)} {connectedWallet.symbol ?? "ICP"}
                                            </>
                                        )}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {icpPrice
                                            ? `≈ $${(connectedWallet.balanceICP * icpPrice).toFixed(2)}`
                                            : "Loading USD..."}
                                    </div>
                                </div>


                                {/* Description */}
                                <div className="text-gray-400 text-xs mb-4">
                                    Copy Account ID for sending from exchanges and Principal ID for ICP network.
                                </div>

                                {/* Account and Principal IDs */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Account ID</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => copyToClipboard(connectedWallet.accountId)}
                                                className="text-blue-400 hover:text-blue-300 text-sm"
                                            >
                                                {truncateAddress(connectedWallet.accountId)}
                                            </button>
                                            <button
                                                onClick={() => openAccountInDashboard(connectedWallet.accountId)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Principal ID</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => copyToClipboard(connectedWallet.principalId)}
                                                className="text-blue-400 hover:text-blue-300 text-sm"
                                            >
                                                {truncateAddress(connectedWallet.principalId)}
                                            </button>
                                            <button
                                                onClick={() => openAccountInDashboard(connectedWallet.accountId)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Disconnect Button */}
                                <div className="mt-4 pt-3 border-t border-slate-700">
                                    <button
                                        onClick={handleDisconnect}
                                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        <span>Disconnect</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <button
                        onClick={connectPlugWallet}
                        disabled={isConnecting}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00B8FF] via-[#00FFA3] via-[#FFD600] via-[#FF6A00] via-[#FF007A] to-[#7000FF]
            hover:opacity-90 disabled:opacity-50
            text-white font-semibold px-6 py-2 rounded-full
            transition-all shadow-lg"
                    >
                        <img
                            src="https://app.icpswap.com/images/connect/Plug.svg"
                            alt="Plug Logo"
                            className={`w-8 h-8 ${isConnecting ? "animate-spin" : ""}`}
                        />
                        {isConnecting ? "Connecting..." : "Connect Plug Wallet"}
                    </button>
                )}
            </div>

            {/* Copy Success Notification */}
            {showCopySuccess && (
                <div className="fixed top-4 right-4 bg-slate-800 border border-green-500 rounded-lg p-4 flex items-center space-x-2 z-50">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">Copy Success</span>
                    <button onClick={() => setShowCopySuccess(false)} className="text-gray-400 hover:text-white ml-2">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </>
    )
}