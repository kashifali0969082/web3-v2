"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  ArrowRight,
  User,
  Lock,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useWeb3 } from '@/lib/Web3Provider';
// import { useLocation } from 'wouter';
// import { Button } from '@/components/ui/button';
import { Button } from "@/components/UI/button";
// import { Web3Button } from '@/components/Web3Button';
import { ToastContainer, toast } from "react-toastify";

// import { useToast } from '@/hooks/use-toast';
import { useToast } from "@/components/hooks/use-toast";
// import { CardTitle, Card, CardDescription, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import {
  CardTitle,
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/UI/card";
// import { Input } from '@/components/ui/input';
import { Input } from "@/components/UI/input";
// import { Label } from '@/components/ui/label';
import { Label } from "@/components/UI/label";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { isUserExsists, IdtoAdress } from "../../../wagmi/method";
const LoginPage = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [wallet, setWallet] = useState<string>("");

  const notify = () => toast("Hello from toast!");
  // Load saved address from localStorage on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("savedAddress");
    if (savedAddress) {
      setWallet(savedAddress);
    }
  }, []);

  // Update input field when the wallet address changes
  useEffect(() => {
    if (isConnected && address) {
      setWallet(address);
      localStorage.setItem("savedAddress", address);
    }
  }, [address, isConnected]);

  // Save manually entered address
  const saveAddress = async () => {
    if (wallet) {
      localStorage.setItem("savedAddress", wallet);
      Exsists();
    }
  };
  const Exsists = async () => {
    if (!isConnected) {
      toast.error("Connect wallet to continue");
      return;
    }
    if (
      wallet === "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9" ||
      wallet === "126"
    ) {
      {
        if (address === "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9") {
          router.push(`/dashboard?Address=${wallet}`);
        } else {
          toast.error("no user for this address", {
            onClose: () => router.push("/register"),
            autoClose: 1500,
          });
          return
        }
      }
    } else {
      if (wallet.startsWith("0x")) {
        let userExists = await isUserExsists(wallet);
        if (userExists) {
          router.push(`/dashboard?Address=${wallet}`);
          return;
        } else {
          toast.error("User does not exist. Please register.", {
            onClose: () => router.push("/register"),
            autoClose: 1500,
          });
        }
      } else {
        // console.log("else condition is working");
        let idtoadr = (await IdtoAdress(wallet)) as string[];
        // console.log("llllllllllllllllllllllllllllllllllllllllll", idtoadr[1]);
        let userExists = await isUserExsists(idtoadr[1].toString());

        if (userExists) {
          router.push(`/dashboard?Address=${idtoadr[1]}`);
        } else {
          toast.error("User does not exist. Please register.", {
            onClose: () => router.push("/register"),
            autoClose: 1500,
          });
        }
      }
    }
    return;
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
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900/50 border border-gray-800 backdrop-blur-md shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
              Login to Web3 Sonic
            </CardTitle>
            <CardDescription className="text-gray-400 text-center pt-2">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveAddress();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Enter an Address or connect wallet
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="0x0...."
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="pl-10 bg-gray-800/80 border-gray-700 focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00a3ff] to-[#9333EA] hover:from-[#0096eb] hover:to-[#8023d5] transition-all duration-300 font-medium"
              >
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={Exsists}
                >
                  Login <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-6 pt-0">
            <p className="text-sm text-gray-400">
              Don't have an account?
              <a
                href="/register"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Register now
              </a>
            </p>
          </CardFooter>
        </Card>
        <ToastContainer
          toastStyle={{
            borderRadius: "0px", // Coins carrés
          }}
          theme="dark"
        />
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
    </div>
  );
};

export default LoginPage;
