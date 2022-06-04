import React from 'react';
import './List.css';

interface ListData {
  list: { id: number | string; data: string }[];
}

const DemoList: React.FC<ListData> = ({ list }) => {
  // console.log('render list');
  return (
    <ul>
      {list.map((item) => (
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
