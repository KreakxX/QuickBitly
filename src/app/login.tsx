"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Link, Zap } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-400 to-blue-600">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h1 className="font-bold text-white text-4xl">QuickBitly</h1>
        </div>
        <p className="text-white/80 text-lg max-w-md mx-auto">Login </p>
      </div>
      <div></div>
    </div>
  );
}
