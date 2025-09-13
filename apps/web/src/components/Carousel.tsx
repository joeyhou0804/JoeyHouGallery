"use client";

import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Dir = 'rtl' | 'ltr';

interface CarouselProps {
  images: string[];
  speedPxPerSec?: number; // Optional: constant speed regardless of content width (default 80)
}

export default function Carousel({ images, speedPxPerSec = 80 }: CarouselProps) {
  const midpoint = Math.ceil(images.length / 2);
  const firstHalf = images.slice(0, midpoint);
  const secondHalf = images.slice(midpoint);

  const BackgroundZigZag = () => (
    <Box
      sx={(theme) => {
        const depth = { xs: 6, sm: 8, md: 10 };
        const steps = 120;
        const zig = (d: number) => `
          polygon(
            0% 0%,
            ${Array.from({ length: steps + 1 }, (_, i) => {
              const x = (i / steps) * 100;
              const y = i % 2 === 0 ? '0%' : `${d}px`;
              return `${x.toFixed(2)}% ${y}`;
            }).join(', ')},
            100% 0%, 100% calc(100% - ${d}px),
            ${Array.from({ length: steps + 1 }, (_, i) => {
              const x = ((steps - i) / steps) * 100;
              const y = i % 2 === 0 ? '100%' : `calc(100% - ${d}px)`;
              return `${x.toFixed(2)}% ${y}`;
            }).join(', ')},
            0% calc(100% - ${d}px), 0% 0%
          )
        `;

        return {
          position: 'absolute',
          top: '90px',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
          height: 'calc(100% - 90px + 200px)',
          zIndex: 1,
          '--stripe': `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(255, 255, 255, 0.3) 8px,
            rgba(255, 255, 255, 0.3) 16px
          )`,
          '--yellow': 'linear-gradient(to bottom, #BB8F43, #DFBF23)',
          backgroundImage: 'var(--stripe), var(--yellow)',
          backgroundRepeat: 'repeat, no-repeat',
          backgroundSize: 'auto, 100% 100%',
          backgroundPosition: 'left top, left top',
          [theme.breakpoints.up('xs')]: { paddingTop: `${depth.xs}px`, clipPath: zig(depth.xs) },
          [theme.breakpoints.up('sm')]: { paddingTop: `${depth.sm}px`, clipPath: zig(depth.sm) },
          [theme.breakpoints.up('md')]: { paddingTop: `${depth.md}px`, clipPath: zig(depth.md) },
        };
      }}
    />
  );

  return (
    <Box sx={{ position: 'relative', mt: 8, mb: 4 }}>
      <BackgroundZigZag />
      <CarouselRow images={firstHalf} direction="rtl" speedPxPerSec={speedPxPerSec} />
      <CarouselRow images={secondHalf} direction="ltr" speedPxPerSec={speedPxPerSec} />
    </Box>
  );
}

function CarouselRow({
  images,
  direction,
  speedPxPerSec = 80,
}: {
  images: string[];
  direction: 'rtl' | 'ltr';
  speedPxPerSec?: number;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCycleRef = useRef<HTMLDivElement | null>(null);

  const [viewportW, setViewportW] = useState(0);
  const [cycleW, setCycleW] = useState(0);
  const [gapPx, setGapPx] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) setViewportW(viewportRef.current.clientWidth);
      if (firstCycleRef.current) setCycleW(firstCycleRef.current.scrollWidth);
      if (trackRef.current && typeof window !== 'undefined') {
        const cs = getComputedStyle(trackRef.current);
        const g =
          parseFloat((cs as any).columnGap || (cs as any).gap || '0') || 0;
        setGapPx(g);
      }
    };

    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (firstCycleRef.current) ro.observe(firstCycleRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    requestAnimationFrame(measure);
    return () => ro.disconnect();
  }, [images]);

  const repeats = useMemo(() => {
    if (!cycleW || !viewportW) return 3;
    const need = (viewportW * 2.2) / cycleW; // small buffer beyond 2×
    return Math.max(3, Math.ceil(need));
  }, [cycleW, viewportW]);

  const translatePx = Math.max(1, cycleW + gapPx);
  const durationSec = Math.max(1, translatePx / speedPxPerSec);

  const scrollKeyframes =
    direction === 'rtl'
      ? keyframes`
          from { transform: translateX(0); }
          to   { transform: translateX(-${translatePx}px); }
        `
      : keyframes`
          from { transform: translateX(-${translatePx}px); }
          to   { transform: translateX(0); }
        `;

  const Cycle = ({
    refCb,
    ariaHidden = false,
  }: {
    refCb?: (el: HTMLDivElement | null) => void;
    ariaHidden?: boolean;
  }) => (
    <Box
      ref={refCb}
      aria-hidden={ariaHidden || undefined}
      sx={{
        display: 'flex',
        // ✅ gap between tiles inside a cycle
        gap: 'var(--g)',
      }}
    >
      {images.map((img, i) => (
        <Box key={`${i}-${ariaHidden ? 'dup' : 'main'}`} sx={{ minWidth: { xs: 200, sm: 240, md: 280 }, height: { xs: 120, sm: 150, md: 180 }, flexShrink: 0 }}>
          <img
            src={img}
            alt={ariaHidden ? '' : `Manipulation ${i + 1}`}
            aria-hidden={ariaHidden ? true : undefined}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 8,
              border: '6px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      ref={viewportRef}
      sx={{
        overflow: 'hidden',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        mb: 2,
        zIndex: 2,
      }}
    >
      <Box
        ref={trackRef}
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'stretch',
          width: 'max-content',
          // ✅ the same gap BETWEEN cycles (the seam)
          gap: 2,
          // expose the pixel value to children so inner cycles use the same exact gap
          '--g': typeof window !== 'undefined' && getComputedStyle(document.documentElement).fontSize
            ? // MUI spacing(2) ≈ 16px by default; use theme to compute precise px
              theme.spacing(2)
            : '16px',
          animation: `${scrollKeyframes} ${durationSec}s linear infinite`,
          willChange: 'transform',
        })}
      >
        <Cycle refCb={(el) => (firstCycleRef.current = el)} />
        {Array.from({ length: repeats - 1 }).map((_, idx) => (
          <Cycle key={`dup-${idx}`} ariaHidden />
        ))}
      </Box>
    </Box>
  );
}
