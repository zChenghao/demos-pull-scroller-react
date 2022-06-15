import PullScroller, { AsyncPullingHandler } from 'pull-scroller-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DemoList } from '../../components';
import { PageLoading, PullDownLoader, PullUpLoader } from '../../components/CustomUI';
import { useMakeBackTop } from '../../components/MakerHooks';
import { useWindowHeight } from '../../utils/customHooks';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import { timeout } from '../../utils/utils';

const CustomLoadState = () => {
  const { windowHeight } = useWindowHeight(true);
  const { makeBackTop } = useMakeBackTop();

  const pageIndex = useRef(0);
  const pageTotal = useRef(75);
  const [list, setList] = useState<ListItem[]>([]);

  const pullDownConfig = useMemo(() => ({ threshold: 100, stop: 60 }), []);
  const [beforePullDown, setBeforePullDown] = useState(true);
  const [isPullingDown, setIsPullingDown] = useState(false);
  const [isPullDownError, setIsPullDownError] = useState(false);

  const [enablePullUp, setEnablePullUp] = useState(false);
  const [beforePullUp, setBeforePullUp] = useState(true);
  const [isPullingUp, setIsPullingUp] = useState(false);
  const [isPullUpError, setIsPullUpError] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    mockGetListData(0, 30, 300)
      .then((res) => {
        setList(res);
        if (res.length) setEnablePullUp(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    pageIndex.current = list.length;
  }, [list]);

  const refreshHandler: AsyncPullingHandler = useCallback(async () => {
    setBeforePullDown(false);
    setIsPullingDown(true);
    setIsPullDownError(false);
    try {
      const res = await mockGetListData(0, 30);
      setIsPullingDown(false);
      await timeout(300);

      setList(res);
      setNoMoreData(false);

      setTimeout(() => {
        setBeforePullDown(true);
      }, 100);
      return { immediately: true };
    } catch (error) {
      setIsPullingDown(false);
      // handle error
      setIsPullDownError(true);
      await timeout(400);
      setTimeout(() => {
        setBeforePullDown(true);
      }, 100);
      return { immediately: true };
    }
  }, []);

  const loadMoreHandler: AsyncPullingHandler = useCallback(async () => {
    // no more data
    if (noMoreData && pageIndex.current >= pageTotal.current) {
      return { immediately: true }; // Immediately end the pull-up loading action
    }
    setBeforePullUp(false);
    setIsPullingUp(true);
    setIsPullUpError(false);
    setNoMoreData(false);
    try {
      const res = await mockGetListData(pageIndex.current, 15);
      // do something with res
      setIsPullingUp(false);

      if (pageIndex.current < pageTotal.current) {
        await timeout(300);
        setList((prev) => [...prev, ...res]);
      } else {
        // set no more;
        setNoMoreData(true);
      }

      setTimeout(() => {
        setBeforePullUp(true);
      }, 100);

      return { immediately: true };
    } catch (error) {
      setIsPullingUp(false);
      // handle error
      setIsPullUpError(true);
      await timeout(500);
      setBeforePullUp(true);
      return { immediately: true };
    }
  }, [noMoreData]);

  return (
    <>
      {list.length ? (
        <PullScroller
          height={windowHeight}
          backTop={makeBackTop}
          enablePullDown
          pullDownConfig={pullDownConfig}
          pullDownHandler={refreshHandler}
          pullDownLoader={
            <PullDownLoader
              beforePullDown={beforePullDown}
              isPullingDown={isPullingDown}
              isRefreshError={isPullDownError}
            />
          }
          enablePullUp={enablePullUp}
          pullUpHandler={loadMoreHandler}
          pullUpLoader={
            <PullUpLoader
              beforePullUp={beforePullUp}
              isPullUpLoading={isPullingUp}
              isPullLoadError={isPullUpError}
              isNoMoreData={noMoreData}
            />
          }
        >
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </>
  );
};

export default CustomLoadState;
