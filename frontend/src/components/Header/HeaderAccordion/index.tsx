import { HeaderAccordionWrapper, Linker, Accordion, AccordionLink } from './styled';

export interface HeaderAccordionProps {
  title: string;
  url: string;
  sub: {
    title: string;
    url: string;
    key: string;
  }[];
}

const HeaderAccordion = ({ title, url, sub }: HeaderAccordionProps) => (
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
