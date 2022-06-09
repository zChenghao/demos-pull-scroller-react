import { useCallback, useEffect, useState } from 'react';
import PullScroller, { BackTopMaker } from 'pull-scroller-react';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import { useWindowHeight } from '../../utils/customHooks';
import { BackTop } from '../../components/CustomUI';

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
    return () => {
      setList([]);
    };
  }, []);

  const handleScroll = useCallback((y) => {
    console.log(`scrollY is ${y}`);
  }, []);

  const makeBackTop: BackTopMaker = useCallback(
    ({ handleScrollToTop, show }) => <BackTop scrollToTop={handleScrollToTop} show={show} />,
    []
  );

  return (
    <PullScroller height={windowHeight} handleScroll={handleScroll} backTop={makeBackTop}>
      <DemoList list={list} />
    </PullScroller>
  );
}
