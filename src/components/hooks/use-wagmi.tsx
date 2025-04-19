import { useState, useEffect } from 'react';

// Define interfaces for the user stats data
interface UserStats {
  totalEarnings: number;
  totalReferrals: number;
  activeStakes: number;
  totalRewards: number;
}

/**
 * Hook to get Sonic user stats
 */
export function useSonicUserStats(address: string | undefined) {
  const [stats, setStats] = useState<UserStats>({
    totalEarnings: 0,
    totalReferrals: 0,
    activeStakes: 0,
    totalRewards: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [directDownlines, setDirectDownlines] = useState<number>(0);
  const [matrixTeamSize, setMatrixTeamSize] = useState<number>(0);

  useEffect(() => {
    // In a real implementation, this would fetch from a blockchain or API
    if (address) {
      setIsLoading(true);
      setTimeout(() => {
        try {
          // Simulate stats data
          const randomReferrals = Math.floor(Math.random() * 50);
          setStats({
            totalEarnings: Math.floor(Math.random() * 5000) + 100,
            totalReferrals: randomReferrals,
            activeStakes: Math.floor(Math.random() * 10),
            totalRewards: Math.floor(Math.random() * 2000) + 50
          });
          setDirectDownlines(Math.floor(Math.random() * 15) + 1);
          setMatrixTeamSize(Math.floor(Math.random() * 50) + 5);
          setIsLoading(false);
        } catch (err: any) {
          setError(new Error(err?.message || 'Failed to load user stats'));
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setStats({
        totalEarnings: 0,
        totalReferrals: 0,
        activeStakes: 0,
        totalRewards: 0
      });
      setDirectDownlines(0);
      setMatrixTeamSize(0);
      setIsLoading(false);
    }
  }, [address]);

  return { stats, directDownlines, matrixTeamSize, isLoading, error };
}

// Define the interface for balance data
interface BalanceData {
  amount: number;
  usdValue: number;
  token: string;
}

/**
 * Hook to get Web3BTC balance for a user
 */
export function useWeb3BTCBalance(address: string | undefined) {
  const [balance, setBalance] = useState<BalanceData>({
    amount: 0,
    usdValue: 0,
    token: 'WEB3BTC'
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [formatted, setFormatted] = useState<string>('0');
  const [symbol, setSymbol] = useState<string>('WEB3BTC');

  useEffect(() => {
    // Fetch real balance from the API
    if (address) {
      setIsLoading(true);
      
      // Fetch the user's Web3BTC balance from the API
      fetch(`/api/web3btc/balance/${address}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch balance');
          }
          return response.json();
        })
        .then(data => {
          // We expect data with user_address, balance, staked_balance
          if (data && typeof data.balance === 'number') {
            // Format the balance 
            const amount = data.balance || 0;
            // Fetch current price for USD conversion
            fetch('/api/price/sonic')
              .then(res => res.json())
              .then(priceData => {
                const sonicPriceUSD = priceData.price || 0.5;
                // WEB3 BTC = 0.01 × Sonic price in USD
                const web3BTCPrice = sonicPriceUSD * 0.01;
                
                setBalance({
                  amount: amount,
                  usdValue: amount * web3BTCPrice,
                  token: 'WEB3BTC'
                });
                
                // Format the balance to display with 2 decimal places
                setFormatted(amount.toFixed(2));
                setSymbol('WEB3BTC');
                setIsLoading(false);
              })
              .catch(err => {
                console.error('Error fetching price data:', err);
                // Set the balance without USD value
                setBalance({
                  amount: amount,
                  usdValue: 0,
                  token: 'WEB3BTC'
                });
                setFormatted(amount.toFixed(2));
                setSymbol('WEB3BTC');
                setIsLoading(false);
              });
          } else {
            // Default to zero if the API doesn't return valid data
            setBalance({
              amount: 0,
              usdValue: 0,
              token: 'WEB3BTC'
            });
            setFormatted('0');
            setSymbol('WEB3BTC');
            setIsLoading(false);
          }
        })
        .catch(err => {
          console.error('Error fetching WEB3BTC balance:', err);
          setError(new Error(err?.message || 'Failed to load balance'));
          // Set default values
          setBalance({
            amount: 0,
            usdValue: 0,
            token: 'WEB3BTC'
          });
          setFormatted('0');
          setSymbol('WEB3BTC');
          setIsLoading(false);
        });
    } else {
      // Reset if no address is provided
      setBalance({
        amount: 0,
        usdValue: 0,
        token: 'WEB3BTC'
      });
      setFormatted('0');
      setSymbol('WEB3BTC');
      setIsLoading(false);
    }
  }, [address]);

  return { balance, formatted, symbol, isLoading, error };
}

/**
 * Hook to get the user's Sonic level
 */
export function useSonicUserLevel(address: string | undefined) {
  const [level, setLevel] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // In a real implementation, this would fetch data from a blockchain contract
    // For now, simulate an API call
    if (address) {
      setIsLoading(true);
      setTimeout(() => {
        // Simulate a level between 0-3 for most users
        const randomLevel = Math.floor(Math.random() * 4);
        setLevel(randomLevel);
        setIsLoading(false);
      }, 1000);
    } else {
      setLevel(0);
      setIsLoading(false);
    }
  }, [address]);

  // Compute whether user is at max level
  const isLevel10 = level === 10;

  return { level, isLevel10, isLoading, error };
}

/**
 * Hook to upgrade the user's Sonic level
 */
export function useSonicUpgradeLevel() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const upgradeUserLevel = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      // In a real implementation, this would call a smart contract function
      // For now, simulate a blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
    } catch (err: any) {
      setError(new Error(err?.message || 'Failed to upgrade level'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    upgradeUserLevel,
    isLoading,
    isSuccess,
    error
  };
}

/**
 * Hook to get Web3 authentication status
 */
export function useWeb3Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate an authentication check
    setTimeout(() => {
      // 50% chance of being authenticated in this demo
      setIsAuthenticated(Math.random() > 0.5);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { isAuthenticated, isLoading };
}

/**
 * Hook to get user ID by Ethereum address
 */
export function useUserIdByAddress(address: string | undefined) {
  const [userId, setUserId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!address) {
      setUserId(0);
      setIsLoading(false);
      return;
    }

    const fetchUserId = async () => {
      setIsLoading(true);
      try {
        // Check cache first
        const cachedUserId = localStorage.getItem(`userId_${address}`);
        if (cachedUserId) {
          setUserId(Number(cachedUserId));
          setIsLoading(false);
          return;
        }

        // For demo purposes, we'll generate a random user ID
        // In production, this would call a contract or API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate a random number between 1000 and 9999
        const randomUserId = Math.floor(Math.random() * 9000) + 1000;
        
        setUserId(randomUserId);
        
        // Cache the user ID
        localStorage.setItem(`userId_${address}`, randomUserId.toString());
      } catch (err: any) {
        setError(new Error(err?.message || 'Failed to fetch user ID'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, [address]);

  return { userId, isLoading, error };
}

/**
 * Hook to get sponsor ID for a user
 */
export function useSponsorId(address: string | undefined) {
  const [sponsorId, setSponsorId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // In a real implementation, this would fetch from a blockchain contract
    if (address) {
      setIsLoading(true);
      setTimeout(() => {
        try {
          // Simulate a sponsor ID for testing
          const randomSponsorId = Math.floor(Math.random() * 900) + 100;
          setSponsorId(randomSponsorId);
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching sponsor ID:", err);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setSponsorId(0);
      setIsLoading(false);
    }
  }, [address]);

  return { sponsorId, isLoading, isError };
}

/**
 * Hook to get total team size for a user
 */
export function useTotalTeamSize(userId?: number) {
  const [teamSize, setTeamSize] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // In a real implementation, this would fetch from a blockchain contract
    if (userId && userId > 0) {
      setIsLoading(true);
      setTimeout(() => {
        try {
          // Simulate team size data for testing
          const randomTeamSize = Math.floor(Math.random() * 50) + 1;
          setTeamSize(randomTeamSize);
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching team size:", err);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setTeamSize(0);
      setIsLoading(false);
    }
  }, [userId]);

  return { teamSize, isLoading, isError };
}

/**
 * Hook to get Sonic points for a user
 */
export function useSonicPoints(address?: string) {
  const [points, setPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // In a real implementation, this would fetch from an API or blockchain
    if (address) {
      setIsLoading(true);
      setTimeout(() => {
        try {
          // Simulate points data for testing
          const randomPoints = Math.floor(Math.random() * 5000) + 100;
          setPoints(randomPoints);
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching Sonic points:", err);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setPoints(0);
      setIsLoading(false);
    }
  }, [address]);

  return { points, isLoading, isError };
}

/**
 * Hook to get Sonic user income data
 */
export function useSonicUserIncome(address?: string) {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [virtualIncome, setVirtualIncome] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // In a real implementation, this would fetch from a blockchain contract
    if (address) {
      setIsLoading(true);
      setTimeout(() => {
        try {
          // Simulate income data for testing
          const randomTotalIncome = Math.floor(Math.random() * 10000) + 500;
          const randomVirtualIncome = Math.floor(Math.random() * 5000) + 100;
          
          setTotalIncome(randomTotalIncome);
          setVirtualIncome(randomVirtualIncome);
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching user income:", err);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setTotalIncome(0);
      setVirtualIncome(0);
      setIsLoading(false);
    }
  }, [address]);

  return { 
    totalIncome, 
    virtualIncome, 
    isLoading, 
    isError 
  };
}

/**
 * Hook to get level stories for a user
 */
export function useLevelStories(address?: string) {
  const [levelStories, setLevelStories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // In a real implementation, this would fetch from a blockchain contract
    if (address) {
      setIsLoading(true);
      setTimeout(() => {
        try {
          // Simulate level stories data for testing
          const randomStories = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);
          setLevelStories(randomStories);
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching level stories:", err);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setLevelStories([]);
      setIsLoading(false);
    }
  }, [address]);

  return { 
    levelStories, 
    isLoading, 
    isError 
  };
}