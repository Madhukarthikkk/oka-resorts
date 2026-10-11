'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const MIN_SHOW_MS = 1200; // minimum time the logo animation is visible

export default function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    let t1;
    const finish = () => {
      const wait = Math.max(0, MIN_SHOW_MS - (Date.now() - start));
      t1 = setTimeout(() => setDone(true), wait);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    // safety: never block the site for more than 6s
    const t2 = setTimeout(() => setDone(true), 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('load', finish);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, [done]);

  if (gone) return null;

  return (
    <div className={`oka-loader${done ? ' is-done' : ''}`} role="status" aria-label="Loading Oka Resorts">
      <div className="oka-loader__inner">
        <div className="oka-loader__logo">
          <Image src="/images/logo.png" alt="Oka Resorts" width={360} height={229} priority sizes="260px" />
          <span className="oka-loader__shine" />
        </div>
        <div className="oka-loader__bar"><span /></div>
      </div>

      <style>{`
        .oka-loader{
          position:fixed; inset:0; z-index:99999;
          display:flex; align-items:center; justify-content:center;
          background:#F4EFE2;
          transition:opacity .6s ease, visibility .6s ease;
          /* fallback if JS is off: hide itself after 4s */
          animation:okaLoaderOut .6s ease 4s forwards;
        }
        .oka-loader.is-done{ opacity:0; visibility:hidden; }
        .oka-loader__inner{ display:flex; flex-direction:column; align-items:center; gap:28px; padding:24px; }
        .oka-loader__logo{
          position:relative; overflow:hidden;
          width:min(260px, 62vw);
          opacity:0; transform:scale(.92) translateY(8px);
          animation:okaLogoIn .9s cubic-bezier(.2,.7,.2,1) .1s forwards, okaLogoPulse 2.2s ease-in-out 1s infinite;
        }
        .oka-loader__logo img{ display:block; width:100%; height:auto; }
        .oka-loader__shine{
          position:absolute; top:0; bottom:0; left:-60%; width:40%;
          background:linear-gradient(100deg, transparent, rgba(255,255,255,.65), transparent);
          transform:skewX(-18deg);
          animation:okaShine 1.8s ease-in-out .9s infinite;
          pointer-events:none;
        }
        .oka-loader__bar{
          width:min(180px, 46vw); height:2px; background:rgba(33,43,33,.12); overflow:hidden; border-radius:2px;
        }
        .oka-loader__bar span{
          display:block; height:100%; width:40%;
          background:linear-gradient(90deg, #2E5443, #C1622B);
          animation:okaBar 1.3s ease-in-out infinite;
        }
        @keyframes okaLogoIn{ to{ opacity:1; transform:scale(1) translateY(0); } }
        @keyframes okaLogoPulse{ 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.035); } }
        @keyframes okaShine{ 0%{ left:-60%; } 60%,100%{ left:130%; } }
        @keyframes okaBar{ 0%{ transform:translateX(-110%); } 100%{ transform:translateX(280%); } }
        @keyframes okaLoaderOut{ to{ opacity:0; visibility:hidden; } }
        @media (prefers-reduced-motion: reduce){
          .oka-loader__logo, .oka-loader__shine, .oka-loader__bar span{ animation:none; opacity:1; transform:none; }
        }
      `}</style>
    </div>
  );
}
