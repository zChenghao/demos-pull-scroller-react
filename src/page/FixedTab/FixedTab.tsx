import { useCallback, useEffect, useRef, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { BackTop, PageLoading } from '../../components/CustomUI';
import TabBar from './components/TabBar';
import { useWindowHeight } from '../../utils/customHooks';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import style from './FixedTab.module.css';

export default function FixedTab() {
  const { windowHeight } = useWindowHeight();
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [list, setList] = useState<ListItem[]>([]);
  const [isFixed, setisFixed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    mockGetListData(0, 50, 300)
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const scrollHandler = useCallback(
    (y) => {
      if (bannerRef.current && y >= bannerRef.current.offsetHeight) {
        !isFixed && setisFixed(true);
      } else {
        isFixed && setisFixed(false);
      }
    },
    [isFixed]
  );

  const makeBackTop = useCallback(
    ({ handleScrollToTop, show }) => <BackTop key="back_top" scrollToTop={handleScrollToTop} show={show} />,
    []
  );

  return (
    <>
      {list.length ? (
        <>
          <div
            className={isFixed ? `${style.fixed} ${style['fixed--show']}` : `${style.fixed} ${style['fixed--hide']}`}
          >
            <TabBar activeIndex={activeIndex} setActive={setActiveIndex} />
          </div>
          <PullScroller height={windowHeight} handleScroll={scrollHandler} backTop={makeBackTop}>
            <div ref={bannerRef} className={style.banner__wrapper}>
              <img className={style.banner__img} src="/imgs/banner/banner2.jpeg" alt="" />
            </div>
            <TabBar activeIndex={activeIndex} setActive={setActiveIndex} />
            <DemoList list={list} />
          </PullScroller>
        </>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
