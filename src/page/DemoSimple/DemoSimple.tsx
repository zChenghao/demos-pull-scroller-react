import { useEffect, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';

const DemoSimple = () => {
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
    <div style={{ height: '100vh' }}>
      <PullScroller>
        <DemoList list={list} />
      </PullScroller>
    </div>
  );
};

export default DemoSimple;
