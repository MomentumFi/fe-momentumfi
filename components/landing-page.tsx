import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Github, Twitter, MessageCircle, ExternalLink, BarChart3, Cpu, Lock } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
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

  const integrations = [
    { name: "Plug Wallet", icon: "🔌", color: "from-orange-400 to-red-500" },
    { name: "Internet Identity", icon: "🆔", color: "from-blue-400 to-indigo-500" },
    { name: "OpenAI", icon: "🧠", color: "from-green-400 to-teal-500" },
    { name: "ICP", icon: "⚡", color: "from-purple-400 to-pink-500" },
    { name: "Eliza OS", icon: "🤖", color: "from-yellow-400 to-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b border-white/20 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  MomentumFi
                </span>
                <p className="text-xs text-gray-500 -mt-1">AI-Powered DeFi</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Docs
              </Button>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-white font-bold text-3xl">M</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>

            <h1 className="text-6xl sm:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                MomentumFi
              </span>
            </h1>

            <p className="text-2xl text-gray-600 mb-4 font-medium">AI Agent for ckBTC Auto-Rebalancing</p>

            <p className="text-xl text-blue-600 font-semibold mb-12 max-w-3xl mx-auto">
              AI-powered portfolio optimization with Chain Fusion & OpenAI
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl text-lg px-8 py-4 h-auto"
              >
                Launch App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 hover:border-gray-400 text-lg px-8 py-4 h-auto bg-white/50 backdrop-blur-sm"
            >
              View Docs
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">$2.4M+</div>
              <div className="text-gray-600">Total Value Locked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">15.7%</div>
              <div className="text-gray-600">Average APY</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">1,200+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intelligent DeFi Automation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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

      {/* Integration Logos */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powered by Leading Technologies</h2>
          <p className="text-xl text-gray-600 mb-16">
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
                  <p className="font-bold text-gray-900 text-lg">{integration.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Optimize Your Portfolio?</h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of users who trust MomentumFi for intelligent DeFi portfolio management
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50 shadow-xl text-lg px-8 py-4 h-auto font-semibold"
              >
                Start Trading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 h-auto font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">MomentumFi</span>
                  <p className="text-sm text-gray-400">AI-Powered DeFi</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The future of decentralized finance powered by artificial intelligence and Internet Computer Protocol.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 MomentumFi. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <p className="text-yellow-400 text-sm font-semibold flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Built for Hackathon Demo Purposes
                </p>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
