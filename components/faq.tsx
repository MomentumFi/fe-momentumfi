"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

const faqs = [
    {
        question: "What is MemomentumFI?",
        answer:
            "MemomentumFI is a revolutionary platform that allows you to earn rewards by sharing your unused device resources with a decentralized network. It's completely passive income that requires no effort from your side once set up.",
    },
    {
        question: "How do I start earning?",
        answer:
            "Getting started is simple! Download our Chrome extension or desktop app, create an account, connect your devices, and start earning immediately. The entire process takes less than 5 minutes.",
    },
    {
        question: "Is my data secure?",
        answer:
            "We use enterprise-grade encryption and never access your personal data. Your privacy is our top priority, and all resource sharing is done through secure, isolated processes that protect your information.",
    },
    {
        question: "How are rewards calculated?",
        answer:
            "Rewards are calculated based on the resources you contribute, including bandwidth, processing power, and uptime. Our transparent algorithm ensures fair compensation, and you can track your earnings in real-time through our dashboard.",
    },
    {
        question: "What devices are supported?",
        answer:
            "MomentumFI works on Windows, macOS, Linux, and through our Chrome extension. We support desktops, laptops, and mobile devices, allowing you to maximize your earning potential across all your devices.",
    },
    {
        question: "How do I withdraw my earnings?",
        answer:
            "You can withdraw your earnings anytime through multiple payment methods including PayPal, bank transfer, cryptocurrency, and gift cards. Minimum withdrawal amounts vary by payment method, with fast processing times.",
    },
]

export default function FAQ() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section ref={ref} className="py-24 px-6 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-purple-400 font-semibold text-lg mb-4 block"
                    >
                        Got Questions?
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl lg:text-6xl font-bold mb-6"
                    >
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-xl text-gray-300"
                    >
                        Everything you need to know about MomentumFI and how it works.
                    </motion.p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="group"
                        >
                            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-purple-600/50 transition-all duration-300 overflow-hidden">
                                <motion.button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                        {faq.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 45 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 flex-shrink-0 ml-4"
                                    >
                                        +
                                    </motion.div>
                                </motion.button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-6">
                                                <motion.p
                                                    initial={{ y: -10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: -10, opacity: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                    className="text-gray-300 leading-relaxed"
                                                >
                                                    {faq.answer}
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-300 text-lg mb-6">Still have questions? We're here to help!</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-600/50 px-8 py-3 rounded-full text-white font-medium transition-all duration-300"
                    >
                        Contact Support
                    </motion.button>
                </motion.div> */}
            </div>
        </section>
    )
}
