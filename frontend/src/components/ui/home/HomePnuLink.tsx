'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Autoplay, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { VscChevronLeft } from '@react-icons/all-files/vsc/VscChevronLeft';
import { VscChevronRight } from '@react-icons/all-files/vsc/VscChevronRight';
import { RESPONSIVE_WIDTH } from '@/constants';
import { pnuLinkInfos } from '@/data/externalLink';

import 'swiper/css';
import Link from 'next/link';

export default function HomePnuLink() {
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
    else setDisplayCount(2);
  }, [innerWidth]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div className="flex items-center gap-[10px]">
        <VscChevronLeft
          className="rounded-full border border-comment text-xl font-semibold text-black"
          onClick={handlePrevButtonClick}
        />
        <VscChevronRight
          className="rounded-full border border-comment text-xl font-semibold text-black"
          onClick={handleNextButtonClick}
        />
      </div>
      <Swiper
        modules={[Scrollbar, Autoplay]}
        slidesPerView={displayCount}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(e) => setSwiper(e)}
        loop
      >
        {pnuLinkInfos.map((link) => (
          <SwiperSlide key={link.url}>
            <Link className="block h-[52px] w-[162px] border border-border" href={link.url} target="_blank">
              <Image width="160" height="50" src={link.img} alt={link.title} style={{ width: 'auto', height: 50 }} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
