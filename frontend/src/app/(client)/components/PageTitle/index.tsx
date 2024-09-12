/* eslint-disable import/no-extraneous-dependencies */
import { VscAdd } from '@react-icons/all-files/vsc/VscAdd';
import Link from 'next/link';

export interface PageTitleProps {
  title: string;
  description: string;
  urlText: string;
  url: string;
}

const PageTitle = ({ title, description, urlText, url }: PageTitleProps) => (
  <div className="flex flex-grow justify-between">
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
