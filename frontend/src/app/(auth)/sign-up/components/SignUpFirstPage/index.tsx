/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput } from '@/app/components/Formik/TextInput';

import EmailTextInput from './components/EmailTextInput';

export interface FirstInfo {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  studentId: string;
  phoneNumber: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('필수 입력란입니다. 이메일을 입력해주세요.')
    .matches(/^((?!@).)*$/, '부산대 이메일만 가입 가능합니다. 이메일 도메인 부분을 삭제해주세요.')
    .matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/, '존재하는 이메일인지 확인해주세요.'),
  password: Yup.string()
    .required('필수 입력란입니다. 비밀번호를 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,15}$/,
      '6자에서 15자 이내의 영문, 숫자, 특수문자의 조합이어야 합니다.',
    ),
  passwordConfirmation: Yup.string()
    .required('필수 입력란입니다. 비밀번호를 입력해주세요.')
    .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  name: Yup.string().required('필수 입력란입니다. 이름을 입력해주세요.'),
  studentId: Yup.string()
    .required('필수 입력란입니다. 학번을 입력해주세요.')
    .matches(/^[\d]{9}$/, '9자리의 학번을 입력해주세요.'),
  phoneNumber: Yup.string()
    .required('필수 입력란입니다. 전화번호를 입력해주세요.')
    .matches(/^([0-9]{10,11})$/, '띄어쓰기나 특수기호 없이 숫자로만 입력해주세요.'),
});

interface SignUpFirstPageProps {
  initialValues: FirstInfo;
  handleNextButtonClick: (value: FirstInfo) => void;
}

const SignUpSecondPage = ({ initialValues, handleNextButtonClick }: SignUpFirstPageProps) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      handleNextButtonClick(values);
      setSubmitting(false);
    }}
    className="w-full"
  >
    {({ isSubmitting, values, touched, handleChange, handleBlur, errors }) => (
      <Form className="flex flex-col gap-6" autoComplete="off">
        <EmailTextInput
          name="email"
          label="아이디(이메일)"
          type="text"
          placeholder="아이디 입력"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errorText={touched.email && errors.email ? errors.email : undefined}
        />
        <TextInput
          name="password"
          label="비밀번호"
          type="password"
          isRequired
          placeholder="비밀번호 입력"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          errorText={touched.password && errors.password ? errors.password : undefined}
        />
        <TextInput
          name="passwordConfirmation"
          label="비밀번호 검증"
          type="password"
          isRequired
          placeholder="비밀번호 입력"
          value={values.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          errorText={
            touched.passwordConfirmation && errors.passwordConfirmation ? errors.passwordConfirmation : undefined
          }
        />
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
        <TextInput
          name="studentId"
          label="학번"
          type="text"
          isRequired
          placeholder="예) 202012345"
          value={values.studentId}
          onChange={handleChange}
          onBlur={handleBlur}
          errorText={touched.studentId && errors.studentId ? errors.studentId : undefined}
        />
        <TextInput
          name="phoneNumber"
          label="전화번호"
          type="text"
          isRequired
          placeholder="예) 01012345678"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errorText={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
        />
        <button
          className="mt-2 rounded-sm bg-primary-main p-3 text-base text-white"
          type="submit"
          disabled={isSubmitting}
        >
          다음
        </button>
        <div className="text-center text-xs text-comment">
          이미 회원이신가요?{' '}
          <a href="/sign-in" className="font-semibold underline underline-offset-2">
            뒤로가기
          </a>
        </div>
      </Form>
    )}
  </Formik>
);

export default SignUpSecondPage;
