import { useEffect, useRef, useState } from 'react';
import PullScroller, { ExposedMethodsRef } from 'pull-scroller-react';
import { PageLoading } from '../../components/CustomUI';
import { DemoList } from '../../components';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import { useWindowHeight } from '../../utils/customHooks';

export default function UseExposedMethods() {
  const { windowHeight } = useWindowHeight(true);
  const scrollerRef = useRef<ExposedMethodsRef>(null);
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    mockGetListData(0, 50, 300)
      .then((res) => {
        setList(res);
        setTimeout(() => {
          scrollerRef.current?.scrollTo(0, -400, 300);
        }, 300);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {list.length ? (
        <PullScroller height={windowHeight} ref={scrollerRef}>
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
