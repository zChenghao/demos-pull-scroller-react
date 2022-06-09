import { useEffect, useState } from 'react';

export function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState('100%');

  useEffect(() => {
    const winHeight = window.innerHeight || document.documentElement.clientHeight;
    setWindowHeight(winHeight + 'px');

    return () => {
      setWindowHeight('100%');
    };
  }, []);

  return { windowHeight };
}
