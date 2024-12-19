'use client';

import { useMemo } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import Dropdown from '@/components/common/formik/Dropdown';
import TextInput from '@/components/common/formik/TextInput';
import InputSection from '@/components/common/InputSection';
import AuthSignUpMajorDropdown from '@/components/ui/auth/AuthSignUpMajorDropdown';

import { StudentMemberDto } from '@/types/common.dto';
import { getColleges } from '@/mocks/college';
import { careerCategory } from '@/data/signUp';

import { MdSchool } from '@react-icons/all-files/md/MdSchool';
import { MdBusiness } from '@react-icons/all-files/md/MdBusiness';
import { MdTextFields } from '@react-icons/all-files/md/MdTextFields';
import { MdLocalPhone } from '@react-icons/all-files/md/MdLocalPhone';

interface MyPageInfoFormProps {
  info: StudentMemberDto;
}

export default function MyPageInfoForm({ info }: MyPageInfoFormProps) {
  const initialInfoValues: InfoFormProps = useMemo(() => {
    const [majorCollegeId, majorId] = getCollegeIdAndMajorId(info.major);
    const [minorCollegeId, minorId] = getCollegeIdAndMajorId(info.minor);
    const [doubleMajorCollegeId, doubleMajorId] = getCollegeIdAndMajorId(info.doubleMajor);
    return {
      name: info.name,
      phoneNumber: info.phoneNumber,
      majorCollegeId: majorCollegeId,
      majorId: majorId,
      minorCollegeId: minorCollegeId,
      minorId: minorId,
      doubleMajorCollegeId: doubleMajorCollegeId,
      doubleMajorId: doubleMajorId,
      career: getCareerId(info.career),
      careerDetail: info.careerDetail,
    };
  }, [info]);

  function handleChangeInformationButtonClick(values: InfoFormProps) {
    // TODO: API 연결
  }

  return (
    <Formik
      initialValues={initialInfoValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleChangeInformationButtonClick(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, touched, values, handleChange, handleBlur, setFieldValue, errors }) => (
        <Form className="my-4 flex w-full flex-col gap-5 overflow-auto px-10">
          <InputSection
            icon={MdTextFields}
            label="이름"
            inputElement={
              <TextInput
                name="name"
                value={values.name}
                onChange={handleChange}
                errorText={touched.name && errors.name ? errors.name : undefined}
                placeholder="이름을 입력해주세요."
              />
            }
          />
          <InputSection
            icon={MdLocalPhone}
            label="전화번호"
            inputElement={
              <TextInput
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                errorText={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
                placeholder="전화번호를 입력해주세요."
              />
            }
          />
          <InputSection
            icon={MdSchool}
            label="주전공"
            inputElement={
              <AuthSignUpMajorDropdown
                collegeType="majorCollegeId"
                majorType="majorId"
                majorText="주전공"
                selectOptionText="주전공을 선택해주세요."
                collegeId={values.majorCollegeId}
                majorId={values.majorId}
                setFieldValue={setFieldValue}
                errorText={touched.majorId && errors.majorId ? errors.majorId : undefined}
              />
            }
          />
          <InputSection
            icon={MdSchool}
            label="부전공"
            inputElement={
              <AuthSignUpMajorDropdown
                collegeType="minorCollegeId"
                majorType="minorId"
                majorText="부전공"
                selectOptionText="부전공을 선택해주세요."
                collegeId={values.minorCollegeId}
                majorId={values.minorId}
                setFieldValue={setFieldValue}
                errorText={touched.minorId && errors.minorId ? errors.minorId : undefined}
              />
            }
          />
          <InputSection
            icon={MdSchool}
            label="복수전공"
            inputElement={
              <AuthSignUpMajorDropdown
                collegeType="doubleMajorCollegeId"
                majorType="doubleMajorId"
                majorText="복수전공"
                selectOptionText="복수전공을 선택해주세요."
                collegeId={values.doubleMajorCollegeId}
                majorId={values.doubleMajorId}
                setFieldValue={setFieldValue}
                errorText={touched.doubleMajorId && errors.doubleMajorId ? errors.doubleMajorId : undefined}
              />
            }
          />
          <InputSection
            icon={MdBusiness}
            label="진로계획"
            inputElement={
              <div className="w-full">
                <Dropdown
                  name="career"
                  options={careerCategory}
                  selectOptionText="진로 분류 선택"
                  selectedId={values.career}
                  setFieldValue={setFieldValue}
                  errorText={
                    (touched.career && errors.career) || (touched.careerDetail && errors.careerDetail) ? '' : undefined
                  }
                />
                <TextInput
                  name="careerDetail"
                  placeholder="진로 상세 계획을 작성해주세요."
                  value={values.careerDetail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={
                    (touched.career && errors.career) || (touched.careerDetail && errors.careerDetail)
                      ? errors.career || errors.careerDetail
                      : undefined
                  }
                />
              </div>
            }
          />
          <div className="flex justify-center md:justify-end">
            <button
              type="submit"
              className="w-full rounded-md bg-primary-main px-4 py-2 font-bold text-white transition-colors hover:bg-primary-dark md:w-fit"
              disabled={isSubmitting}
            >
              내 정보 수정
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('필수 입력란입니다. 이름을 입력해주세요.'),
  phoneNumber: Yup.string()
    .required('필수 입력란입니다. 전화번호를 입력해주세요.')
    .matches(/^([0-9]{10,11})$/, '띄어쓰기나 특수기호 없이 숫자로만 입력해주세요.'),
  majorId: Yup.number().min(1, '필수 입력란입니다. 전공을 선택해주세요.'),
  minorId: Yup.number().min(0, '필수 입력란입니다. 부전공 선택해주세요.'),
  doubleMajorId: Yup.number().min(0, '필수 입력란입니다. 복수전공을 선택해주세요.'),
  career: Yup.number().min(1, '필수 입력란입니다. 진로 분류를 선택해주세요.'),
  careerDetail: Yup.string().required('필수 입력란입니다. 진로 상세 계획을 입력해주세요.'),
});

interface InfoFormProps {
  name: string;
  phoneNumber: string;
  majorCollegeId: number;
  majorId: number;
  minorCollegeId: number;
  minorId: number;
  doubleMajorCollegeId: number;
  doubleMajorId: number;
  career: number;
  careerDetail: string;
}

function getCollegeIdAndMajorId(majorName: string) {
  for (const college of getColleges) {
    for (const major of college.majors) {
      if (major.name !== majorName) continue;
      return [college.id, major.id];
    }
  }
  return [0, -1];
}

function getCareerId(careerName: string) {
  for (const career of careerCategory) {
    if (career.type !== careerName) continue;
    return career.id;
  }
  return -1;
}
