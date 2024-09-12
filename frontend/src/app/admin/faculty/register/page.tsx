/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */

'use client';

import { Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import EmailTextInput from '@/components/Formik/EmailTextInput';
import TextInput from '@/components/Formik/TextInput';

interface FormType {
  email: string;
  name: string;
}

const initialValues: FormType = {
  email: '',
  name: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('필수 입력란입니다. 이메일을 입력해주세요.')
    .matches(/^((?!@).)*$/, '부산대 이메일만 가입 가능합니다. 이메일 도메인 부분을 삭제해주세요.')
    .matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/, '존재하는 이메일인지 확인해주세요.'),
  name: Yup.string().required('필수 입력란입니다. 이름을 입력해주세요.'),
});

const Page = () => {
  const handleSubmitButtonClick = (values: FormType) => {
    // TODO: 등록 api 호출;
    console.log(values.email, values.name);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const file = (target.files as FileList)[0];

    // TODO: 일괄 등록 api 호출.
    console.log(file);
  };

  const handleSampleButtonClick = () => {
    // TODO: api가 넘겨주는 파일 다운로드 되도록 수정
    const url = '/data/faculty_register_sample.xlsx';
    const a = document.createElement('a');
    a.href = url;
    a.download = 'faculty_register_sample';
    a.click();
  };

  const handlePasswordCopyButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_FACULTY_PASSWORD ?? '');
      toast.info('비밀번호가 복사되었습니다.');
    } catch (e) {
      toast.error('복사에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="mb-10 rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3">
        <p className="text-lg font-semibold">교직원 일괄 등록 방법</p>
        <ul className="flex flex-col gap-2 px-4 pb-8 pt-4">
          <li className="flex text-base">
            <Image src="/images/admin/xlsx_icon.svg" alt="xlsx" width="16" height="16" />
            <button
              type="button"
              className="pl-[0.5px] text-green-500 underline underline-offset-4"
              onClick={handleSampleButtonClick}
            >
              sample
            </button>
            을 참조하여 xlxs 파일을 작성해주세요.
          </li>
          <li>작성한 xlxs 파일을 업로드하고 등록버튼을 눌러주세요.</li>
          <li>교직원이 일괄 등록되면 이메일과 임시비밀번호로 등록됩니다.</li>
          <li>
            임시비밀번호는{' '}
            <span className="cursor-pointer text-red-400" onClick={handlePasswordCopyButtonClick}>
              {process.env.NEXT_PUBLIC_FACULTY_PASSWORD}
            </span>
            입니다.
          </li>
          <li>
            <Link href="/admin/my-page" className="text-blue-400 underline underline-offset-2">
              마이페이지
            </Link>
            로 이동하여 비밀번호를 수정해주세요.
          </li>
        </ul>
        <div className="flex">
          <label
            htmlFor="file"
            className="mr-2 cursor-pointer rounded-sm border-admin-border bg-admin-secondary-main p-2 text-base text-white"
          >
            파일 등록
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFilesChange}
            className="m-0 flex-grow cursor-pointer rounded-sm border-[1px] border-admin-border bg-white p-2 text-base file:m-0 file:h-0 file:w-0 file:border-0 file:p-0"
          />
        </div>
      </div>
      <div className="rounded-sm border-[1px] border-admin-border bg-admin-background-light p-5">
        <p className="text-lg font-semibold">교직원 등록 방법</p>
        <ul className="flex flex-col gap-2 px-4 pb-8 pt-4">
          <li>부산대 이메일과 이름을 입력하고 등록버튼을 눌러주세요.</li>
          <li>
            임시비밀번호는{' '}
            <span className="cursor-pointer text-red-400" onClick={handlePasswordCopyButtonClick}>
              {process.env.NEXT_PUBLIC_FACULTY_PASSWORD}
            </span>
            입니다.
          </li>
        </ul>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            handleSubmitButtonClick(values);
          }}
          className="w-full"
        >
          {({ isSubmitting, values, touched, handleChange, handleBlur, errors }) => (
            <Form className="flex gap-6" autoComplete="off">
              <div className="flex-grow">
                <EmailTextInput
                  name="email"
                  label="아이디(이메일)"
                  type="text"
                  placeholder="예) hong.gil.dong"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.email && errors.email ? errors.email : undefined}
                />
              </div>
              <div className="flex-grow">
                <TextInput
                  name="name"
                  label="이름"
                  type="text"
                  isRequired
                  placeholder="예) 홍길동"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.name && errors.name ? errors.name : undefined}
                />
              </div>
              <button
                className="mt-5 w-fit rounded-sm bg-primary-main p-3 text-base text-white"
                type="submit"
                disabled={isSubmitting}
              >
                교직원 등록
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Page;
