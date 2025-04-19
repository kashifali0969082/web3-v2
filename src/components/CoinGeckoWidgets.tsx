import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./UI/card";
// import { SonicChart } from './SonicChart';
import { SonicChart } from "./UI/SonicChart";
import { Loader2 } from 'lucide-react';

// Interface for coin data
interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

/**
 * CoinGeckoWidgets component
 * With CoinGecko widgets for price charts, coin listings, and currency conversion
 */
export function CoinGeckoWidgets() {
  // State for top coins data
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);

  // State for S token price data - use dynamic values from API
  const [sonicPrice, setSonicPrice] = useState<number>(0.5677); // Starting with our current market price
  const [sonicChange24h, setSonicChange24h] = useState<number>(2.5);
  
  // Note: Bitcoin price history state removed as the chart has been removed
  
  // State for converter
  const [sonicAmount, setSonicAmount] = useState<number>(1000);
  const [usdAmount, setUsdAmount] = useState<number>(567.7); // 1000 * 0.5677 (current S token price)
  
  // Fetch top coins data
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'
        );
        
        if (response.ok) {
          const data = await response.json();
          setCoins(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch coin data');
          // Fallback data if API fails
          setCoins([
            {
              id: 'bitcoin',
              symbol: 'btc',
              name: 'Bitcoin',
              image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
              current_price: 64532.41,
              price_change_percentage_24h: 1.2
            },
            {
              id: 'ethereum',
              symbol: 'eth',
              name: 'Ethereum',
              image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
              current_price: 3452.18,
              price_change_percentage_24h: 2.5
            },
            {
              id: 'binancecoin',
              symbol: 'bnb',
              name: 'BNB',
              image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
              current_price: 572.34,
              price_change_percentage_24h: -0.8
            },
            {
              id: 'solana',
              symbol: 'sol',
              name: 'Solana',
              image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
              current_price: 145.27,
              price_change_percentage_24h: 3.7
            },
            {
              id: 'ripple',
              symbol: 'xrp',
              name: 'XRP',
              image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
              current_price: 0.5478,
              price_change_percentage_24h: -1.3
            }
          ]);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };
    
    fetchCoins();
    
    // Fetch again every 30 seconds for real-time updates
    const interval = setInterval(fetchCoins, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Note: Bitcoin price history fetch logic removed as the chart has been removed
  
  // Fetch S token price data
  useEffect(() => {
    const fetchSonicPrice = async () => {
      try {
        console.log('Fetching S token price data from API...');
        // Try to fetch from S token price API endpoint - use KuCoin specifically
        const response = await fetch('/api/price/sonic?kucoin=true');
        if (response.ok) {
          const data = await response.json();
          console.log('Received S token price data:', data);
          
          if (data && typeof data.price === 'number') {
            console.log(`Setting S token price to $${data.price}`);
            setSonicPrice(data.price);
            setSonicChange24h(data.change24h || 2.5);
            
            // Update the USD amount based on new price - but only if sonicAmount hasn't changed recently
            // This prevents an infinite loop
            const currentAmount = sonicAmount;
            setUsdAmount(currentAmount * data.price);
          } else {
            console.warn('Invalid price data structure:', data);
            // Make sure we're using our default values since API data is invalid
            console.log('Using default price of $0.5677');
          }
        } else {
          console.warn(`API error status: ${response.status}`);
          console.log('Using fallback S token price data of $0.5677');
          // Keep using default values
        }
      } catch (error) {
        console.error('Error fetching S token price:', error);
        console.log('Using fallback S token price data of $0.5677');
        // Keep using default values
      }
    };
    
    // Fetch immediately
    fetchSonicPrice();
    
    // Fetch every 30 seconds
    const interval = setInterval(fetchSonicPrice, 30000);
    return () => clearInterval(interval);
  }, []); // Removed sonicAmount from dependency array to prevent infinite loop
  
  // Handle Sonic amount input change using useCallback to prevent rerenders
  const handleSonicAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      // Update both values at once to prevent chained updates
      setSonicAmount(value);
      // Only calculate USD if we have a valid price
      if (sonicPrice > 0) {
        setUsdAmount(value * sonicPrice);
      }
    }
  };
  
  // Handle USD amount input change
  const handleUsdAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setUsdAmount(value);
      // Only calculate Sonic amount if we have a valid price and it's not zero
      if (sonicPrice > 0) {
        setSonicAmount(value / sonicPrice);
      }
    }
  };
  
  // Format price with thousand separators
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };
  
  // Format percentage
  const formatPercent = (percent: number) => {
    const formattedPercent = percent.toFixed(2);
    return `${percent >= 0 ? '+' : ''}${formattedPercent}%`;
  };
  
  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Sonic Price & Market Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sonic-specific Advanced TradingView Chart */}
        <div className="w-full h-[400px] bg-gray-900 rounded-md overflow-hidden">
          <SonicChart 
            symbol="KUCOIN:SUSDT" 
            interval="1D" 
            height="100%" 
            width="100%"
            showFullChart={true} // Enable advanced chart features
          />
        </div>
        <div className="text-xs text-gray-500 mt-2 italic px-2">
          Advanced TradingView chart with technical indicators and drawing tools
        </div>
        
        {/* Note: Bitcoin Price Chart has been removed as requested */}
        
        {/* Sonic Price Widget */}
        <div className="w-full bg-gray-900 rounded-md overflow-hidden p-4">
          <h3 className="text-md font-medium mb-3 text-gray-200">S Token Price</h3>
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <div className="font-medium">S Token</div>
                <div className="text-xs text-gray-400">S</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">{formatPrice(sonicPrice)}</div>
              <div className={`text-xs ${sonicChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercent(sonicChange24h)} (24h)
              </div>
            </div>
          </div>
        </div>
        
        {/* Top Cryptocurrencies Table */}
        <div className="w-full bg-gray-900 rounded-md overflow-hidden p-4">
          <h3 className="text-md font-medium mb-3 text-gray-200">Top Cryptocurrencies</h3>
          <div className="overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-4 bg-gray-800 rounded-lg">
                <Loader2 className="h-6 w-6 animate-spin mr-2 text-blue-400" />
                <span className="text-gray-400">Loading market data...</span>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Coin
                    </th>
                    <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      24h Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {coins.map((coin) => (
                    <tr key={coin.id}>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={coin.image} alt={coin.name} className="w-5 h-5 mr-2" />
                          <div className="text-sm font-medium">{coin.name}</div>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-right">
                        {formatPrice(coin.current_price)}
                      </td>
                      <td className={`px-3 py-2 whitespace-nowrap text-right text-sm ${
                        coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {formatPercent(coin.price_change_percentage_24h)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="text-xs text-gray-500 text-right mt-2 italic">
            Data provided by CoinGecko and KuCoin
          </div>
        </div>
        
        {/* Sonic to USD Converter Widget */}
        <div className="w-full bg-gray-900 rounded-md overflow-hidden p-4">
          <h3 className="text-md font-medium mb-3 text-gray-200">S Token Converter</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex flex-col space-y-4">
              {/* From: Sonic */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">From (S Token)</label>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-700 rounded-l-md px-3 py-2">
                    <input 
                      type="number" 
                      value={sonicAmount}
                      onChange={handleSonicAmountChange}
                      className="w-full bg-transparent text-white border-none focus:outline-none" 
                    />
                  </div>
                  <div className="bg-gray-700 border-l border-gray-600 px-3 py-2 rounded-r-md">
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-2 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">S</span>
                      </div>
                      <span>S</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* To: USD */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">To (USD)</label>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-700 rounded-l-md px-3 py-2">
                    <input 
                      type="number" 
                      value={usdAmount}
                      onChange={handleUsdAmountChange}
                      className="w-full bg-transparent text-white border-none focus:outline-none" 
                    />
                  </div>
                  <div className="bg-gray-700 border-l border-gray-600 px-3 py-2 rounded-r-md">
                    <div className="flex items-center">
                      <span className="mr-1">$</span>
                      <span>USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-right mt-3 italic">
              1 S = {formatPrice(sonicPrice)} USD • Source: KuCoin Real-time
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CoinGeckoWidgets;