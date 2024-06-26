import { COLOR, FONT_STYLE } from '@/adminConstants';

const Footer = () => (
  <div
    style={{
      padding: '8px',
      font: FONT_STYLE.sm.normal,
      color: COLOR.comment,
      textAlign: 'center',
    }}
  >
    copyright ⓒ KOREA LEARNING CONSULTING CENTER. All Right Reserved
  </div>
);

export default Footer;
