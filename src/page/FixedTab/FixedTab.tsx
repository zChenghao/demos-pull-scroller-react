import { useCallback, useEffect, useRef, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { PageLoading } from '../../components/CustomUI';
import TabBar from './components/TabBar';
import { useWindowHeight } from '../../utils/customHooks';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import style from './FixedTab.module.css';
import { useMakeBackTop } from '../../components/MakerHooks';

export default function FixedTab() {
  const { windowHeight } = useWindowHeight();
  const { makeBackTop } = useMakeBackTop();

  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [tabContents, setTabContents] = useState<ListItem[][]>([]);
  const [isFixed, setisFixed] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    mockGetListData(0, 50, 300)
      .then((res) => {
        setIsInit(false);
        setTabContents([res, [], [], []]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const scrollHandler = useCallback(
    (y: number) => {
      if (bannerRef.current && y >= bannerRef.current.offsetHeight) {
        !isFixed && setisFixed(true);
      } else {
        isFixed && setisFixed(false);
      }
    },
    [isFixed]
  );

  const handleTabClick = useCallback(
    async (index: number) => {
      setActiveIndex(index);
      if (tabContents[index].length) return;
      const result = await mockGetListData(0, 50, 500);
      setTabContents((prev) => {
        return prev.map((item, i) => {
          if (i === index) {
            return result;
          }
          return item;
        });
      });
    },
    [tabContents]
  );

  return (
    <>
      {!isInit ? (
        <>
          <div
            className={isFixed ? `${style.fixed} ${style['fixed--show']}` : `${style.fixed} ${style['fixed--hide']}`}
          >
            <TabBar activeIndex={activeIndex} tabItemClick={handleTabClick} />
          </div>
          <PullScroller height={windowHeight} handleScroll={scrollHandler} backTop={makeBackTop}>
            <div ref={bannerRef} className={style.banner__wrapper}>
              <img className={style.banner__img} src="/imgs/banner/banner4.jpeg" alt="" />
            </div>
            <TabBar activeIndex={activeIndex} tabItemClick={handleTabClick} />
            <div className={style.list}>
              {tabContents.map((item, index) => (
                <div key={index} style={{ display: index === activeIndex ? undefined : 'none', overflow: 'hidden' }}>
                  <h2 className={style.list_title}>This is list -- {index + 1}</h2>
                  <DemoList list={item} />
                </div>
              ))}
            </div>
          </PullScroller>
        </>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
