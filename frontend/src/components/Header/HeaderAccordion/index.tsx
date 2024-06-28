<<<<<<< Feature/#50-리액트_쿼리_셋팅
import { CategoryInfo } from '@/types/dto';
=======
import { CategoryDto } from '@/types/common.dto';
>>>>>>> main

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
