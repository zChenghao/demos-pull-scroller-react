import { useState, useEffect, useCallback } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { BackTop, PageLoading } from '../../components/CustomUI';
import { mockGetListData, ListItem } from '../../utils/getMockData';
import { useWindowHeight } from '../../utils/customHooks';

export default function BackTopDemo() {
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

  const BackTopMaker = useCallback(({ handleScrollToTop, show }) => {
    return <BackTop key="back_top" scrollToTop={handleScrollToTop} show={show} />;
  }, []);

  return (
    <>
      {list.length ? (
        <PullScroller height={windowHeight} backTop={BackTopMaker}>
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
