"use client"

import { motion } from "framer-motion"
import DashboardPreview from "@/app/home/_components/dashboard-preview"
import { ScrollProgress } from '@/app/home/_components/scroll-progress'
import AnimatedGradient from "@/app/home/_components/animated-gradien"
import Link from "next/link"
import LogoCloud from "@/app/home/_components/logo-cloud"
import Features2 from "@/app/home/_components/features2"
import HowItWorks from "@/app/home/_components/how-it-works"
import Stats2 from "@/app/home/_components/stats2"
import FAQ from "@/app/home/_components/faq"
import CtaSection from "@/app/home/_components/cta-section"
import { ArrowRight } from "lucide-react";
export default function Home() {

    return (
        <>
            {/* <Navigation /> */}
            <ScrollProgress />
            <main className="relative min-h-screen flex items-center justify-center px-6">
                <section>
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            {/* New Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center space-x-2 mb-8"
                            >
                                <AnimatedGradient />
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="block"
                                >
                                    AI Agent,
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                    className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                >
                                    for Auto-Rebalancing Portofolio.
                                </motion.span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                                className="text-xl text-gray-300 mb-8 max-w-2xl"
                            >
                                AI-powered portfolio optimization with Chain Fusion & OpenAI.
                            </motion.p>

                            {/* CTA Button */}
                            <Link href="/dashboard">
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.1 }}
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                                >
                                    Launch App
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </motion.button>
                            </Link>

                            {/* Earn Effortlessly Text
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        className="absolute bottom-8 left-8 hidden lg:block"
                    >
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-gray-400 text-sm">Earn Effortlessly</span>
                        </div>
                    </motion.div> */}
                        </div>

                        {/* Right Content - Dashboard Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="relative"
                        >

                            <Link href={"/dashboard"} className="block">
                                <DashboardPreview />
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="relative"
                    >
                        <LogoCloud />
                    </motion.div>

                    <Stats2 />
                    <Features2 />
                    <HowItWorks />
                    <FAQ />
                    <CtaSection />
                </section >
            </main >
        </>

    )
}
