'use client';

import { useMemo } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import InputSection from '@/components/common/InputSection';
import TextInput from '@/components/common/formik/TextInput';

import { FacultyMemberDto } from '@/types/common.dto';

import { MdEmail } from '@react-icons/all-files/md/MdEmail';
import { MdTextFields } from '@react-icons/all-files/md/MdTextFields';
import { MdLocalPhone } from '@react-icons/all-files/md/MdLocalPhone';

interface AdminMyPageInfoFormProps {
  info: FacultyMemberDto;
}

export default function AdminMyPageInfoForm({ info }: AdminMyPageInfoFormProps) {
  const initialInfoValues: AdminInfoFormProps = useMemo(() => {
    return {
      name: info.name,
      phoneNumber: info.phoneNumber,
    };
  }, [info]);

  function handleChangeInformationButtonClick(values: AdminInfoFormProps) {
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
      {({ isSubmitting, touched, values, handleChange, errors }) => (
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
            icon={MdEmail}
            label="이메일"
            inputElement={<TextInput disabled name="email" value={info.email} />}
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
  name: Yup.string().required('필수 입력란입니다. 이름을 입력해주세요.'),
  phoneNumber: Yup.string()
    .required('필수 입력란입니다. 전화번호를 입력해주세요.')
    .matches(/^([0-9]{10,11})$/, '띄어쓰기나 특수기호 없이 숫자로만 입력해주세요.'),
});

interface AdminInfoFormProps extends Omit<FacultyMemberDto, 'id' | 'facultyId' | 'email'> {}
