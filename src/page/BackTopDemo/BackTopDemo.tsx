import { useState, useEffect, useCallback } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { BackTop } from '../../components/CustomUI';
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

  const BackTopMaker = useCallback(
    ({ handleScrollToTop, show }) => <BackTop scrollToTop={handleScrollToTop} show={show} />,
    []
  );

  return (
    <PullScroller height={windowHeight} backTop={BackTopMaker}>
      <DemoList list={list} />
    </PullScroller>
  );
}
