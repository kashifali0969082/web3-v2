import React, { useState, useEffect } from "react";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { Card } from "./UI/card";
import { Skeleton } from "./UI/skeleton";
import {
  UserPlus,
  Wallet,
  ArrowUpRight,
  BadgeDollarSign,
  Sparkles,
} from "lucide-react";
import {
  TotalTeamSize,
  TotalIncome,
  lastUserId,
  AdressToID,
  GetUplinerAdress,
  WbtcUserFun,
  OLDWbtcUserFun,
  USDCUserFun,
} from "../../wagmi/method";
import axios from "axios";
export function SummaryStats() {
  const [isLoading, setIsLoading] = useState(false);
  const [teamSize, setteamSize] = useState("0");
  const searchParams = useSearchParams();
  const [userTeamIncome, setUserTeamIncome] = useState<number>();
  const [userUSDCTeamIncome, setUSDCUserTeamIncome] = useState<number>();

  const urlAddress = searchParams.get("Address");
  const [adress, setAddress] = useState("");
  const [UserIncome, setUserIncome] = useState<bigint>();
  const [lastReferralId, setLastReferralId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [UplinerId, setUplinerId] = useState<number>(0);
  const [btcUsd, setbtcUsd] = useState<any>();
  const [sonicPrice, setsonicPrice] = useState("");
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
  //   setAddress(urlAddress || "");
  // }, [urlAddress]);
  useEffect(() => {
    TeamSize();
    getUserIncome();
    getUSDCUserIncome()
    getLastUser();
    userAdress();
  }, [adress]);
  useEffect(() => {
    getPrices();
  }, [UserIncome]);
  const getPrices = async () => {
    try {
      const Sonic = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=S&tsyms=USD"
      );
      // const WBTC = await axios.get(
      //   "https://min-api.cryptocompare.com/data/price?fsym=WBTC&tsyms=USD"
      // );
      // const SatPrice = await axios.get(
      //   "https://min-api.cryptocompare.com/data/price?fsym=SAT&tsyms=USD"
      // );
      // console.log("----------------wbtc", SatPrice;
      setsonicPrice(Sonic.data.USD);

      // setwbtcPrice(WBTC.data.USD);
      console.log("xxx logic", Sonic.data.USD);
    } catch (error) {
      console.log("error getting from api", error);
    }
  };
  const getUserIncome = async () => {
    try {
      let resp = await TotalIncome(adress);

      setUserIncome(resp[2]);
      let data = (await WbtcUserFun(adress)) as any;
      let olddata = (await OLDWbtcUserFun(adress)) as any;
      let val = Number(olddata[4]) + Number(data[4]);
      setUserTeamIncome(val);
    } catch (error) {
      console.log("error while getting income", error);
    }
  };
    const getUSDCUserIncome = async () => {
    try {
      let resp = await TotalIncome(adress);

      setUserIncome(resp[2]);
      let data = (await USDCUserFun(adress)) as any;
      let val =  Number(data[4]);
      setUSDCUserTeamIncome(val);
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
      // console.log("response of value is ((((((((((((", resp);

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
  useEffect(() => {
    usdtConversionFun();
  }, [userTeamIncome]);
  const usdtConversionFun = async () => {
    try {
      // Get the current BTC price in USDT
      const btcPriceRes = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USDT"
      );
      const btcPrice = btcPriceRes.data.USDT;

      // Convert Satoshis to BTC
      const satoshis: number = userTeamIncome ?? 0; // If userTeamIncome is undefined, default to 0
      const btc = satoshis / 100_000_000;

      console.log(btc); // Now it's safe to divide by 100_000_000

      // Convert BTC to USDT
      const usdt = (btc * btcPrice).toFixed(2); // Rounded to 2 decimal places for USDT
      console.log("xxx", satoshis, btc, usdt);

      setbtcUsd(usdt);
      // return usdt;
    } catch (error) {
      console.error("Error fetching BTC price:", error);
      return null;
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
      title: "Sonic Income ",
      value: UserIncome
        ? `${(Number(Number(UserIncome) / 1e18) * Number(sonicPrice)).toFixed(
            2
          )} $ || ${Number((Number(UserIncome) / 1e18).toFixed(2))} S` // Convert from BigInt & format to 2 decimals
        : "0.00 $",
      icon: <Wallet className="h-4 w-4 text-green-500" />,
      bgColor: "bg-green-500/10",
      iconBgColor: "bg-green-500/20",
      iconColor: "text-green-500",
    },
    {
      title: "Bitcoin Income",
      value: btcUsd
        ? `${Number(btcUsd)} $ || ${userTeamIncome ?? 0} SAT` // Convert from BigInt & format to 2 decimals
        : "0 $",
      icon: <Sparkles className="h-4 w-4 text-purple-500" />,
      bgColor: "bg-purple-500/10",
      iconBgColor: "bg-purple-500/20",
      iconColor: "text-purple-500",
    },
    {
      title: "Usdc Income",
      value: userUSDCTeamIncome? `${userUSDCTeamIncome} $` // Convert from BigInt & format to 2 decimals
        : "0 $",
      icon: <UserPlus className="h-4 w-4 text-amber-500" />,

      // increase: "+3.4% from last week",
      bgColor: "bg-amber-500/10",
      iconBgColor: "bg-amber-500/20",
      iconColor: "text-amber-500",
    },
  ];
  // const isLoading=false;
  return (
    <div
      style={{ width: "100%" }}
      className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
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
              {card.title === "User ID" ? (
                <div>
                  <div className="flex justify-between items-start">
                    <div style={{width:"80%"}} >
                      <div className="flex justify-between items-center" >
                        <h3 className="text-sm font-medium text-gray-400 mb-1">
                          {card.title}
                        </h3>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">
                          Upline Id
                        </h3>
                      </div>
                      <br />
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold mb-1">
                          {card.value}
                        </div>
                        <div className="text-2xl font-bold mb-1">
                          {UplinerId}
                        </div>
                      </div>
                    </div>
                    <div className={`p-2 rounded-full ${card.iconBgColor}`}>
                      <div className={`p-1 rounded-full ${card.iconColor}`}>
                        {card.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      {card.title}
                    </h3>
                    <br />
                    <div className="text-2xl font-bold mb-1">{card.value}</div>
                  </div>
                  <div className={`p-2 rounded-full ${card.iconBgColor}`}>
                    <div className={`p-1 rounded-full ${card.iconColor}`}>
                      {card.icon}
                    </div>
                  </div>
                </div>
              )}
              {/* <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    {card.title}
                  </h3>
                  <br />
                  <div className="text-2xl font-bold mb-1">{card.value}</div>
                </div>
                <div className={`p-2 rounded-full ${card.iconBgColor}`}>
                  <div className={`p-1 rounded-full ${card.iconColor}`}>
                    {card.icon}
                  </div>
                </div>
              </div> */}
            </Card>
          ))}
    </div>
  );
}
