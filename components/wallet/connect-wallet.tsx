"use client"

import { useState, useRef, useEffect } from "react"
import {
    ChevronDown,
    Copy,
    ExternalLink,
    Check,
    X,
} from "lucide-react"

interface PlugWallet {
    accountId: string
    principalId: string
    balance?: number
}

export default function ConnectPlug() {
    const [connectedWallet, setConnectedWallet] = useState<PlugWallet | null>(null)
    const [showCopySuccess, setShowCopySuccess] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // ✅ Auto check connection when component mounts
    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window !== "undefined" && (window as any).ic?.plug) {
                const plug = (window as any).ic.plug
                const alreadyConnected = await plug.isConnected()
                if (alreadyConnected) {
                    const accountId = plug.accountId
                    const principalId = plug.principalId
                    setConnectedWallet({
                        accountId,
                        principalId,
                        balance: 0 // bisa fetch saldo beneran
                    })
                }
            }
        }
        checkConnection()
    }, [])

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
        setIsConnecting(true)
        try {
            // Check if Plug is available
            if (typeof window !== "undefined" && (window as any).ic?.plug) {
                const plug = (window as any).ic.plug

                // Request connection
                await plug.requestConnect()

                // Get account and principal IDs
                const accountId = plug.accountId
                const principalId = plug.principalId

                setConnectedWallet({
                    accountId,
                    principalId,
                    balance: 0, // You can fetch actual balance here
                })
            } else {
                alert("Plug wallet not found. Please install Plug extension.")
            }
        } catch (error) {
            console.error("Failed to connect to Plug wallet:", error)
            alert("Failed to connect to Plug wallet")
        } finally {
            setIsConnecting(false)
        }
    }

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

                                {/* Balance */}
                                <div className="text-center mb-4">
                                    <div className="text-white text-3xl font-light">$0.00</div>
                                    <div className="text-gray-400 text-sm">0.00 ICP</div>
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
                                                onClick={() => openAccountInDashboard(connectedWallet.principalId)}
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