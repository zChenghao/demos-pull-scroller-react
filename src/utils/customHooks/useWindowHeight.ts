import { useCallback, useEffect, useState } from 'react';

// resize: whether to listen for page size changes.
export function useWindowHeight(resize = false) {
  const [windowHeight, setWindowHeight] = useState('100%');

  const setHeight = useCallback(() => {
    const winHeight = window.innerHeight || document.documentElement.clientHeight;
    setWindowHeight(winHeight + 'px');
  }, []);

  useEffect(() => {
    setHeight();
    if (resize) {
      window.addEventListener('resize', setHeight);
    }

    return () => {
      setWindowHeight('100%');
      if (resize) {
        window.removeEventListener('resize', setHeight);
      }
    };
  }, [resize, setHeight]);

  return { windowHeight };
}
