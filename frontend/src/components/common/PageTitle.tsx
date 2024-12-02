export interface CustomPageTitleProps {
  title: string;
  description?: string;
}

type BuiltInDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type PageTitleProps = BuiltInDivProps & CustomPageTitleProps;

export default function PageTitle({ title, description, ...props }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-1" {...props}>
      <h1 className="cursor-default text-[28px] font-semibold">{title}</h1>
      {description && <div className="text-comment">{description}</div>}
    </div>
  );
}
