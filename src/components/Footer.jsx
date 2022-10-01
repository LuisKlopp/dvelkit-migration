import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../common/img/logo.png';

function Footer() {
  const navigate = useNavigate();

  const moveMain = () => {
    navigate('/');
  };
  const moveProject = () => {
    navigate('/workspace');
  };
  const moveFAQ = () => {
    navigate('/faq');
  };
  const moveEvent = () => {
    navigate('/event');
  };

  return (
    <StFooterDiv>
      <StFooterWrapper>
        <StDivLeft>
          <StMenuDiv>
            <StMenuName onClick={moveMain}>About</StMenuName>
            <StMenuName onClick={moveProject}>Project</StMenuName>
            <StMenuName onClick={moveFAQ}>FAQ</StMenuName>
            <StMenuName onClick={moveEvent}>Event</StMenuName>
            <StMenuName>Team</StMenuName>
          </StMenuDiv>

          <StInfoDiv>
            <StInfoDetail>
              <StInfoName>개인정보 처리 방침</StInfoName>
              <StInfoName>|</StInfoName>
              <StInfoName>이용약관</StInfoName>
              <StInfoName>|</StInfoName>
              <StInfoName>법적고지</StInfoName>
              <StInfoName>|</StInfoName>
              <StInfoName>이메일무단수집거부</StInfoName>
            </StInfoDetail>

            <StCopyright>Copyright, D.vel kit.All rights reserved.</StCopyright>
          </StInfoDiv>
        </StDivLeft>

        <StDivRight>
          <StLogo alt="logo" src={logo} />
        </StDivRight>
      </StFooterWrapper>
    </StFooterDiv>
  );
}

export default Footer;

const StFooterDiv = styled.div`
  align-items: center;
  flex-direction: row;
  background-color: #1b1b1b;
  color: #999999;
  width: 100%;
  /* height: 170px; */
  height: 20vh;
  left: 0px;
  top: 0px;
  position: relative;
  display: flex;
`;

const StFooterWrapper = styled.div`
  width: 100%;
  margin: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StDivLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const StMenuDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

const StMenuName = styled.div`
  color: white;
  font-family: 'Montserrat';
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.05em;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  margin-right: 7%;
`;

const StInfoDiv = styled.div`
  margin-top: 25px;
  color: #535353;
`;

const StInfoDetail = styled.div`
  display: flex;
  flex-direction: row;
`;

const StInfoName = styled.div`
  margin-right: 8px;
  cursor: ${(props) => props.cs};
  font-size: 1rem;
`;

const StCopyright = styled.div`
  margin-top: 7px;
  font-size: 1rem;
`;

const StDivRight = styled.div`
  display: flex;
  align-items: center;
`;

const StLogo = styled.img`
  width: 140px;
  height: 30px;
`;
