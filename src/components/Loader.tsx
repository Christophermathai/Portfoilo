"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const { progress } = useProgress();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      // Small delay to let the user see 100% and then trigger the slide out
      const t1 = setTimeout(() => {
        setIsFadingOut(true);
        // Trigger onComplete slightly after slide out starts so the card falls into view as the loader clears
        setTimeout(() => {
          onComplete();
        }, 300);
      }, 600);

      const t2 = setTimeout(() => {
        setIsHidden(true);
      }, 1600); // 600ms + 1s for animation to complete

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress, onComplete]);

  if (isHidden) return null;

  return (
    <div className={`loader-overlay ${isFadingOut ? 'loader-exit' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">CM</div>
        <div className="loader-progress">
          <div className="loader-progress-text">{Math.round(progress)}%</div>
          <div className="loader-progress-bar-bg">
            <div 
              className="loader-progress-bar-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
