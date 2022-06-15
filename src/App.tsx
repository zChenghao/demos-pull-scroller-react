import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';

const SimpleDemo = lazy(() => import('./page/SimpleDemo/SimpleDemo'));
const BackTopDemo = lazy(() => import('./page/BackTopDemo/BackTopDemo'));
const BackTopShowAlways = lazy(() => import('./page/BackTopShowAlways/BackTopShowAlways'));
const PullLoadDemo = lazy(() => import('./page/PullLoadDemo/PullLoadDemo'));
const SyncLoadHandler = lazy(() => import('./page/SyncLoadHandler/SyncLoadHandler'));
const ScrollHandler = lazy(() => import('./page/ScrollHandler/ScrollHandler'));
const ObserveImg = lazy(() => import('./page/ObserveImg/ObserveImg'));
const SetImgSize = lazy(() => import('./page/SetImgSize/SetImgSize'));
const FixedTab = lazy(() => import('./page/FixedTab/FixedTab'));
const ClassDemo = lazy(() => import('./page/ClassDemo/ClassDemo'));
const CustomLoadState = lazy(() => import('./page/CustomLoadState/CustomLoadState'));
const UseExposedMethods = lazy(() => import('./page/UseExposedMethods/UseExposedMethods'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simple" element={<SimpleDemo />} />
          <Route path="/scroll_handler" element={<ScrollHandler />} />
          <Route path="/backtop" element={<BackTopDemo />} />
          <Route path="/backtop_showAlways" element={<BackTopShowAlways />} />
          <Route path="/demo_loading" element={<PullLoadDemo />} />
          <Route path="/sync_load_handler" element={<SyncLoadHandler />} />
          <Route path="/obesrve_img" element={<ObserveImg />} />
          <Route path="/set_img_size" element={<SetImgSize />} />
          <Route path="/fixed_tabbar" element={<FixedTab />} />
          <Route path="/class" element={<ClassDemo />} />
          <Route path="/custom_load_state" element={<CustomLoadState />} />
          <Route path="/use_exposed_methods" element={<UseExposedMethods />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
