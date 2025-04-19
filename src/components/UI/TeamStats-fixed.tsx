import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle  } from './card';
import { Skeleton } from './skeleton';
import { Network, Users, TrendingUp, LineChart, Award, RefreshCcw, Clock, Share2, Sparkles, Star } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
import { Badge } from 'lucide-react';
// import { TradingViewWidget } from './TradingViewWidget';
import { useAccount } from 'wagmi';
import { 
  useUserIdByAddress, 
  useTotalTeamSize, 
  useSonicUserStats,
  useSonicUserLevel
} from '../hooks/use-wagmi';
// import { useLevelTransactions } from '../hooks/use-level-transactions';

// Define constants outside the component
const TEST_WALLET = "0xce737a1352a5fe4626929bb5747c55a02dc307b9".toLowerCase();
const TEST_WALLET_ID = 126;

// Level names
const LEVEL_NAMES = [
  'Starter', 'Connector', 'Builder', 'Developer', 'Leader',
  'Director', 'Executive', 'Ambassador', 'President', 'Global Ambassador'
];

// Level colors
const LEVEL_COLORS = [
  'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500',
  'bg-purple-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500', 'bg-gradient-to-r from-purple-600 to-blue-600'
];

// Fixed version with stable references and proper dependency management
export function TeamStats() {
  // Use a ref to track component mount state
  const isMounted = useRef(false);
  
  // Get wallet address from account
  const { address } = useAccount();
  
  // Stabilize address value with useRef to prevent it from changing on re-renders
  const addressRef = useRef<string | undefined>(address);
  
  // Only update the address ref when it actually changes to a new value
  useEffect(() => {
    if (address !== addressRef.current && address !== undefined) {
      addressRef.current = address;
    }
  }, [address]);
  
  // Stable address value for hooks
  const stableAddress = addressRef.current;
  
  // Track if this is the test wallet to use cached data
  const isTestWallet = useMemo(() => {
    return stableAddress?.toLowerCase() === TEST_WALLET;
  }, [stableAddress]);
  
  // Use static data instead of API calls
  // Static values for demo purposes
  const userIdLoading = false;
  const teamSizeLoading = false;
  const statsLoading = false;
  const levelLoading = false;
  const transactionsLoading = false;
  
  // Get level and isLevel10 flag from the hook
  const { level, isLevel10 } = useSonicUserLevel(stableAddress);
  
  // Static data
  const userId = TEST_WALLET_ID;
  const totalTeamSize = 248;
  const directDownlines = 16;
  const matrixTeamSize = 120;
  const matrixLevel = level || 3;
  
  // Mock transaction data - use correct array format with actual numbers
  const levelMembers = [34, 52, 86, 42, 34, 28, 16, 12, 8, 2];
  
  // First level is the number of direct downlines
  const level1Members = 34;
  
  const lastScanTime = Date.now();
  const refetchTransactions = useCallback(() => {
    console.log('Refetch transactions called');
  }, []);
  
  // Store static transaction data in ref
  const transactionDataRef = useRef<any>({
    levelMembers,
    lastScanTime
  });
  
  // Remove the effect that's potentially causing an infinite loop
  // We've already set the static data in the ref
  
  // Use a ref to track initial render
  const isInitialRender = useRef(true);
  
  // Track if this is the initial load
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Using separate loading states for different sections
  const summaryLoading = userIdLoading || teamSizeLoading || statsLoading || levelLoading;
  const breakdownLoading = transactionsLoading;
  
  // Initialize component once on mount
  useEffect(() => {
    // Log on initialization and mark as mounted
    if (!isMounted.current) {
      // Mark component as mounted
      isMounted.current = true;
      
      // Log only once on initial load
      if (isTestWallet) {
        console.log("Using cached level data on initial load");
      }
      
      // Set a timer to clear initialLoad flag after a short delay
      const timer = setTimeout(() => {
        // Only update state if component is still mounted
        setInitialLoad(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array for mount-only effect

  // Level icons - memoized to prevent unnecessary re-creation
  const levelIcons = useMemo(() => [
    <Star key={0} className="h-4 w-4 text-blue-500" />,
    <Users key={1} className="h-4 w-4 text-green-500" />,
    <Network key={2} className="h-4 w-4 text-yellow-500" />,
    <Share2 key={3} className="h-4 w-4 text-orange-500" />,
    <Sparkles key={4} className="h-4 w-4 text-red-500" />,
    <Star key={5} className="h-4 w-4 text-purple-500" />,
    <Users key={6} className="h-4 w-4 text-indigo-500" />,
    <Network key={7} className="h-4 w-4 text-pink-500" />,
    <Share2 key={8} className="h-4 w-4 text-teal-500" />,
    <Sparkles key={9} className="h-4 w-4 text-amber-500" />
  ], []);

  // Use static level stats - no calculation needed since we're using static data
  const levelStats = useMemo(() => {
    if (initialLoad) {
      // Return empty array if still in initial loading state
      return Array(10).fill(0);
    }
    
    console.log("Using static level stats");
    // Just return the static level data
    return levelMembers;
  }, [initialLoad, levelMembers]);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Team Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Cards - Show skeletons only when summary data is loading */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {summaryLoading ? (
            // Skeleton loaders for summary cards
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
                <Skeleton className="h-5 w-20 mx-auto mb-1" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
            ))
          ) : (
            // Actual summary cards when data is loaded
            <>
              <div className="text-center p-3 sm:p-4 bg-blue-400/10 rounded-lg">
                <div className="rounded-full bg-blue-400/20 p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-2">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">{directDownlines || 0}</div>
                <div className="text-xs sm:text-sm text-gray-400">Direct Referrals</div>
              </div>
              
              <div className="text-center p-3 sm:p-4 bg-purple-400/10 rounded-lg">
                <div className="rounded-full bg-purple-400/20 p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-2">
                  <Network className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">{totalTeamSize || matrixTeamSize || 0}</div>
                <div className="text-xs sm:text-sm text-gray-400">Total Team</div>
              </div>
              
              {/* Matrix Level Card - directly from contract */}
              <div className="text-center p-3 sm:p-4 bg-amber-400/10 rounded-lg">
                <div className="rounded-full bg-amber-400/20 p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-2">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">{matrixLevel || 0}</div>
                <div className="text-xs sm:text-sm text-gray-400">Matrix Level</div>
                {isLevel10 && (
                  <Badge  className="mt-1 sm:mt-2 mx-auto py-1 px-2 sm:py-1.5 sm:px-3 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 text-yellow-300" />
                    Ambassador
                  </Badge>
                )}
              </div>
              
              <div className="text-center p-3 sm:p-4 bg-green-400/10 rounded-lg">
                <div className="rounded-full bg-green-400/20 p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  {directDownlines > 0 ? 
                    Math.round((totalTeamSize || matrixTeamSize || 0) / directDownlines) : 
                    0}x
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Avg. Team Growth</div>
              </div>
            </>
          )}
        </div>
        
        {/* Level Breakdown */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium">Level Breakdown</h3>
            <div className="flex items-center gap-2">
              {lastScanTime > 0 && (
                <div className="flex items-center text-xs text-gray-400 gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {(() => {
                      const timeDiff = Date.now() - lastScanTime;
                      const minutesAgo = Math.floor(timeDiff / (1000 * 60));
                      
                      if (minutesAgo < 60) {
                        return `Updated ${minutesAgo} min ago`;
                      } else {
                        const hoursAgo = Math.floor(minutesAgo / 60);
                        if (hoursAgo < 24) {
                          return `Updated ${hoursAgo}h ago`;
                        } else {
                          return `Updated ${new Date(lastScanTime).toLocaleDateString()}`;
                        }
                      }
                    })()}
                  </span>
                </div>
              )}
              <button 
                onClick={() => refetchTransactions()} 
                className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                title="Refresh transaction data"
                disabled={breakdownLoading}
              >
                <RefreshCcw className={`h-3.5 w-3.5 ${breakdownLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
          
          {breakdownLoading ? (
            // Skeleton for level breakdown when transaction data is loading
            Array(10).fill(0).map((_, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-2.5 w-full rounded-full" />
              </div>
            ))
          ) : (
            // Actual level breakdown when data is loaded
            levelStats.map((count, idx) => (
              <div key={idx} className={`mb-4 ${idx === 9 ? 'p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20' : ''}`}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className={`rounded-full p-1 ${LEVEL_COLORS[idx]} ${idx === 9 ? 'bg-opacity-100' : 'bg-opacity-20'}`}>
                      {idx === 9 ? <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-300" /> : levelIcons[idx]}
                    </div>
                    <span className={`text-sm sm:text-base font-medium ${idx === 9 ? 'text-gradient bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold' : ''}`}>
                      L{idx + 1}: <span className="hidden sm:inline">{LEVEL_NAMES[idx]}</span>
                      {idx === 9 && isLevel10 && (
                        <span className="ml-1 sm:ml-2 text-xs text-yellow-300 hidden sm:inline">★ You are here</span>
                      )}
                    </span>
                  </div>
                  <span className={`text-xs sm:text-sm ${idx === 9 ? 'font-semibold text-blue-400' : ''}`}>{count} members</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 sm:h-2.5">
                  <div 
                    className={`h-2 sm:h-2.5 rounded-full ${LEVEL_COLORS[idx]} ${idx === 9 ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}`} 
                    style={{ 
                      width: `${Math.min(100, Math.max(4, count / (totalTeamSize || matrixTeamSize || 1) * 100))}%` 
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Crypto Market Overview */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-sm sm:text-md font-medium mb-2 sm:mb-3 flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Crypto Market Overview
          </h3>
          <div className="pt-2">
            {/* Direct iframe integration for Coin360 */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <iframe 
                src="https://coin360.com/widget/map" 
                frameBorder="0" 
                style={{
                  width: '100%',
                  height: typeof window !== 'undefined' && window.innerWidth < 640 ? '350px' : '550px',
                  border: 'none',
                  borderRadius: '8px'
                }}
                title="Coin360 Crypto Heat Map"
                allow="fullscreen"
              ></iframe>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}