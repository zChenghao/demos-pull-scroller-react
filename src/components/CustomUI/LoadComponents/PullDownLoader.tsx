import React, { memo } from 'react';
import LoadingIcon from '../../../assets/icons/loading1.gif';
import style from '../style/PullDownLoader.module.css';

interface Props {
  beforePullDown: boolean;
  isPullingDown: boolean;
  isRefreshError?: boolean;
}

export const PullDownLoader: React.NamedExoticComponent<Props> = memo(function Refresher({
  beforePullDown,
  isPullingDown,
  isRefreshError
}) {
  // console.log('refresher render');

  return (
    <div className={style.custom__refresher}>
      <div style={{ display: beforePullDown ? undefined : 'none' }}>
        <span className={style.refresher__text}>Release trigger refresh</span>
      </div>
      <div style={{ display: !beforePullDown ? undefined : 'none' }}>
        <div style={{ display: isPullingDown ? undefined : 'none' }}>
          <img className={style.icon__loading} src={LoadingIcon} alt="" />
        </div>
        <div
          className={
            isRefreshError !== undefined && isRefreshError
              ? `${style.status} ${style.error}`
              : `${style.status} ${style.success}`
          }
          style={{ display: !isPullingDown ? undefined : 'none' }}
        >
          <span className={style['refresher__text--status']}>
            {isRefreshError !== undefined && isRefreshError ? 'Failed' : 'Refresh completed'}
          </span>
        </div>
      </div>
    </div>
  );
});
