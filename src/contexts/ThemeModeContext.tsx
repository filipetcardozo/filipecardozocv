import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline, Theme } from '@mui/material';
import { themeOptions } from '@/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
  theme: Theme;
}

const ThemeModeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeModeProviderProps {
  children: ReactNode;
}

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme-mode') as ThemeMode | null;
    if (stored === 'dark' || stored === 'light') setMode(stored);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next: ThemeMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', next);
      return next;
    });
  }, []);

  const theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ mode, toggleMode, theme }),
    [mode, toggleMode, theme]
  );

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  )
};

export const useThemeMode = (): ThemeContextValue => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return ctx;
};