import React, { useEffect, useRef, useState } from 'react';

interface SonicChartProps {
  symbol?: string;
  interval?: string;
  height?: number | string;
  width?: string;
  className?: string;
  showFullChart?: boolean; // Additional prop for showing advanced chart
}

/**
 * Advanced SonicChart component - Renders a TradingView chart with advanced indicators
 * Enhanced version with professional indicators and drawing tools
 */
export function SonicChart({
  symbol = 'KUCOIN:SUSDT', // Using KuCoin SUSDT for Sonic S token by default
  interval = 'D',
  height = 320,
  width = '100%',
  className = '',
  showFullChart = false
}: SonicChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  // Generate a stable ID for the container that won't change on re-renders
  const containerId = useRef(`tradingview_${Math.random().toString(36).substring(7)}`).current;

  useEffect(() => {
    // Only load the script once
    if (scriptLoaded) return;
    
    // Check if TradingView script is already loaded
    if (typeof window.TradingView !== 'undefined') {
      setScriptLoaded(true);
      return;
    }
    
    const script = document.createElement('script');
    script.id = 'tradingview-widget-script';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    
    script.onload = () => {
      setScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load TradingView script');
      setHasError(true);
      setIsLoading(false);
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Don't remove the script on component unmount as other charts may need it
    };
  }, []);

  // Create the TradingView widget when the script is loaded and whenever symbol/interval changes
  useEffect(() => {
    if (!scriptLoaded || !container.current) return;
    
    setIsLoading(true);
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        // Clear container first
        if (container.current) {
          container.current.innerHTML = '';
        }
        
        // Define common studies/indicators for the advanced chart
        const advancedStudies = [
          "RSI@tv-basicstudies",
          "MACD@tv-basicstudies",
          "StochasticRSI@tv-basicstudies",
          "AwesomeOscillator@tv-basicstudies",
          "VolumePressure@tv-volumebyprice"
        ];
        
        // Define chart type based on whether we're showing the basic or advanced version
        const chartConfig = showFullChart ? {
          // Advanced chart settings
          theme: "dark",
          style: "1", // Candlestick chart
          toolbar_bg: "#1E1E2D",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_side_toolbar: false,
          withdateranges: true,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          studies: advancedStudies,
          show_popup_button: true,
          popup_width: "1200",
          popup_height: "800",
          // Enable drawing tools and extended features
          drawings_access: { type: 'all', tools: [ { name: "Regression Trend" } ] },
          saved_data: { 
            fibonacci_drag_lines: true,
            fibonacci_trend_extension: true,
            pitchfork_auto: true,
            gann_fan_auto: true
          },
          // Enable extended features
          timeframes: [
            { text: "1D", resolution: "D", description: "1 Day" },
            { text: "1W", resolution: "W", description: "1 Week" },
            { text: "1M", resolution: "M", description: "1 Month" }
          ],
          // Drawing and tool buttons
          left_toolbar: true,
          hide_legend: false,
          bottom_toolbar: true,
          // Enable more standard features
          enabled_features: [
            "use_localstorage_for_settings",
            "same_data_requery",
            "side_toolbar_in_fullscreen_mode",
            "legend_context_menu",
            "header_settings",
            "header_chart_type",
            "header_indicators",
            "header_compare",
            "header_screenshot",
            "header_fullscreen_button",
            "header_widget_dom_node",
            "display_market_status",
            "remove_library_container_border"
          ],
          disabled_features: []
        } : {
          // Basic chart settings for smaller views
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#121722",
          enable_publishing: false,
          hide_top_toolbar: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          studies: ["RSI@tv-basicstudies"],
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          save_image: false,
          enabled_features: ["use_localstorage_for_settings"],
          disabled_features: ["header_symbol_search", "header_saveload"]
        };
        
        // Create the widget with merged configuration
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: interval,
          timezone: "Etc/UTC",
          container_id: containerId,
          backgroundColor: "#1a1a1a",
          gridColor: "#232323",
          height: "100%",
          width: "100%",
          ...chartConfig
        });
        
        setIsLoading(false);
        setHasError(false);
        // console.log('TradingView chart created successfully');
      } catch (error) {
        console.error('Error creating TradingView widget:', error);
        setHasError(true);
        setIsLoading(false);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [symbol, interval, containerId, scriptLoaded, showFullChart]);

  return (
    <div className={`sonic-chart-container ${className}`} style={{ height, position: 'relative' }}>
      {isLoading && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#1a1a1a' 
        }}>
          <div>Loading chart...</div>
        </div>
      )}
      
      {hasError && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: '#ff5555'
        }}>
          <div>Unable to load chart. Please try again later.</div>
        </div>
      )}
      
      <div 
        id={containerId} 
        style={{ 
          width, 
          height: '100%',
          minHeight: typeof height === 'number' ? `${height}px` : height, 
          position: 'relative',
          visibility: isLoading ? 'hidden' : 'visible'
        }} 
        ref={container}
      />
    </div>
  );
}

declare global {
  interface Window {
    TradingView: any;
  }
}