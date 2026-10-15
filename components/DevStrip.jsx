import Image from 'next/image';

export default function DevStrip() {
  return (
    <>
      <div className="dev-strip">
        <div className="wrap dev-strip-inner">
          <div className="dev-strip-text">
            <span className="dev-name">Oka Resorts</span>
            <span className="dev-by">By Amitha Developers</span>
          </div>
          <Image className="dev-strip-logo" src="/images/amita-developers-logo.png" alt="Amitha Developers" width={700} height={148} sizes="(max-width: 720px) 105px, 153px" />
        </div>
      </div>
    </>
  );
}