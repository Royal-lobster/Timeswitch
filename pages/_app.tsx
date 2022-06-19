import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Layout from '../components/layout';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    appMaxWidth: string;
  }
}

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>TimeSwitch</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Head>

      <MantineProvider
        theme={{
          colorScheme: 'dark',
          primaryColor: 'yellow',
          other: {
            appMaxWidth: '1000px',
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
