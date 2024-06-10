import { useState } from 'react';

import { COLOR } from '@/constants';

import * as S from './styled';
import { HeaderAccordionProps } from '../HeaderAccordion';

export interface SidebarProps {
  open: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerBar: HeaderAccordionProps[];
}

const Sidebar = ({ open, handleOpen, headerBar }: SidebarProps) => {
  const [currTab, setCurrTab] = useState<string>('');

  const handleClose = () => {
    handleOpen((e) => !e);
    setCurrTab('');
  };

  return (
    <S.HamburgerWrapper>
      <S.HamburgerLogo onClick={handleClose} style={{ left: `${open ? '-200px' : 0}` }}>
        <S.HamburgerLine
          style={{
            transform: `${open ? 'translate(-50%, -50%) rotate(40deg)' : 'translate(-50%, calc(-50% - 12px))'}`,
          }}
        />
        <S.HamburgerLine style={{ transform: 'translate(-50%, -50%)', display: `${open ? 'none' : 'block'}` }} />
        <S.HamburgerLine
          style={{
            transform: `${open ? 'translate(-50%, -50%) rotate(-40deg)' : 'translate(-50%, calc(-50% + 12px))'}`,
          }}
        />
      </S.HamburgerLogo>
      <S.HamburgerContent style={{ left: `${open ? '-150px' : '50px'}` }}>
        {headerBar.map((item) => (
          <S.HamburgerContentLayout
            key={item.title}
            style={{ maxHeight: `${currTab === item.title ? '200px' : '42px'}` }}
          >
            <S.HamburgerContentTitle
              style={{
                color: `${currTab === item.title ? 'white' : 'black'}`,
                backgroundColor: `${currTab === item.title ? COLOR.malibu_dark : 'transparent'}`,
              }}
              onClick={() => setCurrTab(item.title)}
            >
              {item.title}
            </S.HamburgerContentTitle>
            {item.sub.map((subItem) => (
              <S.HamburgerContentSubTitle key={subItem.key} href={subItem.url} onClick={handleClose}>
                {subItem.title}
              </S.HamburgerContentSubTitle>
            ))}
          </S.HamburgerContentLayout>
        ))}
      </S.HamburgerContent>
    </S.HamburgerWrapper>
  );
};

export default Sidebar;
