import React, { useEffect, useState } from 'react';
import './OrientationOverlay.css'; 

export default function OrientationOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    function checkScreenOrientation() {
      const currentOrientation = window.screen.orientation.type;
      setIsPortrait(currentOrientation.includes('portrait'));
    }

    window.addEventListener('load', checkScreenOrientation);
    window.addEventListener('orientationchange', checkScreenOrientation);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('load', checkScreenOrientation);
      window.removeEventListener('orientationchange', checkScreenOrientation);
    };
  }, []);

  return (
    <div className={`orientation-overlay ${isPortrait ? 'show' : 'hide'}`}>
      <p style={{fontSize: '3vw'}}>Please rotate your device to landscape mode to play the game.</p>
    </div>
  );
}