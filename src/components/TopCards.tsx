import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAccount } from 'wagmi';
import { Button } from './button';
import { Badge } from './badge';
import { Card } from './card';
import { useMatrixPrices } from './useMatrixPrices';
import { 
  Bitcoin, 
  Coins, 
  DollarSign,
  Zap,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface MatrixTab {
  id: string;
  name: string;
  shortName: string;
  icon: React.ReactNode;
  route: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  tokenSymbol: string;
  levels: string;
  startingPrice: string;
  status: 'active' | 'coming-soon' | 'live' | 'maintenance';
}

const matrixTabs: MatrixTab[] = [
  {
    id: 'sonic',
    name: 'Sonic Matrix',
    shortName: 'SONIC S',
    icon: <Zap className="w-5 h-5" />,
    route: 'https://dapp.web3sonic.com/dashboard?Address=',
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20 hover:bg-purple-900/30 border-purple-500/30',
    borderColor: 'border-purple-500/50 hover:border-purple-400',
    description: 'Sonic S Odd/Even Infinity Matrix',
    tokenSymbol: 'SONIC',
    levels: '10 Levels',
    startingPrice: '10 SONIC',
    status: 'active'
  },
  {
    id: 'satoshi',
    name: 'Satoshi Matrix',
    shortName: 'wBTC',
    icon: <Bitcoin className="w-5 h-5" />,
    route: '/matrix-dashboard',
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20 hover:bg-orange-900/30 border-orange-500/30',
    borderColor: 'border-orange-500/50 hover:border-orange-400',
    description: 'wBTC Bitcoin 3x2 Matrix',
    tokenSymbol: 'wBTC',
    levels: '5 Levels',
    startingPrice: '10k SAT',
    status: 'live'
  },
  {
    id: 'eth',
    name: 'ETH Matrix',
    shortName: 'wETH',
    icon: <Coins className="w-5 h-5" />,
    route: '/eth-matrix',
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20 hover:bg-blue-900/30 border-blue-500/30',
    borderColor: 'border-blue-500/50 hover:border-blue-400',
    description: 'wETH Ethereum 3x2 Matrix',
    tokenSymbol: 'wETH',
    levels: '5 Levels',
    startingPrice: '0.002 ETH',
    status: 'active'
  },
  {
    id: 'usdc',
    name: 'Circle Matrix',
    shortName: 'USDC',
    icon: <DollarSign className="w-5 h-5" />,
    route: '/usdc-matrix',
    color: 'text-green-400',
    bgColor: 'bg-green-900/20 hover:bg-green-900/30 border-green-500/30',
    borderColor: 'border-green-500/50 hover:border-green-400',
    description: 'USDC Stable Coin 3x2 Matrix',
    tokenSymbol: 'USDC',
    levels: '5 Levels',
    startingPrice: '$50 USDC',
    status: 'maintenance'
  }
];

interface MatrixNavigationTabsProps {
  currentMatrix?: string;
  referralId?: string;
}

export const MatrixNavigationTabs: React.FC<MatrixNavigationTabsProps> = ({ 
  currentMatrix = 'satoshi',
  referralId
}) => {
  const [location] = useLocation();
  const { address } = useAccount();
  const matrixPrices = useMatrixPrices();

  const getRouteWithReferral = (route: string) => {
    if (referralId && referralId !== 'bitcoin') {
      return `${route}/${referralId}`;
    }
    return route;
  };

  const isCurrentMatrix = (tabId: string) => {
    return (
      (tabId === 'satoshi' && (location.includes('/matrix') || location.includes('/satoshi'))) ||
      (tabId === 'eth' && location.includes('/eth-matrix')) ||
      (tabId === 'usdc' && location.includes('/usdc'))
    );
  };

  const getMatrixPriceData = (tabId: string) => {
    switch (tabId) {
      case 'sonic':
        return { amount: matrixPrices.sonic.amount, usd: matrixPrices.sonic.usd };
      case 'satoshi':
        return { amount: matrixPrices.wbtc.amount, usd: matrixPrices.wbtc.usd };
      case 'eth':
        return { amount: matrixPrices.weth.amount, usd: matrixPrices.weth.usd };
      case 'usdc':
        return { amount: matrixPrices.usdc.amount, usd: matrixPrices.usdc.usd };
      default:
        return { amount: '', usd: '' };
    }
  };

  return (
    <Card className="mb-6 border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Multi-Matrix Dashboard
          </h3>
          <Badge variant="outline" className="text-xs font-medium border-gray-600 text-gray-300">
            Switch Matrix to Track Your Earnings
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {matrixTabs.map((tab) => {
            const isCurrent = isCurrentMatrix(tab.id);
            
            // Handle external URLs for Sonic matrix
            if (tab.route.startsWith('http')) {
              const externalUrl = address ? `${tab.route}${address}` : tab.route;
              return (
                <a
                  key={tab.id}
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className={`
                    relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${isCurrent 
                      ? `${tab.bgColor} ${tab.borderColor} shadow-md` 
                      : 'bg-gray-800/50 border-gray-600 hover:border-gray-500 hover:shadow-sm hover:bg-gray-700/50'
                    }
                  `}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`${isCurrent ? tab.color : 'text-gray-400'}`}>
                          {tab.icon}
                        </div>
                        <span className={`font-semibold text-sm ${isCurrent ? tab.color : 'text-gray-300'}`}>
                          {tab.shortName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {tab.id === 'sonic' && (
                          <Badge className="text-xs px-2 py-0.5 bg-red-600 text-white border-red-500 animate-pulse">
                            REQUIRED
                          </Badge>
                        )}
                        {tab.status === 'live' && tab.id !== 'sonic' && (
                          <Badge className="text-xs px-2 py-0.5 bg-green-500 text-white border-green-400 animate-pulse">
                            LIVE (UPGRADE)
                          </Badge>
                        )}
                        {tab.status === 'active' && tab.id !== 'sonic' && tab.id !== 'eth' && (
                          <Badge className="text-xs px-2 py-0.5 bg-gray-600 text-white border-gray-500">
                            COMING SOON
                          </Badge>
                        )}
                        {tab.status === 'active' && tab.id === 'eth' && (
                          <Badge className="text-xs px-2 py-0.5 bg-blue-600 text-white border-blue-500">
                            ACTIVE
                          </Badge>
                        )}
                        {tab.status === 'maintenance' && (
                          <Badge className="text-xs px-2 py-0.5 bg-orange-600 text-white border-orange-500">
                            MAINTENANCE
                          </Badge>
                        )}
                        <ArrowRight className={`w-4 h-4 ${isCurrent ? tab.color : 'text-gray-500'}`} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xs font-medium ${isCurrent ? 'text-white' : 'text-gray-300'}`}>
                        {tab.name}
                      </p>
                      <p className={`text-xs ${isCurrent ? 'text-gray-300' : 'text-gray-400'}`}>
                        {tab.description}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className={`text-xs font-semibold ${isCurrent ? tab.color : 'text-gray-400'}`}>
                          {tab.tokenSymbol}
                        </span>
                        <span className={`text-xs ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                          {tab.levels}
                        </span>
                      </div>
                      <div className="flex items-center justify-center pt-1 mt-1 border-t border-gray-600/30">
                        <div className="text-center">
                          <div className={`text-xs font-bold ${isCurrent ? tab.color : 'text-gray-400'}`}>
                            Starting: {getMatrixPriceData(tab.id).amount}
                          </div>
                          <div className={`text-xs ${isCurrent ? 'text-gray-300' : 'text-gray-500'}`}>
                            {getMatrixPriceData(tab.id).usd}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            }
            
            return (
              <Link 
                key={tab.id} 
                to={getRouteWithReferral(tab.route)}
                className="block"
              >
                <div className={`
                  relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                  ${isCurrent 
                    ? `${tab.bgColor} ${tab.borderColor} shadow-md` 
                    : 'bg-gray-800/50 border-gray-600 hover:border-gray-500 hover:shadow-sm hover:bg-gray-700/50'
                  }
                `}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`${isCurrent ? tab.color : 'text-gray-400'}`}>
                        {tab.icon}
                      </div>
                      <span className={`font-semibold text-sm ${isCurrent ? tab.color : 'text-gray-300'}`}>
                        {tab.shortName}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {tab.id === 'sonic' && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 animate-pulse">
                          REQUIRED
                        </Badge>
                      )}
                      {tab.status === 'live' && tab.id !== 'sonic' && (
                        <Badge className="bg-green-500 text-white text-xs px-2 py-0.5 animate-pulse">
                          LIVE (UPGRADE)
                        </Badge>
                      )}
                      {tab.status === 'active' && tab.id !== 'sonic' && tab.id !== 'eth' && (
                        <Badge className="bg-gray-500 text-white text-xs px-2 py-0.5">
                          COMING SOON
                        </Badge>
                      )}
                      {tab.status === 'active' && tab.id === 'eth' && (
                        <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5">
                          ACTIVE
                        </Badge>
                      )}
                      {tab.status === 'maintenance' && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5">
                          MAINTENANCE
                        </Badge>
                      )}
                      {(tab.status === 'active' || !isCurrent) && (
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className={`text-xs font-medium ${isCurrent ? 'text-white' : 'text-gray-300'}`}>
                      {tab.name}
                    </p>
                    <p className={`text-xs ${isCurrent ? 'text-gray-300' : 'text-gray-400'}`}>
                      {tab.description}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className={`text-xs font-semibold ${isCurrent ? tab.color : 'text-gray-400'}`}>
                        {tab.tokenSymbol}
                      </span>
                      <span className={`text-xs ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                        {tab.levels}
                      </span>
                    </div>
                    <div className="flex items-center justify-center pt-1 mt-1 border-t border-gray-600/30">
                      <div className="text-center">
                        <div className={`text-xs font-bold ${isCurrent ? tab.color : 'text-gray-400'}`}>
                          Starting: {getMatrixPriceData(tab.id).amount}
                        </div>
                        <div className={`text-xs ${isCurrent ? 'text-gray-300' : 'text-gray-500'}`}>
                          {getMatrixPriceData(tab.id).usd}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
};