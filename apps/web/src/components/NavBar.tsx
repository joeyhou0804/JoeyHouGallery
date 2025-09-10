"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { ThemeModeContext } from '@/themeMode';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

const links = [
  { href: '/', labelKey: 'home' },
  { href: '/apps', labelKey: 'applications' },
  { href: '/arts', labelKey: 'arts' },
  { href: '/handbooks', labelKey: 'handbooks' },
  { href: '/posters', labelKey: 'posters' },
  { href: '/reports', labelKey: 'reports' },
  { href: '/videos', labelKey: 'videos' },
  { href: '/websites', labelKey: 'websites' },
];

export default function NavBar() {
  const pathname = usePathname();
  const theme = useTheme();
  const { toggle } = useContext(ThemeModeContext);
  const { t } = useTranslation();
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ gap: 2, justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} href="/" style={{ textDecoration: 'none' }}>
          Joey Hou Gallery
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Button
                key={l.href}
                component={Link}
                href={l.href}
                color={active ? 'primary' : 'inherit'}
                variant={active ? 'contained' : 'text'}
                size="small"
                sx={{
                  textDecoration: active ? 'underline' : 'none',
                  textUnderlineOffset: active ? '4px' : undefined,
                }}
              >
                {t(l.labelKey)}
              </Button>
            );
          })}
          <LanguageSelector />
          <Tooltip title={theme.palette.mode === 'dark' ? 'Switch to light' : 'Switch to dark'}>
            <IconButton onClick={toggle} color="inherit" size="small">
              {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
