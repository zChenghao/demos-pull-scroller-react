import { useState, useEffect } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';

export default function DemoDefaultBackTop() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PullScroller height="100vh" enableBackTop>
      <DemoList list={list} />
    </PullScroller>
  );
}
