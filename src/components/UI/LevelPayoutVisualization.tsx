import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUpRight, ChevronRight, Trophy, Crown, Diamond } from 'lucide-react';

const LevelPayoutVisualization: React.FC = () => {
  // Start with visible=true for mobile devices to ensure content always shows
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to ensure content is visible immediately
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Still use intersection observer for desktop animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    
    const element = document.getElementById('level-payout-visualization');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  // Calculate token amount and dollar value for each level
  const getLevelData = (level: number) => {
    const sonicPrice = 0.5317; // Current Sonic token price
    const tokens = 10 * Math.pow(2, level - 1);
    const dollarValue = tokens * sonicPrice;
    
    return {
      tokens,
      dollarValue: dollarValue.toFixed(2)
    };
  };

  return (
    <div id="level-payout-visualization" className="w-full block">
      <motion.div 
        className="bg-gradient-to-br from-gray-900/80 via-[#05070F]/90 to-gray-900/80 rounded-xl border border-blue-500/20 shadow-xl overflow-hidden p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-[#00a3ff] to-[#8ecdf8] bg-clip-text text-transparent">
              WEB3 SONIC 100% INSTANT PAY SMART CONTRACT
            </span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Understand how our revolutionary payout system works across all 10 levels
          </p>
        </div>
        
        <div className="pt-4 flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
          {/* 100% PAYOUT SQUARE */}
          <motion.div 
            className="relative flex flex-col items-center mt-16 md:mt-0 w-full md:w-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            
            {/* MASSIVE 100% Square */}
            <motion.div
              className="w-64 h-28 sm:w-64 sm:h-40 md:w-56 md:h-56 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex flex-col items-center justify-center shadow-lg shadow-orange-600/30 relative z-10 border-4 border-orange-400"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px 5px rgba(249, 115, 22, 0.4)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-none">100%</span>
              <span className="text-orange-200 font-medium text-xs sm:text-lg md:text-xl">PAYOUT</span>
              <motion.div
                className="absolute inset-0 rounded-xl border-4 border-orange-300/50"
                animate={{ 
                  boxShadow: ['0 0 0 0px rgba(249, 115, 22, 0.3)', '0 0 0 10px rgba(249, 115, 22, 0)'],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.div>
            
            <h3 className="text-xl font-bold text-orange-400 mt-6 flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Odd Positions
            </h3>
            
            <div className="bg-gray-800/60 border border-orange-500/20 rounded-xl p-4 mt-3 max-w-xs text-center">
              <p className="text-gray-300 text-sm">
                Everyone keeps <span className="text-orange-400 font-bold">100%</span> of all their odd-numbered referrals (1st, 3rd, 5th...), giving you instant full payout
              </p>
              
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-2">
                  {[1, 3, 5].map(num => (
                    <div key={num} className="w-8 h-8 rounded-md bg-orange-500/20 flex items-center justify-center border border-orange-400/30">
                      <span className="text-orange-400 font-bold">{num}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Arrow pointing upward */}
            <motion.div
              className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-orange-400"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <ArrowUpRight className="h-10 w-10" />
            </motion.div>
          </motion.div>
          
          {/* VS Divider with promotional messages */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent md:hidden"></div>
            <div className="hidden md:block w-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            {/* Promotional tags */}
            <motion.div 
              className="flex flex-col items-center space-y-4 my-4 text-center px-2 max-w-[90vw] md:max-w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* ZERO ADMIN FEE */}
              <motion.div
                className="bg-gradient-to-r from-green-600/80 to-green-800/80 px-3 py-2 rounded-xl border border-green-500/40 shadow-lg shadow-green-900/20 w-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base md:text-3xl font-black tracking-wider text-white">ZERO ADMIN FEE</span>
              </motion.div>
              
              {/* INSTANT PAY */}
              <motion.div
                className="bg-gradient-to-r from-red-500/80 to-red-700/80 px-3 py-2 rounded-xl border border-red-500/40 shadow-lg shadow-red-900/20 w-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base md:text-3xl font-black tracking-wider text-white">INSTANT PAY</span>
              </motion.div>
              
              {/* ONLY 10 S TO START */}
              <motion.div
                className="bg-gradient-to-r from-amber-500/80 to-amber-700/80 px-3 py-2 rounded-xl border border-amber-500/40 shadow-lg shadow-amber-900/20 w-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base md:text-2xl font-extrabold tracking-wide text-white">ONLY 10 S TO START</span>
              </motion.div>
              
              {/* SONIC BLOCKCHAIN */}
              <motion.div
                className="bg-gradient-to-r from-purple-500/80 to-purple-700/80 px-3 py-2 rounded-xl border border-purple-500/40 shadow-lg shadow-purple-900/20 w-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base md:text-2xl font-extrabold tracking-wide text-white">SONIC BLOCKCHAIN</span>
              </motion.div>
              
              {/* 200M SONIC AIRDROP */}
              <motion.div
                className="bg-gradient-to-r from-blue-500/80 to-indigo-700/80 px-3 py-2 rounded-xl border border-blue-500/40 shadow-lg shadow-blue-900/20 w-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base md:text-3xl font-black tracking-wider text-white">200M SONIC AIRDROP</span>
              </motion.div>
              
              {/* SONIC S TOKEN */}
              <motion.div
                className="bg-gradient-to-r from-cyan-500/80 to-blue-700/80 px-3 py-2 rounded-xl border border-cyan-500/40 shadow-lg shadow-cyan-900/20 w-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base md:text-3xl font-black tracking-wider text-white">SONIC S TOKEN</span>
              </motion.div>
              
              {/* SMART CONTRACT */}
              <motion.div
                className="bg-gradient-to-r from-yellow-500/80 to-orange-700/80 px-3 py-2 rounded-xl border border-yellow-500/40 shadow-lg shadow-yellow-900/20 w-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base md:text-3xl font-black tracking-wider text-white">SMART CONTRACT</span>
              </motion.div>
            </motion.div>
            
            <div className="my-2 bg-gradient-to-r from-blue-600/60 to-blue-800/60 rounded-xl px-4 py-2 text-white font-bold text-xl sm:text-2xl border border-blue-400/30 shadow-lg shadow-blue-900/20">
              <span className="hidden sm:inline-block">100% PLUS 25% x 4</span>
              <span className="sm:hidden">100% + 25% x 4</span>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent md:hidden"></div>
            <div className="hidden md:block w-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          </motion.div>
          
          {/* 25% PAYOUT SQUARE */}
          <motion.div 
            className="relative flex flex-col items-center mt-16 md:mt-0 w-full md:w-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            
            {/* MASSIVE 25% Square */}
            <motion.div
              className="w-64 h-28 sm:w-64 sm:h-40 md:w-56 md:h-56 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex flex-col items-center justify-center shadow-lg shadow-indigo-600/30 relative z-10 border-4 border-indigo-400"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px 5px rgba(99, 102, 241, 0.4)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-none">25%</span>
              <span className="text-indigo-200 font-medium text-xs sm:text-lg md:text-xl">PAYOUT</span>
              <div className="text-indigo-200 text-[10px] sm:text-sm mt-1">to each of 4 uplines</div>
              <motion.div
                className="absolute inset-0 rounded-xl border-4 border-indigo-300/50"
                animate={{ 
                  boxShadow: ['0 0 0 0px rgba(99, 102, 241, 0.3)', '0 0 0 10px rgba(99, 102, 241, 0)'],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.div>
            
            <h3 className="text-xl font-bold text-indigo-400 mt-6 flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Even Positions
            </h3>
            
            <div className="bg-gray-800/60 border border-indigo-500/20 rounded-xl p-4 mt-3 max-w-xs text-center">
              <p className="text-gray-300 text-sm">
                Everyone shares their even-numbered referrals (2nd, 4th, 6th...), giving <span className="text-indigo-400 font-bold">25%</span> to each of 4 uplines (100% total payout)
              </p>
              
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-2">
                  {[2, 4, 6].map(num => (
                    <div key={num} className="w-8 h-8 rounded-md bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
                      <span className="text-indigo-400 font-bold">{num}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Multiple arrows */}
            <motion.div
              className="absolute -top-14 left-1/2 transform -translate-x-1/2 flex"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <ChevronRight className="h-5 w-5 text-indigo-400 rotate-[135deg]" />
              <ChevronRight className="h-5 w-5 text-indigo-400 -rotate-45" />
              <ChevronRight className="h-5 w-5 text-indigo-400 rotate-[225deg]" />
              <ChevronRight className="h-5 w-5 text-indigo-400 rotate-45" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* 10 Level Calculator Section */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl border border-blue-500/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-center text-blue-300 mb-6">
            10 Levels of Sonic Token Rewards
          </h3>
          
          {/* Decorative squares for bottom corners */}
          <div className="relative">
            {/* Bottom left square */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-blue-500/30 rounded-xl hidden lg:block" 
                 style={{ transform: 'rotate(-15deg)' }}></div>
            
            {/* Bottom right square */}
            <div className="absolute -bottom-8 -right-6 w-20 h-20 border-2 border-indigo-500/30 rounded-xl hidden lg:block" 
                 style={{ transform: 'rotate(10deg)' }}></div>
            
            {/* Main grid with level cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 relative z-10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
                const { tokens, dollarValue } = getLevelData(level);
                
                // Define styling based on level
                let bgGradient, iconComp, textColor;
                
                if (level <= 3) {
                  bgGradient = "from-blue-900/30 to-blue-800/20";
                  textColor = "text-blue-400";
                  iconComp = <Trophy className="w-5 h-5 text-blue-400" />;
                } else if (level <= 6) {
                  bgGradient = "from-purple-900/30 to-purple-800/20";
                  textColor = "text-purple-400";
                  iconComp = <Crown className="w-5 h-5 text-purple-400" />;
                } else {
                  bgGradient = "from-amber-900/30 to-amber-800/20";
                  textColor = "text-amber-400";
                  iconComp = <Diamond className="w-5 h-5 text-amber-400" />;
                }
                
                return (
                  <motion.div 
                    key={`level-${level}`}
                    className={`bg-gradient-to-br ${bgGradient} rounded-xl border border-blue-500/20 p-4`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.2 + (level * 0.05) }}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(0, 163, 255, 0.2)" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {iconComp}
                        <h4 className={`${textColor} font-bold ml-2`}>Level {level}</h4>
                      </div>
                      <div className="text-xs font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded-md">
                        {level <= 3 ? 'Basic' : level <= 6 ? 'Advanced' : 'Premium'}
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Tokens:</span>
                        <span className="text-white font-bold">{tokens} SONIC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Value:</span>
                        <span className="text-green-400 font-bold">${dollarValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Reward Multiplier:</span>
                        <span className={`${textColor} font-bold`}>{Math.pow(2, level - 1)}x</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-6 bg-blue-900/30 rounded-xl p-4 max-w-3xl mx-auto relative">
            {/* Decorative small square for accent */}
            <div className="absolute -top-3 -right-3 w-10 h-10 border-2 border-cyan-500/30 rounded-md hidden lg:block" 
                 style={{ transform: 'rotate(15deg)' }}></div>
                 
            <h4 className="text-lg font-bold text-blue-300 mb-2 text-center">How Level Rewards Work</h4>
            <p className="text-gray-300 text-sm text-center mb-4">
              Each level requires Sonic tokens to unlock. Higher levels provide progressively larger rewards, 
              following our token doubling system. Start with just 10 tokens at Level 1 and progress through all 10 levels.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 p-3 rounded-xl border border-blue-500/30">
                <h5 className="text-sm font-bold text-blue-400 mb-1 text-center">Levels 1-3 <span className="text-xs">(10-40 tokens)</span></h5>
                <p className="text-xs text-gray-400">Basic access with core features and entry-level rewards. Perfect for beginners.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 p-3 rounded-xl border border-purple-500/30">
                <h5 className="text-sm font-bold text-purple-400 mb-1 text-center">Levels 4-6 <span className="text-xs">(80-320 tokens)</span></h5>
                <p className="text-xs text-gray-400">Advanced features with enhanced rewards and multi-level earnings opportunities.</p>
              </div>
              <div className="col-span-1 sm:col-span-2 bg-gradient-to-br from-amber-900/40 to-slate-900/40 p-3 rounded-xl border border-amber-500/30 relative z-10">
                <h5 className="text-sm font-bold text-amber-400 mb-1 text-center">Levels 7-10 <span className="text-xs">(640-5120 tokens)</span></h5>
                <p className="text-xs text-gray-400">Premium status with maximum rewards, exclusive benefits, and leadership position in the ecosystem.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LevelPayoutVisualization;