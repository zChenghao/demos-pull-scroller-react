import React from 'react';
import './List.css';

interface ListData {
  list: { id: number | string; data: string }[];
}

const DemoList: React.FC<ListData> = ({ list }) => {
  // console.log('render list');
  if (!list.length) {
    return null;
  }
  return (
    <ul>
      {list.map((item, index) => (
        <li
          className="item"
          key={item.id}
          onClick={() => {
            console.log(item);
          }}
        >
          {item.data}
        </li>
      ))}
    </ul>
  );
};

export default DemoList;
