import { HeaderAccordionWarper, Linker, Accordion, AccordionLink } from '../style';

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
  <HeaderAccordionWarper>
    <Linker href={url}>{title}</Linker>
    <Accordion>
      {sub.map((item) => (
        <AccordionLink key={item.key} href={item.url}>
          {item.title}
        </AccordionLink>
      ))}
    </Accordion>
  </HeaderAccordionWarper>
);

export default HeaderAccordion;
