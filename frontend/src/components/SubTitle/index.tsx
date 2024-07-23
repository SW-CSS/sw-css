import Link from 'next/link';

export interface SubTitleProps {
  title: string;
  urlText?: string;
  url?: string;
}

const SubTitle = ({ title, urlText, url }: SubTitleProps) => (
  <div className="flex flex-grow justify-between">
    <p className="cursor-default text-lg font-semibold">{title}</p>
    {urlText && url && (
      <Link href={url} className="flex items-center gap-1 text-sm text-comment">
        {urlText}
      </Link>
    )}
  </div>
);

export default SubTitle;
