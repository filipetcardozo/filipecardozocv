import '@/styles/globals.css';
import 'highlight.js/styles/atom-one-dark.css';

import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useThemeMode } from '@/hooks/useThemeMode';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';

export default function App({ Component, pageProps }: AppProps) {
  const { mode, theme, toggleMode } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <ToggleThemeButton mode={mode} toggle={toggleMode} />
    </ThemeProvider>
  );
}
