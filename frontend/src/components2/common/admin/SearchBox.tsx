/* eslint-disable prettier/prettier */

'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import Dropdown from '@/components2/common/formik/Dropdown';
import TextInput from '@/components2/common/formik/TextInput';
import { FORM_SIZE } from '@/constants';

interface SearchFormProps {
  field: number;
  keyword: string;
}

export interface SearchBoxProps {
  initialValues: SearchFormProps;
  fieldCategories: { id: number; name: string }[];
  path: string;
}

export default function SearchBox({ initialValues, fieldCategories, path }: SearchBoxProps) {
  const router = useRouter();

  const handleSearchButtonClick = (values: SearchFormProps) => {
    router.push(`${path}?field=${values.field}&keyword=${values.keyword}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSearchButtonClick(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
        <Form className="grid flex-grow grid-cols-[2fr_4fr_1fr] content-center gap-2" autoComplete="off">
          <Dropdown
            name="field"
            options={fieldCategories}
            selectOptionText="검색 분야 선택"
            selectedId={values.field}
            setFieldValue={setFieldValue}
            size="sm"
            isAdmin
          />
          <TextInput
            name="keyword"
            type="text"
            placeholder="검색어를 입력해주세요."
            value={values.keyword}
            onChange={handleChange}
            onBlur={handleBlur}
            size="sm"
            isAdmin
          />
          <button
            className={`rounded-sm bg-admin-secondary-dark ${FORM_SIZE.sm.textSize} text-white`}
            type="submit"
            disabled={isSubmitting}
          >
            검색
          </button>
        </Form>
      )}
    </Formik>
  );
}
