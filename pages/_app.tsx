import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import '../styles/global.css';
import { MantineProvider, ColorScheme, ColorSchemeProvider, useMantineTheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Layout from '../components/layout';
import '@fontsource/pacifico';
import { Theme } from '../utils/Theme';
import { TimeSwitchDefaultSeo } from '../seo/Default';

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
      <TimeSwitchDefaultSeo />
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ ...Theme, primaryColor, colorScheme }}
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
