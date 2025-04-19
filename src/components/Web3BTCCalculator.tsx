import React, { useState, useEffect } from 'react';
// import { useSonicPrice } from '@/hooks/use-sonic-price';
// import { useSonicPrice } from './hooks/use-sonic-price';
// import { Input } from '@/components/ui/input';
import { Input } from './UI/input';
import { Bitcoin, ArrowRightLeft, DollarSign } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
import { Badge } from './UI/badge';

export function Web3BTCCalculator() {
  // const { price: sonicPrice, loading: isPriceLoading } = useSonicPrice();
  const [usdAmount, setUsdAmount] = useState<string>('100');
  const [web3BTCAmount, setWeb3BTCAmount] = useState<string>('');
  const [calculationMode, setCalculationMode] = useState<'usd-to-btc' | 'btc-to-usd'>('usd-to-btc');
  const [web3BTCPrice, setWeb3BTCPrice] = useState<number | null>(null);

  // Calculate WEB3 BTC price based on Sonic price (1 WEB3 BTC = 0.01 Sonic)
  // useEffect(() => {
  //   if (sonicPrice) {
  //     const calculatedPrice = sonicPrice * 0.01;
  //     setWeb3BTCPrice(calculatedPrice);
      
  //     // Update the other field based on current mode
  //     if (calculationMode === 'usd-to-btc' && usdAmount) {
  //       const btcValue = parseFloat(usdAmount) / calculatedPrice;
  //       setWeb3BTCAmount(isNaN(btcValue) ? '' : btcValue.toLocaleString(undefined, { maximumFractionDigits: 2 }));
  //     } else if (calculationMode === 'btc-to-usd' && web3BTCAmount) {
  //       const cleanAmount = web3BTCAmount.replace(/,/g, '');
  //       const usdValue = parseFloat(cleanAmount) * calculatedPrice;
  //       setUsdAmount(isNaN(usdValue) ? '' : usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 }));
  //     }
  //   }
  // }, [sonicPrice, calculationMode, usdAmount, web3BTCAmount]);

  // Handle USD amount change
  const handleUsdChange = (value: string) => {
    // Remove commas and other non-numeric characters
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setUsdAmount(cleanValue);
    
    if (web3BTCPrice && cleanValue) {
      const btcValue = parseFloat(cleanValue) / web3BTCPrice;
      setWeb3BTCAmount(isNaN(btcValue) ? '' : btcValue.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    } else {
      setWeb3BTCAmount('');
    }
  };

  // Handle WEB3 BTC amount change
  const handleWeb3BTCChange = (value: string) => {
    // Remove commas and other non-numeric characters
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setWeb3BTCAmount(cleanValue);
    
    if (web3BTCPrice && cleanValue) {
      const usdValue = parseFloat(cleanValue) * web3BTCPrice;
      setUsdAmount(isNaN(usdValue) ? '' : usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    } else {
      setUsdAmount('');
    }
  };

  // Toggle calculation mode
  const toggleCalculationMode = () => {
    const newMode = calculationMode === 'usd-to-btc' ? 'btc-to-usd' : 'usd-to-btc';
    setCalculationMode(newMode);
    
    // Ensure values are correctly calculated when toggling
    if (newMode === 'usd-to-btc' && usdAmount && web3BTCPrice) {
      const cleanAmount = usdAmount.replace(/,/g, '');
      const btcValue = parseFloat(cleanAmount) / web3BTCPrice;
      setWeb3BTCAmount(isNaN(btcValue) ? '' : btcValue.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    } else if (newMode === 'btc-to-usd' && web3BTCAmount && web3BTCPrice) {
      const cleanAmount = web3BTCAmount.replace(/,/g, '');
      const usdValue = parseFloat(cleanAmount) * web3BTCPrice;
      setUsdAmount(isNaN(usdValue) ? '' : usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-amber-600/30 p-4 sm:p-3 flex flex-col w-full md:min-w-[300px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-2 gap-2">
        <div className="flex items-center">
          {calculationMode === 'usd-to-btc' ? (
            <DollarSign className="h-5 w-5 sm:h-4 sm:w-4 text-green-400 mr-2 sm:mr-1" />
          ) : (
            <Bitcoin className="h-5 w-5 sm:h-4 sm:w-4 text-amber-400 mr-2 sm:mr-1" />
          )}
          <span className="text-white font-medium text-base sm:text-sm">WEB3 BTC Calculator</span>
        </div>
        <Badge 
          variant="outline" 
          className="bg-amber-900/20 border-amber-700/30 text-amber-400 text-sm sm:text-xs py-1.5 sm:py-1 px-3 sm:px-2"
        >
          1 WEB3 BTC = ${web3BTCPrice?.toFixed(6) || '0.000000'}
        </Badge>
      </div>
      
      {/* Optimized for mobile with better spacing and touch target sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-4 sm:gap-1 items-center mb-3 sm:mb-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <DollarSign className="h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            value={usdAmount}
            onChange={(e) => handleUsdChange(e.target.value)}
            className="pl-10 sm:pl-9 h-12 sm:h-9 text-base sm:text-sm bg-gray-700 border-gray-600 focus:border-amber-500"
            placeholder="USD amount"
          />
        </div>
        
        <button
          onClick={toggleCalculationMode}
          className="bg-gray-700 h-12 sm:h-9 w-12 sm:w-8 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors mx-auto"
          aria-label="Toggle calculation direction"
        >
          <ArrowRightLeft className="h-5 w-5 sm:h-4 sm:w-4 text-amber-400" />
        </button>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Bitcoin className="h-5 w-5 sm:h-4 sm:w-4 text-amber-400" />
          </div>
          <Input
            type="text"
            value={web3BTCAmount}
            onChange={(e) => handleWeb3BTCChange(e.target.value)}
            className="pl-10 sm:pl-9 h-12 sm:h-9 text-base sm:text-sm bg-gray-700 border-gray-600 focus:border-amber-500"
            placeholder="WEB3 BTC amount"
          />
        </div>
      </div>
      
      <div className="text-sm sm:text-xs text-muted-foreground mt-2 text-center sm:text-left">
        {/* {isPriceLoading ? (
          <span className="inline-block w-24 sm:w-20 h-4 sm:h-3 bg-gray-700 animate-pulse rounded"></span>
        ) : (
          <span>Based on current Sonic price: ${sonicPrice?.toFixed(4) || '0.0000'}</span>
        )} */}
      </div>
    </div>
  );
}