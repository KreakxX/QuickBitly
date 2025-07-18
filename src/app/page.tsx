"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Link, Zap } from "lucide-react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    const json = await response.json();
    const shortUrl = json.shortLink;
    setShortUrl(shortUrl);
  };

  const handleLinkLoading = async () => {
    const response = await fetch("/api/load", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    const links = json.links;
    console.log(links);
    setLinks(links);
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const response = await fetch("/api/validate-token", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (data.success) {
          return;
        } else {
          window.location.href = "/login";
          return;
        }
      } catch (error) {
        console.error("Token validation error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthToken();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-400 to-blue-600">
      <div className="container mx-auto px-4 py-50">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="font-bold text-white text-4xl">QuickBitly</h1>
          </div>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Transform your long URLs into short, shareable links in seconds
          </p>
        </div>

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
                  className="w-full h-12 bg-white text-blue-600 hover:bg-white/90 font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
                >
                  Shorten URL
                </Button>
              </form>
              <Button
                onClick={() => {
                  handleLinkLoading();
                }}
                className="w-full h-12 mt-5 bg-white text-blue-600 hover:bg-white/90 font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
              >
                Load Links
              </Button>

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

              <div className="mt-10">
                {links
                  ? links.map((link, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between">
                          <p className="font-bold text-white">
                            Short Link: {link.Short_Link}
                          </p>
                          <p className="text-white">
                            Ref Link: {link.ref_link}
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
