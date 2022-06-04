import { Link } from 'react-router-dom';
import HomeStyle from './Home.module.css';

export default function Home() {
  return (
    <div className={HomeStyle.home__wrapper}>
      <h1 className={HomeStyle['home-title']}>Demo case page</h1>
      <ul className={HomeStyle['home-link-list']}>
        <li className={HomeStyle['home-link']}>
          <Link to={'/simple'}>Simple to use,only scroll.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/default_backtop'}>Using default back top components.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/default_loading'}>Using default refreshes components and default loads components.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/normalfunc__load_handler'}>The load handler is a normal function.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/custom_load_backtop'}>Using custom load components and custom back to top component.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/custom_scroll_handler'}>Custom scroll handler function.</Link>
        </li>
      </ul>
    </div>
  );
}
