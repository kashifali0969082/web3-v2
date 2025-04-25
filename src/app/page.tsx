"use client";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import React from "react";
import {
  Brain,
  CheckCircle,
  ArrowRight,
  Lock,
  Menu,
  X,
  Crown,
  Star,
  Diamond,
  Award,
  Trophy,
  Youtube,
  Twitter,
  MessageCircle,
  Phone,
  MessagesSquare,
  PlayCircle,
  Users,
  UserPlus,
  RefreshCw,
  DollarSign,
  Sparkles,
  Wallet,
  Zap,
  Globe,
  ChevronRight,
  ArrowUpRight,
  MousePointer,
  Rocket,
  Clock,
  CreditCard,
  TrendingUp,
  Coins,
} from "lucide-react";
import { Button } from "../components/UI/button";
import { motion, AnimatePresence } from "framer-motion";
import ChatWidget from "../components/ChatWidget";
// import { useSonicPrice } from "../components/hooks/use-sonic-price";
// import { useWbtcPrice } from "../components/hooks/use-wbtc-price";
import axios from "axios";
import SonicLogo from "../components/SonicLogo";

import { BitcoinLogo } from "../components/BitcoinLogo";
// import { useToast } from "../components/hooks/use-toast";

const HomeDark = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("RFdihW4GxUk");
  const [logoText, setLogoText] = useState("WEB3 SONIC");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [wbtcPrice, setwbtcPrice] = useState("");
  const [sonicPrice, setsonicPrice] = useState("");

  // Use wBTC Price Hook for price display
  const getPrices = async () => {
    try {
      const Sonic = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=S&tsyms=USD"
      );
      const WBTC = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=WBTC&tsyms=USD"
      );
      console.log("----------------wbtc", WBTC.data.USD);
      setsonicPrice(Sonic.data.USD);
      setwbtcPrice(WBTC.data.USD);
      console.log("----------------sonic", Sonic.data.USD);
    } catch (error) {
      console.log("error getting from api", error);
    }
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    getPrices();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep logo text fixed as WEB3 SONIC
  useEffect(() => {
    setLogoText("WEB3 SONIC");
  }, []);

  // Get location/navigation (auto-redirect to dashboard removed)
  //   const [location, navigate] = useLocation();

  // // Detect mobile devices
  // useEffect(() => {
  //   const checkMobile = () => {
  //     const userAgent =
  //       navigator.userAgent || navigator.vendor || (window as any).opera;
  //     const isMobile =
  //       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //         userAgent
  //       );
  //     // setIsMobileDevice(isMobile);
  //   };

  //   checkMobile();
  //   window.addEventListener("resize", checkMobile);
  //   return () => window.removeEventListener("resize", checkMobile);
  // }, []);

  const steps = [
    {
      title: "Sonic Labs EVM Layer 1 Blockchain",
      description: (
        <>
          <span>Fastest Blockchain ! Low Transaction Fees ! </span>
          <span className="font-bold text-yellow-400 animate-pulse">
            KEEP 100% PROFIT !
          </span>
        </>
      ),
      icon: Brain,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30",
      videoId: "RFdihW4GxUk",
    },
    {
      title: "Sonic 'S' Token",
      description:
        "200m Sonic Airdrop | Earn Sonic Points | Huge Upside Potential",
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30",
      videoId: "0huMhts-5m0",
    },
    {
      title: "Web3 Sonic Smart Contract",
      description:
        "Instant Pay in 'S' tokens ! 100% on Odd Referrals ! 25% x 4 on Even Referrals",
      icon: ArrowRight,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/30",
      videoId: "oH6n5s36TAU",
    },
    {
      title: "Web3 Sonic AI Powered Marketing",
      description:
        "AI technology and automation tools that help you grow and scale your business.",
      icon: Lock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
      videoId: "Y_I0cMG0QTE",
    },
  ];

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
      name: "WhatsApp",
      icon: Phone,
      url: "https://chat.whatsapp.com/IQjIdDV97I0EeZTGdqTiEW",
      color: "hover:text-green-500",
    },
    {
      name: "Live Chat",
      icon: MessagesSquare,
      url: "#",
      color: "hover:text-purple-500",
    },
  ];

  const membershipLevels = [
    {
      level: 1,
      tokens: "10S",
      name: "Entry Level",
      icon: Brain,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 2,
      tokens: "20S",
      name: "Beginner",
      icon: Star,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 3,
      tokens: "40S",
      name: "Bronze",
      icon: Award,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 4,
      tokens: "80S",
      name: "Silver",
      icon: Trophy,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 5,
      tokens: "160S",
      name: "Gold",
      recommended: true,
      icon: Crown,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 6,
      tokens: "320S",
      name: "Platinum",
      icon: Diamond,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 7,
      tokens: "640S",
      name: "Diamond",
      icon: Diamond,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 8,
      tokens: "1280S",
      name: "Master",
      icon: Star,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 9,
      tokens: "2560S",
      name: "Elite",
      icon: Crown,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
    {
      level: 10,
      tokens: "5120S",
      name: "Legend",
      icon: Trophy,
      description: "Direct Income = 100% Odds + Team Income = 25% Evens x 4",
    },
  ];

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setVideoPlaying(false);
    setTimeout(() => {
      setCurrentVideo(steps[index].videoId);
      setVideoPlaying(true);
    }, 100);
  };

  const stats = [
    {
      value: "48M+",
      label: "Transactions",
      icon: RefreshCw,
      color: "text-blue-400",
      bgColor: "from-blue-600/20 to-blue-400/5",
    },
    {
      value: "1,474,880",
      label: "Active Users",
      icon: Users,
      color: "text-green-400",
      bgColor: "from-green-600/20 to-green-400/5",
    },
    {
      value: "$1.78B",
      label: "Total Value",
      icon: DollarSign,
      color: "text-purple-400",
      bgColor: "from-purple-600/20 to-purple-400/5",
    },
    {
      value: "Instant",
      label: "Instant Pay",
      icon: Zap,
      color: "text-amber-400",
      bgColor: "from-amber-600/20 to-amber-400/5",
    },
    {
      value: "3.17B S",
      label: "Total Supply",
      icon: Clock,
      color: "text-cyan-400",
      bgColor: "from-cyan-600/20 to-cyan-400/5",
    },
    {
      value: "~400k/s",
      label: "Transaction Speed",
      icon: ArrowUpRight,
      color: "text-indigo-400",
      bgColor: "from-indigo-600/20 to-indigo-400/5",
    },
    {
      value: "$0.001",
      label: "Average Transaction Cost",
      icon: CreditCard,
      color: "text-pink-400",
      bgColor: "from-pink-600/20 to-pink-400/5",
    },
    {
      value: "$2 Billion",
      label: "Market Cap",
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "from-emerald-600/20 to-emerald-400/5",
    },
  ];

  // For the particle effect background
  const generateParticle = (): any => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.25,
      animX: [Math.random() * w, Math.random() * w, Math.random() * w],
      animY: [Math.random() * h, Math.random() * h, Math.random() * h],
      duration: Math.random() * 60 + 30,
    };
  };

  // For the particle effect background
  const ParticleBackground = () => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const generated = Array.from({ length: 30 }, () => generateParticle());
        setParticles(generated);
      }
    }, []);
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/30"
            initial={{
              x: p.x,
              y: p.y,
              scale: p.scale,
              opacity: p.opacity,
            }}
            animate={{
              x: p.animX,
              y: p.animY,
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#050810] text-white min-h-screen lg:min-h-screen overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground />

      {/* Gradient background elements - OmniMiner style with cyan/purple */}
      <div
        className="fixed inset-0 bg-gradient-radial from-[#00a3ff]/5 via-transparent to-transparent pointer-events-none"
        style={{ top: "-20%", left: "-20%", width: "140%", height: "140%" }}
      />
      <div
        className="fixed inset-0 bg-gradient-radial from-[#9333EA]/5 via-transparent to-transparent pointer-events-none"
        style={{ bottom: "-20%", right: "-20%", width: "140%", height: "140%" }}
      />

      {/* Animated grid background - OmniMiner style with cyan */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00a3ff10 1px, transparent 1px), linear-gradient(to right, #00a3ff10 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Chat Widget component */}
      <ChatWidget />

      {/* Fixed header */}
      <header className="fixed w-full top-0 z-50 bg-[#05070F]/90 border-b border-[#1E293B]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Mobile Connect Banner */}
          <div className="md:hidden flex items-center justify-between py-2 border-b border-[#1E293B]/80">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-[#00a3ff]" />
              <span className="text-sm font-bold">Need a Web3 wallet?</span>
            </div>
            <a
              href="https://rabby.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#00a3ff] to-[#9333EA] hover:from-[#0096eb] hover:to-[#8023d5] text-white text-sm px-3 py-1 rounded-md flex items-center space-x-1 transition-all duration-300"
            >
              <Wallet className="h-3 w-3 mr-1" />
              <span>Rabby Wallet</span>
            </a>
          </div>

          {/* Main Header Content */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
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
                {logoText}
              </motion.span>
            </motion.div>

            {/* Web3Button and Mobile Menu Button for Mobile */}
            <div className="md:hidden flex items-center">
              <div className="mr-4 relative z-20">{/* <Web3Button /> */}</div>

              {/* Mobile Menu Button */}
              <motion.button
                className="text-gray-300 hover:text-white rounded-full p-1 hover:bg-slate-800/50 transition-all relative z-10"
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between flex-1 pl-8">
              {/* Main Navigation Links */}
              <nav className="flex space-x-8">
                <motion.a
                  href="https://rabby.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#00a3ff] transition-all duration-300 flex items-center space-x-1 relative group"
                  whileHover={{ y: -2 }}
                >
                  <span>Download Wallet</span>
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00a3ff] group-hover:w-full transition-all duration-300" />
                </motion.a>
                <motion.a
                  href="https://my.soniclabs.com/points"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 transition-all duration-300 flex items-center space-x-1 relative group"
                  whileHover={{ y: -2 }}
                >
                  <Star className="h-4 w-4 mr-1 text-amber-400" />
                  <span>Sonic Points</span>
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
                <motion.a
                  href="https://web3sonic.com/documentation"
                  className="text-gray-300 hover:text-[#00a3ff] transition-all duration-300 flex items-center space-x-1 relative group"
                  whileHover={{ y: -2 }}
                >
                  <span>Getting Started</span>
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00a3ff] group-hover:w-full transition-all duration-300" />
                </motion.a>
                {/* <motion.a
                  href="https://web3sonic.com/dashboard"
                  className="text-gray-300 hover:text-[#00a3ff] transition-all duration-300 flex items-center space-x-1 relative group"
                  whileHover={{ y: -2 }}
                >
                  <span>Web3 Sonic</span>
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00a3ff] group-hover:w-full transition-all duration-300" />
                </motion.a> */}
              </nav>

              {/* Social Links and CTA */}
              <div className="flex items-center space-x-8">
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        className={`text-gray-400 ${social.color} transition-all duration-300`}
                        title={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>

                {/* Login and Register Buttons - Desktop */}
                <div className="hidden md:flex space-x-4">
                  <a
                    href="/login"
                    className="group relative inline-flex items-center justify-center h-11 px-6 overflow-hidden rounded-lg bg-gradient-to-r from-[#00a3ff] to-[#9333EA] font-medium text-white transition-all duration-300 hover:scale-105"
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0096eb] to-[#8023d5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-2">
                      Login <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>

                  <a
                    href="/register"
                    className="group relative inline-flex items-center justify-center h-11 px-6 overflow-hidden rounded-lg bg-gray-800 border border-blue-500/30 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700"
                  >
                    <span className="relative flex items-center gap-2">
                      Register <UserPlus className="h-4 w-4" />
                    </span>
                  </a>
                </div>

                {/* Keep the original Web3Button for wallet connection functionality */}
                <div className="hidden">{/* <Web3Button /> */}</div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden py-4 space-y-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href="https://rabby.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  Download Wallet
                </a>
                <a
                  href="https://my.soniclabs.com/points"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-amber-300 hover:text-amber-200 transition-colors flex items-center py-2"
                >
                  <Star className="h-4 w-4 mr-1 text-amber-400" />
                  Sonic Points
                </a>
                <a
                  href="/documentation"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  Getting Started
                </a>
                <a
                  href="https://web3sonic.com/dashboard"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  Web3 Sonic
                </a>

                {/* Mobile Login and Register Buttons */}
                <div className="mt-2 flex gap-2">
                  <a
                    href="/login"
                    className="flex-1 bg-gradient-to-r from-[#00a3ff] to-[#9333EA] text-white py-3 px-4 rounded-lg font-medium text-center"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="flex-1 bg-gray-800 border border-blue-500/30 text-white py-3 px-4 rounded-lg font-medium text-center"
                  >
                    Register
                  </a>
                </div>

                {/* Mobile Social Links */}
                <div className="flex items-center space-x-4 py-2">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        className={`p-2 rounded-full bg-slate-800/50 text-gray-400 ${social.color}`}
                        title={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section with animated gradients and background video (desktop only) */}
      <div
        ref={heroRef}
        className="relative min-h-[90vh] sm:min-h-screen pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 flex flex-col justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
        }}
      >
        {/* Animated background gradient for both mobile and desktop */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-[#00a3ff]/20 via-transparent to-[#9333EA]/20"></div>
          <div className="absolute inset-0 bg-[#050810]/75"></div>
        </div>

        {/* Background video - desktop only */}
        <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#080815]/50 z-10"></div>

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 1 }}
          >
            <div className="absolute w-full h-full">
              <iframe
                className="absolute top-0 left-0 w-full h-full opacity-30"
                src="https://www.youtube.com/embed/nxqlTRYs6NY?autoplay=1&mute=1&controls=0&loop=1&playlist=nxqlTRYs6NY&showinfo=0&rel=0&modestbranding=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  transform: "scale(1.2)",
                  pointerEvents: "none",
                }}
              ></iframe>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 z-10 relative pt-4 md:pt-6">
          {/* Price Display - desktop */}
          <div className="hidden md:block mb-4 relative overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-md rounded-xl p-3 border border-blue-500/20 shadow-[0_0_25px_rgba(37,99,235,0.15)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Flex container to put title on left and prices on right */}
              <div className="flex justify-between items-start">
                {/* WEB3 SONIC TITLE - left side */}
                <motion.div
                  className="block text-left"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex flex-col">
                    <motion.h1
                      className="text-[40px] xl:text-[45px] 2xl:text-[50px] font-extrabold tracking-tight mb-0 text-center lg:text-left leading-none"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(0, 163, 255, 0)",
                          "0 0 20px rgba(0, 163, 255, 0.6)",
                          "0 0 5px rgba(0, 163, 255, 0)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.span
                        className="bg-gradient-to-r from-[#00a3ff] via-white to-[#ff6b00] bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        WEB3 SONIC
                      </motion.span>
                    </motion.h1>
                    <motion.p
                      className="text-sm lg:text-base xl:text-lg font-medium text-blue-300 text-center lg:text-left"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      earn instant rewards in sonic
                    </motion.p>
                  </div>
                </motion.div>

                {/* Prices stacked vertically - right side */}
                <div className="grid grid-cols-1 gap-3">
                  {/* wBTC Price - Top */}
                  <div className="flex items-center justify-end">
                    <div className="text-right mr-4">
                      <div className="text-base text-gray-300 font-medium">
                        Wrapped Bitcoin (wBTC) Current Price
                      </div>
                      <div className="flex items-center justify-end mt-0">
                        <motion.div
                          className="text-3xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#f7931a] via-white to-[#f7931a] bg-clip-text text-transparent"
                          animate={{
                            backgroundPosition: ["0%", "100%", "0%"],
                            scale: [1, 1.02, 1],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                        >
                          {wbtcPrice}
                        </motion.div>
                      </div>
                    </div>
                    <motion.div
                      className="p-2 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <BitcoinLogo width={32} height={32} />
                    </motion.div>
                  </div>

                  {/* Sonic Token Price - Bottom */}
                  <div className="flex items-center justify-end">
                    <div className="text-right mr-4">
                      <div className="text-base text-gray-300 font-medium">
                        Sonic Token (S) Current Price
                      </div>
                      <div className="flex items-center justify-end mt-0">
                        <motion.div
                          className="text-3xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#00a3ff] via-white to-[#ff6b00] bg-clip-text text-transparent"
                          animate={{
                            backgroundPosition: ["0%", "100%", "0%"],
                            scale: [1, 1.02, 1],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                        >
                          {sonicPrice}
                        </motion.div>
                      </div>
                    </div>
                    <motion.div
                      className="p-2 rounded-full bg-gradient-to-br from-blue-500/20 to-primary/20"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <SonicLogo width={32} height={32} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Price Display - mobile */}
          <div className="md:hidden mb-8 mt-6 relative overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-md rounded-lg p-4 border border-blue-500/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Prices container */}
              <div className="flex flex-col">
                {/* WEB3 SONIC title - moved to top left as requested */}
                <div className="block mb-4 text-left order-first">
                  <motion.h2
                    className="text-3xl font-extrabold text-left"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(0, 163, 255, 0)",
                        "0 0 15px rgba(0, 163, 255, 0.6)",
                        "0 0 5px rgba(0, 163, 255, 0)",
                      ],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <motion.span
                      className="bg-gradient-to-r from-[#00a3ff] via-white to-[#ff6b00] bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      WEB3 SONIC
                    </motion.span>
                  </motion.h2>
                  <motion.p
                    className="text-sm font-medium text-blue-300 text-left"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    earn instant rewards in sonic
                  </motion.p>
                </div>

                {/* Mobile: Prices display */}
                <div className="flex justify-center space-x-6 lg:hidden">
                  {/* wBTC Price - Mobile */}
                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex items-center mb-2">
                      <BitcoinLogo width={24} height={24} className="mr-2" />
                      <div className="text-xs text-gray-400">wBTC Price</div>
                    </div>
                    <div className="flex flex-col items-center">
                      {wbtcPrice}
                    </div>
                  </div>

                  {/* Sonic Price - Mobile */}
                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex items-center mb-2">
                      <SonicLogo width={24} height={24} className="mr-2" />
                      <div className="text-xs text-gray-400">
                        Sonic (S) Price
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      {sonicPrice}
                    </div>
                  </div>
                </div>

                {/* This section was removed as it duplicates functionality in the desktop view */}
              </div>
            </motion.div>
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Video Section */}
            <div className="order-2 lg:order-1">
              <motion.h1
                className="text-[18px] sm:text-2xl md:text-[28px] lg:text-[35px] text-center lg:text-left leading-tight font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-2 sm:px-4 lg:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent whitespace-normal sm:whitespace-nowrap">
                  UNLOCK THE POWER OF WEB3 WITH SONIC
                </span>
              </motion.h1>

              <motion.div
                className={`relative aspect-video rounded-xl overflow-hidden shadow-[0_0_25px_rgba(37,99,235,0.2)] ${
                  videoPlaying ? "bg-slate-900/60" : "bg-transparent"
                } border border-blue-500/20 mb-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {!videoPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                    <div className="absolute inset-0 bg-transparent" />
                    <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6">
                      <motion.div
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center px-4"
                        animate={{
                          textShadow: [
                            "0 0 8px rgba(96, 165, 250, 0)",
                            "0 0 15px rgba(96, 165, 250, 0.5)",
                            "0 0 8px rgba(96, 165, 250, 0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div>
                          <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA]">
                            SMART CONTRACT
                          </div>
                          <div className="text-white text-base md:text-xl mt-1">
                            KEEP 100% PROFIT
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <PlayCircle
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#00a3ff] cursor-pointer hover:text-blue-300 transition-colors filter drop-shadow-[0_0_10px_rgba(0,163,255,0.5)]"
                          onClick={() => setVideoPlaying(true)}
                        />
                      </motion.div>
                      <motion.div
                        className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] p-[2px] rounded-full overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#00a3ff]/20"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 20px rgba(0, 163, 255, 0.4)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setVideoPlaying(true)}
                      >
                        <div className="bg-[#050810] px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full">
                          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent flex items-center">
                            Watch Now
                            <ArrowUpRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 text-[#00a3ff]" />
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    key={currentVideo}
                    className="w-full h-full rounded-xl"
                    src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
                    title="Web3 Sonic Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="text-base md:text-lg text-blue-300 font-medium flex flex-col items-center justify-center">
                  <span className="flex items-center gap-2 mb-1">
                    <Youtube className="h-5 w-5 text-red-500" />
                    Watch Interview with Andre Cronje
                  </span>
                  <span className="text-sm md:text-base text-blue-300/80">
                    (Sonic Labs Creator)
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
                  WEB3 SONIC FEATURES
                </span>
              </motion.h2>

              <div className="space-y-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.button
                      key={index}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                        currentStep === index
                          ? `bg-slate-900/70 ${step.borderColor} shadow-lg shadow-${step.color}/10`
                          : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                      }`}
                      onClick={() => handleStepClick(index)}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.2)",
                      }}
                      whileTap={{ y: 0 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <motion.div
                        className={`p-3 rounded-full ${step.bgColor}`}
                        whileHover={{ rotate: 5 }}
                        animate={{
                          boxShadow:
                            currentStep === index
                              ? [
                                  "0 0 0px rgba(59, 130, 246, 0)",
                                  "0 0 15px rgba(59, 130, 246, 0.3)",
                                  "0 0 0px rgba(59, 130, 246, 0)",
                                ]
                              : "none",
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Icon className={`w-6 h-6 ${step.color}`} />
                      </motion.div>
                      <div className="text-left">
                        <h3
                          className={`font-bold text-lg ${
                            currentStep === index ? step.color : "text-white"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bitcoin Title Section - Positioned under feature buttons */}
              <motion.div
                className="mt-8 pt-5 border-t border-slate-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-center lg:text-left"
                  animate={{
                    scale: [1, 1.03, 1],
                    textShadow: [
                      "0 0 5px rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 5px rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="inline-flex items-center gap-3 bg-slate-900/50 px-5 py-3 rounded-xl border border-slate-800/80">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="bg-gradient-to-br from-[#F7931A] to-[#F9AA4B] rounded-full p-1.5 inline-flex"
                    >
                      <Coins className="h-7 w-7 md:h-8 md:w-8 text-white" />
                    </motion.div>
                    EARN BITCOIN POWERED BY SONIC
                  </span>
                </motion.h2>
              </motion.div>
            </motion.div>
          </div>

          {/* Hide the original Bitcoin Title Section */}

          {/* Stats Section */}
          <motion.div
            className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 sm:p-4 md:p-6 flex flex-col items-center text-center"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <motion.div
                    className={`p-2.5 sm:p-3 mb-3 sm:mb-3 rounded-full bg-gradient-to-br ${stat.bgColor}`}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(59, 130, 246, 0)",
                        "0 0 15px rgba(59, 130, 246, 0.3)",
                        "0 0 0px rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.5,
                      repeat: Infinity,
                    }}
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </motion.div>
                  <div className="font-bold text-lg sm:text-2xl md:text-3xl mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm px-1">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        {/* <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{
            y: [0, 10, 0],
            opacity: 1,
          }}
          transition={{
            y: { duration: 2, repeat: Infinity },
            opacity: { duration: 1, delay: 1 },
          }}
        >
          <MousePointer className="w-6 h-6 text-blue-400 mb-2" />
          <span className="text-sm text-gray-400">Scroll to explore</span>
        </motion.div> */}
      </div>

      {/* Membership Levels with 3D effect cards */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-blue-900/5 via-transparent to-purple-900/5 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
                MEMBERSHIP LEVELS
              </span>
            </h2>
            <p className="text-center text-gray-400 mb-8 w-full mx-auto max-w-2xl px-4 text-sm sm:text-base leading-relaxed">
              Choose the membership level that fits your goals.
              <br />
              Higher levels unlock more benefits and earning potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {membershipLevels.map((level, index) => {
              const Icon = level.icon;
              return (
                <motion.div
                  key={index}
                  className={`relative rounded-xl overflow-hidden group ${
                    level.recommended
                      ? "border-2 border-blue-400/50"
                      : "border border-slate-800/80"
                  } bg-gradient-to-b from-slate-900 to-slate-900/80`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: level.recommended
                      ? "0 20px 40px -10px rgba(59, 130, 246, 0.3)"
                      : "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />
                  </div>

                  {level.recommended && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-400 to-purple-400 text-center py-1 text-xs font-semibold text-white">
                      RECOMMENDED
                    </div>
                  )}
                  <div
                    className={`p-4 sm:p-4 md:p-5 ${
                      level.recommended ? "pt-7" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon
                            className={`w-5 h-5 sm:w-5 sm:h-5 ${
                              index % 2 === 0
                                ? "text-blue-400"
                                : "text-purple-400"
                            }`}
                          />
                        </motion.div>
                        <span className="font-bold text-sm sm:text-base">
                          Level {level.level}
                        </span>
                      </div>
                      <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {level.tokens}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-2">
                      {level.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-4 leading-relaxed">
                      {level.description}
                    </p>
                    <div className="w-full">{/* <Web3Button /> */}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* What makes Web3 Sonic the Best Smart Contract */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-blue-900/5 via-transparent to-purple-900/5 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
                💡 WHAT MAKES WEB3 SONIC THE BEST SMART CONTRACT
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              Web3 Sonic offers unique advantages that set it apart from other
              blockchain projects
            </p>
          </motion.div>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
            {[
              { title: "Smart Contract", icon: Coins, color: "purple" },
              { title: "100% Decentralized", icon: Globe, color: "blue" },
              { title: "Instant Pay", icon: Zap, color: "green" },
              { title: "Powered by AI", icon: Brain, color: "purple" },
              {
                title: "Fastest EVM Layer 1 Blockchain",
                icon: Zap,
                color: "amber",
              },
              {
                title: "Everyone has equal rights",
                icon: Users,
                color: "blue",
              },
              { title: "Transparent", icon: TrendingUp, color: "green" },
              {
                title: "Low Transaction Fees",
                icon: CreditCard,
                color: "amber",
              },
              {
                title: "The most up-to-date Technology",
                icon: Sparkles,
                color: "purple",
              },
              { title: "Unstoppable", icon: Rocket, color: "amber" },
              {
                title: "User-friendly Dashboard",
                icon: MousePointer,
                color: "blue",
              },
              {
                title: "No Special Equipment or Knowledge Required",
                icon: Brain,
                color: "green",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl border backdrop-blur-sm flex items-center gap-3
                  ${
                    feature.color === "blue"
                      ? "bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/30"
                      : feature.color === "green"
                      ? "bg-green-900/20 border-green-500/30 hover:bg-green-900/30"
                      : feature.color === "purple"
                      ? "bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30"
                      : "bg-amber-900/20 border-amber-500/30 hover:bg-amber-900/30"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div
                    className={`p-2 rounded-lg flex-shrink-0
                  ${
                    feature.color === "blue"
                      ? "bg-blue-500/20 text-blue-400"
                      : feature.color === "green"
                      ? "bg-green-500/20 text-green-400"
                      : feature.color === "purple"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-white text-sm sm:text-base">
                    {feature.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* swap section */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-purple-900/5 via-transparent to-blue-900/5 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
                Currency Swap
              </span>
            </h2>
            <div className="col-span-3 lg:col-span-2 bg-gray-900 border border-gray-700 h-full rounded-lg min-h-[630px] overflow-hidden py-[5px]">
              <iframe
                id="iframe-widget"
                src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.01&amountFiat&backgroundColor=2B2B35&darkMode=true&from=btc&horizontal=false&isFiat=false&lang=en-US&link_id=a32a608282e97b&locales=true&logo=false&primaryColor=f6c511&to=s&toTheMoon=false"
                style={{
                  height: "370px",
                  width: " 100%",
                  border: "none",
                }}
              ></iframe>
              <Script
                defer
                type="text/javascript"
                src="https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js"
              ></Script>

              <Script src="https://widgets.coingecko.com/gecko-coin-list-widget.js"></Script>
              {/* <gecko-coin-list-widget locale="en" dark-mode="true" outlined="true" coin-ids="sonic-3,bitcoin,ethereum,binancecoin,ripple,solana,matic-network" initial-currency="usd"></gecko-coin-list-widget> */}
              <p>
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
              </p>
            </div>
          </motion.div>
          {/* </div> */}
        </div>
      </div>

      <div className="py-20 relative overflow-hidden">
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-purple-900/5 via-transparent to-blue-900/5 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
                HOW IT WORKS
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              Our seamless 4-step process guides you from signup to earning.
              <br />
              Follow these steps to maximize your earning potential on the Sonic
              platform.
            </p>
          </motion.div>

          {/* Desktop View - Centered Cards */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Row 1 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute top-8 right-0 w-1/2 h-[3px] bg-gradient-to-r from-transparent to-blue-400"></div>
                <div className="absolute top-8 right-0 w-8 h-8 rounded-full bg-blue-400/20 border-2 border-blue-400 flex items-center justify-center transform translate-x-4 z-10">
                  <span className="text-xl font-bold text-blue-400">1</span>
                </div>

                <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-blue-400/30 transition-all duration-300 hover:shadow-[0_5px_20px_-5px_rgba(59,130,246,0.2)]">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"
                    >
                      <Wallet className="w-4 h-4 text-blue-400" />
                    </motion.div>
                    Connect Your Wallet
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Start by connecting your Rabby wallet to access the Sonic
                    Labs blockchain. This secure and user-friendly wallet is
                    specifically designed for Chain 146.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
                      Easy Setup
                    </span>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                      Fully Secured
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute top-8 left-0 w-1/2 h-[3px] bg-gradient-to-l from-transparent to-purple-400"></div>
                <div className="absolute top-8 left-0 w-8 h-8 rounded-full bg-purple-400/20 border-2 border-purple-400 flex items-center justify-center transform -translate-x-4 z-10">
                  <span className="text-xl font-bold text-purple-400">2</span>
                </div>

                <div className="p-6 bg-slate-900/60  rounded-xl border border-slate-800 hover:border-purple-400/30 transition-all duration-300 hover:shadow-[0_5px_20px_-5px_rgba(139,92,246,0.2)]">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400 flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"
                    >
                      <Star className="w-4 h-4 text-purple-400" />
                    </motion.div>
                    Choose Your Level
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Select from multiple membership levels based on your goals.
                    Each level offers different benefits and earning potential
                    within the 3x2 auto recycling forced matrix system.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm border border-green-500/20">
                      Multiple Options
                    </span>
                    <span className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-full text-sm border border-pink-500/20">
                      Higher Rewards
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Center Connect Line */}
              <div className="absolute left-1/2 top-[calc(12.5rem+2px)] bottom-[12.5rem] w-[3px] bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 transform -translate-x-[1.5px]"></div>

              {/* Row 2 */}
              <motion.div
                className="relative mt-24"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute top-8 right-0 w-1/2 h-[3px] bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="absolute top-8 right-0 w-8 h-8 rounded-full bg-green-400/20 border-2 border-green-400 flex items-center justify-center transform translate-x-4 z-10">
                  <span className="text-xl font-bold text-green-400">3</span>
                </div>

                <div className="p-6 bg-slate-900/60  rounded-xl border border-slate-800 hover:border-green-400/30 transition-all duration-300 hover:shadow-[0_5px_20px_-5px_rgba(74,222,128,0.2)]">
                  <h3 className="text-xl font-semibold mb-3 text-green-400 flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <Trophy className="w-4 h-4 text-green-400" />
                    </motion.div>
                    Build Your Matrix
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Watch your 3×2 forced matrix fill with automatic spillover.
                    Each matrix has 3 positions on level 1 and 9 positions on
                    level 2, with even positions paying you 100% commission
                    directly.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm border border-amber-500/20">
                      Automatic Spillover
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                      Full Transparency
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative mt-24"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute top-8 left-0 w-1/2 h-[3px] bg-gradient-to-l from-transparent to-red-400"></div>
                <div className="absolute top-8 left-0 w-8 h-8 rounded-full bg-red-400/20 border-2 border-red-400 flex items-center justify-center transform -translate-x-4 z-10">
                  <span className="text-xl font-bold text-red-400">4</span>
                </div>

                <div className="p-6 bg-slate-900/60  rounded-xl border border-slate-800 hover:border-red-400/30 transition-all duration-300 hover:shadow-[0_5px_20px_-5px_rgba(248,113,113,0.2)]">
                  <h3 className="text-xl font-semibold mb-3 text-red-400 flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"
                    >
                      <DollarSign className="w-4 h-4 text-red-400" />
                    </motion.div>
                    Generate Perpetual Income
                  </h3>
                  <p className="text-gray-300 mb-4">
                    As your matrix fills, you earn instant payments in both
                    Sonic and wBTC tokens. The revolutionary recycling system
                    ensures continuous income potential.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm border border-indigo-500/20">
                      Instant Payments
                    </span>
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm border border-yellow-500/20">
                      Dual Token Rewards
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile View - Vertical Timeline */}
          <div className="md:hidden space-y-8 relative">
            {/* Connecting line */}
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 via-purple-400 to-blue-400"></div>

            <motion.div
              className="relative flex gap-6 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center border-2 border-blue-400 z-10"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 15px rgba(59, 130, 246, 0.5)",
                    "0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-lg font-bold text-blue-400">1</span>
              </motion.div>

              <div className="flex-1 p-3 sm:p-4 md:p-5 bg-slate-900/60  rounded-xl border border-slate-800 hover:border-blue-400/30 transition-all duration-300">
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-blue-400">
                  Connect Your Wallet
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  Start by connecting your Rabby wallet to access the Sonic Labs
                  blockchain. This secure and user-friendly wallet is
                  specifically designed for Chain 146.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-2 py-0.5 sm:py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] sm:text-xs border border-blue-500/20">
                    Easy Setup
                  </span>
                  <span className="px-2 py-0.5 sm:py-1 bg-purple-500/10 text-purple-400 rounded-full text-[10px] sm:text-xs border border-purple-500/20">
                    Fully Secured
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative flex gap-6 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center border-2 border-purple-400 z-10"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(139, 92, 246, 0)",
                    "0 0 15px rgba(139, 92, 246, 0.5)",
                    "0 0 0 rgba(139, 92, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              >
                <span className="text-lg font-bold text-purple-400">2</span>
              </motion.div>

              <div className="flex-1 p-3 sm:p-4 md:p-5 bg-slate-900/60  rounded-xl border border-slate-800 hover:border-purple-400/30 transition-all duration-300">
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-purple-400">
                  Choose Your Level
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  Select from multiple membership levels based on your goals.
                  Each level offers different benefits and earning potential
                  within the 3x2 auto recycling forced matrix system.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-2 py-0.5 sm:py-1 bg-green-500/10 text-green-400 rounded-full text-[10px] sm:text-xs border border-green-500/20">
                    Multiple Options
                  </span>
                  <span className="px-2 py-0.5 sm:py-1 bg-pink-500/10 text-pink-400 rounded-full text-[10px] sm:text-xs border border-pink-500/20">
                    Higher Rewards
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative flex gap-6 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center border-2 border-green-400 z-10"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(74, 222, 128, 0)",
                    "0 0 15px rgba(74, 222, 128, 0.5)",
                    "0 0 0 rgba(74, 222, 128, 0)",
                  ],
                }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
              >
                <span className="text-lg font-bold text-green-400">3</span>
              </motion.div>

              <div className="flex-1 p-3 sm:p-4 md:p-5 bg-slate-900/60  rounded-xl border border-slate-800 hover:border-green-400/30 transition-all duration-300">
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-green-400">
                  Build Your Matrix
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  Watch your 3×2 forced matrix fill with automatic spillover.
                  Each matrix has 3 positions on level 1 and 9 positions on
                  level 2, with even positions paying you 100% commission
                  directly.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-2 py-0.5 sm:py-1 bg-amber-500/10 text-amber-400 rounded-full text-[10px] sm:text-xs border border-amber-500/20">
                    Automatic Spillover
                  </span>
                  <span className="px-2 py-0.5 sm:py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[10px] sm:text-xs border border-cyan-500/20">
                    Full Transparency
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative flex gap-6 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center border-2 border-red-400 z-10"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(248, 113, 113, 0)",
                    "0 0 15px rgba(248, 113, 113, 0.5)",
                    "0 0 0 rgba(248, 113, 113, 0)",
                  ],
                }}
                transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
              >
                <span className="text-lg font-bold text-red-400">4</span>
              </motion.div>

              <div className="flex-1 p-3 sm:p-4 md:p-5 bg-slate-900/60  rounded-xl border border-slate-800 hover:border-red-400/30 transition-all duration-300">
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-red-400">
                  Generate Perpetual Income
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  As your matrix fills, you earn instant payments in both Sonic
                  and wBTC tokens. The revolutionary recycling system ensures
                  continuous income potential.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-2 py-0.5 sm:py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] sm:text-xs border border-indigo-500/20">
                    Instant Payments
                  </span>
                  <span className="px-2 py-0.5 sm:py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-[10px] sm:text-xs border border-yellow-500/20">
                    Dual Token Rewards
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className=" bg-slate-900/40 rounded-2xl p-8 md:p-12 relative overflow-hidden border border-blue-500/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>

            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-blue-500/10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent inline-block"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 10px rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  JOIN THE SONIC REVOLUTION
                </motion.span>
              </motion.h2>
              <motion.p
                className="text-center text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Become part of the fastest growing blockchain ecosystem.
                <br />
                Start earning today with our revolutionary reward system and
                cutting-edge technology.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center">
                  {/* <Web3Button /> */}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant="outline"
                    className="border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-6 text-lg group transition-all duration-300"
                    onClick={() =>
                      window.open("https://tpmr.com/i/93532", "_blank")
                    }
                  >
                    <span className="flex items-center">
                      Login to Web3 Sonic
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80  border-t border-slate-800 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Brain className="w-6 h-6 text-blue-400" />
                </motion.div>
                <motion.span
                  className="text-lg font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  WEB3 SONIC
                </motion.span>
              </div>
              <p className="text-gray-400 mb-4">
                The future of blockchain is here. Join the revolution with Web3
                Sonic and unlock your full earning potential.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      className={`p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 ${social.color} transition-all duration-300`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Documentation
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Whitepaper
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Smart Contracts
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Block Explorer
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    About Us
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Careers
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Partners
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Contact
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Privacy Policy
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Terms of Service
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Cookie Policy
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Compliance
                  </motion.a>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-slate-800 pt-8 mt-8 text-center text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p>
              &copy; {new Date().getFullYear()} Web3 Sonic. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomeDark;
