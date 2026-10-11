'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header>
      <div className="nav">
        <Link className="brand-logo" href="/" aria-label="Oka Resorts home" onClick={close}>
          <Image src="/images/logo.png" alt="Oka Resorts" width={360} height={229} priority sizes="100px" />
        </Link>
        <button
          type="button"
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
        <nav id="site-nav" className={'links' + (open ? ' open' : '')}>
          <a href="/#location" onClick={close}>Location</a>
          <a href="/#masterplan" onClick={close}>Master Plan</a>
          <a href="/#amenities" onClick={close}>Amenities</a>
          <Link href="/gallery" onClick={close}>Gallery</Link>
          <Link href="/360-view" onClick={close}>360&deg; View</Link>
          <a href="/#contact" className="btn btn-solid" onClick={close}>Enquire</a>
        </nav>
      </div>
    </header>
  );
}
