import Image from "next/image";

export default function LogoIntro() {
  return <div className="logo-intro" aria-hidden="true">
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
