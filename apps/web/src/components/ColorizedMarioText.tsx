import React from 'react';
import Box from '@mui/material/Box';
import { generateMarioColors, MARIO_COLORS, type ColorizedMarioTextProps } from '@/utils/marioColors';

export default function ColorizedMarioText({ 
  text, 
  fontFamily, 
  fontSize = 'inherit', 
  fontWeight = 'normal',
  className,
  language = 'en',
  variant = 'colorful'
}: ColorizedMarioTextProps) {
  const colors = generateMarioColors(text);
  const characters = text.split('');
  
  // Different border widths for different languages
  // Thicker borders for page titles (non-homepage)
  const borderWidth = language === 'zh-CN' ? '3px' : '2px';

  // Gradient variant for homepage title
  if (variant === 'gradient') {
    // Different dark border widths for gradient variant
    const gradientBorderWidth = language === 'zh-CN' ? '3px' : '1px';
    
    return (
      <Box
        component="span"
        className={className}
        sx={{
          fontFamily,
          fontSize,
          fontWeight,
          display: 'inline-block',
          lineHeight: 1.2,
          background: 'linear-gradient(to bottom, #FEEC1C 0%, #FEEC1C 20%, #FD9B52 70%, #FD9B52 100%)',
          backgroundSize: `calc(100% + ${gradientBorderWidth} * 2) calc(100% + ${gradientBorderWidth} * 2)`, // Compensate for stroke reducing fill area
          backgroundPosition: 'center center',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          WebkitTextStroke: `${gradientBorderWidth} #3B106A`,
          textStroke: `${gradientBorderWidth} #3B106A`,
          filter: 'drop-shadow(0 0 0 white) drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px 1px 0 white)',
          position: 'relative',
          // Ensure gradient covers full character height including descenders
          paddingBottom: '0.1em'
        }}
      >
        {text}
      </Box>
    );
  }

  // Regular colorful variant
  return (
    <Box
      component="span"
      className={className}
      sx={{
        fontFamily,
        fontSize,
        fontWeight,
        display: 'inline-block',
        lineHeight: 1.2
      }}
    >
      {characters.map((char, index) => {
        const colorKey = colors[index];
        return (
          <Box
            key={index}
            component="span"
            sx={{
              color: char === ' ' ? 'transparent' : MARIO_COLORS[colorKey || 'red'],
              WebkitTextStroke: char === ' ' ? 'none' : `${borderWidth} black`,
              textStroke: char === ' ' ? 'none' : `${borderWidth} black`,
              filter: char === ' ' ? 'none' : `drop-shadow(0 0 0 black) drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black) drop-shadow(1px -1px 0 black) drop-shadow(-1px 1px 0 black)`,
              display: 'inline-block',
              position: 'relative'
            }}
          >
            {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space to preserve spaces */}
          </Box>
        );
      })}
    </Box>
  );
}