"use client";

import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { useAtom } from 'jotai';
import { languageAtom, Language } from '@joey/atoms';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

// ------------------------------
// Config
// ------------------------------
const sections = [
  { href: '/apps', labelKey: 'sectionsLabels.applications', buttonIndex: 1 },
  { href: '/arts', labelKey: 'sectionsLabels.arts', buttonIndex: 2 },
  { href: '/handbooks', labelKey: 'sectionsLabels.handbooks', buttonIndex: 3 },
  { href: '/posters', labelKey: 'sectionsLabels.posters', buttonIndex: 4 },
  { href: '/reports', labelKey: 'sectionsLabels.reports', buttonIndex: 5 },
  { href: '/videos', labelKey: 'sectionsLabels.videos', buttonIndex: 6 },
  { href: '/websites', labelKey: 'sectionsLabels.websites', buttonIndex: 7 }
];

// Layout tunables
const CLUSTER_W = 296;
const LOGO_MIN = 320;
const LOGO_MAX = 600;
const EDGE_MIN = 80;
const INNER_MAX = 'clamp(8px, 2vw, 40px)';

// Animation tunables
const DURATION_MS = 520;
const STAGGER_MS = 90;
const EASE = 'cubic-bezier(.2,.7,.2,1)';

// ------------------------------
// Prefers-reduced-motion + reveal-once
// ------------------------------
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

function useRevealOnce<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15, ...(options || {}) }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return { ref, visible };
}

function enterSx(visible: boolean, reduced: boolean, opts: {
  fromX?: number; fromY?: number; delayMs?: number; scaleFrom?: number;
} = {}) {
  const { fromX = 0, fromY = 0, delayMs = 0, scaleFrom = 1 } = opts;
  if (reduced) return { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' };
  return {
    opacity: visible ? 1 : 0,
    transform: visible
      ? 'translate3d(0,0,0) scale(1)'
      : `translate3d(${fromX}px, ${fromY}px, 0) scale(${scaleFrom})`,
    transition: `opacity ${DURATION_MS}ms ${EASE}, transform ${DURATION_MS}ms ${EASE}, filter ${DURATION_MS}ms ${EASE}`,
    transitionDelay: `${delayMs}ms`,
    willChange: 'transform, opacity, filter',
    filter: visible ? 'blur(0px)' : 'blur(2px)',
  } as const;
}

// ------------------------------
// Button + Logo entrances
// ------------------------------
function EnterButton({
  children,
  delayMs = 0,
  fromX = 0,
  fromY = 0,
}: {
  children: React.ReactNode;
  delayMs?: number;
  fromX?: number;
  fromY?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, visible } = useRevealOnce<HTMLDivElement>();
  return (
    <Box ref={ref} sx={{ ...enterSx(visible, reduced, { fromX, fromY, delayMs, scaleFrom: 0.98 }) }}>
      {children}
    </Box>
  );
}

function EnterLogo({ delayMs = 120, children }: { delayMs?: number; children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const { ref, visible } = useRevealOnce<HTMLDivElement>();
  return (
    <Box
      ref={ref}
      sx={{
        ...enterSx(visible, reduced, { delayMs, scaleFrom: 0.94 }),
        transform: visible ? 'translate3d(0,0,0) scale(1)' : 'translate3d(0, 6px, 0) scale(0.94)',
      }}
    >
      {children}
    </Box>
  );
}

// ------------------------------
// Vectors that are logical per layout
// ------------------------------
// Within a 2x2 cluster, positions are row-major: [0]=TL, [1]=TR, [2]=BL, [3]=BR
// Desktop: left cluster slides from LEFT; right cluster from RIGHT.
// Mobile:  top cluster slides from TOP;  bottom cluster from BOTTOM.
function clusterVectors(layout: 'horizontal' | 'vertical', side: 'A' | 'B') {
  if (layout === 'horizontal') {
    return side === 'A'
      ? [ {x:-36,y:-18}, {x:-24,y:-18}, {x:-30,y: 18}, {x:-18,y: 18} ] // left cluster
      : [ {x: 36,y:-18}, {x: 24,y:-18}, {x: 30,y: 18}, {x: 18,y: 18} ]; // right cluster
  } else {
    return side === 'A'
      ? [ {x: 0,y:-40}, {x: 0,y:-34}, {x: 0,y:-28}, {x: 0,y:-22} ] // top cluster
      : [ {x: 0,y: 40}, {x: 0,y: 34}, {x: 0,y: 28}, {x: 0,y: 22} ]; // bottom cluster
  }
}

// Natural sweep order inside a cluster: TL → TR → BL → BR
const clusterOrder = [0, 1, 2, 3];

// ------------------------------
// Page
// ------------------------------
export default function HomePage() {
  const { t, language } = useTranslation();
  const [currentLanguage, setLanguage] = useAtom(languageAtom);
  const theme = useTheme();
  const isVertical = useMediaQuery(theme.breakpoints.down('md')); // stacked layout trigger

  const handleLanguageSwitch = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'zh-CN' : 'en';
    setLanguage(newLanguage);
  };

  // Decide which cluster is "A" (enters first) vs "B" (after logo)
  // Horizontal: A = left,  B = right
  // Vertical:   A = top,   B = bottom
  const layout: 'horizontal' | 'vertical' = isVertical ? 'vertical' : 'horizontal';

  const vecA = clusterVectors(layout, 'A');
  const vecB = clusterVectors(layout, 'B');

  // Logo first, then clusters
  const baseLogo = 0;
  const baseA = baseLogo + 200; // wait ~200ms after logo
  const baseB = baseA + clusterOrder.length * STAGGER_MS + 200;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: `
            minmax(${EDGE_MIN}px, 1fr)
            ${CLUSTER_W}px
            minmax(0, ${INNER_MAX})
            minmax(${LOGO_MIN}px, ${LOGO_MAX}px)
            minmax(0, ${INNER_MAX})
            ${CLUSTER_W}px
            minmax(${EDGE_MIN}px, 1fr)
          `,
        },
        alignItems: 'center',
        backgroundImage: `url(/backgrounds/homepage_background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        minWidth: 0,
      }}
    >
      {/* Cluster A (Left on desktop, Top on mobile) */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '2' },
          gridRow:     { xs: '1', md: 'auto' },
          justifySelf: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 160px)',
          gridTemplateRows: 'repeat(2, 160px)',
          width: 336,
          height: 336,
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          transform: { xs: 'scale(0.9)', sm: 'scale(1)' },
          my: { xs: 3, md: 0 },
        }}
      >
        {/* Slot 0 (TL): Language switch */}
        <EnterButton delayMs={baseA + STAGGER_MS * 0} fromX={vecA[0].x} fromY={vecA[0].y}>
          <Box onClick={handleLanguageSwitch} sx={{ cursor: 'pointer' }}>
            <Image
              src={language === 'zh-CN' ? '/buttons/button_homepage_cn_8.png' : '/buttons/button_homepage_en_8.png'}
              alt={language === 'zh-CN' ? '切换到英文' : 'Switch to Chinese'}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: 'auto',
                height: '160px',
                maxWidth: '480px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                flexShrink: 1,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </Box>
        </EnterButton>

        {/* Slots 1..3: Apps, Arts, Handbooks */}
        {sections.slice(0, 3).map((s, i) => {
          const pos = i + 1; // TL is 0 already used above
          const buttonImage =
            language === 'zh-CN'
              ? `/buttons/button_homepage_cn_${s.buttonIndex}.png`
              : `/buttons/button_homepage_en_${s.buttonIndex}.png`;
          return (
            <EnterButton key={s.href} delayMs={baseA + STAGGER_MS * pos} fromX={vecA[pos].x} fromY={vecA[pos].y}>
              <Link href={s.href}>
                <Image
                  src={buttonImage}
                  alt={t(s.labelKey)}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: 'auto',
                    height: '160px',
                    maxWidth: '480px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                    flexShrink: 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </Link>
            </EnterButton>
          );
        })}
      </Box>

      {/* Center logo (breathes in between clusters) */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '4' },
          gridRow:     { xs: '2', md: 'auto' },
          justifySelf: 'center',
          alignSelf: 'center',
          width: { xs: '100%', md: '100%' },
          maxWidth: { xs: LOGO_MAX, md: LOGO_MAX },
          height: { xs: 300, md: 500 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: { xs: 1, md: 0 },
          minWidth: 0,
        }}
      >
        <EnterLogo delayMs={baseLogo}>
          <Image
            src={language === 'zh-CN' ? '/logos/logo_cn.png' : '/logos/logo_en.png'}
            alt={language === 'zh-CN' ? '小猴同学作品集' : "Joey Hou's Gallery"}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </EnterLogo>
      </Box>

      {/* Cluster B (Right on desktop, Bottom on mobile) */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '6' },
          gridRow:     { xs: '3', md: 'auto' },
          justifySelf: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 160px)',
          gridTemplateRows: 'repeat(2, 160px)',
          width: 336,
          height: 336,
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          transform: { xs: 'scale(0.9)', sm: 'scale(1)' },
          my: { xs: 3, md: 0 },
        }}
      >
        {/* Posters, Reports, Videos, Websites */}
        {sections.slice(3, 7).map((s, i) => {
          const pos = clusterOrder[i]; // 0..3 in TL,TR,BL,BR order
          const buttonImage =
            language === 'zh-CN'
              ? `/buttons/button_homepage_cn_${s.buttonIndex}.png`
              : `/buttons/button_homepage_en_${s.buttonIndex}.png`;
          return (
            <EnterButton key={s.href} delayMs={baseB + STAGGER_MS * pos} fromX={vecB[pos].x} fromY={vecB[pos].y}>
              <Link href={s.href}>
                <Image
                  src={buttonImage}
                  alt={t(s.labelKey)}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: 'auto',
                    height: '160px',
                    maxWidth: '480px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                    flexShrink: 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </Link>
            </EnterButton>
          );
        })}
      </Box>
    </Box>
  );
}
