import React, { useEffect, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./UI/dialog";
import { X as XIcon } from "lucide-react";
// import { Button } from '@/components/ui/button';
import { Button } from "./UI/button";
interface OpenOceanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OpenOceanModal({ isOpen, onClose }: OpenOceanModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load OpenOcean widget when modal opens
  useEffect(() => {
    if (isOpen && iframeRef.current) {
      // Set widget src when modal is opened
      iframeRef.current.src =
        "https://widget.openocean.finance?p=JTIzMTcxMjJCJTI0KiUyNCUyMzIyMjAzNyUyNColMjQlMjMxNzEyMmIlMjQqJTI0JTIzMjkyNzNEJTI0KiUyNCUyM2ZmZiUyNColMjQlMjM4QzdGOEMlMjQqJTI0JTIzRjhBRTEwJTI0KiUyNCUyM2ZmZmZmZiUyNColMjQlMjMzMzMxNDclMjQqJTI0JTIzYjFhN2IxJTI0KiUyNCUyMzQ3OWE0YiUyNColMjQlMjNGN0IyMjklMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0V2ViMyUyMEJUQyUyNColMjQweENlNzM3QTEzNTJBNUZlNDYyNjkyOWJiNTc0N0M1NWEwMkRDMzA3YjklMjQqJTI0MSUyNColMjRzb25pYyUyNColMjRTJTI0KiUyNFVTREMuZSUyNColMjQ=";
    }
  }, [isOpen]);

  // Handle closing properly
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0 bg-transparent border-0">
        <div className="bg-gray-900 border border-blue-800 rounded-t-lg">
          <DialogHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-blue-300">
                Trade Sonic Token
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full h-8 w-8"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            <DialogDescription className="text-blue-300/70">
              Powered by OpenOcean - Cross-Chain DEX Aggregator
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="bg-gray-900 border-x border-blue-800 overflow-hidden h-[70vh]">
          <iframe
            ref={iframeRef}
            title="OpenOcean DEX"
            className="w-full h-full"
            style={{ border: "none" }}
            allow="clipboard-read; clipboard-write"
            src={
              isOpen
                ? "https://widget.openocean.finance?p=JTIzMTcxMjJCJTI0KiUyNCUyMzIyMjAzNyUyNColMjQlMjMxNzEyMmIlMjQqJTI0JTIzMjkyNzNEJTI0KiUyNCUyM2ZmZiUyNColMjQlMjM4QzdGOEMlMjQqJTI0JTIzRjhBRTEwJTI0KiUyNCUyM2ZmZmZmZiUyNColMjQlMjMzMzMxNDclMjQqJTI0JTIzYjFhN2IxJTI0KiUyNCUyMzQ3OWE0YiUyNColMjQlMjNGN0IyMjklMjQqJTI0T3Blbk9jZWFuJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0V2ViMyUyMEJUQyUyNColMjQweENlNzM3QTEzNTJBNUZlNDYyNjkyOWJiNTc0N0M1NWEwMkRDMzA3YjklMjQqJTI0MSUyNColMjRzb25pYyUyNColMjRTJTI0KiUyNFVTREMuZSUyNColMjQ="
                : ""
            }
          />
        </div>

        <div className="bg-gray-900 border border-blue-800 rounded-b-lg p-3 text-center text-xs text-gray-400">
          OpenOcean aggregates liquidity across DEXs to find you the best price
        </div>
      </DialogContent>
    </Dialog>
  );
}
