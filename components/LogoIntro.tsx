"use client";

import { useEffect, useState } from "react";
import { preload } from "react-dom";
import AnimatedLogoMark from "./AnimatedLogoMark";

export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  preload("/do-well-logo.png", { as: "image" });

  useEffect(() => {
    // CSS also dismisses the intro without JavaScript. This covers hydration
    // arriving after animationend or a browser cancelling the animation.
    const timeout = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return <div className="logo-intro" aria-hidden="true" onAnimationEnd={(event) => {
    if (event.target === event.currentTarget && event.animationName === "logo-intro-leave") setVisible(false);
  }}>
    <div className="logo-intro__aura" />
    <div className="logo-intro__body">
      <div className="logo-intro__glass">
        <span className="logo-intro__refraction" />
        <AnimatedLogoMark />
      </div>
      <span className="logo-intro__caption">STRENGTH · MINDFULNESS · RECOVERY</span>
    </div>
  </div>;
}
