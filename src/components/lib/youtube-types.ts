/**
 * Global TypeScript declarations for the YouTube API
 * This ensures consistent type definitions across the application
 */

declare global {
    interface Window {
      onYouTubeIframeAPIReady: () => void;
      player: any;
      YT: any; // YouTube API global object
    }
  }
  
  // This prevents TypeScript errors when importing the file
  export {};