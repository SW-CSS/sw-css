import Image from 'next/image';
import { CgEye } from 'react-icons/cg';

import { COLOR, TEAM_STATUS } from '@/constants';
import { TeamBuildingDto } from '@/types/common.dto';

import * as S from './styled';

const TeamBuilding = ({ id, category, status, title, developer, designer, artist, other, views }: TeamBuildingDto) => {
  const recruitment = [
    { img: '/images/teamBuilding/team_type_img_1.svg', text: '개발', count: developer },
    { img: '/images/teamBuilding/team_type_img_2.svg', text: '디자인', count: artist },
    { img: '/images/teamBuilding/team_type_img_3.svg', text: '기획', count: designer },
    { img: '/images/teamBuilding/team_type_img_4.svg', text: '기타', count: other },
  ];
  return (
    <S.TeamBuildingWrapper href={`/team-building/${id}`}>
      <S.TeamHeaderWrapper>
        <S.CategoryText>{category}</S.CategoryText>
        <S.StatusText color={TEAM_STATUS[status].color}>{TEAM_STATUS[status].text}</S.StatusText>
      </S.TeamHeaderWrapper>
      <S.TeamBodyWrapper>
        <S.TeamTitle>{title}</S.TeamTitle>
        <S.RecruitmentWrapper>
          {recruitment.map((item) => {
            if (item.count !== 0) {
              return (
                <S.RecruitmentItem key={`${id}-${item.text}`}>
                  <Image src={item.img} alt={item.text} width="30" height="30" priority={false} />
                  <S.RecruitmentItemText>
                    {item.text}
                    <br />
                    <span style={{ color: COLOR.black_text }}>{item.count}명</span>
                  </S.RecruitmentItemText>
                </S.RecruitmentItem>
              );
            }
            return null;
          })}
        </S.RecruitmentWrapper>
        <S.ViewDiv>
          <CgEye color={COLOR.comment} />
          {views}
        </S.ViewDiv>
      </S.TeamBodyWrapper>
    </S.TeamBuildingWrapper>
  );
};

export default TeamBuilding;
