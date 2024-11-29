export interface PageTitleProps {
  title: string;
  description?: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="cursor-default text-[28px] font-semibold">{title}</p>
      {description && <div className="text-comment">{description}</div>}
    </div>
  );
}
