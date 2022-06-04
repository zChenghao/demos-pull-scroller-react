import { useCallback, useEffect, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';

export default function CustomScrollHandler() {
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    if (!list.length) {
      mockGetListData(0, 50, 300)
        .then((res) => {
          setList(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return () => {
      setList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback((y) => {
    console.log(`scrollY is ${y}`);
  }, []);

  return (
    <PullScroller height="100vh" enableBackTop handleScroll={handleScroll}>
      <DemoList list={list} />
    </PullScroller>
  );
}
