'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from './header'
import { ExternalLink, ArrowRight } from "lucide-react"
import { Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import StatsSection from './stats'
import HeroScrollDemo from '@/components/container-scroll'
import HoverBorderGradientDemo from '@/components/hoverBorderGradientDemo'
import { AuroraText } from '@/components/magicui/aurora-text'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Cpu } from 'lucide-react'
import Footer from './footer'
import MusicPlayer from './border-beam-demo-2'
import IntergrationLogo from './integration-logo'
import CtaSection from './cta-section'

export default function HeroSection() {
    const features = [
        {
            icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
            title: "Real-time Trend Analysis",
            subtitle: "RSI, MA7/MA30",
            description:
                "Advanced technical indicators powered by AI to identify optimal market entry and exit points for maximum portfolio performance.",
        },
        {
            icon: <Zap className="h-10 w-10 text-purple-500" />,
            title: "Auto Portfolio Rebalancing",
            subtitle: "ckBTC, ckETH, ckUSDT",
            description:
                "Seamless automated rebalancing across Internet Computer tokens with intelligent allocation strategies and risk management.",
        },
        {
            icon: <Cpu className="h-10 w-10 text-green-500" />,
            title: "Transparent AI Agent",
            subtitle: "Eliza OS + ICP Canister",
            description:
                "Open-source AI decision making with full transparency, powered by Eliza OS and deployed on Internet Computer Protocol.",
        },
    ]
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

            <HeroHeader />
            <main className="overflow-x-hidden">
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
                    <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
                        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
                            <div className="mx-auto max-w-lg">
                                <div className="mb-8">


                                    <div className="relative inline-block">
                                        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-2xl">
                                            <span className="text-3xl font-bold text-white">M</span>
                                        </div>
                                        <div className="absolute -top-2 -right-2 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-green-400">
                                            <Zap className="h-4 w-4 text-white" />
                                        </div>
                                    </div>

                                    <motion.h1
                                        className="mb-12 text-6xl font-bold sm:text-7xl relative"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <motion.span
                                            className="relative inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                                            animate={{
                                                filter: [
                                                    "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
                                                    "drop-shadow(0 0 40px rgba(59, 130, 246, 0.8))",
                                                    "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
                                                ],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            {/* Glow overlay */}
                                            <AuroraText>MomentumFi</AuroraText>

                                        </motion.span>
                                    </motion.h1>
                                    <p className="text-2xl text-gray-600 mb-4 font-medium">AI Agent for ckBTC Auto-Rebalancing</p>

                                    <p className="mb-12 w-full text-xl font-semibold text-blue-600 ">
                                        AI-powered portfolio optimization with Chain Fusion & OpenAI
                                    </p>
                                </div>
                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row">
                                    <Link href="/dashboard">
                                        <HoverBorderGradientDemo />
                                    </Link>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="px-5 text-base"
                                    >
                                        <Link href="#link">
                                            <span className="text-nowrap">View Docs</span>
                                            <ExternalLink className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-4xl mx-auto lg:pb-32">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white-900 mb-2">$2.4M+</div>
                            <div className="text-white-600">Total Value Locked</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white-900 mb-2">15.7%</div>
                            <div className="text-white-600">Average APY</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white-900 mb-2">1,200+</div>
                            <div className="text-white-600">Active Users</div>
                        </div>
                    </div> */}
                    <StatsSection />
                    <HeroScrollDemo />

                </section>
                {/* <LogoCloud /> */}
                {/* <Features /> */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 dark:bg-transparent backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Intelligent DeFi Automation</h2>
                            <p className="mt-4">
                                Harness the power of AI-driven portfolio management with transparent, secure, and efficient rebalancing
                                strategies.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group hover:-translate-y-2"
                                >
                                    <CardContent className="p-8">
                                        <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-sm font-semibold text-blue-600 mb-4">{feature.subtitle}</p>
                                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <MusicPlayer />

                <IntergrationLogo />
                <CtaSection />
            </main>
            <Footer />
        </>
    )
}
