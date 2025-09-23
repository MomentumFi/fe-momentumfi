"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, ChevronDown, Search, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

export default function PortofolioDashboard() {
    const [assetsVisible, setAssetsVisible] = useState(false)
    const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
    const [selectedCurrency, setSelectedCurrency] = useState("BTC")
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)

    const timeframes = ["1D", "1W", "1M", "3M", "6M"]

    const currencies = [
        { code: "BTC", name: "Bitcoin", rate: 1 },
        { code: "USDT", name: "Tether", rate: 67000 },
        { code: "USDC", name: "USD Coin", rate: 67000 },
        { code: "ETH", name: "Ethereum", rate: 26.5 },
        { code: "IDR", name: "Indonesian Rupiah", rate: 1020000000 },
    ]

    const getConvertedBalance = () => {
        const baseBTCAmount = 0.00001489 // Base BTC amount
        const selectedCurrencyData = currencies.find((c) => c.code === selectedCurrency)
        if (!selectedCurrencyData) return { amount: 0, idr: 998.61 }

        const convertedAmount = baseBTCAmount * selectedCurrencyData.rate
        return {
            amount: convertedAmount,
            idr: (baseBTCAmount * currencies.find((c) => c.code === "IDR")!.rate) / 1000000, // Convert to readable IDR
        }
    }

    const calculatePnL = () => {
        const currentValue = getConvertedBalance().idr
        const initialInvestment = 950.0 // Initial investment in IDR
        const pnl = currentValue - initialInvestment
        const pnlPercentage = (pnl / initialInvestment) * 100

        return {
            amount: pnl,
            percentage: pnlPercentage,
            isProfit: pnl >= 0,
        }
    }

    const getChartData = (timeframe: string) => {
        const balance = getConvertedBalance()
        const baseMultiplier = balance.amount / 0.00001489 // Ratio to scale chart data

        const baseData = {
            "1D": [
                { time: "23:00", value: 998.61 * (balance.idr / 998.61), date: "09-21 23:00" },
                { time: "03:00", value: 1020.45 * (balance.idr / 998.61), date: "09-22 03:00" },
                { time: "07:00", value: 1035.22 * (balance.idr / 998.61), date: "09-22 07:00" },
                { time: "11:00", value: 1055.78 * (balance.idr / 998.61), date: "09-22 11:00" },
                { time: "12:00", value: 1060.14 * (balance.idr / 998.61), date: "09-22 12:00" },
                { time: "15:00", value: 1045.33 * (balance.idr / 998.61), date: "09-22 15:00" },
                { time: "19:00", value: 1025.67 * (balance.idr / 998.61), date: "09-22 19:00" },
                { time: "23:00", value: 1010.89 * (balance.idr / 998.61), date: "09-22 23:00" },
            ],
            "1W": [
                { time: "09-15", value: 950.25 * (balance.idr / 998.61), date: "09-15" },
                { time: "09-16", value: 975.8 * (balance.idr / 998.61), date: "09-16" },
                { time: "09-17", value: 1020.45 * (balance.idr / 998.61), date: "09-17" },
                { time: "09-18", value: 1055.3 * (balance.idr / 998.61), date: "09-18" },
                { time: "09-19", value: 1080.75 * (balance.idr / 998.61), date: "09-19" },
                { time: "09-20", value: 1065.2 * (balance.idr / 998.61), date: "09-20" },
                { time: "09-21", value: 1040.85 * (balance.idr / 998.61), date: "09-21" },
                { time: "09-22", value: 1010.89 * (balance.idr / 998.61), date: "09-22" },
            ],
            "1M": [
                { time: "08-22", value: 800.5 * (balance.idr / 998.61), date: "08-22" },
                { time: "08-29", value: 850.75 * (balance.idr / 998.61), date: "08-29" },
                { time: "09-05", value: 920.3 * (balance.idr / 998.61), date: "09-05" },
                { time: "09-12", value: 980.45 * (balance.idr / 998.61), date: "09-12" },
                { time: "09-19", value: 1080.75 * (balance.idr / 998.61), date: "09-19" },
                { time: "09-22", value: 1010.89 * (balance.idr / 998.61), date: "09-22" },
            ],
            "3M": [
                { time: "Jun", value: 600.25 * (balance.idr / 998.61), date: "June 2024" },
                { time: "Jul", value: 720.8 * (balance.idr / 998.61), date: "July 2024" },
                { time: "Aug", value: 850.45 * (balance.idr / 998.61), date: "August 2024" },
                { time: "Sep", value: 1010.89 * (balance.idr / 998.61), date: "September 2024" },
            ],
            "6M": [
                { time: "Apr", value: 400.5 * (balance.idr / 998.61), date: "April 2024" },
                { time: "May", value: 520.75 * (balance.idr / 998.61), date: "May 2024" },
                { time: "Jun", value: 600.25 * (balance.idr / 998.61), date: "June 2024" },
                { time: "Jul", value: 720.8 * (balance.idr / 998.61), date: "July 2024" },
                { time: "Aug", value: 850.45 * (balance.idr / 998.61), date: "August 2024" },
                { time: "Sep", value: 1010.89 * (balance.idr / 998.61), date: "September 2024" },
            ],
        }
        return baseData[timeframe as keyof typeof baseData] || baseData["1D"]
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
                    <p className="text-white text-sm font-medium">{data.date}</p>
                    <p className="text-cyan-400 text-sm">{payload[0].value.toFixed(2)} IDR</p>
                </div>
            )
        }
        return null
    }

    const formatBalance = () => {
        const balance = getConvertedBalance()
        if (selectedCurrency === "BTC") {
            return balance.amount.toFixed(8)
        } else if (selectedCurrency === "IDR") {
            return (balance.amount / 1000000).toFixed(2)
        } else {
            return balance.amount.toFixed(4)
        }
    }

    const transactions = [
        {
            type: "Transfer",
            direction: "Azzega Spot to Azzega OTC account",
            quantity: "10.64953248 USDT",
            time: "2025-09-07 19:56",
            status: "Success",
        },
        {
            type: "Deposit",
            direction: "to Spot account",
            quantity: "+2.666386 APT",
            time: "2025-09-02 18:44",
            status: "Success",
        },
        {
            type: "Withdraw",
            direction: "From Spot account",
            quantity: "-2.47752 APT",
            time: "2025-09-02 16:35",
            status: "Success",
        },
        {
            type: "Transfer",
            direction: "Azzega OTC account to Azzega Spot",
            quantity: "7.9 USDT",
            time: "2025-09-02 16:30",
            status: "Success",
        },
        {
            type: "Transfer",
            direction: "Azzega OTC account to Azzega Spot",
            quantity: "2.77163096 USDT",
            time: "2025-09-02 16:18",
            status: "Success",
        },
    ]

    return (
        <div className="min-h-screen text-white">
            {/* Main Content */}
            <main className="w-full p-32">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Assets Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Portofolio Overview</h1>
                        <p className="text-gray-400 text-sm">Last updated: {new Date().toLocaleString()}</p>
                    </div>
                    <p className="text-gray-400">Track your assets and investments</p>

                    {/* Balance Card */}
                    <Card className="bg-gray-900 border-gray-800 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-400 text-lg">Total balance</span>
                                <button onClick={() => setAssetsVisible(!assetsVisible)} className="text-gray-400 hover:text-white">
                                    {assetsVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>

                        <div className="mb-4">
                            {assetsVisible ? (
                                <div className="flex items-center">
                                    <span className="text-4xl font-bold">{formatBalance()}</span>
                                    <div className="relative ml-3">
                                        <button
                                            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                                            className="flex items-center space-x-1 text-gray-400 hover:text-white text-lg"
                                        >
                                            <span>{selectedCurrency}</span>
                                            <ChevronDown className="w-5 h-5" />
                                        </button>

                                        {showCurrencyDropdown && (
                                            <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                                                {currencies.map((currency) => (
                                                    <button
                                                        key={currency.code}
                                                        onClick={() => {
                                                            setSelectedCurrency(currency.code)
                                                            setShowCurrencyDropdown(false)
                                                        }}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white first:rounded-t-lg last:rounded-b-lg"
                                                    >
                                                        {currency.code}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setShowCurrencyDropdown(false)}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-400 border-t border-gray-600 rounded-b-lg"
                                                >
                                                    More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <span className="text-4xl font-bold">******</span>
                            )}
                        </div>

                        <div className="text-gray-400 mb-8">
                            {assetsVisible ? `≈ ${getConvertedBalance().idr.toFixed(2)} IDR` : "****"}
                        </div>

                        {assetsVisible && (
                            <div className="mb-8">
                                <span className="text-gray-400">Total PnL </span>
                                <span className={`font-medium ${calculatePnL().isProfit ? "text-green-400" : "text-red-400"}`}>
                                    {calculatePnL().isProfit ? "+" : ""}
                                    {calculatePnL().amount.toFixed(2)} IDR
                                </span>
                                <span className={`ml-2 ${calculatePnL().isProfit ? "text-green-400" : "text-red-400"}`}>
                                    ({calculatePnL().isProfit ? "+" : ""}
                                    {calculatePnL().percentage.toFixed(2)}%)
                                </span>
                            </div>
                        )}

                        {!assetsVisible && (
                            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-8">
                                <div className="flex items-center space-x-2 text-orange-400">
                                    <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                                        <span className="text-xs text-black">!</span>
                                    </div>
                                    <span className="text-sm">
                                        Your assets are hidden. Click the eye icon in the upper right corner to show your assets.
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="flex space-x-4 mb-8">
                            <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3">
                                Deposit
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                            <Button
                                variant="outline"
                                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent px-6 py-3"
                            >
                                Buy crypto
                            </Button>
                            <Button
                                variant="outline"
                                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent px-6 py-3"
                            >
                                Withdraw
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                            <Button
                                variant="outline"
                                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent px-6 py-3"
                            >
                                Transfer
                            </Button>
                        </div>

                        {/* Chart */}
                        <div className="relative">
                            <div className="flex justify-end space-x-2 mb-6">
                                {timeframes.map((timeframe) => (
                                    <button
                                        key={timeframe}
                                        onClick={() => setSelectedTimeframe(timeframe)}
                                        className={`px-4 py-2 rounded text-sm transition-all duration-200 ${selectedTimeframe === timeframe
                                            ? "bg-gray-700 text-white shadow-md"
                                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        {timeframe}
                                    </button>
                                ))}
                            </div>

                            <div className="h-64 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={getChartData(selectedTimeframe)}>
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                                        <YAxis hide />
                                        <Tooltip
                                            content={<CustomTooltip />}
                                            cursor={{ stroke: "#9333EA", strokeWidth: 1, strokeDasharray: "3 3" }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#9333EA"
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 4, fill: "#9333EA", stroke: "#1f2937", strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>

                    {/* Assets Table */}
                    <Card className="bg-gray-900 border-gray-800">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex space-x-6">
                                    <button className="text-white border-b-2 border-cyan-500 pb-2">Assets</button>
                                    <button className="text-gray-400 hover:text-white pb-2">Accounts</button>
                                </div>
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-gray-400 text-sm">
                                            <th className="text-left py-3">Coin</th>
                                            <th className="text-right py-3">Quantity</th>
                                            <th className="text-right py-3">Ratio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={3} className="text-center py-12">
                                                <div className="flex flex-col items-center space-y-2">
                                                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                                                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                                    </div>
                                                    <span className="text-gray-400">No data found.</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-gray-900 border-gray-800 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Flexible loans, seamless trading</h3>
                                    <p className="text-gray-400 text-sm mb-4">VIP only. Up to 20% off interest rates</p>
                                    <p className="text-cyan-400 text-sm">Crypto Loans</p>
                                </div>
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">%</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-gray-900 border-gray-800 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Guaranteed returns, flexible access</h3>
                                    <p className="text-gray-400 text-sm mb-4">Earn steady returns on your deposits</p>
                                    <p className="text-cyan-400 text-sm">Savings</p>
                                </div>
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card className="bg-gray-900 border-gray-800">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent activity</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-gray-400 text-sm">
                                            <th className="text-left py-3">Type</th>
                                            <th className="text-left py-3">Direction</th>
                                            <th className="text-right py-3">Quantity</th>
                                            <th className="text-right py-3">Time</th>
                                            <th className="text-right py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((tx, index) => (
                                            <tr key={index} className="border-t border-gray-800">
                                                <td className="py-3 text-sm">{tx.type}</td>
                                                <td className="py-3 text-sm text-gray-400">{tx.direction}</td>
                                                <td className="py-3 text-sm text-right">{tx.quantity}</td>
                                                <td className="py-3 text-sm text-right text-gray-400">{tx.time}</td>
                                                <td className="py-3 text-sm text-right">
                                                    <span className="text-green-400">{tx.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>

                    {/* Security Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-gray-900 border-gray-800 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">$600 million Protection Fund</h3>
                                    <p className="text-gray-400 text-sm mb-4">Your security, our priority</p>
                                    <button className="text-cyan-400 text-sm hover:underline">View more</button>
                                </div>
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-gray-600 rounded-full"></div>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-gray-900 border-gray-800 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Proof of Reserves</h3>
                                    <p className="text-gray-400 text-sm mb-4">1:1 reserve of all users' funds on our platform</p>
                                    <button className="text-cyan-400 text-sm hover:underline">View my audit</button>
                                </div>
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-gray-600 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
