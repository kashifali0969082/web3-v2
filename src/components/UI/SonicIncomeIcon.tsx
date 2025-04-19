import React from 'react';

interface SonicIncomeIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function SonicIncomeIcon({ 
  className = "", 
  width = 24, 
  height = 24 
}: SonicIncomeIconProps) {
  return (
    <img 
    //   src="/sonic-income-icon.png" 
      alt="Sonic Income" 
      className={className}
      width={width}
      height={height}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        objectFit: 'contain'
      }}
    />
  );
}