'use client';

import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';

import TextInput from '@/components/common/formik/TextInput';

interface AdminHackathonManageTeamSearchBoxProps {
  hackathonId: number;
  count: number;
  keyword: string;
}

export default function AdminHackathonManageTeamSearchBox({
  hackathonId,
  count,
  keyword,
}: AdminHackathonManageTeamSearchBoxProps) {
  const router = useRouter();

  const adminHackathonSearchInitialValue = {
    keyword,
  };

  function handleSearch(values: AdminHackathonSearchBoxField) {
    let path = `/admin/hackathon/manage/${hackathonId}?`;
    if (values.keyword !== '') path += `keyword=${values.keyword}`;
    router.push(path);
  }

  return (
    <div className="my-2 flex items-center justify-between rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3 text-sm">
      <span>
        총 <span className="text-admin-primary-main">{count}</span>개의 팀이 참여했습니다.
      </span>
      <Formik
        initialValues={adminHackathonSearchInitialValue}
        onSubmit={(values, { setSubmitting }) => {
          handleSearch(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, handleChange, handleBlur }) => (
          <Form className="grid w-[300px] grid-cols-[2fr_1fr] content-center gap-2" autoComplete="off">
            <TextInput
              name="keyword"
              type="text"
              placeholder="팀명으로 검색"
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
  keyword: string;
}
