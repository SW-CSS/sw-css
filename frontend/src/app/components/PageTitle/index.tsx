import Link from 'next/link';
import { VscAdd } from 'react-icons/vsc';

export interface PageTitleProps {
  title: string;
  description: string;
  urlText: string;
  url: string;
}

const PageTitle = ({ title, description, urlText, url }: PageTitleProps) => (
  <div className="flex">
    <div className="flex flex-col gap-2">
      <p className="cursor-default text-xl font-semibold">{title}</p>
      <p className="cursor-default text-sm text-comment">{description}</p>
    </div>
    {urlText !== '' && (
      <Link href={url} className="flex items-center gap-1 text-sm text-comment">
        <VscAdd />
        {urlText}
      </Link>
    )}
  </div>
);

export default PageTitle;
