'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useScroll, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Wallet, Settings } from 'lucide-react'
import { useState } from 'react'
import ConnectWallet from '@/components/ui/connectWallet'
import { AuroraText } from './magicui/aurora-text'

const menuItems = [
    { name: 'Features', href: '#link' },
    { name: 'Solution', href: '#link' },
    { name: 'Pricing', href: '#link' },
    { name: 'About', href: '#link' },
]



export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()
    const [isConnected, setIsConnected] = useState(false)

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full pt-2">
                <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-background/50 backdrop-blur-2xl')}>
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {/* <Logo /> */}
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-white font-bold text-lg">M</span>
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                    <div>
                                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 bg-clip-text text-transparent">
                                            <AuroraText>MomentumFi</AuroraText>
                                        </span>
                                        <p className="text-xs text-gray-500 -mt-1">AI-Powered DeFi</p>
                                    </div>
                                </div>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            {/* <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            {/* <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                {/* Wallet Connection */}
                                <div className="flex items-center space-x-3">
                                    <ConnectWallet />
                                    {/* <Button
                                        onClick={() => setIsConnected(!isConnected)}
                                        className={`flex items-center space-x-2 ${isConnected
                                            ? "bg-green-100 text-green-800 hover:bg-green-200 border border-green-300"
                                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                            }`}
                                        variant={isConnected ? "outline" : "default"}
                                    >
                                        <Wallet className="h-4 w-4" />
                                        <span className="font-medium">{isConnected ? "0x1234...5678" : "Connect Wallet"}</span>
                                    </Button> */}
                                    {/* <Button variant="outline" size="icon" className="bg-white/60 backdrop-blur-sm">
                                            <Settings className="h-4 w-4" />
                                        </Button> */}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}
