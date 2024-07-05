'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import EmailTextInput from '@/app/components/Formik/EmailTextInput';
import TextInput from '@/app/components/Formik/TextInput';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('필수 입력란입니다. 이메일을 입력해주세요.')
    .matches(/^((?!@).)*$/, '부산대 이메일만 가입 가능합니다. 이메일 도메인 부분을 삭제해주세요.')
    .matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/, '존재하는 이메일인지 확인해주세요.'),
  name: Yup.string().required('필수 입력란입니다. 이름을 입력해주세요.'),
});

interface FormType {
  email: string;
  name: string;
}

const initialValues: FormType = {
  email: '',
  name: '',
};

const FindForm = () => {
  const handleSubmitButtonClick = (values: FormType) => {
    // TODO: 메일 발송 api 호출
    console.log(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        handleSubmitButtonClick(values);
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
          <button
            className="mt-2 rounded-sm bg-primary-main p-3 text-base text-white"
            type="submit"
            disabled={isSubmitting}
          >
            비밀번호 메일 발송
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FindForm;
