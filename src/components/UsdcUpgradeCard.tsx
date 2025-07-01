import React, { useState, useEffect } from "react";
// import { Card, CardContent } from '@/components/ui/card';
import { Card, CardContent } from "./UI/card";
// import { Badge } from '@/components/ui/badge';
import { Badge } from "lucide-react";
import { USDCLvl4to5UpFunction } from "../../wagmi/method";
// import { Button } from '@/components/ui/button';
import { Button } from "./UI/button";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ApproveUSDC,
  getTxn,
  USDCLvl1UpFunction,
  USDCUserFun,
} from "../../wagmi/method";
import { wbtcAdress, USDCMLMAddress } from "../../wagmi/export";
import {
  Bitcoin,
  Shield,
  BadgeDollarSign,
  Zap,
  Star,
  Award,
  CheckSquare,
  Lightbulb,
  Rocket,
  Crown,
  BarChart,
  Lock,
} from "lucide-react";
// import { useWeb3 } from '@/lib/Web3Provider';
// import { useToast } from '@/hooks/use-toast';
import { useToast } from "./hooks/use-toast";
import axios from "axios";
import { useAccount, useBalance, useDisconnect } from "wagmi";

interface WBTCLevelCardProps {
  level: number;
  title: string;
  satAmount: number;
  tag: string;
  tagStyle: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isCurrentLevel?: number;
  button: string;
  onUpgrade: () => void;
  isProcessing?: boolean;
}

const WBTCLevelCard: React.FC<WBTCLevelCardProps> = ({
  level,
  title,
  satAmount,
  tag,
  tagStyle,
  description,
  icon,
  isActive,
  isCurrentLevel,
  button,
  onUpgrade,
  isProcessing,
}) => {
  // State to store Bitcoin price
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlAddress = searchParams.get("Address");
  const [adress, setAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (urlAddress === "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9") {
      console.log(" owner ----------------- firstif");
      if (address === "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9") {
        console.log("owner ---------------- snd if");
        setAddress(urlAddress || "");
        return;
      } else {
        console.log("owner else condition");
        setAddress("");
        return;
      }
    } else {
      setAddress(urlAddress || "");
    }
  }, [urlAddress]);

  // useEffect(() => {
  //     setAddress(urlAddress || "");
  //   }, [urlAddress]);
  // Fetch the current Bitcoin price on component mount
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const WBTC = await axios.get(
          "https://min-api.cryptocompare.com/data/price?fsym=WBTC&tsyms=USD"
        );
        setBtcPrice(WBTC.data.USD);
      } catch (error) {
        console.error("Failed to fetch Bitcoin price:", error);
      }
    };

    fetchBitcoinPrice();

    // Set up polling to refresh the price every 30 seconds
    const intervalId = setInterval(fetchBitcoinPrice, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Calculate USD value
  const satToBTC = satAmount / 100000000; // 1 BTC = 100,000,000 SAT
  const usdValue = satToBTC * btcPrice;

  return (
    <div
      className={`border rounded-lg p-4 ${
        isCurrentLevel
          ? "border-amber-500 shadow-md shadow-amber-500/20"
          : "border-gray-700"
      } bg-gray-800/80 relative`}
    >
      <div className="flex items-start mb-2">
        <div className="h-8 w-8 rounded-full flex items-center justify-center mr-2 bg-gray-700">
          {icon}
        </div>
        <div>
          <div className="font-medium flex items-center">
            {title}
            <Badge className={`ml-2 ${tagStyle}`}>{tag}</Badge>
          </div>
          <div className="text-sm text-gray-400">
            {satAmount.toLocaleString()}$
          </div>
          {/* <div className="text-xs text-amber-300">
            {btcPrice ? `≈ $${usdValue.toFixed(2)} USD` : "Loading..."}
          </div> */}
        </div>
      </div>
      <div className="text-xs text-gray-300 mb-3">{description}</div>
      <Button
        variant={isActive ? "outline" : "default"}
        size="sm"
        className={`w-full ${
          isActive
            ? "border-blue-500 text-blue-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={isProcessing} // ❗️Only disable when processing
        onClick={() => {
          if (isProcessing) return;
          if (isActive) {
            router.push(
              `https://web3sonic.com/ai-agent_login`
            );
          } else {
            onUpgrade();
          }
        }}
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : isActive ? (
          <>
            <CheckSquare className="h-3.5 w-3.5 mr-1" />
            Activated
          </>
        ) : (
          <>{button}</>
        )}
      </Button>
    </div>
  );
};

export const UsdcUpgradeCard: React.FC = () => {
  const { toast } = useToast();
  //   const { address } = useWeb3();
  const [userWBTCLevel, setUserWBTCLevel] = useState<number>(0);
  const [upgradeLoading, setUpgradeLoading] = useState<boolean>(false);
  const [processingLevel, setProcessingLevel] = useState<number | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  const [adress, setAddress] = useState("");
  const [activated, setActivated] = useState<number>(0);
  const searchParams = useSearchParams();
  const urlAddress = searchParams.get("Address");
  // Handle upgrade button click for a specific level
  const handleUpgrade = async (targetLevel: number, amount: number) => {
    try {
      setProcessingLevel(targetLevel);
      if (targetLevel === 1) {
        let hash = await ApproveUSDC(USDCMLMAddress, amount.toString());
        if (hash) {
          let approved = await getTxn(hash);
          if (approved) {
            let final = await USDCLvl1UpFunction();
            setReload(!reload);
          }
        }
      } else {
        console.log("target level is ", targetLevel);
        console.log("amount is ", amount);
        let hash = await ApproveUSDC(USDCMLMAddress, amount.toString());
        if (hash) {
          let approved = await getTxn(hash);
          if (approved) {
            let final = await USDCLvl4to5UpFunction(targetLevel.toString());
            setReload(!reload);
          }
        }
      }
      setProcessingLevel(null);
    } catch (error) {
      console.log("error while upgrading user lvl", error);
      setProcessingLevel(null);
    }
  };
  useEffect(() => {
    setAddress(urlAddress || "");
  }, [urlAddress]);
  useEffect(() => {
    gettingUserVal();
  }, [adress, reload]);
  const gettingUserVal = async () => {
    try {
      let resp = (await USDCUserFun(adress)) as (string | bigint)[];
      // console.log("function is getting desired values",resp);
      setActivated(Number(resp[3]));
    } catch (error) {
      // console.log("error while getting data from contract");
    }
  };

  // Define all wBTC levels data
  // const wbtcLevelData = [
  //   {
  //     level: 1,
  //     title: "Spark",
  //     satAmount: 25,
  //     tag: "Entry",
  //     tagStyle: "bg-[#1358c1] text-white",
  //     description: "The spark that ignites your Web3 journey",
  //     icon: <BadgeDollarSign className="h-4 w-4 text-[#1358c1]" />,
  //     button: "Spark Upgrade",
  //   },
  //   {
  //     level: 2,
  //     title: "Pulse",
  //     satAmount: 250,
  //     tag: "Intermediate",
  //     tagStyle: "bg-[#1358c1] text-white",
  //     description: "Feel the pulse of real momentum",
  //     icon: <BadgeDollarSign className="h-4 w-4 text-[#1358c1]" />,
  //     button: "Pulse Upgrade",
  //   },
  //   {
  //     level: 3,
  //     title: "Surge",
  //     satAmount: 2500,
  //     tag: "Advanced",
  //     tagStyle: "bg-[#1358c1] text-white",
  //     description: "Serious financial leverage begins here",
  //     icon: <BadgeDollarSign className="h-4 w-4 text-[#1358c1]" />,
  //     button: "Surge Upgrade",
  //   },
  //   {
  //     level: 4,
  //     title: "Velocity",
  //     satAmount: 5000,
  //     tag: "Expert",
  //     tagStyle: "bg-[#1358c1] text-white",
  //     description: "Accelerating your income and scaling faster",
  //     icon: <BadgeDollarSign className="h-4 w-4 text-[#1358c1]" />,
  //     button: "Velocity Upgrade",
  //   },
  //   {
  //     level: 5,
  //     title: "Apex",
  //     satAmount: 25000,
  //     tag: "Master",
  //     tagStyle: "bg-[#1358c1] text-white",
  //     description: "Ultimate financial freedom",
  //     icon: <BadgeDollarSign className="h-4 w-4 text-[#1358c1]" />,
  //     button: "Apex Upgrade",
  //   },
  // ];

  return (
    <Card className="relative bg-[#271e0b] border-amber-900/50 overflow-hidden">
      <CardContent className="p-4 pt-4 pointer-cursor">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <BadgeDollarSign className="h-5 w-5 mr-2 text-[#1358c1]" />
            USDC Circle Matrix (3x2)
          </h2>
          <Badge className="bg-[#1358c1]">New Feature</Badge>
        </div>

        <p className="text-gray-300 text-sm mb-5 text-center">
          Upgrade your Spark capabilities with USDC-powered technology to
          enhance productivity and insights.
        </p>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 mt-4">
            {/* {wbtcLevelData.map((data) => (
              <WBTCLevelCard
                key={`wbtc-level-${data.level}`}
                {...data}
                isActive={
                  activated !== undefined &&
                  activated !== 0 &&
                  activated >= data.level
                }
                // isCurrentLevel={activated}
                onUpgrade={() => handleUpgrade(data.level, data.satAmount)}
                isProcessing={processingLevel === data.level}
              />
            ))} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsdcUpgradeCard;
