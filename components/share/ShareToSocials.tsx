import { ActionIcon, Group, Modal } from '@mantine/core';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import React, { useEffect, useState } from 'react';
import { RiShareLine } from 'react-icons/ri';

interface ShareToSocialsProps {
  title: string;
}

const ShareToSocials = ({ title }: ShareToSocialsProps) => {
  const [opened, setOpened] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const longURL = window.location.href;
    fetch(`https://tinyurl.com/api-create.php?url=${longURL}`)
      .then((res) => res.text())
      .then((data) => setUrl(data))
      .catch(() => setUrl(longURL));
  }, []);

  return (
    <>
      <Modal
        size="xs"
        radius={0}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Share Event"
      >
        <Group spacing={9}>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} />
          </TwitterShareButton>
          <FacebookShareButton url={url} title={title}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <RedditShareButton url={url} title={title}>
            <RedditIcon size={32} />
          </RedditShareButton>
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={32} />
          </TelegramShareButton>
          <WhatsappShareButton url={url} title={title} separator=":: ">
            <WhatsappIcon size={32} />
          </WhatsappShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} />
          </LinkedinShareButton>
          <VKShareButton url={url}>
            <VKIcon size={32} />
          </VKShareButton>
        </Group>
      </Modal>
      <ActionIcon onClick={() => setOpened(true)} variant="default" radius={0} size="lg">
        <RiShareLine />
      </ActionIcon>
    </>
  );
};

export default ShareToSocials;
