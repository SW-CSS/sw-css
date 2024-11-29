'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { DatePicker } from '@/components/common/formik/DatePicker';
import { FileUploader } from '@/components/common/formik/FileUploader';
import TextInput from '@/components/common/formik/TextInput';
import PageTitle from '@/components/common/PageTitle';
import { useMilestoneHistoryCreateMutation } from '@/lib/hooks/useApi';
import { MilestoneHistoryCreateDto } from '@/types/common.dto';
import { Milestone, MilestoneCategory } from '@/types/milestone';

import MilestoneCategoryDropdown from '@/components/ui/milestone/MilestoneCategoryDropdown';

const validationSchema = Yup.object().shape({
  milestoneId: Yup.number().min(1, '활동 구분을 선택해주세요.'),
  count: Yup.number().min(1, '횟수는 1 이상의 값이어야 합니다.').required('등록할 실적의 활동 횟수를 입력해주세요.'),
  description: Yup.string().required('등록할 실적의 상세 정보를 입력해주세요.'),
  activatedAt: Yup.date().max(new Date(), '활동 인정일은 미래일 수 없습니다.').required('활동 인정일을 기입해주세요.'),
  file: Yup.mixed()
    .required('파일을 첨부해주세요.')
    .test(
      'fileFormat',
      '이미지 파일(.jpg, .jpeg, .png), PDF 파일(.pdf)만 업로드 가능합니다.',
      (value) =>
        value instanceof File && ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(value.type),
    ),
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

export default function MilestoneRegisterPage() {
  const router = useRouter();
  const { mutate: createMilestoneHistory } = useMilestoneHistoryCreateMutation();
  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory>();
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>();

  const handleSubmitButtonClick = (values: MilestoneHistoryCreateDto) => {
    createMilestoneHistory(values, {
      onSuccess: (res) => {
        console.log(res);
        toast.info('실적 등록에 성공하였습니다.');
        // router.push('/my-page/milestone-list');
      },
      onError: () => {
        toast.error('실적 등록에 실패하였습니다.');
      },
    });
  };

  return (
    <div className="rounded-sm bg-white p-5">
      <PageTitle title="실적 등록" />
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
            <MilestoneCategoryDropdown
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
            <div className="flex flex-wrap gap-4">
              <div className="min-w-[4em] flex-grow">
                <TextInput
                  name="unitScore"
                  label="건당 점수"
                  type="text"
                  value={selectedMilestone?.score || 0}
                  disabled
                />
              </div>
              <div className="flex flex-grow gap-4">
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
              </div>
              <div className="flex flex-grow gap-4">
                <span className="mt-6">=</span>
                <div className="min-w-[4em] flex-grow">
                  <TextInput
                    name="totalScore"
                    label="총 점수"
                    type="text"
                    value={!selectedMilestone?.score ? 0 : selectedMilestone.score * values.count}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <TextInput
                name="description"
                label="등록 상세 제목"
                placeholder="예) 제 5회 창의융합해커톤 수상"
                tooltip="해당 마일스톤 실적의 핵심 내용을 간단명료하게 입력해주세요."
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
                tooltip="마일스톤 실적이 공식적으로 인정된 날짜를 선택해주세요.\n ex) 대회 수상일, 자격증 취득일, 프로젝트 완료일."
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
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => e.currentTarget.files && setFieldValue('file', e.currentTarget.files[0])}
              onBlur={handleBlur}
              errorText={touched.file && errors.file ? errors.file : undefined}
            />
            <div>
              <ul className="flex list-disc flex-col gap-2 px-4 text-sm">
                <li>
                  증빙자료(어학점수 인증서, 공모전 수상 상장 등){' '}
                  <span className="text-red-400">pdf, jpg, jpeg, png 파일형식으로 등록</span>
                </li>
                <li>
                  영어성적은 부산대학교 학생지원시스템에 접속하여{' '}
                  <a
                    href="https://doc.pusan.ac.kr:8443/SynapDocViewServer/viewer/doc.html?key=fb3fcfcf20eb427c84ccc1a5c45b3481&convType=img&convLocale=ko_KR&contextPath=/SynapDocViewServer"
                    className="font-bold text-blue-400 underline"
                    target="_blank"
                  >
                    {'<주요 공인 영어 시험 간 성적 환산표>'}
                  </a>
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
}
