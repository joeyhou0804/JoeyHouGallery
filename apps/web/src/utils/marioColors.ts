/**
 * Mario-style color generator for text characters
 * Colors: Red (#E42926), Yellow (#FBCF08), Blue (#0B9BD7), Green (#45AF49)
 * 
 * Rules:
 * - Each character gets one color
 * - Adjacent characters cannot have the same color
 * - Characters two positions apart cannot have the same color
 */

export const MARIO_COLORS = {
  red: '#E42926',
  yellow: '#FBCF08', 
  blue: '#0B9BD7',
  green: '#45AF49'
} as const;

export type MarioColor = keyof typeof MARIO_COLORS;

const COLOR_SEQUENCE: MarioColor[] = ['red', 'yellow', 'blue', 'green'];

/**
 * Generates color assignments for Mario text following the constraints
 * @param text - The text to colorize
 * @returns Array of color assignments for each character
 */
export function generateMarioColors(text: string): MarioColor[] {
  const chars = text.split('');
  const colors: MarioColor[] = [];
  
  for (let i = 0; i < chars.length; i++) {
    // For spaces, still assign a color but it won't be used for rendering
    if (chars[i] === ' ') {
      colors.push('red'); // Default, spaces will be handled specially in rendering
      continue;
    }
    
    const availableColors = COLOR_SEQUENCE.filter(color => {
      // Check adjacent constraint (i-1)
      if (i > 0 && colors[i - 1] === color) {
        return false;
      }
      
      // Check two-apart constraint (i-2)
      if (i > 1 && colors[i - 2] === color) {
        return false;
      }
      
      return true;
    });
    
    // If no colors are available (shouldn't happen with 4 colors), use the first one
    const selectedColor = availableColors.length > 0 
      ? availableColors[i % availableColors.length]
      : COLOR_SEQUENCE[0];
    
    colors.push(selectedColor);
  }
  
  return colors;
}

/**
 * React component props for colorized Mario text
 */
export interface ColorizedMarioTextProps {
  text: string;
  fontFamily: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  className?: string;
  language?: 'en' | 'zh-CN';
}