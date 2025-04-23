"use client";
import { Suspense } from 'react';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/UI/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CardTitle,
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/UI/card";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import {
  isUserExsists,
  Register,
  getTxn,
  countIdToAddress,
} from "../../../wagmi/method";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const RegisterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Utilisation pour lire les paramètres d'URL
  const [sponsor, setSponsor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const { address, isConnected } = useAccount();
  const [wallet, setWallet] = useState<string>("");
  useEffect(() => {
    if (isConnected && address) {
      setWallet(address as string); // Ensure it's treated as a string
      localStorage.setItem("savedAddress", address);
    }
  }, [address, isConnected]);
  const navigate = (path: string) => {
    router.push(path);
  };
  const sendNotifcation = (
    message: string,
    state: "success" | "error" | "warning" | "info"
  ) => {
    toast[state](message);
  };

  useEffect(() => {
    const referral = searchParams.get("ref");
    if (referral) {
      setSponsor(referral);
    }
  }, [searchParams]);

  const register = async () => {
    try {
      if (isConnected) {
        setIsLoading(true);
        if (!name) {
          sendNotifcation("Please enter your username", "error");
          setIsLoading(false);
          return;
        }
        if (!sponsor) {
          sendNotifcation("Please enter your upliner id", "error");
          setIsLoading(false);
          return;
        }

        if (sponsor.startsWith("0x")) {
          if (sponsor) {
            // console.log("inside if condition");
            let userexsists = await isUserExsists(sponsor);
            let alreadyregistered = await isUserExsists(wallet);
            if (alreadyregistered) {
              toast.error("user already exsists", {
                onClose: () => router.push("/login"),
                autoClose: 1500,
              });
              setIsLoading(false);
              return;
            } else {
              if (userexsists) {
                let reg = await Register(sponsor, name);
                let txncnfrm = await getTxn(reg);
                if (txncnfrm) {
                  router.push("/login");
                }

                // console.log(reg);

                setIsLoading(false);
                return;
              } else {
                sendNotifcation("sponsor doesnot exsists", "error");
                setIsLoading(false);
                return;
              }
            }
          }
          setIsLoading(false);
        } else {
          const addressById = (await countIdToAddress(sponsor)) as string;
          // console.log("data comming here issssss this ",addressById);

          let useradress = addressById;
          let userexsists = await isUserExsists(useradress);
          let alreadyregistered = await isUserExsists(wallet);
          if (alreadyregistered) {
            toast.error("user already exsists", {
              onClose: () => router.push("/login"), // Redirect when toast closes
              autoClose: 1500, // Delay for 3 seconds
            });
            setIsLoading(false);
            return;
          } else {
            // console.log("useradress is ", userexsists);
            if (userexsists) {
              let reg = await Register(useradress, name);
              let txncnfrm = await getTxn(reg);
              if (txncnfrm) {
                router.push("/login");
              }
              // console.log(reg);

              setIsLoading(false);
              return;
            } else {
              sendNotifcation("sponsor doesnot exsists", "error");
              setIsLoading(false);
              return;
            }
          }
        }
      } else {
        toast.error("connect wallet", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#050810] text-white min-h-screen flex flex-col">
      {/* Gradient background elements */}
      <div
        className="fixed inset-0 bg-gradient-radial from-[#00a3ff]/5 via-transparent to-transparent pointer-events-none"
        style={{ top: "-20%", left: "-20%", width: "140%", height: "140%" }}
      />
      <div
        className="fixed inset-0 bg-gradient-radial from-[#9333EA]/5 via-transparent to-transparent pointer-events-none"
        style={{ bottom: "-20%", right: "-20%", width: "140%", height: "140%" }}
      />

      {/* Animated grid background */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00a3ff10 1px, transparent 1px), linear-gradient(to right, #00a3ff10 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header */}
      <header className="w-full py-4 border-b border-gray-800/80 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Brain className="w-8 h-8 text-[#00a3ff]" />
            </motion.div>
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent transition-all duration-500"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              WEB3 SONIC
            </motion.span>
          </div>
        <div>
          <ConnectButton label="Connect wallet" />
        </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-md bg-gray-900/50 border border-gray-800 backdrop-blur-md shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
              Register Account
            </CardTitle>
            <CardDescription className="text-gray-400 text-center pt-1">
              Create your Web3 Sonic account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                register();
              }}
              className="space-y-4"
            >
              {/* Username field */}
              <div className="space-y-2">
                <Label className="text-gray-300">Sponsor</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Choose a username"
                    value={sponsor}
                    onChange={(e) => setSponsor(e.target.value)}
                    className="pl-10 bg-gray-800/80 border-gray-700 focus:border-blue-500 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Nick Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Enter a nickname to register"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-gray-800/80 border-gray-700 focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00a3ff] to-[#9333EA] hover:from-[#0096eb] hover:to-[#8023d5] transition-all duration-300 font-medium"
             disabled={isLoading}
             >
                <div className="flex items-center justify-center">
                  Register <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-6 pt-0">
            <p className="text-sm text-gray-400">
              Already have an account?
              <a
                href="/login"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Login here
              </a>
            </p>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-gray-800/80 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Web3 Sonic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <ToastContainer
        toastStyle={{
          borderRadius: "0px", // Coins carrés
        }}
        theme="dark"
      />
    </div>
  );
};

export default RegisterPage;
