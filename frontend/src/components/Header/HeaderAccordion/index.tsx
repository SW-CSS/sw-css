import { HeaderInfo } from '@/types';

import { HeaderAccordionWrapper, Linker, Accordion, AccordionLink } from './styled';

const HeaderAccordion = ({ title, url, sub, description }: HeaderInfo) => (
  <HeaderAccordionWrapper>
    <Linker href={url}>{title}</Linker>
    <Accordion>
      {sub.map((item) => (
        <AccordionLink key={item.key} href={item.url}>
          {item.title}
        </AccordionLink>
      ))}
    </Accordion>
  </HeaderAccordionWrapper>
);

export default HeaderAccordion;
