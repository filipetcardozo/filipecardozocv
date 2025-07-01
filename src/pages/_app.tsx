import '@/styles/globals.css';
import 'highlight.js/styles/atom-one-dark.css';
import type { AppProps } from 'next/app';
import { ThemeModeProvider } from '@/contexts/ThemeModeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeModeProvider>
      <Component {...pageProps} />
    </ThemeModeProvider>
  );
}
