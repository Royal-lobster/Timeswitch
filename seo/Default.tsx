import { DefaultSeo } from 'next-seo';

export const TimeSwitchDefaultSeo = () => (
  <DefaultSeo
    title="TimeSwitch"
    description="Create and share events and countdowns on internet with ease."
    additionalLinkTags={[{ rel: 'shortcut icon', href: '/favicon.svg' }]}
    openGraph={{
      type: 'website',
      url: 'https://timeswitch.vercel.app/',
      site_name: 'TimeSwitch',
      images: [{ url: 'https://i.imgur.com/XOgWaWx.png' }],
    }}
  />
);
