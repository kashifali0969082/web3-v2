import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { apiRequest, getQueryFn } from '../lib/queryCLient';

interface PriceResponse {
  price: number;
  symbol: string;
  source: string;
  warning?: string;
  lastUpdated?: string;
  change24h?: number;
  approximated?: boolean;
}

/**
 * Custom hook to fetch and use the wBTC token price
 * Provides both the raw price and formatted values
 */
export function useWbtcPrice() {
  const [formattedPrice, setFormattedPrice] = useState<string>('$0.00');
  const [priceLoading, setPriceLoading] = useState<boolean>(true);
  const [priceChange24h, setPriceChange24h] = useState<number | null>(null);
  
  // Fetch price from the server API endpoint
  const { data, isLoading, error, refetch } = useQuery<PriceResponse>({
    queryKey: ['/api/price/wbtc'],
    // queryFn: getQueryFn({ on401: "returnNull" }),
    refetchInterval: 30000, // Refetch price every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
    retry: 3,
  });
  
  useEffect(() => {
    if (data?.price) {
      // Format price with 0 decimal places for BTC (since it's a large number)
      setFormattedPrice(`$${data.price.toLocaleString()}`);
    }
    setPriceLoading(isLoading);
    
    // Extract 24h price change from the response
    if (data?.change24h !== undefined) {
      setPriceChange24h(data.change24h);
    }
  }, [data, isLoading]);
  
  // Function to convert BTC amount to USD value
  const getUsdValue = (btcAmount: number | string): {
    usdValue: number;
    usdFormatted: string;
  } => {
    try {
      // Handle different input types
      const numericAmount = typeof btcAmount === 'string' 
        ? parseFloat(btcAmount) 
        : btcAmount;
      
      // Calculate USD value using current price
      const usdValue = numericAmount * (data?.price || 0);
      
      // Format USD value based on its magnitude
      let usdFormatted: string;
      
      if (usdValue >= 1000000) {
        // Format as millions (e.g., $1.5M)
        usdFormatted = `$${(usdValue / 1000000).toFixed(1)}M`;
      } else if (usdValue >= 1000) {
        // Format as thousands (e.g., $1.5K)
        usdFormatted = `$${(usdValue / 1000).toFixed(1)}K`;
      } else {
        // Format with 2 decimal places for smaller amounts
        usdFormatted = `$${usdValue.toFixed(2)}`;
      }
      
      return { usdValue, usdFormatted };
    } catch (err) {
      console.error('Error converting BTC to USD:', err);
      return { usdValue: 0, usdFormatted: '$0.00' };
    }
  };
  
  // Function to manually refresh the price
  const refreshPrice = async () => {
    try {
      const freshData = 123
      // await apiRequest<PriceResponse>('/api/price/wbtc?refresh=true');
      console.log('Manually refreshed wBTC price:', freshData);
      refetch();
      return freshData;
    } catch (err) {
      console.error('Error refreshing wBTC price:', err);
      refetch();
      return null;
    }
  };
  
  return {
    price: data?.price || 0,
    formattedPrice,
    loading: priceLoading,
    error,
    getUsdValue,
    refreshPrice,
    source: data?.source || 'loading',
    lastUpdated: data?.lastUpdated,
    warning: data?.warning,
    priceChange24h,
    approximated: data?.approximated,
  };
}