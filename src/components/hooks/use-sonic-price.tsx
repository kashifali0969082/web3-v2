import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {  } from '../lib/queryCLient';

interface PriceResponse {
  price: number;
  symbol: string;
  source: string;
  warning?: string;
  lastUpdated?: string;
  priceChange24h?: number; // Added to match the updated server response
}

interface PriceHistoryResponse {
  prices: Array<{
    price: number;
    timestamp: number;
    change24h: number;
  }>;
  symbol: string;
  period: string;
  days: number;
  generatedAt: string;
}

/**
 * Custom hook to fetch and use the Sonic token price
 * Provides both the raw price and formatted values
 */
export function useSonicPrice() {
  const [formattedPrice, setFormattedPrice] = useState<string>('$0.00');
  const [priceLoading, setPriceLoading] = useState<boolean>(true);
  const [priceChange24h, setPriceChange24h] = useState<number | null>(null);
  
  // Fetch price from the server API endpoint - always use KuCoin as the primary source
  const { data, isLoading, error, refetch } = useQuery<PriceResponse>({
    queryKey: ['/api/price/sonic', { kucoin: 'true' }], // Add kucoin parameter to prioritize KuCoin exchange
    // queryFn: getQueryFn({ on401: "returnNull" }),
    refetchInterval: 15000, // Refetch price more frequently (every 15 seconds)
    staleTime: 5000, // Consider data stale after just 5 seconds for more fresh data
    retry: 3,
  });
  
  // Fetch 24h price history to get the change percentage
  const { data: historyData } = useQuery<PriceHistoryResponse>({
    queryKey: ['/api/price/sonic/history'],
    // queryFn: getQueryFn({ on401: "returnNull" }),
    refetchInterval: 300000, // 5 minutes
    staleTime: 60000, // 1 minute
  });
  
  useEffect(() => {
    if (data?.price) {
      // Format price with 2 decimal places
      setFormattedPrice(`$${data.price.toFixed(2)}`);
    }
    setPriceLoading(isLoading);
  }, [data, isLoading]);
  
  // Extract 24h price change from direct API or history data
  useEffect(() => {
    // First priority: Check if the price endpoint directly includes 24h change
    if (data?.priceChange24h !== undefined) {
      setPriceChange24h(data.priceChange24h);
      // console.log('Using 24h price change directly from price endpoint:', data.priceChange24h);
    } 
    // Second priority: Fall back to history data if direct data not available
    else if (historyData?.prices && historyData.prices.length > 0) {
      // Get the most recent price point which should have the 24h change
      const lastPricePoint = historyData.prices[0];
      if (typeof lastPricePoint.change24h === 'number') {
        setPriceChange24h(lastPricePoint.change24h);
        // console.log('Using 24h price change from history data:', lastPricePoint.change24h);
      }
    }
  }, [data, historyData]);
  
  // Function to convert Sonic amount to USD value
  const getUsdValue = (sonicAmount: number | string | bigint): {
    usdValue: number;
    usdFormatted: string;
  } => {
    try {
      // Handle different input types
      let numericAmount: number;
      
      if (typeof sonicAmount === 'bigint') {
        // Convert from bigint (assuming 18 decimals for token)
        numericAmount = Number(sonicAmount) / 1e18;
      } else if (typeof sonicAmount === 'string') {
        // Parse string to number
        numericAmount = parseFloat(sonicAmount);
      } else {
        numericAmount = sonicAmount;
      }
      
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
      console.error('Error converting Sonic to USD:', err);
      return { usdValue: 0, usdFormatted: '$0.00' };
    }
  };
  
  // Function to manually refresh the price (always from KuCoin)
  const refreshPrice = async () => {
    // Force a new query with fresh KuCoin data
    try {
      const freshData =123 
      // await apiRequest<PriceResponse>('/api/price/sonic?kucoin=true&refresh=true');
      // console.log('Manually refreshed price from KuCoin:', freshData);
      refetch();
      return freshData;
    } catch (err) {
      console.error('Error refreshing price:', err);
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
    priceChange24h, // New property for 24h price change percentage
  };
}