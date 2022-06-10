import PullScroller from 'pull-scroller-react';
import { useEffect, useState } from 'react';
import { DemoList } from '../../components';
import { PageLoading } from '../../components/CustomUI';
import { useWindowHeight } from '../../utils/customHooks';
import { ListItem, mockGetListData } from '../../utils/getMockData';
import style from './ObserveImg.module.css';

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
        <PullScroller height={windowHeight} observeImg={true}>
          <img className={style.banner} src={'/imgs/banner/banner1.jpeg'} alt="" />
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
