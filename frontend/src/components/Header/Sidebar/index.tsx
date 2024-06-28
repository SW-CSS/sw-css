import { useState } from 'react';

import { COLOR } from '@/constants';
import { CategoryDto } from '@/types/common.dto';

import * as S from './styled';

export interface SidebarProps {
  open: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerInfos: CategoryDto[];
}

const Sidebar = ({ open, handleOpen, headerInfos }: SidebarProps) => {
  const [currTab, setCurrTab] = useState<string>('');

  const handleClose = () => {
    handleOpen((e) => !e);
    setCurrTab('');
  };

  return (
    <S.SidebarWrapper>
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
      <S.SidebarContent style={{ left: `${open ? '-150px' : '50px'}` }}>
        {headerInfos.map((item) => (
          <S.SidebarContentLayout
            key={item.title}
            style={{ maxHeight: `${currTab === item.title ? '200px' : '42px'}` }}
          >
            <S.SidebarContentTitle
              style={{
                color: `${currTab === item.title ? 'white' : 'black'}`,
                backgroundColor: `${currTab === item.title ? COLOR.primary.dark : 'transparent'}`,
              }}
              onClick={() => setCurrTab(item.title)}
            >
              {item.title}
            </S.SidebarContentTitle>
            {item.sub.map((subItem) => (
              <S.SidebarContentSubTitle key={subItem.key} href={subItem.url} onClick={handleClose}>
                {subItem.title}
              </S.SidebarContentSubTitle>
            ))}
          </S.SidebarContentLayout>
        ))}
      </S.SidebarContent>
    </S.SidebarWrapper>
  );
};

export default Sidebar;
