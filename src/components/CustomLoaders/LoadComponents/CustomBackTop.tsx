import { memo } from 'react';
import BackTopIcon from '../../../assets/icons/backtop.svg';
import '../style/CustomBackTop.css';

interface BackTopProps {
  scrollToTop: () => void;
  show?: boolean;
}

export const CustomBackTop = memo(({ scrollToTop, show }: BackTopProps) => {
  // console.log('custom backtop render');
  return (
    <div
      className="custom__backtop"
      onClick={scrollToTop}
      style={{ display: show || show === undefined ? undefined : 'none' }}
    >
      <img className="icon-backtop" src={BackTopIcon} alt="Top" />
    </div>
  );
});
