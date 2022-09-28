import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <div>
      {showButton ? (
        <ScrollButton id="top" onClick={scrollToTop} type="button">
          TOP
        </ScrollButton>
      ) : null}
    </div>
  );
}

const ScrollButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: rgb(0, 169, 157);
  font-size: 17px;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 70px;
  margin-top: 20px;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  font-weight: 700;
  z-index: 3;
`;