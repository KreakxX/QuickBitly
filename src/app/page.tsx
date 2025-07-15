"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Link, Zap } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-400 to-blue-600">
      <div className="container mx-auto px-4 py-50">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="font-bold text-white text-4xl">QuickBitly</h1>
          </div>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Transform your long URLs into short, shareable links in seconds
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="url"
                    className="text-white font-medium text-sm"
                  >
                    Enter your URL
                  </label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/very-long-url"
                      className="pl-10 h-12 bg-white/90 border-white/30 focus:border-white focus:ring-white/20 text-gray-800 placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !url}
                  className="w-full h-12 bg-white text-blue-600 hover:bg-white/90 font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                      Shortening...
                    </div>
                  ) : (
                    "Shorten URL"
                  )}
                </Button>
              </form>

              {/* Result */}
              {shortUrl && (
                <div className="mt-8 p-4 bg-white/20 rounded-lg border border-white/30">
                  <label className="text-white font-medium text-sm block mb-2">
                    Your shortened URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={shortUrl}
                      readOnly
                      className="bg-white/90 border-white/30 text-gray-800 font-mono"
                    />
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="icon"
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30 shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
