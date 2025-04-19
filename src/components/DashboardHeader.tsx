import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import { Button } from '@/components/ui/button';
import { Button } from './UI/button';
import { Badge } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
import { Skeleton } from './UI/skeleton';
// import { Skeleton } from '@/components/ui/skeleton';
import { 
  Bitcoin, 
  ArrowUpRight,
  ArrowDownRight,
  Video as VideoIcon,
  LogOut,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Rocket,
  Network,
  Check,
  AlertTriangle
} from 'lucide-react';
import { SonicLogo } from '@/components/SonicLogo';
// import { useSonicPrice } from '@/hooks/use-sonic-price';
// import { useSonicPrice } from './hooks/use-sonic-price';
// import { useWeb3 } from '@/lib/Web3Provider';
// import { Web3BTCPriceHeader } from '@/components/Web3BTCPrice'
// import { Web3BTCPriceHeader } from '@/components/Web3BTCPrice';
// import { UpgradeLevelButton } from '@/components/UpgradeLevelButton';
import { Web3BTCCalculator } from './Web3BTCCalculator';
// import { Web3BTCCalculator } from '@/components/Web3BTCCalculator';
// import { useWeb3BTCBalance } from '@/hooks/use-wagmi';
import { useAccount } from 'wagmi';
// Audio components removed

// YouTube API references removed



interface DashboardHeaderProps {
  onDisconnect: () => void;
}

export function DashboardHeader({ onDisconnect }: DashboardHeaderProps) {
  const [web3BTCPrice, setWeb3BTCPrice] = useState<number | null>(null);
  const { address } = useAccount();
//   const { isCorrectNetwork, SONIC_CHAIN_ID, isConnected, connect } = useWeb3();
  
  // Use Sonic price hook to get accurate price data
//   const { 
//     price: sonicPrice, 
//     loading: isLoading,
//     getUsdValue,
//     priceChange24h 
//   } = useSonicPrice();

  // Get WEB3 BTC token balance from the contract
//   const { 
//     formatted: tokenBalanceFormatted,
//     balance: tokenBalanceRaw,
//     isLoading: isBalanceLoading,
//     error: balanceError
//   } = useWeb3BTCBalance(address);

  // Parse the balance or use 0 as fallback
//   const tokenHoldings = useMemo(() => {
//     if (isBalanceLoading || balanceError || !tokenBalanceFormatted) return 0;
//     return parseFloat(tokenBalanceFormatted);
//   }, [tokenBalanceFormatted, isBalanceLoading, balanceError]);

//   const balanceUSD = useMemo(() => {
//     return web3BTCPrice ? tokenHoldings * web3BTCPrice : 0;
//   }, [web3BTCPrice, tokenHoldings]);

  // Calculate daily percentage gain since March 1
  // const calculateDailyGainPercentage = useCallback(() => {
  //   // Start date March 1, 2025
  //   const startDate = new Date('2025-03-01');
  //   const today = new Date();
  //   // Calculate days elapsed since March 1
  //   const daysElapsed = Math.max(0, Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    
  //   // Price doubles every 30 days, so daily growth rate is 2^(1/30) - 1
  //   const dailyGrowthRate = Math.pow(2, 1/30) - 1;
  //   // Daily gain percentage
  //   const dailyGainPercentage = dailyGrowthRate * 100;
    
  //   // Total gain percentage = (1 + daily rate)^days - 1
  //   const totalGainPercentage = (Math.pow(1 + dailyGrowthRate, daysElapsed) - 1) * 100;
    
  //   // Calculate Sonic gain % since March 1 (starting at $0.49)
  //   const sonicGainPercentage = ? (((0.49) - 1) * 100) : 0;
    
  //   return {
  //     dailyGainPercentage: dailyGainPercentage.toFixed(2),
  //     totalGainPercentage: totalGainPercentage.toFixed(2),
  //     sonicGainPercentage: sonicGainPercentage.toFixed(2),
  //     daysElapsed
  //   };
  // }, [sonicPrice]);

  // Calculate WEB3 BTC price based on Sonic price
  // 1 WEB3 BTC = 0.01 Sonic (S)
  const calculateWeb3BTCPrice = (sonicPriceUSD: number): number => {
    return sonicPriceUSD * 0.01;
  };

  // Update WEB3 BTC price whenever the Sonic price changes
  // useEffect(() => {
  //   if (sonicPrice) {
  //     setWeb3BTCPrice(calculateWeb3BTCPrice(sonicPrice));
  //   }
  // }, [sonicPrice]);

  // Get gain metrics
  // const gainMetrics = useMemo(() => calculateDailyGainPercentage(), [calculateDailyGainPercentage]);
  
  // Format price change with color and arrow
  // const renderPriceChange = () => {
  //   if (priceChange24h === null) return null;
    
  //   const isPositive = priceChange24h >= 0;
  //   const changeText = `${isPositive ? '+' : ''}${priceChange24h.toFixed(2)}%`;
  //   const textColor = isPositive ? 'text-green-400' : 'text-red-400';
  //   const bgColor = isPositive ? 'bg-green-900/20 border-green-700/30' : 'bg-red-900/20 border-red-700/30';
  //   const Icon = isPositive ? TrendingUp : TrendingDown;
    
  //   return (
  //     <Badge  className={`${bgColor} ${textColor} flex items-center`}>
  //       <Icon className="h-3 w-3 mr-1" />
  //       {changeText}
  //       <span className="ml-1 text-xs font-normal">24h</span>
  //     </Badge>
  //   );
  // };

  // Audio player component removed

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="p-4 flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 gap-3 md:gap-4">
        {/* Dashboard Icon */}
        <div className="hidden md:flex items-center mr-3">
          <BarChart3 className="h-7 w-7 text-blue-400 mr-2" />
          <Rocket className="h-5 w-5 text-purple-400 absolute ml-5 mt-4" />
        </div>
        {/* WEB3 BTC Price Section - Full width on mobile */}
        <div className="bg-gray-800 rounded-lg p-3 border border-amber-600/30 flex flex-col w-full md:w-auto">
          <div className="flex items-center">
            <div className="flex items-center">
              <Bitcoin className="h-5 w-5 mr-2 text-amber-500" />
              <span className="text-amber-300 font-semibold text-sm uppercase tracking-wider mr-2">WEB3 BTC</span>
            </div>
            <div className="flex items-center ml-auto">
              {/* <Badge  className="bg-green-900/20 border-green-700/30 text-green-400">
                +{gainMetrics.dailyGainPercentage}%
                <span className="ml-1 text-xs font-normal">daily</span>
              </Badge> */}
            </div>
          </div>
          <div className="mt-1">
            {/* <Web3BTCPriceHeader /> */}
          </div>
          <div className="mt-1 flex flex-wrap items-center text-xs gap-1">
            <span className="text-green-400">
              {/* Day {gainMetrics.daysElapsed}: <ArrowUpRight className="h-3 w-3 inline" /> +{gainMetrics.totalGainPercentage}% total */}
            </span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-purple-400">
              {/* Sonic: <ArrowUpRight className="h-3 w-3 inline" /> +{gainMetrics.sonicGainPercentage}% */}
            </span>
          </div>
        </div>

        {/* Balance Section - Full width on mobile, flex-1 on desktop */}
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 w-full md:flex-1 md:w-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-300 font-semibold text-sm mr-2">Balance:</span>
              {/* {isBalanceLoading ? ( */}
                <Skeleton className="h-6 w-24" />
              {/* ) : balanceError ? ( */}
                <span className="text-red-400 font-medium">Error loading balance</span>
              {/* ) : ( */}
                <span className="text-white font-bold">
                  {/* {tokenHoldings.toLocaleString()} */}
                </span>
              {/* )} */}
            </div>
            <Badge className="bg-gray-700 text-yellow-400 border-yellow-500/20">
              {/* ${balanceUSD.toLocaleString(undefined, {maximumFractionDigits: 2})} */}
            </Badge>
          </div>
          
          <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
            {/* Network status indicator */}
            <Badge 
            //   variant="outline" 
            //   className={`${isCorrectNetwork 
                // ? 'bg-green-900/20 border-green-700/30 text-green-400' 
                // : 'bg-red-900/20 border-red-700/30 text-red-400'} 
                // flex items-center py-1`}
            >
              {/* {isCorrectNetwork 
                ? <Check className="h-3 w-3 mr-1" />
                : <AlertTriangle className="h-3 w-3 mr-1" />
              } */}
              <Network className="h-3 w-3 mr-1" />
              {/* {isCorrectNetwork 
                ? `Sonic Network (${SONIC_CHAIN_ID})` 
                : 'Wrong Network'} */}
            </Badge>
            
            {/* Add Sonic 24h change percent */}
            {/* {priceChange24h !== null && (
              <div className="flex items-center">
                <SonicLogo width={16} height={16} className="mr-1" />
                <span className="text-blue-400 text-xs font-medium mr-1">Sonic Token:</span>
                {renderPriceChange()}
              </div>
            )} */}
          </div>
        </div>

        {/* WEB3 BTC Calculator - Full width on mobile, auto on desktop */}
        <div className="w-full md:w-auto">
          <Web3BTCCalculator />
        </div>

        {/* Action Buttons - Responsive layout */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          {/* Top row of buttons */}
          <div className="flex flex-wrap gap-2 justify-between w-full">
            {/* {isConnected ? (
              <div className="w-full">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 w-full"
                  onClick={onDisconnect}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="w-full">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-600 text-blue-300 hover:bg-blue-900 w-full"
                  onClick={() => connect()}
                >
                  <LogOut className="h-4 w-4 mr-1 transform rotate-180" />
                  Connect Wallet
                </Button>
              </div>
            )} */}
          </div>
          
          {/* Audio Player Removed */}
        </div>
      </div>
    </div>
  );
}