import { FooterWrapper, FooterLayout, FooterLogo, FooterDiv, FooterText, FooterLink } from './styled';

const Footer = () => (
  <FooterWrapper>
    <FooterLayout>
      <FooterLogo src="/svgs/foot_logo.svg" alt="foot_logo" width="160" height="40" priority={false} />
      <FooterDiv>
        <FooterText>(46241) 부산광역시 금정구 부산대학로 63번길 2 (장전동)</FooterText>
        <FooterText>부산대학교 소프트웨어융합교육원</FooterText>
      </FooterDiv>
      <FooterLink href="/privacy">개인정보처리방침</FooterLink>
      <FooterText>@ 2021 PNUswedu. All Right Reserved.</FooterText>
      <FooterText>TEL : 051-510-3737, 3738, 3624</FooterText>
    </FooterLayout>
  </FooterWrapper>
);

export default Footer;
