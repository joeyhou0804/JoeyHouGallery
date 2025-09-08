"use client";

import * as React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeModeContext } from '@/themeMode';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('theme-mode') as 'light' | 'dark' | null) : null;
    if (saved) setMode(saved);
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#1976d2' },
          secondary: { main: '#9c27b0' },
        },
        typography: {
          fontFamily: '"Sofia Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }),
    [mode]
  );

  const toggle = React.useCallback(() => {
    setMode((m) => {
      const next = m === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') localStorage.setItem('theme-mode', next);
      return next;
    });
  }, []);

  return (
    <JotaiProvider>
      <ThemeModeContext.Provider value={{ toggle }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </JotaiProvider>
  );
}
