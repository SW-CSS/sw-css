'use client';

import { useEffect, useState } from 'react';

import PageTitle from '@/app/components/PageTitle';

import SignUpFirstPage, { FirstInfo } from './components/SignUpFirstPage';

type UserInformation = FirstInfo;

const Page = () => {
  const [userInfo, setUserInfo] = useState<UserInformation>({
    email: '',
    password: '',
    name: '',
    studentId: '',
    phoneNumber: '',
  });
  const [isPhaseOne, setIsPhaseOne] = useState<boolean>(true);

  const handleNextButtonClick = (value: FirstInfo) => {
    setUserInfo((prev) => ({ ...prev, ...value }));
    setIsPhaseOne(false);
  };

  useEffect(() => {
    console.log(JSON.stringify(userInfo, null, 2));
  }, [userInfo]);

  return (
    <div className="w-sign mx-auto pb-10 pt-14 lg:pt-20">
      <div className="flex flex-col gap-10 p-5 lg:pt-20">
        <PageTitle title="회원가입" description="PNU SW역량시스템 첫 사용시 회원가입이 필요합니다." urlText="" url="" />
        {isPhaseOne && <SignUpFirstPage handleSubmitButtonClick={handleNextButtonClick} />}
      </div>
    </div>
  );
};

export default Page;
