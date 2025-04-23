"use client"
import React, { useState, useRef, useEffect } from "react";
// import { Button } from '@/components/ui/button';
import { Button } from "@/components/UI/button";
// import { useLocation } from 'wouter';
// import
// import { useWeb3 } from '@/lib/Web3Provider';
import { Badge } from "@/components/UI/badge";
// import { Badge } from '@/components/ui/badge';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Video as VideoIcon,
  Volume2,
  VolumeX,
  ArrowRight,
  Maximize,
  RefreshCw,
  Share2,
  Zap,
  PlayCircle,
} from "lucide-react";
// import { toast } from '@/hooks/use-toast';
// Import YouTube types from shared type definitions
// import "@/lib/youtube-types";

const LiveStreamPage = () => {
    //   const { address } = useWeb3();
    const [isMuted, setIsMuted] = useState(false);
    
    // Online users count for the stream
    const [onlineUsers, setOnlineUsers] = useState(0);
    
    // YouTube video ID for the livestream
    const youtubeVideoId = "B520Br7b_uU";
    const router = useRouter();

  // Define the authorized host wallet address
//   const AUTHORIZED_HOST_ADDRESS = "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9";

  // Check if the current user is the authorized host
  //   const isAuthorizedHost = address?.toLowerCase() === AUTHORIZED_HOST_ADDRESS.toLowerCase();

  // Reference to the main video player
  const mainVideoRef = useRef<HTMLIFrameElement>(null);

  // Function to toggle mute state for the main video player only
  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);

    // Control the main video player's audio
    if (mainVideoRef.current) {
      try {
        const iframe = mainVideoRef.current;
        const message = JSON.stringify({
          event: "command",
          func: newMuteState ? "mute" : "unMute",
          args: "",
        });

        iframe.contentWindow?.postMessage(message, "*");
      } catch (error) {
        console.error("Error toggling mute for main video:", error);
      }
    }

    // Show notification
    // toast({
    //   title: newMuteState ? "Video Audio Muted" : "Video Audio Unmuted",
    //   description: newMuteState
    //     ? "Explainer video audio is now muted"
    //     : "Explainer video audio is now playing",
    //   duration: 2000,
    // });
  };

  // Initialize component and handle YouTube API
  useEffect(() => {
    // Set random online users for demo (3-15 viewers)
    setOnlineUsers(Math.floor(Math.random() * 12) + 3);

    // This function will help communicate with the dashboard audio player if it exists
    const attemptToPauseDashboardPlayer = () => {
      try {
        // Find any existing YouTube player on the page (from dashboard)
        const dashboardYouTubePlayer = document.querySelector(
          'iframe[src*="youtube.com/embed"]'
        ) as HTMLIFrameElement;
        if (
          dashboardYouTubePlayer &&
          dashboardYouTubePlayer.id !== "main-video-player"
        ) {
          // If found, try to pause it
          dashboardYouTubePlayer.contentWindow?.postMessage(
            JSON.stringify({
              event: "command",
              func: "pauseVideo",
              args: "",
            }),
            "*"
          );

          console.log("Attempted to pause dashboard YouTube player");
        }
      } catch (error) {
        console.error("Error attempting to pause dashboard player:", error);
      }
    };

    // Attempt to pause any existing YouTube player
    attemptToPauseDashboardPlayer();

    // Set up message listener for YouTube API responses
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;

      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data.event === "onReady") {
          console.log("YouTube player ready on LiveStream page");
        }
      } catch (error) {
        // Ignore parsing errors
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col">
      {/* Top navigation bar with OmniMiner styling */}
      <header className="px-4 py-3 border-b border-[#00a3ff]/20 bg-gray-900/90 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="mr-2 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <VideoIcon className="h-5 w-5 mr-2 text-blue-400" />
              <h1 className="text-xl font-bold hidden sm:inline bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text text-transparent">
                Bitcoin Explainer Stream
              </h1>
              <Badge
                variant="outline"
                className="bg-blue-500/20 text-blue-400 border-blue-500/30 ml-2 animate-pulse"
              >
                LIVE
              </Badge>
              <span className="text-gray-400 text-sm ml-2 hidden md:inline">
                {onlineUsers} viewers • Hosted by{" "}
                <span className="bg-gradient-to-r from-[#00a3ff] to-[#f97316] bg-clip-text text-transparent">
                  Sonic Matrix
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Audio status indicator with OmniMiner styling */}
            <div className="flex items-center mr-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  isMuted ? "bg-gray-500" : "bg-blue-500 animate-pulse"
                } mr-1`}
              ></div>
              <span className="text-xs text-gray-400 hidden sm:inline">
                {isMuted ? "Audio Off" : "Audio On"}
              </span>
            </div>

            {/* Audio mute/unmute toggle with OmniMiner styling */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className={`${
                isMuted ? "text-gray-400" : "text-blue-400"
              } hover:bg-blue-500/10 hover:text-blue-300 transition-colors`}
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>

            {/* Navigation buttons with OmniMiner styling */}
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main content area with full-width video stream */}
      <main className="flex-1 flex flex-col">
        {/* Full-width video player section with OmniMiner styling */}
        <div className="w-full bg-gray-900 py-4">
          <div className="container mx-auto px-4">
            <motion.div
              className="relative w-full aspect-video overflow-hidden rounded-lg border border-[#00a3ff]/30 shadow-lg shadow-blue-900/10 group"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated Border Effect */}
              <div className="absolute inset-[-1px] z-10 rounded-lg border border-[#00a3ff]/20 group-hover:border-[#00a3ff]/40 transition-colors duration-500 pointer-events-none"></div>

              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00a3ff]/5 via-transparent to-[#f97316]/5 opacity-50 group-hover:opacity-70 transition-opacity duration-1000"></div>

              <iframe
                ref={mainVideoRef}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&enablejsapi=1&modestbranding=1&rel=0&color=white&showinfo=0&fs=1&playsinline=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg z-20"
                id="main-video-player"
              ></iframe>

              {/* Loading overlay with OmniMiner styling */}
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-r from-gray-900/70 via-gray-900/60 to-gray-900/70 pointer-events-none opacity-0">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
              </div>

              {/* Play Button Overlay - visible when paused (could be implemented with YouTube API events) */}
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0">
                <PlayCircle className="h-24 w-24 text-[#00a3ff] opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video controls section with OmniMiner styling */}
        <div className="bg-gray-900 border-t border-[#00a3ff]/10 py-3">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-2`}
              ></div>
              <span className="text-sm bg-gradient-to-r from-[#00a3ff] to-[#36a2ff] bg-clip-text text-transparent font-medium">
                Live Now
              </span>
              <span className="text-xs text-gray-400 ml-2 hidden md:inline">
                {onlineUsers} viewers
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className={`hover:bg-blue-500/10 ${
                  !isMuted ? "text-blue-400" : "text-gray-400"
                } hover:text-blue-300 transition-colors`}
              >
                {isMuted ? (
                  <Volume2 className="h-4 w-4 mr-1" />
                ) : (
                  <VolumeX className="h-4 w-4 mr-1" />
                )}
                <span className="hidden sm:inline">
                  {isMuted ? "Unmute" : "Mute"}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors"
                onClick={() => {
                  toast.warn("Refreshing Stream");
                  // Reload the current page to refresh the stream
                  window.location.reload();
                }}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors"
                onClick={() => {
                  // Copy the stream URL to clipboard
                  navigator.clipboard.writeText(
                    `https://www.youtube.com/live/${youtubeVideoId}`
                  );
                  toast.success("Link Copied");
                }}
              >
                <Share2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Share</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors"
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/live/${youtubeVideoId}`,
                    "_blank"
                  )
                }
              >
                <ArrowRight className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">YouTube</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors hidden md:flex"
                onClick={() => {
                  // Request full screen for the video container
                  const videoContainer =
                    document.querySelector(".aspect-video");
                  if (videoContainer instanceof HTMLElement) {
                    if (videoContainer.requestFullscreen) {
                      videoContainer.requestFullscreen();
                    }
                  }
                }}
              >
                <Maximize className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Fullscreen</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stream info section with OmniMiner styling */}
        <div className="container mx-auto px-4 py-6">
          <div className="relative overflow-hidden rounded-lg border border-[#00a3ff]/10 bg-gray-800/50 p-5 shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00a3ff]/5 via-transparent to-[#f97316]/5 opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#f97316] bg-clip-text text-transparent">
                Bitcoin Explainer Stream
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Learn about Bitcoin technology, self-custody and the future of
                finance with our Bitcoin explainer series.
                <span className="hidden md:inline">
                  {" "}
                  Watch live sessions and join our community for the latest
                  insights.
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer
          toastStyle={{
            borderRadius: "0px", // Coins carrés
          }}
          theme="dark"
        />
        {/* Background audio has been removed from LiveStreamPage */}
      </main>
    </div>
  );
};

export default LiveStreamPage;
