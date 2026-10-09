import { useId } from "react";

// Keep the original silhouettes instead of redrawing the brand mark.
// All animated parts share one cached image and return to its original pose.
export default function AnimatedLogoMark() {
  const id = useId();
  const artwork = `${id}-artwork`;
  const parts = ["head", "arm-left", "arm-raised", "body", "leg-long", "leg-short"];

  return <svg className="logo-intro__mark" viewBox="0 0 1200 500" aria-hidden="true" focusable="false">
    <defs>
      <filter id={`${id}-ink`} colorInterpolationFilters="sRGB">
        {/* Knock out the white canvas while retaining antialiased edges and
            the logo's rust ink (#974c2c), so moving parts have no white boxes. */}
        <feColorMatrix type="matrix" values="0 0 0 0 .592157  0 0 0 0 .298039  0 0 0 0 .172549  0 0 -1.208531 0 1.208531" />
      </filter>
      <image id={artwork} href="/do-well-logo.png" width="1200" height="500" filter={`url(#${id}-ink)`} />
      <clipPath id={`${id}-wordmark`}>
        <rect x="90" y="150" width="122" height="170" />
        <ellipse cx="274" cy="259" rx="57" ry="57" />
        <rect x="459" y="199" width="270" height="120" />
        <rect x="732" y="151" width="78" height="168" />
        <rect x="825" y="239" width="287" height="80" />
      </clipPath>
      <clipPath id={`${id}-head`}><circle cx="390" cy="150" r="31" /></clipPath>
      <clipPath id={`${id}-arm-left`}><polygon points="307,165 389,193 381,223 296,192" /></clipPath>
      <clipPath id={`${id}-arm-raised`}><rect x="432" y="87" width="82" height="97" /></clipPath>
      <clipPath id={`${id}-body`}><rect x="389" y="184" width="63" height="70" /></clipPath>
      <clipPath id={`${id}-leg-long`}><polygon points="366,238 403,252 296,417 257,399" /></clipPath>
      <clipPath id={`${id}-leg-short`}><polygon points="414,254 448,266 415,328 383,315" /></clipPath>
    </defs>
    <use href={`#${artwork}`} clipPath={`url(#${id}-wordmark)`} />
    {parts.map((part) => <g key={part} className={`logo-intro__figure logo-intro__figure--${part}`}>
      <use href={`#${artwork}`} clipPath={`url(#${id}-${part})`} />
    </g>)}
  </svg>;
}
