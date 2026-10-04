"use client";

import Image from "next/image";
import { useState } from "react";

export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return <div className="logo-intro" aria-hidden="true" onAnimationEnd={(event) => {
    if (event.target === event.currentTarget && event.animationName === "logo-intro-leave") setVisible(false);
  }}>
    <div className="logo-intro__aura" />
    <div className="logo-intro__body">
      <div className="logo-intro__glass">
        <span className="logo-intro__refraction" />
        <Image src="/do-well-logo.png" alt="" width={360} height={150} priority />
      </div>
      <span className="logo-intro__caption">STRENGTH · MINDFULNESS · RECOVERY</span>
    </div>
  </div>;
}
