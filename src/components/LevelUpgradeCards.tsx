import React, { useState } from "react";
import { Card, CardContent } from "./UI/card";
import { Badge } from "./UI/badge";
import { Button } from "./UI/button";
import { Dispatch, SetStateAction } from "react";

import {
  Star,
  Shield,
  Zap,
  Target,
  User,
  Award,
  CheckSquare,
  Lightbulb,
  Cpu,
  Crown,
  BarChart,
  Users,
  Code,
  Flag,
  Gift,
} from "lucide-react";
import { useToast } from "./hooks/use-toast";
import { useAccount } from "wagmi";
import { PurchaseLevel } from "../../wagmi/method";
import { ToastContainer, toast } from "react-toastify";

interface LevelCardProps {
  level: number;
  title: string;
  sonicAmount: number;
  tag: string;
  tagStyle: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isCurrentLevel?: boolean;
  onUpgrade: (level: string, userId: string) => void;
  isProcessing?: boolean;
  levelData: any;
}

const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  sonicAmount,
  tag,
  tagStyle,
  description,
  icon,
  isActive = false,
  isCurrentLevel = false,
  isProcessing = false,
  levelData,
  onUpgrade,
}) => {

  return (
    <div
      className={`border rounded-lg p-4 ${
        isCurrentLevel
          ? "border-blue-500 shadow-md shadow-blue-500/20"
          : "border-gray-700"
      } bg-gray-800/80 relative`}
    >
      <div className="flex items-start mb-2">
        <div className="h-8 w-8 rounded-full flex items-center justify-center mr-2 bg-gray-700">
          {icon}
        </div>
        <div>
          <div className="font-medium flex items-center">{title}</div>
          <div className="text-sm text-gray-400">{sonicAmount} SONIC</div>
        </div>
      </div>
      <Badge className={`mb-1.5 ${tagStyle}`}>{tag}</Badge>

      <div className="text-xs text-gray-300 mb-3">{description}</div>
      {/* <Button
        variant={isActive ? "outline" : "default"}
        size="sm"
        className={`w-full ${
          isActive
            ? "border-blue-500 text-blue-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={isActive || isProcessing}
        onClick={() => onUpgrade(sonicAmount.toString(), level.toString())}
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
          "Upgrade"
        )}
      </Button> */}
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
                  window.location.href = `https://web3sonic.com/${title}`;
                } else {
                  onUpgrade(sonicAmount.toString(), level.toString());
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
                "Upgrade"
              )}
            </Button>
    </div>
  );
};

type Props = {
  currentLevel: number;
  updateState: boolean;
  setUpdateState: Dispatch<SetStateAction<boolean>>; // ✅ correct setter type
};

export const LevelUpgradeCards: React.FC<Props> = ({
  currentLevel,
  updateState,
  setUpdateState,
}) => {
  const { toast } = useToast();
  const [processingLevel, setProcessingLevel] = useState<number | null>(null);
  const [loadingLevel, setLoadingLevel] = useState<number | null>(null);
  const { address, isConnected } = useAccount();

  const levelData = [
    {
      level: 1,
      title: "Basic",
      sonicAmount: 10,
      tag: "Best Value",
      tagStyle: "bg-green-600 text-white",
      description: "Begin your journey with core platform access",
      icon: <Star className="h-4 w-4 text-green-400" />,
    },
    {
      level: 2,
      title: "Bronze",
      sonicAmount: 20,
      tag: "Recommended",
      tagStyle: "bg-blue-600 text-white",
      description: "Unlock more rewards and referral bonuses",
      icon: <Zap className="h-4 w-4 text-blue-400" />,
    },
    {
      level: 3,
      title: "Silver",
      sonicAmount: 40,
      tag: "Popular",
      tagStyle: "bg-purple-600 text-white",
      description: "Enhanced earning potential and benefits",
      icon: <Target className="h-4 w-4 text-purple-400" />,
    },
    {
      level: 4,
      title: "Gold",
      sonicAmount: 80,
      tag: "Advanced",
      tagStyle: "bg-pink-600 text-white",
      description: "Access to team builder tools and higher rewards",
      icon: <Users className="h-4 w-4 text-pink-400" />,
    },
    {
      level: 5,
      title: "Platinum",
      sonicAmount: 160,
      tag: "Top Tier",
      tagStyle: "bg-amber-600 text-white",
      description: "Complete starter pack with maximum benefits",
      icon: <Gift className="h-4 w-4 text-amber-400" />,
    },
    {
      level: 6,
      title: "Diamond",
      sonicAmount: 320,
      tag: "Pro",
      tagStyle: "bg-cyan-600 text-white",
      description: "Join the validator network with enhanced rewards",
      icon: <Shield className="h-4 w-4 text-cyan-400" />,
    },
    {
      level: 7,
      title: "Master",
      sonicAmount: 640,
      tag: "Advanced",
      tagStyle: "bg-purple-600 text-white",
      description: "Design and build advanced blockchain structures",
      icon: <Code className="h-4 w-4 text-purple-400" />,
    },
    {
      level: 8,
      title: "Elite",
      sonicAmount: 1280,
      tag: "Elite",
      tagStyle: "bg-red-600 text-white",
      description:
        "Pioneer exclusive features and early access benefits for users",
      icon: <Flag className="h-4 w-4 text-red-400" />,
    },
    {
      level: 9,
      title: "Legend",
      sonicAmount: 2560,
      tag: "VIP",
      tagStyle: "bg-blue-600 text-white",
      description: "Exclusive VIP benefits with maximum earning potential",
      icon: <Award className="h-4 w-4 text-blue-400" />,
    },
    {
      level: 10,
      title: "Ambassador",
      sonicAmount: 5120,
      tag: "Legendary",
      tagStyle: "bg-amber-600 text-white",
      description: "Legendary status with maximum rewards and benefits",
      icon: <Crown className="h-4 w-4 text-amber-400" />,
    },
  ];

  const renderLevels = (levels: typeof levelData) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
      {levels.map((data) => (
        <LevelCard
          key={`level-${data.level}`}
          {...data}
          isActive={currentLevel >= data.level}
          isCurrentLevel={currentLevel === data.level}
          levelData={levelData}
          onUpgrade={handleLevelUpgrade}
          isProcessing={processingLevel === data.level}
        />
      ))}
    </div>
  );
  const handleLevelUpgrade = async (amount: string, level: string) => {
    const num = Number(level);
    setLoadingLevel(num);
    try {
      setProcessingLevel(Number(level));
      if (isConnected) {
        let resp = await PurchaseLevel(amount, level);
        setUpdateState(!updateState);
        // console.log(resp);
      } else {
        // toast.error("Connect wallet to continue");
      }
      setProcessingLevel(null);
    } catch (error) {
      console.log("error while upgrading level", error);
      setProcessingLevel(null);
    }
    setLoadingLevel(null);
  };
  return (
    <>
      <Card className="bg-[#152042] border-gray-700">
        <CardContent className="p-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sonic S Level Upgrades</h2>
            <Badge className="bg-green-600">
              Recommended: Start with Levels 1–5 (310 Sonic S)
            </Badge>
          </div>

          <p className="text-gray-300 text-sm mb-5 text-center">
            Choose the membership level that fits your goals. Higher levels
            unlock more benefits and earning potential.
          </p>

          <div className="mb-6">
            <Badge className="w-full justify-center py-2 bg-green-700 hover:bg-green-700">
              Starter Levels (1–5)
            </Badge>
            {renderLevels(levelData.slice(0, 5))}
          </div>

          <div>
            <Badge className="w-full justify-center py-2 bg-purple-700 hover:bg-purple-700">
              Advanced Levels (6–10)
            </Badge>
            {renderLevels(levelData.slice(5))}
          </div>
        </CardContent>
      </Card>
      <ToastContainer
        toastStyle={{
          borderRadius: "0px", // Coins carrés
        }}
        theme="dark"
      />
    </>
  );
};

export default LevelUpgradeCards;
