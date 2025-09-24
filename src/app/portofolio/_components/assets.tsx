'use client';
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function Assets() {
    return (
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
    );
}