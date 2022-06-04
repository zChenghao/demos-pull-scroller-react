import React, { memo } from 'react';
import '../style/CustomRefresher.css';

interface Props {
  beforePullDown?: boolean;
  isPullingDown?: boolean;
  isRefreshError?: boolean;
}

export const CustomRefresher: React.NamedExoticComponent<Props> = memo(function CustomRefresher({
  beforePullDown,
  isPullingDown,
  isRefreshError
}) {
  return (
    <div className="custom__refresher">
      <div style={{ display: beforePullDown ? undefined : 'none' }}>
        <span className="refresher__text">Pull Down and refresh</span>
      </div>
      <div style={{ display: !beforePullDown ? undefined : 'none' }}>
        <div style={{ display: isPullingDown ? undefined : 'none' }}>
          <span className="refresher__text">Loading...</span>
        </div>
        <div style={{ display: !isPullingDown ? undefined : 'none' }}>
          <span className="refresher__text">
            {isRefreshError !== undefined && isRefreshError ? 'Refresh fail' : 'Refresh complete'}
          </span>
        </div>
      </div>
    </div>
  );
});
