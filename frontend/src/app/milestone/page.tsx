import Image from 'next/image';
import {
  Content,
  ContentWrapper,
  Description,
  ImageWrapper,
  Information,
  InformationList,
  InformationTitle,
  Title,
} from './styled';

const Page = () => {
  return (
    <ContentWrapper>
      <Content>
        <ImageWrapper maxWidth="230px" maxHeight="66px">
          <Image src="/images/milestone_img01.png" priority={false} alt="" fill />
        </ImageWrapper>
        <Description>
          <Title>마일스톤이란</Title>
          마일스톤은 전공자들의 SW역량을 종합적으로 평가하기 위한 역량평가지수입니다.
          <br />
          학생들은 교내외 여러 활동들을 통하여 실전적 SW역량, 글로벌 역량, 커뮤니케이션 역량을 균형있게 함양하고
          SW중심대학사업단에서는 학생들의 적립된 마일스톤 점수에 따라 매년 장학생을 선발하고 있습니다.
        </Description>
        <ImageWrapper maxWidth="429px" maxHeight="208px">
          <Image src="/images/milestone_img02.png" priority={false} alt="" fill />
        </ImageWrapper>
        <InformationList>
          <Information>
            <InformationTitle>마일스톤 획득 방법</InformationTitle>
            각 영역별 황동 수행 시, 책정 기준에 따라 마일스톤을 획득할 수 있습니다.
            <br />
            상세 내용은 아래 표를 참고해주세요.
          </Information>
          <Information>
            <InformationTitle>마일스톤 평가기간</InformationTitle>
            전년도 9월부터 당해년도 8월까지의 실적
            <br />※ SW 창업, 오픈소스 SW 컨트리뷰션의 경우 당해년도 1월부터 9월까지의 실적만을 반영함.
          </Information>
          <Information>
            <InformationTitle>마일스톤 확인 방법</InformationTitle>
            SW역량지원시스템에서는 나의 마일스톤 현황을 한 눈에 볼 수 있도록 제공하고 있습니다.
            <br />
            로그인 후, 메인 페이지와 마이페이지에서 확인하실 수 있습니다.
          </Information>
        </InformationList>
        <ImageWrapper maxWidth="890px" maxHeight="1028px">
          <Image src="/images/milestone_img03.png" priority={false} alt="" fill />
        </ImageWrapper>
      </Content>
    </ContentWrapper>
  );
};

export default Page;