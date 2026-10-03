"use client";

import { AnimatedTopDock } from "@designcodeio/threeui/components/AnimatedTopDock";
import "@designcodeio/threeui/style.css";
import "./page.css";

export default function AnimatedTopDockPage() {
  return (
    <main className="threeui-command-page">
      <div className="shader-frame">
        <AnimatedTopDock
          variant="modern"
          proximity={122}
          spring={0.19}
          damping={0.70}
          widthGrowth={17}
          heightGrowth={16}
          drop={3.5}
        />
      </div>
    </main>
  );
}
