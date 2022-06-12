import { useEffect, useState } from 'react';
import PullScroller from 'pull-scroller-react';
import { DemoList } from '../../components';
import { PageLoading } from '../../components/CustomUI';
import { useWindowHeight } from '../../utils/customHooks';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import style from './SetImgSize.module.css';

export default function ObserveImg() {
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
    <>
      {list.length ? (
        <PullScroller height={windowHeight}>
          <div className={style.banner__wrapper}>
            <img className={style.banner__img} src="/imgs/banner/banner3.jpeg" alt="" />
          </div>
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
