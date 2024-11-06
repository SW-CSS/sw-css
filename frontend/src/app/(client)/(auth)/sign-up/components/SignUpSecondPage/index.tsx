/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Dropdown } from '@/components/common/formik/DropdownDdang';
import { TextInput } from '@/components/common/formik/TextInputDdang';
import { careerCategory } from '@/data/signUp';

import MajorDropdown from './components/MajorDropdown';

export interface SecondInfo {
  majorCollegeId: number;
  majorId: number;
  minorCollegeId: number;
  minorId: number;
  doubleMajorCollegeId: number;
  doubleMajorId: number;
  career: number;
  careerDetail: string;
}

const validationSchema = Yup.object().shape({
  majorId: Yup.number().min(1, '필수 입력란입니다. 전공을 선택해주세요.'),
  minorId: Yup.number().min(0, '필수 입력란입니다. 부전공 선택해주세요.'),
  doubleMajorId: Yup.number().min(0, '필수 입력란입니다. 복수전공을 선택해주세요.'),
  career: Yup.number().min(1, '필수 입력란입니다. 진로 분류를 선택해주세요.'),
  careerDetail: Yup.string().required('필수 입력란입니다. 진로 상세 계획을 입력해주세요.'),
});

export interface SignUpSecondPageProps {
  initialValues: SecondInfo;
  handlePrevButtonClick: (value: SecondInfo) => void;
  handleSubmitButtonClick: (value: SecondInfo) => void;
}

const SignUpSecondPage = ({ initialValues, handlePrevButtonClick, handleSubmitButtonClick }: SignUpSecondPageProps) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      handleSubmitButtonClick(values);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting, values, touched, handleChange, handleBlur, setFieldValue, errors }) => (
      <Form className="flex flex-col gap-6" autoComplete="off">
        <MajorDropdown
          collegeName="majorCollegeId"
          majorName="majorId"
          label="주전공"
          selectOptionText="주전공을 선택해주세요."
          collegeId={values.majorCollegeId}
          majorId={values.majorId}
          setFieldValue={setFieldValue}
          isRequired
          errorText={touched.majorId && errors.majorId ? errors.majorId : undefined}
        />
        <MajorDropdown
          collegeName="minorCollegeId"
          majorName="minorId"
          label="부전공"
          selectOptionText="부전공을 선택해주세요."
          collegeId={values.minorCollegeId}
          majorId={values.minorId}
          setFieldValue={setFieldValue}
          errorText={touched.minorId && errors.minorId ? errors.minorId : undefined}
        />
        <MajorDropdown
          collegeName="doubleMajorCollegeId"
          majorName="doubleMajorId"
          label="복수전공"
          selectOptionText="복수전공을 선택해주세요."
          collegeId={values.doubleMajorCollegeId}
          majorId={values.doubleMajorId}
          setFieldValue={setFieldValue}
          errorText={touched.doubleMajorId && errors.doubleMajorId ? errors.doubleMajorId : undefined}
        />
        <div>
          <Dropdown
            name="career"
            label="진로계획"
            options={careerCategory}
            selectOptionText="진로 분류 선택"
            selectedId={values.career}
            setFieldValue={setFieldValue}
            isRequired
            errorText={
              (touched.career && errors.career) || (touched.careerDetail && errors.careerDetail) ? '' : undefined
            }
          />
          <TextInput
            name="careerDetail"
            label=""
            type="text"
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
        <div className="flex w-full gap-2">
          <button
            className="mt-2 flex-grow rounded-sm border-[1px] border-primary-main p-3 text-base text-primary-main"
            type="reset"
            onClick={() => {
              handlePrevButtonClick(values);
            }}
          >
            이전으로
          </button>
          <button
            className="mt-2 flex-grow rounded-sm bg-primary-main p-3 text-base text-white"
            type="submit"
            disabled={isSubmitting}
          >
            회원가입
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default SignUpSecondPage;
