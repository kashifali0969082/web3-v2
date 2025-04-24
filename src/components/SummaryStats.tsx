import React, { useState, useEffect } from "react";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";

import { Card } from "./UI/card";
import { Skeleton } from "./UI/skeleton";
import {
  UserPlus,
  Wallet,
  ArrowUpRight,
  BadgeDollarSign,
  Sparkles,
} from "lucide-react";
import { TotalTeamSize,TotalIncome,lastUserId,AdressToID,GetUplinerAdress } from "../../wagmi/method";
export function SummaryStats() {
  const [isLoading, setIsLoading] = useState(false);
  const [teamSize, setteamSize] = useState("0");
  const searchParams = useSearchParams();
  const [userTeamIncome, setUserTeamIncome] = useState<bigint>();
  const urlAddress = searchParams.get("Address");
  const [adress, setAddress] = useState("");
  const [UserIncome, setUserIncome] = useState<bigint>();
  const [lastReferralId, setLastReferralId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [UplinerId, setUplinerId] = useState<number>(0);

  useEffect(() => {
    setAddress(urlAddress || "");
  }, [urlAddress]);
  useEffect(() => {
    TeamSize();
    getUserIncome();
    getLastUser();
    userAdress();
  }, [adress]);
  const getUserIncome = async () => {
    try {
      let resp = await TotalIncome(adress);

      setUserIncome(resp[2]);
      setUserTeamIncome(resp[3]);
    } catch (error) {
      console.log("error while getting income", error);
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
  const TeamSize = async () => {
    try {
      let resp = await TotalTeamSize(adress);
      console.log("response of value is ((((((((((((", resp);

      if (typeof resp === "bigint") {
        let num = Number(resp);
        setteamSize(num.toString()); // Convert bigint to string
      } else {
        console.error("Value is not a bigint:", resp);
      }
    } catch (error) {
      console.log("error while getting team size", error);
    }
  };
  const getLastUser = async () => {
    try {
      const resp = await lastUserId();

      // Convert to number
      const numberValue: number = Number(resp);

      setLastReferralId(numberValue);
    } catch (error) {
      console.log("Error while getting last user", error);
    }
  };
  const cards = [
    {
      title: "User ID",
      value: userId,
      icon: <BadgeDollarSign className="h-4 w-4 text-blue-500 " />,

      bgColor: "bg-blue-500/10",
      iconBgColor: "bg-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      title: "User Income",
      value: UserIncome
      ? `${(Number(UserIncome) / 1e18).toFixed(2)} S` // Convert from BigInt & format to 2 decimals
      : "0.00 S",
      icon: <Wallet className="h-4 w-4 text-green-500" />,
      bgColor: "bg-green-500/10",
      iconBgColor: "bg-green-500/20",
      iconColor: "text-green-500",
    },
    {
      title: "Team Income",
      value: userTeamIncome
        ? `${(Number(userTeamIncome) / 1e18).toFixed(2)} S` // Convert from BigInt & format to 2 decimals
        : "0.00 S",
      icon: <Sparkles className="h-4 w-4 text-purple-500" />,
      bgColor: "bg-purple-500/10",
      iconBgColor: "bg-purple-500/20",
      iconColor: "text-purple-500",
    },
    {
      title: "Upliner ID",
      value:UplinerId,
      icon: <UserPlus className="h-4 w-4 text-amber-500" />,

      // increase: "+3.4% from last week",
      bgColor: "bg-amber-500/10",
      iconBgColor: "bg-amber-500/20",
      iconColor: "text-amber-500",
    },
  ];
  // const isLoading=false;
  return (
    <div style={{width:'100%'}}className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading
        ? // Show skeleton loaders while data is loading
          Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="p-6 bg-gray-800 border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </Card>
            ))
        : // Show actual cards when data is loaded
          cards.map((card, i) => (
            <Card
              key={i}
              className={`p-6 bg-gray-800 border-gray-700 ${card.bgColor}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    {card.title}
                  </h3>
                  <div className="text-2xl font-bold mb-1">{card.value}</div>
                </div>
                <div className={`p-2 rounded-full ${card.iconBgColor}`}>
                  <div className={`p-1 rounded-full ${card.iconColor}`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            </Card>
          ))}
    </div>
  );
}
