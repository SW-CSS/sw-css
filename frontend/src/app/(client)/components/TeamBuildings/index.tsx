import TeamBuildingCard from '@/components/ui/team-building/TeamBuildingCard';
import { teamBuildingInfos } from '@/mocks/teamBuilding';

import { AlertComment, AlertDescription, AlertLink, AlertTitle, TeamBuildingWrapper } from './styled';
import GoPageIcon from '@/components/ui/home/GoPageIcon';
import { Description, Title, TitleContent, TitleWrapper } from '../styled';

const TeamBuildings = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <TitleWrapper style={{ justifyContent: 'space-between' }}>
      <TitleContent>
        <Title>팀 빌딩</Title>
        <Description>프로젝트 팀원을 모집하고 있나요? 함께할 팀을 찾고 있나요?</Description>
      </TitleContent>
      <GoPageIcon name="더보기" url="/team-building" />
    </TitleWrapper>
    <TeamBuildingWrapper>
      {teamBuildingInfos.length === 0 && (
        <AlertComment>
          <AlertTitle>아직 팀이 생성되지 않았습니다.</AlertTitle>
          <AlertDescription>지금 바로 새로운 팀을 생성해 보세요! </AlertDescription>
          <AlertLink href="/team-building/create">[팀 생성하기]</AlertLink>
        </AlertComment>
      )}
      {teamBuildingInfos.map((team) => (
        <TeamBuildingCard
          id={team.id}
          category={team.category}
          status={team.status}
          title={team.title}
          developer={team.developer}
          designer={team.designer}
          artist={team.artist}
          other={team.other}
          views={team.views}
        />
      ))}
    </TeamBuildingWrapper>
  </div>
);

export default TeamBuildings;
