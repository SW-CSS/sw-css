import { CategoryInfo } from '@/types';

import { HeaderAccordionWrapper, Linker, Accordion, AccordionLink } from './styled';

<<<<<<< Feature/#24-카테고리별_하위경로에_대한_네비게이션바_제작
const HeaderAccordion = ({ title, url, sub, description }: HeaderInfo) => (
=======
const HeaderAccordion = ({ title, url, sub }: CategoryInfo) => (
>>>>>>> main
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
