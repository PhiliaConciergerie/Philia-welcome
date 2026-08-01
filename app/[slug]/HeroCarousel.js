'use client';

import { useEffect, useRef, useState } from 'react';

function lienMaps(adresse) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(adresse);
}

export default function HeroCarousel({ photos, nom, adresse }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const count = photos ? photos.length : 0;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [count]);

  function onTouchStart(e) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 40) setIndex((i) => (i - 1 + count) % count);
    else if (dx < -40) setIndex((i) => (i + 1) % count);
    touchX.current = null;
  }

  return (
    <div className="hero" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {count > 0 && (
        <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {photos.map((src, i) => (
            <div className="hero-slide" key={src}>
              <img src={src} alt={nom} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>
      )}
      <div className="hero-content">
        <div className="hero-eyebrow">Votre séjour</div>
        <h1 className="hero-title">{nom}</h1>
        {adresse && (
          <a className="hero-addr" href={lienMaps(adresse)} target="_blank" rel="noopener noreferrer">
            {adresse}
          </a>
        )}
      </div>
      {count > 1 && (
        <div className="hero-dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={'hero-dot' + (i === index ? ' active' : '')}
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
