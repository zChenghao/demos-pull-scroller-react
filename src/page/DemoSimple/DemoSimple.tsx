import { useEffect, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import { useWindowHeight } from '../../utils/customHooks';
import { PageLoading } from '../../components/CustomUI';

const DemoSimple = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const { windowHeight } = useWindowHeight();

  useEffect(() => {
    mockGetListData(0, 50, 300)
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ height: windowHeight }}>
      {list.length ? (
        <PullScroller>
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </div>
  );
};

export default DemoSimple;
