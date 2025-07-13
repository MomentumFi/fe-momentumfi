import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

export default function IntergrationLogo() {
    const integrations = [
        { name: "Plug Wallet", icon: "🔌", color: "from-orange-400 to-red-500" },
        { name: "Internet Identity", icon: "🆔", color: "from-blue-400 to-indigo-500" },
        { name: "OpenAI", icon: "🧠", color: "from-green-400 to-teal-500" },
        { name: "ICP", icon: "⚡", color: "from-purple-400 to-pink-500" },
        { name: "Eliza OS", icon: "🤖", color: "from-yellow-400 to-orange-500" },
    ]
    return (
        <>
            {/* Integration Logos */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Powered by Leading Technologies</h2>
                    <p className="text-xl mb-16 mt-4">
                        Built on the most trusted and innovative blockchain infrastructure
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {integrations.map((integration, index) => (
                            <Card
                                key={index}
                                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                            >
                                <CardContent className="p-8 text-center">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${integration.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <span className="text-3xl">{integration.icon}</span>
                                    </div>
                                    <p className="font-bold text-lg">{integration.name}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section></>
    )
}