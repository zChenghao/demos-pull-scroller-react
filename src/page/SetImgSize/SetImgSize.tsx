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
            {/* https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F4b8beb6403cc8f39911fda0efa3567cb3248554a.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657009635&t=58997755e0a611c525749219412bf56a */}
            {/* https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F7b26f58e50f799e63cb5cc3bbe30beaa1657ff51.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657015595&t=2f5eaf9005c60c1bbbb84669285c3597 */}
          </div>
          <DemoList list={list} />
        </PullScroller>
      ) : (
        <PageLoading />
      )}
    </>
  );
}
