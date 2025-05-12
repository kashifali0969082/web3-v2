"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import React from "react";
// import { Card, CardContent } from '@/components/ui/card';
import { Card, CardContent } from "./card";
import { TrendingUp } from "lucide-react";
import { SonicLogo } from "@/components/SonicLogo";
import { useSearchParams } from "next/navigation";
import { getmembers, GetTotalIncome, getTotalTeamSize } from "../../../wagmi/method";
// import { SonicIncomeIcon } from '@/components/SonicIncomeIcon';
import { SonicIncomeIcon } from "./SonicIncomeIcon";
// import { useSonicPoints, useSonicUserIncome } from '@/hooks/use-wagmi';
// import { useSonicPrice } from '@/hooks/use-sonic-price';
import { useSonicPrice } from "../hooks/use-sonic-price";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { AdressToID, GetUplinerAdress } from "../../../wagmi/method";
import { UserRound } from "lucide-react";
interface StatBadgeProps {
  type: "earnings" | "network" | "premium";
  title: string;
  value: string | number;
  subtitle: string;
  icon?: React.ReactNode;
}

const BadgeIcon = ({ type }: { type: "earnings" | "network" | "premium" }) => {
  switch (type) {
    case "earnings":
      return (
        <div className="relative">
          {/* <SonicIncomeIcon width={24} height={24} /> */}
          <UserRound className="h-6 w-6 text-emerald-400" />
          <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
      );
    case "network":
      return (
        <div className="relative">
          <TrendingUp className="h-6 w-6 text-blue-400" />
          <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
        </div>
      );
    case "premium":
      return (
        <div className="relative">
          <SonicLogo className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </div>
      );
  }
};

export const StatBadge = ({
  type,
  title,
  value,
  subtitle,
  icon,
}: StatBadgeProps) => {
  // Get current Sonic price and USD value conversion function
  // const { getUsdValue } = useSonicPrice();
  const getBadgeStyles = () => {
    switch (type) {
      case "earnings":
        return {
          card: "bg-gradient-to-br from-green-950 to-emerald-900 border-emerald-800/70 shadow-lg shadow-green-900/30",
          badge:
            "bg-emerald-900/60 text-emerald-400 border-emerald-700/50 backdrop-blur-sm",
          text: "text-emerald-400",
          lightText: "text-emerald-300/90",
          valueText: "font-mono tracking-tight",
          icon: "bg-green-900/40 text-green-400 shadow-inner shadow-green-900/40",
          highlight:
            "bg-gradient-to-r from-green-600 via-emerald-400 to-green-600",
          glow: "after:absolute after:inset-0 after:bg-gradient-to-r after:from-emerald-600/20 after:via-transparent after:to-transparent after:rounded-lg after:blur-xl after:opacity-70",
        };
      case "network":
        return {
          card: "bg-gradient-to-br from-blue-950 to-blue-900 border-blue-800/70 shadow-lg shadow-blue-900/30",
          badge:
            "bg-blue-900/60 text-blue-400 border-blue-700/50 backdrop-blur-sm",
          text: "text-blue-400",
          lightText: "text-blue-300/90",
          valueText: "font-mono tracking-tight",
          icon: "bg-blue-900/40 text-blue-400 shadow-inner shadow-blue-900/40",
          highlight: "bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600",
          glow: "after:absolute after:inset-0 after:bg-gradient-to-r after:from-blue-600/20 after:via-transparent after:to-transparent after:rounded-lg after:blur-xl after:opacity-70",
        };
      case "premium":
        return {
          card: "bg-gradient-to-br from-amber-950 to-amber-900 border-amber-800/70 shadow-lg shadow-amber-900/30",
          badge:
            "bg-amber-900/60 text-amber-400 border-amber-700/50 backdrop-blur-sm",
          text: "text-amber-400",
          lightText: "text-amber-300/90",
          valueText: "font-mono tracking-tight",
          icon: "bg-amber-900/40 text-amber-400 shadow-inner shadow-amber-900/40",
          highlight:
            "bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600",
          glow: "after:absolute after:inset-0 after:bg-gradient-to-r after:from-amber-600/20 after:via-transparent after:to-transparent after:rounded-lg after:blur-xl after:opacity-70",
        };
    }
  };

  const styles = getBadgeStyles();

  // Format the value if it's a large number
  const formattedValue =
    typeof value === "number"
      ? value >= 1000
        ? value.toLocaleString("en-US", { maximumFractionDigits: 2 })
        : value.toString()
      : value;

  return (
    <Card
      className={`${styles.card} border overflow-hidden relative ${styles.glow}`}
    >
      <CardContent className="p-0 relative">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] rounded-lg pointer-events-none"></div>

        <div className="p-6 relative">
          {/* Top row with badge */}
          <div className="flex justify-between items-center mb-5">
            <div
              className={`p-2.5 rounded-full ${styles.icon} backdrop-blur-sm`}
            >
              {icon || <BadgeIcon type={type} />}
            </div>
            <div
              className={`px-3 py-1 text-xs font-medium rounded-full ${styles.badge} border flex items-center`}
            >
              {type === "premium" && (
                <span className="mr-1 text-yellow-300">★</span>
              )}
              {subtitle}
            </div>
          </div>

          {/* Value and title */}
          <div>
            <div
              className={`text-3xl font-extrabold mb-1 ${styles.valueText} flex items-baseline relative`}
            >
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r 
                  from-white via-white to-gray-200 
                  drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              >
                {formattedValue}
              </span>

              {/* Subtle glowing effect under the number */}
              <div
                className="absolute -bottom-1 left-0 w-full h-[2px] opacity-40 rounded-full"
                style={{
                  background:
                    type === "earnings"
                      ? "linear-gradient(90deg, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0.2) 100%)"
                      : type === "network"
                      ? "linear-gradient(90deg, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.2) 100%)"
                      : "linear-gradient(90deg, rgba(245,158,11,0.5) 0%, rgba(245,158,11,0.2) 100%)",
                }}
              ></div>
            </div>
            {/* Display USD value for earnings and network badges */}
            {(type === "earnings" || type === "network") &&
              typeof value === "number" && (
                <div className="text-sm font-medium text-white/60 mb-1">
                  {/* {getUsdValue(value).usdFormatted} USD */}
                </div>
              )}
            <div className={`text-sm font-medium ${styles.lightText}`}>
              {title}
            </div>
          </div>

          {/* Decorative element */}
          {type === "premium" && (
            <div className="absolute top-3 right-3 opacity-20 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/60 to-transparent blur-xl"></div>
            </div>
          )}
        </div>

        {/* Bottom gradient highlight */}
        <div className={`h-1.5 w-full ${styles.highlight}`}></div>
      </CardContent>
    </Card>
  );
};

interface StatsBadgesProps {
  totalIncome?: number;
  teamIncome?: number;
  sonicPoints?: number;
}

export function StatsBadges({
  totalIncome: providedTotalIncome,
  teamIncome: providedTeamIncome,
  sonicPoints: providedSonicPoints,
}: StatsBadgesProps) {
  // Get default wallet address for known test wallet
  // const walletAddress = "0xce737a1352a5fe4626929bb5747c55a02dc307b9";

  // Fetch real values from contracts using our hooks
  //   const { totalIncome: contractTotalIncome, virtualIncome } = useSonicUserIncome(walletAddress);
  //   const { points: contractSonicPoints, isLoading: isLoadingPoints } = useSonicPoints(walletAddress);

  // Fetch the current Sonic price using our price hook
  // const { getUsdValue } = useSonicPrice();

  // Use provided values (from props) if available, otherwise use contract values or reasonable fallbacks
  const totalIncome = providedTotalIncome || 5555;
  const teamIncome = providedTeamIncome || 1105;
  const sonicPoints = providedSonicPoints || 7850;
  const [TotalINC, setTotalINC] = useState<bigint>();
  const [adress, setAddress] = useState("");
  const [userId, setUserId] = useState<number>(0);
  const [teamSize, setTeamSize] = useState<number>(0);
  const { address, isConnected } = useAccount();
  const [UplinerId, setUplinerId] = useState<number>(0);

  const { data, isError, isLoading } = useBalance({
    address, // Fetch balance for connected wallet
  });
  const searchParams = useSearchParams();
  const urlAddress = searchParams.get("Address");
  const [members, setmembers] = useState<number>(0);


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
  //   setAddress(urlAddress || "");
  // }, [urlAddress]);
  useEffect(() => {
    GetTotalInc();
    userAdress();
    getSize();
  }, [adress]);
  const getSize = async () => {
    try {
      let resp = await getTotalTeamSize(adress);
      let data = await getmembers();
      setmembers(Number(data));
      setTeamSize(Number(resp))
    } catch (error) {
      console.log("error while catching", error);
    }
  };
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
  const GetTotalInc = async () => {
    try {
      const resp = await GetTotalIncome();

      setTotalINC(resp);
    } catch (error) {
      console.log("error while getting Total income", error);
    }
  };
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBadge
          type="earnings"
          title="Total Members"

          value={members}
          subtitle="Team"
        />

{/* <StatBadge
          type="earnings"
          title="Total Team"
          
          value={teamSize}
          subtitle="Team"
        /> */}

        <StatBadge
          type="premium"
          title="Wallet balance"
          value={
            data?.formatted
              ? `${Math.floor(Number(data.formatted) * 100) / 100} S`
              : "0.00 S"
          }
          subtitle="Balance"
        />

        <StatBadge
          type="network"
          title="Total Member Payouts"
          // value={sonicPoints}
          value={TotalINC ? `${(Number(TotalINC) / 1e18).toFixed(2)} S` : "0.00 S"}
          subtitle="★ Network"
        />
      </div>
    </div>
  );
}

export default StatsBadges;
