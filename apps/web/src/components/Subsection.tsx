"use client";

import Box from '@mui/material/Box';
import Section from '@/components/Section';
import SubsectionBox from '@/components/SubsectionBox';
import ControllableCarousel from '@/components/ControllableCarousel';
import { vw, rvw } from '@/utils/scaling';
import type { Section as SectionType } from '@/content/types';

// Subsection Component: Background container with SubsectionBox and optional carousel
export default function Subsection({
  section,
  index,
  year,
  customGradient,
  children,
  title,
  backgroundImage = '/backgrounds/subsection_background_1.png',
  carouselImages,
  carouselSpacing = 6,
  zIndex = 1,
  customColor,
  extendBackground = false,
  hideImages = false
}: {
  section: Extract<SectionType, { type: 'gallery' }> | any,
  index: number,
  year?: string,
  customGradient?: string,
  children?: React.ReactNode,
  title?: string,
  backgroundImage?: string,
  carouselImages?: string[],
  carouselSpacing?: number,
  zIndex?: number,
  customColor?: 'red' | 'blue' | 'green',
  extendBackground?: boolean,
  hideImages?: boolean
}) {
  // Convert customColor to gradient
  const colorGradients = {
    red: 'linear-gradient(to right, #FF8E65, #FF4582)',
    blue: 'linear-gradient(to right, #75C5EB, #297BC8)',
    green: 'linear-gradient(to right, #39DE88, #17CACB)'
  };

  const finalGradient = customColor ? colorGradients[customColor] : customGradient;

  // Zigzag depth (small decorative — kept as raw px per scaling rules)
  const depth = { xs: 6, md: 10 };
  const steps = { xs: 40, md: 120 };

  const buildZigzagClip = (d: number, s: number) => `polygon(
    0% 0%, 100% 0%,
    100% calc(100% - ${d}px),
    ${Array.from({ length: s + 1 }, (_, i) => {
      const x = ((s - i) / s) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '100%' : `calc(100% - ${d}px)`;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    0% calc(100% - ${d}px)
  )`;

  const straightClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)';

  return (
    <Box
      sx={(theme) => ({
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'relative',
        zIndex: zIndex,

        // xs (mobile) breakpoint
        [theme.breakpoints.up('xs')]: {
          marginTop: vw(-40, 'mobile'),
          paddingTop: vw(40, 'mobile'),
          marginBottom: extendBackground ? vw(-120, 'mobile') : 0,
          paddingBottom: extendBackground
            ? vw(168, 'mobile') // 48 + 120
            : `calc(${vw(48, 'mobile')} + ${depth.xs}px)`,
          clipPath: extendBackground ? straightClip : buildZigzagClip(depth.xs, steps.xs),
        },

        // md (desktop) breakpoint
        [theme.breakpoints.up('md')]: {
          marginTop: vw(-40),
          paddingTop: vw(40),
          marginBottom: extendBackground ? vw(-120) : 0,
          paddingBottom: extendBackground
            ? vw(168) // 48 + 120
            : `calc(${vw(48)} + ${depth.md}px)`,
          clipPath: extendBackground ? straightClip : buildZigzagClip(depth.md, steps.md),
        },
      })}
    >
      <Section sx={{ mt: rvw(24, 40), py: rvw(24, 48) }}>
        <SubsectionBox
          section={section}
          index={index}
          year={year}
          title={title}
          customGradient={finalGradient}
          hideImages={hideImages}
        >
          {children}
        </SubsectionBox>

        {carouselImages && carouselImages.length > 0 && (
          <Box sx={{ mt: rvw(24, 48) }}>
            <ControllableCarousel images={carouselImages} />
          </Box>
        )}
      </Section>
    </Box>
  );
}
