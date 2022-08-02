import '../styles/globals.css';
import type { AppProps } from 'next/app';
import useDarkMode from 'hooks/useDarkMode';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  useDarkMode();
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
