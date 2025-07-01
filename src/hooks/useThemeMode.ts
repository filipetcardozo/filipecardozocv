import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { themeOptions } from '@/theme';

export function useThemeMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme-mode');
    if (stored === 'dark' || stored === 'light') {
      setMode(stored);
    }
  }, []);

  const toggleMode = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', next);
      return next;
    });
  };

  const theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);

  return { mode, toggleMode, theme };
}
