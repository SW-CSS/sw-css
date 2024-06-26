import { CategoryDto } from '@/types/common.dto';

import { HeaderAccordionWrapper, Linker, Accordion, AccordionLink } from './styled';

const HeaderAccordion = ({ title, url, sub }: CategoryDto) => (
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
