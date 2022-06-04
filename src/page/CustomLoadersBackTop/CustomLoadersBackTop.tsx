import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PullScoller, { PullLoaderMaker, RefresherMaker } from 'pull-scroller-react';
import { CustomBackTop, PullDownLoader, PullUpLoader } from '../../components/CustomLoaders';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';

export default function CustomLoadersPage() {
  const pageIndex = useRef(0);
  const pageTotal = useRef(75);
  const [list, setList] = useState<ListItem[]>([]);
  const [enablePullUp, setEnablePullUp] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);

  const pullDownConfig = useMemo(() => ({ threshold: 120, stop: 60 }), []);

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
    // if (list.length >= pageTotal.current) {
    //   console.log('set no more');
    //   setNoMoreData(true);
    // }
  }, [list]);

  const refresh = useCallback(async () => {
    const res = await mockGetListData(0, 30);
    setList(res);
  }, []);

  const loadMore = useCallback(async () => {
    if (noMoreData && pageIndex.current >= pageTotal.current) return;
    setNoMoreData(false);
    const res = await mockGetListData(pageIndex.current, 15);
    if (pageIndex.current < pageTotal.current) {
      // console.log('===== do something with res ======');
      setList((prev) => [...prev, ...res]);
    } else {
      // 模拟没有更多数据
      console.log('set no more');
      setNoMoreData(true);
    }
    // 模拟没有更多数据
    // if (listCount.current >= pageTotal.current) {}
  }, [noMoreData]);

  const refresher: RefresherMaker = useCallback(({ beforePullDown, isPullingDown, isRefreshError }) => {
    return (
      <PullDownLoader beforePullDown={beforePullDown} isPullingDown={isPullingDown} isRefreshError={isRefreshError} />
    );
  }, []);

  const pullLoader: PullLoaderMaker = useCallback(
    ({ beforePullUp, isPullUpLoading, isPullLoadError }) => (
      <PullUpLoader
        beforePullUp={beforePullUp}
        isPullUpLoading={isPullUpLoading}
        isPullLoadError={isPullLoadError}
        isNoMoreData={noMoreData}
      />
    ),
    [noMoreData]
  );

  const BackTop = useCallback(
    ({ handleScrollToTop, show }) => <CustomBackTop show={show} scrollToTop={handleScrollToTop} />,
    []
  );

  return (
    <PullScoller
      height="100vh"
      enablePullDown
      enablePullUp={enablePullUp}
      enableBackTop
      pullDownConfig={pullDownConfig}
      handleRefresh={refresh}
      handlePullUpLoad={loadMore}
      refresher={refresher}
      pullLoader={pullLoader}
      backTop={BackTop}
    >
      <DemoList list={list} />
    </PullScoller>
  );
}
