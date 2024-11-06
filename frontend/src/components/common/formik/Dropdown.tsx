/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { VscChevronDown } from '@react-icons/all-files/vsc/VscChevronDown';
import { VscChevronUp } from '@react-icons/all-files/vsc/VscChevronUp';
import { useState } from 'react';

import { FORM_SIZE } from '@/constants';
import useDivSize from '@/lib/hooks/useDivSize';

export interface DropdownOption {
  id: number | string;
  name: string;
}

export interface DropdownProps {
  name: string;
  label?: string;
  options: DropdownOption[];
  selectOptionText: string;
  selectedId: number | string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  isRequired?: boolean;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
  isAdmin?: boolean;
}

const Dropdown = ({ isRequired = false, size = 'md', ...props }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [componentRef, divSize] = useDivSize();

  const { label, errorText, options, selectOptionText, selectedId, setFieldValue, isAdmin, ...dropdownProps } = props;
  const hasError = errorText != null;

  const selectedValue = options.filter((option) => option.id === selectedId);

  return (
    <div className="relative flex flex-col gap-1" ref={componentRef}>
      {label && (
        <label htmlFor={dropdownProps.name} className={`${FORM_SIZE[size].subTextSize} font-semibold`}>
          {label} {isRequired && <span className={`${FORM_SIZE[size].subTextSize} font-semibold text-red-400`}>*</span>}
        </label>
      )}
      <div className="relative w-full">
        <button
          className={`m-0 w-full rounded-sm border-[1px] ${isAdmin ? 'border-admin-border' : 'border-border'} bg-white ${FORM_SIZE[size].padding} text-left ${FORM_SIZE[size].textSize} ${hasError && 'border-red-400'} ${typeof selectedId === 'number' && selectedId <= 0 && 'text-comment'}`}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedValue[0]?.name ?? selectOptionText}
        </button>
        {isOpen && <VscChevronUp className={`absolute right-2 top-1/2 -translate-y-1/2 ${FORM_SIZE[size].iconSize}`} />}
        {!isOpen && (
          <VscChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 ${FORM_SIZE[size].iconSize}`} />
        )}
      </div>
      {isOpen && (
        <div role="presentation" className="absolute left-0 top-0 z-[50]" onClick={() => setIsOpen(false)}>
          <div
            style={{
              width: `${divSize.width}px`,
              top: `${divSize.height + 10}px`,
            }}
            className="absolute max-h-[215px] min-h-4 overflow-auto rounded-sm border border-border bg-white p-2 shadow-md"
          >
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setFieldValue(dropdownProps.name, option.id);
                }}
                className={`block w-full rounded-sm ${FORM_SIZE[size].padding} text-left ${FORM_SIZE[size].subTextSize} ${isAdmin ? 'hover:bg-admin-secondary-light' : 'hover:bg-primary-light'}`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {errorText && <span className="pl-1 text-xs text-red-400">{errorText}</span>}
    </div>
  );
};

export default Dropdown;
