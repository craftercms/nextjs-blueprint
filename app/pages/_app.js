import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import lightTheme from '../styles/theme/default';
import '../styles/globals.css';
import { crafterConf } from '@craftercms/classes';
import { fetchIsAuthoring } from '@craftercms/ice';
import createCache from '@emotion/cache';

crafterConf.configure({
  baseUrl: process.env.NEXT_PUBLIC_CRAFTERCMS_HOST_NAME,
  site: process.env.NEXT_PUBLIC_CRAFTERCMS_SITE_NAME,
  cors: true,
});

export const contentTypeMap = {
  "/component/hero": Hero,
};

const CrafterAppContext = React.createContext();

export const useCrafterAppContext = () => React.useContext(CrafterAppContext);

export default function App(props) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  const emotionCache = useMemo(
    () => createCache({ key: "css", prepend: true }),
    []
  );
  const [appContext, setAppContext] = useState({ isAuthoring: false });
  useEffect(() => {
    fetchIsAuthoring().then((isAuthoring) => setAppContext({ isAuthoring }));
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <CrafterAppContext.Provider value={appContext}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CrafterAppContext.Provider>
    </CacheProvider>
  );
}
