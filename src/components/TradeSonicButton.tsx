import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
import { Button } from './UI/button';
import { OpenOceanModal } from '@/components/OpenOceanModal';

interface TradeSonicButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

export function TradeSonicButton({ 
  className = "bg-blue-600 hover:bg-blue-500 text-white",
  variant = "default"
}: TradeSonicButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        className={className}
        // variant={variant}
        onClick={() => setIsModalOpen(true)}
      >
        Trade Sonic
      </Button>
      
      <OpenOceanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}