"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap, Clock, CheckCircle, XCircle } from "lucide-react"

export default function ExecuteRebalance({ mode, onExecute }: { mode: "Manual" | "Semi-Auto" | "Auto", onExecute?: () => void }) {
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(1847);
    const [status, setStatus] = useState<"idle" | "executing" | "success" | "error">("idle");

    useEffect(() => {
        if (mode === "Semi-Auto") {
            const timer = setInterval(() => {
                setCountdown((prev) => (prev > 0 ? prev - 1 : 3600));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [mode]);

    const handleExecute = async () => {
        setLoading(true);
        setStatus("executing");
        try {
            // Simulasi eksekusi rebalance
            await new Promise((res) => setTimeout(res, 1500));
            setStatus("success");
            if (onExecute) onExecute();
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
            setTimeout(() => setStatus("idle"), 1200);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-gray-900/80 border border-gray-800 rounded-xl p-8 shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-400" /> Execute Rebalance
            </h2>
            {mode === "Manual" && (
                <div className="mb-6">
                    <p className="text-gray-300 mb-2">Mode <span className="font-bold text-white">Manual</span>: Anda harus menekan tombol untuk melakukan rebalance secara langsung.</p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-lg py-3" onClick={handleExecute} disabled={loading}>
                        {loading ? <span>Memproses...</span> : <span>Execute Rebalance</span>}
                    </Button>
                </div>
            )}
            {mode === "Semi-Auto" && (
                <div className="mb-6">
                    <p className="text-gray-300 mb-2">Mode <span className="font-bold text-white">Semi-Auto</span>: Rebalance otomatis dijadwalkan, Anda bisa eksekusi manual kapan saja.</p>
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 text-center w-full">
                            <p className="text-sm font-medium text-blue-300 mb-2">Next auto-rebalance in:</p>
                            <p className="text-2xl font-mono font-bold text-blue-400">{`${Math.floor(countdown / 3600).toString().padStart(2, "0")}
                :${Math.floor((countdown % 3600) / 60).toString().padStart(2, "0")}
                :${(countdown % 60).toString().padStart(2, "0")}`}</p>
                        </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-lg py-3" onClick={handleExecute} disabled={loading}>
                        {loading ? <span>Memproses...</span> : <span>Execute Manual Rebalance</span>}
                    </Button>
                </div>
            )}
            {mode === "Auto" && (
                <div className="mb-6">
                    <p className="text-gray-300 mb-2">Mode <span className="font-bold text-white">Auto</span>: Rebalance berjalan otomatis sesuai kondisi pasar.</p>
                    <div className="bg-green-900/30 border border-green-800 rounded-lg p-4 text-center w-full mb-4">
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                            <p className="text-sm font-medium text-green-300">Auto-rebalancing active</p>
                        </div>
                        <p className="text-xs text-green-400">Monitoring market conditions...</p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg text-lg py-3" onClick={handleExecute} disabled={loading}>
                        {loading ? <span>Memproses...</span> : <span>Force Rebalance Now</span>}
                    </Button>
                </div>
            )}
            {status === "executing" && <div className="mt-4"><Skeleton className="h-8 w-full" /></div>}
            {status === "success" && <div className="mt-4 flex items-center gap-2 text-green-400"><CheckCircle className="h-5 w-5" /> Rebalance berhasil dieksekusi!</div>}
            {status === "error" && <div className="mt-4 flex items-center gap-2 text-red-400"><XCircle className="h-5 w-5" /> Gagal mengeksekusi rebalance.</div>}
        </div>
    );
}
