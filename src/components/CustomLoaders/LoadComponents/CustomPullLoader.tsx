import React, { memo } from 'react';

interface Props {
  beforePullUp: boolean;
  isPullUpLoading: boolean;
  isNoMoreData?: boolean;
  isPullLoadError?: boolean;
}

export const CustomPullLoader: React.NamedExoticComponent<Props> = memo(
  ({ beforePullUp, isPullUpLoading, isPullLoadError, isNoMoreData }) => {

    return (
      <div style={{ padding: 20, textAlign: 'center', fontSize: 16, color: '#999' }}>
        <div style={{ display: !isNoMoreData && beforePullUp ? undefined : 'none' }}>
          <span>Pull up and load more</span>
        </div>
        <div style={{ display: !isNoMoreData && !beforePullUp ? undefined : 'none' }}>
          <div style={{ display: isPullUpLoading ? undefined : 'none' }}>
            <span>Loading...</span>
          </div>
          <div style={{ display: !isPullUpLoading ? undefined : 'none' }}>
            <span>
              {isPullLoadError && isPullLoadError !== undefined ? 'Custom load error' : 'Custom load completed'}
            </span>
          </div>
        </div>
        <div style={{ display: isNoMoreData ? undefined : 'none' }}>No more</div>
      </div>
    );
  }
);
