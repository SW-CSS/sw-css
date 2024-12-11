'use client';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import PageTitle from '@/components/common/PageTitle';
import TextInput from '@/components/common/formik/TextInput';
import ImageUploader from '@/components/common/formik/ImageUploader';
import { DatePicker } from '@/components/common/formik/DatePicker';
import MarkdownEditor from '@/components/common/formik/MarkdownEditor';
import AdminHackathonInputSection from '@/components/ui/admin/hackathon/AdminHackathonInputSection';
import { MdImage } from '@react-icons/all-files/md/MdImage';
import { MdTextFields } from '@react-icons/all-files/md/MdTextFields';
import { MdDateRange } from '@react-icons/all-files/md/MdDateRange';
import { HackathonDto } from '@/types/common.dto';

export default function HackathonCreatePage() {
  return (
    <div className="w-full">
      <PageTitle title="해커톤 등록" />
      <Formik
        initialValues={hackathonInfoInitialValue}
        validationSchema={hackathonValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // TODO: API 연결
        }}
      >
        {({ isSubmitting, values, touched, handleChange, handleBlur, setFieldValue, errors }) => (
          <Form className="m-5 flex flex-col gap-6" autoComplete="off">
            <AdminHackathonInputSection
              icon={MdTextFields}
              label="대회명"
              inputElement={
                <TextInput
                  name="name"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.title && errors.title ? errors.title : undefined}
                  placeholder="대회명을 입력해주세요."
                />
              }
            />
            <AdminHackathonInputSection
              icon={MdImage}
              label="배너 이미지"
              inputElement={
                <div className="h-[120px] w-full">
                  <ImageUploader
                    name="bannerImage"
                    image={values.bannerImage}
                    fitStand="height"
                    setFieldValue={setFieldValue}
                    errorText={touched.bannerImage && errors.bannerImage ? errors.bannerImage : undefined}
                  />
                </div>
              }
            />
            <AdminHackathonInputSection
              icon={MdTextFields}
              label="대회명"
              inputElement={
                <MarkdownEditor
                  name="content"
                  value={values.content}
                  height="400px"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.content && errors.content ? errors.content : undefined}
                />
              }
            />
            <AdminHackathonInputSection
              icon={MdDateRange}
              label="신청 기간"
              inputElement={
                <div className="flex items-center justify-center gap-4">
                  <DatePicker
                    style={{ width: '200px' }}
                    name="applyStartDate"
                    value={values.applyStartDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={touched.applyStartDate && errors.applyStartDate ? errors.applyStartDate : undefined}
                  />
                  ~
                  <DatePicker
                    style={{ width: '200px' }}
                    name="applyEndDate"
                    value={values.applyEndDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={touched.applyEndDate && errors.applyEndDate ? errors.applyEndDate : undefined}
                  />
                </div>
              }
            />
            <AdminHackathonInputSection
              icon={MdDateRange}
              label="대회 기간"
              inputElement={
                <div className="flex items-center justify-center gap-4">
                  <DatePicker
                    style={{ width: '200px' }}
                    name="hackathonStartDate"
                    value={values.hackathonStartDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={
                      touched.hackathonStartDate && errors.hackathonStartDate ? errors.hackathonStartDate : undefined
                    }
                  />
                  ~
                  <DatePicker
                    style={{ width: '200px' }}
                    name="hackathonEndDate"
                    value={values.hackathonEndDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={
                      touched.hackathonEndDate && errors.hackathonEndDate ? errors.hackathonEndDate : undefined
                    }
                  />
                </div>
              }
            />
            <AdminHackathonInputSection
              icon={MdTextFields}
              label="팀 등록 코드"
              tooltip="대회에 팀을 등록할 때 필요한 비밀번호입니다."
              inputElement={
                <TextInput
                  style={{ width: '441px' }}
                  name="teamCode"
                  value={values.teamCode}
                  onChange={handleChange}
                  errorText={touched.teamCode && errors.teamCode ? errors.teamCode : undefined}
                  placeholder="팀 등록 코드"
                />
              }
            />
            <div className="pt-4">
              <button
                type="submit"
                className="rounded-sm bg-admin-primary-main px-8 py-2 text-lg font-bold text-white transition-colors hover:bg-admin-primary-dark"
                disabled={isSubmitting}
              >
                등록하기
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export type HackathonInfo = Omit<HackathonDto, 'bannerImage' | 'id'> & { bannerImage: File | null };
const hackathonInfoInitialValue: HackathonInfo = {
  title: '',
  content: '',
  bannerImage: null,
  applyStartDate: '',
  applyEndDate: '',
  hackathonStartDate: '',
  hackathonEndDate: '',
  teamCode: '',
};

const hackathonValidationSchema = Yup.object().shape({
  name: Yup.string().max(15, '대회명을 50자 이내로 입력해주세요.').required('등록할 대회명을 입력해주세요.'),
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
  applyEndDate: Yup.date()
    .min(Yup.ref('applyStartDate'), '신청 시작일보다 늦은 날짜로 지정해야 합니다')
    .required('대회 신청 마지막 날을 입력해주세요.'),
  hackathonStartDate: Yup.date().required('대회 시작일을 입력해주세요.'),
  hackathonEndDate: Yup.date()
    .min(Yup.ref('hackathonStartDate'), '대회 시작일보다 늦은 날짜로 지정해야 합니다')
    .required('대회 마지막 일을 입력해주세요.'),
  teamCode: Yup.string().required('대회에 참여할 수 있는 팀 등록 코드를 입력해주세요.'),
});
