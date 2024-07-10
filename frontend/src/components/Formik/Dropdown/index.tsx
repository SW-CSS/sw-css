/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';

import { FORM_SIZE } from '@/constants';
import useDivSize from '@/lib/hooks/useDivSize';

export interface DropdownOption {
  id: number;
  name: string;
}

export interface DropdownProps {
  name: string;
  label?: string;
  options: DropdownOption[];
  selectOptionText: string;
  selectedId: number;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  isRequired?: boolean;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Dropdown = ({ isRequired = false, size = 'md', ...props }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [componentRef, divSize] = useDivSize();

  const { label, errorText, options, selectOptionText, selectedId, setFieldValue, ...dropdownProps } = props;
  const hasError = errorText != null;

  const selectedValue = options.filter((option) => option.id === selectedId);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={dropdownProps.name} className={`${FORM_SIZE[size].subTextSize} font-semibold`}>
          {label} {isRequired && <span className={`${FORM_SIZE[size].subTextSize} font-semibold text-red-400`}>*</span>}
        </label>
      )}
      <div className="relative w-full" ref={componentRef}>
        <button
          className={`m-0 w-full rounded-sm border-[1px] border-border bg-white ${FORM_SIZE[size].padding} text-left ${FORM_SIZE[size].textSize} ${hasError && 'border-red-400'} ${selectedId <= 0 && 'text-comment'}`}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          {selectedValue[0]?.name ?? selectOptionText}
        </button>
        {isOpen && <VscChevronUp className={`absolute right-2 top-1/2 -translate-y-1/2 ${FORM_SIZE[size].iconSize}`} />}
        {!isOpen && (
          <VscChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 ${FORM_SIZE[size].iconSize}`} />
        )}
      </div>
      {isOpen && (
        <div
          role="presentation"
          className="absolute left-0 top-0 z-[80] h-[100vh] w-[100vw]"
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              width: `${divSize.width}px`,
              top: `${divSize.positionY + divSize.height + 10}px`,
              left: `${divSize.positionX}px`,
            }}
            className="absolute max-h-[215px] min-h-4 overflow-auto rounded-sm border-[1px] border-border bg-white p-2 shadow-md"
          >
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setFieldValue(dropdownProps.name, option.id);
                }}
                className={`block w-full rounded-sm ${FORM_SIZE[size].padding} text-left ${FORM_SIZE[size].subTextSize} hover:bg-primary-light`}
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
