'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import Dropdown from '@/components/Formik/Dropdown';
import TextInput from '@/components/Formik/TextInput';
import { FORM_SIZE } from '@/constants';

interface FormProps {
  field: number;
  keyword: string;
}

export interface SearchBoxProps {
  initialValues: FormProps;
  fieldCategories: { id: number; name: string }[];
}

const SearchBox = ({ initialValues, fieldCategories }: SearchBoxProps) => {
  const router = useRouter();

  const handleSearchButtonClick = (values: FormProps) => {
    router.push(`/admin/member/list?field=${values.field}&keyword=${values.keyword}`);
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
};

export default SearchBox;
