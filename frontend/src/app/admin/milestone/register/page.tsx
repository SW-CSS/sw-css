/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import * as Yup from 'yup';

import { FileUploader } from '@/app/components/Formik/FileUploader';
import { useRegisterHistoryInBatchMutation } from '@/lib/hooks/useAdminApi';
import { useFileQuery } from '@/lib/hooks/useApi';

const validationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required('파일을 첨부해주세요.')
    .test(
      'fileFormat',
      'Excel 파일(.xlsx)만 업로드 가능합니다.',
      (value) =>
        value instanceof File &&
        ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(
          value.type,
        ),
    ),
});

interface HistoryRegisterFormProps {
  file?: File;
}

const initialValues: HistoryRegisterFormProps = {
  file: undefined,
};

const Page = () => {
  const router = useRouter();
  const { data: standardFile } = useFileQuery('history_standard.pdf');
  const standardFileUrl = useMemo(() => {
    if (standardFile) {
      return URL.createObjectURL(standardFile);
    }
    return '';
  }, [standardFile]);

  const { data: sampleFile } = useFileQuery('history_register_sample.xlsx');
  const sampleFileUrl = useMemo(() => {
    if (sampleFile) {
      return URL.createObjectURL(sampleFile);
    }
    return '';
  }, [sampleFile]);

  const { mutate: registerHistories } = useRegisterHistoryInBatchMutation();

  return (
    <>
      <div className="flex items-center rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3 text-sm">
        <p className="flex flex-1 justify-center gap-1">
          점수 산정 기준 표 - <Image src="/images/admin/pdf_icon.svg" alt="pdf" width="16" height="16" />
          <a className="pl-[0.5px] text-red-500 underline underline-offset-4" href={standardFileUrl} download>
            점수산정파일.pdf
          </a>
        </p>
        <p className="flex flex-1 justify-center gap-1">
          일괄등록 파일 예시 - <Image src="/images/admin/xlsx_icon.svg" alt="xlsx" width="16" height="16" />
          <a className="pl-[0.5px] text-green-500 underline underline-offset-4" href={sampleFileUrl} download>
            sample.xlsx
          </a>
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          registerHistories(values.file, {
            onSuccess: () => {
              window.alert('실적 등록에 성공하였습니다.');
              router.push('/admin/milestone/list');
            },
            onError: () => {
              window.alert('실적 등록에 실패하였습니다.');
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, handleBlur, setFieldValue, errors }) => (
          <Form className="mt-4">
            <FileUploader
              name="file"
              label=""
              type="file"
              accept=".xlsx"
              onChange={(e) => e.currentTarget.files && setFieldValue('file', e.currentTarget.files[0])}
              onBlur={handleBlur}
              errorText={touched.file && errors.file ? errors.file : undefined}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 rounded-sm bg-primary-main px-5 py-1 text-white"
            >
              등록
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Page;