import React from 'react';
import './List.css';

const List: React.FC<{ list: string[] }> = ({ list }) => {
  // console.log('render list');
  return (
    <ul>
      {list.map((item, index) => (
        <li
          className="item"
          key={index}
          onClick={() => {
            console.log(item);
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
