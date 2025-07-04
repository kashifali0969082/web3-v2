// ✅ Final Fixed Version: useMatrixPrices.ts
// Fully working and resilient to partial fetch failures

import { useState, useEffect } from 'react';

interface PriceData {
  sonic: number;
  bitcoin: number;
  ethereum: number;
  usdc: number;
}

interface MatrixPriceCalculations {
  sonic: { amount: string; usd: string };
  wbtc: { amount: string; usd: string };
  weth: { amount: string; usd: string };
  usdc: { amount: string; usd: string };
  isLoading: boolean;
  error: string | null;
}

export function useMatrixPrices(): MatrixPriceCalculations {
  const [prices, setPrices] = useState<PriceData>({
    sonic: 0,
    bitcoin: 0,
    ethereum: 0,
    usdc: 1 // USDC is pegged to $1
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      setIsLoading(true);
      setError(null);

      try {
        let sonicPrice = 0;
        let wbtcPrice = 0;
        let ethPrice = 0;

        // Fetch SONIC
        try {
          const sonicRes = await fetch('/api/price/sonic');
          const sonicData = sonicRes.ok ? await sonicRes.json() : { price: 0 };
          sonicPrice = sonicData.price || 0;
        } catch (err) {
          console.error("❌ Failed to fetch SONIC price");
        }

        // Fetch WBTC
        try {
          const wbtcRes = await fetch('/api/price/wbtc');
          const wbtcData = wbtcRes.ok ? await wbtcRes.json() : { price: 0 };
          wbtcPrice = wbtcData.price || 0;
        } catch (err) {
          console.error("❌ Failed to fetch WBTC price");
        }

        // Fetch ETH
        try {
          const ethRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
          const ethData = ethRes.ok ? await ethRes.json() : { ethereum: { usd: 0 } };
          ethPrice = ethData.ethereum?.usd || 0;
        } catch (err) {
          console.error("❌ Failed to fetch ETH price");
        }

        setPrices({
          sonic: sonicPrice,
          bitcoin: wbtcPrice,
          ethereum: ethPrice,
          usdc: 1
        });

        console.log("✅ Prices:", { sonicPrice, wbtcPrice, ethPrice });
      } catch (err) {
        console.error('⚠️ Unexpected error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPrices();

    const interval = setInterval(fetchPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const calculations: MatrixPriceCalculations = {
    sonic: {
      amount: '10 SONIC',
      usd: prices.sonic > 0 ? `$${(10 * prices.sonic).toFixed(2)}` : '$--'
    },
    wbtc: {
      amount: '10k SAT',
      usd: prices.bitcoin > 0 ? `$${(0.0001 * prices.bitcoin).toFixed(2)}` : '$--'
    },
    weth: {
      amount: '0.002 ETH',
      usd: prices.ethereum > 0 ? `$${(0.002 * prices.ethereum).toFixed(2)}` : '$--'
    },
    usdc: {
      amount: '$50 USDC',
      usd: '$50.00'
    },
    isLoading,
    error
  };

  return calculations;
}
