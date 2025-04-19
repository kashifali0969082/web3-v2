import React, { useState, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
import { Card } from './UI/card';
// import { Skeleton } from '@/components/ui/skeleton';
import { Skeleton } from './UI/skeleton';
import { UserPlus, Wallet, ArrowUpRight, BadgeDollarSign, Sparkles } from 'lucide-react';
// import { useWeb3 } from '@/lib/Web3Provider';
// import { useSonicPoints, useSonicUserIncome } from '@/hooks/use-wagmi';

export function SummaryStats() {
//   const { address } = useWeb3();
  
  // Define local state for stats
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalReferrals: 0,
    activeStakes: 0,
    totalRewards: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);
  
  // Fetch stats on component mount
//   useEffect(() => {
//     if (address) {
//       setStatsLoading(true);
//       // Simulate fetching data
//       setTimeout(() => {
//         setStats({
//           totalEarnings: Math.floor(Math.random() * 5000) + 100,
//           totalReferrals: Math.floor(Math.random() * 50),
//           activeStakes: Math.floor(Math.random() * 10),
//           totalRewards: Math.floor(Math.random() * 2000) + 50
//         });
//         setStatsLoading(false);
//       }, 1000);
//     } else {
//       setStats({
//         totalEarnings: 0,
//         totalReferrals: 0,
//         activeStakes: 0,
//         totalRewards: 0
//       });
//       setStatsLoading(false);
//     }
//   }, [address]);
  
  const { totalEarnings, totalReferrals, activeStakes, totalRewards } = stats;
  
//   const { points, isLoading: pointsLoading } = useSonicPoints(address);
  
//   const { 
//     totalIncome, 
//     virtualIncome, 
//     isLoading: incomeLoading 
//   } = useSonicUserIncome(address);
  
  // Loading state for the entire component
//   const isLoading = statsLoading || pointsLoading || incomeLoading;

  // Cards data
  const cards = [
    {
      title: "Team Members",
      value: totalReferrals,
      increase: "+12% from last week",
      icon: <UserPlus className="h-4 w-4 text-blue-500" />,
      bgColor: "bg-blue-500/10",
      iconBgColor: "bg-blue-500/20",
      iconColor: "text-blue-500"
    },
    {
      title: "Total Income",
    //   value: totalIncome || totalEarnings,
      valuePrefix: "$",
      increase: "+5.2% from last month",
      icon: <Wallet className="h-4 w-4 text-green-500" />,
      bgColor: "bg-green-500/10",
      iconBgColor: "bg-green-500/20",
      iconColor: "text-green-500"
    },
    {
      title: "SONIC Points",
    //   value: points,
      increase: "+8.1% from yesterday",
      icon: <Sparkles className="h-4 w-4 text-purple-500" />,
      bgColor: "bg-purple-500/10",
      iconBgColor: "bg-purple-500/20",
      iconColor: "text-purple-500" 
    },
    {
      title: "Active Rewards",
      value: activeStakes,
      increase: "+3.4% from last week",
      icon: <BadgeDollarSign className="h-4 w-4 text-amber-500" />,
      bgColor: "bg-amber-500/10",
      iconBgColor: "bg-amber-500/20",
      iconColor: "text-amber-500"
    }
  ];
const isLoading=true;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (
        // Show skeleton loaders while data is loading
        Array(4).fill(0).map((_, i) => (
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
      ) : (
        // Show actual cards when data is loaded
        cards.map((card, i) => (
          <Card key={i} className={`p-6 bg-gray-800 border-gray-700 ${card.bgColor}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">{card.title}</h3>
                <div className="text-2xl font-bold mb-1">
                  {/* {card.valuePrefix}{card.value.toLocaleString()} */}
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-green-400" />
                  <span>{card.increase}</span>
                </div>
              </div>
              <div className={`p-2 rounded-full ${card.iconBgColor}`}>
                <div className={`p-1 rounded-full ${card.iconColor}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}