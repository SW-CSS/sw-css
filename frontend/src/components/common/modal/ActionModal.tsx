import { useCallback } from 'react';
import PageTitle from '../PageTitle';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';

type DivProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'size'>;
export interface ActionModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  onClose: () => void;
  children?: Readonly<React.ReactNode>;
}

export default function ActionModal({
  isOpen,
  size = 'sm',
  title,
  description,
  onClose,
  children,
  ...props
}: ActionModalProps & DivProps) {
  const widthSize = useCallback(() => {
    switch (size) {
      case 'sm':
        return 'w-[450px]';
      case 'md':
        return 'w-[650px]';
      case 'lg':
        return 'w-[900px]';
    }
  }, []);

  if (!isOpen) return null;
  return (
    <button
      onClick={onClose}
      className="fixed inset-0 z-[98] flex cursor-default items-center justify-center bg-black bg-opacity-30"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        {...props}
        className={`flex max-h-[80vh] flex-col items-center gap-5 rounded bg-white p-5 ${widthSize()}`}
      >
        <div className="flex w-full items-start justify-between">
          <PageTitle title={title} description={description} />
          <button onClick={onClose} className="text-comment">
            <VscClose className="h-8 w-8" />
          </button>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </button>
  );
}
