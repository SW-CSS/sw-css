import { MilestoneOverviewScore } from '@/types/milestone';

export interface MilestoneCircleChartProps {
  chartSize: number;
  fontSize: 'sm' | 'lg';
  milestoneOverviewScore: MilestoneOverviewScore;
}

export default function MilestoneCircleChart({
  chartSize,
  fontSize,
  milestoneOverviewScore,
}: MilestoneCircleChartProps) {
  const { activityScore, globalScore, communityScore, totalScore } = milestoneOverviewScore;
  const scores = [
    { start: 0, score: activityScore, color: '#8FA3F8', title: '실전적 SW역량' },
    { start: activityScore, score: globalScore, color: '#9DE6BC', title: '글로벌 SW역량' },
    {
      start: activityScore + globalScore,
      score: communityScore,
      color: '#AA8CF8',
      title: '커뮤니티 SW역량',
    },
  ];

  return (
    <div
      className="relative mx-auto rounded-full bg-milestone-gray-light"
      style={{ width: `${chartSize}px`, height: `${chartSize}px` }}
    >
      {scores.map((bar) => (
        <div
          key={bar.title}
          className="absolute h-full w-full rounded-[50%]"
          style={{
            background: `conic-gradient(transparent ${(bar.start / 1000.0) * 360}deg,
                          ${bar.color} ${(bar.start / 1000.0) * 360}deg,
                          ${bar.color} ${((bar.start + bar.score) / 1000.0) * 360}deg,
                          transparent ${((bar.start + bar.score) / 1000.0) * 360}deg)`,
          }}
        />
      ))}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ width: `${chartSize / 1.7}px`, height: `${chartSize / 1.7}px` }}
      />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <p className={`text-comment ${fontSize === 'sm' ? 'text-xs' : 'text-base'}`}>{totalScore}</p>
        <p className={`font-bold text-black ${fontSize === 'sm' ? 'text-xs' : 'text-base'}`}>/ 1000</p>
      </div>
    </div>
  );
}
