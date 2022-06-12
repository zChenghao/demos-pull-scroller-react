import { Link } from 'react-router-dom';
import HomeStyle from './Home.module.css';

export default function Home() {
  return (
    <div className={HomeStyle.home__wrapper}>
      <h1 className={HomeStyle['home-title']}>Demos</h1>
      <ul className={HomeStyle['home-link-list']}>
        <li className={HomeStyle['home-link']}>
          <Link to={'/simple'}>Simple to use,only scroll.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/scroll_handler'}>Custom scroll handler function.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/backtop'}>Using back top.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/backtop_showAlways'}>Always show back-top.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/demo_loading'}>
            Using pull-down and pull-up.Load handler is an asynchronous function(async function).
          </Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/sync_load_handler'}>
            The handlers of pull-down and pull-up are synchronous functions(sync function).
          </Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/obesrve_img'}>Use the observe-image plugin.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/set_img_size'}>Use CSS styles to set the size of an image or image container.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/fixed_tabbar'}>The page has elements with fixed positioning.</Link>
        </li>
        <li className={HomeStyle['home-link']}>
          <Link to={'/class'}>Using in class.</Link>
        </li>
      </ul>
    </div>
  );
}
