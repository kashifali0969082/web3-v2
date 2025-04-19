import { useState } from 'react';
import { motion } from 'framer-motion';
import { User,  ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './UI/button';
import { Badge } from './UI/badge';
interface MatrixVisualizationProps {
  showRecycle?: boolean;
  initialLevel?: number;
}

const MatrixVisualization = ({  initialLevel = 1 }: MatrixVisualizationProps) => {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  
  // Matrix level configuration
  const levels = [
    { level: 1, amount: 5, color: 'from-blue-500 to-blue-700' },
    { level: 2, amount: 10, color: 'from-green-500 to-green-700' },
    { level: 3, amount: 20, color: 'from-purple-500 to-purple-700' },
    { level: 4, amount: 40, color: 'from-amber-500 to-amber-700' },
    { level: 5, amount: 80, color: 'from-red-500 to-red-700' },
    { level: 6, amount: 160, color: 'from-pink-500 to-pink-700' },
    { level: 7, amount: 320, color: 'from-indigo-500 to-indigo-700' },
    { level: 8, amount: 640, color: 'from-cyan-500 to-cyan-700' },
    { level: 9, amount: 1280, color: 'from-teal-500 to-teal-700' },
    { level: 10, amount: 2560, color: 'from-emerald-500 to-emerald-700' }
  ];
  
  const currentLevelConfig = levels[currentLevel - 1];
  // Animation variants for nodes
  const nodeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
    },
    visible: (custom: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: custom * 0.5,
        duration: 0.5, 
        ease: "easeOut" 
      } 
    })
  };

  // Animation variants for arrows
//   const arrowVariants = {
//     hidden: { 
//       opacity: 0, 
//       height: 0,
//     },
//     visible: (custom: number) => ({ 
//       opacity: 1, 
//       height: 30,
//       transition: { 
//         delay: custom * 0.5,
//         duration: 0.3, 
//         ease: "easeOut" 
//       } 
//     })
//   };

  // Animation variants for payment indicators
//   const paymentVariants = {
//     hidden: { 
//       opacity: 0, 
//       scale: 0,
//     },
//     visible: (custom: number) => ({ 
//       opacity: 1, 
//       scale: 1,
//       transition: { 
//         delay: custom * 0.5,
//         duration: 0.3, 
//         ease: "easeOut" 
//       } 
//     })
//   };

  return (
    <div className="relative w-full bg-gray-900 py-12 px-4 md:px-8 rounded-xl overflow-hidden border border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0 text-center bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 bg-clip-text text-transparent animate-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.2 }}
        >
          SONIC MATRIX
        </motion.h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentLevel(Math.max(1, currentLevel - 1))}
            disabled={currentLevel === 1}
          >
            <ChevronDown className="h-4 w-4 mr-1" /> Level
          </Button>
          
          <Badge 
            variant="outline" 
            className={`text-white bg-gradient-to-r ${currentLevelConfig.color} px-3 py-1 text-sm font-medium`}
          >
            Level {currentLevel}: {currentLevelConfig.amount.toLocaleString()} S
          </Badge>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentLevel(Math.min(10, currentLevel + 1))}
            disabled={currentLevel === 10}
          >
            Level <ChevronUp className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      {/* Level selection indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {levels.map((level, index) => (
          <motion.div 
            key={index}
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-2 ${
              currentLevel === level.level 
                ? `bg-gradient-to-r ${level.color} border-white` 
                : 'bg-gray-800 border-gray-600'
            }`}
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentLevel(level.level)}
          >
            <span className="text-white font-bold text-xs">{level.level}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="relative w-full h-[850px] md:h-[900px]">
        {/* Level 1 - You */}
        <div className="absolute top-2 w-full flex justify-center items-center">
          <motion.div 
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center z-10 border-[3px] border-white shadow-xl shadow-blue-500/20"
            variants={nodeVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="flex flex-col items-center justify-center">
              <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
              <span className="text-xs text-white font-bold mt-0.5">YOU</span>
              <span className="text-xs text-white font-bold bg-black/30 px-2 rounded-full">ID:1</span>
            </div>
          </motion.div>
        </div>

        {/* Space between Level 1 and Level 2 */}
        <div className="h-[50px] md:h-[60px]"></div>

        {/* Level 2 - ODD and EVEN positions */}
        <div className="absolute top-[110px] md:top-[130px] w-full">
          <div className="flex justify-center items-center gap-20 md:gap-40 lg:gap-64 xl:gap-80">
            <motion.div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center z-10 shadow-lg shadow-green-500/20 border-2 border-green-300"
              variants={nodeVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-white text-sm md:text-base font-medium">ODD</span>
                <span className="text-white text-xs font-medium">100%</span>
                <span className="text-white text-xs font-bold bg-black/30 px-2 rounded-full">ID:126</span>
              </div>
            </motion.div>
            <motion.div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center z-10 shadow-lg shadow-purple-500/20 border-2 border-purple-300"
              variants={nodeVariants}
              initial="hidden"
              animate="visible"
              custom={1.2}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-white text-sm md:text-base font-medium">EVEN</span>
                <span className="text-white text-xs font-medium">25%</span>
                <span className="text-white text-xs font-bold bg-black/30 px-2 rounded-full">ID:127</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* New payline for every 2 referrals */}
        <div className="absolute top-[170px] md:top-[190px] w-full">
          <div className="flex justify-center mb-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="bg-blue-500/20 py-1 px-3 rounded-lg border border-blue-500/30"
            >
              <span className="text-xs text-blue-300 font-semibold">New payline created for every 2 referrals</span>
            </motion.div>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              <motion.div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center z-10 shadow-lg shadow-green-500/20 border-2 border-green-300"
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
                custom={1.4}
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-white text-xs font-medium">ODD</span>
                  <span className="text-white text-xs font-bold bg-black/30 px-2 rounded-full">ID:128</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center z-10 shadow-lg shadow-purple-500/20 border-2 border-purple-300"
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
                custom={1.6}
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-white text-xs font-medium">EVEN</span>
                  <span className="text-white text-xs font-bold bg-black/30 px-2 rounded-full">ID:129</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center z-10 shadow-lg shadow-green-500/20 border-2 border-green-300"
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
                custom={1.8}
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-white text-xs font-medium">ODD</span>
                  <span className="text-white text-xs font-bold bg-black/30 px-2 rounded-full">ID:130</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center z-10 shadow-lg shadow-purple-500/20 border-2 border-purple-300"
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
                custom={2}
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-white text-xs font-medium">EVEN</span>
                  <span className="text-white text-xs font-bold bg-black/30 px-2 rounded-full">ID:131</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Connector lines to new referrals */}
        <div className="absolute top-[145px] md:top-[165px] w-full">
          <div className="flex justify-center">
            <div className="relative w-[300px] md:w-[400px] h-[30px]">
              <motion.div 
                className="absolute left-[calc(50%-150px)] md:left-[calc(50%-200px)] top-0 h-[2px] w-[300px] md:w-[400px] bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600"
                initial={{ width: 0, left: "50%" }}
                animate={{ width: "300px", left: "calc(50% - 150px)" }}
                transition={{ delay: 1.3, duration: 0.8 }}
              />
              
              <motion.div 
                className="absolute left-[calc(50%-130px)] md:left-[calc(50%-170px)] top-0 h-[25px] w-[2px] bg-emerald-500"
                initial={{ height: 0 }}
                animate={{ height: "25px" }}
                transition={{ delay: 1.8, duration: 0.3 }}
              />
              
              <motion.div 
                className="absolute left-[calc(50%-50px)] md:left-[calc(50%-70px)] top-0 h-[25px] w-[2px] bg-blue-500"
                initial={{ height: 0 }}
                animate={{ height: "25px" }}
                transition={{ delay: 1.9, duration: 0.3 }}
              />
              
              <motion.div 
                className="absolute left-[calc(50%+30px)] md:left-[calc(50%+30px)] top-0 h-[25px] w-[2px] bg-blue-500"
                initial={{ height: 0 }}
                animate={{ height: "25px" }}
                transition={{ delay: 2.0, duration: 0.3 }}
              />
              
              <motion.div 
                className="absolute left-[calc(50%+110px)] md:left-[calc(50%+130px)] top-0 h-[25px] w-[2px] bg-indigo-600"
                initial={{ height: 0 }}
                animate={{ height: "25px" }}
                transition={{ delay: 2.1, duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Connector Lines */}
        <div className="absolute top-[30px] md:top-[35px] w-full">
          <div className="relative h-[80px] md:h-[95px] flex justify-center">
            <motion.div 
              className="absolute h-full w-[2px] bg-gradient-to-b from-blue-500 to-green-500"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </div>
        </div>

        {/* Connector Lines from Level 1 to ODD and EVEN */}
        <div className="absolute top-[30px] md:top-[35px] w-full">
          <div className="relative h-[80px] md:h-[95px] flex justify-center">
            <div className="relative">
              <motion.div 
                className="absolute h-full w-[2px] bg-gradient-to-b from-blue-500 to-green-500"
                style={{ left: "-40px", transform: "rotate(-30deg)", transformOrigin: "top" }}
                initial={{ height: 0 }}
                animate={{ height: "120%" }}
                transition={{ delay: 0.7, duration: 0.5 }}
              />
              <motion.div 
                className="absolute h-full w-[2px] bg-gradient-to-b from-blue-500 to-purple-500"
                style={{ left: "40px", transform: "rotate(30deg)", transformOrigin: "top" }}
                initial={{ height: 0 }}
                animate={{ height: "120%" }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Space between Level 2 and Level 3 */}
        <div className="h-[30px] md:h-[35px]"></div>

        {/* Sonic Matrix Payment Info - Replaces level 3 and level 4 circles */}
        <div className="absolute top-[210px] md:top-[240px] w-full">
          <div className="w-full px-4 pb-2">
            {/* Payment Information */}
            <div className="mb-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg text-sm md:text-base font-bold text-white mb-4"
              >
                100% PAYOUT SYSTEM
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.3, duration: 0.5 }}
                  className="bg-gray-800/80 rounded-xl border border-blue-500/30 p-5 shadow-lg"
                >
                  <h4 className="text-lg md:text-xl font-bold text-blue-400 mb-3">ODD Referral Income</h4>
                  <ul className="text-left text-sm md:text-base space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-500/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                      </div>
                      <span className="text-gray-200">
                        <span className="text-blue-300 font-semibold">100%</span> payout on all ODD referrals
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-500/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                      </div>
                      <span className="text-gray-200">
                        Simple <span className="text-blue-300 font-semibold">ODD/EVEN</span> distribution system
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-500/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                      </div>
                      <span className="text-gray-200">
                        Every <span className="text-blue-300 font-semibold">1st, 3rd, 5th, etc.</span> referral is ODD
                      </span>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                  className="bg-gray-800/80 rounded-xl border border-purple-500/30 p-5 shadow-lg"
                >
                  <h4 className="text-lg md:text-xl font-bold text-purple-400 mb-3">EVEN Referral Commissions</h4>
                  <ul className="text-left text-sm md:text-base space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-purple-500/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-200">
                        <span className="text-purple-300 font-semibold">25% commission</span> split among 4 people
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-purple-500/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-200">
                        Every <span className="text-purple-300 font-semibold">2nd, 4th, 6th, etc.</span> referral is EVEN
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-purple-500/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-200">
                        <span className="text-purple-300 font-semibold">4 people</span> each receive 25% commission
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>



        {/* Information about the Sonic matrix */}
        <motion.div 
          className="absolute top-[530px] md:top-[600px] lg:top-[620px] left-0 w-full text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <div className="p-6 md:p-8 bg-gray-800 rounded-xl border border-gray-700 max-w-3xl mx-auto shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Web3 Sonic System
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-300 mb-3 text-left">ODD/EVEN Distribution</h4>
                <ul className="text-left text-sm md:text-base space-y-3 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 bg-blue-500/20 p-1 rounded-full">
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    </div>
                    <div className="text-gray-200">
                      <span className="font-bold">ODD Positions</span>: 1st, 3rd, 5th referrals get <span className="font-bold text-blue-300">100% payout</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 bg-blue-500/20 p-1 rounded-full">
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    </div>
                    <div className="text-gray-200">
                      <span className="font-bold">EVEN Positions</span>: 2nd, 4th, 6th referrals split <span className="font-bold text-blue-300">25% × 4</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 bg-blue-500/20 p-1 rounded-full">
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    </div>
                    <div className="text-gray-200">
                      Automatically <span className="font-bold text-blue-300">tracks and distributes</span> payments based on position
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3 text-left">4 Upline Distribution</h4>
                <ul className="text-left text-sm md:text-base space-y-3 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 bg-purple-500/20 p-1 rounded-full">
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <div className="text-gray-200">
                      <span className="font-bold text-purple-300">Upline 1:</span> Direct sponsor receives 25% commission
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 bg-purple-500/20 p-1 rounded-full">
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <div className="text-gray-200">
                      <span className="font-bold text-purple-300">Upline 2:</span> Second level upline receives 25% commission
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1 bg-purple-500/20 p-1 rounded-full">
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <div className="text-gray-200">
                      <span className="font-bold text-purple-300">Upline 3 & 4:</span> Third and fourth level uplines each get 25%
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <p className="font-medium text-blue-200">
                  Web3 Sonic features 10 membership levels starting at 5S and doubling at each level (5S, 10S, 20S, etc.) with an ODD/EVEN system that provides 100% payout on ODD referrals and 25% split among 4 upline levels for EVEN referrals!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MatrixVisualization;