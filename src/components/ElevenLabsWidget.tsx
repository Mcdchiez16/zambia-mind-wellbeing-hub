
import React, { useEffect } from 'react';

const ElevenLabsWidget = () => {
  useEffect(() => {
    // Check if the script is already loaded to avoid duplicates
    if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
    
    // If the element doesn't exist, create it
    if (!document.querySelector('elevenlabs-convai')) {
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', 'agent_01jvaxkhtkenmrd3zc7ysjb36m');
      document.body.appendChild(widget);
    }

    // Cleanup function to remove elements when component unmounts
    return () => {
      // We don't remove the script as it might be used by other components
      // But we can remove the widget element
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default ElevenLabsWidget;
