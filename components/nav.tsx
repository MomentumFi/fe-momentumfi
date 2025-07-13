"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Navigation() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                    <div className="text-2xl font-bold">
                        <span className="text-white">{">"}</span>
                        <span className="text-purple-400">{"<"}</span>
                        <span className="text-white ml-2">MomentumFI</span>
                    </div>
                </motion.div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                        How it works
                    </Link>
                    <Link href="#docs" className="text-gray-300 hover:text-white transition-colors">
                        Docs
                    </Link>
                </div>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full text-white font-medium transition-colors"
                >
                    <Link href="/dashboard">
                        Go to Dashboard
                    </Link>
                </motion.button>
            </div>
        </motion.nav>
    )
}
