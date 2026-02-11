"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from '@/hooks/useTranslation';
import { vw, rvw } from '@/utils/scaling';
import type { Language } from '@joey/atoms';

interface ArtCardGridProps {
  images: string[];
  titles?: string[];
}

// Individual card component
function ArtCard({
  image,
  title,
  color,
  language
}: {
  image: string;
  title: string;
  color: string;
  language: Language;
}) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: rvw(8, 8),
        padding: rvw(8, 24),
        boxShadow: {
          xs: `0 ${vw(4, 'mobile')} ${vw(20, 'mobile')} rgba(0, 0, 0, 0.15), 0 ${vw(2, 'mobile')} ${vw(8, 'mobile')} rgba(0, 0, 0, 0.1)`,
          md: `0 ${vw(4)} ${vw(20)} rgba(0, 0, 0, 0.15), 0 ${vw(2)} ${vw(8)} rgba(0, 0, 0, 0.1)`,
        },
      }}
    >
      {/* Title above the image */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
          padding: rvw(8, 12),
          mb: rvw(8, 16),
          clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 15px) 25%, 100% 50%, calc(100% - 15px) 75%, 100% 100%, 0% 100%)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            color: 'white',
            fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
            textShadow: {
              xs: `${vw(1, 'mobile')} ${vw(1, 'mobile')} ${vw(2, 'mobile')} rgba(0, 0, 0, 0.3), 0px 0px ${vw(1, 'mobile')} rgba(0, 0, 0, 0.5)`,
              md: `${vw(1)} ${vw(1)} ${vw(2)} rgba(0, 0, 0, 0.3), 0px 0px ${vw(1)} rgba(0, 0, 0, 0.5)`,
            },
            fontSize: rvw(18, 26),
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        component="img"
        src={image}
        alt={`${title} Art`}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: rvw(8, 8),
          display: 'block',
        }}
      />
    </Box>
  );
}

export default function ArtCardGrid({ images, titles }: ArtCardGridProps) {
  const { language } = useTranslation();

  // Default titles if not provided
  const defaultTitles = ["Renaissance", "Cubism", "Moderism", "Impressionism"];
  const artTitles = titles || defaultTitles;

  // Color palette that loops back when there are more images than colors
  const colors = ["#F1B17E", "#39DF88", "#6CBEEB", "#F58EC3", "#A69CE8", "#6D9CEB", "#D1393E"];

  return (
    <Box sx={{ py: rvw(16, 32) }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: rvw(16, 32),
          maxWidth: { md: vw(1200) },
          mx: 'auto',
        }}
      >
        {images.map((image: string, imgIndex: number) => {
          const colorIndex = imgIndex % colors.length; // Loop back when exceeding color array
          const titleText = artTitles[imgIndex] || `Art ${imgIndex + 1}`;

          return (
            <ArtCard
              key={imgIndex}
              image={image}
              title={titleText}
              color={colors[colorIndex] || '#F1B17E'}
              language={(language || 'en') as Language}
            />
          );
        })}
      </Box>
    </Box>
  );
}
