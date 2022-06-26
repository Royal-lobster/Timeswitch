import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, useMantineTheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Layout from '../components/layout';
import '@fontsource/pacifico';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    appMaxWidth: string;
  }
}

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const [primaryColor, setPrimaryColor] = useState<string>('green');
  const theme = useMantineTheme();

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        {/* <!-- HTML Meta Tags --> */}
        <title>TimeSwitch</title>
        <meta
          name="description"
          content="Create and share events and countdowns on internet with ease."
        />
        <link rel="shortcut icon" href="/favicon.svg" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://timeswitch.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TimeSwitch" />
        <meta
          property="og:description"
          content="Create and share events and countdowns on internet with ease."
        />
        <meta property="og:image" content="https://i.imgur.com/SqXjcMB.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="timeswitch.vercel.app" />
        <meta property="twitter:url" content="https://timeswitch.vercel.app/" />
        <meta name="twitter:title" content="TimeSwitch" />
        <meta
          name="twitter:description"
          content="Create and share events and countdowns on internet with ease."
        />
        <meta name="twitter:image" content="https://i.imgur.com/SqXjcMB.png" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            primaryColor,
            colorScheme,
            other: {
              appMaxWidth: '1000px',
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <Layout>
              <Component setPrimaryColor={setPrimaryColor} {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>

      <style jsx global>
        {`
          .favicon {
            fill: ${theme.colors[primaryColor][6]};
          }
        `}
      </style>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
