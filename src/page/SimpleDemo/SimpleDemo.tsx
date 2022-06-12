import { useEffect, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { PageLoading } from '../../components/CustomUI';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import { useWindowHeight } from '../../utils/customHooks';

const DemoSimple = () => {
  const { windowHeight } = useWindowHeight(true);
  const [list, setList] = useState<ListItem[]>([]);

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
