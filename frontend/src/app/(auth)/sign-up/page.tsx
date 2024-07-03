'use client';

import { useState } from 'react';

import PageTitle from '@/app/components/PageTitle';

import SignUpFirstPage, { FirstInfo } from './components/SignUpFirstPage';
import SignUpSecondPage, { SecondInfo } from './components/SignUpSecondPage';

type UserInformation = FirstInfo & SecondInfo;

const Page = () => {
  const [userInfo, setUserInfo] = useState<UserInformation>({
    email: '',
    password: '',
    name: '',
    studentId: '',
    phoneNumber: '',
    majorId: -1,
    minorId: -1,
    doubleMajorId: -1,
    career: -1,
    careerDetail: '',
  });
  const [isPhaseOne, setIsPhaseOne] = useState<boolean>(true);

  const handleNextButtonClick = (value: FirstInfo) => {
    setUserInfo((prev) => ({ ...prev, ...value }));
    setIsPhaseOne(false);
  };

  const handleSubmitButtonClick = (value: SecondInfo) => {
    setUserInfo((prev) => ({ ...prev, ...value }));

    const tempUserInfo = { ...userInfo, ...value };
    console.log(tempUserInfo);
    // TODO: 회원가입 api 연결
  };

  return (
    <div className="w-sign mx-auto max-w-full pb-10 pt-14 lg:pt-20">
      <div className="flex w-full flex-col gap-10 p-5">
        <PageTitle title="회원가입" description="PNU SW역량시스템 첫 사용시 회원가입이 필요합니다." urlText="" url="" />
        {isPhaseOne && <SignUpFirstPage handleSubmitButtonClick={handleNextButtonClick} />}
        {!isPhaseOne && <SignUpSecondPage handleSubmitButtonClick={handleSubmitButtonClick} />}
      </div>
    </div>
  );
};

export default Page;
