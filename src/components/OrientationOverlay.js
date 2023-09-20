import React, { useEffect, useState } from 'react';
import './OrientationOverlay.css'; 

export default function OrientationOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    function checkScreenOrientation() {
        setIsPortrait(window.innerHeight > window.innerWidth);
    }

    window.addEventListener('load', checkScreenOrientation);
    window.addEventListener('orientationchange', checkScreenOrientation);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('load', checkScreenOrientation);
      window.addEventListener('resize', checkScreenOrientation);
    };
  }, []);

  return (
    <div className={`orientation-overlay ${isPortrait ? 'show' : 'hide'}`}>
      <p>Please rotate your device to landscape mode to play the game.</p>
    </div>
  );
}