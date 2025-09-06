"use client";

import Image, { ImageLoaderProps } from 'next/image';

function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  // Inject Cloudinary transformations for auto format/quality and width limit.
  const q = quality || 75;
  // Replace the first '/upload/' with transformation string
  return src.replace('/upload/', `/upload/f_auto,q_${q},c_limit,w_${width},dpr_auto/`);
}

export default function CloudImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      loader={cloudinaryLoader}
      src={src}
      alt={alt}
      width={1200}
      height={800}
      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{ width: '100%', height: 'auto' }}
    />
  );
}
