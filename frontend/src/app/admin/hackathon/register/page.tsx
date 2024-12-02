'use client';

import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import PageTitle from '@/components/common/PageTitle';
import { HackathonDto } from '@/types/common.dto';

export default function HackathonCreatePage() {
  const [hackathonInfo, setHackathonInfo] = useState<HackathonInfo>(hackathonInfoInitialValue);

  return (
    <div className="w-full">
      <PageTitle title="해커톤 등록" />
      <Formik
        initialValues={hackathonInfo}
        validationSchema={hackathonValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      ></Formik>
    </div>
  );
}

export type HackathonInfo = Omit<HackathonDto, 'bannerImage' | 'id'> & { bannerImage: File };
export const hackathonInfoInitialValue: HackathonInfo = {
  name: '',
  content: '',
  bannerImage: new File([''], ''),
  applyStartDate: '',
  applyEndDate: '',
  hackathonStartDate: '',
  hackathonEndDate: '',
  teamCode: '',
};

export const hackathonValidationSchema = Yup.object().shape({
  name: Yup.string().required('등록할 대회명을 입력해주세요.'),
  content: Yup.string().required('등록할 대회의 상세정보를 입력해주세요.'),
  bannerImage: Yup.mixed()
    .required('대회의 배너 이미지를 첨부해주세요.')
    .test(
      'fileFormat',
      '이미지 파일(.jpg, .jpeg, .png), PDF 파일(.pdf)만 업로드 가능합니다.',
      (value) =>
        value instanceof File && ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(value.type),
    ),
  applyStartDate: Yup.date().required('대회 신청 시작일을 입력해주세요.'),
  applyEndDate: Yup.date().required('대회 신청 마지막 날을 입력해주세요.'),
  hackathonStartDate: Yup.date().required('대회 시작일을 입력해주세요.'),
  hackathonEndDate: Yup.date().required('대회 마지막 일을 입력해주세요.'),
  teamCode: Yup.string().required('대회에 참여할 수 있는 팀 등록 코드를 입력해주세요.'),
});
