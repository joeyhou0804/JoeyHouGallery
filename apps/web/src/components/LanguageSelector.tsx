"use client";

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import { languageAtom, Language } from '@joey/atoms';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
];

export default function LanguageSelector() {
  const [language, setLanguage] = useAtom(languageAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    handleClose();
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <>
      <Tooltip title="Change Language">
        <IconButton onClick={handleClick} color="inherit" size="small">
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={lang.code === language}
            sx={{ minWidth: 120 }}
          >
            <Typography component="span" sx={{ mr: 1, fontSize: '1.2em' }}>
              {lang.flag}
            </Typography>
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}