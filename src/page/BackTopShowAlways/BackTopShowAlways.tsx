import { useState, useEffect, useCallback } from 'react';
import PullScroller, { BackTopMaker } from 'pull-scroller-react';
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

  const makeBackTop: BackTopMaker = useCallback(
    ({ handleScrollToTop, showAlways }) => <BackTop key="back_top" scrollToTop={handleScrollToTop} show={showAlways} />,
    []
  );

  return (
    <>
      {list.length ? (
        <PullScroller height={windowHeight} backTop={makeBackTop}>
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
