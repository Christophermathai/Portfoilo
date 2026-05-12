"use client";

import { useEffect, useRef, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Animate progress to 100 over ~700ms using easing
    const DURATION = 700;
    const start = performance.now();

    const raf = requestAnimationFrame(function tick(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // Progress hit 100 — brief pause then exit
        const t1 = setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => onCompleteRef.current(), 300);
        }, 150);
        const t2 = setTimeout(() => setIsHidden(true), 1150);
        return () => { clearTimeout(t1); clearTimeout(t2); };
      }
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  if (isHidden) return null;

  return (
    <div className={`loader-overlay ${isFadingOut ? "loader-exit" : ""}`}>
      <div className="loader-content">
        <div className="loader-logo">CM</div>
        <div className="loader-progress">
          <div className="loader-progress-text">{progress}%</div>
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
