'use client';

import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

import InputSection from '@/components/common/InputSection';
import TextInput from '@/components/common/formik/TextInput';

import { useChangePasswordMutation } from '@/lib/hooks/useApi';

import { MdLock } from '@react-icons/all-files/md/MdLock';

export default function AdminMyPagePasswordForm() {
  const { mutate: changePassword } = useChangePasswordMutation();
  const router = useRouter();

  function handleChangePasswordButtonClick(values: AdminPasswordFormProps) {
    changePassword(
      { oldPassword: values.password, newPassword: values.newPassword },
      {
        onSuccess() {
          toast.info('비밀번호 변경에 성공했습니다.');
          setTimeout(() => router.replace('/sign-out'), 1000);
        },
        onError(err) {
          toast.error('비밀번호 변경에 실패했습니다.');
          console.log(err);
        },
      },
    );
  }

  return (
    <Formik
      initialValues={initialPasswordFormValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleChangePasswordButtonClick(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, touched, values, handleChange, errors }) => (
        <Form className="my-4 flex w-full flex-col gap-5 px-10">
          <InputSection
            icon={MdLock}
            label="기존 비밀번호"
            iconProps={{ style: { width: '135px' } }}
            inputElement={
              <TextInput
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                errorText={touched.password && errors.password ? errors.password : undefined}
                placeholder="기존 비밀번호를 입력해주세요."
              />
            }
          />
          <InputSection
            icon={MdLock}
            label="새로운 비밀번호"
            iconProps={{ style: { width: '135px' } }}
            inputElement={
              <TextInput
                name="newPassword"
                type="password"
                value={values.newPassword}
                onChange={handleChange}
                errorText={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
                placeholder="새로운 비밀번호를 입력해주세요."
              />
            }
          />
          <InputSection
            icon={MdLock}
            label="비밀번호 검증"
            iconProps={{ style: { width: '135px' } }}
            inputElement={
              <TextInput
                name="newPasswordConfirmation"
                type="password"
                value={values.newPasswordConfirmation}
                onChange={handleChange}
                errorText={
                  touched.newPasswordConfirmation && errors.newPasswordConfirmation
                    ? errors.newPasswordConfirmation
                    : undefined
                }
                placeholder="새로운 비밀번호를 입력해주세요."
              />
            }
          />
          <button
            type="submit"
            className="rounded-md bg-primary-main px-4 py-2 font-bold text-white transition-colors hover:bg-primary-dark"
            disabled={isSubmitting}
          >
            변경
          </button>
        </Form>
      )}
    </Formik>
  );
}

const validationSchema = Yup.object().shape({
  password: Yup.string().required('필수 입력란입니다. 이전 비밀번호를 입력해주세요.'),
  newPassword: Yup.string()
    .required('필수 입력란입니다. 새로운 비밀번호를 입력해주세요.')
    .test('not-same-as-old', '새로운 비밀번호는 이전 비밀번호와 동일할 수 없습니다.', function (value) {
      const { password } = this.parent;
      return value !== password;
    })
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,15}$/,
      '6자에서 15자 이내의 영문, 숫자, 특수문자의 조합이어야 합니다.',
    ),
  newPasswordConfirmation: Yup.string()
    .required('필수 입력란입니다. 비밀번호를 입력해주세요.')
    .oneOf([Yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.'),
});

interface AdminPasswordFormProps {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

const initialPasswordFormValues: AdminPasswordFormProps = {
  password: '',
  newPassword: '',
  newPasswordConfirmation: '',
};
