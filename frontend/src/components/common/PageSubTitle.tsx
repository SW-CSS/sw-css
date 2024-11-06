import Link from 'next/link';

export interface PageSubTitleProps {
  title: string;
  urlText?: string;
  url?: string;
}

export default function PageSubTitle({ title, urlText, url }: PageSubTitleProps) {
  return (
    <div className="flex flex-grow justify-between">
      <p className="cursor-default text-lg font-semibold">{title}</p>
      {urlText && url && (
        <Link href={url} className="flex items-center gap-1 text-sm text-comment">
          {urlText}
        </Link>
      )}
    </div>
  );
}
