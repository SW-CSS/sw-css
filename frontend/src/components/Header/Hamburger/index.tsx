import { useState } from 'react';

import { COLOR } from '@/constants';

import { HeaderAccordionProps } from '../HeaderAccordion';
import {
  HamburgerWrapper,
  HamburgerLogo,
  HamburgerLine,
  HamburgerContent,
  HamburgerContentLayout,
  HamburgerContentTitle,
  HamburgerContentSubTitle,
} from '../style';

export interface HamburgerProps {
  open: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerBar: HeaderAccordionProps[];
}

const Hamburger = ({ open, handleOpen, headerBar }: HamburgerProps) => {
  const [currTab, setCurrTab] = useState<string>('');

  const handleClose = () => {
    handleOpen((e) => !e);
    setCurrTab('');
  };

  return (
    <HamburgerWrapper>
      <HamburgerLogo onClick={handleClose} style={{ left: `${open ? '-200px' : 0}` }}>
        <HamburgerLine
          style={{
            transform: `${open ? 'translate(-50%, -50%) rotate(40deg)' : 'translate(-50%, calc(-50% - 12px))'}`,
          }}
        />
        <HamburgerLine style={{ transform: 'translate(-50%, -50%)', display: `${open ? 'none' : 'block'}` }} />
        <HamburgerLine
          style={{
            transform: `${open ? 'translate(-50%, -50%) rotate(-40deg)' : 'translate(-50%, calc(-50% + 12px))'}`,
          }}
        />
      </HamburgerLogo>
      <HamburgerContent style={{ left: `${open ? '-150px' : '50px'}` }}>
        {headerBar.map((item) => (
          <HamburgerContentLayout
            key={item.title}
            style={{ maxHeight: `${currTab === item.title ? '200px' : '42px'}` }}
          >
            <HamburgerContentTitle
              style={{
                color: `${currTab === item.title ? 'white' : 'black'}`,
                backgroundColor: `${currTab === item.title ? COLOR.malibu_dark : 'transparent'}`,
              }}
              onClick={() => setCurrTab(item.title)}
            >
              {item.title}
            </HamburgerContentTitle>
            {item.sub.map((subItem) => (
              <HamburgerContentSubTitle key={subItem.key} href={subItem.url} onClick={handleClose}>
                {subItem.title}
              </HamburgerContentSubTitle>
            ))}
          </HamburgerContentLayout>
        ))}
      </HamburgerContent>
    </HamburgerWrapper>
  );
};

export default Hamburger;
