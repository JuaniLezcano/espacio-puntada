"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxGalleryProps {
  images: LightboxImage[];
  layout?: "hero" | "grid";
}

export function LightboxGallery({ images, layout = "grid" }: LightboxGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const [hero, ...rest] = images;
  const thumbnails = layout === "hero" ? rest : images;

  return (
    <div>
      {layout === "hero" && (
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          aria-label={`Ampliar foto: ${hero.alt}`}
          className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl"
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform hover:scale-105"
          />
        </button>
      )}

      {thumbnails.length > 0 && (
        <div
          className={
            layout === "hero" ? "mt-4 grid grid-cols-2 gap-4" : "grid grid-cols-2 gap-4"
          }
        >
          {thumbnails.map((img, i) => {
            const realIndex = layout === "hero" ? i + 1 : i;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setOpenIndex(realIndex)}
                aria-label={`Ampliar foto: ${img.alt}`}
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      )}

      {openIndex !== null &&
        createPortal(
          <LightboxOverlay
            images={images}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onIndexChange={setOpenIndex}
          />,
          document.body
        )}
    </div>
  );
}

function LightboxOverlay({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [index, images.length, onClose, onIndexChange]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-foreground/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded-full text-3xl leading-none text-background hover:bg-background/10 sm:right-4 sm:top-4"
      >
        ×
      </button>

      {images.length > 1 && (
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange((index - 1 + images.length) % images.length);
          }}
          className="absolute left-1 flex h-12 w-12 items-center justify-center rounded-full text-4xl text-background hover:bg-background/10 sm:left-4"
        >
          ‹
        </button>
      )}

      <div
        className="relative aspect-[4/3] w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
      </div>

      {current.caption && (
        <p className="text-center text-sm text-background/80">{current.caption}</p>
      )}

      {images.length > 1 && (
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange((index + 1) % images.length);
          }}
          className="absolute right-1 flex h-12 w-12 items-center justify-center rounded-full text-4xl text-background hover:bg-background/10 sm:right-4"
        >
          ›
        </button>
      )}
    </div>
  );
}
