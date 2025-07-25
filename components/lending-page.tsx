"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import DashboardPreview from "./dashboard-preview"
import { ScrollProgress } from './magicui/scroll-progress'
import AnimatedGradient from "./animated-gradien"
import Link from "next/link"
import LogoCloud from "./logo-cloud"
import Features2 from "./features2"
import HowItWorks from "./how-it-works"
import Stats2 from "./stats2"
import FAQ from "./faq"
import Footer2 from "./footer2"
import Navigation from "./nav"
import CtaSection from "./cta-section"

export default function LendingPage() {

    interface Particle {
        x: number
        y: number
        vx: number
        vy: number
        size: number
        opacity: number
        color: string
    }

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationRef = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createParticles = () => {
            const particles: Particle[] = []
            const particleCount = Math.floor((canvas.width * canvas.height) / 12000)
            const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"]

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 3 + 2,
                    opacity: Math.random() * 0.8 + 0.2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                })
            }

            particlesRef.current = particles
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesRef.current.forEach((particle, index) => {
                // Update position
                particle.x += particle.vx
                particle.y += particle.vy

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x))
                particle.y = Math.max(0, Math.min(canvas.height, particle.y))

                // Draw connections only between nearby particles (within reasonable distance)
                particlesRef.current.slice(index + 1).forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x
                    const dy = particle.y - otherParticle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    // Only draw lines if particles are close enough (within 200 pixels)
                    if (distance < 200) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(otherParticle.x, otherParticle.y)
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 200)})`
                        ctx.lineWidth = 1.2
                        ctx.stroke()
                    }
                })

                // Draw particle
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = particle.color
                ctx.globalAlpha = particle.opacity
                ctx.fill()

                ctx.globalAlpha = 1
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            resizeCanvas()
            createParticles()
        }

        resizeCanvas()
        createParticles()
        animate()

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])
    return (
        <>
            <Navigation />
            <ScrollProgress />
            <main className="relative min-h-screen flex items-center justify-center px-6">

                {/* Background Effects */}
                <section>
                    <canvas ref={canvasRef} className="
                    absolute inset-0 w-full h-full 
                    z-[-1] pointer-events-none
                    bg-gradient-to-b from-gray-900 to-gray-800
                    dark:from-gray-800 dark:to-gray-900
                    transition-colors duration-500
                    blur-sm
                    opacity-50
                    md:blur-none
                    md:opacity-100
                    lg:blur-none lg:opacity-100
                    lg:fixed lg:inset-0 lg:z-[-1]
                    lg:w-full lg:h-full lg:object-cover
                    lg:object-center lg:object-cover
                    lg:transition-all lg:duration-500
                    lg:backdrop-blur-lg lg:backdrop-filter
                    lg:bg-gradient-to-b lg:from-gray-900 lg:to-gray-800
                    lg:dark:from-gray-800 lg:dark:to-gray-900
                    " />


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
                                    for ckBTC Auto-Rebalancing.
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
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.1 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300"
                            >
                                <Link href="/dashboard">
                                    Launch App
                                </Link>
                            </motion.button>

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
                    <Features2 />
                    <HowItWorks />
                    <Stats2 />
                    <FAQ />
                    <CtaSection />
                    <Footer2 />
                </section >
            </main>
        </>

    )
}
