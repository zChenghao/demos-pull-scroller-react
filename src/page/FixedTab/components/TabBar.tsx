import { memo, useCallback, useState } from 'react';
import style from './TabBar.module.css';

interface Props {
  activeIndex: number;
  // setActive: React.Dispatch<React.SetStateAction<number>>;
  tabItemClick(index: number): Promise<void> | void;
}

const TabBar = memo(({ activeIndex, tabItemClick }: Props) => {
  const [tabList] = useState([
    { id: 'tab1', name: 'Tab1' },
    { id: 'tab2', name: 'Tab2' },
    { id: 'tab3', name: 'Tab3' },
    { id: 'tab4', name: 'Tab4' }
  ]);

  const tabClick = useCallback(
    (index: number) => {
      tabItemClick(index);
    },
    [tabItemClick]
  );

  return (
    <div className={style.tabbar}>
      {tabList.map((item, index) => (
        // className={style.tab__item + ' ' + style.active}
        <div
          key={item.id}
          className={style.tab__item + `${activeIndex === index ? ' ' + style.active : ''}`}
          onClick={() => tabClick(index)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
});

export default TabBar;
