'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Fades sections in as they scroll into view (skipped if the visitor prefers reduced motion).
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'));
    els.forEach((el) => el.classList.add('pre'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            e.target.classList.remove('pre');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    // safety net: never leave anything hidden
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal.pre').forEach((el) => {
        el.classList.remove('pre');
        el.classList.add('in');
      });
    }, 4000);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
