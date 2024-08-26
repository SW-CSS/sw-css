import Link from 'next/link';

export interface TitleProps {
  title: string;
  description?: string;
  urlText?: string;
  url?: string;
}

const Title = ({ title, description, urlText, url }: TitleProps) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-grow justify-between">
      <p className="cursor-default text-xl font-semibold">{title}</p>
      {urlText && url && (
        <Link href={url} className="flex items-center gap-1 text-sm text-comment">
          {urlText}
        </Link>
      )}
    </div>
    {description && <div className="text-comment">{description}</div>}
  </div>
);

export default Title;
