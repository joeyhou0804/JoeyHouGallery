"use client";

import React from 'react';

export const ThemeModeContext = React.createContext<{ toggle: () => void }>({ toggle: () => {} });

