import LadingImg from '../../../assets/icons/page-loading1.gif';
import style from './PageLoading.module.css';

export function PageLoading() {
  return (
    <div className={style.loading__wapper}>
      <div className={style.loading__img}>
        <img className={style.img} src={LadingImg} alt="" />
      </div>
    </div>
  );
}
