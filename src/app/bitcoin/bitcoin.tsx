// "use client";
// export const dynamic = "force-dynamic";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useToast } from "@/components/hooks/use-toast";
// import { getDefaultReferralId } from "@/components/lib/referralUtils";
// import { useSonicPrice } from "@/components/hooks/use-sonic-price";
// import { useWbtcPrice } from "@/components/hooks/use-wbtc-price";
// import LevelPayoutVisualization from "@/components/UI/LevelPayoutVisualization";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../../components/UI/tabs";
// // import MatrixVisualization from '@/pages/MatrixVisualization';
// import MatrixVisualize from "../matrixvisualization/Matrixvisualize";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/UI/accordian";
// import { Progress } from "@/components/UI/progress";
// // import { Badge } from "@/components/ui/badge";
// import { Badge } from "@/components/UI/badge";

// // Import components and icons as needed
// import {
//   CheckCircle,
//   ArrowRight,
//   Menu,
//   X,
//   Wallet,
//   Star,
//   HelpCircle,
//   LogIn,
//   LogOut,
//   Brain,
//   TrendingUp,
//   BarChart3,
//   Layers,
//   Globe,
//   ShieldCheck,
//   Smartphone,
//   ArrowUpRight,
//   Zap,
//   LucideIcon,
//   Users,
//   Award,
//   UserPlus,
//   Trophy,
//   MousePointer,
//   RotateCw,
//   BadgeDollarSign,
//   Clock,
// } from "lucide-react";
// import {
//   wbtcActiveMembers,
//   wbtcTotalRaised,
//   wbtcTransactionCount,
// } from "../../../wagmi/method";
// import axios from "axios";
// // Custom Video Player with Unmute Button component
// const VideoPlayer = ({ videoSrc }: { videoSrc: string }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isMuted, setIsMuted] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showControls, setShowControls] = useState(false);
//   const [showUnmuteButton, setShowUnmuteButton] = useState(true);

//   // Function to handle unmuting video
//   const handleUnmute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = false;
//       videoRef.current.loop = false; // Remove loop when unmuted
//       setIsMuted(false);
//       setShowUnmuteButton(false);
//       setShowControls(true);
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     const handleEnded = () => {
//       // Don't loop after unmuting and playing to the end
//       if (!isMuted) {
//         video.pause();
//       }
//     };

//     video.addEventListener("play", handlePlay);
//     video.addEventListener("pause", handlePause);
//     video.addEventListener("ended", handleEnded);

//     return () => {
//       video.removeEventListener("play", handlePlay);
//       video.removeEventListener("pause", handlePause);
//       video.removeEventListener("ended", handleEnded);
//     };
//   }, [isMuted]);

//   return (
//     <div className="relative w-full h-full">
//       <video
//         ref={videoRef}
//         src={videoSrc}
//         className="absolute inset-0 w-full h-full object-cover"
//         style={{ objectFit: "cover", objectPosition: "center" }}
//         controls={showControls}
//         autoPlay
//         muted={isMuted}
//         playsInline
//         loop={isMuted} // Only loop when muted
//       />

//       {/* Animated unmute button */}
//       {showUnmuteButton && (
//         <div
//           className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
//           onClick={handleUnmute}
//         >
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 rounded-full bg-blue-500/80 flex items-center justify-center animate-pulse">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
//                 />
//               </svg>
//             </div>
//             <p className="text-white font-medium mt-2 text-sm animate-bounce">
//               Tap to unmute
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Custom logo components
// const BitcoinLogo: React.FC<{
//   width?: number;
//   height?: number;
//   className?: string;
// }> = ({ width = 24, height = 24, className = "" }) => (
//   <svg
//     width={width}
//     height={height}
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <circle cx="12" cy="12" r="12" fill="#F7931A" />
//     <path
//       d="M16.662 10.147c.235-1.557-.955-2.395-2.58-2.953l.527-2.107-1.287-.321-.513 2.053c-.338-.085-.686-.164-1.03-.243l.516-2.063-1.285-.321-.527 2.106c-.28-.064-.555-.127-.821-.194l.002-.007-1.774-.443-.342 1.37s.955.219.935.232c.521.13.616.475.6.748l-.6 2.408c.036.01.082.023.133.044l-.135-.034-.842 3.37c-.064.158-.225.393-.59.304.013.019-.935-.233-.935-.233l-.64 1.473 1.674.417c.311.078.616.16.917.237l-.532 2.13 1.284.32.527-2.109c.35.096.69.182 1.025.265l-.525 2.098 1.287.32.532-2.126c2.195.415 3.842.247 4.534-1.735.56-1.597-.027-2.517-1.178-3.116.839-.193 1.47-.744 1.638-1.883l.002.002zM14.19 13.638c-.398 1.597-3.094.733-3.97.517l.71-2.836c.875.218 3.683.652 3.26 2.318zm.397-4.144c-.363 1.451-2.603.714-3.33.534l.643-2.575c.727.18 3.071.518 2.687 2.04z"
//       fill="#fff"
//     />
//   </svg>
// );

// const SonicLogo: React.FC<{
//   width?: number;
//   height?: number;
//   className?: string;
// }> = ({ width = 24, height = 24, className = "" }) => (
//   <svg
//     width={width}
//     height={height}
//     className={className}
//     viewBox="0 0 28 28"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <circle cx="14" cy="14" r="14" fill="url(#paint0_linear_sonic)" />
//     <path d="M14.5 7L10.5 14H14L13.5 21L18 14H14.5L14.5 7Z" fill="white" />
//     <defs>
//       <linearGradient
//         id="paint0_linear_sonic"
//         x1="5.56794"
//         y1="7.77778"
//         x2="21.7777"
//         y2="21.3333"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#00A3FF" />
//         <stop offset="1" stopColor="#0057FF" />
//       </linearGradient>
//     </defs>
//   </svg>
// );

// // Define a type for the membership level data
// type MembershipLevel = {
//   id: number;
//   name: string;
//   price: number;
//   satoshi?: number; // Satoshi amount
//   wbtcValue?: string; // wBTC equivalent
//   usdValue?: string; // USD equivalent
//   color: string;
//   icon: LucideIcon;
//   features: string[];
//   progress: number;
//   members: number;
//   description: string;
// };

// // Define a type for training module data
// type TrainingModule = {
//   id: string;
//   title: string;
//   icon: LucideIcon;
//   color: string;
//   description: string;
//   benefits: string[];
//   modules: number;
//   completionTime: string;
// };

// // For SEO
// // export const metadata = {
// //   title: "Earn Bitcoin on Sonic powered by AI",
// //   description:
// //     "Learn how to earn Bitcoin (BTC) and WBTC through Sonic's instant pay blockchain platform. Get rewarded in Bitcoin for your participation in our revolutionary AI-powered Web3 ecosystem.",
// //   keywords:
// //     "bitcoin, btc, earn bitcoin, wbtc, instant pay in bitcoin, sonic blockchain, web3sonic",
// // };

// // Define param type for /:id route
// type RefParams = {
//   id?: string;
//   referralId?: string;
// };

// export default function Bitcoin() {
//   // Set document title and meta tags for SEO
//   // useEffect(() => {
//   //   document.title = metadata.title;

//   //   let metaDescription = document.querySelector('meta[name="description"]');
//   //   if (metaDescription) {
//   //     metaDescription.setAttribute("content", metadata.description);
//   //   } else {
//   //     metaDescription = document.createElement("meta");
//   //     metaDescription.setAttribute("name", "description");
//   //     metaDescription.setAttribute("content", metadata.description);
//   //     document.head.appendChild(metaDescription);
//   //   }

//   //   // Add keywords meta tag
//   //   let metaKeywords = document.querySelector('meta[name="keywords"]');
//   //   if (metaKeywords) {
//   //     metaKeywords.setAttribute("content", metadata.keywords);
//   //   } else {
//   //     metaKeywords = document.createElement("meta");
//   //     metaKeywords.setAttribute("name", "keywords");
//   //     metaKeywords.setAttribute("content", metadata.keywords);
//   //     document.head.appendChild(metaKeywords);
//   //   }

//   //   // Add OG tags for social sharing
//   //   const ogTags = [
//   //     { property: "og:title", content: metadata.title },
//   //     { property: "og:description", content: metadata.description },
//   //     { property: "og:type", content: "website" },
//   //     { property: "og:url", content: "https://web3sonic.com/bitcoin" },
//   //   ];

//   //   ogTags.forEach((tag) => {
//   //     let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
//   //     if (metaTag) {
//   //       metaTag.setAttribute("content", tag.content);
//   //     } else {
//   //       metaTag = document.createElement("meta");
//   //       metaTag.setAttribute("property", tag.property);
//   //       metaTag.setAttribute("content", tag.content);
//   //       document.head.appendChild(metaTag);
//   //     }
//   //   });

//   //   // Twitter card tags
//   //   const twitterTags = [
//   //     { name: "twitter:card", content: "summary_large_image" },
//   //     { name: "twitter:title", content: metadata.title },
//   //     { name: "twitter:description", content: metadata.description },
//   //   ];

//   //   twitterTags.forEach((tag) => {
//   //     let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
//   //     if (metaTag) {
//   //       metaTag.setAttribute("content", tag.content);
//   //     } else {
//   //       metaTag = document.createElement("meta");
//   //       metaTag.setAttribute("name", tag.name);
//   //       metaTag.setAttribute("content", tag.content);
//   //       document.head.appendChild(metaTag);
//   //     }
//   //   });

//   //   // Add structured data (JSON-LD) for better SEO
//   //   const jsonLd = {
//   //     "@context": "https://schema.org",
//   //     "@type": "WebPage",
//   //     name: metadata.title,
//   //     description: metadata.description,
//   //     keywords: metadata.keywords,
//   //     url: "https://web3sonic.com/bitcoin",
//   //     mainEntity: {
//   //       "@type": "Service",
//   //       name: "Earn Bitcoin on Sonic",
//   //       description:
//   //         "Learn how to earn Bitcoin (BTC) and WBTC through Sonic's instant pay blockchain platform.",
//   //       provider: {
//   //         "@type": "Organization",
//   //         name: "Web3 Sonic",
//   //         url: "https://web3sonic.com",
//   //       },
//   //       offers: {
//   //         "@type": "Offer",
//   //         price: "10",
//   //         priceCurrency: "USD",
//   //         availability: "https://schema.org/InStock",
//   //       },
//   //     },
//   //   };

//   //   // Add JSON-LD script to head
//   //   let jsonLdScript = document.querySelector(
//   //     'script[type="application/ld+json"]'
//   //   );
//   //   if (jsonLdScript) {
//   //     jsonLdScript.textContent = JSON.stringify(jsonLd);
//   //   } else {
//   //     jsonLdScript = document.createElement("script");
//   //     jsonLdScript.setAttribute("type", "application/ld+json");
//   //     jsonLdScript.textContent = JSON.stringify(jsonLd);
//   //     document.head.appendChild(jsonLdScript);
//   //   }

//   //   return () => {
//   //     // Cleanup function - not needed for meta tags as they persist
//   //   };
//   // }, []);

//   const initialRefId = (() => {
//     if (typeof document !== "undefined") {
//       const cookieValue = document.cookie
//         .split("; ")
//         .find(
//           (row) =>
//             row.startsWith("clientReferralId=") || row.startsWith("referralId=")
//         );

//       if (cookieValue) {
//         return cookieValue.split("=")[1];
//       }
//     }
//     return getDefaultReferralId();
//   })();

//   // State variables
//   const [localReferralId, setLocalReferralId] = useState<string>(initialRefId);
//   const [customReferralId, setCustomReferralId] =
//     useState<string>(initialRefId);
//   const [inputValue, setInputValue] = useState<string>(initialRefId); // Local state for input field
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showReferralInput, setShowReferralInput] = useState(false);
//   const [buttonWidth, setButtonWidth] = useState<string | null>(null); // For tracking button width
//   const [activeTab, setActiveTab] = useState<string>("journey");
//   const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
//   const [showJourneyMap, setShowJourneyMap] = useState(false);
//   const [activemembers, setactivemembers] = useState<number>();
//   const [wbtctotalrec, setwbtctotalrec] = useState<number | null>();
//   const [wbtcTansCount, setwbtcTansCount] = useState<number | null>();
//   const [wbtcPrice, setwbtcPrice] = useState("");
//   const [sonicPrice, setsonicPrice] = useState("");

//   const getPrices = async () => {
//     try {
//       const Sonic = await axios.get(
//         "https://min-api.cryptocompare.com/data/price?fsym=S&tsyms=USD"
//       );
//       const WBTC = await axios.get(
//         "https://min-api.cryptocompare.com/data/price?fsym=WBTC&tsyms=USD"
//       );
//       // console.log("----------------wbtc", WBTC.data.USD);
//       setsonicPrice(Sonic.data.USD);
//       setwbtcPrice(WBTC.data.USD);
//       // console.log("----------------sonic", Sonic.data.USD);
//     } catch (error) {
//       console.log("error getting from api", error);
//     }
//   };
//   useEffect(() => {
//     getALLdata();
//     getPrices();
//   }, []);
//   const getALLdata = async () => {
//     try {
//       let activeMembers = await wbtcActiveMembers();
//       setactivemembers(Number(activeMembers));
//       let wbtcTotalReceived = await wbtcTotalRaised();
//       setwbtctotalrec(Number(wbtcTotalReceived));
//       let wbtcTransConut = await wbtcTransactionCount();
//       setwbtcTansCount(Number(wbtcTransConut));
//     } catch (error) {
//       console.log("error while getting data", error);
//     }
//   };

//   // Refs
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   // Get URL params for the /:id route
//   //   const params = useParams<RefParams>();
//   const toast = useToast();

//   // Fetch real-time price data

//   // Configure USD formatter for consistent formatting
//   const usdFormatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   // Helper function to calculate USD value from Sonic tokens using the same price

//   // Function to get a cookie value by name
//   const getCookie = (name: string): string | null => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
//     return null;
//   };

//   // Get Satoshi amount for each level
//   const getSatoshiAmount = (level: number): number => {
//     switch (level) {
//       case 1:
//         return 10000; // Bronze - 10K Satoshi
//       case 2:
//         return 100000; // Silver - 100K Satoshi
//       case 3:
//         return 500000; // Gold - 500K Satoshi
//       case 4:
//         return 1000000; // Platinum - 1M Satoshi
//       case 5:
//         return 10000000; // Diamond - 10M Satoshi
//       default:
//         return 0;
//     }
//   };

//   // Convert Satoshi to wBTC (1 wBTC = 100,000,000 Satoshi)
//   const satToWBTC = (satAmount: number): string => {
//     return (satAmount / 100000000).toFixed(8);
//   };

//   // Convert Satoshi directly to USD
//   const satToUSD = (satAmount: number): string => {
//     // Using current price of BTC in USD (as of April 26, 2025)
//     const bitcoinPriceUSD = 98250;
//     const wbtcAmount = satAmount / 100000000;
//     return (wbtcAmount * bitcoinPriceUSD).toFixed(2);
//   };

//   // Define membership levels data
//   const membershipLevels: MembershipLevel[] = [
//     {
//       id: 1,
//       name: "Bronze",
//       price: 10,
//       satoshi: 10000, // 10K Satoshi
//       wbtcValue: satToWBTC(10000),
//       usdValue: satToUSD(10000),
//       color: "from-amber-700 to-amber-500",
//       icon: Star,
//       features: [
//         "ChatGPT 4.1 Access",
//         "Basic AI Agent",
//         "Welcome Training",
//         "Sonic Points Intro",
//       ],
//       progress: 100,
//       members: 1205,
//       description:
//         "Entry level membership with access to ChatGPT 4.1 AI and basic training.",
//     },
//     {
//       id: 2,
//       name: "Silver",
//       price: 20,
//       satoshi: 100000, // 100K Satoshi
//       wbtcValue: satToWBTC(100000),
//       usdValue: satToUSD(100000),
//       color: "from-gray-400 to-gray-300",
//       icon: Award,
//       features: [
//         "Intermediate AI Agent",
//         "Mindset Training",
//         "Basic DeFi Training",
//       ],
//       progress: 85,
//       members: 874,
//       description: "Unlock intermediate training and enhanced AI capabilities.",
//     },
//     {
//       id: 3,
//       name: "Gold",
//       price: 40,
//       satoshi: 500000, // 500K Satoshi
//       wbtcValue: satToWBTC(500000),
//       usdValue: satToUSD(500000),
//       color: "from-yellow-500 to-yellow-300",
//       icon: Trophy,
//       features: ["Advanced AI Agent", "Financial Training", "DeFi Access"],
//       progress: 67,
//       members: 652,
//       description:
//         "Comprehensive training package with advanced AI capabilities.",
//     },
//     {
//       id: 4,
//       name: "Platinum",
//       price: 80,
//       satoshi: 1000000, // 1M Satoshi
//       wbtcValue: satToWBTC(1000000),
//       usdValue: satToUSD(1000000),
//       color: "from-blue-700 to-blue-500",
//       icon: BadgeDollarSign,
//       features: [
//         "Expert AI Agent",
//         "Complete Training Suite",
//         "Advanced Analytics",
//       ],
//       progress: 48,
//       members: 431,
//       description:
//         "Premium access to all training modules and expert AI tools.",
//     },
//     {
//       id: 5,
//       name: "Diamond",
//       price: 160,
//       satoshi: 10000000, // 10M Satoshi
//       wbtcValue: satToWBTC(10000000),
//       usdValue: satToUSD(10000000),
//       color: "from-cyan-500 to-cyan-300",
//       icon: Globe,
//       features: [
//         "Elite AI Ecosystem",
//         "Personal Coaching",
//         "VIP Community Access",
//       ],
//       progress: 35,
//       members: 312,
//       description:
//         "Elite level with 1-on-1 coaching and premium community features.",
//     },
//     {
//       id: 6,
//       name: "Emerald",
//       price: 320,
//       color: "from-emerald-600 to-emerald-400",
//       icon: Zap,
//       features: [
//         "Sonic Matrix Builder",
//         "Wealth Strategy Sessions",
//         "Advanced DeFi Tools",
//       ],
//       progress: 24,
//       members: 187,
//       description:
//         "Advanced wealth building strategies and premium DeFi training.",
//     },
//     {
//       id: 7,
//       name: "Ruby",
//       price: 640,
//       color: "from-red-600 to-red-400",
//       icon: Layers,
//       features: [
//         "Elite Network Access",
//         "Private Investment Group",
//         "Market Insights",
//       ],
//       progress: 18,
//       members: 124,
//       description:
//         "Private investment opportunities and elite networking access.",
//     },
//     {
//       id: 8,
//       name: "Sapphire",
//       price: 1280,
//       color: "from-blue-800 to-blue-600",
//       icon: ShieldCheck,
//       features: [
//         "Executive Coaching",
//         "Global Event Access",
//         "Advisory Board Invites",
//       ],
//       progress: 12,
//       members: 86,
//       description:
//         "Executive-level training with global event access and advisory opportunities.",
//     },
//     {
//       id: 9,
//       name: "Founder",
//       price: 2560,
//       color: "from-purple-700 to-purple-500",
//       icon: Users,
//       features: [
//         "Early Access Features",
//         "Founder Community",
//         "Leadership Program",
//       ],
//       progress: 7,
//       members: 42,
//       description:
//         "Join the founder's circle with exclusive leadership programs and early access.",
//     },
//     {
//       id: 10,
//       name: "Matrix Master",
//       price: 5120,
//       color: "from-indigo-900 to-violet-700",
//       icon: Brain,
//       features: ["Full Matrix Access", "Global Ambassador", "Revenue Sharing"],
//       progress: 3,
//       members: 14,
//       description:
//         "Top tier membership with revenue sharing and global ambassador status.",
//     },
//   ];

//   const wbtcLevels = [
//     {
//       id: 1,
//       name: "Bronze",
//       price: getSatoshiAmount(1),
//       satoshi: getSatoshiAmount(1),
//       wbtc: satToWBTC(getSatoshiAmount(1)),
//       usd: satToUSD(getSatoshiAmount(1)),
//       currencySymbol: "SAT",
//       color: "from-yellow-500 to-amber-500",
//       features: [
//         "ChatGPT 4.1 Access",
//         "Basic AI Agent",
//         "Welcome Training",
//         "Sonic Points Intro",
//       ],
//     },
//     {
//       id: 2,
//       name: "Silver",
//       price: getSatoshiAmount(2),
//       satoshi: getSatoshiAmount(2),
//       wbtc: satToWBTC(getSatoshiAmount(2)),
//       usd: satToUSD(getSatoshiAmount(2)),
//       currencySymbol: "SAT",
//       color: "from-amber-600 to-orange-500",
//       features: [
//         "Intermediate AI Agent",
//         "Mindset Training",
//         "Basic DeFi Training",
//       ],
//     },
//     {
//       id: 3,
//       name: "Gold",
//       price: getSatoshiAmount(3),
//       satoshi: getSatoshiAmount(3),
//       wbtc: satToWBTC(getSatoshiAmount(3)),
//       usd: satToUSD(getSatoshiAmount(3)),
//       currencySymbol: "SAT",
//       color: "from-orange-600 to-red-500",
//       features: ["Advanced AI Agent", "Financial Training", "DeFi Access"],
//     },
//     {
//       id: 4,
//       name: "Platinum",
//       price: getSatoshiAmount(4),
//       satoshi: getSatoshiAmount(4),
//       wbtc: satToWBTC(getSatoshiAmount(4)),
//       usd: satToUSD(getSatoshiAmount(4)),
//       currencySymbol: "SAT",
//       color: "from-red-700 to-pink-600",
//       features: [
//         "Expert AI Agent",
//         "Complete Training Suite",
//         "Advanced Analytics",
//       ],
//     },
//     {
//       id: 5,
//       name: "Diamond",
//       price: getSatoshiAmount(5),
//       satoshi: getSatoshiAmount(5),
//       wbtc: satToWBTC(getSatoshiAmount(5)),
//       usd: satToUSD(getSatoshiAmount(5)),
//       currencySymbol: "SAT",
//       color: "from-pink-800 to-purple-700",
//       features: [
//         "Elite AI Ecosystem",
//         "Personal Coaching",
//         "VIP Community Access",
//       ],
//     },
//   ];

//   // Training module data
//   const trainingModules: TrainingModule[] = [
//     {
//       id: "mindset",
//       title: "Mindset Training",
//       icon: Brain,
//       color: "bg-purple-600",
//       description:
//         "Develop a wealth and growth mindset for success in the digital economy",
//       benefits: [
//         "Overcome limiting beliefs",
//         "Set powerful goals",
//         "Develop resilience",
//         "Master productivity",
//       ],
//       modules: 8,
//       completionTime: "4 weeks",
//     },
//     {
//       id: "financial",
//       title: "Financial Training",
//       icon: TrendingUp,
//       color: "bg-green-600",
//       description:
//         "Master personal finance, investing, and wealth building strategies",
//       benefits: [
//         "Build sustainable wealth",
//         "Understand investment vehicles",
//         "Create passive income",
//         "Plan for financial freedom",
//       ],
//       modules: 12,
//       completionTime: "6 weeks",
//     },
//     {
//       id: "ai",
//       title: "AI Training",
//       icon: Brain,
//       color: "bg-blue-600",
//       description:
//         "Learn to leverage AI tools to enhance productivity and create value",
//       benefits: [
//         "Master AI prompting",
//         "Create AI workflows",
//         "Build AI applications",
//         "Automate routine tasks",
//       ],
//       modules: 10,
//       completionTime: "5 weeks",
//     },
//     {
//       id: "defi",
//       title: "DeFi Training",
//       icon: BarChart3,
//       color: "bg-amber-600",
//       description:
//         "Understand decentralized finance protocols, risks and opportunities",
//       benefits: [
//         "Understand DeFi protocols",
//         "Use yield strategies",
//         "Manage crypto assets",
//         "Analyze DeFi risks",
//       ],
//       modules: 14,
//       completionTime: "7 weeks",
//     },
//     {
//       id: "web3",
//       title: "Web3 Training",
//       icon: Globe,
//       color: "bg-cyan-600",
//       description:
//         "Navigate the Web3 ecosystem and utilize blockchain technologies",
//       benefits: [
//         "Understand blockchain fundamentals",
//         "Explore Web3 applications",
//         "Participate in DAOs",
//         "Use Web3 tools",
//       ],
//       modules: 9,
//       completionTime: "4.5 weeks",
//     },
//     {
//       id: "wallet",
//       title: "Wallet Training",
//       icon: ShieldCheck,
//       color: "bg-red-600",
//       description:
//         "Master secure cryptocurrency wallet management and security practices",
//       benefits: [
//         "Self-custody best practices",
//         "Secure seed phrases",
//         "Multi-signature wallets",
//         "Hardware wallet usage",
//       ],
//       modules: 6,
//       completionTime: "3 weeks",
//     },
//     {
//       id: "software",
//       title: "Software Training",
//       icon: Smartphone,
//       color: "bg-indigo-600",
//       description:
//         "Learn essential software applications for digital productivity",
//       benefits: [
//         "Master productivity tools",
//         "Create automated workflows",
//         "Digital organization",
//         "Project management",
//       ],
//       modules: 7,
//       completionTime: "3.5 weeks",
//     },
//     {
//       id: "saas",
//       title: "SaaS Training",
//       icon: Layers,
//       color: "bg-pink-600",
//       description:
//         "Leverage powerful SaaS tools to enhance your business and personal productivity",
//       benefits: [
//         "Discover powerful SaaS tools",
//         "Optimize workflows",
//         "Reduce costs",
//         "Scale operations",
//       ],
//       modules: 8,
//       completionTime: "4 weeks",
//     },
//   ];

//   // Recently upgraded members (social proof data) - removed demo data for launch

//   // Effect to measure button width for video sizing
//   useEffect(() => {
//     if (buttonRef.current) {
//       const width = buttonRef.current.offsetWidth;
//       setButtonWidth(`${width}px`);
//       // console.log("Button width measured:", width);
//     }
//   }, [buttonRef.current]); // Re-run when button reference changes

//   // Effect to set the localReferralId (for API usage) based on domain, URL, or cookie
//   // Only runs once on initial component load
//   //   useEffect(() => {
//   //     // Debug output to confirm URL path detection

//   //     // First check if we have a URL parameter for bitcoin/:referralId
//   //     let idToUse;

//   //     if (params && params.referralId) {
//   //       // If we have a referralId in the URL params from /bitcoin/:referralId route
//   //       const urlId = params.referralId;
//   //       console.log(`Found ID in URL path: ${urlId}`);
//   //       idToUse = urlId;

//   //       // Set cookie to remember this ID
//   //       document.cookie = `referralId=${urlId};path=/;max-age=31536000`; // 1 year
//   //       document.cookie = `clientReferralId=${urlId};path=/;max-age=31536000`; // Also set client cookie

//   //       // Show notification
//   //       toast.toast({
//   //         title: "Referral ID Updated",
//   //         description: `Now using referral ID: ${urlId}`,
//   //         variant: "default",
//   //       });
//   //     } else {
//   //       // If no URL parameter, check cookies (second priority)
//   //       const cookieRefId = getCookie('clientReferralId') || getCookie('referralId');

//   //       // Then check URL path for direct ID format (e.g., /123)
//   //       const path = window.location.pathname;
//   //       const matches = path.match(/^\/([0-9a-zA-Z]+)$/);

//   //       if (matches && matches[1]) {
//   //         // If we have a direct ID in the URL
//   //         const urlId = matches[1];
//   //         console.log(`Found ID in URL path: ${urlId}`);
//   //         idToUse = urlId;

//   //         // Set cookie to remember this ID
//   //         document.cookie = `referralId=${urlId};path=/;max-age=31536000`; // 1 year
//   //         document.cookie = `clientReferralId=${urlId};path=/;max-age=31536000`; // Also set client cookie

//   //         // Show notification
//   //         toast.toast({
//   //           title: "Referral ID Updated",
//   //           description: `Now using referral ID: ${urlId}`,
//   //           variant: "default",
//   //         });
//   //       } else if (cookieRefId) {
//   //         // If we have a cookie, use that
//   //         console.log(`Found referral ID in cookie: ${cookieRefId}`);
//   //         idToUse = cookieRefId;
//   //       } else {
//   //         // Fallback to domain-specific default ID
//   //         const defaultId = getDefaultReferralId();
//   //         console.log(`Using domain-based default referral ID: ${defaultId}`);
//   //         idToUse = defaultId;
//   //       }
//   //     }

//   //     // Update all the referral ID states
//   //     setLocalReferralId(idToUse);
//   //     setCustomReferralId(idToUse);
//   //     setInputValue(idToUse);

//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   //   }, [params]);

//   return (
//     <div className="min-h-screen bg-[#040C17] text-white">
//       {/* Header Navigation with different layouts for mobile and desktop */}
//       <header className="bg-[#0A1324] border-b border-gray-800">
//         <div className="container mx-auto px-4 py-2 flex justify-between items-center">
//           {/* Left side - Logo for both mobile and desktop */}
//           <div className="flex items-center">
//             {/* Mobile logo */}
//             <div
//             // onClick={() => {
//             //   if (typeof window !== 'undefined') {
//             //     // Safe to use window here
//             //     window.location.href = "https://dapp.web3sonic.com/";
//             //   }
//             // }}
//             // className="flex items-center cursor-pointer"
//             >
//               {/* Logo is different between mobile and desktop */}
//               <span className="md:hidden text-base font-bold">
//                 <span className="text-[#00A3FF]">WEB</span>
//                 <span className="text-[#FF9500]">3</span>{" "}
//                 <span className="text-amber-500">⚡</span>{" "}
//                 <span className="bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-500 text-transparent bg-clip-text">
//                   SONIC
//                 </span>
//               </span>

//               {/* Desktop logo includes WEB3 SONIC title and AI Agent image */}
//               <div className="hidden md:flex items-center">
//                 <img
//                   src="https://www.zartis.com/wp-content/uploads/2024/10/ai-agents.gif"
//                   alt="AI Agent"
//                   className="w-10 h-10 rounded-full object-contain mr-2"
//                   style={{
//                     filter: "drop-shadow(0 0 5px rgba(0, 163, 255, 0.5))",
//                   }}
//                 />
//                 <span className="text-xl font-bold">
//                   <span className="text-[#00A3FF]">WEB</span>
//                   <span className="text-[#FF9500]">3</span>{" "}
//                   <span className="bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-500 text-transparent bg-clip-text">
//                     SONIC
//                   </span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Middle - Navigation Links (desktop only) */}
//           <div className="hidden md:flex items-center space-x-4 ml-8">
//             <a
//               href="/wallet"
//               className="text-gray-300 hover:text-white text-xs sm:text-sm whitespace-nowrap flex items-center"
//               onClick={(e) => {
//                 e.preventDefault();
//                 // if (typeof window !== 'undefined') {
//                 //   // Safe to use window here
//                 //   window.location.href = "https://dapp.web3sonic.com/wallet";
//                 // }
//               }}
//             >
//               <Wallet size={16} className="mr-1.5 text-[#00A3FF]" />
//               Download Wallet
//             </a>
//             <a
//               href="/points"
//               className="text-gray-300 hover:text-white text-xs sm:text-sm flex items-center whitespace-nowrap"
//               onClick={(e) => {
//                 e.preventDefault();
//                 // if (typeof window !== 'undefined') {
//                 //   // Safe to use window here
//                 //   window.location.href = "https://dapp.web3sonic.com/points";
//                 // }
//               }}
//             >
//               <Star size={16} className="mr-1.5 text-yellow-400" />
//               Sonic Points
//             </a>
//             <a
//               href="/guide"
//               className="text-gray-300 hover:text-white text-xs sm:text-sm whitespace-nowrap flex items-center"
//               onClick={(e) => {
//                 e.preventDefault();
//                 // if (typeof window !== 'undefined') {
//                 //   // Safe to use window here
//                 //   window.location.href = "https://dapp.web3sonic.com/guide";
//                 // }
//               }}
//             >
//               <HelpCircle size={16} className="mr-1.5 text-[#00A3FF]" />
//               Getting Started
//             </a>
//           </div>

//           {/* Mobile Menu Toggle Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>

//           {/* Mobile Menu Dropdown */}
//           {mobileMenuOpen && (
//             <div className="absolute top-14 left-0 right-0 bg-[#0A1324] border-b border-gray-800 shadow-lg z-50 md:hidden">
//               <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
//                 <a
//                   href="/wallet"
//                   className="text-gray-300 hover:text-white py-2 text-sm font-medium border-b border-gray-800 pb-2 flex items-center"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setMobileMenuOpen(false);
//                     // if (typeof window !== 'undefined') {
//                     //   // Safe to use window here
//                     //   window.location.href = "https://dapp.web3sonic.com/wallet";
//                     // }
//                   }}
//                 >
//                   <Wallet size={18} className="mr-2 text-[#00A3FF]" />
//                   Download Wallet
//                 </a>
//                 <a
//                   href="/points"
//                   className="text-gray-300 hover:text-white py-2 text-sm font-medium border-b border-gray-800 pb-2 flex items-center"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setMobileMenuOpen(false);
//                     // if (typeof window !== 'undefined') {
//                     //   // Safe to use window here
//                     //   window.location.href = "https://dapp.web3sonic.com/points";
//                     // }
//                   }}
//                 >
//                   <Star size={18} className="mr-2 text-yellow-400" />
//                   Sonic Points
//                 </a>
//                 <a
//                   href="https://web3sonic.com/documentation"
//                   className="text-gray-300 hover:text-white py-2 text-sm font-medium flex items-center"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setMobileMenuOpen(false);
//                     // if (typeof window !== 'undefined') {
//                     //   // Safe to use window here
//                     //   window.location.href =
//                     //   "https://web3sonic.com/documentation";
//                     // }
//                   }}
//                 >
//                   <HelpCircle size={18} className="mr-2 text-[#00A3FF]" />
//                   Getting Started
//                 </a>
//               </div>
//             </div>
//           )}

//           {/* Right side - Connect/Disconnect buttons only */}
//           <div className="flex items-center space-x-2">
//             <div className="hidden sm:block">
//               <a
//                 href="https://dapp.web3sonic.com/login"
//                 className="px-4 py-1.5 text-gray-300 hover:text-white flex items-center rounded-full text-xs sm:text-sm"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   // if (typeof window !== 'undefined') {
//                   //   // Safe to use window here
//                   //   window.location.href = "https://dapp.web3sonic.com/login";
//                   // }
//                 }}
//               >
//                 <LogIn size={16} className="mr-1.5 text-blue-400" />
//                 Login
//               </a>
//             </div>

//             <div className="flex items-center">
//               <a
//                 href="https://dapp.web3sonic.com/register"
//                 className="px-3 py-1.5 sm:px-4 sm:py-1.5 bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded-full text-white font-semibold flex items-center text-xs sm:text-sm"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   // if (typeof window !== 'undefined') {
//                   //   // Safe to use window here
//                   //   window.location.href = `https://dapp.web3sonic.com/register?ref=${localReferralId}`;
//                   // }
//                 }}
//               >
//                 <LogIn size={16} className="mr-1.5" />
//                 <span className="hidden sm:inline">Register</span>
//                 <span className="sm:hidden">Join</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile-only header images - removed padding */}
//       <div className="md:hidden w-full">
//         <img
//           src="https://storage.googleapis.com/msgsndr/sc2wM9qjh4FmcUD5WVtJ/media/680c43a6f8c1887512b7d418.png"
//           alt="Bitcoin Sonic Header"
//           className="w-full object-contain"
//           style={{ height: "auto", maxWidth: "100%", display: "block" }}
//         />

//         {/* Second mobile header image - removed vertical spacing */}
//         <img
//           src="https://storage.googleapis.com/msgsndr/sc2wM9qjh4FmcUD5WVtJ/media/680c3bbc3ea396b09bf7d239.jpeg"
//           alt="Bitcoin Sonic Promo"
//           className="w-full object-contain"
//           style={{ height: "auto", maxWidth: "100%", display: "block" }}
//         />
//       </div>

//       {/* Fixed price bar */}
//       <div className="bg-[#0A1324]/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <BitcoinLogo width={18} height={18} className="mr-1.5" />
//               <span className="text-sm font-medium">{wbtcPrice}</span>
//             </div>

//             <div className="flex items-center">
//               <SonicLogo width={18} height={18} className="mr-1.5" />
//               <span className="text-sm font-medium">{sonicPrice}</span>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center space-x-2 text-xs text-gray-400">
//             <span>Sonic Chain: 146</span>
//             <span>•</span>
//             <span>Referral ID: {localReferralId}</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Hero Section with Logo, Title and Video */}
//         <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-between mb-12">
//           {/* Left side with title and heading */}
//           <div className="w-full md:w-1/2 flex flex-col text-center md:text-left">
//             {/* Main Title with AI Agent to the right */}
//             <div className="mb-6">
//               {/* "EARN BITCOIN" with AI Agent to the right */}
//               <div className="flex flex-row items-center justify-center md:justify-start gap-4 mb-2">
//                 <div
//                   className="text-center md:text-left font-bold"
//                   style={{
//                     fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
//                     lineHeight: 1,
//                     letterSpacing: "0.02em",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
//                   }}
//                 >
//                   EARN wBTC
//                 </div>

//                 {/* AI Agent Logo moved to the right of the title */}
//                 <img
//                   src="https://www.zartis.com/wp-content/uploads/2024/10/ai-agents.gif"
//                   alt="AI Agent"
//                   className="w-16 h-16 md:w-24 md:h-24 object-contain rounded-full"
//                   style={{
//                     filter: "drop-shadow(0 0 15px rgba(0, 163, 255, 0.5))",
//                   }}
//                 />
//               </div>

//               {/* "POWERED BY AI and wBTC on SONIC" */}
//               <div className="text-center md:text-left mb-4">
//                 <div
//                   className="inline-block bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-600 text-transparent bg-clip-text font-bold"
//                   style={{
//                     fontSize: "clamp(1rem, 3vw, 1.75rem)",
//                     lineHeight: 1.2,
//                     letterSpacing: "-0.01em",
//                   }}
//                 >
//                   POWERED BY AI and wBTC on SONIC
//                 </div>
//               </div>

//               {/* Subtitle text */}
//               <div
//                 className="text-center md:text-left text-lg text-gray-300 font-light"
//                 style={{ maxWidth: "500px", margin: "0 auto" }}
//               >
//                 Join the groundbreaking Smart Contract Matrix that's paying
//                 <span className="font-semibold text-white">
//                   {" "}
//                   real Bitcoin rewards
//                 </span>{" "}
//                 to members worldwide.
//               </div>

//               {/* Levels info line */}
//               <div className="mt-4 text-center md:text-left text-sm font-medium bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-overflow-ellipsis">
//                 Explore our 10 Sonic levels and 5 WBTC levels to unlock advanced
//                 training, tools and rewards
//               </div>
//             </div>

//             {/* Animated Stats Section (New) */}
//             <div className="bg-[#0A1324] border border-gray-800 rounded-lg p-4 mb-6 flex flex-wrap justify-center md:justify-between gap-4">
//               <motion.div
//                 className="flex flex-col items-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <span className="text-2xl font-bold text-blue-400">
//                   {(activemembers ?? 0) - 1}
//                 </span>
//                 <span className="text-sm text-gray-400">Active Members</span>
//               </motion.div>

//               <motion.div
//                 className="flex flex-col items-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <span className="text-2xl font-bold text-amber-400">
//                   {(Number(wbtctotalrec) / 1e8).toLocaleString(undefined, {
//                     minimumFractionDigits: 8,
//                   })}
//                 </span>
//                 <span className="text-sm text-gray-400">wbtc Distributed</span>
//               </motion.div>

//               <motion.div
//                 className="flex flex-col items-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <span className="text-2xl font-bold text-green-400">
//                   {wbtcTansCount}
//                 </span>
//                 <span className="text-sm text-gray-400">Transactions</span>
//               </motion.div>
//             </div>

//             {/* Removed mobile AI agent image since it's now next to the title */}

//             {/* CTA Buttons */}
//             <div className="flex flex-col items-center md:items-start space-y-4">
//               {/* Buttons row */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   ref={buttonRef}
//                   className="px-6 py-3 bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded-lg text-white font-semibold flex items-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105"
//                   onClick={() => {
//                     // if (typeof window !== 'undefined') {
//                     //   // Safe to use window here
//                     //   window.location.href = `https://dapp.web3sonic.com/register?ref=${localReferralId}`;
//                     // }
//                   }}
//                 >
//                   <span className="mr-3">Deploy AI Agent</span>
//                   <ArrowRight size={18} />
//                 </button>

//                 <a
//                   href="https://rabby.io"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold flex items-center shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-105"
//                 >
//                   <span className="mr-3">Download Rabby Wallet</span>
//                   <Wallet size={18} />
//                 </a>
//               </div>

//               {/* Extra Note */}
//               <p className="text-sm text-gray-400 text-center md:text-left">
//                 <span className="text-green-400">✓</span> Instant payments •{" "}
//                 <span className="text-green-400">✓</span> No admin fees •{" "}
//                 <span className="text-green-400">✓</span> Smart contract
//                 verified
//               </p>

//               {/* Change ID section - moved here from below */}
//               <div className="mt-4 bg-[#0A1324]/50 border border-gray-800 rounded-lg p-4 text-center md:text-left">
//                 <p className="text-sm mb-2">
//                   You're using referral ID:{" "}
//                   <span className="text-blue-400 font-medium">
//                     {localReferralId}
//                   </span>
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <input
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     placeholder="Enter custom referral ID"
//                     className="px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-white w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                   />

//                   <button
//                     onClick={() => {
//                       // Update the referral ID if input is not empty
//                       if (inputValue.trim()) {
//                         setLocalReferralId(inputValue);
//                         setCustomReferralId(inputValue);

//                         // Set cookies
//                         document.cookie = `referralId=${inputValue};path=/;max-age=31536000`; // 1 year
//                         document.cookie = `clientReferralId=${inputValue};path=/;max-age=31536000`;

//                         // Show notification
//                         toast.toast({
//                           title: "Referral ID Updated",
//                           description: `Now using referral ID: ${inputValue}`,
//                           variant: "default",
//                         });
//                       }
//                     }}
//                     className="px-3 py-1.5 bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded-lg text-white font-medium text-sm whitespace-nowrap hover:shadow-lg hover:shadow-blue-500/20 transition-shadow"
//                   >
//                     Change ID
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right side with video panel maximized */}
//           <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
//             {/* Embedded MP4 video - shown on both mobile and desktop - maximized */}
//             <div
//               className="w-full overflow-hidden rounded-lg border border-blue-500/20 shadow-lg shadow-blue-500/10"
//               style={{ maxWidth: "100%" }}
//             >
//               <div className="aspect-video relative">
//                 <VideoPlayer videoSrc="https://storage.googleapis.com/msgsndr/sc2wM9qjh4FmcUD5WVtJ/media/680afc59e28f4e3e19fe59ba.mp4" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Membership Journey Map (New) */}
//         <section className="mb-16">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-600 text-transparent bg-clip-text">
//               Your Membership Journey
//             </h2>
//             <p className="text-gray-300 max-w-full mx-auto whitespace-nowrap md:whitespace-normal overflow-hidden text-overflow-ellipsis">
//               Explore our 10 Sonic levels and 5 WBTC levels to unlock advanced
//               training, tools and rewards
//             </p>
//           </div>

//           <div className="bg-[#0A1324] border border-gray-800 rounded-xl p-6 shadow-lg">
//             <Tabs
//               defaultValue="journey"
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="w-full"
//             >
//               <TabsList className="grid w-full grid-cols-3 mb-6">
//                 <TabsTrigger value="journey" className="text-sm">
//                   Membership Journey
//                 </TabsTrigger>
//                 <TabsTrigger value="sonic" className="text-sm">
//                   Sonic Levels
//                 </TabsTrigger>
//                 <TabsTrigger value="wbtc" className="text-sm">
//                   WBTC Levels
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="journey" className="pt-2">
//                 {/* Interactive Journey Map */}
//                 <div className="relative">
//                   {/* Connector line */}
//                   <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 transform -translate-y-1/2 z-0"></div>

//                   {/* Level markers */}
//                   <div className="relative z-10 flex justify-between items-center">
//                     {membershipLevels.slice(0, 5).map((level, index) => (
//                       <div
//                         key={level.id}
//                         className="flex flex-col items-center"
//                       >
//                         <motion.div
//                           className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${level.color} cursor-pointer mb-2`}
//                           whileHover={{ scale: 1.1 }}
//                           onClick={() => setSelectedLevel(level.id)}
//                         >
//                           <span className="text-white font-bold">
//                             {level.id}
//                           </span>
//                         </motion.div>
//                         <span className="text-xs text-gray-300 whitespace-nowrap">
//                           {level.name}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* 6-10 row */}
//                   <div className="relative z-10 flex justify-between items-center mt-16">
//                     {membershipLevels.slice(5, 10).map((level, index) => (
//                       <div
//                         key={level.id}
//                         className="flex flex-col items-center"
//                       >
//                         <motion.div
//                           className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${level.color} cursor-pointer mb-2`}
//                           whileHover={{ scale: 1.1 }}
//                           onClick={() => setSelectedLevel(level.id)}
//                         >
//                           <span className="text-white font-bold">
//                             {level.id}
//                           </span>
//                         </motion.div>
//                         <span className="text-xs text-gray-300 whitespace-nowrap">
//                           {level.name}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Selected Level Details */}
//                 <AnimatePresence>
//                   {selectedLevel && (
//                     <motion.div
//                       className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                     >
//                       <div className="flex flex-col md:flex-row gap-6">
//                         {/* Level info */}
//                         <div className="md:w-2/3">
//                           <div className="flex items-center mb-3">
//                             <div
//                               className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${
//                                 membershipLevels[selectedLevel - 1].color
//                               } mr-3`}
//                             >
//                               {React.createElement(
//                                 membershipLevels[selectedLevel - 1].icon,
//                                 { className: "w-5 h-5 text-white" }
//                               )}
//                             </div>
//                             <div>
//                               <h3 className="text-xl font-bold text-white">
//                                 {membershipLevels[selectedLevel - 1].name} Level
//                               </h3>
//                               <p className="text-blue-400">
//                                 {membershipLevels[
//                                   selectedLevel - 1
//                                 ].satoshi?.toLocaleString() || 0}{" "}
//                                 SAT
//                                 <span className="text-gray-400 text-sm ml-2">
//                                   (≈ $
//                                   {membershipLevels[selectedLevel - 1]
//                                     .usdValue || "0.00"}{" "}
//                                   USD)
//                                 </span>
//                               </p>
//                             </div>
//                           </div>

//                           <p className="text-gray-300 mb-4">
//                             {membershipLevels[selectedLevel - 1].description}
//                           </p>

//                           <div className="mb-4">
//                             <h4 className="text-sm font-medium text-gray-400 mb-2">
//                               FEATURES:
//                             </h4>
//                             <ul className="space-y-2">
//                               {membershipLevels[selectedLevel - 1].features.map(
//                                 (feature, index) => (
//                                   <li key={index} className="flex items-center">
//                                     <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
//                                     <span className="text-white">
//                                       {feature}
//                                     </span>
//                                   </li>
//                                 )
//                               )}
//                             </ul>
//                           </div>
//                         </div>

//                         {/* Stats */}
//                         <div className="md:w-1/3 bg-gray-900/50 rounded-lg p-4">
//                           <h4 className="text-sm font-medium text-gray-400 mb-3">
//                             LEVEL STATS:
//                           </h4>

//                           <div className="mb-3">
//                             <div className="flex justify-between text-sm mb-1">
//                               <span className="text-gray-400">
//                                 Adoption Rate
//                               </span>
//                               <span className="text-white">
//                                 {membershipLevels[selectedLevel - 1].progress}%
//                               </span>
//                             </div>
//                             <Progress
//                               value={
//                                 membershipLevels[selectedLevel - 1].progress
//                               }
//                               className="h-2"
//                             />
//                           </div>

//                           <div className="flex items-center mb-3">
//                             <Users className="w-4 h-4 text-blue-400 mr-2" />
//                             <span className="text-gray-400 text-sm">
//                               Active Members:
//                             </span>
//                             <span className="ml-auto text-white">
//                               {membershipLevels[selectedLevel - 1].members}
//                             </span>
//                           </div>

//                           {selectedLevel === 1 && (
//                             <a
//                               href="/member-chat"
//                               className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md text-white font-medium mt-4 mb-2 hover:shadow-lg hover:shadow-blue-500/20 transition-shadow flex items-center justify-center"
//                             >
//                               <Brain className="w-4 h-4 mr-2" />
//                               Try ChatGPT 4.1 for Level 1
//                             </a>
//                           )}
//                           <button
//                             className="w-full py-2 bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded-md text-white font-medium mt-4 hover:shadow-lg hover:shadow-blue-500/20 transition-shadow"
//                             onClick={() => {
//                               // if (typeof window !== 'undefined') {
//                               //   // Safe to use window here
//                               //   window.location.href = `https://dapp.web3sonic.com/register?ref=${localReferralId}&level=${selectedLevel}`;
//                               // }
//                             }}
//                           >
//                             Unlock {membershipLevels[selectedLevel - 1].name}{" "}
//                             Level
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {!selectedLevel && (
//                   <div className="mt-8 text-center text-gray-400">
//                     <p>Click on any level to see details</p>
//                   </div>
//                 )}
//               </TabsContent>

//               <TabsContent value="sonic" className="pt-2">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {membershipLevels.map((level) => (
//                     <motion.div
//                       key={level.id}
//                       className="flex bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500/30 transition-colors"
//                       whileHover={{ y: -5 }}
//                     >
//                       <div
//                         className={`w-2 bg-gradient-to-b ${level.color}`}
//                       ></div>
//                       <div className="p-4 flex-1">
//                         <div className="flex items-center mb-3">
//                           <div
//                             className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${level.color} mr-2`}
//                           >
//                             {React.createElement(level.icon, {
//                               className: "w-4 h-4 text-white",
//                             })}
//                           </div>
//                           <div>
//                             <h3 className="font-bold text-white">
//                               {level.name}
//                             </h3>
//                             <p className="text-sm text-blue-400">
//                               {level.satoshi?.toLocaleString()} SAT
//                               <span className="text-gray-400 text-xs ml-1">
//                                 (≈ ${level.usdValue})
//                               </span>
//                             </p>
//                           </div>
//                           <Badge className="ml-auto bg-blue-900/30 text-blue-400 border-blue-500/20">
//                             Level {level.id}
//                           </Badge>
//                         </div>

//                         <div className="mb-3">
//                           <ul className="space-y-1">
//                             {level.features.map((feature, index) => (
//                               <li
//                                 key={index}
//                                 className="flex items-center text-sm"
//                               >
//                                 <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
//                                 <span className="text-gray-200">{feature}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>

//                         <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700">
//                           <div className="flex items-center text-xs text-gray-400">
//                             <Users className="w-3 h-3 mr-1" />
//                             {level.members} members
//                           </div>
//                           {level.id === 1 ? (
//                             <div className="flex space-x-2">
//                               <a
//                                 href="/member-chat"
//                                 className="text-xs py-1 px-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-shadow flex items-center"
//                               >
//                                 <Brain className="w-3 h-3 mr-1" />
//                                 <span>Try ChatGPT</span>
//                               </a>
//                               <button
//                                 className="text-xs py-1 px-3 bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-shadow flex items-center"
//                                 onClick={() => {
//                                   // if (typeof window !== 'undefined') {
//                                   //   // Safe to use window here
//                                   //   window.location.href = `https://dapp.web3sonic.com/register?ref=${localReferralId}&level=${level.id}`;
//                                   // }
//                                 }}
//                               >
//                                 <span>Deploy</span>
//                                 <ArrowRight className="w-3 h-3 ml-1" />
//                               </button>
//                             </div>
//                           ) : (
//                             <button
//                               className="text-xs py-1 px-3 bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-shadow flex items-center"
//                               onClick={() => {
//                                 // if (typeof window !== 'undefined') {
//                                 //   // Safe to use window here
//                                 //   window.location.href = `https://dapp.web3sonic.com/register?ref=${localReferralId}&level=${level.id}`;
//                                 // }
//                               }}
//                             >
//                               <span>Deploy</span>
//                               <ArrowRight className="w-3 h-3 ml-1" />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="wbtc" className="pt-2">
//                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                   {wbtcLevels.map((level) => (
//                     <motion.div
//                       key={level.id}
//                       className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col hover:border-amber-500/30 transition-colors"
//                       whileHover={{ y: -5 }}
//                     >
//                       <div className="mb-3 flex items-center justify-between">
//                         <Badge
//                           className={`bg-gradient-to-r ${level.color} text-white border-0`}
//                         >
//                           Level {level.id}
//                         </Badge>
//                         <BitcoinLogo width={20} height={20} />
//                       </div>

//                       <h3 className="font-bold text-white mb-1">
//                         {level.name}
//                       </h3>
//                       <p className="text-amber-400 text-sm mb-1">
//                         {level.price.toLocaleString()} {level.currencySymbol}
//                       </p>
//                       <p className="text-gray-400 text-xs mb-3">
//                         ≈ ${level.usd} USD
//                       </p>

//                       <div className="flex-1 mb-3">
//                         <ul className="space-y-2">
//                           {level.features.map((feature, index) => (
//                             <li
//                               key={index}
//                               className="flex items-center text-sm"
//                             >
//                               <CheckCircle className="w-3 h-3 text-amber-500 mr-2 flex-shrink-0" />
//                               <span className="text-gray-200">{feature}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <button
//                         className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-md text-white font-medium mt-2 hover:shadow-lg hover:shadow-amber-500/20 transition-shadow"
//                         onClick={() => {
//                           // if (typeof window !== 'undefined') {
//                           //   // Safe to use window here
//                           //   window.location.href = `https://dapp.web3sonic.com/register?ref=${localReferralId}&level=${level.id}`;
//                           // }
//                         }}
//                       >
//                         Activate {level.name}
//                       </button>
//                     </motion.div>
//                   ))}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </section>

//         {/* Training Hub Section (New) */}
//         <section className="mb-16">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-600 text-transparent bg-clip-text">
//               Training Hub
//             </h2>
//             <p className="text-gray-300 max-w-2xl mx-auto">
//               Access comprehensive training modules to master Web3, finance, AI
//               and more
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {trainingModules.map((module) => (
//               <motion.div
//                 key={module.id}
//                 className="bg-[#0A1324] border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
//                 whileHover={{ y: -5 }}
//               >
//                 <div className={`${module.color} h-2`}></div>
//                 <div className="p-4">
//                   <div className="flex items-center mb-3">
//                     <div
//                       className={`${module.color} bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center mr-3`}
//                     >
//                       {React.createElement(module.icon, {
//                         className: "w-5 h-5 text-white",
//                       })}
//                     </div>
//                     <h3 className="font-bold text-lg text-white">
//                       {module.title}
//                     </h3>
//                   </div>

//                   <p className="text-gray-300 text-sm mb-4">
//                     {module.description}
//                   </p>

//                   <div className="mb-4">
//                     <div className="flex items-center text-xs text-gray-400 mb-1">
//                       <span className="flex-1">Modules: {module.modules}</span>
//                       <span>|</span>
//                       <span className="flex-1 text-right">
//                         {module.completionTime}
//                       </span>
//                     </div>
//                     <Progress value={70} className="h-1" />
//                   </div>

//                   <ul className="space-y-1 mb-4">
//                     {module.benefits.slice(0, 2).map((benefit, index) => (
//                       <li
//                         key={index}
//                         className="flex items-center text-xs text-gray-300"
//                       >
//                         <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
//                         <span>{benefit}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <button className="w-full py-2 bg-[#0A1324] border border-gray-700 rounded-md text-white text-sm font-medium hover:bg-gray-900 transition-colors flex items-center justify-center">
//                     <Zap className="w-3 h-3 mr-1 text-blue-400" />
//                     Unlock Training
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Social Proof Section (New) */}
//         <section className="mb-16">
//           <div className="bg-[#0A1324] border border-gray-800 rounded-xl p-6 shadow-lg">
//             <div className="flex flex-col md:flex-row gap-8">
//               {/* Real-time stats */}
//               <div className="w-full">
//                 <h3 className="text-xl font-bold mb-4 flex items-center">
//                   <Zap className="w-5 h-5 text-blue-400 mr-2" />
//                   Real-time Platform Stats
//                 </h3>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
//                     <h4 className="text-gray-400 text-sm mb-1">
//                       Active Members
//                     </h4>
//                     <div className="text-2xl font-bold text-white">
//                       {(activemembers ?? 0) - 1}
//                     </div>
//                     <div className="text-xs text-blue-400 flex items-center mt-1">
//                       <Zap className="w-3 h-3 mr-1" />
//                       Launch day
//                     </div>
//                   </div>

//                   <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
//                     <h4 className="text-gray-400 text-sm mb-1">WBTC Price</h4>
//                     <div className="text-2xl font-bold text-white">
//                       {wbtcPrice} $
//                     </div>
//                     <div className="text-xs text-blue-400 flex items-center mt-1">
//                       <Zap className="w-3 h-3 mr-1" />
//                       Launch day
//                     </div>
//                   </div>

//                   <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
//                     <h4 className="text-gray-400 text-sm mb-1">
//                       Transaction Count
//                     </h4>
//                     <div className="text-2xl font-bold text-white">
//                       {wbtcTansCount}
//                     </div>
//                     <div className="text-xs text-blue-400 flex items-center mt-1">
//                       <Zap className="w-3 h-3 mr-1" />
//                       Launch day
//                     </div>
//                   </div>

//                   <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
//                     <h4 className="text-gray-400 text-sm mb-1">Sonic Price</h4>
//                     <div className="text-2xl font-bold text-white">
//                       {sonicPrice} $
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
//                   <h4 className="text-gray-400 text-sm mb-3 flex items-center">
//                     <MousePointer className="w-3 h-3 mr-1" />
//                     Next Steps
//                   </h4>

//                   <button
//                     className="w-full py-3 bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded-lg text-white font-semibold flex items-center justify-center mb-3 hover:shadow-lg hover:shadow-blue-500/20 transition-shadow"
//                     onClick={() => {
//                       // if (typeof window !== 'undefined') {
//                       //   // Safe to use window here
//                       //   window.location.href = `https://dapp.web3sonic.com/register?ref=${localReferralId}`;
//                       // }
//                     }}
//                   >
//                     <span className="mr-2">Deploy AI Agent</span>
//                     <ArrowRight size={16} />
//                   </button>

//                   <button
//                     className="w-full py-2 bg-transparent border border-gray-700 rounded-lg text-gray-300 text-sm font-medium hover:bg-gray-800 transition-colors"
//                     onClick={() => {
//                       // if (typeof window !== 'undefined') {
//                       //   // Safe to use window here
//                       //   window.location.href = "https://dapp.web3sonic.com/guide";
//                       // }
//                     }}
//                   >
//                     Read the Getting Started Guide
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Original "How it Works" section from HomeDarkNew */}
//         <section className="mb-16">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-600 text-transparent bg-clip-text">
//               How The Satoshi Matrix Works
//             </h2>
//             <p className="text-gray-300 max-w-2xl mx-auto">
//               Our smart contract matrix pays out instant Bitcoin rewards as new
//               members join and the network expands
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Step 1 */}
//             <div className="bg-[#0A1324] border border-gray-800 rounded-lg p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
//                   <span className="text-blue-400 font-semibold">1</span>
//                 </div>
//                 <h3 className="text-xl font-bold">Deploy AI Agent</h3>
//               </div>
//               <p className="text-gray-300">
//                 Register and deploy your personal AI agent on the Sonic network
//                 with a one-time activation fee.
//               </p>
//               <ul className="mt-4 space-y-2">
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     One-time payments with no recurring fees
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     Activation fees are distributed to network members
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     10 membership levels with increasing rewards
//                   </span>
//                 </li>
//               </ul>
//             </div>

//             {/* Step 2 */}
//             <div className="bg-[#0A1324] border border-gray-800 rounded-lg p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
//                   <span className="text-blue-400 font-semibold">2</span>
//                 </div>
//                 <h3 className="text-xl font-bold">Build Your Network</h3>
//               </div>
//               <p className="text-gray-300">
//                 Share your referral link with others to build your Sonic Matrix
//                 network and expand your reward potential.
//               </p>
//               <ul className="mt-4 space-y-2">
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     3x2 matrix structure with 12 payment positions
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     Direct and indirect referrals contribute to your income
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     Spillover from upline members helps fill your matrix
//                   </span>
//                 </li>
//               </ul>
//             </div>

//             {/* Step 3 */}
//             <div className="bg-[#0A1324] border border-gray-800 rounded-lg p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
//                   <span className="text-blue-400 font-semibold">3</span>
//                 </div>
//                 <h3 className="text-xl font-bold">Earn Bitcoin Rewards</h3>
//               </div>
//               <p className="text-gray-300">
//                 Receive instant Bitcoin payments directly to your wallet each
//                 time a new member joins your network.
//               </p>
//               <ul className="mt-4 space-y-2">
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     Smart contract automatically distributes rewards
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     Payments sent in WBTC (Wrapped Bitcoin)
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-400 mt-0.5 mr-2 flex-shrink-0"
//                   />
//                   <span className="text-gray-300">
//                     No admin fees or waiting periods for payouts
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Income visualizer prompt */}
//           <div className="text-center mt-8">
//             <button
//               onClick={() => setShowJourneyMap(!showJourneyMap)}
//               className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center mx-auto"
//             >
//               {showJourneyMap ? "Hide" : "View"} Matrix Income Potential
//               <ArrowRight size={16} className="ml-2" />
//             </button>
//           </div>

//           {/* Matrix Payout Visualization */}
//           {showJourneyMap && (
//             <div className="mt-8 bg-[#0A1324] border border-gray-800 rounded-lg p-6">
//               <LevelPayoutVisualization />
//             </div>
//           )}
//         </section>

//         {/* FAQ Section */}
//         <section className="mb-16">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-600 text-transparent bg-clip-text">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-gray-300 max-w-2xl mx-auto">
//               Get answers to common questions about the Sonic Matrix and
//               membership levels
//             </p>
//           </div>

//           <div className="bg-[#0A1324] border border-gray-800 rounded-lg p-6">
//             <Accordion type="single" collapsible className="w-full">
//               <AccordionItem value="item-1" className="border-gray-700">
//                 <AccordionTrigger className="text-white">
//                   What is the Satoshi Matrix?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-300">
//                   The Satoshi Matrix is a smart contract-based 3x2 matrix system
//                   that distributes Bitcoin rewards to members as the network
//                   grows. It operates on the Sonic blockchain and provides
//                   instant payments with no admin fees.
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="item-2" className="border-gray-700">
//                 <AccordionTrigger className="text-white">
//                   How do memberships work?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-300">
//                   There are 10 Sonic membership levels and 5 WBTC levels, each
//                   unlocking more features, training, and earning potential. You
//                   pay a one-time fee to activate each level, with higher levels
//                   providing access to more comprehensive training and higher
//                   matrix payouts.
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="item-3" className="border-gray-700">
//                 <AccordionTrigger className="text-white">
//                   What training is included?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-300">
//                   Our training covers mindset development, financial literacy,
//                   AI utilization, DeFi protocols, Web3 technologies, wallet
//                   security, software applications, and SaaS tools. Different
//                   membership levels unlock various training modules and
//                   resources.
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="item-4" className="border-gray-700">
//                 <AccordionTrigger className="text-white">
//                   How do I receive my Bitcoin rewards?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-300">
//                   When someone joins using your referral link or is placed in
//                   your matrix, the smart contract automatically sends WBTC
//                   (Wrapped Bitcoin) directly to your connected wallet. Payments
//                   are instant with no delays or manual processing.
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="item-5" className="border-gray-700">
//                 <AccordionTrigger className="text-white">
//                   What is the AI Agent?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-300">
//                   The AI Agent is your personal artificial intelligence
//                   assistant that helps you navigate the Sonic ecosystem,
//                   provides training recommendations, assists with referral
//                   management, and offers personalized financial insights. Higher
//                   membership levels unlock more powerful AI capabilities.
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>
//         </section>

//         {/* Custom Referral ID Section moved under the buttons above */}

//         {/* Final CTA Section */}
//         <section className="mb-16">
//           <div className="bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-blue-500/20 rounded-lg p-8 text-center">
//             <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-600 text-transparent bg-clip-text">
//               Ready to Join the Sonic Matrix?
//             </h2>
//             <p className="text-gray-300 max-w-2xl mx-auto mb-6">
//               Deploy your AI Agent now and start earning Bitcoin rewards as your
//               network grows. Gain access to premium training and become part of
//               our thriving Web3 community.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 className="px-6 py-3 bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded-lg text-white font-semibold flex items-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105"
//                 onClick={() => {
//                   // if (typeof window !== 'undefined') {
//                   //   // Safe to use window here
//                   //   window.location.href = `https://dapp.web3sonic.com/register?ref=${localReferralId}`;
//                   // }
//                 }}
//               >
//                 <span className="mr-3">Deploy AI Agent</span>
//                 <ArrowRight size={18} />
//               </button>

//               <button
//                 className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-semibold hover:bg-gray-700 transition-colors"
//                 onClick={() => {
//                   // if (typeof window !== 'undefined') {
//                   //   // Safe to use window here
//                   //   window.location.href = "https://dapp.web3sonic.com/guide";
//                   // }
//                 }}
//               >
//                 Learn More
//               </button>
//             </div>

//             <p className="text-sm text-gray-400 mt-4">
//               Already a member?{" "}
//               <a
//                 href="https://dapp.web3sonic.com/login"
//                 className="text-blue-400 hover:underline"
//               >
//                 Login here
//               </a>
//             </p>
//           </div>
//         </section>

//         {/* Matrix Visualization Section */}
//         <section className="py-16 bg-gradient-to-b from-gray-900 to-[#0A1324] text-white">
//           <div className="container mx-auto px-4">
//             <div className="mb-10 text-center">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-500 text-transparent bg-clip-text">
//                 Active Matrix Visualization
//               </h2>
//               <p className="text-gray-300 max-w-2xl mx-auto">
//                 See how the Satoshi Matrix system works with this interactive
//                 visualization. Track positions, understand payment flows, and
//                 visualize your potential earnings in the Bronze level matrix.
//               </p>
//             </div>

//             {/* <div className="matrix-visualization-container flex justify-center">
//               <MatrixVisualize embedded={true} />
//             </div> */}
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-[#0A1324] border-t border-gray-800 py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-6 md:mb-0">
//               <img
//                 src="https://resources.cryptocompare.com/asset-management/17157/1727687183179.png"
//                 alt="Sonic Logo"
//                 className="w-10 h-10 rounded-full object-contain mr-3"
//               />
//               <div>
//                 <span className="text-xl font-bold">
//                   <span className="text-[#00A3FF]">WEB</span>
//                   <span className="text-[#FF9500]">3</span>{" "}
//                   <span className="bg-gradient-to-r from-blue-400 via-[#00A3FF] to-blue-500 text-transparent bg-clip-text">
//                     SONIC
//                   </span>
//                 </span>
//                 <p className="text-gray-400 text-sm">
//                   Powered by Sonic Chain 146
//                 </p>
//               </div>
//             </div>

//             <div className="text-center md:text-right">
//               <p className="text-gray-400 text-sm mb-2">
//                 © 2025 Web3 Sonic. All rights reserved.
//               </p>
//               <div className="flex items-center justify-center md:justify-end space-x-4">
//                 <a
//                   href="/terms"
//                   className="text-gray-400 hover:text-white text-xs"
//                 >
//                   Terms
//                 </a>
//                 <a
//                   href="/privacy"
//                   className="text-gray-400 hover:text-white text-xs"
//                 >
//                   Privacy
//                 </a>
//                 <a
//                   onClick={() => {
//                     // if (typeof window !== 'undefined') {
//                     //   window.open("https://web3sonic.com/documentation");
//                     // }
//                   }}
//                   href="/support"
//                   className="text-gray-400 hover:text-white text-xs"
//                 >
//                   Support
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
