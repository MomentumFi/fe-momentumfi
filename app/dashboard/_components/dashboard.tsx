"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import ConnectPlug from "@/components/wallet/connect-wallet"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  Wallet,
  TrendingUp,
  TrendingDown,
  Zap,
  BarChart3,
  Settings,
  RefreshCw,
  AlertTriangle,
  Target,
  Activity,
} from "lucide-react"

export function Dashboard() {
  const [countdown, setCountdown] = useState(1847)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 3600))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const prices = [
    {
      symbol: "ckBTC",
      name: "Chain Key Bitcoin",
      price: 43250.5,
      change: 2.34,
      changePercent: 5.7,
      icon: "₿",
      color: "from-orange-400 to-orange-600",
    },
    {
      symbol: "ckETH",
      name: "Chain Key Ethereum",
      price: 2680.25,
      change: -45.3,
      changePercent: -1.7,
      icon: "Ξ",
      color: "from-blue-400 to-blue-600",
    },
    {
      symbol: "ckUSDT",
      name: "Chain Key Tether",
      price: 1.0,
      change: 0.001,
      changePercent: 0.1,
      icon: "₮",
      color: "from-green-400 to-green-600",
    },
  ]

  const trendData = {
    rsi: 68.5,
    ma7: 42850,
    ma30: 41200,
    trend: "Bullish" as const,
    volumeSpike: true,
    confidence: 87,
  }

  const portfolio = [
    { token: "ckBTC", current: 45, target: 60, color: "bg-orange-500", amount: "$12,450" },
    { token: "ckETH", current: 35, target: 30, color: "bg-blue-500", amount: "$8,230" },
    { token: "ckUSDT", current: 20, target: 10, color: "bg-green-500", amount: "$2,100" },
  ]

  const history = [
    {
      timestamp: "2024-01-15 14:30:25",
      from: "ckUSDT",
      to: "ckBTC",
      amount: "2,500 USDT",
      mode: "Auto",
      status: "Executed" as const,
      txHash: "0x1234...5678",
    },
    {
      timestamp: "2024-01-15 09:15:42",
      from: "ckETH",
      to: "ckBTC",
      amount: "1.5 ETH",
      mode: "Semi-Auto",
      status: "Executed" as const,
      txHash: "0x2345...6789",
    },
    {
      timestamp: "2024-01-14 16:45:18",
      from: "ckBTC",
      to: "ckUSDT",
      amount: "0.1 BTC",
      mode: "Manual",
      status: "Pending" as const,
      txHash: "0x3456...7890",
    },
    {
      timestamp: "2024-01-14 11:20:33",
      from: "ckUSDT",
      to: "ckETH",
      amount: "5,000 USDT",
      mode: "Auto",
      status: "Skipped" as const,
      txHash: "0x4567...8901",
    },
  ]

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Executed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "Skipped":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Executed: "bg-green-900/50 text-green-300 border-green-700",
      Pending: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
      Skipped: "bg-red-900/50 text-red-300 border-red-700",
    }
    return variants[status as keyof typeof variants] || "bg-gray-800 text-gray-300"
  }


  const [mode, setMode] = useState<"Manual" | "Semi-Auto" | "Auto">("Semi-Auto")

  return (
    <div className="min-h-screen">
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
              <ConnectPlug />
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm rounded-xl p-1 border border-gray-700">
              {(["Manual", "Semi-Auto", "Auto"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${mode === m
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="center justify-center text-center">
              <h1 className="text-3xl font-bold text-white">Portfolio Dashboard</h1>
              <p className="text-gray-400 mt-1">AI-powered portfolio optimization and rebalancing</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-2xl font-bold text-white">$22,780</p>
                <p className="text-sm text-green-400 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +$1,234 (5.7%) today
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-800/60 backdrop-blur-sm border-gray-700 text-gray-300 hover:text-white"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Token Prices Panel */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {prices.map((price) => (
            <Card
              key={price.symbol}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border border-gray-800"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                      <img
                        src={
                          price.symbol === "ckBTC"
                            ? "https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_640.png"
                            : price.symbol === "ckETH"
                              ? "https://icon2.cleanpng.com/20180621/ltf/kisspng-ethereum-blockchain-bitcoin-logo-see-you-there-5b2b2447696084.9131561015295539914316.jpg"
                              : "https://img.freepik.com/premium-psd/tether-coin-logo-cryptocurrency-high-resolution-3d-render-transparant_513203-250.jpg"
                        }
                        alt={price.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">{price.symbol}</p>
                      <p className="text-xs text-gray-400">{price.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center ${price.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {price.change >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-bold">
                        {price.changePercent >= 0 ? "+" : ""}
                        {price.changePercent}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">${price.price.toLocaleString()}</p>
                  <p className={`text-sm font-medium ${price.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {price.change >= 0 ? "+" : ""}${price.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Trend Analysis Panel */}
          <Card className="border-0 shadow-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  {trendData.trend === "Bullish" ? (
                    <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-400 mr-3" />
                  )}
                  <div>
                    <span className="text-xl text-white">Market Trend Analysis</span>
                    <p className="text-sm text-gray-400 font-normal">Real-time AI insights</p>
                  </div>
                </div>
                <Badge
                  className={`${trendData.trend === "Bullish" ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"} px-3 py-1`}
                >
                  {trendData.trend}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">RSI (14)</span>
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">{trendData.rsi}</p>
                  <Progress value={trendData.rsi} className="mt-2" />
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">Confidence</span>
                    <Activity className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">{trendData.confidence}%</p>
                  <Progress value={trendData.confidence} className="mt-2" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-300">MA7</span>
                  <span className="font-bold text-white">${trendData.ma7.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-300">MA30</span>
                  <span className="font-bold text-white">${trendData.ma30.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-700 pt-3">
                  <span className="text-sm font-medium text-gray-300">Volume Spike</span>
                  <div className="flex items-center">
                    {trendData.volumeSpike && <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />}
                    <Badge
                      variant={trendData.volumeSpike ? "destructive" : "secondary"}
                      className={trendData.volumeSpike ? "bg-red-900/50 text-red-300" : "bg-gray-800 text-gray-300"}
                    >
                      {trendData.volumeSpike ? "Detected" : "Normal"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rebalance Strategy Card */}
          <Card className="border-0 shadow-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 text-blue-400 mr-3" />
                <div>
                  <span className="text-xl text-white">Rebalance Strategy</span>
                  <p className="text-sm text-gray-400 font-normal">AI-recommended allocation</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {portfolio.map((item) => (
                  <div key={item.token} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-medium text-white">{item.token}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">
                          {item.current}% → {item.target}%
                        </p>
                        <p className="text-sm text-gray-400">{item.amount}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: `${item.target}%` }}
                        />
                      </div>
                      <div className="absolute top-0 left-0 w-full h-2 bg-gray-600/50 rounded-full">
                        <div
                          className="h-2 bg-gray-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.current}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-700 space-y-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-lg py-3">
                  <Zap className="mr-2 h-5 w-5" />
                  Execute Rebalance
                </Button>
                {mode === "Semi-Auto" && (
                  <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-blue-300 mb-2">Next auto-rebalance in:</p>
                    <p className="text-2xl font-mono font-bold text-blue-400">{formatTime(countdown)}</p>
                  </div>
                )}
                {mode === "Auto" && (
                  <div className="bg-green-900/30 border border-green-800 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      <p className="text-sm font-medium text-green-300">Auto-rebalancing active</p>
                    </div>
                    <p className="text-xs text-green-400">Monitoring market conditions...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Log Table */}
        <Card className="border-0 shadow-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-gray-400 mr-3" />
                <span className="text-xl text-white">Rebalancing History</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800/60 border-gray-700 text-gray-300 hover:text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="font-semibold text-gray-300">Timestamp</TableHead>
                    <TableHead className="font-semibold text-gray-300">From Token</TableHead>
                    <TableHead className="font-semibold text-gray-300">To Token</TableHead>
                    <TableHead className="font-semibold text-gray-300">Amount</TableHead>
                    <TableHead className="font-semibold text-gray-300">Mode</TableHead>
                    <TableHead className="font-semibold text-gray-300">Status</TableHead>
                    <TableHead className="font-semibold text-gray-300">Tx Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((row, index) => (
                    <TableRow key={index} className="border-gray-800 hover:bg-gray-800/30">
                      <TableCell className="font-mono text-sm text-gray-400">{row.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                          {row.from}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                          {row.to}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-gray-300">{row.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            row.mode === "Auto"
                              ? "bg-green-900/50 text-green-300 border-green-700"
                              : row.mode === "Semi-Auto"
                                ? "bg-blue-900/50 text-blue-300 border-blue-700"
                                : "bg-gray-800 text-gray-300 border-gray-700"
                          }
                        >
                          {row.mode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(row.status)}
                          <Badge className={getStatusBadge(row.status)}>{row.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">{row.txHash}</code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
