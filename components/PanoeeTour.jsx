'use client';

import { useEffect, useRef } from 'react';

// 360° virtual tour embed (Panoee). Also passes phone motion to the tour so
// "move your phone to look around" works.
const TOUR_ORIGIN = 'https://tour.panoee.net';
const TOUR_URL =
  'https://tour.panoee.net/iframe/6acbb721bbd7eb16f9cffb47?embedFullscreen=1&embedVr=1&embedGyro=1';

const pick = (v, keys) => {
  if (!v) return null;
  const out = {};
  keys.forEach((k) => { out[k] = typeof v[k] === 'number' ? v[k] : null; });
  return out;
};

export default function PanoeeTour() {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let ready = false;
    const onLoad = () => { ready = true; };
    frame.addEventListener('load', onLoad);

    const send = (payload) => {
      try { frame.contentWindow?.postMessage(payload, TOUR_ORIGIN); } catch (e) {}
    };

    const onMessage = (ev) => {
      if (!ready || !ev.data || ev.data.type !== 'devicemotion') return;
      if (ev.source !== window.parent) return;
      send(ev.data);
    };

    const onMotion = (e) => {
      if (!ready) return;
      send({
        type: 'devicemotion',
        deviceMotionEvent: {
          acceleration: pick(e.acceleration, ['x', 'y', 'z']),
          accelerationIncludingGravity: pick(e.accelerationIncludingGravity, ['x', 'y', 'z']),
          rotationRate: pick(e.rotationRate, ['alpha', 'beta', 'gamma']),
          interval: typeof e.interval === 'number' ? e.interval : 0,
          timeStamp: e.timeStamp,
        },
      });
    };

    window.addEventListener('message', onMessage);
    window.addEventListener('devicemotion', onMotion, { passive: true });
    return () => {
      frame.removeEventListener('load', onLoad);
      window.removeEventListener('message', onMessage);
      window.removeEventListener('devicemotion', onMotion);
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      id="tour-embedded"
      title="360° view of Oka Resorts"
      src={TOUR_URL}
      loading="eager"
      scrolling="no"
      allow="autoplay; accelerometer; gyroscope; fullscreen; xr-spatial-tracking"
    />
  );
}
