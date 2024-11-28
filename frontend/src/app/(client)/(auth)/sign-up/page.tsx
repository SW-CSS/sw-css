'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import PageTitle from '@/components/common/PageTitle';
import { SignUpPhase } from '@/data/signUp';

import { useSignUpMutation } from '@/lib/hooks/useApi';
import AuthSignUpFirst, { FirstInfo } from '@/components/ui/auth/AuthSignUpFirst';
import AuthSignUpSecond, { SecondInfo } from '@/components/ui/auth/AuthSignUpSecond';

type UserInformation = FirstInfo & SecondInfo;

export default function SignUpPage() {
  const [userInfo, setUserInfo] = useState<UserInformation>({
    email: '',
    authCode: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    studentId: '',
    phoneNumber: '',
    majorCollegeId: -1,
    majorId: -1,
    minorCollegeId: -1,
    minorId: -1,
    doubleMajorCollegeId: -1,
    doubleMajorId: -1,
    career: -1,
    careerDetail: '',
  });
  const [phase, setPhase] = useState<SignUpPhase>(SignUpPhase.one);
  const { mutate: signUpMutation } = useSignUpMutation();
  const router = useRouter();

  const handleNextButtonClick = (value: FirstInfo) => {
    setUserInfo((prev) => ({ ...prev, ...value }));
    setPhase((prev) => prev + 1);
  };

  const handlePrevButtonClick = (value: SecondInfo) => {
    setUserInfo((prev) => ({ ...prev, ...value }));
    setPhase((prev) => prev - 1);
  };

  const handleSubmitButtonClick = (value: SecondInfo) => {
    setUserInfo((prev) => ({ ...prev, ...value }));

    const UserInfo = { ...userInfo, ...value };

    signUpMutation(UserInfo, {
      onSuccess(data, variables, context) {
        router.push('/sign-in');
      },
      onError(error, variables, context) {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="mx-auto w-sign max-w-full pb-10 pt-14 lg:pt-20">
      <div className="flex w-full flex-col gap-10 p-5">
        <PageTitle title="회원가입" description="PNU SW역량시스템 첫 사용시 회원가입이 필요합니다." />
        {phase === SignUpPhase.one && (
          <AuthSignUpFirst initialValues={userInfo} handleNextButtonClick={handleNextButtonClick} />
        )}
        {phase === SignUpPhase.two && (
          <AuthSignUpSecond
            initialValues={userInfo}
            handlePrevButtonClick={handlePrevButtonClick}
            handleSubmitButtonClick={handleSubmitButtonClick}
          />
        )}
      </div>
    </div>
  );
}
