import { useCallback, useEffect, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import { useWindowHeight } from '../../utils/customHooks';
import { PageLoading } from '../../components/CustomUI';

export default function ScrollHandler() {
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

  const handleScroll = useCallback((y) => {
    console.log(`scrollY is ${y}`);
  }, []);

  return (
    <>
      {list.length ? (
        <PullScroller height={windowHeight} handleScroll={handleScroll}>
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
