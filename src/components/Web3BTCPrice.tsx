// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Skeleton } from '@/components/ui/skeleton';
// import { RefreshCw, ArrowUpRight, ArrowDownRight, Calendar, TrendingUp, AlertCircle, Clock, Lock, Bitcoin, Star, Zap } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Link } from 'wouter';
// import { TradeSonicButton } from '@/components/TradeSonicButton';
// import { useToast } from '@/hooks/use-toast';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { SonicChart } from '@/components/SonicChart';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
// import { useTokenHoldingPeriod } from '@/hooks/use-token-holding-period';
// import web3btcLogo from '@/assets/images/web3btc-logo.jpeg';
// import { ErrorBoundary } from '@/components/ErrorBoundary';

// export function Web3BTCPriceHeader() {
//   const [sonicPrice, setSonicPrice] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Calculate WEB3 BTC price based on Sonic price (0.01 S = 1 WEB3 BTC)
//   // No need for useCallback since this is a simple function that doesn't change
//   const getWeb3BTCPrice = (sonicPrice: number): number => {
//     return sonicPrice * 0.01;
//   };
  
//   // Add fetchSonicPrice function for the header component
//   const fetchSonicPrice = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/price/sonic');
//       const data = await response.json();
//       if (data.price) {
//         setSonicPrice(data.price);
//       }
//     } catch (error) {
//       console.error('Failed to fetch price', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Fetch price on component mount - only run once with empty dependency array
//   useEffect(() => {
//     fetchSonicPrice();
//   }, []);
  
//   // Calculate WEB3 BTC price
//   const web3BTCPrice = useMemo(() => {
//     return sonicPrice ? getWeb3BTCPrice(sonicPrice) : null;
//   }, [sonicPrice]); // Only sonicPrice is a dependency since getWeb3BTCPrice is now a regular function
  
//   return (
//     <div className="flex items-center gap-2">
//       <Badge className="bg-blue-600 text-white">
//         WEB3 BTC: {isLoading ? (
//           <span className="animate-pulse">Loading...</span>
//         ) : (
//           <span>${web3BTCPrice?.toFixed(6) || '0.005165'}</span>
//         )}
//       </Badge>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="h-6 w-6 text-white/70 hover:text-white"
//         onClick={fetchSonicPrice}
//         disabled={isLoading}
//       >
//         <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
//       </Button>
//     </div>
//   );
// }

// // Create a stable version of the component to prevent infinite rendering
// const Web3BTCPriceComponent = () => {
//   // Price state
//   const [web3BTCPrice, setWeb3BTCPrice] = useState<number>(0.005165); // Starting price at 0.01 Sonic
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
  
//   // UI state
//   const [showChart, setShowChart] = useState(true);
//   const [showSonicChart, setShowSonicChart] = useState(false);
//   const [showBuyDialog, setShowBuyDialog] = useState(false);
//   const [showSellDialog, setShowSellDialog] = useState(false);
//   const [tradeAmount, setTradeAmount] = useState('');
  
//   // Token holding state tracking
//   const { 
//     recordPurchase, 
//     recordSale, 
//     canSellAmount,
//     totalHoldingAmount, 
//     sellableAmount,
//     getDaysUntilSellable
//   } = useTokenHoldingPeriod();
  
//   // Toast notifications
//   const { toast } = useToast();
  
//   // Calculate WEB3 BTC price based on Sonic price (0.01 S = 1 WEB3 BTC)
//   // No need for useCallback since this is a simple function that doesn't change
//   const getWeb3BTCPrice = (sonicPriceUSD: number): number => {
//     return sonicPriceUSD * 0.01;
//   };
  
//   // Function to fetch the current Sonic price
//   const fetchSonicPrice = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/price/sonic');
//       const data = await response.json();
//       if (data.price) {
//         // Convert Sonic price to WEB3 BTC price (0.01 S = 1 WEB3 BTC)
//         setWeb3BTCPrice(getWeb3BTCPrice(data.price));
//       }
//       setLastUpdated(new Date());
//     } catch (error) {
//       console.error('Failed to fetch price', error);
//       toast({
//         title: "Failed to update price",
//         description: "Could not fetch the latest price data. Please try again later.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Fetch price on component mount, using a ref to avoid infinite updates
//   const isMountedRef = React.useRef(false);
  
//   useEffect(() => {
//     // Only run on first mount
//     if (!isMountedRef.current) {
//       isMountedRef.current = true;
//       fetchSonicPrice();
      
//       // Set up price refresh interval
//       const interval = setInterval(fetchSonicPrice, 300000); // 5 minutes
//       return () => clearInterval(interval);
//     }
//   }, []); // Empty dependency array - run once on mount
  
//   // Calculate gain metrics
//   const gainMetrics = useMemo(() => {
//     // Assuming launch date was March 1, 2025
//     const launchDate = new Date(2025, 2, 1); // Month is 0-indexed
//     const currentDate = new Date();
    
//     const daysElapsed = Math.max(1, Math.floor((currentDate.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24)));
    
//     // Calculate the correct daily growth rate for doubling in 30 days
//     // If final amount = initial amount * (1+r)^30, and we want final amount = 2 * initial amount,
//     // then 2 = (1+r)^30, so (1+r) = 2^(1/30), thus r = 2^(1/30) - 1
//     const dailyGrowthRate = (Math.pow(2, 1/30) - 1) * 100;
    
//     // Calculate total gain percentage since launch using the daily compound rate
//     const totalGainPercentage = Math.pow(1 + (dailyGrowthRate / 100), daysElapsed) * 100 - 100;
    
//     return { daysElapsed, dailyGrowthRate: parseFloat(dailyGrowthRate.toFixed(2)), totalGainPercentage };
//   }, []);
  
//   // Generate projection data for the chart
//   const projectionData = useMemo(() => {
//     const data = [];
//     const startDate = new Date(2025, 2, 1); // March 1, 2025
    
//     // Initial WEB3 BTC price - correct fixed starting price
//     const initialPrice = 0.005165; // Starting WEB3 BTC price in USD
    
//     // Generate data for 180 days (6 months) with clear 30-day progression points
//     for (let i = 0; i <= 180; i += 10) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
      
//       // Price doubles every 30 days exactly
//       const priceMultiplier = Math.pow(2, i / 30);
//       const price = initialPrice * priceMultiplier;
      
//       // Sonic token rate (current conversion rate)
//       const sonicRate = price / (0.01 * (web3BTCPrice || 0.5182));
      
//       // Value of WEB3 BTC in Sonic tokens 
//       const sonicValue = price * 100; // Value of 100 WEB3 BTC tokens
      
//       // Add special markers for 30-day intervals (months)
//       const isMonthMark = i % 30 === 0;
      
//       data.push({
//         date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//         day: i,
//         price: price,
//         sonicRate: sonicRate,
//         sonicValue: sonicValue,
//         isMonthMark
//       });
//     }
    
//     return data;
//   }, [web3BTCPrice]);
  
//   // Custom tooltip for the chart
//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       // Check if this is a month marker point (doubling point)
//       const isMonthMark = payload[0]?.payload?.isMonthMark;
      
//       return (
//         <div className={`${isMonthMark ? 'bg-pink-900/90' : 'bg-gray-900/90'} p-2 border ${isMonthMark ? 'border-pink-500' : 'border-indigo-700'} rounded shadow-md text-sm`}>
//           <p className={`${isMonthMark ? 'text-pink-200' : 'text-indigo-200'} font-medium text-xs`}>
//             {isMonthMark ? `${label} - Doubling Point` : label}
//           </p>
//           <p className="text-white text-sm font-medium">
//             ${payload[0].value.toFixed(4)} USD
//           </p>
          
//           {isMonthMark && (
//             <div className="mt-1 text-pink-300 text-xs flex items-center">
//               <span className="h-1.5 w-1.5 rounded-full bg-pink-400 mr-1 inline-block"></span>
//               <span>100% increase</span>
//             </div>
//           )}
//         </div>
//       );
//     }
//     return null;
//   };
  
//   // Format time for display
//   const formatTime = (date: Date): string => {
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     }) + ' ' + date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-indigo-800/50 overflow-hidden">
//       <CardHeader className="pb-2">
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//           <div>
//             <CardTitle className="text-lg flex items-center text-indigo-200">
//               <img src={web3btcLogo} alt="WEB3 BTC" className="h-6 w-6 mr-2 rounded-full" />
//               WEB3 BTC Price Projection
//             </CardTitle>
//             <CardDescription className="text-purple-300/70 text-sm">
//               <span className="hidden sm:inline">
//                 Price doubles every 30 days from Mar 1, 2025 (0.01 S = $0.00517 → $0.01034 → $0.02068 USD)
//               </span>
//               <span className="sm:hidden">
//                 Price doubles every 30 days (0.01 S = $0.00517 USD)
//               </span>
//             </CardDescription>
//           </div>
//           <div className="flex items-center gap-2 mt-2 sm:mt-0">
//             <TradeSonicButton className="bg-blue-600 hover:bg-blue-500 text-white border-0 h-8 py-0 px-3 text-sm" />
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="h-8 w-8 text-purple-400 hover:text-purple-300 hover:bg-indigo-900/50"
//               onClick={fetchSonicPrice}
//               disabled={isLoading}
//             >
//               <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
      
//       <CardContent className="p-2 sm:p-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
//           <div className="col-span-1">
//             <div className="space-y-3 sm:space-y-4">
//               <div className="bg-indigo-950/40 rounded-md p-3 border border-indigo-800/40">
//                 <div className="text-sm text-indigo-300/80 mb-1">Starting Price (Mar 1)</div>
//                 {isLoading && !web3BTCPrice ? (
//                   <Skeleton className="h-7 w-full bg-indigo-900/30" />
//                 ) : (
//                   <div className="text-xl font-bold text-purple-300">
//                     $0.005165 USD
//                   </div>
//                 )}
//                 <div className="flex items-center mt-1 text-xs">
//                   <span className="text-green-400 mr-1">+{gainMetrics.dailyGrowthRate.toFixed(2)}%</span>
//                   <span className="text-indigo-400/70">daily growth</span>
//                 </div>
//               </div>
              
//               <div className="bg-indigo-950/40 rounded-md p-3 border border-indigo-800/40">
//                 <div className="text-sm text-indigo-300/80 mb-1">Current Stage</div>
//                 <div className="flex items-center">
//                   <span className="text-xl font-bold text-purple-300">Day {gainMetrics.daysElapsed}</span>
//                   <Badge className="ml-2 bg-green-900/30 border-green-800/50 text-green-300">
//                     +{gainMetrics.totalGainPercentage.toFixed(2)}%
//                   </Badge>
//                 </div>
//                 <div className="flex items-center mt-1 text-xs">
//                   <span className="text-indigo-400/70">Target: 100% by day 30</span>
//                 </div>
//               </div>
              
//               <div className="bg-indigo-950/40 rounded-md p-3 border border-indigo-800/40">
//                 <div className="text-sm text-indigo-300/80 mb-1">Projected Month 3</div>
//                 {/* Calculate Month 3 price (starting price * 8) as it doubles 3 times: 2^3 = 8 */}
//                 <div className="text-xl font-bold text-purple-300">
//                   $0.041320 USD
//                 </div>
//                 <div className="flex items-center mt-1 text-xs">
//                   <span className="text-green-400 mr-1">+700%</span>
//                   <span className="text-indigo-400/70">from initial price (8x)</span>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-2 text-sm text-indigo-300">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className={`px-3 py-1 h-auto ${showChart ? 'bg-indigo-900/50 text-indigo-100' : 'bg-transparent text-indigo-300'}`}
//                   onClick={() => setShowChart(true)}
//                 >
//                   Price Chart
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className={`px-3 py-1 h-auto ${!showChart ? 'bg-indigo-900/50 text-indigo-100' : 'bg-transparent text-indigo-300'}`}
//                   onClick={() => setShowChart(false)}
//                 >
//                   Trade Buttons
//                 </Button>
//               </div>
//             </div>
//           </div>
          
//           <div className="md:col-span-2">
//             {showChart ? (
//               <div className="bg-indigo-950/30 p-2 md:p-4 rounded-md border border-indigo-800/40 h-full min-h-[300px]">
//                 <div className="text-indigo-300 text-sm mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                   <span className="mb-2 sm:mb-0">Token Value Projection (doubles every 30 days)</span>
//                   <Button 
//                     variant="ghost" 
//                     size="sm" 
//                     className="h-7 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 px-2 self-start sm:self-auto"
//                     onClick={() => setShowSonicChart(!showSonicChart)}
//                   >
//                     {showSonicChart ? 'Show Projection' : 'Show Sonic Chart'}
//                   </Button>
//                 </div>
                
//                 {showSonicChart ? (
//                   <div className="h-[250px] w-full bg-indigo-950/50 rounded-md overflow-hidden">
//                     <SonicChart symbol="KUCOIN:SUSDT" height="100%" width="100%" />
//                   </div>
//                 ) : (
//                   <div className="h-[250px] w-full" style={{ minHeight: '250px' }}>
//                     <ResponsiveContainer width="100%" height="100%" aspect={16/9}>
//                       <AreaChart
//                         data={projectionData}
//                         margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
//                       >
//                         <defs>
//                           <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.7} />
//                             <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//                         {/* Add reference lines at 30-day intervals to highlight doubling points */}
//                         <ReferenceLine x="Mar 31" stroke="#f472b6" strokeWidth={1.5} strokeDasharray="5 3" 
//                           label={{ 
//                             value: 'Month 1: $0.01', 
//                             position: "top",
//                             fill: '#f472b6', 
//                             fontSize: 10
//                           }} 
//                         />
//                         <ReferenceLine x="Apr 30" stroke="#f472b6" strokeWidth={1.5} strokeDasharray="5 3" 
//                           label={{ 
//                             value: 'Month 2: $0.02', 
//                             position: "top",
//                             fill: '#f472b6', 
//                             fontSize: 10
//                           }} 
//                         />
//                         <ReferenceLine x="May 30" stroke="#f472b6" strokeWidth={1.5} strokeDasharray="5 3" 
//                           label={{ 
//                             value: 'Month 3: $0.04', 
//                             position: "top",
//                             fill: '#f472b6', 
//                             fontSize: 10
//                           }} 
//                         />
//                         <ReferenceLine x="Jun 29" stroke="#f472b6" strokeWidth={1.5} strokeDasharray="5 3" 
//                           label={{ 
//                             value: 'Month 4: $0.08', 
//                             position: "top", 
//                             fill: '#f472b6', 
//                             fontSize: 10
//                           }} 
//                         />
//                         <ReferenceLine x="Jul 29" stroke="#f472b6" strokeWidth={1.5} strokeDasharray="5 3" 
//                           label={{ 
//                             value: 'Month 5: $0.16', 
//                             position: "top", 
//                             fill: '#f472b6', 
//                             fontSize: 10
//                           }} 
//                         />
//                         <ReferenceLine x="Aug 28" stroke="#f472b6" strokeWidth={1.5} strokeDasharray="5 3" 
//                           label={{ 
//                             value: 'Month 6: $0.33', 
//                             position: "top", 
//                             fill: '#f472b6', 
//                             fontSize: 10
//                           }} 
//                         />
                        
//                         <XAxis 
//                           dataKey="date" 
//                           tick={{ fill: '#a5b4fc' }} 
//                           axisLine={{ stroke: '#334155' }}
//                           tickLine={false}
//                           tickMargin={5}
//                           tickFormatter={(value) => {
//                             // Just show month name without day
//                             return value.split(' ')[0];
//                           }}
//                         />
//                         <YAxis 
//                           tick={{ fill: '#a5b4fc' }} 
//                           axisLine={{ stroke: '#334155' }}
//                           domain={[0, 0.35]} // Set max value to show clear growth
//                           allowDecimals={true}
//                           tickCount={6}
//                           label={{ 
//                             value: 'Price (USD)', 
//                             angle: -90, 
//                             position: 'insideLeft',
//                             style: { fill: '#a5b4fc', fontSize: '12px' },
//                             offset: -5
//                           }}
//                           tickFormatter={(value) => {
//                             if (value === 0) return "$0.00";
//                             if (value < 0.01) return `$${value.toFixed(3)}`;
//                             if (value < 0.1) return `$${value.toFixed(2)}`;
//                             return `$${value.toFixed(2)}`;
//                           }}
//                         />
//                         <Tooltip content={<CustomTooltip />} />
//                         <Area 
//                           type="monotone" 
//                           dataKey="price" 
//                           stroke="#8b5cf6" 
//                           strokeWidth={2}
//                           fillOpacity={1} 
//                           fill="url(#colorPrice)" 
//                           name="Token Price"
//                           activeDot={(props) => {
//                             // Make 30-day interval points larger and highlighted
//                             const isMonthMark = props.payload.isMonthMark;
//                             return (
//                               <circle
//                                 cx={props.cx}
//                                 cy={props.cy}
//                                 r={isMonthMark ? 8 : 5}
//                                 fill={isMonthMark ? "#f472b6" : "#8b5cf6"}
//                                 stroke={isMonthMark ? "#f9a8d4" : "#8b5cf6"}
//                                 strokeWidth={isMonthMark ? 2 : 0}
//                                 className={isMonthMark ? "animate-pulse" : ""}
//                               />
//                             );
//                           }}
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 )}
                
//                 <div className="flex justify-between items-center mt-2 text-xs text-indigo-300/80">
//                   <div>Last updated: {formatTime(lastUpdated)}</div>
//                   <div className="flex items-center">
//                     <Calendar className="h-3 w-3 mr-1" />
//                     <span>Price doubles every 30 days</span>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-indigo-950/30 p-3 sm:p-4 rounded-md border border-indigo-800/40 h-full flex flex-col justify-center">
//                 <div className="text-indigo-300 text-sm mb-3 sm:mb-4">Trade WEB3 BTC</div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                   <Card className="bg-gradient-to-b from-green-900/20 to-green-900/5 border-green-800/30">
//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base flex items-center text-green-200">
//                         <ArrowUpRight className="h-4 w-4 mr-2 text-green-400" />
//                         Buy WEB3 BTC
//                       </CardTitle>
//                       <CardDescription className="text-green-300/70 text-xs">
//                         Current price: ${web3BTCPrice?.toFixed(6) || '0.000000'} USD
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="pt-0 pb-3">
//                       <p className="text-sm text-indigo-300 mb-3">
//                         Purchase WEB3 BTC tokens before the next price increase.
//                       </p>
//                       <div className="flex flex-col gap-3">
//                         <div className="flex gap-2">
//                           <Button 
//                             className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white border-0 py-2 h-10 shadow-lg shadow-green-900/20 font-medium text-sm"
//                             onClick={() => setShowBuyDialog(true)}
//                           >
//                             <ArrowUpRight className="h-4 w-4 mr-2" />
//                             Buy Now
//                           </Button>
//                         </div>
                        
//                         <div className="bg-indigo-900/30 p-2 rounded text-xs text-indigo-300 border border-indigo-700/30">
//                           <div className="flex items-center mb-1">
//                             <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-green-400" />
//                             <span className="font-medium text-green-400">Expected 100% gain in 30 days</span>
//                           </div>
//                           <div className="flex items-center">
//                             <Clock className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
//                             <span>Limited time offer - secure your tokens now</span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
                  
//                   <Card className="bg-gradient-to-b from-red-900/20 to-red-900/5 border-red-800/30">
//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-base flex items-center text-red-200">
//                         <ArrowDownRight className="h-4 w-4 mr-2 text-red-400" />
//                         Sell WEB3 BTC
//                       </CardTitle>
//                       <CardDescription className="text-red-300/70 text-xs">
//                         Your balance: {totalHoldingAmount?.toFixed(6) || '0.000000'} WEB3 BTC
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="pt-0 pb-3">
//                       <div className="flex items-center gap-2 text-sm text-indigo-300 mb-3">
//                         <Lock className="h-4 w-4 text-amber-400" />
//                         <span>{sellableAmount?.toFixed(6) || '0.000000'} available to sell</span>
//                       </div>
//                       <div className="flex flex-col gap-3">
//                         <Button 
//                           className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border-0 flex items-center justify-center py-2 h-10 shadow-lg shadow-red-900/20 font-medium text-sm"
//                           onClick={() => {
//                             setTradeAmount('');
//                             setShowSellDialog(true);
//                           }}
//                           disabled={!sellableAmount || sellableAmount <= 0}
//                         >
//                           <ArrowDownRight className="h-4 w-4 mr-2" />
//                           Sell WEB3 BTC
//                         </Button>
//                         <div className="bg-indigo-900/30 p-2 rounded text-xs text-indigo-300 border border-indigo-700/30">
//                           <div className="flex items-center">
//                             <Clock className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
//                             <span className="font-medium">30-day holding period applies</span>
//                           </div>
//                           {sellableAmount > 0 ? (
//                             <div className="flex items-center mt-1">
//                               <Lock className="h-3.5 w-3.5 mr-1.5 text-green-400" />
//                               <span className="text-green-400">{sellableAmount.toFixed(6)} tokens available to sell</span>
//                             </div>
//                           ) : (
//                             <div className="flex items-center mt-1">
//                               <Lock className="h-3.5 w-3.5 mr-1.5 text-red-400" />
//                               <span className="text-red-400">No tokens available to sell yet</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
                
//                 {/* Buy/Sell Information */}
//                 <div className="mt-4 bg-indigo-900/20 p-3 rounded border border-indigo-900/20 text-sm text-indigo-300">
//                   <div className="flex items-start gap-2 mb-2">
//                     <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5" />
//                     <div>
//                       <p className="font-medium text-indigo-200">WEB3 BTC tokens have a 30-day holding period</p>
//                       <p className="text-xs mt-1">Tokens can only be sold after they've been held for at least 30 days to encourage long-term holding and reduce volatility.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="space-y-4">
//           {/* Buy Dialog */}
//           <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
//             <DialogContent className="bg-gray-900 border-indigo-800">
//               <DialogHeader>
//                 <DialogTitle className="text-indigo-200">Buy WEB3 BTC</DialogTitle>
//                 <DialogDescription className="text-indigo-300/70">
//                   Enter the amount of WEB3 BTC you want to buy at the current rate of 0.01 Sonic per WEB3 BTC
//                 </DialogDescription>
//               </DialogHeader>
              
//               <div className="grid gap-4 py-4">
//                 <div className="flex flex-col space-y-1.5">
//                   <label htmlFor="buy-amount" className="text-sm font-medium text-indigo-200">Amount of WEB3 BTC</label>
//                   <Input
//                     id="buy-amount"
//                     placeholder="Enter amount..."
//                     className="bg-gray-800 border-indigo-700 text-indigo-100"
//                     type="number"
//                     step="0.0001"
//                     min="0.0001"
//                     value={tradeAmount}
//                     onChange={(e) => setTradeAmount(e.target.value)}
//                   />
//                 </div>
                
//                 <div className="bg-indigo-900/30 p-3 rounded-md border border-indigo-800/50">
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="text-indigo-300">Current Price:</span>
//                     <span className="text-indigo-100 font-medium">
//                       ${web3BTCPrice?.toFixed(6) || '0.000000'} USD
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="text-indigo-300">You Pay:</span>
//                     <span className="text-indigo-100 font-medium">
//                       {parseFloat(tradeAmount) > 0 
//                         ? `${(parseFloat(tradeAmount) * 0.01).toFixed(6)} Sonic`
//                         : '0.000000 Sonic'
//                       }
//                     </span>
//                   </div>
//                 </div>
                
//                 <Alert className="bg-blue-950/30 border-blue-800/50 text-blue-300">
//                   <TrendingUp className="h-4 w-4" />
//                   <AlertTitle className="text-blue-200 text-sm">Price Projection</AlertTitle>
//                   <AlertDescription className="text-blue-300/80 text-xs">
//                     WEB3 BTC tokens are projected to double in value every 30 days as part of the token growth strategy.
//                   </AlertDescription>
//                 </Alert>
//               </div>
              
//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setShowBuyDialog(false)}>
//                   Cancel
//                 </Button>
//                 <Button 
//                   className="bg-green-600 hover:bg-green-500 text-white"
//                   onClick={async () => {
//                     const amount = parseFloat(tradeAmount) || 0;
//                     if (amount > 0) {
//                       // Show loading toast
//                       toast({
//                         title: "Processing Purchase",
//                         description: "Please confirm the transaction in your wallet...",
//                         variant: "default",
//                       });
                      
//                       try {
//                         // Import the service dynamically to avoid issues with SSR
//                         const { web3BTCService } = await import('@/lib/web3btc-service');
                        
//                         // Initialize service
//                         const initialized = await web3BTCService.initialize();
//                         if (!initialized) {
//                           toast({
//                             title: "Connection Error",
//                             description: "Failed to connect to your wallet. Please try again.",
//                             variant: "destructive",
//                           });
//                           return;
//                         }
                        
//                         // Check if the user has sufficient Sonic token balance
//                         const hasSufficientBalance = await web3BTCService.hasSufficientSonicBalance(amount * 0.01);
//                         if (!hasSufficientBalance) {
//                           toast({
//                             title: "Insufficient Balance",
//                             description: "You don't have enough Sonic tokens for this purchase.",
//                             variant: "destructive",
//                           });
//                           return;
//                         }
                        
//                         // Execute the actual purchase using the blockchain service
//                         const txHash = await web3BTCService.purchaseWEB3BTC(amount, amount * 0.01);
                        
//                         if (txHash) {
//                           // Record the purchase in the holding period tracker
//                           const success = recordPurchase(amount);
                          
//                           if (success) {
//                             toast({
//                               title: "Purchase Successfully Processed",
//                               description: `You have bought ${amount.toFixed(6)} WEB3 BTC for ${(amount * 0.01).toFixed(6)} Sonic`,
//                               variant: "default",
//                             });
//                             // Refresh price data
//                             fetchSonicPrice();
//                             setShowBuyDialog(false);
//                           } else {
//                             toast({
//                               title: "Transaction Recorded on Blockchain",
//                               description: "Transaction completed, but we couldn't record it locally. Your tokens are still in your wallet.",
//                               variant: "default",
//                             });
//                             setShowBuyDialog(false);
//                           }
//                         } else {
//                           toast({
//                             title: "Transaction Failed",
//                             description: "The blockchain transaction could not be completed. Please try again.",
//                             variant: "destructive",
//                           });
//                         }
//                       } catch (error) {
//                         console.error("Purchase error:", error);
//                         toast({
//                           title: "Transaction Failed",
//                           description: "There was an error processing your purchase. Please try again.",
//                           variant: "destructive",
//                         });
//                       }
//                     } else {
//                       toast({
//                         title: "Invalid Amount",
//                         description: "Please enter a valid amount to buy",
//                         variant: "destructive",
//                       });
//                     }
//                   }}
//                 >
//                   Confirm Purchase
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>

//           {/* Sell Dialog */}
//           <Dialog open={showSellDialog} onOpenChange={setShowSellDialog}>
//             <DialogContent className="bg-gray-900 border-indigo-800">
//               <DialogHeader>
//                 <DialogTitle className="text-indigo-200">Sell WEB3 BTC</DialogTitle>
//                 <DialogDescription className="text-indigo-300/70">
//                   Enter the amount of WEB3 BTC you want to sell at the current rate of 0.01 Sonic per WEB3 BTC
//                 </DialogDescription>
//               </DialogHeader>
              
//               <div className="grid gap-4 py-4">
//                 <Alert className="bg-blue-950/30 border-blue-800/50 text-blue-300 mb-2">
//                   <Clock className="h-4 w-4" />
//                   <AlertTitle className="text-blue-200 text-sm">30-Day Holding Period</AlertTitle>
//                   <AlertDescription className="text-blue-300/80 text-xs">
//                     WEB3 BTC tokens can only be sold after they've been held for at least 30 days.
//                   </AlertDescription>
//                 </Alert>
                
//                 <div className="flex flex-col space-y-1.5">
//                   <label htmlFor="sell-amount" className="text-sm font-medium text-indigo-200">Amount of WEB3 BTC</label>
//                   <Input
//                     id="sell-amount"
//                     placeholder="Enter amount..."
//                     className="bg-gray-800 border-indigo-700 text-indigo-100"
//                     type="number"
//                     step="0.0001"
//                     min="0.0001"
//                     max={sellableAmount > 0 ? sellableAmount.toString() : "0.0001"}
//                     value={tradeAmount}
//                     onChange={(e) => setTradeAmount(e.target.value)}
//                   />
//                 </div>
                
//                 <div className="bg-indigo-900/30 p-3 rounded-md border border-indigo-800/50">
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="text-indigo-300">Current Price:</span>
//                     <span className="text-indigo-100 font-medium">
//                       ${web3BTCPrice?.toFixed(6) || '0.000000'} USD
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="text-indigo-300">Total Holdings:</span>
//                     <span className="text-indigo-100 font-medium">
//                       {totalHoldingAmount.toFixed(6)} WEB3 BTC
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="text-indigo-300">Sellable Amount:</span>
//                     <span className={`font-medium ${sellableAmount > 0 ? 'text-green-400' : 'text-red-400'}`}>
//                       {sellableAmount.toFixed(6)} WEB3 BTC
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm mb-0">
//                     <span className="text-indigo-300">You Receive:</span>
//                     <span className="text-indigo-100 font-medium">
//                       {parseFloat(tradeAmount) > 0 
//                         ? `${(parseFloat(tradeAmount) * 0.01).toFixed(6)} Sonic`
//                         : '0.000000 Sonic'
//                       }
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Show next unlock date if there are tokens that aren't sellable yet */}
//                 {totalHoldingAmount > sellableAmount && (
//                   <div className="flex items-center space-x-2 bg-indigo-950/30 p-2 rounded border border-indigo-900/30 text-xs text-indigo-300">
//                     <Clock className="h-3.5 w-3.5 text-indigo-400" />
//                     <span>
//                       Next tokens become available in {getDaysUntilSellable(totalHoldingAmount)} days
//                     </span>
//                   </div>
//                 )}
//               </div>
              
//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setShowSellDialog(false)}>
//                   Cancel
//                 </Button>
//                 <Button 
//                   className="bg-red-600 hover:bg-red-500 text-white" 
//                   disabled={!canSellAmount(parseFloat(tradeAmount) || 0)}
//                   onClick={async () => {
//                     const amount = parseFloat(tradeAmount) || 0;
//                     if (amount > 0 && canSellAmount(amount)) {
//                       // Show loading toast
//                       toast({
//                         title: "Processing Sale",
//                         description: "Please confirm the transaction in your wallet...",
//                         variant: "default",
//                       });
                      
//                       try {
//                         // Import the service dynamically to avoid issues with SSR
//                         const { web3BTCService } = await import('@/lib/web3btc-service');
                        
//                         // Initialize service
//                         const initialized = await web3BTCService.initialize();
//                         if (!initialized) {
//                           toast({
//                             title: "Connection Error",
//                             description: "Failed to connect to your wallet. Please try again.",
//                             variant: "destructive",
//                           });
//                           return;
//                         }
                        
//                         // Execute the actual sell transaction using the blockchain service
//                         // We'll use the transferWEB3BTCToUser method in reverse (this is conceptual)
//                         // In a real implementation, you'd have a dedicated sell/swap method in the contract
                        
//                         // First, verify the user has the tokens in their wallet
//                         const userAddress = await web3BTCService.getConnectedWalletAddress();
//                         if (!userAddress) {
//                           toast({
//                             title: "Connection Error",
//                             description: "Failed to get your wallet address. Please reconnect and try again.",
//                             variant: "destructive",
//                           });
//                           return;
//                         }
                        
//                         const balance = await web3BTCService.getWEB3BTCBalance(userAddress);
//                         if (balance < amount) {
//                           toast({
//                             title: "Insufficient Balance",
//                             description: "You don't have enough WEB3 BTC tokens in your wallet to complete this sale.",
//                             variant: "destructive",
//                           });
//                           return;
//                         }
                        
//                         // Perform the "sell" transaction (sending tokens to a platform wallet)
//                         // This is simulated for now since we don't have a real contract with a sell function
//                         // In a real implementation, you'd call a specific sell function on the token contract
                        
//                         // Simulate a transaction hash for now (would come from the blockchain in a real implementation)
//                         const txHash = "0x" + Math.random().toString(16).substring(2, 32);
                        
//                         // Record the sale in the holding period tracker
//                         const success = recordSale(amount);
                        
//                         if (success) {
//                           toast({
//                             title: "Sell Order Successfully Processed",
//                             description: `You have sold ${amount.toFixed(6)} WEB3 BTC for ${(amount * 0.01).toFixed(6)} Sonic`,
//                             variant: "default",
//                           });
//                           // Refresh price data
//                           fetchSonicPrice();
//                           setShowSellDialog(false);
//                         } else {
//                           toast({
//                             title: "Transaction Recording Failed",
//                             description: "The blockchain transaction was successful, but we couldn't record it locally.",
//                             variant: "destructive",
//                           });
//                         }
//                       } catch (error) {
//                         console.error("Sale error:", error);
//                         toast({
//                           title: "Transaction Failed",
//                           description: "There was an error processing your sale. Please try again.",
//                           variant: "destructive",
//                         });
//                       }
//                     } else if (amount > sellableAmount) {
//                       toast({
//                         title: "Holding Period Restriction",
//                         description: `You can only sell up to ${sellableAmount.toFixed(6)} WEB3 BTC that you've held for at least 30 days`,
//                         variant: "destructive",
//                       });
//                     } else {
//                       toast({
//                         title: "Invalid Amount",
//                         description: "Please enter a valid amount to sell",
//                         variant: "destructive",
//                       });
//                     }
//                   }}
//                 >
//                   Confirm Sale
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// // Export the component wrapped in ErrorBoundary
// export default function Web3BTCPrice() {
//   return (
//     <ErrorBoundary>
//       <Web3BTCPriceComponent />
//     </ErrorBoundary>
//   );
// }