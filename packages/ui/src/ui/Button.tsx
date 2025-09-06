import * as React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonProps = MuiButtonProps;

export function Button(props: ButtonProps) {
  return <MuiButton variant="contained" color="primary" {...props} />;
}

