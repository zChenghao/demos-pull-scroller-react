import { useCallback } from 'react';
import { PullDownMaker, PullUpMaker } from 'pull-scroller-react';
import { PullDownLoader, PullUpLoader } from '../CustomUI';

export function useMakeLoaders(noMoreData = false) {
  const makePullDownLoader: PullDownMaker = useCallback(({ beforePullDown, isPullingDown, isPullDownError }) => {
    return (
      <PullDownLoader
        key="pull-down"
        beforePullDown={beforePullDown}
        isPullingDown={isPullingDown}
        isRefreshError={isPullDownError}
      />
    );
  }, []);

  const makePullUpLoader: PullUpMaker = useCallback(
    ({ beforePullUp, isPullingUp, isPullUpError }) => (
      <PullUpLoader
        key={'pull-up'}
        beforePullUp={beforePullUp}
        isPullUpLoading={isPullingUp}
        isPullLoadError={isPullUpError}
        isNoMoreData={noMoreData}
      />
    ),
    [noMoreData]
  );

  return { makePullDownLoader, makePullUpLoader };
}
