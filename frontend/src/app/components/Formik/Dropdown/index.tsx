/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';

import useDivSize from '@/lib/hooks/useDivSize';

export interface DropdownOption {
  id: number;
  name: string;
}

export interface DropdownProps {
  name: string;
  label: string;
  options: DropdownOption[];
  selectOptionText: string;
  selectedId: number;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  isRequired?: boolean;
  errorText?: string;
}

export const Dropdown = ({ isRequired = false, ...props }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [componentRef, size] = useDivSize();

  const { label, errorText, options, selectOptionText, selectedId, setFieldValue, ...dropdownProps } = props;
  const hasError = errorText != null;

  const selectedValue = options.filter((option) => option.id === selectedId);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={dropdownProps.name} className="text-sm font-semibold">
        {label} {isRequired && <span className="text-sm font-semibold text-red-400">*</span>}
      </label>
      <div className="relative w-full" ref={componentRef}>
        <button
          className={`m-0 w-full rounded-sm border-[1px] border-border p-3 text-left text-base ${hasError && 'border-red-400'} ${selectedId <= 0 && 'text-comment'}`}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          {selectedValue[0]?.name ?? selectOptionText}
        </button>
        {isOpen && <VscChevronUp className="absolute right-2 top-1/2 -translate-y-1/2 text-lg" />}
        {!isOpen && <VscChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-lg" />}
      </div>
      {isOpen && (
        <div
          role="presentation"
          className="absolute left-0 top-0 z-[80] h-[100vh] w-[100vw]"
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              width: `${size.width}px`,
              top: `${size.positionY + size.height + 10}px`,
              left: `${size.positionX}px`,
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
                className="block w-full rounded-sm p-3 text-left text-sm hover:bg-primary-light"
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
