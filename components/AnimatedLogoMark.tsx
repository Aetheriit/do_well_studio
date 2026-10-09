import { logoFigurePaths, logoWordmarkPath } from "./logo-artwork";

// Inline vectors appear with the page itself: no image-loading delay or filters.
export default function AnimatedLogoMark() {
  return <svg className="logo-intro__mark" viewBox="0 0 1200 500" fill="#974c2c" fillRule="evenodd" aria-hidden="true" focusable="false">
    <path d={logoWordmarkPath} />
    {Object.entries(logoFigurePaths).map(([part, path]) => <g key={part} className={`logo-intro__figure logo-intro__figure--${part}`}>
      <path d={path} />
    </g>)}
  </svg>;
}
