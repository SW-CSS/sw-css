/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput } from '@/components/common/formik/TextInputDdang';

import EmailTextInput from './components/EmailTextInput';
import { useState } from 'react';
import { useSendAuthCodeMutation } from '@/lib/hooks/useApi';
import { toast } from 'react-toastify';
import { getValidationStudentId } from '@/lib/api/server.api';

export interface FirstInfo {
  email: string;
  authCode: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  studentId: string;
  phoneNumber: string;
}

const validateStudentId = async (studentId: string) => {
  if (!studentId.match(/^[\d]{9}$/)) return false;
  try {
    const isDuplicated = await getValidationStudentId(studentId);
    return isDuplicated;
  } catch (err) {
    return false;
  }
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('필수 입력란입니다. 이메일을 입력해주세요.')
    .matches(/^((?!@).)*$/, '부산대 이메일만 가입 가능합니다. 이메일 도메인 부분을 삭제해주세요.')
    .matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/, '존재하는 이메일인지 확인해주세요.'),
  authCode: Yup.string()
    .required('필수 입력란입니다. 부산대 메일 인증코드를 입력해주세요.')
    .matches(/^[A-Za-z0-9]{10}$/, '인증코드의 패턴이 일치하지 않습니다.'),
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
    .matches(/^[\d]{9}$/, '9자리의 학번을 입력해주세요.')
    .test('student_id', '중복된 학번이라서 사용할 수 없습니다.', (value) => {
      return validateStudentId(value);
    }),
  phoneNumber: Yup.string()
    .required('필수 입력란입니다. 전화번호를 입력해주세요.')
    .matches(/^([0-9]{10,11})$/, '띄어쓰기나 특수기호 없이 숫자로만 입력해주세요.'),
});

interface SignUpFirstPageProps {
  initialValues: FirstInfo;
  handleNextButtonClick: (value: FirstInfo) => void;
}

const SignUpSecondPage = ({ initialValues, handleNextButtonClick }: SignUpFirstPageProps) => {
  const [isSendedMail, setIsSendedMail] = useState<boolean>(false);
  const { mutate: sendAuthCodeMutation } = useSendAuthCodeMutation();

  const handleMailAuthButtonClick = (email: string) => {
    setIsSendedMail(true);

    sendAuthCodeMutation(email + '@pusan.ac.kr', {
      onSuccess(data, variables, context) {
        toast.info('메일이 정상 발송되었습니다.');
      },
      onError(error, variables, context) {
        toast.error(error.message);
      },
    });
  };

  return (
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
          <div className="flex items-end gap-2">
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
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="h-[44px] shrink-0 rounded-sm bg-primary-main px-2 text-base text-white"
                onClick={() => handleMailAuthButtonClick(values.email)}
              >
                메일 인증
              </button>
              {touched.email && errors.email && <span className="h-[14px]" />}
            </div>
          </div>
          {isSendedMail && (
            <TextInput
              name="authCode"
              label="인증코드"
              type="text"
              isRequired
              placeholder="메일 인증코드 입력"
              value={values.authCode}
              onChange={handleChange}
              onBlur={handleBlur}
              errorText={touched.authCode && errors.authCode ? errors.authCode : undefined}
            />
          )}
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
};

export default SignUpSecondPage;
