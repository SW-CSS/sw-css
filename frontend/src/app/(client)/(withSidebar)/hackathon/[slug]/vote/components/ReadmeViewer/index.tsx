import { useGithubReadme } from '@/lib/hooks/useGithubReadme';
import MarkdownViewer from '@/components/ui/hackathon/MarkdownViewer';

interface ReadmeViewerProps {
  repoUrl: string;
}

const ReadmeViewer = ({ repoUrl }: ReadmeViewerProps) => {
  const { data: readme, isPending, isError } = useGithubReadme(repoUrl);
  if (isPending)
    return (
      <div className="flex flex-grow items-center justify-center text-xl text-comment">
        README 문서를 불러오는 중입니다.
      </div>
    );
  if (isError || !readme)
    return (
      <div className="flex flex-grow items-center justify-center text-xl text-comment">
        README 문서를 불러오는 데 실패했습니다.
      </div>
    );
  return <MarkdownViewer content={readme} />;
};

export default ReadmeViewer;
