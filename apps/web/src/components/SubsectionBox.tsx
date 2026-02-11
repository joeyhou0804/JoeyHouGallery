"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import ImageGrid from '@/components/ImageGrid';
import CloudImage from '@/components/CloudImage';
import { useTranslation } from '@/hooks/useTranslation';
import { vw, rvw } from '@/utils/scaling';
import type { Section as SectionType } from '@/content/types';

// SubsectionTitle Component: Colored gradient backgrounds for subsection titles with optional year capsule
function SubsectionTitle({
  title,
  language,
  colorIndex,
  year,
  customGradient
}: {
  title: string;
  language: string;
  colorIndex: number;
  year?: string;
  customGradient?: string;
}) {
  // Color gradients for different sections (left to right)
  const gradients = [
    'linear-gradient(to right, #75C5EB, #297BC8)', // Blue gradient
    'linear-gradient(to right, #FF8E65, #FF4582)', // Red/Pink gradient
    'linear-gradient(to right, #39DE88, #17CACB)', // Green/Teal gradient
  ];

  const backgroundGradient = customGradient || gradients[colorIndex] || gradients[0];

  // Extract right side color from gradient for capsule border
  const rightColor = (() => {
    const match = backgroundGradient?.match(/#[A-Fa-f0-9]{6}(?![A-Fa-f0-9])/g);
    return match ? match[match.length - 1] : '#297BC8'; // fallback to blue
  })();

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Year capsule */}
      {year && (
        <Box
          sx={{
            position: 'absolute',
            top: rvw(-16, -20),
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            borderWidth: rvw(2, 2),
            borderStyle: 'solid',
            borderColor: rightColor,
            borderRadius: rvw(20, 20),
            py: rvw(4, 4),
            px: rvw(16, 16),
            display: 'flex',
            alignItems: 'center',
            gap: rvw(8, 8),
            zIndex: 1,
          }}
        >
          <Typography sx={{ color: rightColor, fontSize: rvw(11, 14), pt: rvw(2, 2) }}>★</Typography>
          <Typography sx={{ color: rightColor, fontWeight: 'bold', fontSize: rvw(14, 19), pt: rvw(2, 2), whiteSpace: 'nowrap' }}>
            {year}
          </Typography>
          <Typography sx={{ color: rightColor, fontSize: rvw(11, 14), pt: rvw(2, 2) }}>★</Typography>
        </Box>
      )}

      {/* Title background */}
      <Box
        sx={(theme) => {
          const dXs = vw(12, 'mobile');
          const dMd = vw(16);

          return {
            backgroundRepeat: 'repeat, no-repeat',
            backgroundSize: 'auto, 100% 100%',
            backgroundPosition: 'left top, left top',
            marginTop: 0,

            // Responsive margins, stripe pattern, and zigzag
            [theme.breakpoints.up('xs')]: {
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent ${vw(8, 'mobile')}, rgba(255, 255, 255, 0.3) ${vw(8, 'mobile')}, rgba(255, 255, 255, 0.3) ${vw(16, 'mobile')}), ${backgroundGradient}`,
              padding: vw(10, 'mobile'),
              paddingTop: year ? vw(18, 'mobile') : vw(10, 'mobile'),
              marginTop: year ? vw(24, 'mobile') : vw(12, 'mobile'),
              marginLeft: vw(8, 'mobile'),
              marginRight: vw(8, 'mobile'),
              clipPath: `polygon(0% 0%, 100% 0%, calc(100% - ${dXs}) 25%, 100% 50%, calc(100% - ${dXs}) 75%, 100% 100%, 0% 100%)`,
            },
            [theme.breakpoints.up('md')]: {
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent ${vw(8)}, rgba(255, 255, 255, 0.3) ${vw(8)}, rgba(255, 255, 255, 0.3) ${vw(16)}), ${backgroundGradient}`,
              padding: vw(24),
              marginTop: vw(32),
              marginLeft: vw(32),
              marginRight: vw(32),
              clipPath: `polygon(0% 0%, 100% 0%, calc(100% - ${dMd}) 25%, 100% 50%, calc(100% - ${dMd}) 75%, 100% 100%, 0% 100%)`,
            },
          };
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            color: 'white',
            fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
            textShadow: {
              xs: `${vw(1, 'mobile')} ${vw(1, 'mobile')} ${vw(2, 'mobile')} rgba(0, 0, 0, 0.3), 0px 0px ${vw(1, 'mobile')} rgba(0, 0, 0, 0.5)`,
              md: `${vw(1)} ${vw(1)} ${vw(2)} rgba(0, 0, 0, 0.3), 0px 0px ${vw(1)} rgba(0, 0, 0, 0.5)`,
            },
            fontSize: rvw(18, 45),
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

// SubsectionBox Component: White box container with title, text and images
export default function SubsectionBox({
  section,
  index,
  year,
  customGradient,
  children,
  title: customTitle,
  imageLayout = 'default',
  hideImages = false,
  sx
}: {
  section: Extract<SectionType, { type: 'gallery' }> | any,
  index: number,
  year?: string,
  customGradient?: string,
  children?: React.ReactNode,
  title?: string,
  imageLayout?: 'default' | 'centered-single' | 'centered-stacked',
  hideImages?: boolean,
  sx?: any
}) {
  const { t, language } = useTranslation();

  // Use custom title or the section title
  const title = customTitle || section.title;
  const body = section.body;

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: rvw(8, 8),
        boxShadow: {
          xs: `0 ${vw(4, 'mobile')} ${vw(20, 'mobile')} rgba(0, 0, 0, 0.1)`,
          md: `0 ${vw(4)} ${vw(20)} rgba(0, 0, 0, 0.1)`,
        },
        overflow: 'hidden',
        mt: index === 0 ? rvw(48, 48) : rvw(8, 8),
        ...sx,
      }}
    >
      {/* SubsectionTitle */}
      <SubsectionTitle
        title={title}
        language={language}
        colorIndex={index}
        year={year}
        customGradient={customGradient}
      />

      {/* Body content section */}
      <Box sx={{ p: rvw(8, 24) }}>
        {/* Custom children content (like buttons) */}
        {children && (
          <Box sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {children}
          </Box>
        )}

        {/* Default body text only if no images */}
        {body && !children && !section.images && (
          <Typography
            sx={{
              color: '#432F2F',
              fontSize: rvw(16, 21),
              lineHeight: 1.6,
              textAlign: 'center',
              fontWeight: 500,
              mb: rvw(24, 24),
            }}
          >
            {body}
          </Typography>
        )}

        {/* Images */}
        {section.images && !children && !hideImages && (
          <Box sx={{ mx: { md: vw(8) } }}>
            {imageLayout === 'centered-stacked' ? (
              // Two images stacked vertically, centered
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: rvw(16, 16) }}>
                {section.images.map((src: string, imgIndex: number) => (
                  <Box key={imgIndex} sx={{ width: '100%' }}>
                    <Card>
                      <CloudImage src={src} alt={`${title} - ${imgIndex + 1}`} />
                    </Card>
                  </Box>
                ))}
              </Box>
            ) : imageLayout === 'centered-single' ? (
              // Single image centered
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%' }}>
                  <Card>
                    <CloudImage src={section.images[0]} alt={title} />
                  </Card>
                </Box>
              </Box>
            ) : (
              // Default layout
              <Box>
                {section.images.length === 1 && (index === 0 || index === 1) ? (
                  // Single image centered and larger for Application Idea and High Level Overview
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                      component="img"
                      src={section.images[0]}
                      alt={title}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: rvw(8, 8),
                        boxShadow: {
                          xs: `0 ${vw(2, 'mobile')} ${vw(8, 'mobile')} rgba(0, 0, 0, 0.1)`,
                          md: `0 ${vw(2)} ${vw(8)} rgba(0, 0, 0, 0.1)`,
                        },
                      }}
                    />
                  </Box>
                ) : (
                  // Regular ImageGrid for other sections
                  <ImageGrid images={section.images} />
                )}
              </Box>
            )}
          </Box>
        )}

        {/* Body text below images if it exists */}
        {section.images && !children && !hideImages && (
          <>
            {body && (
              <Box sx={{ mt: rvw(24, 24) }}>
                {Array.isArray(body) ? (
                  <>
                    {/* On xs screens, combine all paragraphs into one */}
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                      <Typography
                        sx={{
                          color: '#432F2F',
                          fontSize: rvw(16, 21),
                          lineHeight: 1.6,
                          textAlign: 'center',
                          fontWeight: 500,
                        }}
                      >
                        {body.join(' ')}
                      </Typography>
                    </Box>
                    {/* On md+ screens, keep separate paragraphs */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                      <Stack spacing={rvw(8, 8)}>
                        {body.map((p, i) => (
                          <Typography
                            key={i}
                            sx={{
                              color: '#432F2F',
                              fontSize: rvw(16, 21),
                              lineHeight: 1.6,
                              textAlign: 'center',
                              fontWeight: 500,
                            }}
                          >
                            {p}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  </>
                ) : (
                  <Typography
                    sx={{
                      color: '#432F2F',
                      fontSize: rvw(16, 21),
                      lineHeight: 1.6,
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    {body}
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}

        {/* Body text without images */}
        {body && (!section.images || hideImages) && !children && (
          <Box>
            {Array.isArray(body) ? (
              <>
                {/* On xs screens, combine all paragraphs into one */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <Typography
                    sx={{
                      color: '#432F2F',
                      fontSize: rvw(16, 21),
                      lineHeight: 1.6,
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    {body.join(' ')}
                  </Typography>
                </Box>
                {/* On md+ screens, keep separate paragraphs */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Stack spacing={rvw(8, 8)}>
                    {body.map((p, i) => (
                      <Typography
                        key={i}
                        sx={{
                          color: '#432F2F',
                          fontSize: rvw(16, 21),
                          lineHeight: 1.6,
                          textAlign: 'center',
                          fontWeight: 500,
                        }}
                      >
                        {p}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              </>
            ) : (
              <Typography
                sx={{
                  color: '#432F2F',
                  fontSize: rvw(16, 21),
                  lineHeight: 1.6,
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {body}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
