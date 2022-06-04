import { useCallback, useEffect, useRef, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';

export default function NormalLoadHandler() {
  const pageIndex = useRef(0);
  const pageTotal = useRef(75);
  const [list, setList] = useState<ListItem[]>([]);
  const [enablePullUp, setEnablePullUp] = useState(false);

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

  // refresh
  const handleRefresh = useCallback((complete) => {
    mockGetListData(0, 30).then((result) => {
      setList(result);
      complete();
    });
  }, []);

  // load more
  const handlePullUp = useCallback((complete) => {
    if (pageIndex.current >= pageTotal.current) {
      complete();
      return;
    }
    mockGetListData(pageIndex.current, 15).then((result) => {
      if (pageIndex.current < pageTotal.current) {
        setList((prev) => [...prev, ...result]);
      }
      complete();
    });
  }, []);

  return (
    <PullScroller
      height="100vh"
      enablePullDown
      enablePullUp={enablePullUp}
      handleRefresh={handleRefresh}
      handlePullUpLoad={handlePullUp}
    >
      <DemoList list={list} />
    </PullScroller>
  );
}
