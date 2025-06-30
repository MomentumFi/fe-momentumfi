'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { HeroHeader } from './header'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { ExternalLink, ArrowRight } from "lucide-react"
import { Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'


export default function HeroSection() {
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
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <section>
                    <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
                        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
                            <div className="mx-auto max-w-lg">
                                <div className="mb-20">

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
                                            MomentumFi
                                            {/* Glow overlay */}
                                            <span
                                                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent blur-sm opacity-50"
                                                aria-hidden="true"
                                            >
                                                MomentumFi
                                            </span>
                                        </motion.span>
                                    </motion.h1>

                                    <p className="mb-4 text-2xl font-medium text-gray-600">AI Agent for ckBTC Auto-Rebalancing</p>

                                    <p className="mb-12 w-full text-xl font-semibold text-blue-600 ">
                                        AI-powered portfolio optimization with Chain Fusion & OpenAI
                                    </p>
                                </div>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row">
                                    <Button asChild size="lg" className="px-5 text-base">
                                        <Link href="/dashboard">
                                            <span className="text-nowrap">Launch App</span>
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-4xl mx-auto lg:pb-32">
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
                    </div>

                </section>
                <section className="bg-background pb-16 md:pb-32">
                    <div className="group relative m-auto max-w-6xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <p className="text-end text-sm">Powering the best teams</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    speedOnHover={20}
                                    speed={40}
                                    gap={112}>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-5 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/openai.svg"
                                            alt="Nvidia Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>

                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/column.svg"
                                            alt="Column Logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/github.svg"
                                            alt="GitHub Logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-5 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/nike.svg"
                                            alt="Nike Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/tailwindcss.svg"
                                            alt="Laravel Logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-7 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/vercel.svg"
                                            alt="Lilly Logo"
                                            height="28"
                                            width="auto"
                                        />
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}
