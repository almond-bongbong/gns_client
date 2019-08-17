import { useEffect } from 'react';

const Kakao = typeof window !== 'undefined' && window.Kakao;
const useKakao = () => {
  useEffect(() => {
    if (Kakao && !Kakao.Auth) Kakao.init('fe1af81bea2c97f4f30a4f8d1e47cc5b');
  }, []);

  return Kakao;
};

export default useKakao;