"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { useAtom } from 'jotai';
import { languageAtom, Language } from '@joey/atoms';

export default function PageFooter() {
  const { t, language } = useTranslation();
  const [currentLanguage, setLanguage] = useAtom(languageAtom);
  
  const handleLanguageSwitch = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'zh-CN' : 'en';
    setLanguage(newLanguage);
  };

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
    <Box sx={{ position: 'relative', mt: '-20px', zIndex: 10 }}>
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
            overflow: 'visible',
            zIndex: 0,

            '--stripe': `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(255, 255, 255, 0.3) 8px,
              rgba(255, 255, 255, 0.3) 16px
            )`,
            '--yellow': '#FED936',

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

              [theme.breakpoints.up('xs')]: { clipPath: makeClip(depth.xs) },
              [theme.breakpoints.up('sm')]: { clipPath: makeClip(depth.sm) },
              [theme.breakpoints.up('md')]: { clipPath: makeClip(depth.md) },
            },

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
            display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' },
            flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start', md: 'flex-start', lg: 'flex-end' },
            justifyContent: { xs: 'center', sm: 'space-between', md: 'space-between', lg: 'space-between' },
            px: 4,
            pt: 6,
            pb: 4,
          }}
        >
          {/* Logo */}
          <Box sx={{ 
            position: 'relative', 
            height: { xs: 'auto', sm: '80px' }, 
            display: 'flex', 
            alignItems: 'flex-end', 
            zIndex: 2,
            mb: { xs: 2, sm: 0 }
          }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  position: 'absolute',
                  bottom: 0,
                  left: language === 'zh-CN' ? 40 : 0,
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

          {/* Navigation buttons */}
          <Box sx={{ 
            display: { xs: 'grid', sm: 'grid', md: 'grid', lg: 'grid' },
            gap: 2,
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'flex-end', md: 'flex-end', lg: 'flex-end' },
            // xs: 2 columns, 4 rows for 8 buttons
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)',
              lg: 'repeat(8, 1fr)',
              // md: 2 rows with 4 buttons each
              md: 'repeat(4, 1fr)',
              // sm: 3 columns for 3-3-2 pattern
              sm: 'repeat(3, 1fr)'
            },
            gridTemplateRows: {
              xs: 'repeat(4, 1fr)',
              lg: '1fr',
              md: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)'
            }
          }}>
            {/* Language switching button - first */}
            <Box 
              onClick={handleLanguageSwitch} 
              sx={{ 
                cursor: 'pointer',
                // Grid positioning for different layouts
                gridColumn: { 
                  xs: '1',
                  lg: '1', 
                  md: '1', 
                  sm: '1' 
                },
                gridRow: { 
                  xs: '1',
                  lg: '1', 
                  md: '1', 
                  sm: '1' 
                }
              }}
            >
              <Image
                src={language === 'zh-CN' ? '/buttons/button_cn_8.png' : '/buttons/button_en_8.png'}
                alt={language === 'zh-CN' ? '切换到英文' : 'Switch to Chinese'}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: '100px',
                  maxWidth: '300px',
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
            {sections.map((s, index) => {
              const buttonImage = language === 'zh-CN'
                ? `/buttons/button_cn_${s.buttonIndex}.png`
                : `/buttons/button_en_${s.buttonIndex}.png`;
              
              // Calculate grid positions (language button is index 0, so section buttons start at index 1)
              const buttonPosition = index + 2; // +2 because language button is position 1
              
              // Grid positioning for different layouts
              const getGridColumn = () => {
                if (buttonPosition <= 8) { // lg: all in one row
                  return { lg: buttonPosition.toString() };
                }
                return { lg: '1' }; // fallback
              };
              
              const getGridRow = () => {
                // xs: 4 rows with 2 buttons each
                // buttonPosition: 2->row1, 3->row2, 4->row2, 5->row3, 6->row3, 7->row4, 8->row4
                const xs = Math.ceil(buttonPosition / 2).toString();
                // lg: all in row 1
                const lg = '1';
                // md: 2 rows with 4 buttons each (positions 1-4 in row 1, 5-8 in row 2)
                const md = buttonPosition <= 4 ? '1' : '2';
                // sm: 3 rows with 3-3-2 pattern (1-3 in row 1, 4-6 in row 2, 7-8 in row 3)
                const sm = buttonPosition <= 3 ? '1' : buttonPosition <= 6 ? '2' : '3';
                
                return { xs, lg, md, sm };
              };
              
              const getGridColumnForAllScreens = () => {
                // xs: 2 columns, alternating within each row
                // buttonPosition: 2->col2, 3->col1, 4->col2, 5->col1, 6->col2, 7->col1, 8->col2
                const xs = buttonPosition % 2 === 0 ? '2' : '1';
                // md: positions 1-4 map to columns 1-4, positions 5-8 map to columns 1-4
                const md = buttonPosition <= 4 ? buttonPosition.toString() : (buttonPosition - 4).toString();
                // sm: positions 1-3 map to columns 1-3, positions 4-6 map to columns 1-3, positions 7-8 map to columns 1-2
                let sm;
                if (buttonPosition <= 3) {
                  sm = buttonPosition.toString();
                } else if (buttonPosition <= 6) {
                  sm = (buttonPosition - 3).toString();
                } else {
                  sm = (buttonPosition - 6).toString();
                }
                
                return { xs, md, sm };
              };
              
              return (
                <Box
                  key={s.href}
                  sx={{
                    // Grid positioning
                    gridColumn: {
                      xs: getGridColumnForAllScreens().xs,
                      lg: buttonPosition.toString(),
                      md: getGridColumnForAllScreens().md,
                      sm: getGridColumnForAllScreens().sm
                    },
                    gridRow: getGridRow()
                  }}
                >
                  <Link href={s.href}>
                    <Image
                      src={buttonImage}
                      alt={t(s.labelKey)}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '100px',
                        maxWidth: '300px',
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
                </Box>
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
            pl: 4,
          }}
        >
          Made by Joey Hou in 2025.
        </Box>
      </Box>
    </Box>
  );
}