import { memo } from 'react';
import BackTopIcon from '../../../assets/icons/backtop.svg';
import '../style/BackTop.css';

interface BackTopProps {
  scrollToTop: () => void;
  show?: boolean;
}

export const BackTop = memo(({ scrollToTop, show }: BackTopProps) => {
  // console.log('backtop render');
  return (
    <div onClick={scrollToTop} className={show || show === undefined ? 'custom__backtop show' : 'custom__backtop hide'}>
      <img className="icon-backtop" src={BackTopIcon} alt="Top" />
    </div>
  );
});
