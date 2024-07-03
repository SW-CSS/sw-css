/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Dropdown } from '@/app/components/Formik/Dropdown';
import { TextInput } from '@/app/components/Formik/TextInput';
import { careerCategory } from '@/data/signUp';

import MajorDropdown from './components/MajorDropdown';

export interface SecondInfo {
  majorId: number;
  minorId: number;
  doubleMajorId: number;
  career: number;
  careerDetail: string;
}

const initialValues: SecondInfo = {
  majorId: -1,
  minorId: -1,
  doubleMajorId: -1,
  career: -1,
  careerDetail: '',
};

const validationSchema = Yup.object().shape({
  majorId: Yup.number().min(1, '필수 입력란입니다. 전공을 선택해주세요.'),
  minorId: Yup.number().min(0, '필수 입력란입니다. 부전공 선택해주세요.'),
  doubleMajorId: Yup.number().min(0, '필수 입력란입니다. 복수전공을 선택해주세요.'),
  career: Yup.number().min(1, '필수 입력란입니다. 진로 분류를 선택해주세요.'),
  careerDetail: Yup.string().required('필수 입력란입니다. 진로 상세 계획을 입력해주세요.'),
});

const SignUpSecondPage = ({ handleSubmitButtonClick }: { handleSubmitButtonClick: (value: SecondInfo) => void }) => (
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
          name="majorId"
          label="주전공"
          selectOptionText="주전공을 선택해주세요."
          selectedId={values.majorId}
          setFieldValue={setFieldValue}
          isRequired
          errorText={touched.majorId && errors.majorId ? errors.majorId : undefined}
        />
        <MajorDropdown
          name="minorId"
          label="부전공"
          selectOptionText="부전공을 선택해주세요."
          selectedId={values.minorId}
          setFieldValue={setFieldValue}
          errorText={touched.minorId && errors.minorId ? errors.minorId : undefined}
        />
        <MajorDropdown
          name="doubleMajorId"
          label="복수전공"
          selectOptionText="복수전공을 선택해주세요."
          selectedId={values.doubleMajorId}
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

        <button
          className="mt-2 rounded-sm bg-primary-main p-3 text-base text-white"
          type="submit"
          disabled={isSubmitting}
        >
          회원가입
        </button>
      </Form>
    )}
  </Formik>
);

export default SignUpSecondPage;
