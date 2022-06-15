import React, { memo } from 'react';
import LoadingIcon from '../../../assets/icons/loading3.gif';
import '../style/PullUpLoader.css';

interface Props {
  beforePullUp: boolean;
  isPullUpLoading: boolean;
  isNoMoreData?: boolean;
  isPullLoadError?: boolean;
}

export const PullUpLoader: React.NamedExoticComponent<Props> = memo(function PullUpLoader({
  beforePullUp,
  isPullUpLoading,
  isPullLoadError,
  isNoMoreData
}) {
  // console.log('loader render');

  return (
    <div className="custom__pullloader">
      <div style={{ display: !isNoMoreData && beforePullUp ? undefined : 'none' }}>
        <span>Load more</span>
      </div>
      <div style={{ display: !isNoMoreData && !beforePullUp ? undefined : 'none' }}>
        <div style={{ display: isPullUpLoading ? undefined : 'none' }}>
          <img className="icon__loading" src={LoadingIcon} alt="" />
        </div>
        <div style={{ display: !isPullUpLoading ? undefined : 'none' }}>
          <span className="loading__text">
            {isPullLoadError && isPullLoadError !== undefined ? 'Loading error' : 'Loading complete'}
          </span>
        </div>
      </div>
      <div className="loading__text" style={{ display: isNoMoreData ? undefined : 'none' }}>
        No more
      </div>
    </div>
  );
});
