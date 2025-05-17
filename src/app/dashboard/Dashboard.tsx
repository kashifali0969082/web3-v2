"use client";
export const dynamic = "force-dynamic";
import React from "react";
import { useState, useEffect } from "react";
import "../../components/lib/youtube-types";
import { ProfileImageUpload } from "@/components/ProfileImageUpload";
import { SonicLogo } from "@/components/SonicLogo";
import CoinGeckoWidgets from "@/components/CoinGeckoWidgets";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TradeSonicButton } from "@/components/TradeSonicButton";
import { OpenOceanModal } from "@/components/OpenOceanModal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ChatWidget from "@/components/ChatWidget";
import {
  Wallet,
  LogOut,
  ArrowLeft,
  Brain,
  User,
  Menu,
  X,
  Network,
  Users,
  BarChart3,
  Share2,
  Settings,
  RefreshCw,
  ChevronRight,
  Star,
  Youtube,
  Twitter,
  Bitcoin,
  ArrowUpDown,
  Coins,
  ExternalLink,
  UserPlus,
  PieChart,
  Activity,
  Hash,
  Gift,
  MessageSquare,
  HelpCircle,
  Zap,
  TrendingUp,
  MessageCircle,
  Phone,
  Video as VideoIcon,
  Trophy,
  Check,
  Lock,
  Droplet,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Component } from "lucide-react";

import { Button } from "@/components/UI/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/UI/card";
import { Separator } from "@/components/UI/separator";
import { Input } from "@/components/UI/input";
import { Badge } from "@/components/UI/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { SummaryStats } from "@/components/SummaryStats";
import { TeamStats } from "@/components/UI/TeamStats-fixed";
import { ErrorBoundary } from "@/components/UI/ErrorBoundary";
import StatsBadges from "@/components/UI/StatsBadges";
import ImageCardsGrid from "@/components/UI/ImageCardsGrid";
import LevelUpgradeCards from "@/components/LevelUpgradeCards";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import WBTCUpgradeCards from "@/components/WBTCUpgradeCards";
import {
  getUSERLEVEL,
  PurchaseLevel,
  isUserExsists,
  AdressToID,
  getUser,
  GetUplinerAdress,
} from "../../../wagmi/method";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NewYearCountdown from "@/components/UI/Counter";
const Dashboard = () => {
  const [level, setLevel] = useState<number>(0);
  // const [loadingLevel, setLoadingLevel] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adress, setAddress] = useState("xxx");
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [openOceanModalOpen, setOpenOceanModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const urlAddress = searchParams.get("Address");
  const { address, isConnected } = useAccount();
  const [origin, setOrigin] = useState("");
  const [checker, SetCheker] = useState<boolean>(false);
  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);
  const [UplinerId, setUplinerId] = useState<number>(0);
  const { disconnect } = useDisconnect();
  const [updateState, setUpdateState] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [referralLink, setReferralLink] = useState<string>("");
  const [wbtcPrice, setwbtcPrice] = useState("");
  const [sonicPrice, setsonicPrice] = useState("");
  const [username, setUsername] = useState<string>("Unknown");

  console.log("owner urladress", urlAddress, adress);
  useEffect(() => {
    if (
      urlAddress === address ||
      address === "0xb893d029d1DA24D4DEe3c93aa23E41A0BFc413e9" ||
      address === "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9"
    ) {
      // console.log(" owner ----------------- firstif");
      // if (address === "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9") {
      //   console.log("owner ---------------- snd if");
      setAddress(urlAddress || "");
      return;
      // }
      //  else {
      //   console.log("owner else condition");
      //   setAddress("");
      //   return;
      // }
      // }
    }
  }, [urlAddress]);
  useEffect(() => {
    GetUserLevel();
  }, [updateState]);
  const getusername = async () => {
    try {
      if (!adress || adress.length !== 42 || !adress.startsWith("0x")) {
        // console.log("Invalid Ethereum address:", adress);
        return;
      }

      let resp = await getUser(adress);

      if (!resp) {
        console.error("getUser() returned undefined.");
        return;
      }

      // setUser(resp);
      setUsername(resp.name || "Unknown User");
      // setJoinDate(resp.joiningDate ? resp.joiningDate.toString() : "N/A");
    } catch (error) {
      console.error("Error while loading user data:", error);
    }
  };
  const GetUserLevel = async () => {
    try {
      let resp = await getUSERLEVEL(adress);

      setLevel(resp ?? 0);
    } catch (error) {
      console.log("error while getting user level", error);
    }
  };
  useEffect(() => {
    if (adress != "") {
      GetUserLevel();
      getusername();
    }
    getPrices();
    userAdress();
  }, [adress]);

  const getPrices = async () => {
    try {
      const Sonic = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=S&tsyms=USD"
      );
      const WBTC = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=WBTC&tsyms=USD"
      );
      // const SatPrice = await axios.get(
      //   "https://min-api.cryptocompare.com/data/price?fsym=SAT&tsyms=USD"
      // );
      // console.log("----------------wbtc", SatPrice;
      setsonicPrice(Sonic.data.USD);
      setwbtcPrice(WBTC.data.USD);
      // console.log("----------------sonic", Sonic.data.USD);
    } catch (error) {
      console.log("error getting from api", error);
    }
  };

  const socialLinks = [
    {
      name: "Youtube",
      icon: Youtube,
      url: "https://www.youtube.com/@web3sonic",
      color: "hover:text-red-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/SonicLabs",
      color: "hover:text-blue-400",
    },
    {
      name: "Telegram",
      icon: MessageCircle,
      url: "#",
      color: "hover:text-blue-500",
    },
    {
      name: "Live Chat",
      icon: MessageSquare,
      url: "#",
      color: "hover:text-purple-500",
    },
  ];

  const handleCopyReferralLink = () => {
    const refLink = `${window.location.origin}/dashboard?Address=${adress}`;
    navigator.clipboard.writeText(refLink);
    toast.success("Link Copied", {
      autoClose: 1500,
    });
  };

  const handleDisconnect = () => {
    disconnect();
    router.push("/login");
  };
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected]);
  const userAdress = async () => {
    try {
      const userid = await AdressToID(adress);
      setUserId(userid);
      const uplinerAdress = await GetUplinerAdress(adress);
      const upliner = await AdressToID(uplinerAdress);
      setUplinerId(upliner);

      // const uplinerid=await
    } catch (error) {
      console.log("error while getting user adress or upliner id", error);
    }
  };

  // Add YouTube API and player script
  useEffect(() => {
    // Add CSS for player controls
    const style = document.createElement("style");
    style.textContent = `
      .player-controls {
        display: flex;
        gap: 10px;
        margin: 10px 0;
      }
  
      .player-controls button {
        padding: 8px 15px;
        background: #ff0000;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
  
      .player-controls button:hover {
        background: #cc0000;
      }
    `;
    document.head.appendChild(style);

    // Load YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Define YouTube player functions in window scope
    // @ts-ignore
    window.onYouTubeIframeAPIReady = function () {
      // @ts-ignore - YouTube API types not available
      window.player = new YT.Player("youtube-player", {
        videoId: "",
        playerVars: {
          listType: "playlist",
          list: "PLHw5NbJrajOaVlIKIY2JbT4qUahiWEHJj",
          autoplay: 1,
          mute: 1, // Start muted
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    function onPlayerReady(event: any) {
      const muteBtn = document.getElementById("mute-btn");
      const nextBtn = document.getElementById("next-btn");

      muteBtn?.addEventListener("click", toggleMute);
      nextBtn?.addEventListener("click", playNext);

      // Start muted
      window.player.mute();
      setIsMuted(true);

      // Set button text based on initial state
      if (muteBtn) {
        muteBtn.textContent = "Unmute";
      }
    }

    function onPlayerStateChange(event: any) {
      // Add logic here if needed
    }

    function toggleMute() {
      if (!window.player || typeof window.player.unMute !== "function") {
        console.log("YouTube player not ready");
        return;
      }

      setIsMuted((prevMuted) => {
        const newMuted = !prevMuted;
        const muteBtn = document.getElementById("mute-btn");

        if (newMuted) {
          window.player.mute();
          if (muteBtn) muteBtn.textContent = "Unmute";
        } else {
          window.player.unMute();
          if (muteBtn) muteBtn.textContent = "Mute";
        }

        return newMuted;
      });
    }

    function playNext() {
      if (window.player && typeof window.player.nextVideo === "function") {
        window.player.nextVideo();
      }
    }

    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }

    // Cleanup
    return () => {
      document.head.removeChild(style);

      document
        .getElementById("mute-btn")
        ?.removeEventListener("click", toggleMute);
      document
        .getElementById("next-btn")
        ?.removeEventListener("click", playNext);

      if (window.player && typeof window.player.destroy === "function") {
        window.player.destroy();
      }

      const youtubeScripts = document.querySelectorAll(
        'script[src*="youtube.com/iframe_api"]'
      );
      youtubeScripts.forEach((script) => {
        script.parentNode?.removeChild(script);
      });
    };
  }, []);

  useEffect(() => {
    checkerFunction();
  }, [isConnected, address]);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const checkerFunction = async () => {
    try {
      const userexsists = await isUserExsists(address?.toString() || "");
      // console.log("user is here true or false", userexsists);
      SetCheker(true);

      if (isConnected) {
        if (userexsists) {
          // console.log("user is connected and user exsists too");
          SetCheker(true);
        } else {
          router.push("/register");
        }
      }
    } catch (error) {
      console.log("error while checking user", error);
    }
  };
  const renderSidebar = () => {
    return (
      <aside
        className={`bg-gray-900 border-r border-gray-800 h-full overflow-auto fixed lg:relative w-64 ${
          isMobileMenuOpen ? "block" : "hidden"
        } lg:block z-50`}
      >
        <div className="flex flex-col w-full">
          <div className="bg-gray-900 w-full flex justify-center items-center py-4 border-b border-gray-800">
            <div className="flex items-center w-full justify-center">
              <SonicLogo width={70} height={70} className="mr-3" />
              <h1 className="text-xl font-bold text-white">Web3 Sonic</h1>
            </div>
          </div>
          <div className="p-4 flex justify-end lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-400"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Profile Image Upload - Now top left under the logo with user info */}
        {adress && (
          <div className="py-6 px-4 flex flex-col items-center border-b border-gray-800 bg-gray-850/20">
            <div className="w-24 h-24 mb-3">
              <ProfileImageUpload
                walletAddress={adress}
                // onImageChange={(imageUrl) =>
                //   // console.log("Profile image updated:", imageUrl)
                // }
              />
            </div>

            {/* User name/address display */}
            {/* <h3 className="text-lg font-bold text-white mb-3">
              {userName || formatAddress(address || '')}
            </h3> */}

            {/* Display user ID badge */}
            <div className="mb-2">
              <Badge
                variant="outline"
                className="text-xs bg-blue-500/10 text-blue-400 border-blue-400/20 flex items-center gap-1 py-1"
              >
                <Hash className="h-3 w-3" />
                <span className="ml-1">User ID: {userId}</span>
              </Badge>
            </div>
            <div className="mb-2">
              <Badge
                variant="outline"
                className="text-xs bg-blue-500/10 text-blue-400 border-blue-400/20 flex items-center gap-1 py-1"
              >
                <span className="ml-1">Name: {username}</span>
              </Badge>
            </div>

            {/* Update Profile button */}
            {/* <Button 
              variant="outline" 
              size="sm" 
              className="mt-1 w-32 bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
            >
              Update Profile
            </Button> */}
          </div>
        )}

        <div className="p-4">
          <nav className="space-y-1">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>

            <Button
              variant={activeTab === "wallet" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                router.push(
                  `${window.location.origin}/downlines?Address=${adress}`
                );
              }}
            >
              <Star className="h-4 w-4 mr-2" />
              Sonic matrix
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400"
              onClick={() =>
                router.push(
                  `${window.location.origin}/active-matrix?Address=${adress}`
                )
              }
            >
              <Network className="h-4 w-4 mr-2" />
              Active matrix
            </Button>

            <Button
              variant={activeTab === "wallet" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                router.push(
                  `${window.location.origin}/comp-matrix?Address=${adress}`
                );
              }}
            >
              <Component className="h-4 w-4 mr-2" />
              Completed Matrix
            </Button>

            <Button
              variant={activeTab === "network" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() =>
                window.open(
                  `https://sonicscan.org/address/0x1EB2F315eA3d4888000818F750975B7C5010A987`,
                  "_blank"
                )
              }
            >
              <Network className="h-4 w-4 mr-2" />
              Registration Contract
            </Button>
            <Button
              variant={activeTab === "referrals" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() =>
                window.open(
                  `https://sonicscan.org/address/0x67Bd6B550a05900B688C351006789cE31054f940`,
                  "_blank"
                )
              }
            >
              <Users className="h-4 w-4 mr-2" />
              Sonic Contract
            </Button>

            <Button
              variant={activeTab === "referrals" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() =>
                window.open(
                  `https://sonicscan.org/address/0x100D09F73F95f650eC86cC6EF91Fa5e0135F378e`,
                  "_blank"
                )
              }
            >
              <Wallet className="h-4 w-4 mr-2" />
              Bitcoin Contract
            </Button>
            <Button
              variant={activeTab === "network" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() =>
                window.open(`https://bzillion.club/signup/AUZI397GT`, "_blank")
              }
            >
              <Network className="h-4 w-4 mr-2" />
              Start Building
            </Button>
            <Button
              variant={activeTab === "swap" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setOpenOceanModalOpen(true)}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Swap WBTC
            </Button>

            {/* <Button
              variant={activeTab === "levels" ? "secondary" : "ghost"}
              className="w-full justify-start "
              // onClick={() => navigate("/levels")}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Levels
            </Button> */}
            <Button
              variant={activeTab === "livestream" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() =>
                (window.location.href = "https://web3sonic.com/live-stream")
              }
            >
              <Youtube className="h-4 w-4 mr-2" />
              Live Stream
            </Button>
            {/* <Button
              variant={activeTab === "game" ? "secondary" : "ghost"}
              className="w-full justify-start"
              // onClick={() => navigate("/game")}
            >
              <Droplet className="h-4 w-4 mr-2" />
              Web3 Game
            </Button> */}
          </nav>

          <Separator className="my-6 bg-gray-800" />

          {/* Links from Home Page */}
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400"
              onClick={() => window.open("https://rabby.io", "_blank")}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Download Wallet
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-amber-400 hover:text-amber-300"
              onClick={() =>
                window.open("https://my.soniclabs.com/points", "_blank")
              }
            >
              <Star className="h-4 w-4 mr-2" />
              Sonic Points
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-purple-400 hover:text-purple-300"
              // onClick={() => navigate("/grimface-scale")}
            >
              <Zap className="h-4 w-4 mr-2" />
              GrimFace AI
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400"
              onClick={() =>
                window.open("https://dapp.web3sonic.com", "_blank")
              }
            >
              <Zap className="h-4 w-4 mr-2" />
              Web3 Sonic
            </Button>
          </nav>

          <Separator className="my-6 bg-gray-800" />

          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400"
              onClick={() => window.open("https://sonicscan.org", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Explorer
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400"
              onClick={() => window.open("https://web3sonic.com/documentation")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Support
            </Button>
            {/* <Button
              variant="ghost"
              className="w-full justify-start text-gray-400"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button> */}
          </nav>

          <div className=" bottom-4 left-0 w-full px-4">
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleDisconnect}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      </aside>
    );
  };

  // console.log("origin is",origin);

  return (
    <>
      {checker ? (
        <>
          <div className="bg-gray-950 text-white min-h-screen">
            {/* Add ChatWidget component */}
            <ChatWidget />

            <div className="flex h-full">
              {renderSidebar()}

              <main className="flex-1 h-full overflow-y-auto smooth-scroll">
                {/* Mobile Header - Menu button only */}
                <div className="lg:hidden bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
                  <div className="flex justify-between items-center p-3">
                    {/* Logo - Mobile Only */}
                    <div className="flex items-center">
                      <SonicLogo width={32} height={32} className="ml-2" />
                      <span className="text-lg font-bold ml-2 text-white">
                        Sonic<span className="text-primary">Matrix</span>
                      </span>
                    </div>

                    {/* Menu Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMobileMenu}
                      className="text-gray-400"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 md:p-5 lg:p-8 pb-24 lg:pb-32 w-full">
                  {/* Mobile Quick Actions Bar for easy access to key functions */}
                  <div className="lg:hidden mb-4 flex overflow-x-auto gap-3 pb-2 scrollbar-hide -mx-1 px-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0 bg-green-500/10 text-green-400 border-green-400/30 hover:bg-green-500/20 h-10 px-4 shadow-sm active:scale-95 transition-all duration-200"
                      // onClick={() => navigate("/network-stats")}
                    >
                      <Network className="h-4 w-4 mr-1.5" />
                      Network
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0 bg-blue-500/10 text-blue-400 border-blue-400/30 hover:bg-blue-500/20 h-10 px-4 shadow-sm active:scale-95 transition-all duration-200"
                      onClick={() => {
                        router.push(
                          `${window.location.origin}/downlines?Address=${adress}`
                        );
                      }}
                    >
                      <Users className="h-4 w-4 mr-1.5" />
                      Referrals
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0 bg-purple-500/10 text-purple-400 border-purple-400/30 hover:bg-purple-500/20 h-10 px-4 shadow-sm active:scale-95 transition-all duration-200"
                      // onClick={() => navigate("/levels")}
                    >
                      <Star className="h-4 w-4 mr-1.5" />
                      Levels
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0 bg-amber-500/10 text-amber-400 border-amber-400/30 hover:bg-amber-500/20 h-10 px-4 shadow-sm active:scale-95 transition-all duration-200"
                      // onClick={() => navigate("/game")}
                    >
                      <Droplet className="h-4 w-4 mr-1.5" />
                      Game
                    </Button>

                    {/* <UpgradeLevelButton address={ undefined} /> */}
                  </div>

                  {/* Page Header - Mobile Only */}
                  <header className="mb-6 lg:hidden">
                    <div className="flex flex-col items-start">
                      <div className="">
                        <div className="flex items-center justify-between w-full gap-4 bg-gray-900/50 border border-gray-800 rounded-lg p-3 mb-2">
                          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text text-transparent">
                            Dashboard
                          </h1>

                          {/* Mobile heading elements removed */}
                        </div>
                        {/* <div className="flex items-center mt-1">
                    <ErrorBoundary>
                      {/* <Web3BTCPriceHeader /> 
                      header here
                    </ErrorBoundary>
                  </div> */}
                        <p className="text-gray-400 mt-1">
                          Welcome to your Web3 Sonic dashboard
                          {userName ? `, ${userName}` : ""}
                        </p>
                      </div>
                    </div>
                  </header>

                  {/* Desktop - welcome message only, since we have the new header above */}
                  <header className="hidden lg:block mb-6">
                    <div className="flex justify-between items-center bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">
                          <span className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text text-transparent">
                            Welcome to your Web3 Sonic dashboard
                            {userName ? `, ${userName}` : ""}
                          </span>
                        </h1>
                      </div>

                      {/* Desktop Header Components - right side section */}
                      <div className="flex items-center gap-4">
                        {/* Sonic Token Info */}
                        <div className="flex items-center bg-gray-800 rounded-lg border border-gray-700 p-2 gap-2">
                          <div className="flex items-center gap-2 px-1">
                            <SonicLogo width={20} height={20} />
                            <div className="flex flex-col">
                              <div className="text-sm font-medium">
                                Sonic Token (S)
                              </div>
                              <div className="text-xs text-gray-400">
                                Current Price: {sonicPrice}$
                              </div>
                            </div>
                          </div>
                          <TradeSonicButton className="bg-blue-600 text-white hover:bg-blue-500 h-8 px-3 ml-2 text-sm" />
                        </div>

                        {/* YouTube Audio Player and Live Stream Button */}
                        <div
                          id="youtube-audio-player"
                          className="flex items-center gap-3"
                        >
                          {/* Audio Player Controls */}
                          <div className="player-controls">
                            <button
                              id="mute-btn"
                              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2"
                            >
                              Unmute
                            </button>
                            <button
                              id="next-btn"
                              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2"
                            >
                              Play Next
                            </button>

                            {/* Live Stream Button - Moved here */}
                            <button
                              className="  bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
                              onClick={() =>
                                (window.location.href =
                                  "https://web3sonic.com/live-stream")
                              }
                            >
                              <VideoIcon className="h-4 w-4 mr-1" />
                              <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                              </span>
                              Live Stream
                            </button>
                          </div>

                          {/* Single YouTube Player for both desktop and mobile - controlled via JavaScript */}
                          <iframe
                            id="youtube-player"
                            width="0"
                            height="0"
                            src="https://www.youtube.com/embed/videoseries?list=PLHw5NbJrajOaVlIKIY2JbT4qUahiWEHJj&autoplay=1&enablejsapi=1&mute=1"
                            frameBorder="0"
                            allow="autoplay"
                            style={{ display: "none" }}
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </header>

                  {/* Mobile Live Stream Button Only */}
                  <div className="lg:hidden mb-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 flex justify-center gap-4 flex-wrap">
                      {/* Mobile Live Stream Button */}
                      <SummaryStats />
                      <button
                        className="w-100 px-4 py-2 bg-red-600  justify-center text-white rounded-md hover:bg-red-700 flex items-center"
                        style={{ width: "100%" }}
                        onClick={() =>
                          (window.location.href =
                            "https://web3sonic.com/live-stream")
                        }
                      >
                        <VideoIcon className="h-4 w-4 mr-1" />
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Live Stream
                      </button>
                    </div>
                  </div>

                  {/* Mobile-only sections organized in tabs */}
                  <div className="lg:hidden mb-8">
                    {/* Mobile-only YouTube Video Player */}
                    <div className="mb-6">
                      <h3 className="text-base font-semibold mb-3 px-1 text-gray-300 bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text ">
                        Live Updates
                      </h3>
                      <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/videoseries?si=DE1YX-7y89scsWTn&amp;list=PLHw5NbJrajOaVlIKIY2JbT4qUahiWEHJj"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>

                    {/* Featured Stats - Highlighted key metrics for mobile */}
                    <div className="mb-6">
                      <h3 className="text-base font-semibold mb-3 px-1 text-gray-300 bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text ">
                        Quick Stats
                      </h3>
                      {/* Let the component handle fetching data directly from contract */}
                      <StatsBadges />
                    </div>

                    {/* Image Cards Grid with animated borders - Mobile */}
                    <div className="mb-6">
                      <h3 className="text-base font-semibold mb-3 px-1 text-gray-300 bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text ">
                        Featured Resources
                      </h3>
                      {/* <ImageCardsGrid /> */}
                    </div>

                    {/* Referral Link - More prominent on mobile */}
                    <Card className="bg-gray-800 border-gray-700 mb-6">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Share2 className="h-4 w-4 mr-2 text-blue-400" />
                          Your Referral Link
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex items-center">
                          <input
                            value={`${origin}/dashboard?Address=${adress}`}
                            readOnly
                            className="rounded-r-none bg-gray-700 border-gray-600"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="ml-2 bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                            onClick={handleCopyReferralLink}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Share this link to invite new members and earn rewards
                        </p>
                      </CardContent>
                    </Card>

                    {/* Social Links for Mobile */}
                    <div className="flex justify-center space-x-3 mb-6">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={index}
                            href={social.url}
                            className={`p-2.5 rounded-full bg-gray-800 border border-gray-700 text-gray-400 ${social.color} hover:bg-gray-700 transition-all duration-300 active:scale-95`}
                            title={social.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Desktop Summary Stats - Full width */}
                  <div className="hidden lg:block w-full">
                    <SummaryStats />

                    {/* Level Upgrade Cards - Moved above Featured Stats */}
                    <div className="mb-8 mt-6 w-full">
                      <ErrorBoundary>
                        <LevelUpgradeCards
                          currentLevel={level}
                          setUpdateState={setUpdateState}
                          updateState={updateState}
                        />
                      </ErrorBoundary>
                    </div>

                    {/* wBTC Upgrade Cards - New Bitcoin-based upgrade system */}
                    <div className="mb-8 w-full">
                      <ErrorBoundary>
                        <WBTCUpgradeCards />
                        {/* cards */}
                      </ErrorBoundary>
                    </div>

                    <div className="mb-8 w-full">
                      <Card className="relative bg-[#271e0b] border-amber-900/50 overflow-hidden">
                        <CardContent className="p-4 pt-4 pointer-cursor">
                          <div className="mb-6">
                            <div className="flex justify-center gap-2 mt-4">
                              <NewYearCountdown/>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Improved Badges for Total Income, Team Income, and Sonic Points */}
                    <div className="mb-8 w-full">
                      <h3 className="text-lg font-semibold mb-4 px-1 bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text text-transparent">
                        Featured Stats
                      </h3>
                      <StatsBadges />
                    </div>

                    {/* Image Cards Grid with animated borders */}
                    <div className="mb-8 w-full">
                      {/* <ImageCardsGrid /> */}
                    </div>
                  </div>

                  {/* Mobile-only Level Upgrade Cards */}
                  <div className="lg:hidden w-full mb-6">
                    <ErrorBoundary>
                      <LevelUpgradeCards
                        currentLevel={level}
                        setUpdateState={setUpdateState}
                        updateState={updateState}
                      />
                    </ErrorBoundary>
                  </div>

                  {/* Mobile-only wBTC Upgrade Cards */}
                  <div className="lg:hidden w-full mb-6">
                    <ErrorBoundary>
                      <WBTCUpgradeCards />
                      {/* cards */}
                    </ErrorBoundary>
                  </div>
                  <div className="lg:hidden w-full mb-6">
                    <ErrorBoundary>
                      <NewYearCountdown/>
                      {/* cards */}
                    </ErrorBoundary>
                  </div>

                  {/* Mobile-only Trade Sonic Button */}
                  <div className="lg:hidden w-full mb-6">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <ArrowUpDown className="h-4 w-4 mr-2 text-blue-400" />
                          Trade Sonic Token
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <TradeSonicButton className="w-full bg-blue-600 hover:bg-blue-500 h-10" />
                      </CardContent>
                      {/* <CardContent>
                        
                      </CardContent> */}
                    </Card>
                  </div>

                  {/* Level-based Features */}
                  <div className="mb-8">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00a3ff]/10 via-transparent to-[#f97316]/10 opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
                      <div className="absolute inset-[-1px] z-10 rounded-lg border border-[#00a3ff]/20 group-hover:border-[#00a3ff]/40 transition-colors duration-500 pointer-events-none"></div>
                      <div className="relative z-20">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                          <Star className="w-6 h-6 text-amber-500 mr-2" />
                          <span className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text text-transparent">
                            Membership Benefits and Features
                          </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* Basic Features (Level 1) */}
                          <div
                            className={`p-4 rounded-lg ${
                              level >= 1
                                ? "bg-gray-700/50 border-[#00a3ff]/30 relative overflow-hidden shadow-lg"
                                : "bg-gray-700/20 border-gray-600"
                            } border transition-all duration-300 hover:border-[#00a3ff]/50 hover:shadow-[#00a3ff]/20 group`}
                          >
                            {level >= 1 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-[#00a3ff]/5 via-transparent to-[#f97316]/5 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                            )}
                            <h3 className="font-semibold mb-2 flex items-center">
                              <MessageCircle className="w-4 h-4 mr-2 text-blue-400" />
                              Basic Communication
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <Check className="w-4 h-4 mr-2 text-green-400" />
                                Realtime Chat
                              </li>
                              <li className="flex items-center">
                                <Check className="w-4 h-4 mr-2 text-green-400" />
                                Basic Profile
                              </li>
                            </ul>
                          </div>

                          {/* Social Features (Level 2) */}
                          <div
                            className={`p-4 rounded-lg ${
                              level >= 2
                                ? "bg-gray-700/50 border-[#9333EA]/30 relative overflow-hidden shadow-lg"
                                : "bg-gray-700/20 border-gray-600"
                            } border transition-all duration-300 hover:border-[#9333EA]/50 hover:shadow-[#9333EA]/20 group`}
                          >
                            {level >= 2 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA]/5 via-transparent to-[#f97316]/5 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                            )}
                            <h3 className="font-semibold mb-2 flex items-center">
                              <Users className="w-4 h-4 mr-2 text-purple-400" />
                              Social Features
                              {level < 2 && (
                                <Lock className="w-4 h-4 ml-2 text-gray-500" />
                              )}
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 2
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Friend Connections
                              </li>
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 2
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Group Creation
                              </li>
                            </ul>
                          </div>

                          {/* Media Features (Level 3) */}
                          <div
                            className={`p-4 rounded-lg ${
                              level >= 3
                                ? "bg-gray-700/50 border-[#00a3ff]/30 relative overflow-hidden shadow-lg"
                                : "bg-gray-700/20 border-gray-600"
                            } border transition-all duration-300 hover:border-[#00a3ff]/50 hover:shadow-[#00a3ff]/20 group`}
                          >
                            {level >= 3 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-[#00a3ff]/5 via-transparent to-[#00a3ff]/5 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                            )}
                            <h3 className="font-semibold mb-2 flex items-center">
                              <VideoIcon className="w-4 h-4 mr-2 text-blue-400" />
                              Media Features
                              {level < 3 && (
                                <Lock className="w-4 h-4 ml-2 text-gray-500" />
                              )}
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 3
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Video Calling
                              </li>
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 3
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Video Reels
                              </li>
                            </ul>
                          </div>

                          {/* Pro Features (Level 4) */}
                          <div
                            className={`p-4 rounded-lg ${
                              level >= 4
                                ? "bg-gray-700/50 border-amber-500/30 relative overflow-hidden shadow-lg"
                                : "bg-gray-700/20 border-gray-600"
                            } border transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/20 group`}
                          >
                            {level >= 4 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                            )}
                            <h3 className="font-semibold mb-2 flex items-center">
                              <Trophy className="w-4 h-4 mr-2 text-amber-400" />
                              Pro Features
                              {level < 4 && (
                                <Lock className="w-4 h-4 ml-2 text-gray-500" />
                              )}
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 4
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Live Streaming
                              </li>
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 4
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                AI Features
                              </li>
                            </ul>
                          </div>

                          {/* Advanced Features (Level 5) */}
                          <div
                            className={`p-4 rounded-lg ${
                              level >= 5
                                ? "bg-gray-700/50 border-pink-500/30 relative overflow-hidden shadow-lg"
                                : "bg-gray-700/20 border-gray-600"
                            } border transition-all duration-300 hover:border-pink-500/50 hover:shadow-pink-500/20 group`}
                          >
                            {level >= 5 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/5 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                            )}
                            <h3 className="font-semibold mb-2 flex items-center">
                              <Zap className="w-4 h-4 mr-2 text-pink-400" />
                              Advanced Features
                              {level < 5 && (
                                <Lock className="w-4 h-4 ml-2 text-gray-500" />
                              )}
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 5
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Pro Package Access
                              </li>
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 5
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Ad Revenue Share
                              </li>
                            </ul>
                          </div>

                          {/* AI Tools & Resources (Level 3) */}
                          <div
                            className={`p-4 rounded-lg ${
                              level >= 3
                                ? "bg-gray-700/50 border-[#00a3ff]/30 relative overflow-hidden shadow-lg"
                                : "bg-gray-700/20 border-gray-600"
                            } border transition-all duration-300 hover:border-[#00a3ff]/50 hover:shadow-[#00a3ff]/20 group`}
                          >
                            {level >= 3 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-[#00a3ff]/5 via-transparent to-[#00a3ff]/5 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                            )}
                            <h3 className="font-semibold mb-2 flex items-center">
                              <Brain className="w-4 h-4 mr-2 text-blue-400" />
                              AI Tools & Resources
                              {level < 3 && (
                                <Lock className="w-4 h-4 ml-2 text-gray-500" />
                              )}
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 3
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                AI Content Generation
                              </li>
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 3
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Web3 AI Assistant
                              </li>
                            </ul>
                          </div>

                          {/* Mindset & Financial Training (Level 2) */}
                          <div
                            className={`p-4 rounded-lg ${
                              level >= 2
                                ? "bg-gray-700/50 border-[#9333EA]/30 relative overflow-hidden shadow-lg"
                                : "bg-gray-700/20 border-gray-600"
                            } border transition-all duration-300 hover:border-[#9333EA]/50 hover:shadow-[#9333EA]/20 group`}
                          >
                            {level >= 2 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA]/5 via-transparent to-[#f97316]/5 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                            )}
                            <h3 className="font-semibold mb-2 flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                              Mindset & Financial Training
                              {level < 2 && (
                                <Lock className="w-4 h-4 ml-2 text-gray-500" />
                              )}
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 2
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Wealth Building Courses
                              </li>
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 2
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Financial Strategy Calls
                              </li>
                            </ul>
                          </div>

                          {/* Web3 & DeFi Mastery (Level 4) */}
                          <div
                            className={`p-4 rounded-lg ${
                              level >= 4
                                ? "bg-gray-700/50 border-amber-500/30 relative overflow-hidden shadow-lg"
                                : "bg-gray-700/20 border-gray-600"
                            } border transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/20 group`}
                          >
                            {level >= 4 && (
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                            )}
                            <h3 className="font-semibold mb-2 flex items-center">
                              <Bitcoin className="w-4 h-4 mr-2 text-amber-400" />
                              Web3 & DeFi Mastery
                              {level < 4 && (
                                <Lock className="w-4 h-4 ml-2 text-gray-500" />
                              )}
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 4
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                DeFi Yield Strategies
                              </li>
                              <li className="flex items-center">
                                <Check
                                  className={`w-4 h-4 mr-2 ${
                                    level >= 4
                                      ? "text-green-400"
                                      : "text-gray-600"
                                  }`}
                                />
                                Smart Contract Training
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content - Dashboard content only (LiveStream is a separate page now) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-4 lg:mt-8">
                    {/* Left Column - Full width on mobile, 8/12 on desktop */}
                    <div className="lg:col-span-8 space-y-5 md:space-y-6">
                      {/* Wallet Section - Top Priority */}
                      <div id="wallet-section" className="w-full px-1 sm:px-0">
                        {/* <ErrorBoundary>
                      <WalletSection />
                    </ErrorBoundary> */}
                      </div>

                      {/* WEB3 BTC Price Projection with Benefits Section - Second Priority */}
                      <div className="w-full px-1 sm:px-0">
                        {/* <ErrorBoundary>
                          web3 btc price
                          <Web3BTCPrice />
                        </ErrorBoundary> */}
                      </div>

                      {/* Matrix Levels Display - Third Priority */}
                      <div className="w-full px-1 sm:px-0 overflow-x-auto">
                        {/* <SonicLevelsMatrix /> */}
                      </div>

                      {/* Team Stats - Fourth Priority */}
                      <div className="w-full px-1 sm:px-0">
                        <ErrorBoundary>
                          <TeamStats />
                        </ErrorBoundary>
                      </div>
                    </div>

                    {/* Right Column - Moves below main content on mobile, 4/12 on desktop */}
                    <div className="lg:col-span-4 space-y-5 md:space-y-6 mt-5 md:mt-6 lg:mt-0 px-1 sm:px-0">
                      {/* Hide duplicate Referral Link on desktop since we show it above on mobile */}
                      <div className="hidden lg:block w-full">
                        <Card className="bg-gray-800 border-gray-700">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              Your Referral Link
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="flex items-center mb-2">
                              <input
                                value={`${origin}/dashboard?Address=${adress}`}
                                readOnly
                                className="rounded-xl bg-gray-700 border-gray-600 px-1 py-2 "
                              />
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="ml-2"
                                      onClick={handleCopyReferralLink}
                                    >
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Copy referral link</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <p className="text-xs text-gray-400">
                              Share this link to invite new members and earn
                              rewards
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Trade Sonic Button - More prominent on desktop */}
                      <div className="w-full mb-4">
                        <Card className="bg-gray-800 border-gray-700">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg mb-2">
                              Trade Sonic Token
                            </CardTitle>
                            <CardDescription>
                              Direct trading via OpenOcean DEX
                            </CardDescription>
                            <div>
                              {/* <a
                                href="https://swap.matrixbnb.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src="https://assets.cdn.filesafe.space/sc2wM9qjh4FmcUD5WVtJ/media/678536591fc9eafe9b64f470.jpeg"
                                  alt="HTML tutorial"
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </a> */}

                              {/* <iframe
                                id="iframe-widget"
                                src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.01&amountFiat&backgroundColor=2B2B35&darkMode=true&from=btc&horizontal=false&isFiat=false&lang=en-US&link_id=a32a608282e97b&locales=true&logo=false&primaryColor=f6c511&to=s&toTheMoon=false"
                                style={{
                                  height: "356px",
                                  width: "100%",
                                  border: "none",
                                }}
                                title="ChangeNow Widget"
                              ></iframe> */}
                              {/* <iframe
                                id="iframe-widget"
                                src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.01&amountFiat&backgroundColor=2B2B35&darkMode=true&from=btc&horizontal=false&isFiat=false&lang=en-US&link_id=a32a608282e97b&locales=true&logo=false&primaryColor=f6c511&to=s&toTheMoon=false"
                                style={{
                                  height: "370px",
                                  width: " 100%",
                                  border: "none",
                                }}
                              ></iframe> */}

                              <TradeSonicButton className="w-full bg-blue-600 mb-4 hover:bg-blue-500" />

                              <script
                                defer
                                type="text/javascript"
                                src="https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js"
                              ></script>

                              <script src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"></script>
                              {/* <gecko-coin-price-chart-widget
                                  locale="en"
                                  dark-mode="true"
                                  outlined="true"
                                  coin-id="sonic-3"
                                  initial-currency="usd"
                                  width="100%"
                                ></gecko-coin-price-chart-widget> */}
                              {
                                React.createElement("gecko-coin-list-widget", {
                                  locale: "en",
                                  "dark-mode": "true",
                                  outlined: "true",
                                  "coin-ids":
                                    "sonic-3,bitcoin,ethereum,binancecoin,ripple,solana,matic-network",
                                  "initial-currency": "usd",
                                }) as any
                              }
                              <script src="https://widgets.coingecko.com/gecko-coin-list-widget.js"></script>
                              {/* <gecko-coin-list-widget
                                  locale="en"
                                  dark-mode="true"
                                  outlined="true"
                                  coin-ids="bitcoin,ethereum,binancecoin,solana,ripple"
                                  initial-currency="usd"
                                ></gecko-coin-list-widget> */}

                              <script src="https://widgets.coingecko.com/gecko-coin-converter-widget.js"></script>
                              {/* <gecko-coin-converter-widget
                                  locale="en"
                                  dark-mode="true"
                                  outlined="true"
                                  coin-id="sonic-3"
                                  initial-currency="usd"
                                  width="100%"
                                ></gecko-coin-converter-widget> */}

                              <iframe
                                width="100%"
                                height="590"
                                src="https://widget.openocean.finance?p=JTIzMTcxMjJCJTI0KiUyNCUyMzIyMjAzNyUyNColMjQlMjMxNzEyMmIlMjQqJTI0JTIzMjkyNzNEJTI0KiUyNCUyM2ZmZiUyNColMjQlMjM4QzdGOEMlMjQqJTI0JTIzRjhBRTEwJTI0KiUyNCUyM2ZmZmZmZiUyNColMjQlMjMzMzMxNDclMjQqJTI0JTIzYjFhN2IxJTI0KiUyNCUyMzQ3OWE0YiUyNColMjQlMjNGN0IyMjklMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0V2ViMyUyMEJUQyUyNColMjQweENlNzM3QTEzNTJBNUZlNDYyNjkyOWJiNTc0N0M1NWEwMkRDMzA3YjklMjQqJTI0MSUyNColMjRzb25pYyUyNColMjRTJTI0KiUyNFVTREMuZSUyNColMjQ="
                                title="OpenOcean Widget"
                                style={{ border: "none" }}
                              ></iframe>
                            </div>
                          </CardHeader>
                          {/* <CardContent className="space-y-4">

                            <div className="w-full rounded-lg overflow-hidden border border-gray-700 mt-4 hidden lg:block">
                              <div className="bg-gray-800 p-3 border-b border-gray-700">
                                <h4 className="text-sm font-medium text-white">
                                  OmniMiner Mining Platform
                                </h4>
                              </div>
                              <iframe
                                src="https://omniminer.io/?ref=0x9044E4E1eB49daf20572955944908485df85e40e"
                                className="w-full h-[1000px] bg-gray-900"
                                title="OmniMiner Platform"
                                loading="lazy"
                                allow="clipboard-write"
                              ></iframe>
                            </div>

                            {/* Mobile notice */}
                          {/* <div className="lg:hidden w-full rounded-lg overflow-hidden border border-gray-700 mt-4 p-4 bg-gray-900">
                              <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <h4 className="text-sm font-medium text-white">
                                  OmniMiner Platform
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  Please visit on desktop to view the OmniMiner
                                  platform.
                                </p>
                              </div>
                            </div> */}
                          {/* </CardContent> */}
                        </Card>
                      </div>

                      <div className="hidden lg:block w-full">
                        {/* <CoinGeckoWidgets /> */}
                      </div>
                    </div>
                  </div>

                  <div className="fixed bottom-4 right-4 lg:hidden z-40">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-gray-800 border border-gray-700 shadow-lg hover:bg-gray-700 transition-all duration-300 active:scale-95"
                      onClick={handleDisconnect}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Disconnect
                    </Button>
                  </div>
                </div>
              </main>
            </div>

            <OpenOceanModal
              isOpen={openOceanModalOpen}
              onClose={() => setOpenOceanModalOpen(false)}
            />
            <ToastContainer
              toastStyle={{
                borderRadius: "0px", // Coins carrés
              }}
              theme="dark"
            />
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-900 h-[100vh] flex justify-center items-center">
            <div className=" justify-center items-center max-w-sm mx-auto p-6 border border-gray-700 bg-gray-900 rounded-2xl shadow-lg ">
              <h2 className="text-xl font-semibold text-white text-center">
                Connect your wallet to continue
              </h2>
              <div className="mt-2 text-gray-300 flex justify-center items-center">
                <ConnectButton label="Connect wallet" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
