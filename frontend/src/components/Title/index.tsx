export interface TitleProps {
  title: string;
  description?: string;
}

const Title = ({ title, description }: TitleProps) => (
  <div className="flex flex-col gap-1">
    <p className="cursor-default text-[28px] font-semibold">{title}</p>
    {description && <div className="text-comment">{description}</div>}
  </div>
);

export default Title;
