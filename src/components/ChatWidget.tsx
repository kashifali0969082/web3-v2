import  { useEffect } from 'react';

export const ChatWidget = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.setAttribute('data-resources-url', "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    script.setAttribute('data-widget-id', "66e8ffd72cf62d0652a37e3f");
    script.async = true;
    
    // Add the script to the document
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default ChatWidget;