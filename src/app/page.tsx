"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Link, Zap, ExternalLink, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LinkData {
  Short_Link: string;
  ref_link: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    try {
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
      setUrl("");

      handleLinkLoading();
    } catch (error) {
      console.error("Error creating short URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkLoading = async () => {
    try {
      const response = await fetch("/api/load", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      const links = json.links;
      setLinks(links);
    } catch (error) {
      console.error("Error loading links:", error);
    }
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await fetch("/api/validate-token", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          handleLinkLoading();
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

  const copyToClipboard = async (text: string, index?: number) => {
    try {
      await navigator.clipboard.writeText(text);
      if (index !== undefined) {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-400 to-blue-600">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-white" />
            <h1 className="font-bold text-white text-4xl">QuickBitly</h1>
          </div>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Transform your long URLs into short, shareable links in seconds
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
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
                  disabled={isLoading}
                  className="w-full h-12 bg-white text-blue-600 hover:bg-white/90 font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? "Shortening..." : "Shorten URL"}
                </Button>
              </form>

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
                      onClick={() => copyToClipboard(shortUrl)}
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

          {/* Links List */}
          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-xl">Your Links</CardTitle>
                <Button
                  onClick={handleLinkLoading}
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {links.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/60">No links created yet</p>
                </div>
              ) : (
                links.map((link, index) => (
                  <Card key={index} className="bg-white/10 border-white/20">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Short Link */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-white/80 text-xs font-medium mb-1">
                              Short Link
                            </p>
                            <p className="text-white font-mono text-sm truncate">
                              {link.Short_Link}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              onClick={() =>
                                copyToClipboard(link.Short_Link, index)
                              }
                              variant="outline"
                              size="sm"
                              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-8 w-8 p-0"
                            >
                              {copiedIndex === index ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                            <Button
                              onClick={() => openLink(link.Short_Link)}
                              variant="outline"
                              size="sm"
                              className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-8 w-8 p-0"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-white/80 text-xs font-medium mb-1">
                              Original URL
                            </p>
                            <p className="text-white/90 text-sm truncate">
                              {link.ref_link}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
