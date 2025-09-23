"use client"

import { useState, useEffect } from "react"
import { useAccount, useBalance, useDisconnect } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
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
  const { address, isConnected, chain } = useAccount()
  const { data: balance, isLoading: balanceLoading, refetch: refetchBalance } = useBalance({
    address: address,
  })
  const { disconnect } = useDisconnect()

  const [countdown, setCountdown] = useState(1847)
  const [ethPrice, setEthPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch ETH price from CoinGecko (realtime)
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await res.json();
        setEthPrice(data.ethereum.usd);
      } catch (err) {
        setEthPrice(2680); // fallback
      }
    };
    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 60_000); // refresh tiap 1 menit
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 3600))
    }, 1000)
    const loadingTimeout = setTimeout(() => setLoading(false), 1800);
    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimeout);
    }
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

  // Function to refresh wallet balance
  const handleRefreshBalance = async () => {
    if (isConnected && refetchBalance) {
      setLoading(true);
      await refetchBalance();
      setLoading(false);
    }
  };

  // Calculate portfolio value in USD
  const portfolioValue = balance && ethPrice
    ? parseFloat(balance.formatted) * ethPrice
    : 0;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-24">
        {/* Portfolio Overview */}
        <div className="mb-8">
          {/* Portfolio Title Section */}
          <div className="mb-6 text-center justify-Center">
            <h1 className="text-3xl font-bold text-white">Portfolio Dashboard</h1>
            <p className="text-gray-400 mt-1">AI-powered portfolio optimization and rebalancing</p>
          </div>

          {!isConnected ? (
            // Wallet not connected - show connect button
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
              <div className="text-center">
                <Wallet className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
                <p className="text-gray-400 mb-6">Connect your wallet to view and manage your portfolio</p>
              </div>
            </div>
          ) : (
            // Wallet connected - show dashboard content
            <>
              {loading ? (
                <div className="flex items-center justify-between mb-6">
                  <Skeleton className="h-12 w-1/4" />
                  <Skeleton className="h-12 w-1/3" />
                  <Skeleton className="h-12 w-1/4" />
                </div>
              ) : (
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
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">
                        {balanceLoading
                          ? "Loading..."
                          : portfolioValue > 0
                            ? `$${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`
                            : "No balance"
                        }
                      </p>
                      {balance && (
                        <p className="text-sm text-gray-400">
                          {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                        </p>
                      )}
                      {chain && (
                        <p className="text-xs text-blue-400">
                          Connected to {chain.name}
                        </p>
                      )}
                      <p className="text-sm text-green-400 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +$1,234 (5.7%) today
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-gray-800/60 backdrop-blur-sm border-gray-700 text-gray-300 hover:text-white"
                      onClick={handleRefreshBalance}
                      disabled={balanceLoading}
                    >
                      <RefreshCw className={`h-4 w-4 ${balanceLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Token Prices Panel */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-40 w-full" />
                  ))
                  : prices.map((price) => (
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
                                    ? "https://static.icpswap.com/logo/mxzaz-hqaaa-aaaar-qaada-cai"
                                    : price.symbol === "ckETH"
                                      ? "https://static.icpswap.com/logo/ss2fx-dyaaa-aaaar-qacoq-cai"
                                      : "https://static.icpswap.com/logo/cngnf-vqaaa-aaaar-qag4q-cai"
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
                {/* Portfolio Allocation */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="h-6 w-6 text-blue-400 mr-3" />
                        <div>
                          <span className="text-xl text-white">Portfolio Balance</span>
                          <p className="text-sm text-gray-400 font-normal">Current vs Target allocation</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Total Value</p>
                        <p className="text-xl font-bold text-white">$22,780</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {portfolio.map((item) => (
                      <div key={item.token} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-300">{item.token}</span>
                          <div className="text-right">
                            <span className="text-white font-bold">{item.amount}</span>
                            <p className="text-sm text-gray-400">{item.current}% / {item.target}%</p>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={item.current} className="h-2" />
                          <div
                            className="absolute top-0 h-2 bg-gray-600 rounded"
                            style={{ left: `${item.target}%`, width: "2px" }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Next Rebalance</span>
                        <div className="flex items-center text-blue-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="font-mono">{formatTime(countdown)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Market Analysis */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border border-gray-800">
                  <CardHeader>
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
              </div>

              {/* Transaction History */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="h-6 w-6 text-purple-400 mr-3" />
                      <div>
                        <span className="text-xl text-white">Transaction History</span>
                        <p className="text-sm text-gray-400 font-normal">Recent automated trades</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-900/50 text-green-300 border-green-700">
                        4 Executed
                      </Badge>
                      <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-700">
                        1 Pending
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700 hover:bg-gray-800/50">
                          <TableHead className="text-gray-300">Time</TableHead>
                          <TableHead className="text-gray-300">From</TableHead>
                          <TableHead className="text-gray-300">To</TableHead>
                          <TableHead className="text-gray-300">Amount</TableHead>
                          <TableHead className="text-gray-300">Mode</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Tx Hash</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {history.map((row, index) => (
                          <TableRow key={index} className="border-gray-700 hover:bg-gray-800/50">
                            <TableCell className="font-medium text-gray-300">
                              <div className="text-sm">{row.timestamp.split(" ")[1]}</div>
                              <div className="text-xs text-gray-500">{row.timestamp.split(" ")[0]}</div>
                            </TableCell>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}