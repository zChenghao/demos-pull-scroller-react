import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import PullScroller, { BackTopMaker, PullDownMaker, SyncPullingHandler, PullUpMaker } from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import { useWindowHeight } from '../../utils/customHooks';
import { BackTop, PullDownLoader, PullUpLoader } from '../../components/CustomUI';

export default function SyncLoadHandler() {
  const pageIndex = useRef(0);
  const pageTotal = useRef(75);
  const [list, setList] = useState<ListItem[]>([]);
  const [enablePullUp, setEnablePullUp] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const { windowHeight } = useWindowHeight();
  const pullDownConfig = useMemo(() => ({ threshold: 100, stop: 60 }), []);

  useEffect(() => {
    mockGetListData(0, 30, 300)
      .then((res) => {
        setList(res);
        setEnablePullUp(true);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      setList([]);
    };
  }, []);

  useEffect(() => {
    pageIndex.current = list.length;
  }, [list]);

  const refreshHandler: SyncPullingHandler = useCallback((complete) => {
    mockGetListData(0, 30)
      .then((res) => {
        // do something with res
        console.log('refresh success', res);
        setNoMoreData(false);
        setList(res);
        // finish pull-down
        // if (done) done({ delay: 400 }); // Set the pull-down end action delay, default 300ms
        complete && complete();
      })
      .catch((e) => {
        // handle error

        // finish pull-down
        complete && complete({ error: true }); // set PullScroller's isPullDownError: true
        throw e;
      });
  }, []);

  const loadMoreHandler: SyncPullingHandler = useCallback(
    (complete) => {
      if (noMoreData && pageIndex.current >= pageTotal.current) {
        complete && complete({ immediately: true }); // Immediately end the pull-up loading action
        return;
      }
      setNoMoreData(false);
      mockGetListData(pageIndex.current, 15)
        .then((res) => {
          // do something with res
          if (pageIndex.current < pageTotal.current) {
            setList((prev) => [...prev, ...res]);
          } else {
            console.log('set no more');
            setNoMoreData(true);
          }
          // finish pull-up
          // complete && complete({ delay: 200 }); // Set the pull-up end action delay, default 300ms
          complete && complete(); // Set the pull-up end action delay, default 300ms
        })
        .catch((e) => {
          // handle error

          // finish pull-up
          if (complete) complete({ error: true }); // set PullScroller's isPullUpError:true
          throw e;
        });
    },
    [noMoreData]
  );

  const refresher: PullDownMaker = useCallback(({ beforePullDown, isPullingDown, isPullDownError }) => {
    return (
      <PullDownLoader beforePullDown={beforePullDown} isPullingDown={isPullingDown} isRefreshError={isPullDownError} />
    );
  }, []);

  const pullLoader: PullUpMaker = useCallback(
    ({ beforePullUp, isPullingUp, isPullUpError }) => (
      <PullUpLoader
        beforePullUp={beforePullUp}
        isPullUpLoading={isPullingUp}
        isPullLoadError={isPullUpError}
        isNoMoreData={noMoreData}
      />
    ),
    [noMoreData]
  );

  const makeBackTop: BackTopMaker = useCallback(
    ({ handleScrollToTop, show }) => <BackTop scrollToTop={handleScrollToTop} show={show} />,
    []
  );

  return (
    <PullScroller
      height={windowHeight}
      backTop={makeBackTop}
      enablePullDown
      pullDownConfig={pullDownConfig}
      pullDownHandler={refreshHandler}
      pullDownLoader={refresher}
      enablePullUp={enablePullUp}
      pullUpHandler={loadMoreHandler}
      pullUpLoader={pullLoader}
    >
      <DemoList list={list} />
    </PullScroller>
  );
}
