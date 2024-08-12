/* eslint-disable implicit-arrow-linebreak */

'use client';

import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { DatePicker } from '@/app/components/Formik/DatePicker';
import { FileUploader } from '@/app/components/Formik/FileUploader';
import { TextInput } from '@/app/components/Formik/TextInput';
import PageTitle from '@/app/components/PageTitle';
import { useMilestoneHistoryCreateMutation } from '@/lib/hooks/useApi';
import { MilestoneHistoryCreateDto } from '@/types/common.dto';
import { Milestone, MilestoneCategory } from '@/types/milestone';

import MilestoneDropdown from './components/MilestoneDropdown';

const validationSchema = Yup.object().shape({
  milestoneId: Yup.number().min(1, '활동 구분을 선택해주세요.'),
  count: Yup.number().min(1, '횟수는 1 이상의 값이어야 합니다.').required('등록할 실적의 활동 횟수를 입력해주세요.'),
  description: Yup.string().required('등록할 실적의 상세 정보를 입력해주세요.'),
  activatedAt: Yup.date().max(new Date(), '활동 인정일은 미래일 수 없습니다.').required('활동 인정일을 기입해주세요.'),
  file: Yup.mixed().required('파일을 첨부해주세요.'),
});

interface MilestoneHistoryInfo {
  categoryId: number;
  milestoneId: number;
  count: number;
  description: string;
  file?: File;
  activatedAt: string;
}

const initialValues: MilestoneHistoryInfo = {
  categoryId: 0,
  milestoneId: 0,
  count: 1,
  description: '',
  file: undefined,
  activatedAt: '',
};

const Page = () => {
  const router = useRouter();
  const { mutate: createMilestoneHistory } = useMilestoneHistoryCreateMutation();
  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory>();
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>();

  const handleSubmitButtonClick = (values: MilestoneHistoryCreateDto) => {
    createMilestoneHistory(values, {
      onSuccess: () => {
        toast.info('실적 등록에 성공하였습니다.');
        router.push('/my-page/milestone/register');
      },
      onError: () => {
        toast.error('실적 등록에 실패하였습니다.');
      },
    });
  };

  return (
    <div className="rounded-sm bg-white p-5">
      <PageTitle title="실적 등록" description="" urlText="" url="" />
      <p className="mb-10 mt-6 flex items-center justify-between border-b border-black py-4 text-lg font-bold">
        실적 등록하기
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmitButtonClick(values as MilestoneHistoryCreateDto);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, touched, handleChange, handleBlur, setFieldValue, errors }) => (
          <Form className="flex flex-col gap-4">
            <MilestoneDropdown
              label=""
              selectOptionText="선택"
              categoryId={values.categoryId}
              milestoneId={values.milestoneId}
              categoryName="categoryId"
              milestoneName="milestoneId"
              setFieldValue={setFieldValue}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedMilestone={setSelectedMilestone}
              errorText={touched.milestoneId && errors.milestoneId ? errors.milestoneId : undefined}
            />
            <div className="flex gap-4">
              <TextInput
                name="unitScore"
                label="건당 점수"
                type="text"
                defaultValue={0}
                value={selectedMilestone?.score || 0}
                disabled
              />
              <span className="mt-6">x</span>
              <TextInput
                name="count"
                label="횟수(건)"
                type="number"
                value={values.count}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={touched.count && errors.count ? errors.count : undefined}
              />
              <span className="mt-6">=</span>
              <TextInput
                name="totalScore"
                label="총 점수"
                type="text"
                defaultValue={0}
                value={(selectedMilestone?.score ?? 0) * values.count}
                disabled
              />
            </div>
            <div className="flex gap-4">
              <TextInput
                name="description"
                label="등록 상세 제목"
                placeholder="예) 제 5회 창의융합해커톤 수상"
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={touched.description && errors.description ? errors.description : undefined}
              />
              <DatePicker
                type="date"
                name="activatedAt"
                label="활동 인정일"
                value={values.activatedAt}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={touched.activatedAt && errors.activatedAt ? errors.activatedAt : undefined}
              />
            </div>
            <FileUploader
              name="file"
              label="증빙자료 제출"
              type="file"
              onChange={(e) => e.currentTarget.files && setFieldValue('file', e.currentTarget.files[0])}
              onBlur={handleBlur}
              errorText={touched.file && errors.file ? errors.file : undefined}
            />
            <div>
              <ul className="flex list-disc flex-col gap-2 px-4 text-sm">
                <li>
                  증빙자료(어학점수 인증서, 공모전 수상 상장 등){' '}
                  <span className="text-red-400">pdf, jpeg, png 파일형식으로 등록</span>
                </li>
                <li>
                  영어성적은 부산대학교 학생지원시스템에 접속하여{' '}
                  <Link
                    href="https://e-onestop.pusan.ac.kr/menu/common/contents?menuld=2000070107&rMenu=07"
                    className="font-bold text-blue-400 underline"
                  >
                    {'<주요 공인 영어 시험 간 성적 환산표>'}
                  </Link>
                  에 따라 TOEIC 점수로 환산하여 입력
                </li>
                <li>
                  edwith 강좌 수료 등록의 경우 <b>실명</b>으로 발급받은 수료증 첨부
                </li>
              </ul>
            </div>
            <div className="flex justify-end py-4">
              <button type="submit" disabled={isSubmitting} className="rounded-sm bg-primary-main px-5 py-1 text-white">
                등록하기
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;
