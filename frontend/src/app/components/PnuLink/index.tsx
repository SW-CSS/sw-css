/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Autoplay, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { RESPONSIVE_WIDTH } from '@/constants';
import { pnuLinkInfos } from '@/data/externalLink';

import { ButtonWrapper, NextButton, PnuLinker, PrevButton } from './styled';

import 'swiper/css';

const PnuLink = () => {
  const [displayCount, setDisplayCount] = useState<number>(2);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  const handlePrevButtonClick = () => {
    swiper?.slidePrev();
  };

  const handleNextButtonClick = () => {
    swiper?.slideNext();
  };

  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setInnerWidth(window.innerWidth));
    };
  }, []);

  useEffect(() => {
    if (innerWidth > parseInt(RESPONSIVE_WIDTH.desktop, 10)) setDisplayCount(6);
    else if (innerWidth > parseInt(RESPONSIVE_WIDTH.tablet, 10)) setDisplayCount(4);
    else if (innerWidth > parseInt(RESPONSIVE_WIDTH.mobile, 10)) setDisplayCount(3);
    else setDisplayCount(2);
  }, [innerWidth]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ButtonWrapper>
        <PrevButton onClick={handlePrevButtonClick} />
        <NextButton onClick={handleNextButtonClick} />
      </ButtonWrapper>
      <Swiper
        modules={[Scrollbar, Autoplay]}
        slidesPerView={displayCount}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(e) => setSwiper(e)}
        loop
      >
        {pnuLinkInfos.map((link) => (
          <SwiperSlide>
            <PnuLinker href={link.url} target="_blank">
              <Image width="160" height="50" src={link.img} alt={link.title} />
            </PnuLinker>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PnuLink;
