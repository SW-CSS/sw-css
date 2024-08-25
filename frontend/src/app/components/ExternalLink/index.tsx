import Image from 'next/image';

import { externalLinkInfos } from '@/data/externalLink';

import { ImageTitle, ImageWrapper, ItemWrapper, LinkWrapper } from './styled';

const ExternalLink = () => (
  <LinkWrapper>
    {externalLinkInfos.map((link) => {
      const markup = { __html: link.title };
      return (
        <ItemWrapper key={link.url} href={link.url}>
          <ImageWrapper>
            <Image src={link.img} alt={link.title} width="50" height="50" style={{ width: 50, height: 50 }} />
          </ImageWrapper>
          <ImageTitle dangerouslySetInnerHTML={markup} />
        </ItemWrapper>
      );
    })}
  </LinkWrapper>
);

export default ExternalLink;
