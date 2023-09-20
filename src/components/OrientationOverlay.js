import React, { useEffect, useState } from 'react';
import './OrientationOverlay.css'; 

export default function OrientationOverlay() {
    const [isPortrait, setIsPortrait] = useState(
        window.matchMedia('(orientation: portrait)').matches
    );
    
    useEffect(() => {
        // Function to handle orientation change
        function checkOrientation(event) {
          setIsPortrait(event.matches);
        }
    
        // Add event listener for orientation change
        const orientationListener = window.matchMedia('(orientation: portrait)');
        orientationListener.addListener(checkOrientation);
    
        // Clean up event listener on unmount
        return () => {
          orientationListener.removeListener(checkOrientation);
        };
    }, []);

  return (
    <div className={`orientation-overlay ${isPortrait ? 'show' : 'hide'}`}>
      <p>Please rotate your device to landscape mode to play the game.</p>
    </div>
  );
}