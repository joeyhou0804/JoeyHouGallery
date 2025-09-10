"use client";

import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import SubsectionBox from '@/components/SubsectionBox';
import Carousel from '@/components/Carousel';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/applications.json';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { useAtom } from 'jotai';
import { languageAtom, Language } from '@joey/atoms';

export default function ApplicationsPage() {
  const data = content as PageContent;
  const introSection = data.sections.find(s => s.type === 'intro') as Extract<SectionType, { type: 'intro' }>;
  const gallerySections = data.sections.filter(s => s.type === 'gallery') as Extract<SectionType, { type: 'gallery' }>[];
  
  // Translation and language switching
  const { t, language } = useTranslation();
  const [currentLanguage, setLanguage] = useAtom(languageAtom);
  
  const handleLanguageSwitch = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'zh-CN' : 'en';
    setLanguage(newLanguage);
  };

  // Homepage sections for navigation buttons
  const sections = [
    { href: '/apps', labelKey: 'sectionsLabels.applications', buttonIndex: 1 },
    { href: '/arts', labelKey: 'sectionsLabels.arts', buttonIndex: 2 },
    { href: '/handbooks', labelKey: 'sectionsLabels.handbooks', buttonIndex: 3 },
    { href: '/posters', labelKey: 'sectionsLabels.posters', buttonIndex: 4 },
    { href: '/reports', labelKey: 'sectionsLabels.reports', buttonIndex: 5 },
    { href: '/videos', labelKey: 'sectionsLabels.videos', buttonIndex: 6 },
    { href: '/websites', labelKey: 'sectionsLabels.websites', buttonIndex: 7 }
  ];
  
  return (
    <PageHeader pageKey="apps">
      <MainSection section={introSection} backgroundType="bottom-only" />

      {gallerySections.map((s, i) => (
        <Section key={i}>
          {s.title === 'Manipulation' ? (
            <>
              <SubsectionBox section={{ ...s, images: [] }} index={i} />
              <Carousel images={s.images || []} />
            </>
          ) : (
            <SubsectionBox section={s} index={i} />
          )}
        </Section>
      ))}

      {/* Yellow striped section with zigzag patterns */}
      <Box
  sx={(theme) => {
    const depth = { xs: 6, sm: 8, md: 10 };
    const steps = 120;

    const makeClip = (d: number) => `polygon(
      0% 0%,
      ${Array.from({ length: steps + 1 }, (_, i) => {
        const x = (i / steps) * 100;
        const isPeak = i % 2 === 0;
        const y = isPeak ? '0%' : `${d}px`;
        return `${x.toFixed(2)}% ${y}`;
      }).join(', ')},
      100% 0%, 100% calc(100% - ${d}px),
      ${Array.from({ length: steps + 1 }, (_, i) => {
        const x = ((steps - i) / steps) * 100;
        const isPeak = i % 2 === 0;
        const y = isPeak ? '100%' : `calc(100% - ${d}px)`;
        return `${x.toFixed(2)}% ${y}`;
      }).join(', ')},
      0% calc(100% - ${d}px), 0% 0%
    )`;

    return {
      position: 'relative',
      width: '100vw',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      minHeight: '160px',
      mt: 8,
      mb: 0,
      overflow: 'visible', // allow content to stick out above
      zIndex: 0,           // establish stacking context

      // define colors/stripes with new yellow
      '--stripe': `repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 8px,
        rgba(255, 255, 255, 0.3) 8px,
        rgba(255, 255, 255, 0.3) 16px
      )`,
      '--yellow': '#FED936',

      // Pseudo-element holds the clipped background only
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'var(--yellow)',
        backgroundImage: 'var(--stripe)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'left top',
        pointerEvents: 'none',
        zIndex: 0,

        // responsive clip paths
        [theme.breakpoints.up('xs')]: { clipPath: makeClip(depth.xs) },
        [theme.breakpoints.up('sm')]: { clipPath: makeClip(depth.sm) },
        [theme.breakpoints.up('md')]: { clipPath: makeClip(depth.md) },
      },

      // everything inside should render above the clipped background
      '& > .content': {
        position: 'relative',
        zIndex: 1,
      },
    };
  }}
>
<Container
  className="content"
  maxWidth="xl"
  sx={{
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    px: 4,
    pt: 6,   // push content down from top
  }}
>
    {/* Logo on the left */}
    <Box sx={{ position: 'relative', height: '80px', display: 'flex', alignItems: 'flex-end', zIndex: 2 }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            position: 'absolute',
            bottom: 0,
            left: 0,
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          <Image
            src={language === 'zh-CN' ? '/logos/logo_plain_cn.png' : '/logos/logo_plain_en.png'}
            alt={language === 'zh-CN' ? '小猴同学作品集' : "Joey Hou's Gallery"}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: 'auto',
              height: '180px',
              maxWidth: '600px',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Link>
    </Box>

          {/* Navigation buttons on the right */}
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'flex-end'
          }}>
            {/* Language switching button - first */}
            <Box onClick={handleLanguageSwitch} sx={{ cursor: 'pointer' }}>
              <Image
                src={language === 'zh-CN' ? '/buttons/button_cn_8.png' : '/buttons/button_en_8.png'}
                alt={language === 'zh-CN' ? '切换到英文' : 'Switch to Chinese'}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: '80px',
                  maxWidth: '240px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </Box>

            {/* All section buttons */}
            {sections.map((s) => {
              const buttonImage = language === 'zh-CN'
                ? `/buttons/button_cn_${s.buttonIndex}.png`
                : `/buttons/button_en_${s.buttonIndex}.png`;
              
              return (
                <Link key={s.href} href={s.href}>
                  <Image
                    src={buttonImage}
                    alt={t(s.labelKey)}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: 'auto',
                      height: '80px',
                      maxWidth: '240px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </Link>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Footer row below the yellow area */}
      <Box
        sx={{
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          position: 'relative',
          backgroundColor: '#2B91E1',
          px: 0,
          py: 1,
        }}
      >
        <Box
          component="p"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
            color: 'white',
            lineHeight: 1.6,
            textAlign: 'left',
            fontWeight: 500,
            mt: 1,
            mb: 1,
            pl: 4,   // 🔹 small padding so text doesn’t stick to the very edge
          }}
        >
          Made by Joey Hou in 2025.
        </Box>
      </Box>
    </PageHeader>
  );
}