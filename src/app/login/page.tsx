"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Login() {
  // Login state
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    window.location.href = "/";
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const response = await fetch("/api/validate-token", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            window.location.href = "/";
            return;
          }
        }
      } catch (error) {
        console.error("Token validation error:", error);
      }
    };

    checkAuthToken();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-bold text-white text-4xl">QuickBitly</h1>
          </div>
          <p className="text-white/80 text-lg">
            Welcome! Please sign in or create an account.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/20 rounded-lg shadow-2xl border-0 overflow-hidden">
          <Tabs defaultValue="login" className="w-full p-5 ">
            <TabsList className="grid w-full grid-cols-2 bg-white/20  rounded-lg">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-gray-500 data-[state=active]:shadow-sm font-medium"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-gray-500 data-[state=active]:shadow-sm font-medium"
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="space-y-1 pb-6">
                  <CardTitle className="text-2xl font-bold text-center text-gray-800">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    Sign in to your account to continue
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="login-username"
                        className="text-sm font-medium text-gray-700"
                      >
                        Username
                      </Label>
                      <Input
                        id="login-username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="login-password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-200"
                    >
                      Login
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="space-y-1 pb-6">
                  <CardTitle className="text-2xl font-bold text-center text-gray-800">
                    Create Account
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    Sign up to get started with QuickBitly
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="register-username"
                        className="text-sm font-medium text-gray-700"
                      >
                        Username
                      </Label>
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="register-password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-200"
                    >
                      Register
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
