"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
// import { useToast } from '@//';
import axios from "axios";
import img from "../../../public/header.png";
import Image from "next/image";
import { useToast } from "@/components/hooks/use-toast";
import {
  User,
  UserCheck,
  Users,
  Award,
  Info,
  Zap,
  Crown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ArrowRightLeft,
  Trophy,
  Recycle,
  ArrowUpRight,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
// import { Button } from '@/components/ui/button';
import { Button } from "@/components/UI/button";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { Card, CardContent } from "@/components/UI/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import {
  USDCAdressToID,
  USDCgetCompletedMatrixCount,
  USDCgetCompletedMatrixDetails,
  getUserHierarchy,
  getUserLevelIncome,
  USDCUserFun,
} from "../../../wagmi/method";

// Types for matrix positions
interface MatrixPosition {
  id: number;
  membershipLevel: number; // 1-5 for membership levels
  level: 0 | 1 | 2; // 0 = You, 1 = Level 1, 2 = Level 2
  triangle?: number; // Which triangle this position belongs to (1-3 for each level)
  corner?: number; // Which corner of the triangle (1-3)
  status: "empty" | "filled" | "you";
  username?: string;
  joinDate?: string;
  walletAddress?: string;
  paymentInfo?: string; // Information about who this position pays
}

// Get colors for different membership levels
const getMembershipColor = (level: number) => {
  switch (level) {
    case 1:
      return {
        bg: "from-green-500 to-teal-500",
        border: "border-green-400",
        text: "text-green-500",
        fill: "bg-gradient-to-r from-green-500 to-teal-500 border-green-400",
      };
    case 2:
      return {
        bg: "from-blue-500 to-indigo-500",
        border: "border-blue-400",
        text: "text-blue-500",
        fill: "bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-400",
      };
    case 3:
      return {
        bg: "from-purple-500 to-fuchsia-500",
        border: "border-purple-400",
        text: "text-purple-500",
        fill: "bg-gradient-to-r from-purple-500 to-fuchsia-500 border-purple-400",
      };
    case 4:
      return {
        bg: "from-pink-500 to-rose-500",
        border: "border-pink-400",
        text: "text-pink-500",
        fill: "bg-gradient-to-r from-pink-500 to-rose-500 border-pink-400",
      };
    case 5:
      return {
        bg: "from-amber-500 to-yellow-500",
        border: "border-amber-400",
        text: "text-amber-500",
        fill: "bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-400",
      };
    default:
      return {
        bg: "from-gray-500 to-gray-600",
        border: "border-gray-400",
        text: "text-gray-500",
        fill: "bg-gradient-to-r from-gray-500 to-gray-600 border-gray-400",
      };
  }
};

// Get membership tier name
const getMembershipTierName = (level: number) => {
  switch (level) {
    case 1:
      return "Spark";
    case 2:
      return "Pulse";
    case 3:
      return "Surge";
    case 4:
      return "Velocity";
    case 5:
      return "Apex";
    default:
      return "Unknown";
  }
};

// Get payout amount in Satoshi for each membership level
const getMembershipPayout = (level: number) => {
  switch (level) {
    case 1:
      return 10000; // Bronze - 10K Satoshi
    case 2:
      return 100000; // Silver - 100K Satoshi
    case 3:
      return 500000; // Gold - 500K Satoshi
    case 4:
      return 1000000; // Platinum - 1M Satoshi
    case 5:
      return 10000000; // Diamond - 10M Satoshi
    default:
      return 0;
  }
};

// Get membership cost in Satoshi for each level
const getMembershipCost = (level: number) => {
  switch (level) {
    case 1:
      return 10000; // Bronze - 10K Satoshi
    case 2:
      return 100000; // Silver - 100K Satoshi
    case 3:
      return 500000; // Gold - 500K Satoshi
    case 4:
      return 1000000; // Platinum - 1M Satoshi
    case 5:
      return 10000000; // Diamond - 10M Satoshi
    default:
      return 0;
  }
};

// Convert Satoshi to wBTC (1 wBTC = 100,000,000 Satoshi)
const satToWBTC = (satAmount: number) => {
  return (satAmount / 100000000).toFixed(8);
};

// Convert wBTC to USD (using current price)
const wBTCtoUSD = (wbtcAmount: number) => {
  // Current price of BTC in USD (as of April 26, 2025)
  const bitcoinPriceUSD = 98250;
  return (wbtcAmount * bitcoinPriceUSD).toFixed(2);
};

// Convert Satoshi directly to USD
const satToUSD = (satAmount: number) => {
  const wbtcAmount = satAmount / 100000000;
  return wBTCtoUSD(wbtcAmount);
};

interface MatrixVisualizationProps {
  embedded?: boolean;
}

const USDCMatrixVisualize = ({ embedded = false }: MatrixVisualizationProps) => {
  const { toast } = useToast();
  const [activeMembershipLevel, setActiveMembershipLevel] = useState(1);
  const searchParams = useSearchParams();
  const urlAddress = searchParams.get("Address");
  const [adress, setAddress] = useState("");
  const [formArr, setFormArr] = useState<any>(
    []
    //   [
    //   { level1: 1, level2: [1, 2, 3] },
    //   { level1: 8, level2: [4, 5, 6] },
    //   { level1: 2, level2: [7, 0, 9] },
    // ]
  );
  const [totaluser, settotaluser] = useState(0);
  const [Earned, setEarned] = useState<number>(0);
  const [nonZeroUserCount, setnonZeroUserCount] = useState<number>(0);
  const [allFive, setallFive] = useState<any>([]);
  const [RecyclerID, setRecyclerID] = useState<number>(1);
  const [UsdtConvPrice, setUsdtConvPrice] = useState<any>();
  const [lvlnum, setlvlnum] = useState<number>(0);
  const [selected, setSelected] = useState("");
  const [selectedMat, setSelectedMat] = useState("");
  const [matrixes, setmatrixes] = useState<number>();
  const router = useRouter();
  const { address, isConnected } = useAccount();

  // const selectorFunction = (e: any) => {
  //   if (selected === "") {
  //     console.log("select level first");
  //   } else {
  //     setSelectedMat(e.target.value);
  //   }
  // };
  const usdtConversionFun = async () => {
    try {
      // Get the current BTC price in USDT
      const btcPriceRes = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USDT"
      );
      const btcPrice = btcPriceRes.data.USDT;

      // Convert Satoshis to BTC
      const satoshis =
        nonZeroUserCount * getMembershipPayout(activeMembershipLevel);
      const btc = satoshis / 100_000_000;

      // Convert BTC to USDT
      const usdt = (btc * btcPrice).toFixed(2); // Rounded to 2 decimal places for USDT
      setUsdtConvPrice(usdt);
      // return usdt;
    } catch (error) {
      console.error("Error fetching BTC price:", error);
      return null;
    }
  };
  const chunkAddresses = (arr:any, size = 3) => {
    const result = [];
    const padAddress = "0x0000000000000000000000000000000000000000";

    for (let i = 0; i < arr.length; i += size) {
      const chunk = arr.slice(i, i + size);
  
      while (chunk.length < size) {
        chunk.push(padAddress);
      }
  
      result.push(chunk);
    }
  
    console.log("datax",result);
    
    return result;
  };
  const Selectedheirarchy = async () => {
    try {
      const val = Number(selectedMat) - 1;

      let resp:any = await USDCgetCompletedMatrixDetails(
        adress,
        selected,
        val.toString()
      );
   let x=   chunkAddresses(resp?.level2)
   let trydata={
    level1:resp.level1,
    level2:x,
   }
   console.log("trydata : ",trydata);
   
      getterfunction(trydata);

      // setmatrixes(Number(resp));
      console.log("level fun", resp);

      // console.log(array);
    } catch (error) {
      console.log("error level getting maxcount", error);
    }
  };
  useEffect(() => {
    Selectedheirarchy();
  }, [selectedMat]);
  useEffect(() => {
    usdtConversionFun();
  }, [nonZeroUserCount]);
  // Example usage:
  // convertSatoshisToUSD(5000); // Example: converts 5,000 sats to USD with 2 decimals
  useEffect(() => {
      setAddress(urlAddress || "");
  }, [urlAddress,activeMembershipLevel]);
  
  useEffect(() => {
    if (adress) {
      GetALLDataOnSpecLeve();
      getactivation();
    }
  }, [adress, activeMembershipLevel]);
  useEffect(() => {
    matrixCount();
  }, [selected]);
  const getactivation = async () => {
    try {
      let resp = (await USDCUserFun(adress)) as any[];
      setlvlnum(Number(resp[3]));
      console.log("dash", resp[3]);
    } catch (error) {
      console.log("error while getting activation", error);
    }
  };
  const GetALLDataOnSpecLeve = async () => {
    try { 
      // let val = await getUserHierarchy(
      //   adress,
      //   activeMembershipLevel.toString()
      // );

      // getterfunction(val);
      let resp:any = await USDCgetCompletedMatrixDetails(
        adress,
        "1",
        "0"
      );
   let x=   chunkAddresses(resp?.level2)
   let trydata={
    level1:resp.level1,
    level2:x,
   }
   console.log("trydata : ",trydata);
   
      getterfunction(trydata);
    } catch (error) {
      console.log("error while getting datta");
    }
  };
  console.log(
    "***************************** val here is",
    activeMembershipLevel
  );
  const getterfunction = async (val: any) => {
    // console.log("level val",val);

    try {
      // const formatted = [];
      let count = 0;

      for (let i = 0; i < val.level1.length; i++) {
        if (val.level1[i] !== "0x0000000000000000000000000000000000000000") {
          count++;
        }

        for (let j = 0; j < val.level2[i].length; j++) {
          if (
            val.level2[i][j] !== "0x0000000000000000000000000000000000000000"
          ) {
            count++;
          }
        }
      }
      console.log("level count", count);

      settotaluser(count);
      // console.log("Total non-empty addresses:", count);
      // for (let i = 0; i < val.level1.length; i++) {
      //   formatted.push({
      //     level1: val.level1[i],
      //     level2: val.level2[i],
      //   });
      // }
      const formatted: { level1: number; level2: number[] }[] = [];

      for (let i = 0; i < val.level1.length; i++) {
        const level1Id = await adrToId(val.level1[i]);

        // Map each level2 address to its ID
        const level2Ids = await Promise.all(
          val.level2[i].map((addr: string) => adrToId(addr))
        );

        formatted.push({
          level1: Number(level1Id) ?? 0,
          level2: level2Ids.map((id) => id ?? 0),
        });
      }
      setEarned(formatted[0].level1);
      setFormArr(formatted);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("----------", Earned);
  const adrToId = async (value: string) => {
    try {
      let resp = await USDCAdressToID(value);
      let val = Number(resp);
      return val;
    } catch (error) {
      console.log("error while getting the id from adress", error);
    }
  };
  const matrixCount = async () => {
    try {
      let resp = await USDCgetCompletedMatrixCount(adress, selected);
      setmatrixes(Number(resp));
      console.log("resp kash", resp);

      // console.log(array);
    } catch (error) {
      console.log("error while getting maxcount", error);
    }
  };
  // Toggle between active matrix and completed matrix
  const [showCompletedMatrix, setShowCompletedMatrix] = useState(false);
  console.log("Recycler is here is ", RecyclerID);
  // Track completed cycles for each membership level
  const [completedCycles, setCompletedCycles] = useState({
    1: 0, // Bronze
    2: 0, // Silver
    3: 0, // Gold
    4: 0, // Platinum
    5: 0, // Diamond
  });
  // Generate matrix data for each membership level (1-5)
  const generateMatrixData = (
    membershipLevel: number,
    completed: boolean = false
  ): MatrixPosition[] => {
    return [
      // YOU at the top
      {
        id: 0,
        membershipLevel,
        level: 0,
        status: "you",
        username: "You",
        walletAddress: "",
      },

      // Level 1 - Only 3 positions total
      // Spots 1 & 3 pay upline (person above YOU), spot 2 pays YOU directly
      {
        id: formArr[0]?.level1,
        membershipLevel,
        level: 1,
        triangle: 1,
        corner: 1,
        status: "empty",
        paymentInfo: "Pays Upline (Person Above YOU)",
      },
      {
        id: formArr[1]?.level1,
        membershipLevel,
        level: 1,
        triangle: 2,
        corner: 1,
        status: "empty",
        paymentInfo: "Pays YOU Directly",
      },
      {
        id: formArr[2]?.level1,
        membershipLevel,
        level: 1,
        triangle: 3,
        corner: 1,
        status: "empty",
        paymentInfo: "Pays Upline (Person Above YOU)",
      },

      // Level 2 - 9 positions total (3 in each triangle)
      // On Level 2, positions 1 & 3 pay YOU directly, positions 2 pay person above, and the last payment triggers recycle

      // Triangle 1
      {
        id: formArr[0]?.level2[0],
        membershipLevel,
        level: 2,
        triangle: 1,
        corner: 1,
        status: "empty",
        paymentInfo: "Pays YOU Directly",
      },
      {
        id: formArr[0]?.level2[2],
        membershipLevel,
        level: 2,
        triangle: 1,
        corner: 2,
        status: "empty",
        paymentInfo: "Pays Person Above",
      },
      {
        id: formArr[0]?.level2[1],
        membershipLevel,
        level: 2,
        triangle: 1,
        corner: 3,
        status: "empty",
        paymentInfo: "Pays YOU Directly",
      },

      // Triangle 2
      {
        id: formArr[1]?.level2[0],
        membershipLevel,
        level: 2,
        triangle: 2,
        corner: 1,
        status: "empty",
        paymentInfo: "Pays YOU Directly",
      },
      {
        id: formArr[1]?.level2[2],
        membershipLevel,
        level: 2,
        triangle: 2,
        corner: 2,
        status: "empty",
        paymentInfo: "Pays Person Above",
      },
      {
        id: formArr[1]?.level2[1],
        membershipLevel,
        level: 2,
        triangle: 2,
        corner: 3,
        status: "empty",
        paymentInfo: "Pays YOU Directly",
      },

      // Triangle 3
      {
        id: formArr[2]?.level2[0],
        membershipLevel,
        level: 2,
        triangle: 3,
        corner: 1,
        status: "empty",
        paymentInfo: "Pays YOU Directly",
      },
      {
        id: formArr[2]?.level2[2],
        membershipLevel,
        level: 2,
        triangle: 3,
        corner: 2,
        status: "empty",
        paymentInfo: "Pays Person Above",
      },
      {
        id: formArr[2]?.level2[1],
        membershipLevel,
        level: 2,
        triangle: 3,
        corner: 3,
        status: "empty",
        paymentInfo: "Payment 9 - Triggers Recycle",
      },
    ];
  };
  console.log(
    "form arr is here",
    formArr,
    "---------",
    formArr[1]?.level1,
    formArr[0]?.level2[0],
    formArr[0]?.level2[2],
    formArr[1]?.level2[0],
    formArr[1]?.level2[2],
    formArr[2]?.level2[0],
    "this",
    formArr[2]?.level2[2]
  );
  const amountEarnedFunction = () => {
    const values = [
      formArr[1]?.level1,
      formArr[0]?.level2[0],
      formArr[0]?.level2[2],
      formArr[1]?.level2[0],
      formArr[1]?.level2[2],
      formArr[2]?.level2[0],
      formArr[2]?.level2[2],
    ];
    console.log(
      "kashif-----------------------------------",
      formArr[1]?.level1
    );

    const nonZeroCount = values.filter(
      (val) => val !== 0 && val !== undefined && val !== null
    ).length;
    setnonZeroUserCount(nonZeroCount);
  };
  console.log("Number of non-zero values:----------------", nonZeroUserCount);
  useEffect(() => {
    recyclerFunction();
    amountEarnedFunction();
  }, [formArr]);
  const testFun = () => {
    try {
      // Example usage:
      const data = formArr;
      function combineLevel2Arrays(data: any) {
        return data.flatMap((entry: any) => entry.level2);
      }

      const combined = combineLevel2Arrays(data);
      console.log("only", combined);
      function hasOnlyOneZero(arr: any) {
        const zeroCount = arr.filter((val: any) => val === 0).length;
        return zeroCount === 1;
      }
      return hasOnlyOneZero(combined);
    } catch (error) {
      console.log(error);
    }
  };
  const recyclerFunction = () => {
    let a = formArr[0]?.level2[2];
    let b = formArr[1]?.level2[2];
    let c = formArr[2]?.level2[2];
    // let a = 123;
    console.log("kashi putar a = ", a, " b = ", b, "c = ", c);
    let firstCheck = testFun();
    console.log("only first check", firstCheck);

    if (firstCheck) {
      if (
        (a === 0 && b !== 0 && c !== 0) ||
        (b === 0 && a !== 0 && c !== 0) ||
        (c === 0 && a !== 0 && b !== 0)
      ) {
        console.log("Exactly one variable is zero");

        if (a === 0) {
          console.log("a ======= is zero");
          setRecyclerID(0);
        } else if (b === 0) {
          console.log("b ======= is zero");
          setRecyclerID(0);
        } else {
          console.log("c ======= is zero");
          setRecyclerID(0);
        }
      }
    } else {
      console.log("Condition not met: either none or more than one is zero");
    }
  };
  useEffect(() => {
    const newMatrixData = generateMatrixData(1, false); // 1 is just a sample `membershipLevel`
    setMatrixData(newMatrixData);
  }, [Earned]); // Depend on `earned` state, so the effect runs when it changes
  // useEffect(()=>{
  //   testFun()
  // },[formArr])
  // Generate completed matrix data (all positions filled for showcase)
  const generateCompletedMatrix = (
    membershipLevel: number
  ): MatrixPosition[] => {
    return generateMatrixData(membershipLevel).map((pos) => ({
      ...pos,
      status: pos.status === "empty" ? "filled" : pos.status,
    }));
  };
  // Create matrix data for all 5 membership levels (active matrices)
  const allActiveMatrixData = [
    generateMatrixData(1),
    generateMatrixData(2),
    generateMatrixData(3),
    generateMatrixData(4),
    generateMatrixData(5),
  ];
  // Create completed matrix data for all 5 membership levels
  const allCompletedMatrixData = [
    generateCompletedMatrix(1),
    generateCompletedMatrix(2),
    generateCompletedMatrix(3),
    generateCompletedMatrix(4),
    generateCompletedMatrix(5),
  ];
  // Current matrix data based on selected membership level and active/completed toggle
  const [matrixData, setMatrixData] = useState<MatrixPosition[]>(
    allActiveMatrixData[activeMembershipLevel - 1]
  );
  // Update matrix data when active membership level or view mode changes
  useEffect(() => {
    const dataSource = showCompletedMatrix
      ? allCompletedMatrixData
      : allActiveMatrixData;
    setMatrixData(dataSource[activeMembershipLevel - 1]);
  }, [activeMembershipLevel, showCompletedMatrix]);
  const totalMembers = 12;
  // No auto-simulation of new members joining

  // Calculate filled positions for statistics
  const totalPositions = matrixData.length - 1; // Exclude "you" position
  const filledPositions = matrixData.filter(
    (pos) => pos.status === "filled"
  ).length;
  const percentageFilled = Math.round((totaluser / totalMembers) * 100);
  // Calculate income statistics based on filled positions
  const payoutPerPosition = getMembershipPayout(activeMembershipLevel);
  // Count positions that pay directly to YOU
  const directPayPositions = matrixData.filter(
    (pos) =>
      pos.status === "filled" &&
      // Position 2 in Level 1 pays YOU directly
      ((pos.level === 1 && pos.triangle === 2) ||
        // Positions 1 & 3 in each triangle of Level 2 pay YOU directly
        (pos.level === 2 && (pos.corner === 1 || pos.corner === 3)))
  ).length;
  const navigateMembershipLevel = (direction: "prev" | "next") => {
    if (direction === "prev" && activeMembershipLevel > 1) {
      setActiveMembershipLevel(activeMembershipLevel - 1);
    } else if (direction === "next" && activeMembershipLevel < 5) {
      setActiveMembershipLevel(activeMembershipLevel + 1);
    }
  };
  const membershipColor = getMembershipColor(activeMembershipLevel);
  console.log("level number", lvlnum);
  console.log("level selected", selected);
  console.log("level ", selectedMat);

  return (
    <div
      className={`${embedded ? "" : "min-h-screen bg-[#050810]"} text-white`}
    >
      {/* Background effects - only shown in standalone mode */}
      {!embedded && (
        <>
          <div
            className="fixed inset-0 bg-gradient-radial from-[#00a3ff]/5 via-transparent to-transparent pointer-events-none"
            style={{ top: "-20%", left: "-20%", width: "140%", height: "140%" }}
          />
          <div
            className="fixed inset-0 bg-gradient-radial from-[#9333EA]/5 via-transparent to-transparent pointer-events-none"
            style={{
              bottom: "-20%",
              right: "-20%",
              width: "140%",
              height: "140%",
            }}
          />
        </>
      )}

      {/* <Image src={img} alt="Logo"/> */}
      {/* Page content */}
      <div className={`${embedded ? "" : "container mx-auto px-4 py-12"}`}>
        {/* Only show the header in standalone mode */}
        {/* {!embedded && (
          // <div className="mb-8 text-center">
          //   <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
          //     3 x 2 Matrix Visualization
          //   </h1>
          //   <p className="text-gray-400 max-w-2xl mx-auto">
          //     Track your matrix progress as you advance through membership
          //     levels. Each membership tier has its own 3 x 2 matrix
          //     configuration with intelligent payment routing.
          //   </p>
          // </div>
        )} */}
        {/* Membership level navigation */}
        <div className="flex justify-center items-center mb-8 gap-4">
          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMembershipLevel("prev")}
            disabled={activeMembershipLevel === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button> */}

          {/* <Tabs
            defaultValue={activeMembershipLevel.toString()}
            className="w-full max-w-xl"
            onValueChange={(value: any) =>
              setActiveMembershipLevel(parseInt(value))
            }
          >
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger
                value="1"
                className={`flex flex-col ${
                  activeMembershipLevel === 1 ? "text-green-500" : ""
                }`}
              >
                <span>Bronze</span>
                <span className="text-xs opacity-75">
                  {getMembershipCost(1).toLocaleString()} SAT
                </span>
                <span className="text-[10px] opacity-75">
                  ${satToUSD(getMembershipCost(1))}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="2"
                className={`flex flex-col ${
                  activeMembershipLevel === 2 ? "text-blue-500" : ""
                }`}
              >
                <span>Silver</span>
                <span className="text-xs opacity-75">
                  {getMembershipCost(2).toLocaleString()} SAT
                </span>
                <span className="text-[10px] opacity-75">
                  ${satToUSD(getMembershipCost(2))}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="3"
                className={`flex flex-col ${
                  activeMembershipLevel === 3 ? "text-purple-500" : ""
                }`}
              >
                <span>Gold</span>
                <span className="text-xs opacity-75">
                  {getMembershipCost(3).toLocaleString()} SAT
                </span>
                <span className="text-[10px] opacity-75">
                  ${satToUSD(getMembershipCost(3))}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="4"
                className={`flex flex-col ${
                  activeMembershipLevel === 4 ? "text-pink-500" : ""
                }`}
              >
                <span>Platinum</span>
                <span className="text-xs opacity-75">
                  {getMembershipCost(4).toLocaleString()} SAT
                </span>
                <span className="text-[10px] opacity-75">
                  ${satToUSD(getMembershipCost(4))}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="5"
                className={`flex flex-col ${
                  activeMembershipLevel === 5 ? "text-amber-500" : ""
                }`}
              >
                <span>Diamond</span>
                <span className="text-xs opacity-75">
                  {getMembershipCost(5).toLocaleString()} SAT
                </span>
                <span className="text-[10px] opacity-75">
                  ${satToUSD(getMembershipCost(5))}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs> */}

          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMembershipLevel("next")}
            disabled={activeMembershipLevel === 5}
          >
            <ChevronRight className="h-4 w-4" />
          </Button> */}
        </div>
        {/* Membership level banner */}
        {/* <div
          className={`mb-8 p-4 rounded-lg bg-gradient-to-r ${membershipColor.bg} text-white`}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold">
              {getMembershipTierName(activeMembershipLevel)} Membership Matrix
            </h2>
            <h1 className="text-2xl font-bold border-[3px] rounded-full p-4">
              {lvlnum === 0 ? <>Not Activated</> : <>Activated</>}
            </h1>

            
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mt-2">
            <p className="opacity-90">
              Level {activeMembershipLevel} matrix with 12 positions (3 in Level
              1, 9 in Level 2)
            </p>
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full px-4 py-1 text-sm font-medium">
                {
                  completedCycles[
                    activeMembershipLevel as keyof typeof completedCycles
                  ]
                }{" "}
                Cycles Completed
              </div>
            </div>
            <div className="bg-white/20 rounded-full px-4 py-1 text-sm font-medium">
              Cost: {getMembershipCost(activeMembershipLevel).toLocaleString()}{" "}
              SAT
              <span className="text-xs ml-1 opacity-75">
                ({satToWBTC(getMembershipCost(activeMembershipLevel))} wBTC / $
                {satToUSD(getMembershipCost(activeMembershipLevel))} USD)
              </span>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-700/30 rounded-full px-4 py-1 text-sm text-yellow-300">
              <span className="inline-flex items-center">
                <Info className="w-4 h-4 mr-1" />
                Limited to 1 active matrix per level
              </span>
            </div>
          </div>
        </div> */}
        {/* Statistics cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Matrix Filled
                  </p>
                  <h3 className="text-2xl font-bold">{percentageFilled}%</h3>
                </div>
                <div
                  className={`p-3 rounded-full bg-opacity-10 ${membershipColor.text}`}
                >
                  <Users className={`h-6 w-6 ${membershipColor.text}`} />
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${membershipColor.bg} rounded-full`}
                  style={{ width: `${percentageFilled}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Positions Filled
                  </p>
                  <h3 className="text-2xl font-bold">
                    {totaluser} / {totalMembers}
                  </h3>
                </div>
                <div
                  className={`p-3 rounded-full bg-opacity-10 ${membershipColor.text}`}
                >
                  <UserCheck className={`h-6 w-6 ${membershipColor.text}`} />
                </div>
              </div>
              <div className="mt-4 text-gray-400 text-sm">
                <span className={membershipColor.text}>{totaluser}</span> active
                positions in your matrix
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Bitcoin Earned
                  </p>
                  <h3 className="text-2xl font-bold">
                    {nonZeroUserCount *
                      getMembershipPayout(activeMembershipLevel)}
                    <span className="text-lg"> SAT</span>
                  </h3>
                  <div className="text-xs text-blue-300 mt-1">
                    {(
                      (nonZeroUserCount *
                        getMembershipPayout(activeMembershipLevel)) /
                      100_000_000
                    ).toFixed(8)}
                    wBTC ($
                    {UsdtConvPrice} USD )
                  </div>
                </div>
                <div
                  className={`p-3 rounded-full bg-opacity-10 ${membershipColor.text}`}
                >
                  <Zap className={`h-6 w-6 ${membershipColor.text}`} />
                </div>
              </div>
              <div className="mt-4 text-gray-400 text-sm">
                <span className={membershipColor.text}>{totaluser}</span>{" "}
                positions paying {payoutPerPosition.toLocaleString()} SAT (
                {satToWBTC(payoutPerPosition)} wBTC) each
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Rewards Potential
                  </p>
                  <h3 className="text-2xl font-bold">
                    {maxPotentialEarnings.toLocaleString()}{" "}
                    <span className="text-lg">SAT</span>
                  </h3>
                  <div className="text-xs text-blue-300 mt-1">
                    {satToWBTC(maxPotentialEarnings)} wBTC ($
                    {satToUSD(maxPotentialEarnings)} USD)
                  </div>
                </div>
                <div
                  className={`p-3 rounded-full bg-opacity-10 ${membershipColor.text}`}
                >
                  <Award className={`h-6 w-6 ${membershipColor.text}`} />
                </div>
              </div>
              <div className="mt-4 text-gray-400 text-sm">
                {filledPositions < totalPositions
                  ? `${(
                      maxPotentialEarnings - totalDirectEarnings
                    ).toLocaleString()} SAT (${satToWBTC(
                      maxPotentialEarnings - totalDirectEarnings
                    )} wBTC / $${satToUSD(
                      maxPotentialEarnings - totalDirectEarnings
                    )} USD) more potential earnings`
                  : "Congratulations! Your matrix is complete."}
              </div>
            </CardContent>
          </Card>
        </div> */}
         <div
              onClick={() => {
                router.push(
                  `${window.location.origin}/dashboard?Address=${adress}`
                );
              }}
            >
              <ArrowLeft />
            </div>
        <div className="flex justify-center items-center" >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#9333EA] bg-clip-text text-transparent">
                Completed Matrix
              </h1>
        </div>
        <div className="flex justify-center items-center gap-3 p-3" >
          <select
            className=" border p-2 rounded-xs "
            aria-label="Default select example"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option className="bg-black text-white" value="" disabled>
              Select level
            </option>
            {Array.from({ length: lvlnum }, (_, i) => (
              <option className="bg-black text-white"  key={i + 1} value={i + 1}>
                Level {i + 1}
              </option>
            ))}
          </select>
          <select
            className=" border p-2 rounded-xs "
            aria-label="Default select example"
            value={selectedMat}
            // onChange={(e) => setSelectedMat(e.target.value)}
            onChange={(e) => setSelectedMat(e.target.value)}
          >
            {selected !== "" ? (
              <>
                {matrixes !== 0 ? (
                  <>
                    <option className="bg-black text-white" value="" disabled>
                      Select Matrix
                    </option>
                    {Array.from({ length: matrixes ?? 0 }, (_, i) => (
                      <option className="bg-black text-white" key={i + 1} value={i + 1}>
                        matrix {i + 1}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option>no matrix on this level</option>
                  </>
                )}
              </>
            ) : (
              <>
                <option>select level first</option>
              </>
            )}
          </select>
        </div>
        {/* Matrix visualization */}

        <div className="mb-10">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {getMembershipTierName(activeMembershipLevel)} Matrix Structure
              </h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="max-w-xs space-y-2">
                      <p>
                        Your position is at the top. The matrix has two levels:
                      </p>
                      <p>
                        <span className="font-semibold">
                          Level 1 (Loading Phase):
                        </span>{" "}
                        3 positions where spots 1 & 3 pay upline (person above
                        YOU), and spot 2 (middle) pays YOU directly.
                      </p>
                      <p>
                        <span className="font-semibold">
                          Level 2 (Payout Phase):
                        </span>{" "}
                        9 positions where positions 1 & 3 of every triangle pay
                        YOU directly (5 total), position 2 (middle) pays person
                        above, and position 12 triggers matrix recycle.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Your position at the top */}
            <div className="mb-10">
              <div className="flex justify-center mb-4">
                <YouPosition
                  position={matrixData[0]}
                  membershipLevel={activeMembershipLevel}
                />
              </div>
            </div>

            {/* Level 1 Matrix - 3 triangles */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-300 mb-6 text-center">
                {activeMembershipLevel === 1 && "Spark"}
                {activeMembershipLevel === 2 && "Pulse"}
                {activeMembershipLevel === 3 && "Surge"}
                {activeMembershipLevel === 4 && "Velocity"}
                {activeMembershipLevel === 5 && "Apex"} Level 1 Matrix
                (Loading Phase)
              </h3>
              <div className="flex justify-around items-center flex-wrap">
                {/* Loading Phase 1 */}
                <Triangle
                  direction="down"
                  positions={matrixData.filter(
                    (pos) => pos.level === 1 && pos.triangle === 1
                  )}
                  triangleNumber={1}
                  formArr={formArr}
                  level={1}
                  phaseName="Loading Phase"
                  membershipLevel={activeMembershipLevel}
                  RecyclerID={RecyclerID}
                />

                {/* Loading Phase 2 */}
                <Triangle
                  formArr={formArr}
                  direction="down"
                  positions={matrixData.filter(
                    (pos) => pos.level === 1 && pos.triangle === 2
                  )}
                  triangleNumber={2}
                  level={1}
                  phaseName="Loading Phase"
                  membershipLevel={activeMembershipLevel}
                  RecyclerID={RecyclerID}
                />

                {/* Loading Phase 3 */}
                <Triangle
                  formArr={formArr}
                  direction="down"
                  positions={matrixData.filter(
                    (pos) => pos.level === 1 && pos.triangle === 3
                  )}
                  triangleNumber={3}
                  level={1}
                  phaseName="Loading Phase"
                  membershipLevel={activeMembershipLevel}
                  RecyclerID={RecyclerID}
                />
              </div>
            </div>

            {/* Level 2 Matrix - 3 inverted triangles */}
            <div>
              <h3 className="text-lg font-medium text-gray-300 mb-6 text-center">
                {activeMembershipLevel === 1 && "Spark"}
                {activeMembershipLevel === 2 && "Pulse"}
                {activeMembershipLevel === 3 && "Surge"}
                {activeMembershipLevel === 4 && "Velocity"}
                {activeMembershipLevel === 5 && "Apex"} Level 2 Matrix
                (Payout Phase)
              </h3>
              <div className="flex justify-around items-center flex-wrap">
                {/* Payout Phase 1 */}
                <Triangle
                  formArr={formArr}
                  direction="up"
                  positions={matrixData.filter(
                    (pos) => pos.level === 2 && pos.triangle === 1
                  )}
                  triangleNumber={1}
                  level={2}
                  phaseName="Payout Phase"
                  membershipLevel={activeMembershipLevel}
                  RecyclerID={RecyclerID}
                />

                {/* Payout Phase 2 */}
                <Triangle
                  formArr={formArr}
                  direction="up"
                  positions={matrixData.filter(
                    (pos) => pos.level === 2 && pos.triangle === 2
                  )}
                  triangleNumber={2}
                  level={2}
                  phaseName="Payout Phase"
                  membershipLevel={activeMembershipLevel}
                  RecyclerID={RecyclerID}
                />

                {/* Payout Phase 3 */}
                <Triangle
                  formArr={formArr}
                  direction="up"
                  positions={matrixData.filter(
                    (pos) => pos.level === 2 && pos.triangle === 3
                  )}
                  triangleNumber={3}
                  level={2}
                  phaseName="Payout Phase"
                  membershipLevel={activeMembershipLevel}
                  RecyclerID={RecyclerID}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Matrix Cycles Card */}
        {/* <div className="mb-10">
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Matrix Cycles</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-5 w-5 text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-xs space-y-2">
                        <p>
                          A cycle is completed when all 12 positions are filled
                          and the matrix is automatically recycled.
                        </p>
                        <p>
                          You can only have one active matrix per membership
                          level. When a matrix completes, you can restart in the
                          same level or upgrade.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-lg flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-blue-400" />
                    Completed Cycles
                  </h4>
                  <div className="grid grid-cols-5 gap-2">
                    <div
                      className={`p-4 rounded-lg border ${
                        activeMembershipLevel === 1
                          ? "bg-green-900/20 border-green-700/30"
                          : "bg-gray-800/50 border-gray-700/30"
                      } text-center`}
                    >
                      <div className="text-xl font-bold">{allFive[0]}</div>
                      <div className="text-xs text-gray-400">Bronze</div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${
                        activeMembershipLevel === 2
                          ? "bg-blue-900/20 border-blue-700/30"
                          : "bg-gray-800/50 border-gray-700/30"
                      } text-center`}
                    >
                      <div className="text-xl font-bold">{allFive[1]}</div>
                      <div className="text-xs text-gray-400">Silver</div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${
                        activeMembershipLevel === 3
                          ? "bg-purple-900/20 border-purple-700/30"
                          : "bg-gray-800/50 border-gray-700/30"
                      } text-center`}
                    >
                      <div className="text-xl font-bold">{allFive[2]}</div>
                      <div className="text-xs text-gray-400">Gold</div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${
                        activeMembershipLevel === 4
                          ? "bg-pink-900/20 border-pink-700/30"
                          : "bg-gray-800/50 border-gray-700/30"
                      } text-center`}
                    >
                      <div className="text-xl font-bold">{allFive[3]}</div>
                      <div className="text-xs text-gray-400">Platinum</div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${
                        activeMembershipLevel === 5
                          ? "bg-amber-900/20 border-amber-700/30"
                          : "bg-gray-800/50 border-gray-700/30"
                      } text-center`}
                    >
                      <div className="text-xl font-bold">{allFive[4]}</div>
                      <div className="text-xs text-gray-400">Diamond</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-400" />
                    Cycle Completion Benefits
                  </h4>
                  <ul className="space-y-2 list-disc pl-5 text-gray-300">
                    <li>
                      Each completed cycle pays{" "}
                      <span className={membershipColor.text}>
                        {(payoutPerPosition * 6).toLocaleString()} SAT
                      </span>{" "}
                      (
                      <span className={membershipColor.text}>
                        {satToWBTC(payoutPerPosition * 6)} wBTC / $
                        {satToUSD(payoutPerPosition * 6)} USD
                      </span>
                      ) total
                    </li>
                    <li>Position 12 triggers automatic matrix recycling</li>
                    <li>Option to continue in same level or upgrade</li>
                    <li>Cycles build your rank in the Satoshi Matrix system</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
        {/* Payment Structure Card */}
        {/* <div className="mb-10">
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Payment Structure</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-lg">
                    Level 1 (Loading Phase)
                  </h4>
                  <ul className="space-y-2 list-disc pl-5 text-gray-300">
                    <li>Spots 1 & 3 pay upline (the person above YOU)</li>
                    <li>
                      Spot 2 (middle) pays YOU directly (
                      {payoutPerPosition.toLocaleString()} SAT /{" "}
                      {satToWBTC(payoutPerPosition)} wBTC / $
                      {satToUSD(payoutPerPosition)} USD)
                    </li>
                    <li>Must fill all 3 positions to activate Level 2</li>
                    <li>Each position pays 100% of tier value</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-lg">
                    Level 2 (Payout Phase)
                  </h4>
                  <ul className="space-y-2 list-disc pl-5 text-gray-300">
                    <li>
                      Positions 1 & 3 of every triangle pay YOU directly (5 ×{" "}
                      {payoutPerPosition.toLocaleString()} SAT /{" "}
                      {satToWBTC(payoutPerPosition)} wBTC / $
                      {satToUSD(payoutPerPosition)} USD)
                    </li>
                    <li>
                      Position 2 (middle) in each triangle pays person above
                    </li>
                    <li>Position 12 is the special recycle trigger position</li>
                    <li>
                      Each position pays 100% of tier value (
                      {payoutPerPosition.toLocaleString()} SAT /{" "}
                      {satToWBTC(payoutPerPosition)} wBTC / $
                      {satToUSD(payoutPerPosition)} USD)
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 border border-blue-400"></div>
                  <span className="text-gray-300 text-sm">
                    Pays YOU (Level 2)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 border border-emerald-400"></div>
                  <span className="text-gray-300 text-sm">
                    Pays YOU (Level 1)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 border border-orange-400"></div>
                  <span className="text-gray-300 text-sm">
                    Pays Person Above
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 border border-purple-400"></div>
                  <span className="text-gray-300 text-sm flex items-center gap-1">
                    Triggers Recycle
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700"></div>
                  <span className="text-gray-300 text-sm">Empty Position</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800/30 rounded text-blue-300 text-sm">
                <p>
                  <span className="font-semibold">How it works:</span> When your
                  matrix is complete, you recycle to a new position in the same
                  membership level or upgrade to the next level if you choose.
                  This creates multiple income streams and continued growth in
                  your network.
                </p>
              </div>
            </CardContent>
          </Card>
        </div> */}
        {/* User list */}
        {/* <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            {getMembershipTierName(activeMembershipLevel)} Matrix Members
          </h2>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-800 bg-gray-900/80">
              <div className="font-medium text-gray-400">Position</div>
              <div className="font-medium text-gray-400">Phase</div>
              <div className="font-medium text-gray-400">Username</div>
              <div className="font-medium text-gray-400">Join Date</div>
              <div className="font-medium text-gray-400">Wallet</div>
              <div className="font-medium text-gray-400">Payment Info</div>
            </div>

            <div className="divide-y divide-gray-800">
              {matrixData
                .filter((pos) => pos.status !== "empty")
                .map((position) => (
                  <div
                    key={position.id}
                    className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-800/30"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                          position.status === "you"
                            ? "bg-blue-500"
                            : `bg-gradient-to-r ${
                                getMembershipColor(activeMembershipLevel).bg
                              }`
                        }`}
                      >
                        {position.level === 0 ? "Y" : position.level}
                      </div>
                      <span>#{position.id}</span>
                    </div>
                    <div>
                      {position.level === 0
                        ? "Top"
                        : position.level === 1
                        ? `Loading Phase ${position.triangle}`
                        : `Payout Phase ${position.triangle}`}
                    </div>
                    <div className="flex items-center">
                      {position.status === "you" ? (
                        <span className="font-semibold text-blue-400">You</span>
                      ) : (
                        position.username
                      )}
                    </div>
                    <div>{position.joinDate}</div>
                    <div className="truncate text-gray-400">
                      {position.walletAddress}
                    </div>
                    <div className="text-blue-400 font-medium text-sm">
                      {position.paymentInfo || "—"}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div> */}
      </div>

      {/* Add "View Full Matrix" link when embedded */}
      {/* {embedded && (
        <div className="mt-8 mb-12 text-center">
          <a
            href="/active-matrix"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
          >
            View Full Matrix <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )} */}
    </div>
  );
};

interface YouPositionProps {
  position: MatrixPosition;
  membershipLevel: number;
}

const YouPosition: React.FC<YouPositionProps> = ({
  position,
  membershipLevel,
}) => {
  const colors = getMembershipColor(membershipLevel);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="relative w-24 h-24 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${colors.bg} rounded-full border-4 ${colors.border} flex items-center justify-center`}
            >
              <div className="flex flex-col items-center justify-center">
                <Crown className="h-8 w-8 text-white mb-1" />
                <span className="font-bold text-white">YOU</span>
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">
              Your Position ({getMembershipTierName(membershipLevel)})
            </p>
            <p className="text-sm">Joined: {position.joinDate}</p>
            <p className="text-sm truncate max-w-xs">
              Wallet: {position.walletAddress}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface TriangleProps {
  positions: MatrixPosition[];
  direction: "up" | "down";
  triangleNumber: number;
  level: number;
  phaseName: string;
  membershipLevel: number;
  RecyclerID: number;
  formArr: any;
}

const Triangle: React.FC<TriangleProps> = ({
  positions,
  direction,
  triangleNumber,
  level,
  formArr,
  phaseName,
  membershipLevel,
  RecyclerID,
}) => {
  // Make the validation check less strict - just warn but don't fail rendering
  if (
    (level === 1 && positions.length !== 1) ||
    (level === 2 && positions.length !== 3)
  ) {
    console.warn(
      `Triangle should have exactly ${
        level === 1 ? "1" : "3"
      } positions for level ${level}, but got ${positions.length}`
    );
    // Continue rendering anyway
  }

  // Sort positions by corner number
  const sortedPositions = [...positions].sort(
    (a, b) => (a.corner || 0) - (b.corner || 0)
  );

  // Set position for each corner of triangle - Level 1 has 1 position, Level 2 has 3 positions
  const getPositionStyle = (corner: number): React.CSSProperties => {
    if (level === 1) {
      // Level 1 - Position at the bottom edge of each box
      // Positions 1 & 3 (orange) on left and right edges, Position 2 (green) on bottom edge
      if (triangleNumber === 1) {
        return { bottom: "35%", left: "30%" }; // Position 1 (left side)
      } else if (triangleNumber === 2) {
        return { bottom: "35%", left: "50%", transform: "translateX(-50%)" }; // Position 2 (bottom middle)
      } else {
        return { bottom: "35%", right: "30%" }; // Position 3 (right side)
      }
    } else {
      // Level 2 - 3 positions per triangle
      if (direction === "up") {
        // Triangle pointing up
        switch (corner) {
          case 1:
            return { bottom: "0", left: "0" }; // Bottom left
          case 2:
            return { bottom: "0", right: "0" }; // Bottom right
          case 3:
            return { top: "0", left: "50%", transform: "translateX(-50%)" }; // Top center
        }
      } else {
        // Triangle pointing down (shouldn't happen but just in case)
        switch (corner) {
          case 1:
            return { top: "0", left: "0" }; // Top left
          case 2:
            return { top: "0", right: "0" }; // Top right
          case 3:
            return { bottom: "0", left: "50%", transform: "translateX(-50%)" }; // Bottom center
        }
      }
    }
    return {};
  };

  // Background colors based on membership level
  const getMembershipBgColor = () => {
    const colors = getMembershipColor(membershipLevel);
    return level === 1 ? `#101A7D` : `#0A1155`;
  };

  // Border colors based on membership level and matrix level
  const getBorderColor = () => {
    const colors = getMembershipColor(membershipLevel);
    return level === 1 ? `border-green-500/40` : `border-orange-500/40`;
  };

  return (
    <div className="mb-10 mx-4">
      <div
        className={`relative w-68 h-68  rounded-lg border backdrop-blur-sm p-4 mb-2`}
        style={{ backgroundColor: level === 1 ? "#101A7D" : "#050A32" }}
      >
        <div className="text-center mb-2">
          <span className="text-lg font-semibold text-gray-300">
            {phaseName} {triangleNumber}
          </span>
        </div>

        {/* Triangle visualization */}
        <div className="relative w-full h-52">
          {/* Triangle outline */}
          <div
            className={`absolute inset-0 border-2 border-dashed ${getBorderColor()}`}
            style={{
              clipPath:
                direction === "down"
                  ? "polygon(0% 0%, 0% 0%, 0% 0%)"
                  : "polygon(0% 0%, 0% 0%, 0% 0%)",
            }}
          />

          {/* Position nodes */}
          {sortedPositions.map((position, index) => (
            <div
              key={index}
              className="absolute"
              style={getPositionStyle(position.corner || 0)}
            >
              <PositionNode
                index={index}
                formArr={formArr}
                RecyclerID={RecyclerID}
                position={position}
                level={level}
                membershipLevel={membershipLevel}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface PositionNodeProps {
  position: MatrixPosition;
  membershipLevel: number;
  RecyclerID: number;
  level: number;
  index: number;
  formArr: any;
}

const PositionNode: React.FC<PositionNodeProps> = ({
  position,
  membershipLevel,
  RecyclerID,
  level,
  index,
  formArr,
}) => {
  const membershipColors = getMembershipColor(membershipLevel);
  const payoutAmount = getMembershipPayout(membershipLevel);
  console.log("circle", index);

  // Check if this is the recycle trigger position (position 12)
  const isRecycleTrigger = position.id === 12;

  // Get enhanced payment info with Satoshi and wBTC amounts
  const getEnhancedPaymentInfo = () => {
    if (position.status !== "filled") return position.paymentInfo;

    const satText = `${payoutAmount.toLocaleString()} SAT`;
    const wbtcText = `${satToWBTC(payoutAmount)} wBTC`;
    const usdText = `$${satToUSD(payoutAmount)} USD`;
    const payoutText = `${satText} (${wbtcText} / ${usdText})`;

    if (isRecycleTrigger) {
      return `Triggers Recycle (${payoutText})`;
    } else if (position.level === 1) {
      if (position.triangle === 2) {
        return `Pays YOU Directly (${payoutText})`;
      } else {
        return `Pays Upline (${payoutText})`;
      }
    } else {
      // Level 2
      if (position.corner === 1 || position.corner === 3) {
        return `Pays YOU Directly (${payoutText})`;
      } else if (position.corner === 2) {
        return `Pays Person Above (${payoutText})`;
      } else {
        return position.paymentInfo;
      }
    }
  };

  const getStatusColor = () => {
    if (level === 1) {
      if (position.id === 0) {
        return "bg-[#429F09]";
      } else {
        if (position.id === formArr[1]?.level1) {
          //second circle fileed color
          return "bg-[#F5BA07]";
        }
        if (position.id === formArr[0]?.level1) {
          //first circle fileed color
          return "bg-[#EB7A00]";
        }
        if (position.id === formArr[2]?.level1) {
          //third circle fileed color
          return "bg-[#EB7A00]";
        }
      }
    } else {
      if (position.id === 0) {
        return "bg-[#429F09]";
      } else {
        return "bg-[#0A61C9]";
      }
    }

    // return "bg-[#429F09] border-gray-700/50";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div
              className={`w-25 h-25 rounded-full ${getStatusColor()} border-2 flex items-center justify-center cursor-pointer shadow-lg`}
            >
              <div className="flex flex-col items-center justify-center text-white">
                {RecyclerID === 0 && position.id === 0 ? (
                  <div>
                    <Recycle />
                  </div>
                ) : (
                  <span className="font-bold">{position.id}</span>
                )}
                {position.status === "filled" && (
                  <span className="text-xs truncate w-12 text-center">
                    {position.username?.substring(0, 5)}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">Position #{position.id}</p>
            <p className="text-sm">
              {position.level === 1
                ? `Loading Phase ${position.triangle}`
                : `Payout Phase ${position.triangle}`}{" "}
              | Corner: {position.corner}
            </p>
            {position.status === "filled" && (
              <p className="text-sm font-medium text-blue-400">
                {getEnhancedPaymentInfo()}
              </p>
            )}
            {position.status === "filled" ? (
              <>
                <p className="text-sm">User: {position.username}</p>
                <p className="text-sm">Joined: {position.joinDate}</p>
                <p className="text-sm truncate max-w-xs">
                  Wallet: {position.walletAddress}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">This position is empty</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default USDCMatrixVisualize;
