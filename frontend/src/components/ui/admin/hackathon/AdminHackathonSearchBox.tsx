'use client';

import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';

import Dropdown from '@/components/common/formik/Dropdown';
import TextInput from '@/components/common/formik/TextInput';

interface AdminHackathonSearchBoxProps {
  count: number;
  page: number;
  status: number;
  keyword: string;
}

export default function AdminHackathonSearchBox({ count, page, status, keyword }: AdminHackathonSearchBoxProps) {
  const router = useRouter();

  const adminHackathonSearchInitialValue = {
    status,
    keyword,
  };

  function handleSearch(values: AdminHackathonSearchBoxField) {
    let path = '/admin/hackathon?';
    if (page !== 1) path += `page=${page}&`;
    if (values.status !== 1) path += `status=${values.status}&`;
    if (values.keyword !== '') path += `keyword=${values.keyword}`;
    router.push(path);
  }

  return (
    <div className="my-2 flex items-center justify-between rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3 text-sm">
      <span>
        총 <span className="text-admin-primary-main">{count}</span>개의 대회가 있습니다.
      </span>
      <Formik
        initialValues={adminHackathonSearchInitialValue}
        onSubmit={(values, { setSubmitting }) => {
          handleSearch(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
          <Form className="grid w-[400px] grid-cols-[2fr_6fr_1fr] content-center gap-2" autoComplete="off">
            <Dropdown
              name="status"
              options={adminHackathonSearchField}
              selectOptionText="대회 상태"
              selectedId={values.status === 1 ? '' : values.status}
              setFieldValue={setFieldValue}
              size="sm"
              isAdmin
            />
            <TextInput
              name="keyword"
              type="text"
              placeholder="대회명 검색"
              value={values.keyword}
              onChange={handleChange}
              onBlur={handleBlur}
              size="sm"
              isAdmin
            />
            <button
              className="my-0.5 rounded-sm bg-admin-secondary-dark text-white"
              type="submit"
              disabled={isSubmitting}
            >
              검색
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

interface AdminHackathonSearchBoxField {
  status: number;
  keyword: string;
}

const adminHackathonSearchField = [
  { id: 1, name: '전체' },
  { id: 2, name: '진행중' },
  { id: 3, name: '종료' },
];
