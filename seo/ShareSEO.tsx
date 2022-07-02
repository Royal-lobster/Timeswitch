import { NextSeo } from 'next-seo';
import React from 'react';

interface ShareSEOProps {
  title: string;
  description: string;
  time: string;
  timezones: string[];
  primaryColor: string;
}

const ShareSEO = ({ title, description, time, timezones, primaryColor }: ShareSEOProps) => (
  <NextSeo
    title={`${title} | TimeSwitch`}
    description={description}
    openGraph={{
      type: 'website',
      url: 'https://timeswitch.vercel.app/',
      site_name: 'TimeSwitch',
      images: [
        {
          url: `https://timeswitch.vercel.app/api/og-image?title=${encodeURI(
            title
          )}&time=${encodeURI(time)}&timezones=${encodeURI(
            timezones.join(',')
          )}&primaryColor=${primaryColor.replace('#', '')}`,
        },
      ],
    }}
    twitter={{
      cardType: 'summary_large_image',
    }}
  />
);

export default ShareSEO;
