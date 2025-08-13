import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ConnectPlug from "@/components/wallet/connect-wallet"

export default function HeaderDashboard() {
    return (
        <>
            <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex items-center space-x-3">
                            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                                <div className="text-2xl font-bold text-white flex items-center">
                                    <img src="/logo.png" alt="" className="w-20" />
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        MomentumFI
                                        <p className="text-xs text-gray-400 -mt-1">Dashboard</p>
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                        <div className="flex items-center space-x-6">
                            {/* Mode Switcher */}

                            {/* Wallet Connection */}
                            <div className="flex items-center space-x-3">

                                <ConnectPlug />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}