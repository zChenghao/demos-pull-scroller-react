import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';

const DemoSimple = lazy(() => import('./page/DemoSimple/DemoSimple'));
const DemoBackTop = lazy(() => import('./page/BackTopDemo/BackTopDemo'));
const BackTopShowAlways = lazy(() => import('./page/BackTopShowAlways/BackTopShowAlways'));
const PullLoadDemo = lazy(() => import('./page/PullLoadDemo/PullLoadDemo'));
const SyncLoadHandler = lazy(() => import('./page/SyncLoadHandler/SyncLoadHandler'));
const ScrollHandler = lazy(() => import('./page/ScrollHandler/ScrollHandler'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simple" element={<DemoSimple />} />
          <Route path="/backtop" element={<DemoBackTop />} />
          <Route path="/backtop_showAlways" element={<BackTopShowAlways />} />
          <Route path="/demo_loading" element={<PullLoadDemo />} />
          <Route path="/sync_load_handler" element={<SyncLoadHandler />} />
          <Route path="/scroll_handler" element={<ScrollHandler />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
