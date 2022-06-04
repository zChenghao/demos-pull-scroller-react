import { useState, useEffect, useCallback, useRef } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';

const DemoDefaultLoad = () => {
  const pageIndex = useRef(0);
  const pageTotal = useRef(75);
  const [list, setList] = useState<ListItem[]>([]);
  const [enablePullUp, setEnablePullUp] = useState(false);

  useEffect(() => {
    // if (!list.length) { console.log('init page'); }
    mockGetListData(0, 30, 300)
      .then((res) => {
        // setList([]);
        // setList((prev) => [...prev, ...res]);
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

  const refreshHandler = useCallback(async () => {
    const res = await mockGetListData(0, 30);
    setList(res);
  }, []);

  const loadMoreHandler = useCallback(async () => {
    // no more data
    if (pageIndex.current >= pageTotal.current) return;
    const res = await mockGetListData(pageIndex.current, 15);
    // console.log('start microtask');

    if (pageIndex.current < pageTotal.current) {
      console.log('===== do something with res ======');
      setList((prev) => [...prev, ...res]);
    }
  }, []);

  return (
    <PullScroller
      height="100vh"
      enablePullDown
      enablePullUp={enablePullUp}
      handleRefresh={refreshHandler}
      handlePullUpLoad={loadMoreHandler}
    >
      <DemoList list={list} />
    </PullScroller>
  );
};

export default DemoDefaultLoad;
