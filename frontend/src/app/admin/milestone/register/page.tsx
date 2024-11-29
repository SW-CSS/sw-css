'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { FileUploader } from '@/components/common/formik/FileUploader';
import { useRegisterHistoryInBatchMutation } from '@/lib/hooks/useAdminApi';

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

export default function MilestoneRegisterPage() {
  const router = useRouter();
  const { mutate: registerHistories } = useRegisterHistoryInBatchMutation();

  return (
    <>
      <div className="flex items-center rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3 text-sm">
        <p className="flex flex-1 justify-center gap-1">
          점수 산정 기준 표 - <Image src="/images/admin/pdf_icon.svg" alt="pdf" width="16" height="16" />
          <a
            className="pl-[0.5px] text-red-500 underline underline-offset-4"
            href={process.env.NEXT_PUBLIC_FILE_URL + '/history_standard.pdf'}
            download
          >
            점수산정파일.pdf
          </a>
        </p>
        <p className="flex flex-1 justify-center gap-1">
          일괄등록 파일 예시 - <Image src="/images/admin/xlsx_icon.svg" alt="xlsx" width="16" height="16" />
          <a
            className="pl-[0.5px] text-green-500 underline underline-offset-4"
            href={process.env.NEXT_PUBLIC_FILE_URL + '/history_register_sample.xlsx'}
            download
          >
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
              toast.info('실적 등록에 성공하였습니다.');
              router.refresh();
            },
            onError: () => {
              toast.error('실적 등록에 실패하였습니다.');
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
}
