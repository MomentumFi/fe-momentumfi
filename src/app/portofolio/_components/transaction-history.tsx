'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Activity, CheckCircle, CheckCircle2, Clock, XCircle } from "lucide-react"

export default function TransactionHistory() {

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
    return (
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
    )
}