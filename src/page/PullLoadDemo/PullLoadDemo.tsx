import { useState, useEffect, useCallback, useRef, useMemo, Fragment } from 'react';
import PullScroller, { AsyncPullingHandler } from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import { useWindowHeight } from '../../utils/customHooks';
import { PageLoading } from '../../components/CustomUI';
import { useMakeBackTop, useMakeLoaders } from '../../components/MakerHooks';

export default function PullLoadDemo() {
  const pageIndex = useRef(0);
  const pageTotal = useRef(75);
  const [list, setList] = useState<ListItem[]>([]);
  const [enablePullUp, setEnablePullUp] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const pullDownConfig = useMemo(() => ({ threshold: 100, stop: 60 }), []);
  const { windowHeight } = useWindowHeight();

  const { makePullDownLoader, makePullUpLoader } = useMakeLoaders(noMoreData);
  const { makeBackTop } = useMakeBackTop();

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
    try {
      const res = await mockGetListData(0, 30);
      // do something with res
      setNoMoreData(false);
      setList(res);
      return { delay: 400 }; // Set the pull-down end action delay, default 300ms
    } catch (error) {
      // handle error

      // throw error;
      return { error: true }; // set PullScroller's isPullDownError: true
    }
  }, []);

  const loadMoreHandler: AsyncPullingHandler = useCallback(async () => {
    // no more data
    if (noMoreData && pageIndex.current >= pageTotal.current) {
      return { immediately: true }; // Immediately end the pull-up loading action
    }
    try {
      setNoMoreData(false);
      const res = await mockGetListData(pageIndex.current, 15);
      // do something with res
      if (pageIndex.current < pageTotal.current) {
        setList((prev) => [...prev, ...res]);
      } else {
        console.log('set no more');
        setNoMoreData(true);
      }
      return { delay: 200 }; // Set the pull-up end action delay, default 300ms
    } catch (error) {
      // handle error

      // throw error;
      return { error: true }; // Set PullScroller's isPullUpError: true
    }
  }, [noMoreData]);

  return (
    <Fragment>
      {list.length ? (
        <PullScroller
          height={windowHeight}
          backTop={makeBackTop}
          enablePullDown
          pullDownConfig={pullDownConfig}
          pullDownHandler={refreshHandler}
          pullDownLoader={makePullDownLoader}
          enablePullUp={enablePullUp}
          pullUpHandler={loadMoreHandler}
          pullUpLoader={makePullUpLoader}
        >
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </Fragment>
  );
}
