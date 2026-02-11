"use client";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from '@/hooks/useTranslation';
import { useAtom } from 'jotai';
import { languageAtom, Language } from '@joey/atoms';
import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { usePageLoading } from '@/hooks/usePageLoading';
import PageLoadingScreen from '@/components/PageLoadingScreen';
import confetti from 'canvas-confetti';
import { vw, rvw } from '@/utils/scaling';

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

// Layout stagger (kept for button timing logic)
const STAGGER_MS = 90;

// ------------------------------
// Simple wrapper components (animations removed)
// ------------------------------
function EnterButton({
  children,
}: {
  children: React.ReactNode;
  delayMs?: number;
  fromX?: number;
  fromY?: number;
  imagesLoaded?: boolean;
}) {
  return <Box>{children}</Box>;
}

function EnterLogo({
  children,
}: {
  delayMs?: number;
  children: React.ReactNode;
  imagesLoaded?: boolean;
}) {
  return <Box>{children}</Box>;
}

// ------------------------------
// Vectors that are logical per layout
// ------------------------------
// Within a 2x2 cluster, positions are row-major: [0]=TL, [1]=TR, [2]=BL, [3]=BR
// Desktop: left cluster slides from LEFT; right cluster from RIGHT.
// Mobile:  top cluster slides from TOP;  bottom cluster from BOTTOM.
function clusterVectors(layout: 'horizontal' | 'vertical', side: 'A' | 'B'): Array<{x: number, y: number}> {
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

  // Critical images to preload
  const criticalImages = [
    '/logos/logo_cn.png',
    '/logos/logo_en.png',
    '/buttons/button_homepage_cn_1.png',
    '/buttons/button_homepage_cn_2.png',
    '/buttons/button_homepage_en_1.png',
    '/buttons/button_homepage_en_2.png',
    '/backgrounds/homepage_background.png'
  ];

  // Use the same loading pattern as other pages
  const { isLoading, progress } = usePageLoading({ duration: 2000, minLoadingTime: 1500, images: criticalImages });

  const handleLanguageSwitch = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'zh-CN' : 'en';
    setLanguage(newLanguage);
  };

  const handleLogoClick = () => {
    // Create a burst of confetti from the center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#BB8F43', '#DFBF23', '#F5D76E', '#FFE599', '#FFF2CC']
    });

    // Add a second burst with different settings for more effect
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 120,
        origin: { y: 0.7 },
        colors: ['#432F2F', '#8B7355', '#D4B896']
      });
    }, 200);
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

  // Show loading screen while images are loading
  if (isLoading) {
    return (
      <PageLoadingScreen
        progress={progress}
        title={language === 'zh-CN' ? '欢迎来到' : 'Welcome to'}
        subtitle={language === 'zh-CN' ? '小猴同学作品集' : "Joey Hou's Gallery"}
      />
    );
  }

  return (
    <Box
      sx={{
        position: { xs: 'fixed', md: 'relative' },
        top: { xs: 0, md: 'auto' },
        left: { xs: 0, md: 'auto' },
        right: { xs: 0, md: 'auto' },
        bottom: { xs: 0, md: 'auto' },
        minHeight: { xs: 'auto', md: '100vh' },
        height: { xs: '100%', md: 'auto' },
        maxHeight: { xs: '100%', md: 'none' },
        overflow: 'hidden',
        display: { xs: 'flex', md: 'grid' },
        flexDirection: { xs: 'column', md: 'unset' },
        boxSizing: 'border-box',
        gridTemplateColumns: {
          xs: '1fr',
          md: `
            minmax(${vw(80)}, 1fr)
            ${vw(296)}
            minmax(0, ${vw(40)})
            minmax(${vw(320)}, ${vw(600)})
            minmax(0, ${vw(40)})
            ${vw(296)}
            minmax(${vw(80)}, 1fr)
          `,
        },
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'initial' },
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
          gridColumn: { xs: 'unset', md: '2' },
          gridRow: { xs: 'unset', md: 'auto' },
          justifySelf: { xs: 'center', md: 'center' },
          alignSelf: { xs: 'flex-end', md: 'center' },
          display: 'grid',
          gridTemplateColumns: { xs: `repeat(2, ${vw(110, 'mobile')})`, md: `repeat(2, ${vw(160)})` },
          gridTemplateRows: { xs: `repeat(2, ${vw(110, 'mobile')})`, md: `repeat(2, ${vw(160)})` },
          gap: rvw(4, 16),
          justifyItems: 'center',
          alignItems: 'center',
          mx: { xs: 'auto', md: 0 },
          mb: { xs: vw(16, 'mobile'), md: 0 },
          zIndex: 1,
        }}
      >
        {/* Slot 0 (TL): Language switch */}
        <EnterButton delayMs={baseA + STAGGER_MS * 0} fromX={vecA[0]?.x || 0} fromY={vecA[0]?.y || 0} imagesLoaded={!isLoading}>
          <Box onClick={handleLanguageSwitch} sx={{ cursor: 'pointer', height: { xs: vw(110, 'mobile'), md: vw(160) } }}>
            <Image
              src={language === 'zh-CN' ? '/buttons/button_homepage_cn_8.png' : '/buttons/button_homepage_en_8.png'}
              alt={language === 'zh-CN' ? '切换到英文' : 'Switch to Chinese'}
              width={0}
              height={0}
              sizes="100vw"
              className="homepage-button"
              style={{
                width: 'auto',
                height: '100%',
                maxWidth: vw(480),
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
          // Add extra spacing for second row (Arts=i:1, Handbooks=i:2)
          const extraMargin = i === 1 ? { mr: { xs: vw(80, 'mobile'), md: 0 } } : i === 2 ? { ml: { xs: vw(80, 'mobile'), md: 0 } } : {};
          return (
            <EnterButton key={s.href} delayMs={baseA + STAGGER_MS * pos} fromX={vecA[pos]?.x || 0} fromY={vecA[pos]?.y || 0} imagesLoaded={!isLoading}>
              <Link href={s.href} style={{ height: 'inherit' }}>
                <Box sx={{ height: { xs: vw(110, 'mobile'), md: vw(160) }, ...extraMargin }}>
                  <Image
                    src={buttonImage}
                    alt={t(s.labelKey)}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="homepage-button"
                    style={{
                      width: 'auto',
                      height: '100%',
                      maxWidth: vw(480),
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, opacity 0.2s ease',
                      flexShrink: 1,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </Box>
              </Link>
            </EnterButton>
          );
        })}
      </Box>

      {/* Center logo (breathes in between clusters) */}
      <Box
        sx={{
          gridColumn: { xs: 'unset', md: '4' },
          gridRow: { xs: 'unset', md: 'auto' },
          justifySelf: 'center',
          alignSelf: 'center',
          width: { xs: language === 'zh-CN' ? '50%' : '65%', md: '100%' },
          maxWidth: { xs: vw(250, 'mobile'), md: vw(600) },
          height: { xs: 'auto', md: vw(500) },
          maxHeight: { xs: '16dvh', md: vw(500) },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          minWidth: 0,
          mx: { xs: 'auto', md: 0 },
          zIndex: 0,
        }}
      >
        <EnterLogo delayMs={baseLogo} imagesLoaded={!isLoading}>
          <Box
            onClick={handleLogoClick}
            sx={{
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              }
            }}
          >
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
          </Box>
        </EnterLogo>
      </Box>

      {/* Cluster B (Right on desktop, Bottom on mobile) */}
      <Box
        sx={{
          gridColumn: { xs: 'unset', md: '6' },
          gridRow: { xs: 'unset', md: 'auto' },
          justifySelf: { xs: 'center', md: 'center' },
          alignSelf: { xs: 'flex-start', md: 'center' },
          display: 'grid',
          gridTemplateColumns: { xs: `repeat(2, ${vw(110, 'mobile')})`, md: `repeat(2, ${vw(160)})` },
          gridTemplateRows: { xs: `repeat(2, ${vw(110, 'mobile')})`, md: `repeat(2, ${vw(160)})` },
          gap: rvw(4, 16),
          justifyItems: 'center',
          alignItems: 'center',
          mx: { xs: 'auto', md: 0 },
          mt: { xs: vw(16, 'mobile'), md: 0 },
          zIndex: 1,
        }}
      >
        {/* Posters, Reports, Videos, Websites */}
        {sections.slice(3, 7).map((s, i) => {
          const pos = clusterOrder[i] ?? 0; // 0..3 in TL,TR,BL,BR order, fallback to 0
          const buttonImage =
            language === 'zh-CN'
              ? `/buttons/button_homepage_cn_${s.buttonIndex}.png`
              : `/buttons/button_homepage_en_${s.buttonIndex}.png`;
          // Add extra spacing for first row (Posters=i:0, Reports=i:1)
          const extraMargin = i === 0 ? { mr: { xs: vw(80, 'mobile'), md: 0 } } : i === 1 ? { ml: { xs: vw(80, 'mobile'), md: 0 } } : {};
          return (
            <EnterButton key={s.href} delayMs={baseB + STAGGER_MS * pos} fromX={vecB[pos]?.x || 0} fromY={vecB[pos]?.y || 0} imagesLoaded={!isLoading}>
              <Link href={s.href} style={{ height: 'inherit' }}>
                <Box sx={{ height: { xs: vw(110, 'mobile'), md: vw(160) }, ...extraMargin }}>
                  <Image
                    src={buttonImage}
                    alt={t(s.labelKey)}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="homepage-button"
                    style={{
                      width: 'auto',
                      height: '100%',
                      maxWidth: vw(480),
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, opacity 0.2s ease',
                      flexShrink: 1,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </Box>
              </Link>
            </EnterButton>
          );
        })}
      </Box>

      {/* Footer text - positioned absolutely to not affect grid layout */}
      <Box
        sx={{
          position: 'absolute',
          top: 'auto',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          pb: rvw(8, 24),
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: rvw(8, 8) }}>
          <Typography
            sx={{
              color: '#000',
              fontSize: rvw(16, 18),
              lineHeight: 1.6,
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {t('ui.madeBy')}
          </Typography>

          <Box sx={{ display: 'flex', gap: rvw(4, 4) }}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/joey1m/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                p: rvw(4, 4),
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
              }}
            >
              <LinkedInIcon sx={{ fontSize: rvw(16, 18) }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.facebook.com/JoeyHouKun"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                p: rvw(4, 4),
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
              }}
            >
              <FacebookIcon sx={{ fontSize: rvw(16, 18) }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.instagram.com/joeyhou0804/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                p: rvw(4, 4),
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
              }}
            >
              <InstagramIcon sx={{ fontSize: rvw(16, 18) }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://github.com/joeyhou0804"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                p: rvw(4, 4),
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
              }}
            >
              <GitHubIcon sx={{ fontSize: rvw(16, 18) }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
