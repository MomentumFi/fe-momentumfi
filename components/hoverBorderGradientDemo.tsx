"use client";
import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { ArrowRight } from "lucide-react";

export default function HoverBorderGradientDemo() {
    return (
        <div className="flex justify-center text-center">
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-slate-800 text-white flex space-x-2"
            >
                <span>Launch App</span>
                <ArrowRight className="ml-1 h-5 w-5" />
            </HoverBorderGradient>
        </div>
    );
}
