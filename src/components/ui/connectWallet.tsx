"use client";

import { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Wallet } from "lucide-react";

declare global {
    interface Window {
        ic: any;
    }
}

export default function ConnectWallet() {
    const [showWallets, setShowWallets] = useState(false);
    // const [connectedPlug, setConnectedPlug] = useState(false);
    // const [principalPlug, setPrincipalPlug] = useState("");
    const [connectedII, setConnectedII] = useState(false);
    const [principalII, setPrincipalII] = useState("");

    const shortenAddress = (address: string) => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };


    const handleShowWallets = () => {
        setShowWallets(true);
    };

    // Connect Plug Wallet
    // const connectPlug = async () => {
    //     if (window.ic && window.ic.plug) {
    //         const isConnected = await window.ic.plug.isConnected();
    //         if (!isConnected) {
    //             try {
    //                 await window.ic.plug.requestConnect({
    //                     whitelist: ["your-canister-id"], // optional
    //                     host: "https://mainnet.dfinity.network",
    //                 });
    //                 const principalId = await window.ic.plug.getPrincipal();
    //                 console.log("Plug Principal:", principalId);
    //                 setPrincipalPlug(principalId);
    //                 setConnectedPlug(true);
    //             } catch (error) {
    //                 console.error("User rejected connection", error);
    //             }
    //         } else {
    //             const principalId = await window.ic.plug.getPrincipal();
    //             console.log("Already connected Plug:", principalId);
    //             setPrincipalPlug(principalId);
    //             setConnectedPlug(true);
    //         }
    //     } else {
    //         alert("Plug Wallet not installed. Install at https://plugwallet.ooo");
    //     }
    // };

    // Connect Internet Identity
    const connectII = async () => {
        const authClient = await AuthClient.create();
        await authClient.login({
            identityProvider: "https://identity.ic0.app",
            onSuccess: async () => {
                const identity = await authClient.getIdentity();
                const principalId = identity.getPrincipal().toText();
                console.log("Internet Identity Principal:", principalId);
                setPrincipalII(principalId);
                setConnectedII(true);
            },
        });
    };

    return (
        <>
            <div>
                {connectedII ? (
                    <button
                        onClick={connectII}
                        className="flex items-center space-x-2 bg-green-100 text-green-800 hover:bg-green-200 border border-green-300 w-full rounded px-4 py-2"
                    >
                        <Wallet className="h-4 w-4" />
                        <span className="font-medium">{shortenAddress(principalII)}</span>
                    </button>
                ) : (
                    <button
                        onClick={connectII}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full rounded px-4 py-2 text-white"
                    >
                        <Wallet className="h-4 w-4" />
                        <span className="font-medium">Connect Internet Identity</span>
                    </button>
                )}
            </div>
            {/* <div className="space-y-4 p-4 rounded max-w-sm mx-auto"> */}
            {/* {!showWallets ? (
                <button
                    onClick={handleShowWallets}
                    className="w-full rounded bg-purple-600 px-4 py-2 text-white"
                >
                    Connect Wallets
                </button>
            ) : ( */}
            {/* <div>
                        {connectedPlug ? (
                            <p>🔌 Plug Connected: {principalPlug}</p>
                        ) : (
                            <button
                                onClick={connectPlug}
                                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
                            >
                                Connect Plug Wallet
                            </button>
                        )}
                    </div> */}
            {/* </div> */}

        </>
    );
}
