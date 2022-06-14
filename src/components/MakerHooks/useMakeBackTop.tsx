import { BackTopMaker } from 'pull-scroller-react';
import { useCallback } from 'react';
import { BackTop } from '../CustomUI';

export function useMakeBackTop() {
  const makeBackTop: BackTopMaker = useCallback(
    ({ handleScrollToTop, show }) => <BackTop key="back-top" scrollToTop={handleScrollToTop} show={show} />,
    []
  );

  return { makeBackTop };
}
