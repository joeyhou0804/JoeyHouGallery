import React from 'react';
import Box from '@mui/material/Box';
import { generateMarioColors, MARIO_COLORS, type ColorizedMarioTextProps } from '@/utils/marioColors';

export default function ColorizedMarioText({ 
  text, 
  fontFamily, 
  fontSize = 'inherit', 
  fontWeight = 'normal',
  className,
  language = 'en'
}: ColorizedMarioTextProps) {
  const colors = generateMarioColors(text);
  const characters = text.split('');
  
  // Different border widths for different languages
  const borderWidth = language === 'zh-CN' ? '3px' : '1px';

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
      {characters.map((char, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            color: char === ' ' ? 'transparent' : MARIO_COLORS[colors[index]],
            WebkitTextStroke: char === ' ' ? 'none' : `${borderWidth} black`,
            textStroke: char === ' ' ? 'none' : `${borderWidth} black`,
            display: 'inline-block',
            position: 'relative'
          }}
        >
          {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space to preserve spaces */}
        </Box>
      ))}
    </Box>
  );
}